<script setup lang="ts">
import type { Exercise } from '~/types/learning'

const props = defineProps<{
  exercise: Exercise
}>()

const emit = defineEmits<{
  (e: 'submit', answer: string): void
}>()

const selectedOption = ref<string | null>(null)

const submit = () => {
  if (selectedOption.value) {
    emit('submit', selectedOption.value)
  }
}
</script>

<template>
  <div class="pattern-induction">
    <div class="discovery-header">
      <div class="icon">💡</div>
      <div class="header-text">
        <h4>Pattern Discovery</h4>
        <p class="muted">Notice how the language changes in these examples. Can you identify the rule?</p>
      </div>
    </div>

    <div class="examples-grid">
      <div v-for="(ex, i) in exercise.inductionData?.examples" :key="i" class="example-row">
        <div class="ex-prompt">{{ ex.prompt }}</div>
        <div class="ex-arrow">→</div>
        <div class="ex-answer">{{ ex.answer }}</div>
      </div>
    </div>

    <div class="challenge-box">
      <p class="challenge-label">{{ exercise.inductionData?.ruleChallenge }}</p>
      <div class="options-list">
        <button 
          v-for="opt in exercise.inductionData?.options" 
          :key="opt.text"
          class="option-button"
          :class="{ selected: selectedOption === opt.text }"
          @click="selectedOption = opt.text"
        >
          {{ opt.text }}
        </button>
      </div>
    </div>

    <button 
      class="button primary full-width" 
      :disabled="!selectedOption"
      @click="submit"
    >
      Confirm Discovery
    </button>
  </div>
</template>

<style scoped>
.pattern-induction {
  background: white;
  padding: 32px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.discovery-header {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.discovery-header .icon {
  font-size: 24px;
  background: #fef3c7;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.discovery-header h4 {
  margin: 0;
  color: #92400e;
}

.discovery-header p {
  margin: 4px 0 0;
  font-size: 14px;
}

.examples-grid {
  background: #f8fafc;
  padding: 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.example-row {
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 15px;
}

.ex-prompt { color: #64748b; }
.ex-arrow { color: #94a3b8; font-weight: bold; }
.ex-answer { color: #1e293b; font-weight: 600; }

.challenge-box {
  margin-bottom: 32px;
}

.challenge-label {
  font-weight: 600;
  margin-bottom: 16px;
  color: #334155;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-button {
  text-align: left;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 15px;
  color: #475569;
}

.option-button:hover {
  border-color: #cbd5e1;
  background: #f8fafc;
}

.option-button.selected {
  border-color: #176b5b;
  background: #e8f3ec;
  color: #176b5b;
  font-weight: 600;
}

.full-width {
  width: 100%;
}
</style>
