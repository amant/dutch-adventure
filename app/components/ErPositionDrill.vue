<script setup lang="ts">
import { ref } from 'vue';
import type { Exercise, Feedback } from '~/types/learning';

const props = defineProps<{
  exercise: Exercise;
  feedback?: Feedback;
}>();

const emit = defineEmits(['submit', 'next']);

const selectedOptionIndex = ref<number | null>(null);

function handleSelect(index: number) {
  if (props.feedback) return;
  selectedOptionIndex.value = index;
}

function handleSubmit() {
  if (selectedOptionIndex.value === null) return;
  const option = props.exercise.erDrillData?.options[selectedOptionIndex.value];
  emit('submit', option?.text);
}
</script>

<template>
  <div class="er-drill">
    <div class="card drill-card">
      <div class="header">
        <div class="eyebrow">
          B2 Structural Precision
        </div>
        <div class="badge">
          Mastering 'Er' & Position
        </div>
      </div>

      <div class="instruction">
        <h3>{{ exercise.prompt }}</h3>
        <p
          v-if="exercise.context"
          class="muted"
        >
          {{ exercise.context }}
        </p>
      </div>

      <div
        v-if="exercise.erDrillData"
        class="sentence-display mt-6"
      >
        <p class="sentence">
          {{ exercise.erDrillData.sentence }}
        </p>
      </div>

      <div
        v-if="exercise.erDrillData"
        class="options-grid mt-6"
      >
        <button
          v-for="(option, index) in exercise.erDrillData.options"
          :key="index"
          class="option-button"
          :class="{
            selected: selectedOptionIndex === index,
            correct: feedback && option.isCorrect,
            incorrect: feedback && selectedOptionIndex === index && !option.isCorrect,
          }"
          :disabled="!!feedback"
          @click="handleSelect(index)"
        >
          <div class="option-content">
            <span class="option-text">{{ option.text }}</span>
            <span
              v-if="option.function"
              class="function-tag"
            >{{ option.function }}</span>
          </div>
        </button>
      </div>

      <div
        v-if="!feedback"
        class="actions mt-8"
      >
        <button
          class="button primary full-width"
          :disabled="selectedOptionIndex === null"
          @click="handleSubmit"
        >
          Verify Selection
        </button>
      </div>
    </div>

    <div
      v-if="feedback"
      class="feedback-section mt-6"
    >
      <div
        class="card feedback-card"
        :class="feedback.outcome"
      >
        <div class="outcome-header">
          <span class="outcome-badge">{{ feedback.outcome }}</span>
          <span class="score-badge">+{{ feedback.changeModifier }} mastery</span>
        </div>

        <p class="feedback-message">
          {{ feedback.message }}
        </p>

        <div
          v-if="exercise.erDrillData?.explanation || feedback.explanation"
          class="explanation-box mt-4"
        >
          <div class="eyebrow">
            Grammar Assistant:
          </div>
          <p>{{ feedback.explanation || exercise.erDrillData?.explanation }}</p>
        </div>

        <button
          class="button primary mt-6"
          @click="$emit('next')"
        >
          Continue Practice
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.er-drill { max-width: 600px; margin: 0 auto; }
.drill-card { padding: 32px; border-top: 6px solid #d06b3c; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.badge { background: #fef1e8; color: #d06b3c; font-size: 10px; padding: 2px 8px; border-radius: 99px; font-weight: 800; text-transform: uppercase; }

.instruction h3 { margin-bottom: 8px; color: #1e293b; }
.muted { color: #64748b; font-size: 15px; }

.sentence-display { background: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center; }
.sentence { font-size: 20px; font-weight: 600; color: #334155; }

.options-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
.option-button {
  padding: 16px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}
.option-button:hover:not(:disabled) { border-color: #d06b3c; background: #fffaf0; }
.option-button.selected { border-color: #d06b3c; background: #fff7ed; box-shadow: 0 0 0 2px rgba(208, 107, 60, 0.1); }

.option-button.correct { border-color: #176b5b; background: #e8f3ec; }
.option-button.incorrect { border-color: #ef4444; background: #fef2f2; }

.option-content { display: flex; justify-content: space-between; align-items: center; }
.option-text { font-size: 16px; font-weight: 600; color: #1e293b; }
.function-tag { font-size: 10px; text-transform: uppercase; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; color: #64748b; font-weight: 700; }

.feedback-card { padding: 24px; border-left: 6px solid #cbd5e1; }
.feedback-card.correct { border-left-color: #176b5b; }
.feedback-card.retry { border-left-color: #ef4444; }

.outcome-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.score-badge { font-size: 12px; font-weight: 700; color: #176b5b; }

.explanation-box { background: #fff7ed; padding: 16px; border-radius: 12px; border: 1px solid #ffedd5; }
.explanation-box p { font-size: 14px; color: #9a3412; line-height: 1.6; margin-top: 4px; }

.full-width { width: 100%; }
.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
.mt-8 { margin-top: 32px; }
</style>
