<script setup lang="ts">
import { articles } from '~/data/articles'
import { useLearnerMemory } from '~/composables/useLearnerMemory'

const route = useRoute()
const { memory, hydrate, recordExposure } = useLearnerMemory()
onMounted(hydrate)

const article = computed(() => articles.find(a => a.id === route.params.id))

const selectedWord = ref<{ word: string, meaning: string, category?: string } | null>(null)

const tokens = computed(() => {
  if (!article.value) return []
  const rawTokens = article.value.content.split(/(\s+)/)
  
  return rawTokens.map(token => {
    if (token.match(/^\s+$/)) return { text: token, isInteractable: false }
    
    const cleanWord = token.toLowerCase().replace(/[.,!?;:()]/g, '').trim()
    const hint = article.value.wordHints[cleanWord]
    
    // Check memory
    const state = memory.value.vocabulary[cleanWord]
    const mastery = state ? (state.recognition + state.meaning) / 2 : 0
    
    return {
      text: token,
      isInteractable: true,
      hint,
      mastery,
      isKnown: mastery > 50,
      isWeak: mastery > 0 && mastery <= 50
    }
  })
})

const handleWordClick = (token: any) => {
  const cleanWord = token.text.toLowerCase().replace(/[.,!?;:()]/g, '').trim()
  
  if (token.hint) {
    selectedWord.value = { word: token.text.replace(/[.,!?;:()]/g, '').trim(), ...token.hint }
  } else {
    // Fallback dictionary for common words not in hints
    const fallbackDict: Record<string, string> = {
      'het': 'the (neuter)',
      'de': 'the (masculine/feminine)',
      'is': 'is',
      'vandaag': 'today',
      'mooi': 'beautiful',
      'weer': 'weather',
      'in': 'in',
      'nederland': 'the Netherlands',
      'de zon': 'the sun',
      'warm': 'warm',
      'veel': 'many',
      'mensen': 'people',
      'gaan': 'to go',
      'naar': 'to',
      'park': 'park',
      'maar': 'but',
      'morgen': 'tomorrow',
      'gaat': 'goes',
      'regenen': 'to rain',
      'dat': 'that',
      'nederlands': 'Dutch'
    }
    
    selectedWord.value = { 
      word: token.text.replace(/[.,!?;:()]/g, '').trim(), 
      meaning: fallbackDict[cleanWord] || 'No definition found, but we recorded your encounter!'
    }
  }
  
  recordExposure(cleanWord)
}

const readingFinished = ref(false)
const finishReading = () => {
  readingFinished.value = true
  // In a real app, we might award points or update progress
}
</script>

<template>
  <div v-if="article" class="article-page">
    <header class="article-header">
      <NuxtLink to="/reading" class="back-link">← Back to Feed</NuxtLink>
      <div class="meta">
        <span class="level-badge" :class="article.level">{{ article.level }}</span>
        <span class="source">{{ article.source }}</span>
      </div>
      <h1>{{ article.title }}</h1>
    </header>

    <div class="content-container">
      <div class="article-content card">
        <template v-for="(token, idx) in tokens" :key="idx">
          <span 
            v-if="token.isInteractable" 
            class="word" 
            :class="{ 
              'known': token.isKnown, 
              'weak': token.isWeak,
              'has-hint': !!token.hint,
              'active': selectedWord?.word.toLowerCase() === token.text.toLowerCase().replace(/[.,!?;:()]/g, '').trim()
            }"
            @click="handleWordClick(token)"
          >
            {{ token.text }}
          </span>
          <span v-else>{{ token.text }}</span>
        </template>
      </div>

      <aside class="sidebar">
        <div v-if="selectedWord" class="word-card card">
          <div class="header">
            <h3>{{ selectedWord.word }}</h3>
            <span v-if="selectedWord.category" class="tag">{{ selectedWord.category }}</span>
          </div>
          <p class="meaning">{{ selectedWord.meaning }}</p>
          <div class="status-info">
            <span v-if="memory.vocabulary[selectedWord.word.toLowerCase()]?.encounters > 1" class="encounters">
              You've seen this {{ memory.vocabulary[selectedWord.word.toLowerCase()].encounters }} times
            </span>
            <span v-else class="new">New word!</span>
          </div>
          <button class="close-btn" @click="selectedWord = null">Close</button>
        </div>

        <div class="reading-stats card">
          <h3>Reading Progress</h3>
          <div class="stat-item">
            <span class="label">Known Words</span>
            <span class="value">{{ tokens.filter(t => t.isKnown).length }}</span>
          </div>
          <div class="stat-item">
            <span class="label">New Words Seen</span>
            <span class="value">{{ tokens.filter(t => t.isInteractable && !t.isKnown && !t.isWeak).length }}</span>
          </div>
          <button v-if="!readingFinished" class="button full-width" @click="finishReading">Finish Reading</button>
          <div v-else class="finished-state">
            <span class="check">✓</span> Finished! Knowledge graph updated.
          </div>
        </div>
      </aside>
    </div>
  </div>
  <div v-else class="not-found">
    Article not found.
  </div>
</template>

<style scoped>
.article-page { max-width: 1000px; margin: auto; padding-bottom: 60px; }

.article-header { margin-bottom: 40px; }
.back-link { 
  display: block; margin-bottom: 20px; color: #176b5b; text-decoration: none; font-weight: 500; font-size: 14px;
}
.meta { display: flex; gap: 12px; align-items: center; margin-bottom: 12px; }

.level-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  color: white;
}
.level-badge.A1 { background: #4caf50; }
.level-badge.A2 { background: #2196f3; }
.level-badge.B1 { background: #ff9800; }
.level-badge.B2 { background: #f44336; }

.source { font-size: 14px; color: #8a9a94; font-weight: 500; }

.content-container { display: grid; grid-template-columns: 1fr 300px; gap: 30px; }

.article-content {
  font-size: 20px;
  line-height: 1.8;
  padding: 40px;
  color: #20302d;
  white-space: pre-wrap;
}

.word {
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  border-bottom: 1px solid transparent;
}

.word:hover {
  background: #f0f4f2;
  border-radius: 3px;
}

.word.has-hint {
  border-bottom: 2px solid #176b5b44;
}

.word.known {
  color: #176b5b;
  font-weight: 500;
}

.word.weak {
  color: #d06b3c;
  font-weight: 500;
}

.word.active {
  background: #176b5b;
  color: white !important;
  border-radius: 4px;
}

.sidebar { display: flex; flex-direction: column; gap: 20px; }

.word-card { background: #fffcf4; border-color: #f9e8b9; }
.word-card .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.word-card h3 { margin: 0; font-size: 18px; color: #d06b3c; }
.word-card .tag { font-size: 10px; background: #fef1e8; color: #d06b3c; padding: 2px 6px; border-radius: 4px; font-weight: 700; }
.word-card .meaning { margin-bottom: 16px; font-size: 16px; line-height: 1.4; }
.word-card .status-info { font-size: 12px; color: #8a9a94; margin-bottom: 16px; }
.word-card .close-btn { 
  width: 100%; padding: 8px; border: 1px solid #cad6ce; border-radius: 8px; background: white; cursor: pointer; font-size: 14px;
}

.reading-stats h3 { font-size: 16px; margin-bottom: 20px; }
.stat-item { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; }
.stat-item .label { color: #687873; }
.stat-item .value { font-weight: 700; color: #176b5b; }

.full-width { width: 100%; margin-top: 10px; }

.finished-state { 
  margin-top: 20px; text-align: center; color: #176b5b; font-weight: 600; font-size: 14px; 
}
.check { font-size: 20px; }

@media (max-width: 800px) {
  .content-container { grid-template-columns: 1fr; }
  .sidebar { order: -1; }
}
</style>
