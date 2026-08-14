<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Exercise, Feedback } from '~/types/learning'

const props = defineProps<{
  exercise: Exercise
  feedback?: Feedback
}>()

const emit = defineEmits(['submit', 'next'])

const answer = ref('')

const capturedPoints = computed(() => {
  if (!props.exercise.summaryPoints) return []
  const text = answer.value.toLowerCase()
  return props.exercise.summaryPoints.filter(point => 
    point.keywords.some(k => text.includes(k.toLowerCase()))
  )
})

const progressPercent = computed(() => {
  if (!props.exercise.summaryPoints?.length) return 0
  return Math.round((capturedPoints.value.length / props.exercise.summaryPoints.length) * 100)
})

function handleSubmit() {
  if (!answer.value.trim()) return
  emit('submit', answer.value)
}
</script>

<template>
  <div class="summary-challenge">
    <div class="card challenge-card">
      <div class="header">
        <div class="eyebrow">B2 Summarisation Mastery</div>
        <div class="badge">Advanced Writing</div>
      </div>

      <div class="instruction">
        <h3>{{ exercise.prompt }}</h3>
        <p v-if="exercise.context" class="muted">{{ exercise.context }}</p>
      </div>

      <div class="goals-checklist">
        <div class="eyebrow small">Required Key Points:</div>
        <div class="points-grid">
          <div 
            v-for="point in exercise.summaryPoints" 
            :key="point.id" 
            class="point-item"
            :class="{ 'is-captured': capturedPoints.find(p => p.id === point.id) }"
          >
            <span class="check-icon">{{ capturedPoints.find(p => p.id === point.id) ? '✓' : '○' }}</span>
            <span class="point-label">{{ point.label }}</span>
          </div>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: progressPercent + '%' }"></div>
        </div>
      </div>

      <div class="input-area mt-6">
        <textarea
          v-model="answer"
          class="summary-input"
          placeholder="Schrijf hier je samenvatting in het Nederlands..."
          :disabled="!!feedback"
          rows="5"
        ></textarea>
        
        <div class="input-meta">
          <span class="char-count" :class="{ 'warning': answer.length < (exercise.minimumLength || 0) }">
            {{ answer.length }} characters (Min: {{ exercise.minimumLength || 0 }})
          </span>
          <VoiceInput 
            v-if="!feedback" 
            @result="answer = $event" 
          />
        </div>
      </div>

      <div v-if="!feedback" class="actions mt-6">
        <button 
          class="button primary full-width" 
          :disabled="!answer.trim() || answer.length < (exercise.minimumLength || 0)"
          @click="handleSubmit"
        >
          Submit Summary
        </button>
      </div>
    </div>

    <div v-if="feedback" class="feedback-section mt-6">
      <div class="card feedback-card" :class="feedback.outcome">
        <div class="outcome-header">
          <span class="outcome-badge">{{ feedback.outcome }}</span>
          <span class="score-badge">+{{ feedback.changeModifier }} mastery</span>
        </div>
        
        <p class="feedback-message">{{ feedback.message }}</p>

        <div v-if="feedback.teacherCorrection" class="redline-box mt-4">
          <div class="eyebrow">Natural Paraphrase:</div>
          <TeacherRedline 
            :original="answer" 
            :corrected="feedback.teacherCorrection.natural" 
          />
        </div>

        <div v-if="feedback.explanation" class="explanation-box mt-4">
          <div class="eyebrow">Teacher's Note:</div>
          <p>{{ feedback.explanation }}</p>
        </div>

        <button class="button primary mt-6" @click="$emit('next')">Continue Exploring</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.summary-challenge { max-width: 800px; margin: 0 auto; }
.challenge-card { padding: 32px; border-top: 6px solid #176b5b; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.badge { background: #e8f3ec; color: #176b5b; font-size: 10px; padding: 2px 8px; border-radius: 99px; font-weight: 800; text-transform: uppercase; }

.instruction h3 { margin-bottom: 8px; color: #1e293b; }
.muted { color: #64748b; font-size: 15px; }

.goals-checklist { background: #f8fafc; padding: 20px; border-radius: 12px; margin-top: 24px; border: 1px solid #e2e8f0; }
.points-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 12px 0 16px; }
.point-item { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #64748b; transition: all 0.3s; }
.point-item.is-captured { color: #176b5b; font-weight: 600; }
.check-icon { font-family: monospace; font-weight: 800; }

.progress-bar-container { height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden; }
.progress-bar { height: 100%; background: #176b5b; transition: width 0.5s ease-out; }

.summary-input { 
  width: 100%; 
  padding: 16px; 
  border: 2px solid #e2e8f0; 
  border-radius: 12px; 
  font-size: 16px; 
  font-family: inherit;
  line-height: 1.6;
  resize: vertical;
  transition: border-color 0.2s;
}
.summary-input:focus { outline: none; border-color: #176b5b; }
.summary-input:disabled { background: #f1f5f9; color: #64748b; }

.input-meta { display: flex; justify-content: space-between; align-items: center; margin-top: 8px; }
.char-count { font-size: 12px; color: #94a3b8; }
.char-count.warning { color: #ef4444; }

.feedback-card { padding: 24px; border-left: 6px solid #cbd5e1; }
.feedback-card.correct { border-left-color: #176b5b; }
.feedback-card.retry { border-left-color: #ef4444; }

.outcome-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.score-badge { font-size: 12px; font-weight: 700; color: #176b5b; }

.redline-box, .explanation-box { background: #f8fafc; padding: 16px; border-radius: 12px; }
.explanation-box p { font-size: 14px; color: #475569; line-height: 1.6; margin-top: 4px; }

.full-width { width: 100%; }
.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
</style>
