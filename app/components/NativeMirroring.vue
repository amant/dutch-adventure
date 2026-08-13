<script setup lang="ts">
import type { Exercise, Feedback } from '~/types/learning'
import VoiceInput from './VoiceInput.vue'

const props = defineProps<{
  exercise: Exercise
  feedback?: Feedback
}>()

const emit = defineEmits(['submit', 'next'])
const response = defineModel<string>()

function handleSubmit() {
  emit('submit')
}
</script>

<template>
  <div class="native-mirroring">
    <div class="scenario card">
      <div class="eyebrow">Scenario</div>
      <p class="prompt">{{ exercise.prompt }}</p>
    </div>

    <div class="comparison-grid">
      <div class="card stiff-version">
        <div class="eyebrow">Stiff / Literal</div>
        <p class="stiff-text">"{{ exercise.context }}"</p>
        <span class="tag">Grammatically correct but sounds unnatural</span>
      </div>
      
      <div class="arrow">→</div>

      <div class="card natural-version">
        <div class="eyebrow">Your Task</div>
        <p>Make it sound like a native speaker. Use particles, common collocations, or different word order.</p>
        
        <div class="input-area mt-4">
          <textarea 
            v-model="response" 
            placeholder="Type the natural version..." 
            rows="3"
            :disabled="!!feedback"
          />
          <div class="actions mt-2">
            <VoiceInput v-if="!feedback" @result="(t) => { response = t; handleSubmit() }" />
            <button v-if="!feedback" class="button primary" @click="handleSubmit">Check Naturalness</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="feedback" class="feedback-container mt-6">
      <div class="card feedback-card" :class="feedback.outcome">
        <div class="outcome-header">
          <span class="badge" :class="feedback.outcome">{{ feedback.outcome }}</span>
          <div v-if="feedback.pragmaticScore !== undefined" class="score-pill">
            Pragmatic Score: {{ feedback.pragmaticScore }}%
          </div>
        </div>
        
        <p class="message">{{ feedback.message }}</p>

        <div v-if="feedback.teacherCorrection" class="teacher-tip mt-4">
          <div class="eyebrow">Native Mirror</div>
          <p class="natural-text">"{{ feedback.teacherCorrection.natural }}"</p>
          <p class="explanation">{{ feedback.teacherCorrection.explanation }}</p>
        </div>

        <button class="button primary mt-6" @click="$emit('next')">Continue</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.native-mirroring {
  max-width: 800px;
  margin: 0 auto;
}

.scenario {
  background: #f8fafc;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 32px;
  padding: 24px;
}

.prompt {
  font-size: 20px;
  font-weight: 500;
  color: #1e293b;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 40px 1.2fr;
  gap: 20px;
  align-items: center;
}

@media (max-width: 768px) {
  .comparison-grid { grid-template-columns: 1fr; }
  .arrow { transform: rotate(90deg); margin: 10px 0; }
}

.stiff-version {
  background: #fff;
  border-style: dashed;
  color: #64748b;
}

.stiff-text {
  font-size: 18px;
  font-style: italic;
  margin: 12px 0;
}

.natural-version {
  background: #fdfaf3;
  border: 1px solid #176b5b;
}

.arrow {
  font-size: 24px;
  font-weight: 800;
  color: #176b5b;
  text-align: center;
}

.input-area textarea {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #cad6ce;
  font: inherit;
  resize: vertical;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  align-items: center;
}

.feedback-card {
  padding: 32px;
}

.outcome-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.badge {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 6px;
}

.badge.correct { background: #e8f3ec; color: #176b5b; }
.badge.acceptable { background: #fef3c7; color: #92400e; }
.badge.retry { background: #fee2e2; color: #991b1b; }

.score-pill {
  font-size: 12px;
  font-weight: 700;
  color: #176b5b;
  background: #f0fdf4;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid #bcf0da;
}

.teacher-tip {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  border-left: 4px solid #176b5b;
}

.natural-text {
  font-size: 22px;
  font-weight: 800;
  color: #176b5b;
  font-style: italic;
  margin-bottom: 8px;
}

.explanation {
  color: #475569;
  line-height: 1.6;
}

.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
</style>
