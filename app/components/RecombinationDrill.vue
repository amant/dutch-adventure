<script setup lang="ts">
import type { Exercise, Feedback } from '~/types/learning'

const props = defineProps<{
  exercise: Exercise
  feedback?: Feedback
}>()

const emit = defineEmits(['submit'])
const response = defineModel<string>()

const isUsed = (word: string) => {
  if (!response.value) return false
  return response.value.toLowerCase().includes(word.toLowerCase())
}
</script>

<template>
  <div class="recombination-drill">
    <div class="targets-container card">
      <div class="eyebrow">Combine these concepts:</div>
      <div class="targets-list">
        <div 
          v-for="word in exercise.requiredWords" 
          :key="word" 
          class="target-tag"
          :class="{ used: isUsed(word), 'correct': feedback?.outcome === 'correct' }"
        >
          {{ word }}
          <span v-if="isUsed(word)" class="check">✓</span>
        </div>
      </div>
    </div>

    <div class="prompt-container">
      <h3>{{ exercise.prompt }}</h3>
      <p v-if="exercise.context" class="context">{{ exercise.context }}</p>
    </div>

    <div class="input-container">
      <textarea 
        v-model="response" 
        class="input-area" 
        placeholder="Type your Dutch sentence here..."
        :disabled="!!feedback"
        @keydown.enter.prevent="emit('submit')"
      ></textarea>
      
      <div v-if="!feedback" class="controls">
        <button class="button" @click="emit('submit')" :disabled="!response">Check Recombination</button>
      </div>
    </div>

    <div v-if="feedback" class="feedback-extra card" :class="feedback.outcome">
      <p v-if="feedback.message">{{ feedback.message }}</p>
      <div v-if="feedback.teacherCorrection" class="correction">
        <div class="label">Natural:</div>
        <div class="text">{{ feedback.teacherCorrection.natural }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recombination-drill {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.targets-container {
  background: #f8faf9;
  padding: 20px;
  border: 1px dashed #cad6ce;
}

.targets-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 10px;
}

.target-tag {
  background: white;
  border: 2px solid #cad6ce;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 700;
  color: #687873;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.target-tag.used {
  border-color: #176b5b;
  color: #176b5b;
  background: #f0f7f4;
  transform: scale(1.05);
}

.target-tag.correct {
  background: #176b5b;
  color: white;
  border-color: #176b5b;
}

.check {
  font-weight: 900;
}

.prompt-container h3 {
  margin-bottom: 8px;
}

.context {
  color: #687873;
  font-style: italic;
}

.input-area {
  width: 100%;
  min-height: 120px;
  padding: 16px;
  border: 2px solid #cad6ce;
  border-radius: 12px;
  font-size: 18px;
  font-family: inherit;
  resize: vertical;
  margin-bottom: 12px;
}

.input-area:focus {
  outline: none;
  border-color: #176b5b;
}

.feedback-extra {
  padding: 20px;
  border-left: 4px solid #cad6ce;
}

.feedback-extra.correct { border-left-color: #176b5b; background: #f0f7f4; }
.feedback-extra.acceptable { border-left-color: #f59e0b; background: #fffbeb; }
.feedback-extra.retry { border-left-color: #ef4444; background: #fef2f2; }

.correction {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(0,0,0,0.05);
}

.correction .label {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  color: #687873;
}

.correction .text {
  font-size: 17px;
  font-weight: 500;
  color: #176b5b;
}
</style>
