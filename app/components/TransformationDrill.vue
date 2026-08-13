<script setup lang="ts">
import type { Exercise, Feedback } from '~/types/learning'

const props = defineProps<{
  exercise: Exercise
  feedback?: Feedback
}>()

const emit = defineEmits(['submit', 'next', 'retry'])
const response = defineModel<string>()

const parts = computed(() => {
  if (!props.exercise.context) return []
  return props.exercise.context.split('\n')
})
</script>

<template>
  <div class="transformation-drill">
    <div class="instruction card">
      <div class="eyebrow">Original</div>
      <p class="original">{{ parts[0] }}</p>
      
      <div class="change-instruction">
        <span class="icon">➔</span>
        <span>{{ exercise.prompt }}</span>
      </div>
    </div>

    <form v-if="!feedback" @submit.prevent="emit('submit')" class="input-area">
      <textarea 
        v-model="response" 
        :placeholder="exercise.placeholder || 'Type the modified sentence...'" 
        rows="3" 
        autofocus 
      />
      <button class="button" type="submit">Check transformation</button>
    </form>
  </div>
</template>

<style scoped>
.transformation-drill {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.instruction {
  background: #f0f4f2;
  border: 2px dashed #cad6ce;
}

.original {
  font-size: 22px;
  font-weight: 500;
  margin: 8px 0 20px;
  color: #176b5b;
}

.change-instruction {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  color: #d06b3c;
  font-weight: 600;
  padding-top: 15px;
  border-top: 1px solid #cad6ce;
}

.input-area textarea {
  width: 100%;
  border: 2px solid #176b5b;
  border-radius: 12px;
  padding: 15px;
  font: inherit;
  resize: vertical;
  margin-bottom: 14px;
  background: white;
}

.input-area textarea:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(23, 107, 91, 0.1);
}
</style>
