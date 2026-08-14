<script setup lang="ts">
import { ref } from 'vue'
import type { Exercise, Feedback } from '~/types/learning'

const props = defineProps<{
  exercise: Exercise
  feedback?: Feedback
}>()

const emit = defineEmits(['submit', 'next'])
const selectedIndex = ref<number | null>(null)

// For inference challenges, we use options stored in context as JSON or pipe-separated
const options = computed(() => {
  if (!props.exercise.context) return []
  return props.exercise.context.split('|').map(opt => {
    const [text, isCorrect] = opt.split(':')
    return { text, isCorrect: isCorrect === 'true' }
  })
})

function handleSelect(index: number) {
  if (props.feedback) return
  selectedIndex.value = index
  const selected = options.value[index]
  if (selected) {
    emit('submit', selected.text)
  }
}
</script>

<template>
  <div class="inference-challenge">
    <div class="card challenge-card">
      <div class="header">
        <div class="eyebrow">Pragmatic Inference</div>
        <div class="badge">B2 Skill</div>
      </div>

      <div class="scenario-box">
        <p class="instruction">Read or listen to the Dutch statement. What is the speaker <strong>actually</strong> implying?</p>
        <div class="prompt-card card">
          <p class="prompt-text">"{{ exercise.prompt }}"</p>
        </div>
      </div>

      <div class="options-grid mt-6">
        <button 
          v-for="(opt, index) in options" 
          :key="index"
          class="option-button"
          :class="{ 
            selected: selectedIndex === index,
            correct: feedback && opt.isCorrect,
            wrong: feedback && selectedIndex === index && !opt.isCorrect
          }"
          @click="handleSelect(index)"
          :disabled="!!feedback"
        >
          {{ opt.text }}
        </button>
      </div>
    </div>

    <div v-if="feedback" class="feedback-section mt-6">
      <div class="card feedback-card" :class="feedback.outcome">
        <div class="outcome-badge">{{ feedback.outcome }}</div>
        <p class="feedback-message">{{ feedback.message }}</p>
        
        <div class="explanation mt-4">
          <p class="muted"><strong>Teacher's Note:</strong> {{ exercise.explanation }}</p>
        </div>

        <button class="button primary mt-6" @click="$emit('next')">Continue</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inference-challenge { max-width: 650px; margin: 0 auto; }
.challenge-card { padding: 32px; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.badge { background: #fef2f2; color: #991b1b; font-size: 10px; padding: 2px 8px; border-radius: 99px; font-weight: 800; text-transform: uppercase; }

.scenario-box { margin-bottom: 32px; }
.instruction { font-size: 15px; color: #475569; margin-bottom: 16px; }
.prompt-card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 24px; text-align: center; }
.prompt-text { font-size: 20px; font-weight: 600; color: #1e293b; font-style: italic; }

.options-grid { display: grid; gap: 12px; }
.option-button { 
  text-align: left; 
  padding: 16px 20px; 
  border: 2px solid #e2e8f0; 
  border-radius: 12px; 
  background: white; 
  font-size: 16px; 
  color: #334155;
  transition: all 0.2s;
  cursor: pointer;
}

.option-button:hover:not(:disabled) { border-color: #94a3b8; background: #f1f5f9; }
.option-button.selected { border-color: #3b82f6; background: #eff6ff; }
.option-button.correct { border-color: #10b981; background: #ecfdf5; color: #065f46; }
.option-button.wrong { border-color: #ef4444; background: #fef2f2; color: #991b1b; }
.option-button:disabled { cursor: default; }

.feedback-card { padding: 24px; border-left: 6px solid #cbd5e1; }
.feedback-card.correct { border-left-color: #176b5b; }
.feedback-card.acceptable { border-left-color: #f59e0b; }
.feedback-card.retry { border-left-color: #ef4444; }

.explanation { background: #f8fafc; padding: 16px; border-radius: 8px; }
.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
</style>
