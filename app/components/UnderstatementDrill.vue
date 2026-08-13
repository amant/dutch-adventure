<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Exercise, Feedback } from '~/types/learning'
import VoiceInput from './VoiceInput.vue'

const props = defineProps<{
  exercise: Exercise
  feedback?: Feedback
}>()

const emit = defineEmits(['submit', 'next'])
const response = defineModel<string>()

const isSpeaking = ref(false)

function handleSubmit() {
  emit('submit', response.value)
}

function handleVoiceResult(text: string) {
  response.value = text
  handleSubmit()
}
</script>

<template>
  <div class="understatement-drill">
    <div class="card drill-card">
      <div class="header">
        <div class="eyebrow">Dutch Pragmatics</div>
        <div class="badge">B2 Understatement</div>
      </div>

      <div class="scenario">
        <p class="muted small">Direct English phrasing:</p>
        <p class="direct-text">"{{ exercise.context }}"</p>
        <div class="divider"></div>
        <p class="instruction">Dutch people often avoid extreme praise. How would you express this in a typically Dutch, understated way?</p>
      </div>

      <div class="prompt-box card">
        <p class="prompt-text">{{ exercise.prompt }}</p>
      </div>

      <div class="input-area mt-6">
        <div class="input-wrapper">
          <input 
            v-model="response" 
            placeholder="Type your understated Dutch..." 
            @keyup.enter="handleSubmit"
            autofocus
          />
          <button class="button primary" @click="handleSubmit">Submit</button>
        </div>
        
        <div class="voice-toggle mt-4">
          <VoiceInput @result="handleVoiceResult" />
          <span class="muted small ml-2">Or speak your answer</span>
        </div>
      </div>
    </div>

    <div v-if="feedback" class="feedback-section mt-6">
      <div class="card feedback-card" :class="feedback.outcome">
        <div class="outcome-header">
          <div class="outcome-badge">{{ feedback.outcome }}</div>
          <div v-if="feedback.pragmaticScore" class="pragmatic-score">
            Naturalness: {{ feedback.pragmaticScore }}%
          </div>
        </div>
        
        <p class="feedback-message">{{ feedback.message }}</p>
        
        <div v-if="feedback.pragmaticFeedback" class="pragmatic-tip mt-4">
          <span class="icon">💡</span>
          <p>{{ feedback.pragmaticFeedback }}</p>
        </div>

        <div v-if="feedback.teacherCorrection" class="correction-box mt-4">
          <div class="eyebrow">Native Alternative:</div>
          <TeacherRedline 
            :original="response || ''" 
            :corrected="feedback.teacherCorrection.natural" 
          />
          <p class="explanation mt-2">{{ feedback.teacherCorrection.explanation }}</p>
        </div>

        <button class="button primary mt-6" @click="$emit('next')">Continue</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.understatement-drill { max-width: 650px; margin: 0 auto; }
.drill-card { padding: 32px; border-top: 6px solid #176b5b; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.badge { background: #fef3c7; color: #92400e; font-size: 10px; padding: 2px 8px; border-radius: 99px; font-weight: 800; text-transform: uppercase; }

.scenario { margin-bottom: 24px; background: #f8fafc; padding: 20px; border-radius: 12px; }
.direct-text { font-size: 18px; color: #64748b; font-style: italic; margin: 4px 0 12px; }
.divider { height: 1px; background: #e2e8f0; margin-bottom: 12px; }
.instruction { font-size: 14px; color: #475569; line-height: 1.5; }

.prompt-box { background: #fffdf9; border: 1px solid #fde68a; padding: 20px; text-align: center; }
.prompt-text { font-size: 20px; font-weight: 600; color: #1a1a1a; }

.input-wrapper { display: flex; gap: 12px; }
.input-wrapper input { flex: 1; padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 16px; }
.voice-toggle { display: flex; align-items: center; justify-content: center; }

.feedback-card { padding: 24px; border-left: 6px solid #cbd5e1; }
.feedback-card.correct { border-left-color: #176b5b; }
.feedback-card.acceptable { border-left-color: #f59e0b; }

.outcome-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.pragmatic-score { font-size: 12px; font-weight: 700; color: #176b5b; }

.pragmatic-tip { display: flex; gap: 12px; background: #f0fdf4; padding: 12px; border-radius: 8px; font-size: 14px; color: #166534; }

.correction-box { background: #f8fafc; padding: 16px; border-radius: 12px; }
.explanation { font-size: 14px; color: #475569; }

.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
.ml-2 { margin-left: 8px; }
</style>
