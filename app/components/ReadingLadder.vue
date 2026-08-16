<script setup lang="ts">
import type { Exercise, Feedback } from '~/types/learning';
import { useLearnerMemory } from '~/composables/useLearnerMemory';
import ReadAloudButton from './ReadAloudButton.vue';

const props = defineProps<{
  exercise: Exercise;
  feedback?: Feedback;
}>();

const emit = defineEmits(['submit', 'next', 'retry']);
const { recordExposure, getWordState } = useLearnerMemory();

const selectedWord = ref<{ word: string; meaning: string; category?: string } | null>(null);

const tokens = computed(() => {
  if (!props.exercise.readingContent) return [];
  // Split by whitespace but keep the whitespace tokens
  const rawTokens = props.exercise.readingContent.split(/(\s+)/);

  return rawTokens.map((token) => {
    // If it's just whitespace, it's not a word
    if (token.match(/^\s+$/)) {
      return { text: token, isInteractable: false };
    }

    const cleanWord = token.toLowerCase().replace(/[.,!?;:()]/g, '').trim();
    const hint = props.exercise.wordHints?.[cleanWord];
    const state = getWordState(cleanWord);

    return {
      text: token,
      isInteractable: !!hint,
      hint,
      state,
    };
  });
});

const showHint = (token: any) => {
  if (token.hint) {
    selectedWord.value = { word: token.text.replace(/[.,!?;:()]/g, '').trim(), ...token.hint };
    const cleanWord = token.text.toLowerCase().replace(/[.,!?;:()]/g, '').trim();
    recordExposure(cleanWord);
  }
};
</script>

<template>
  <div class="reading-ladder">
    <div
      v-if="exercise.readingContent"
      class="read-aloud-row"
    >
      <ReadAloudButton :text="exercise.readingContent" />
    </div>
    <div class="content-box card">
      <template
        v-for="(token, idx) in tokens"
        :key="idx"
      >
        <span
          v-if="token.isInteractable"
          class="word interactable"
          :class="[
            token.state,
            { active: selectedWord?.word.toLowerCase() === token.text.toLowerCase().replace(/[.,!?;:()]/g, '').trim() },
          ]"
          @click="showHint(token)"
        >
          {{ token.text }}
        </span>
        <span v-else>{{ token.text }}</span>
      </template>
    </div>

    <div
      v-if="selectedWord"
      class="hint-popup card"
    >
      <div class="hint-header">
        <span class="word-label">{{ selectedWord.word }}</span>
        <span
          v-if="selectedWord.category"
          class="category-tag"
        >{{ selectedWord.category }}</span>
        <button
          class="close-btn"
          @click="selectedWord = null"
        >
          ×
        </button>
      </div>
      <p class="meaning">
        {{ selectedWord.meaning }}
      </p>
    </div>

    <div
      v-if="!feedback"
      class="mission-status"
    >
      <p class="muted">
        Read the text above. Click on highlighted words to see their meaning.
      </p>
      <button
        class="button"
        @click="emit('submit')"
      >
        I've finished reading
      </button>
    </div>
  </div>
</template>

<style scoped>
.reading-ladder {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.read-aloud-row {
  display: flex;
  justify-content: flex-start;
}

.content-box {
  font-size: 20px;
  line-height: 1.8;
  padding: 30px;
  background: white;
  border-radius: 16px;
  color: #1a1a1a;
  white-space: pre-wrap;
}

.word.interactable {
  color: #1a1a1a;
  font-weight: 500;
  border-bottom: 2px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0 2px;
}

.word.interactable.new { border-bottom-color: #cbd5e1; }
.word.interactable.recognized { border-bottom-color: #94a3b8; font-weight: 600; }
.word.interactable.frontier { border-bottom-color: #f59e0b; color: #b45309; font-weight: 600; }
.word.interactable.mastered { border-bottom-color: #10b981; color: #065f46; font-weight: 600; }

.word.interactable:hover {
  background: #f1f5f9;
  border-radius: 4px;
}

.word.interactable.active {
  background: #176b5b;
  color: white;
  border-radius: 4px;
  text-decoration: none;
}

.hint-popup {
  background: #fffcf4;
  border: 1px solid #f9e8b9;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.hint-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.word-label {
  font-size: 18px;
  font-weight: 700;
  color: #d06b3c;
}

.category-tag {
  font-size: 10px;
  text-transform: uppercase;
  background: #fef1e8;
  color: #d06b3c;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.close-btn {
  margin-left: auto;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #8a9a94;
}

.meaning {
  font-size: 16px;
  margin: 0;
}

.mission-status {
  text-align: center;
}
</style>
