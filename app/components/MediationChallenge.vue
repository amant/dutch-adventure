<script setup lang="ts">
import type { Exercise, Feedback } from '~/types/learning'
import VoiceInput from './VoiceInput.vue'

const props = defineProps<{
  exercise: Exercise
  feedback?: Feedback
}>()

const emit = defineEmits(['submit'])
const response = defineModel<string>()

const achievedPointIds = computed(() => props.feedback?.mediationPointsAchieved || [])

const isPointAchieved = (point: any) => {
  if (achievedPointIds.value.includes(point.id)) return true
  if (!response.value) return false
  return point.keywords.some((k: string) => response.value?.toLowerCase().includes(k.toLowerCase()))
}
</script>

<template>
  <div class="mediation-challenge">
    <div v-if="exercise.mediationSource" class="source-card card">
      <div class="eyebrow">Source Material ({{ exercise.mediationSource.language.toUpperCase() }})</div>
      <h3>{{ exercise.mediationSource.title }}</h3>
      <p class="source-content">{{ exercise.mediationSource.content }}</p>
    </div>

    <div class="task-card">
      <div class="icon">🔄</div>
      <div class="content">
        <h3>{{ exercise.prompt }}</h3>
        <p class="muted">Mediate this information for someone else in Dutch.</p>
      </div>
    </div>

    <div v-if="exercise.mediationPoints" class="points-tracker">
      <span class="eyebrow">Key points to include:</span>
      <div class="points-grid">
        <div 
          v-for="point in exercise.mediationPoints" 
          :key="point.id" 
          class="point-item"
          :class="{ achieved: isPointAchieved(point) }"
        >
          <span class="status">{{ isPointAchieved(point) ? '✓' : '○' }}</span>
          {{ point.label }}
        </div>
      </div>
    </div>

    <div v-if="!feedback" class="input-area">
      <textarea 
        v-model="response" 
        :placeholder="exercise.placeholder || 'Explain the situation in Dutch...'" 
        rows="5" 
        autofocus 
      />
      <div class="footer">
        <VoiceInput v-model="response" @submit="emit('submit')" />
        <button class="button" @click="emit('submit')" :disabled="!response">Submit Mediation</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mediation-challenge {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.source-card {
  background: #f0f7ff;
  border-color: #cce3ff;
  padding: 20px;
}

.source-card h3 {
  margin: 10px 0;
  font-size: 18px;
}

.source-content {
  font-size: 15px;
  line-height: 1.6;
  color: #1e40af;
  font-style: italic;
}

.task-card {
  display: flex;
  gap: 16px;
  background: #fffcf4;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #f9e8b9;
}

.task-card .icon { font-size: 28px; }
.task-card h3 { margin: 0 0 4px; font-size: 18px; color: #b45309; }

.points-tracker {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.points-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.point-item {
  background: white;
  border: 1px solid #cad6ce;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #687873;
  transition: all 0.2s;
}

.point-item.achieved {
  border-color: #176b5b;
  background: #f0f7f4;
  color: #176b5b;
}

.point-item.achieved .status { color: #176b5b; }

.input-area textarea {
  width: 100%;
  border: 1px solid #cad6ce;
  border-radius: 12px;
  padding: 15px;
  font: inherit;
  resize: vertical;
  margin-bottom: 12px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
