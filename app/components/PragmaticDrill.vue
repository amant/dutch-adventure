<script setup lang="ts">
import type { Exercise, Feedback } from '~/types/learning'

const props = defineProps<{
  exercise: Exercise
  feedback?: Feedback
}>()

const emit = defineEmits(['submit'])

const selectedIndex = ref<number | null>(null)

function select(index: number) {
  if (props.feedback) return
  selectedIndex.value = index
  const option = props.exercise.pragmaticOptions![index]
  emit('submit', option.text)
}
</script>

<template>
  <div class="pragmatic-drill">
    <div class="scenario card">
      <div class="eyebrow">The Scenario</div>
      <p class="prompt">{{ exercise.prompt }}</p>
      <div v-if="exercise.context" class="context-box">{{ exercise.context }}</div>
    </div>

    <div class="options-grid">
      <button 
        v-for="(option, idx) in exercise.pragmaticOptions" 
        :key="idx"
        class="card option-card"
        :class="{ 
          selected: selectedIndex === idx, 
          best: feedback && option.isBest,
          wrong: feedback && selectedIndex === idx && !option.isBest,
          disabled: !!feedback
        }"
        @click="select(idx)"
      >
        <div class="option-content">
          <span class="context-tag">{{ option.context }}</span>
          <p class="option-text">"{{ option.text }}"</p>
          <p v-if="feedback && (selectedIndex === idx || option.isBest)" class="option-explanation">
            {{ option.explanation }}
          </p>
        </div>
        <div v-if="feedback" class="status-icon">
          {{ option.isBest ? '✅' : selectedIndex === idx ? '❌' : '' }}
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.pragmatic-drill {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.scenario {
  background: #f8fafc;
  border-left: 4px solid #64748b;
}

.prompt {
  font-size: 20px;
  font-weight: 600;
  margin: 12px 0;
  color: #1e293b;
}

.context-box {
  font-size: 14px;
  color: #64748b;
  font-style: italic;
  padding: 10px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.options-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.option-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid #e2e8f0;
  background: white;
}

.option-card:hover:not(.disabled) {
  border-color: #94a3b8;
  transform: translateX(4px);
}

.option-card.selected {
  border-color: #64748b;
  background: #f1f5f9;
}

.option-card.best {
  border-color: #176b5b;
  background: #f0fdf4;
}

.option-card.wrong {
  border-color: #e53e3e;
  background: #fef2f2;
}

.option-card.disabled {
  cursor: default;
}

.context-tag {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: #64748b;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 4px;
}

.best .context-tag {
  color: #176b5b;
  background: #dcfce7;
}

.option-text {
  font-size: 18px;
  font-weight: 500;
  margin: 8px 0;
  color: #1e293b;
}

.option-explanation {
  font-size: 13px;
  color: #64748b;
  margin: 4px 0 0;
}

.status-icon {
  font-size: 24px;
  margin-left: 16px;
}
</style>
