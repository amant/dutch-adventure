<script setup lang="ts">
import type { Exercise, Feedback } from '~/types/learning'
import { useLearnerMemory } from '~/composables/useLearnerMemory'

const props = defineProps<{
  exercise: Exercise
  feedback?: Feedback
}>()

const emit = defineEmits(['submit'])
const response = defineModel<string>()

const { getFrontierConcepts } = useLearnerMemory()
const frontier = computed(() => getFrontierConcepts(3))
</script>

<template>
  <div class="personalisation-exercise">
    <div class="prompt-card">
      <div class="icon">💬</div>
      <div class="content">
        <h3>{{ exercise.prompt }}</h3>
        <p class="muted">Try to use your own life and experiences in your answer.</p>
      </div>
    </div>

    <SmartPalette 
      :user-text="response || ''"
      :target-vocabulary="exercise.vocabulary"
      :target-grammar="exercise.grammar"
      :frontier-concepts="frontier"
    />

    <form v-if="!feedback" @submit.prevent="emit('submit')" class="input-area">
      <textarea 
        v-model="response" 
        :placeholder="exercise.placeholder || 'Type your personal answer here...'" 
        rows="4" 
        autofocus 
      />
      <div class="footer">
        <span class="count">{{ response?.split(' ').filter(Boolean).length || 0 }} words</span>
        <button class="button" type="submit" :disabled="!response">Check Answer</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.personalisation-exercise {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.prompt-card {
  display: flex;
  gap: 16px;
  background: #f3f7f2;
  padding: 24px;
  border-radius: 16px;
  align-items: flex-start;
  border: 1px solid #e1e9e3;
}

.prompt-card .icon {
  font-size: 32px;
}

.prompt-card h3 {
  margin: 0 0 8px;
  font-size: 20px;
  color: #176b5b;
}

.tags-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.eyebrow {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #687873;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: white;
  border: 1px solid #cad6ce;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  color: #687873;
  transition: all 0.2s;
}

.tag.used {
  background: #176b5b;
  color: white;
  border-color: #176b5b;
}

.input-area textarea {
  width: 100%;
  border: 1px solid #cad6ce;
  border-radius: 12px;
  padding: 15px;
  font: inherit;
  resize: vertical;
  margin-bottom: 12px;
  background: #fff;
  transition: border-color 0.2s;
}

.input-area textarea:focus {
  outline: none;
  border-color: #176b5b;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.count {
  font-size: 13px;
  color: #687873;
}
</style>
