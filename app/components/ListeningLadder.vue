<script setup lang="ts">
import type { Exercise, Feedback } from '~/types/learning'

const props = defineProps<{
  exercise: Exercise
  feedback?: Feedback
}>()

const emit = defineEmits(['submit', 'next', 'retry'])

const showTranscript = ref(false)
const response = defineModel<string>()

const difficulty = ref(1) // 1 to 5
const rate = computed(() => {
  // Speed decreases as difficulty increases
  // Level 1: 0.9 (Normal-ish)
  // Level 5: 1.4 (Fast/Colloquial) or 0.7 (Slow)? 
  // Wait, Level 1 should be slow, Level 4-5 should be fast.
  return 0.6 + (difficulty.value * 0.2)
})

const speak = () => {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel() // Stop any current speech
  const msg = new SpeechSynthesisUtterance()
  msg.text = props.exercise.transcript || props.exercise.target || ''
  msg.lang = 'nl-NL'
  msg.rate = rate.value
  window.speechSynthesis.speak(msg)
}

const toggleTranscript = () => {
  showTranscript.value = !showTranscript.value
}
</script>

<template>
  <div class="listening-ladder" :class="`difficulty-${difficulty}`">
    <div class="audio-control">
      <div class="ladder-controls">
        <label>
          <span class="eyebrow">Listening Level</span>
          <input type="range" v-model.number="difficulty" min="1" max="5" step="1" />
          <div class="difficulty-labels">
            <span>Slow</span>
            <span>Natural</span>
            <span>Fast</span>
          </div>
        </label>
      </div>

      <button class="button audio-button" @click="speak">
        <span class="icon">🔊</span> Play Audio
      </button>
      <p class="muted">
        <span v-if="difficulty === 1">Slow, clear speech.</span>
        <span v-else-if="difficulty < 4">Normal learner speed.</span>
        <span v-else>Native-level speed. Good luck!</span>
      </p>
    </div>

    <div v-if="difficulty === 5" class="noise-overlay" />

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
  position: relative;
  text-align: center;
  padding: 30px;
  background: #f8faf9;
  border-radius: 16px;
  border: 2px solid #eef2f0;
  overflow: hidden;
}

.ladder-controls {
  margin-bottom: 24px;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.ladder-controls label {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.difficulty-labels {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #687873;
}

input[type=range] {
  width: 100%;
  accent-color: #176b5b;
}

.noise-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAElBMVEUAAAD8/Pz09PT4+Pj29vb////p7967AAAABnRSTlMAAAAAAM7v694AAAAySURBVDjLY2AYBaNgFIyCUUAGA6MBA6MBA6MBA6MBA6MBA6MBA6MBA6MBA6MBA6MBA9UAALW/AatMeS8AAAAASUVORK5CYII=');
  opacity: 0.1;
  animation: grain 0.5s steps(10) infinite;
}

@keyframes grain {
  0%, 100% { transform:translate(0, 0); }
  10% { transform:translate(-5%, -10%); }
  20% { transform:translate(-15%, 5%); }
  30% { transform:translate(7%, -25%); }
  40% { transform:translate(-5%, 25%); }
  50% { transform:translate(-15%, 10%); }
  60% { transform:translate(15%, 0%); }
  70% { transform:translate(0%, 15%); }
  80% { transform:translate(3%, 35%); }
  90% { transform:translate(-10%, 10%); }
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
