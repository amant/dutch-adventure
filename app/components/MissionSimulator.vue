<script setup lang="ts">
import type { Exercise, Feedback } from '~/types/learning'

const props = defineProps<{
  exercise: Exercise
  feedback?: Feedback
}>()

const emit = defineEmits(['submit', 'next', 'retry'])
const response = defineModel<string>()

const stressLevel = ref(0) // 0 to 100

watch(() => props.feedback, (f) => {
  if (!f) return
  if (f.outcome === 'retry') {
    stressLevel.value = Math.min(100, stressLevel.value + 15)
  } else if (f.outcome === 'correct') {
    stressLevel.value = Math.max(0, stressLevel.value - 10)
  }
})

const messages = computed(() => {
  const msgs = [
    { role: 'ai', text: props.exercise.prompt }
  ]
  
  if (props.feedback || response.value) {
    if (response.value) {
      msgs.push({ role: 'user', text: response.value })
    }
    
    if (props.feedback && props.feedback.outcome !== 'retry') {
      const personality = props.exercise.aiPersonality
      let aiText = props.exercise.simulatorResponse || 'Heel goed! Dat begrijp ik.'
      
      if (stressLevel.value > 60) {
        aiText = 'Kunt u nu eindelijk antwoord geven? Ik heb haast!'
      } else if (personality?.isDifficult && Math.random() < (personality.pushbackProbability || 0.5)) {
        if (personality.style === 'impatient') {
          aiText = 'Kunt u sneller praten? Ik heb niet de hele dag.'
        } else if (personality.style === 'colloquial') {
          aiText = 'Echt? Nou, dat wist ik niet hoor. Maar goed...'
        } else {
          aiText = 'Dat begrijp ik niet helemaal. Kun je dat anders uitleggen?'
        }
      }
      
      msgs.push({ role: 'ai', text: aiText })
    }
  }
  
  return msgs
})
</script>

<template>
  <div class="mission-simulator">
    <div class="simulator-meta">
      <div class="stress-meter">
        <span class="label">AI Patience</span>
        <div class="bar-bg"><div class="bar" :style="{ width: `${100 - stressLevel}%`, background: stressLevel > 70 ? '#d06b3c' : '#176b5b' }"></div></div>
      </div>
    </div>

    <div class="chat-window">
      <div v-for="(msg, idx) in messages" :key="idx" class="message" :class="msg.role">
        <div class="avatar">{{ msg.role === 'ai' ? '🤖' : '👤' }}</div>
        <div class="bubble">
          {{ msg.text }}
        </div>
      </div>
    </div>

    <form v-if="!feedback" @submit.prevent="emit('submit')" class="input-area">
      <textarea 
        v-model="response" 
        :placeholder="exercise.placeholder || 'Type your response...'" 
        rows="2" 
        autofocus 
      />
      <button class="button" type="submit">Send Message</button>
    </form>
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
  justify-content: flex-end;
}

.stress-meter {
  width: 150px;
  display: flex;
  flex-direction: column;
  gap: 4px;
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
  gap: 12px;
}

.input-area textarea {
  flex: 1;
  border: 1px solid #cad6ce;
  border-radius: 12px;
  padding: 12px 15px;
  font: inherit;
  resize: none;
}

.input-area .button {
  white-space: nowrap;
}
</style>
