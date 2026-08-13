<script setup lang="ts">
import type { Exercise, Feedback } from '~/types/learning'

const props = defineProps<{
  exercise: Exercise
  feedback?: Feedback
}>()

const emit = defineEmits(['submit', 'next', 'retry'])

const showTranscript = ref(false)
const response = defineModel<string>()

const speak = () => {
  if (!window.speechSynthesis) return
  const msg = new SpeechSynthesisUtterance()
  msg.text = props.exercise.transcript || props.exercise.target || ''
  msg.lang = 'nl-NL'
  window.speechSynthesis.speak(msg)
}

const toggleTranscript = () => {
  showTranscript.value = !showTranscript.value
}
</script>

<template>
  <div class="listening-ladder">
    <div class="audio-control">
      <button class="button audio-button" @click="speak">
        <span class="icon">🔊</span> Play Audio
      </button>
      <p class="muted">Listen carefully. Can you understand what is being said?</p>
    </div>

    <form v-if="!feedback" @submit.prevent="emit('submit')" class="input-area">
      <textarea 
        v-model="response" 
        :placeholder="exercise.placeholder || 'What did you hear? (or translate to English)'" 
        rows="3" 
        autofocus 
      />
      <div class="actions">
        <button class="button" type="submit">Check answer</button>
        <button type="button" class="button secondary" @click="toggleTranscript">
          {{ showTranscript ? 'Hide' : 'Show' }} Transcript
        </button>
      </div>
    </form>

    <div v-if="showTranscript" class="transcript-box card">
      <h4>Transcript</h4>
      <p class="dutch">{{ exercise.transcript || exercise.target }}</p>
      <div v-if="exercise.translation">
        <h4>Translation</h4>
        <p class="muted">{{ exercise.translation }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.listening-ladder {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.audio-control {
  text-align: center;
  padding: 30px;
  background: #f8faf9;
  border-radius: 16px;
  border: 2px solid #eef2f0;
}

.audio-button {
  font-size: 18px;
  padding: 12px 30px;
  margin-bottom: 12px;
}

.input-area textarea {
  width: 100%;
  border: 1px solid #cad6ce;
  border-radius: 12px;
  padding: 15px;
  font: inherit;
  resize: vertical;
  margin-bottom: 14px;
}

.actions {
  display: flex;
  gap: 12px;
}

.transcript-box {
  margin-top: 0;
  border-left: 4px solid #176b5b;
}

.transcript-box h4 {
  margin: 0 0 8px;
  font-size: 12px;
  text-transform: uppercase;
  color: #d06b3c;
}

.dutch {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 12px;
}
</style>
