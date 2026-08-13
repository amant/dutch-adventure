<script setup lang="ts">
import { useLearnerMemory } from '~/composables/useLearnerMemory'
import { lookupWord, type Hint } from '~/utils/dictionary'

const props = defineProps<{
  text: string
}>()

const { recordExposure, getWordState } = useLearnerMemory()
const selectedWord = ref<{ word: string, meaning: string, category?: string } | null>(null)

const tokens = computed(() => {
  if (!props.text) return []
  // Split by whitespace but keep the whitespace tokens
  const rawTokens = props.text.split(/(\s+)/)
  
  return rawTokens.map(token => {
    // If it's just whitespace, it's not a word
    if (token.match(/^\s+$/)) {
      return { text: token, isInteractable: false }
    }

    const cleanWord = token.toLowerCase().replace(/[.,!?;:()]/g, '').trim()
    const hint = lookupWord(cleanWord)
    const state = getWordState(cleanWord)

    return {
      text: token,
      isInteractable: !!hint || state !== 'new', // Interactable if we have a hint OR it's already in memory
      hint,
      state
    }
  })
})

const stats = computed(() => {
  const words = tokens.value.filter(t => !t.text.match(/^\s+$/))
  const total = words.length
  if (total === 0) return { mastered: 0, frontier: 0, recognized: 0, new: 0 }
  
  const counts = { mastered: 0, frontier: 0, recognized: 0, new: 0 }
  words.forEach(w => {
    counts[w.state as keyof typeof counts]++
  })

  return {
    mastered: Math.round((counts.mastered / total) * 100),
    frontier: Math.round((counts.frontier / total) * 100),
    recognized: Math.round((counts.recognized / total) * 100),
    new: Math.round((counts.new / total) * 100)
  }
})

const showHint = (token: any) => {
  const cleanWord = token.text.toLowerCase().replace(/[.,!?;:()]/g, '').trim()
  if (token.hint) {
    selectedWord.value = { word: cleanWord, ...token.hint }
  } else if (token.state !== 'new') {
    selectedWord.value = { word: cleanWord, meaning: '(In your vocabulary library)', category: 'known' }
  }
  
  recordExposure(cleanWord)
}
</script>

<template>
  <div class="text-analyzer">
    <div class="stats-bar card">
      <div class="stat">
        <span class="dot mastered"></span>
        <span class="label">Mastered: {{ stats.mastered }}%</span>
      </div>
      <div class="stat">
        <span class="dot frontier"></span>
        <span class="label">Frontier: {{ stats.frontier }}%</span>
      </div>
      <div class="stat">
        <span class="dot recognized"></span>
        <span class="label">Recognized: {{ stats.recognized }}%</span>
      </div>
      <div class="stat">
        <span class="dot new"></span>
        <span class="label">New: {{ stats.new }}%</span>
      </div>
    </div>

    <div class="content-box card">
      <template v-for="(token, idx) in tokens" :key="idx">
        <span 
          v-if="token.isInteractable" 
          class="word interactable" 
          @click="showHint(token)"
          :class="[
            token.state,
            { active: selectedWord?.word.toLowerCase() === token.text.toLowerCase().replace(/[.,!?;:()]/g, '').trim() }
          ]"
        >
          {{ token.text }}
        </span>
        <span v-else>{{ token.text }}</span>
      </template>
    </div>

    <div v-if="selectedWord" class="hint-popup card">
      <div class="hint-header">
        <span class="word-label">{{ selectedWord.word }}</span>
        <span v-if="selectedWord.category" class="category-tag">{{ selectedWord.category }}</span>
        <button class="close-btn" @click="selectedWord = null">×</button>
      </div>
      <p class="meaning">{{ selectedWord.meaning }}</p>
    </div>
  </div>
</template>

<style scoped>
.text-analyzer {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stats-bar {
  display: flex;
  gap: 20px;
  padding: 12px 20px;
  background: #f8fafc;
  border-radius: 12px;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
}

.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.mastered { background: #10b981; }
.dot.frontier { background: #f59e0b; }
.dot.recognized { background: #94a3b8; }
.dot.new { background: #cbd5e1; }

.content-box {
  font-size: 18px;
  line-height: 1.8;
  padding: 24px;
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
}

.hint-popup {
  background: #fffcf4;
  border: 1px solid #f9e8b9;
  padding: 20px;
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
</style>
