<script setup lang="ts">
import type { Exercise, Feedback } from '~/types/learning';

const props = defineProps<{
  exercise: Exercise;
  feedback?: Feedback;
}>();

const emit = defineEmits(['submit']);
const response = defineModel<string>();

const selectOption = (option: string) => {
  if (props.feedback) return;
  response.value = option;
};
</script>

<template>
  <div class="connector-drill">
    <div class="passage-card card">
      <p class="context">
        {{ exercise.context }}
      </p>
      <div class="sentence-with-gap">
        <span
          v-for="(part, i) in exercise.prompt.split('___')"
          :key="i"
        >
          {{ part }}
          <span
            v-if="i < exercise.prompt.split('___').length - 1"
            class="gap"
            :class="{ filled: response, correct: feedback?.outcome === 'correct', wrong: feedback?.outcome === 'retry' && response === feedback.target }"
          >
            {{ response || '...' }}
          </span>
        </span>
      </div>
    </div>

    <div
      v-if="!feedback"
      class="options-grid"
    >
      <button
        v-for="opt in exercise.connectorOptions"
        :key="opt.text"
        class="option-button"
        :class="{ selected: response === opt.text }"
        @click="selectOption(opt.text)"
      >
        {{ opt.text }}
      </button>
    </div>

    <div
      v-if="!feedback"
      class="footer"
    >
      <button
        class="button"
        :disabled="!response"
        @click="emit('submit')"
      >
        Check Connector
      </button>
    </div>

    <div
      v-if="feedback && feedback.explanation"
      class="explanation-card"
    >
      <p>{{ feedback.explanation }}</p>
    </div>
  </div>
</template>

<style scoped>
.connector-drill {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.passage-card {
  background: white;
  padding: 30px;
  line-height: 1.8;
  font-size: 18px;
}

.context {
  font-size: 15px;
  color: #687873;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f4f2;
}

.sentence-with-gap {
  font-weight: 500;
}

.gap {
  display: inline-block;
  min-width: 80px;
  border-bottom: 2px solid #cad6ce;
  text-align: center;
  color: #176b5b;
  margin: 0 4px;
  padding: 0 8px;
  transition: all 0.2s;
}

.gap.filled { border-bottom-color: #176b5b; font-weight: 700; }
.gap.correct { color: #176b5b; border-bottom-color: #176b5b; }
.gap.wrong { color: #d00000; border-bottom-color: #d00000; }

.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.option-button {
  background: white;
  border: 2px solid #cad6ce;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  color: #3d4a46;
}

.option-button:hover {
  border-color: #176b5b;
  background: #f0f7f4;
}

.option-button.selected {
  border-color: #176b5b;
  background: #176b5b;
  color: white;
}

.explanation-card {
  background: #f0f7f4;
  padding: 15px;
  border-radius: 8px;
  color: #176b5b;
  font-size: 14px;
}
</style>
