<script setup lang="ts">
import type { Exercise } from '~/types/learning'

const props = defineProps<{
  exercise: Exercise
  modelValue: string
  disabled?: boolean
}>()

const emit = defineEmits(['update:modelValue', 'submit'])

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !props.disabled) {
    emit('submit')
  }
}
</script>

<template>
  <div class="flexibility-drill">
    <div class="source-sentence">
      <div class="eyebrow">Original Sentence</div>
      <p>{{ exercise.context }}</p>
    </div>

    <div class="constraint-box">
      <div class="eyebrow">The Challenge</div>
      <p>{{ exercise.prompt }}</p>
      
      <div class="tags">
        <span v-if="exercise.requiredWords?.length" class="tag required">
          Use: {{ exercise.requiredWords.join(', ') }}
        </span>
        <span v-if="exercise.forbiddenWords?.length" class="tag forbidden">
          Avoid: {{ exercise.forbiddenWords.join(', ') }}
        </span>
      </div>
    </div>

    <div class="input-area">
      <input
        type="text"
        :value="modelValue"
        :placeholder="exercise.placeholder || 'Type your alternative version...'"
        :disabled="disabled"
        @input="onInput"
        @keydown="onKeydown"
        autofocus
      />
    </div>
  </div>
</template>

<style scoped>
.flexibility-drill {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.source-sentence {
  background: #f8faf9;
  border-left: 4px solid #176b5b;
  padding: 16px;
  border-radius: 4px 12px 12px 4px;
}

.source-sentence p {
  font-size: 18px;
  font-weight: 500;
  color: #20302d;
  margin: 0;
}

.constraint-box {
  background: #fff9f5;
  border: 1px dashed #d06b3c;
  padding: 16px;
  border-radius: 12px;
}

.constraint-box p {
  margin: 0 0 12px;
  font-weight: 600;
  color: #8c411d;
}

.tags {
  display: flex;
  gap: 8px;
}

.tag {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 700;
}

.tag.required { background: #e6f2f0; color: #176b5b; }
.tag.forbidden { background: #fee2e2; color: #991b1b; }

input {
  width: 100%;
  padding: 16px;
  font-size: 18px;
  border: 2px solid #e1e5de;
  border-radius: 12px;
  background: white;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #176b5b;
}

input:disabled {
  background: #f0f2f0;
  cursor: not-allowed;
}
</style>
