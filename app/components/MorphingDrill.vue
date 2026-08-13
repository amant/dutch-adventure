<script setup lang="ts">
import type { Exercise, Feedback } from '~/types/learning'

const props = defineProps<{
  exercise: Exercise
  feedback?: Feedback
}>()

const emit = defineEmits(['submit', 'next'])
const response = defineModel<string>()

const currentStepIndex = ref(0)
const steps = computed(() => props.exercise.morphingData?.steps || [])
const currentStep = computed(() => steps.value[currentStepIndex.value])
const baseSentence = computed(() => props.exercise.morphingData?.baseSentence || '')

const completedSteps = ref<string[]>([])

const lastSentence = computed(() => {
  if (currentStepIndex.value === 0) return baseSentence.value
  return completedSteps.value[currentStepIndex.value - 1]
})

function handleSubmit() {
  if (!response.value) return
  emit('submit', { morphingStepIndex: currentStepIndex.value })
}

watch(() => props.feedback, (f) => {
  if (f?.outcome === 'correct') {
    completedSteps.value[currentStepIndex.value] = response.value!
    if (currentStepIndex.value < steps.value.length - 1) {
      // Not the final step, wait for user to click "Next Step"
    } else {
      // Final step correct! The parent [slug].vue will handle the final "Continue"
    }
  }
})

function nextStep() {
  currentStepIndex.value++
  response.value = ''
  // Clear feedback for the next step
  emit('next-step') // We need to tell the parent to clear its feedback ref
}
</script>

<template>
  <div class="morphing-drill">
    <div class="steps-progress">
      <div 
        v-for="(s, i) in steps" 
        :key="i" 
        class="step-dot" 
        :class="{ active: i === currentStepIndex, completed: i < currentStepIndex }"
      ></div>
    </div>

    <div class="morph-container card">
      <div class="sentence-history">
        <div class="history-item base">
          <span class="tag">Start</span>
          <p>{{ baseSentence }}</p>
        </div>
        <div v-for="(done, idx) in completedSteps" :key="idx" class="history-item completed">
          <span class="tag">Step {{ idx + 1 }}</span>
          <p>{{ done }}</p>
        </div>
      </div>

      <div v-if="currentStep" class="current-task">
        <div class="instruction">
          <span class="icon">➔</span>
          <div class="instr-content">
            <span class="eyebrow">Transformation</span>
            <p>{{ currentStep.instruction }}</p>
          </div>
        </div>

        <form v-if="!feedback || feedback.outcome === 'retry'" @submit.prevent="handleSubmit" class="input-area">
          <textarea 
            v-model="response" 
            :placeholder="`Type the new sentence...`" 
            rows="2" 
            autofocus 
          />
          <div class="actions">
            <VoiceInput @result="(t) => { response = t; handleSubmit() }" />
            <button class="button" type="submit">Verify Change</button>
          </div>
        </form>

        <div v-else-if="currentStepIndex < steps.length - 1" class="step-success">
          <p class="success-msg">Nice! You evolved the sentence correctly.</p>
          <button class="button secondary" @click="nextStep">Next Change</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.morphing-drill {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.steps-progress {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.step-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #dfe7df;
  transition: all 0.3s;
}

.step-dot.active {
  background: #d06b3c;
  transform: scale(1.2);
}

.step-dot.completed {
  background: #176b5b;
}

.morph-container {
  background: #f8faf9;
  border: 1px solid #cad6ce;
  padding: 0;
  overflow: hidden;
}

.sentence-history {
  background: white;
  padding: 20px;
  border-bottom: 1px solid #cad6ce;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.history-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.history-item.base p { color: #64748b; font-style: italic; }
.history-item.completed p { color: #176b5b; font-weight: 500; }

.history-item .tag {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  padding: 2px 6px;
  border-radius: 4px;
  background: #f1f5f9;
  color: #64748b;
  margin-top: 4px;
}

.history-item.completed .tag {
  background: #e8f3ec;
  color: #176b5b;
}

.history-item p {
  margin: 0;
  font-size: 18px;
  line-height: 1.4;
}

.current-task {
  padding: 24px;
}

.instruction {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.instruction .icon {
  font-size: 24px;
  color: #d06b3c;
  margin-top: 4px;
}

.instr-content p {
  margin: 4px 0 0;
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
}

.input-area textarea {
  width: 100%;
  border: 2px solid #176b5b;
  border-radius: 12px;
  padding: 15px;
  font: inherit;
  resize: vertical;
  margin-bottom: 14px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.step-success {
  background: #e8f3ec;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.success-msg {
  color: #176b5b;
  font-weight: 600;
  margin: 0;
}
</style>
