<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Exercise, Feedback } from '~/types/learning'

const props = defineProps<{
  exercise: Exercise
  feedback?: Feedback
}>()

const emit = defineEmits(['submit', 'next'])

const sentences = ref<string[]>([])

const initSentences = () => {
  if (props.exercise.scrambledSentences) {
    sentences.value = [...props.exercise.scrambledSentences]
  }
}

watch(() => props.exercise, initSentences, { immediate: true })

function moveUp(index: number) {
  if (index === 0 || props.feedback) return
  const current = sentences.value[index]
  const prev = sentences.value[index - 1]
  if (current !== undefined && prev !== undefined) {
    sentences.value[index] = prev
    sentences.value[index - 1] = current
  }
}

function moveDown(index: number) {
  if (index >= sentences.value.length - 1 || props.feedback) return
  const current = sentences.value[index]
  const next = sentences.value[index + 1]
  if (current !== undefined && next !== undefined) {
    sentences.value[index] = next
    sentences.value[index + 1] = current
  }
}

function handleSubmit() {
  // Join with a space for evaluation
  emit('submit', sentences.value.join(' '))
}
</script>

<template>
  <div class="cohesion-drill">
    <div class="card drill-card">
      <div class="header">
        <div class="eyebrow">Logical Flow & Cohesion</div>
        <div class="badge">B2 Argumentation</div>
      </div>

      <div class="instruction">
        <p>This paragraph is scrambled! Reorder the sentences to create a clear, smoothly flowing Dutch argument.</p>
      </div>

      <div class="sentence-list">
        <div 
          v-for="(sentence, idx) in sentences" 
          :key="sentence" 
          class="sentence-item card"
          :class="{ 
            'is-top': idx === 0, 
            'is-bottom': idx === sentences.length - 1,
            'disabled': !!feedback
          }"
        >
          <div class="sentence-content">
            <span class="index">{{ idx + 1 }}.</span>
            <p>{{ sentence }}</p>
          </div>
          <div v-if="!feedback" class="controls">
            <button 
              class="move-btn" 
              :disabled="idx === 0" 
              @click="moveUp(idx)"
              title="Move Up"
            >
              ↑
            </button>
            <button 
              class="move-btn" 
              :disabled="idx === sentences.length - 1" 
              @click="moveDown(idx)"
              title="Move Down"
            >
              ↓
            </button>
          </div>
        </div>
      </div>

      <div v-if="!feedback" class="actions mt-6">
        <button class="button primary full-width" @click="handleSubmit">
          Check Logical Order
        </button>
      </div>
    </div>

    <div v-if="feedback" class="feedback-section mt-6">
      <div class="card feedback-card" :class="feedback.outcome">
        <div class="outcome-badge">{{ feedback.outcome }}</div>
        <p class="feedback-message">{{ feedback.message }}</p>
        
        <div v-if="feedback.explanation" class="explanation-box mt-4">
          <div class="eyebrow">Teacher's Note:</div>
          <p>{{ feedback.explanation }}</p>
        </div>

        <button class="button primary mt-6" @click="$emit('next')">Continue</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cohesion-drill { max-width: 700px; margin: 0 auto; }
.drill-card { padding: 32px; border-top: 6px solid #d06b3c; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.badge { background: #fef1e8; color: #9a3412; font-size: 10px; padding: 2px 8px; border-radius: 99px; font-weight: 800; text-transform: uppercase; }

.instruction { margin-bottom: 24px; color: #475569; font-size: 15px; }

.sentence-list { display: flex; flex-direction: column; gap: 12px; }
.sentence-item { 
  display: flex; 
  align-items: center; 
  gap: 16px; 
  padding: 16px; 
  background: white; 
  transition: all 0.2s;
  border-left: 4px solid #e2e8f0;
}
.sentence-item:not(.disabled):hover { border-left-color: #d06b3c; transform: translateX(4px); }
.sentence-item.disabled { opacity: 0.8; }

.sentence-content { display: flex; gap: 12px; flex: 1; }
.index { font-weight: 800; color: #94a3b8; font-family: monospace; }
.sentence-content p { font-size: 16px; color: #1e293b; line-height: 1.5; margin: 0; }

.controls { display: flex; flex-direction: column; gap: 4px; }
.move-btn { 
  background: #f1f5f9; 
  border: 1px solid #e2e8f0; 
  width: 32px; 
  height: 32px; 
  border-radius: 6px; 
  cursor: pointer; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  font-weight: 800;
  color: #64748b;
  transition: all 0.2s;
}
.move-btn:hover:not(:disabled) { background: #e2e8f0; color: #1e293b; }
.move-btn:disabled { opacity: 0.3; cursor: not-allowed; }

.feedback-card { padding: 24px; border-left: 6px solid #cbd5e1; }
.feedback-card.correct { border-left-color: #176b5b; }
.feedback-card.retry { border-left-color: #ef4444; }

.explanation-box { background: #f8fafc; padding: 16px; border-radius: 12px; }
.explanation-box p { font-size: 14px; color: #475569; line-height: 1.6; margin-top: 4px; }

.full-width { width: 100%; }
.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
</style>
