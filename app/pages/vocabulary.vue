<script setup lang="ts">
import { useLearnerMemory } from '~/composables/useLearnerMemory'
import { chapters } from '~/data/chapters'
import type { SkillDimension } from '~/types/learning'

const { memory, hydrate } = useLearnerMemory()
onMounted(hydrate)

const dimensions: { id: SkillDimension, label: string }[] = [
  { id: 'recognition', label: 'Recognition' },
  { id: 'meaning', label: 'Meaning' },
  { id: 'listening', label: 'Listening' },
  { id: 'spelling', label: 'Spelling' },
  { id: 'production', label: 'Production' },
  { id: 'speaking', label: 'Speaking' },
  { id: 'automaticity', label: 'Automaticity' }
]

const words = computed(() => {
  return Object.entries(memory.value.vocabulary).sort(([a], [b]) => a.localeCompare(b))
})

const selectedWord = ref<string | null>(null)
const selectedState = computed(() => selectedWord.value ? memory.value.vocabulary[selectedWord.value] : null)

const relatedChapters = computed(() => {
  if (!selectedWord.value) return []
  const w = selectedWord.value.toLowerCase()
  return chapters.filter(c => 
    c.stages.some(s => 
      s.exercises.some(e => e.vocabulary?.some(vocab => vocab.toLowerCase() === w))
    )
  )
})
</script>

<template>
  <section class="vocabulary-view">
    <div class="eyebrow">Language Graph</div>
    <h1>Vocabulary Library</h1>
    <p class="muted">Every word you've encountered and your current mastery across all dimensions.</p>

    <div v-if="words.length === 0" class="empty-state">
      <p>You haven't encountered any words yet. Start a chapter to build your vocabulary!</p>
      <NuxtLink to="/" class="button">Browse chapters</NuxtLink>
    </div>

    <div v-else class="layout">
      <div class="word-grid">
        <div 
          v-for="[word, state] in words" 
          :key="word" 
          class="card word-card"
          :class="{ active: selectedWord === word }"
          @click="selectedWord = word"
        >
          <div class="word-header">
            <div>
              <h3>{{ word }}</h3>
              <div v-if="state.lastEncountered" class="last-seen">
                Seen {{ new Date(state.lastEncountered).toLocaleDateString() }}
              </div>
            </div>
            <div class="encounter-badge">{{ state.successes }}/{{ state.encounters }} hits</div>
          </div>
          <div class="mini-graph">
            <div 
              v-for="dim in dimensions" 
              :key="dim.id" 
              class="mini-bar" 
              :style="{ height: `${state[dim.id]}%`, opacity: 0.3 + (state[dim.id] / 150) }"
              :title="dim.label"
            ></div>
          </div>
        </div>
      </div>

      <aside v-if="selectedWord && selectedState" class="detail-panel card">
        <div class="detail-header">
          <h2>{{ selectedWord }}</h2>
          <button class="close-btn" @click="selectedWord = null">×</button>
        </div>

        <div class="dimensions-detail">
          <div v-for="dim in dimensions" :key="dim.id" class="dimension-row">
            <span class="dim-label">{{ dim.label }}</span>
            <div class="dim-bar-container">
              <div class="dim-bar" :style="{ width: `${selectedState[dim.id]}%` }"></div>
            </div>
            <span class="dim-value">{{ selectedState[dim.id] }}%</span>
          </div>
        </div>

        <div v-if="selectedState.usageHistory && selectedState.usageHistory.length > 0" class="history-section">
          <div class="eyebrow">Usage History</div>
          <ul class="usage-list">
            <li v-for="(h, idx) in selectedState.usageHistory" :key="idx" class="usage-item">
              <p class="snippet">"{{ h.snippet }}"</p>
              <span class="date">{{ new Date(h.date).toLocaleDateString() }}</span>
            </li>
          </ul>
        </div>

        <div v-if="relatedChapters.length > 0" class="related-section">
          <div class="eyebrow">Found in Chapters</div>
          <div class="chapter-tags">
            <NuxtLink 
              v-for="c in relatedChapters" 
              :key="c.slug" 
              :to="`/chapter/${c.slug}`"
              class="chapter-tag"
            >
              {{ c.title }}
            </NuxtLink>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;
  margin-top: 32px;
  align-items: start;
}

@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; }
}

.word-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.word-card {
  cursor: pointer;
  transition: all 0.2s;
  padding: 16px;
  border: 1px solid #e1e5de;
}

.word-card:hover { transform: translateY(-2px); border-color: #176b5b; }
.word-card.active { border-color: #176b5b; background: #f0f4f2; }

.word-header h3 {
  margin: 0;
  color: #176b5b;
  font-size: 18px;
}
.last-seen { font-size: 10px; color: #8a9a94; }

.encounter-badge {
  font-size: 10px;
  background: #f0f4f2;
  color: #176b5b;
  padding: 1px 6px;
  border-radius: 8px;
  font-weight: 600;
  margin-top: 4px;
}

.mini-graph {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 30px;
  margin-top: 12px;
}

.mini-bar {
  flex: 1;
  background: #176b5b;
  border-radius: 1px;
}

.detail-panel {
  position: sticky;
  top: 20px;
  padding: 24px;
  background: #fdfaf3;
  border-left: 4px solid #176b5b;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.detail-header h2 { margin: 0; font-size: 28px; color: #176b5b; }

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #8a9a94;
  cursor: pointer;
}

.dimensions-detail { margin-bottom: 32px; }

.dimension-row {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-bottom: 8px;
}

.dim-label { width: 80px; color: #687873; }
.dim-bar-container { flex: 1; height: 6px; background: #e0e6e1; border-radius: 3px; margin: 0 10px; overflow: hidden; }
.dim-bar { height: 100%; background: #176b5b; transition: width 0.3s; }
.dim-value { width: 30px; text-align: right; color: #176b5b; }

.history-section { margin-top: 24px; }
.usage-list { list-style: none; padding: 0; margin: 12px 0; }
.usage-item { margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e1e5de; }
.snippet { font-style: italic; margin: 0; font-size: 14px; }
.date { font-size: 10px; color: #8a9a94; }

.related-section { margin-top: 24px; }
.chapter-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.chapter-tag {
  font-size: 11px;
  padding: 4px 10px;
  background: white;
  border: 1px solid #cad6ce;
  border-radius: 12px;
  text-decoration: none;
  color: #176b5b;
  transition: all 0.2s;
}
.chapter-tag:hover { border-color: #176b5b; background: #f0f4f2; }

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  border: 1px dashed #c2cfc9;
  margin-top: 32px;
}
</style>
