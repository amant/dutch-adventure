<script setup lang="ts">
import type { Exercise } from '~/types/learning'

const props = defineProps<{
  exercise: Exercise
  modelValue: string
  disabled?: boolean
}>()

const emit = defineEmits(['update:modelValue', 'submit'])

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
}

const wordCount = computed(() => {
  return props.modelValue.trim() ? props.modelValue.trim().split(/\s+/).length : 0
})

const isLengthMet = computed(() => {
  return !props.exercise.minimumLength || wordCount.value >= props.exercise.minimumLength
})
</script>

<template>
  <div class="final-challenge">
    <div class="mission-prompt">
      <div class="eyebrow">The Mission</div>
      <h2>{{ exercise.prompt }}</h2>
      <p v-if="exercise.context" class="context">{{ exercise.context }}</p>
    </div>

    <div class="writing-container">
      <textarea
        :value="modelValue"
        :placeholder="exercise.placeholder || 'Write your response here...'"
        :disabled="disabled"
        @input="onInput"
        rows="6"
        autofocus
      ></textarea>
      
      <div class="footer">
        <div class="stats">
          <span :class="{ 'error': !isLengthMet && modelValue.length > 0 }">
            {{ wordCount }} / {{ exercise.minimumLength || 0 }} words
          </span>
        </div>
        <div v-if="!disabled" class="hint">Press Submit when you're ready for teacher evaluation.</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.final-challenge {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.mission-prompt h2 {
  font-size: 24px;
  color: #20302d;
  margin: 8px 0;
}

.context {
  color: #52645f;
  font-size: 16px;
  line-height: 1.5;
}

.writing-container {
  position: relative;
}

textarea {
  width: 100%;
  padding: 20px;
  font-size: 18px;
  line-height: 1.6;
  border: 2px solid #e1e5de;
  border-radius: 16px;
  background: white;
  resize: vertical;
  transition: all 0.3s;
  font-family: inherit;
}

textarea:focus {
  outline: none;
  border-color: #176b5b;
  box-shadow: 0 4px 20px rgba(23, 107, 91, 0.08);
}

textarea:disabled {
  background: #f8faf9;
  color: #52645f;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  font-size: 14px;
  color: #8a9a94;
}

.stats .error {
  color: #d06b3c;
  font-weight: 600;
}

.hint {
  font-style: italic;
}
</style>
