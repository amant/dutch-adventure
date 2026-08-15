<script setup lang="ts">
import type { Exercise, Feedback } from '~/types/learning';
import { useLearnerMemory } from '~/composables/useLearnerMemory';

const props = defineProps<{
  exercise: Exercise;
  feedback?: Feedback;
}>();

const emit = defineEmits(['submit', 'next', 'retry']);
const response = defineModel<string>();
const isSpeaking = ref(false);

const { getFrontierConcepts } = useLearnerMemory();
const frontier = computed(() => getFrontierConcepts(3));

const stressLevel = ref(0); // 0 to 100
const achievedGoalIds = ref<Set<string>>(new Set());
const conversationHistory = ref<{ role: 'ai' | 'user'; text: string }[]>([{ role: 'ai', text: props.exercise.prompt }]);
const currentRegister = ref(props.exercise.requiredRegister);

// Debate logic
const currentPhaseIndex = ref(0);
const usedConnectors = ref<Set<string>>(new Set());

const currentPhase = computed(() => {
  if (props.exercise.kind !== 'debate' || !props.exercise.debateData) return null;
  return props.exercise.debateData.phases[currentPhaseIndex.value];
});

function checkConnectors(text: string) {
  if (!props.exercise.debateData) return;
  const connectors = props.exercise.debateData.requiredConnectors;
  connectors.forEach((c) => {
    if (text.toLowerCase().includes(c.toLowerCase())) {
      usedConnectors.value.add(c);
    }
  });
}

function handleVoiceResult(text: string) {
  response.value = text;
  isSpeaking.value = true;
  handleSubmit();
}

function handleSubmit() {
  if (!response.value) return;
  checkConnectors(response.value);
  emit('submit', {
    isSpeaking: isSpeaking.value,
    overrideRegister: currentRegister.value,
    debatePhaseIndex: currentPhaseIndex.value,
  });
}

watch(() => props.feedback, (f) => {
  if (!f) return;

  if (f.requiredRegister) {
    currentRegister.value = f.requiredRegister;
  }

  if (f.achievedGoalIds) {
    f.achievedGoalIds.forEach(id => achievedGoalIds.value.add(id));
  }

  if (response.value && !conversationHistory.value.some(m => m.text === response.value)) {
    conversationHistory.value.push({ role: 'user', text: response.value });
  }

  if (f.outcome === 'retry') {
    stressLevel.value = Math.min(100, stressLevel.value + 15);
    if (!conversationHistory.value.some(m => m.text === f.message)) {
      conversationHistory.value.push({ role: 'ai', text: f.message });
    }
  } else {
    stressLevel.value = Math.max(0, stressLevel.value - 10);

    const personality = props.exercise.aiPersonality;
    let aiText = props.exercise.simulatorResponse || 'Heel goed! Dat begrijp ik.';

    if (stressLevel.value > 60) {
      aiText = 'Kunt u nu eindelijk antwoord geven? Ik heb haast!';
    } else if (personality?.isDifficult && Math.random() < (personality.pushbackProbability || 0.5)) {
      const styles: Record<string, string> = {
        impatient: 'Kunt u sneller praten? Ik heb niet de hele dag.',
        colloquial: 'Echt? Nou, dat wist ik niet hoor. Maar goed...',
        helpful: 'Dat begrijp ik niet helemaal. Kun je dat anders uitleggen?',
      };
      aiText = styles[personality.style || 'helpful'] || aiText;
    }

    conversationHistory.value.push({ role: 'ai', text: aiText });
    response.value = '';
    isSpeaking.value = false;

    if (props.exercise.kind === 'debate' && props.exercise.debateData) {
      if (currentPhaseIndex.value < props.exercise.debateData.phases.length - 1) {
        currentPhaseIndex.value++;
        const nextPhase = props.exercise.debateData.phases[currentPhaseIndex.value];
        if (nextPhase) {
          conversationHistory.value.push({ role: 'ai', text: nextPhase.prompt });
        }
      }
    }
  }
});

const allGoalsMet = computed(() => {
  if (!props.exercise.missionGoals?.length) return true;
  return props.exercise.missionGoals.every(g => achievedGoalIds.value.has(g.id));
});
</script>

<template>
  <div class="mission-simulator">
    <div class="simulator-meta">
      <div
        v-if="exercise.missionGoals?.length"
        class="goals-tracker"
      >
        <div class="label">
          Mission Goals
        </div>
        <div class="goals-list">
          <div
            v-for="goal in exercise.missionGoals"
            :key="goal.id"
            class="goal-item"
            :class="{ achieved: achievedGoalIds.has(goal.id) }"
          >
            <span class="status">{{ achievedGoalIds.has(goal.id) ? '✓' : '○' }}</span>
            <span class="goal-label">{{ goal.label }}</span>
          </div>
        </div>
      </div>
      <div class="stress-meter">
        <span class="label">AI Patience</span>
        <div class="bar-bg">
          <div
            class="bar"
            :style="{ width: `${100 - stressLevel}%`, background: stressLevel > 70 ? '#d06b3c' : '#176b5b' }"
          />
        </div>
      </div>
      <div
        v-if="currentRegister"
        class="register-indicator"
        :class="currentRegister"
      >
        {{ currentRegister === 'formal' ? 'U (Formal)' : 'Je (Informal)' }}
      </div>
    </div>

    <div
      v-if="exercise.kind === 'debate' && exercise.debateData"
      class="debate-meta card"
    >
      <div class="debate-phases">
        <div
          v-for="(p, idx) in exercise.debateData.phases"
          :key="p.id"
          class="phase-pill"
          :class="{ active: idx === currentPhaseIndex, completed: idx < currentPhaseIndex }"
        >
          {{ p.label }}
        </div>
      </div>
      <div class="connector-tracking">
        <div class="label">
          Logical Connectors
        </div>
        <div class="connector-tags">
          <span
            v-for="c in exercise.debateData.requiredConnectors"
            :key="c"
            class="connector-tag"
            :class="{ used: usedConnectors.has(c) }"
          >
            {{ c }}
          </span>
        </div>
      </div>
    </div>

    <div class="chat-window">
      <div
        v-for="(msg, idx) in conversationHistory"
        :key="idx"
        class="message"
        :class="msg.role"
      >
        <div class="avatar">
          {{ msg.role === 'ai' ? '🤖' : '👤' }}
        </div>
        <div class="bubble">
          {{ msg.text }}
        </div>
      </div>
    </div>

    <div
      v-if="allGoalsMet && feedback && feedback.outcome !== 'retry'"
      class="mission-success"
    >
      <div class="success-content">
        <h3>Mission Successful! 🎯</h3>
        <p>You met all the objectives for this conversation.</p>
        <button
          class="button"
          @click="emit('next')"
        >
          Finish Mission
        </button>
      </div>
    </div>

    <div
      v-else-if="!allGoalsMet"
      class="input-container"
    >
      <SmartPalette
        :user-text="response || ''"
        :target-vocabulary="exercise.vocabulary"
        :target-grammar="exercise.grammar"
        :frontier-concepts="frontier"
      />
      <form
        class="input-area"
        @submit.prevent="handleSubmit"
      >
        <textarea
          v-model="response"
          :placeholder="exercise.placeholder || 'Type your response...'"
          rows="2"
          autofocus
        />
        <div class="actions">
          <VoiceInput @result="handleVoiceResult" />
          <button
            class="button"
            type="submit"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.mission-simulator {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.simulator-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.goals-tracker {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.goals-tracker .label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #8a9a94;
}

.goals-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.goal-item {
  background: #f0f4f2;
  border: 1px solid #cad6ce;
  border-radius: 99px;
  padding: 4px 12px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #52645f;
  transition: all 0.3s ease;
}

.goal-item.achieved {
  background: #e6f2f0;
  border-color: #176b5b;
  color: #176b5b;
}

.goal-item .status {
  font-weight: 700;
}

.stress-meter {
  width: 150px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.register-indicator {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.register-indicator.formal {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.register-indicator.informal {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fcd34d;
}

.debate-meta {
  background: #f8faf9;
  border: 1px solid #cad6ce;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.debate-phases {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.phase-pill {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  background: #e1e5de;
  color: #64748b;
  transition: all 0.3s;
}

.phase-pill.active {
  background: #d06b3c;
  color: white;
}

.phase-pill.completed {
  background: #176b5b;
  color: white;
}

.connector-tracking .label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #8a9a94;
  margin-bottom: 10px;
  display: block;
}

.connector-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.connector-tag {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 6px;
  background: #f1f5f9;
  color: #94a3b8;
  border: 1px solid #e2e8f0;
  transition: all 0.3s;
}

.connector-tag.used {
  background: #e8f3ec;
  color: #176b5b;
  border-color: #176b5b;
}

.stress-meter .label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #8a9a94;
}

.stress-meter .bar-bg {
  height: 6px;
  background: #e1e5de;
  border-radius: 3px;
  overflow: hidden;
}

.stress-meter .bar {
  height: 100%;
  transition: width 0.5s ease, background 0.5s ease;
}

.chat-window {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #f0f4f2;
  padding: 20px;
  border-radius: 16px;
  min-height: 200px;
}

.message {
  display: flex;
  gap: 12px;
  max-width: 85%;
}

.message.user {
  flex-direction: row-reverse;
  align-self: flex-end;
}

.avatar {
  width: 36px;
  height: 36px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.bubble {
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 16px;
  line-height: 1.5;
}

.ai .bubble {
  background: white;
  color: #1a1a1a;
  border-bottom-left-radius: 4px;
}

.user .bubble {
  background: #176b5b;
  color: white;
  border-bottom-right-radius: 4px;
}

.input-area {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-area textarea {
  width: 100%;
  border: 1px solid #cad6ce;
  border-radius: 12px;
  padding: 12px 15px;
  font: inherit;
  resize: none;
}

.actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
}

.mission-success {
  background: #e6f2f0;
  border: 2px solid #176b5b;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
}

.success-content h3 {
  margin: 0 0 8px;
  color: #176b5b;
}

.success-content p {
  margin: 0 0 16px;
  color: #20302d;
}

.input-area .button {
  white-space: nowrap;
}
</style>
