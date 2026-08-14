<script setup lang="ts">
import { ref } from 'vue'
import type { Exercise, Feedback } from '~/types/learning'
import VoiceInput from './VoiceInput.vue'

const props = defineProps<{
  exercise: Exercise
  feedback?: Feedback
}>()

const emit = defineEmits(['submit', 'next'])

const answer = ref('')

function handleSubmit() {
  if (!answer.value.trim()) return
  emit('submit', answer.value)
}

function useElement(element: string) {
  if (props.feedback) return
  if (!answer.value.includes(element)) {
    if (answer.value && !answer.value.endsWith(' ')) answer.value += ' '
    answer.value += element
  }
}
</script>

<template>
  <div class="reframing-drill">
    <div class="card drill-card">
      <div class="header">
        <div class="eyebrow">B2 Strategic Competence</div>
        <div class="badge">Diplomatic Reframing</div>
      </div>

      <div class="scenario-box">
        <div class="context-tag">{{ exercise.reframingData?.targetContext || 'Professional Context' }}</div>
        <div class="blunt-label">Blunt/Direct Version:</div>
        <p class="blunt-sentence">"{{ exercise.reframingData?.bluntSentence }}"</p>
      </div>

      <div class="instruction mt-6">
        <h3>{{ exercise.prompt }}</h3>
        <p class="muted">Make it more professional, empathetic, or diplomatic. Use softeners to avoid sounding too blunt.</p>
      </div>

      <div v-if="exercise.reframingData?.softeningElements" class="palette mt-4">
        <div class="palette-label">Try to incorporate these:</div>
        <div class="chips">
          <button 
            v-for="el in exercise.reframingData.softeningElements" 
            :key="el"
            class="chip"
            :class="{ 'used': answer.toLowerCase().includes(el.toLowerCase()) }"
            :disabled="!!feedback"
            @click="useElement(el)"
          >
            {{ el }}
          </button>
        </div>
      </div>

      <div class="input-area mt-6">
        <textarea
          v-model="answer"
          placeholder="Type your diplomatic reframe here..."
          :disabled="!!feedback"
          class="reframe-input"
        ></textarea>
        
        <div class="input-actions">
          <VoiceInput 
            v-if="!feedback" 
            @result="answer = $event" 
          />
        </div>
      </div>

      <div v-if="!feedback" class="actions mt-6">
        <button 
          class="button primary full-width" 
          :disabled="!answer.trim()"
          @click="handleSubmit"
        >
          Verify Reframe
        </button>
      </div>
    </div>

    <div v-if="feedback" class="feedback-section mt-6">
      <div class="card feedback-card" :class="feedback.outcome">
        <div class="outcome-header">
          <span class="outcome-badge">{{ feedback.outcome }}</span>
          <span v-if="feedback.pragmaticScore" class="pragmatic-badge">
            Pragmatic: {{ feedback.pragmaticScore }}%
          </span>
        </div>
        
        <p class="feedback-message">{{ feedback.message }}</p>

        <div v-if="feedback.teacherCorrection" class="correction-box mt-4">
          <div class="eyebrow">Natural Reframe:</div>
          <p class="natural-text">{{ feedback.teacherCorrection.natural }}</p>
          <p class="explanation mt-2">{{ feedback.teacherCorrection.explanation }}</p>
        </div>

        <button class="button primary mt-6" @click="$emit('next')">Continue</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reframing-drill { max-width: 600px; margin: 0 auto; }
.drill-card { padding: 32px; border-top: 6px solid #176b5b; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.badge { background: #e8f3ec; color: #176b5b; font-size: 10px; padding: 2px 8px; border-radius: 99px; font-weight: 800; text-transform: uppercase; }

.scenario-box { background: #f1f5f9; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; }
.context-tag { font-size: 10px; background: #334155; color: white; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-bottom: 12px; text-transform: uppercase; font-weight: 700; }
.blunt-label { font-size: 12px; color: #64748b; font-weight: 700; margin-bottom: 4px; }
.blunt-sentence { font-size: 18px; font-style: italic; color: #475569; font-weight: 500; }

.instruction h3 { font-size: 18px; color: #1e293b; margin-bottom: 4px; }
.muted { color: #64748b; font-size: 14px; }

.palette-label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 8px; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip { 
  background: white; 
  border: 1px solid #e2e8f0; 
  padding: 6px 12px; 
  border-radius: 99px; 
  font-size: 13px; 
  color: #475569; 
  cursor: pointer;
  transition: all 0.2s;
}
.chip:hover:not(:disabled) { border-color: #176b5b; color: #176b5b; }
.chip.used { background: #e8f3ec; border-color: #176b5b; color: #176b5b; }

.reframe-input {
  width: 100%;
  min-height: 100px;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s;
}
.reframe-input:focus { outline: none; border-color: #176b5b; }

.input-actions { display: flex; justify-content: flex-end; margin-top: -45px; margin-right: 10px; position: relative; }

.feedback-card { padding: 24px; border-left: 6px solid #cbd5e1; }
.feedback-card.correct { border-left-color: #176b5b; }
.feedback-card.acceptable { border-left-color: #f59e0b; }
.feedback-card.retry { border-left-color: #ef4444; }

.outcome-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.pragmatic-badge { font-size: 12px; font-weight: 700; color: #176b5b; }

.correction-box { background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0; }
.natural-text { font-size: 16px; font-weight: 600; color: #1e293b; }
.explanation { font-size: 14px; color: #64748b; font-style: italic; }

.full-width { width: 100%; }
.mt-2 { margin-top: 8px; }
.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
</style>
