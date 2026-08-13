<script setup lang="ts">
import type { Exercise, Feedback } from '~/types/learning'
import { useLearnerMemory } from '~/composables/useLearnerMemory'
import VoiceInput from './VoiceInput.vue'

const props = defineProps<{
  exercise: Exercise
  feedback?: Feedback
}>()

const emit = defineEmits(['submit', 'next', 'retry'])

const { recordExposure } = useLearnerMemory()
const showTranscript = ref(false)
const response = defineModel<string>()
const selectedOption = ref<number | null>(null)
const hasAttempted = ref(false)
const isShadowing = ref(false)
const shadowingResult = ref('')

const selectedWord = ref<{ word: string, meaning: string, category?: string } | null>(null)

const tokens = computed(() => {
  const text = props.exercise.transcript || props.exercise.target || ''
  if (!text) return []
  
  // Split by whitespace but keep it
  const rawTokens = text.split(/(\s+)/)
  
  return rawTokens.map(token => {
    if (token.match(/^\s+$/)) return { text: token, isInteractable: false }
    
    const cleanWord = token.toLowerCase().replace(/[.,!?;:()]/g, '').trim()
    const hint = props.exercise.wordHints?.[cleanWord]
    return {
      text: token,
      isInteractable: true,
      hint
    }
  })
})

const onTokenClick = (token: any) => {
  if (token.hint) {
    showHint(token)
  }
  speakWord(token.text)
}

const showHint = (token: any) => {
  if (token.hint) {
    selectedWord.value = { word: token.text.replace(/[.,!?;:()]/g, '').trim(), ...token.hint }
    const cleanWord = token.text.toLowerCase().replace(/[.,!?;:()]/g, '').trim()
    recordExposure(cleanWord)
  }
}

const difficulty = ref(1) // 1 to 5
const rate = computed(() => {
  // Speed decreases as difficulty increases
  // Level 1: 0.9 (Normal-ish)
  // Level 5: 1.4 (Fast/Colloquial) or 0.7 (Slow)? 
  // Wait, Level 1 should be slow, Level 4-5 should be fast.
  return 0.6 + (difficulty.value * 0.2)
})

const voices = ref<SpeechSynthesisVoice[]>([])
const loadVoices = () => {
  voices.value = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('nl'))
}

onMounted(() => {
  loadVoices()
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices
  }
})

const speak = async () => {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel() 
  
  const text = props.exercise.transcript || props.exercise.target || ''
  
  // Check if it's a dialogue
  if (text.includes('A:') && text.includes('B:')) {
    const lines = text.split('\n').filter(l => l.trim())
    for (const line of lines) {
      const msg = new SpeechSynthesisUtterance()
      const content = line.replace(/^[AB]:\s*/, '').trim()
      msg.text = content
      msg.lang = 'nl-NL'
      msg.rate = rate.value
      
      // Try to switch voices or pitch
      if (line.startsWith('A:')) {
        msg.voice = voices.value[0] || null
        msg.pitch = 1
      } else {
        msg.voice = voices.value[1] || voices.value[0] || null
        msg.pitch = voices.value[1] ? 1 : 1.2 // Higher pitch if same voice
      }
      
      window.speechSynthesis.speak(msg)
      
      // Wait for the line to finish before next one
      await new Promise(resolve => {
        msg.onend = resolve
      })
    }
  } else {
    const msg = new SpeechSynthesisUtterance()
    msg.text = text
    msg.lang = 'nl-NL'
    msg.rate = rate.value
    msg.voice = voices.value[0] || null
    window.speechSynthesis.speak(msg)
  }
}

const speakWord = (word: string) => {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const msg = new SpeechSynthesisUtterance()
  msg.text = word.replace(/[.,!?;:()]/g, '').trim()
  msg.lang = 'nl-NL'
  msg.rate = 0.8 // A bit slower for individual words
  msg.voice = voices.value[0] || null
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

    <div v-if="exercise.listeningQuestion" class="comprehension-area">
      <div class="card question-card">
        <div class="eyebrow">Comprehension Check</div>
        <p class="question-text">{{ exercise.listeningQuestion }}</p>
        <div class="options-grid">
          <button 
            v-for="(opt, idx) in exercise.listeningOptions" 
            :key="idx"
            class="option-button"
            :class="{ 
              selected: selectedOption === idx,
              correct: hasAttempted && opt.isCorrect,
              wrong: hasAttempted && selectedOption === idx && !opt.isCorrect
            }"
            :disabled="hasAttempted && feedback?.outcome !== 'retry'"
            @click="selectedOption = idx"
          >
            {{ opt.text }}
          </button>
        </div>
        <div v-if="!hasAttempted || (feedback && feedback.outcome === 'retry')" class="actions">
          <button 
            class="button" 
            :disabled="selectedOption === null"
            @click="hasAttempted = true; emit('submit', { answer: exercise.listeningOptions![selectedOption!].text })"
          >
            Check Answer
          </button>
        </div>
      </div>
    </div>

    <form v-else-if="!feedback" @submit.prevent="emit('submit')" class="input-area">
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

    <div v-if="showTranscript || (hasAttempted && feedback?.outcome === 'correct')" class="transcript-box card">
      <h4>Transcript</h4>
      <div class="dutch">
        <template v-for="(token, idx) in tokens" :key="idx">
          <span 
            v-if="token.isInteractable" 
            class="word interactable" 
            @click="onTokenClick(token)"
            :class="{ 
              active: selectedWord?.word.toLowerCase() === token.text.toLowerCase().replace(/[.,!?;:()]/g, '').trim(),
              'has-hint': !!token.hint 
            }"
          >
            {{ token.text }}
          </span>
          <span v-else>{{ token.text }}</span>
        </template>
      </div>

      <div v-if="selectedWord" class="hint-popup card inline-hint">
        <div class="hint-header">
          <span class="word-label">{{ selectedWord.word }}</span>
          <button class="close-btn" @click="selectedWord = null">×</button>
        </div>
        <p class="meaning">{{ selectedWord.meaning }}</p>
      </div>

      <div v-if="exercise.translation">
        <h4>Translation</h4>
        <p class="muted">{{ exercise.translation }}</p>
      </div>

      <div v-if="!isShadowing && feedback?.outcome === 'correct'" class="shadowing-promo">
        <p><strong>B2 Challenge:</strong> Practice your automaticity by shadowing this sentence.</p>
        <button class="button secondary" @click="isShadowing = true">Start Shadowing</button>
      </div>

      <div v-if="isShadowing" class="shadowing-area card">
        <div class="eyebrow">Shadowing Mode</div>
        <p class="instruction">Repeat the sentence clearly. We'll check your flow.</p>
        
        <VoiceInput 
          v-model="shadowingResult" 
          @submit="emit('submit', { answer: shadowingResult, isShadowing: true })" 
        />
      </div>

      <button v-if="feedback && feedback.outcome !== 'retry' && !isShadowing" class="button" @click="emit('next')">Continue</button>
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

.comprehension-area {
  margin-top: 10px;
}

.question-card {
  background: white;
  padding: 24px;
}

.question-text {
  font-size: 18px;
  font-weight: 600;
  margin: 12px 0 20px;
  color: #20302d;
}

.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.option-button {
  background: #f8faf9;
  border: 2px solid #eef2f0;
  border-radius: 12px;
  padding: 14px;
  text-align: left;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: #52645f;
}

.option-button:hover:not(:disabled) {
  border-color: #176b5b;
  background: white;
}

.option-button.selected {
  border-color: #176b5b;
  background: #f0f7f4;
}

.option-button.correct {
  background: #e6f2f0;
  border-color: #176b5b;
  color: #176b5b;
}

.option-button.wrong {
  background: #fef1e8;
  border-color: #d06b3c;
  color: #d06b3c;
}

.option-button:disabled {
  cursor: default;
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
  line-height: 1.6;
}

.word.interactable {
  cursor: pointer;
  transition: all 0.2s;
  padding: 0 2px;
}

.word.interactable:hover {
  background: #e8f3ec;
  border-radius: 4px;
}

.word.has-hint {
  color: #176b5b;
  font-weight: 600;
  text-decoration: underline dotted #cad6ce;
  text-underline-offset: 4px;
}

.word.interactable.active {
  background: #176b5b;
  color: white;
  border-radius: 4px;
  text-decoration: none;
}

.inline-hint {
  background: #fffcf4;
  border: 1px solid #f9e8b9;
  padding: 12px;
  margin-bottom: 16px;
}

.shadowing-promo {
  margin-top: 20px;
  padding: 16px;
  background: #f0f7f4;
  border-radius: 12px;
  text-align: center;
}

.shadowing-area {
  margin-top: 20px;
  padding: 24px;
  background: #fff;
  border-color: #176b5b;
  text-align: center;
}

.instruction {
  font-size: 15px;
  margin: 8px 0 20px;
  color: #52645f;
}
</style>
