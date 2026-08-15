<script setup lang="ts">
import { useLearnerMemory } from '~/composables/useLearnerMemory';
import { lookupWord, type Hint } from '~/utils/dictionary';

const props = defineProps<{
  text: string;
}>();

const { recordExposure, getWordState } = useLearnerMemory();
const selectedWord = ref<{ word: string; meaning: string; category?: string } | null>(null);

const tokens = computed(() => {
  if (!props.text) return [];
  // Split by whitespace but keep the whitespace tokens
  const rawTokens = props.text.split(/(\s+)/);

  return rawTokens.map((token) => {
    // If it's just whitespace, it's not a word
    if (token.match(/^\s+$/)) {
      return { text: token, isInteractable: false };
    }

    const cleanWord = token.toLowerCase().replace(/[.,!?;:()]/g, '').trim();
    const hint = lookupWord(cleanWord);
    const state = getWordState(cleanWord);

    return {
      text: token,
      isInteractable: !!hint || state !== 'new', // Interactable if we have a hint OR it's already in memory
      hint,
      state,
    };
  });
});

const stats = computed(() => {
  const words = tokens.value.filter(t => !t.text.match(/^\s+$/));
  const total = words.length;
  if (total === 0) return { mastered: 0, frontier: 0, recognized: 0, new: 0 };

  const counts = { mastered: 0, frontier: 0, recognized: 0, new: 0 };
  words.forEach((w) => {
    counts[w.state as keyof typeof counts]++;
  });

  return {
    mastered: Math.round((counts.mastered / total) * 100),
    frontier: Math.round((counts.frontier / total) * 100),
    recognized: Math.round((counts.recognized / total) * 100),
    new: Math.round((counts.new / total) * 100),
  };
});

const showHint = (token: any) => {
  const cleanWord = token.text.toLowerCase().replace(/[.,!?;:()]/g, '').trim();
  if (token.hint) {
    selectedWord.value = { word: cleanWord, ...token.hint };
  } else if (token.state !== 'new') {
    selectedWord.value = { word: cleanWord, meaning: '(In your vocabulary library)', category: 'known' };
  }

  recordExposure(cleanWord);
};
</script>

<template>
  <div class="text-analyzer">
    <div class="stats-bar card">
      <div class="stat">
        <span class="dot mastered" />
        <span class="label">Mastered: {{ stats.mastered }}%</span>
      </div>
      <div class="stat">
        <span class="dot frontier" />
        <span class="label">Frontier: {{ stats.frontier }}%</span>
      </div>
      <div class="stat">
        <span class="dot recognized" />
        <span class="label">Recognized: {{ stats.recognized }}%</span>
      </div>
      <div class="stat">
        <span class="dot new" />
        <span class="label">New: {{ stats.new }}%</span>
      </div>
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
  </div>
</template>

<style scoped lang="scss">
.text-analyzer {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stats-bar {
  display: flex;
  gap: 20px;
  padding: 14px 20px;
  background: $ocean-ice;
  border: 1px solid $ocean-border;
  border-radius: $radius-md;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: $font-anime;
  font-size: 13px;
  font-weight: 700;
  color: $ink-slate;
}

.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.mastered { background: $sea-emerald; }
.dot.frontier { background: $gold-parchment; }
.dot.recognized { background: $ocean-sky; }
.dot.new { background: #cbd5e1; }

.content-box {
  font-size: 18px;
  line-height: 1.8;
  padding: 28px;
  background: $white-pure;
  border: 1.5px solid $ocean-border;
  border-radius: $radius-xl;
  color: $ocean-deepest;
  white-space: pre-wrap;
  box-shadow: $shadow-card;
}

.word.interactable {
  color: $ocean-deepest;
  font-weight: 600;
  border-bottom: 2px solid $ocean-border;
  cursor: pointer;
  transition: all $transition-fast;
  padding: 1px 3px;
  border-radius: $radius-xs;

  &.new { border-bottom-color: #cbd5e1; }
  &.recognized { border-bottom-color: $ocean-sky; color: $ocean-primary; }
  &.frontier { border-bottom-color: $gold-bright; color: $gold-deep; font-weight: 700; }
  &.mastered { border-bottom-color: $sea-emerald; color: $sea-emerald-dark; font-weight: 700; }

  &:hover {
    background: $ocean-light;
  }

  &.active {
    background: linear-gradient(135deg, $ocean-primary 0%, $ocean-vibrant 100%);
    color: $white-pure;
    box-shadow: 0 2px 6px rgba(0, 102, 204, 0.35);
  }
}

.hint-popup {
  background: linear-gradient(135deg, $white-pure 0%, $parchment-bg 100%);
  border: 1.5px solid $gold-bright;
  border-top: 4px solid $gold-parchment;
  border-radius: $radius-lg;
  padding: 20px;
  box-shadow: $shadow-card;
}

.hint-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.word-label {
  font-family: $font-anime;
  font-size: 19px;
  font-weight: 800;
  color: $ocean-deepest;
}

.category-tag {
  font-family: $font-anime;
  font-size: 10px;
  text-transform: uppercase;
  background: $parchment-border;
  color: $gold-dark;
  padding: 2px 8px;
  border-radius: $radius-xs;
  font-weight: 800;
}

.close-btn {
  margin-left: auto;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: $ink-muted;

  &:hover {
    color: $battle-red-vibrant;
  }
}

.meaning {
  font-size: 16px;
  color: $ink-slate;
  line-height: 1.5;
  margin: 0;
}
</style>
