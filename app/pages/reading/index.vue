<script setup lang="ts">
import { articles } from '~/data/articles'
import { useLearnerMemory } from '~/composables/useLearnerMemory'

const { memory, hydrate } = useLearnerMemory()
onMounted(hydrate)

const getMatchStats = (articleContent: string) => {
  const words = articleContent.toLowerCase().replace(/[.,!?;:()]/g, '').split(/\s+/)
  const uniqueWords = Array.from(new Set(words.filter(w => w.length > 2)))
  
  const known = uniqueWords.filter(w => memory.value.vocabulary[w]?.recognition > 0.5)
  const frontier = uniqueWords.filter(w => {
    const s = memory.value.vocabulary[w]
    return s && s.recognition > 0.5 && s.production < 0.3
  })
  
  const percentage = Math.round((known.length / uniqueWords.size) * 100)
  
  return {
    percentage,
    knownCount: known.length,
    frontierCount: frontier.length,
    totalCount: uniqueWords.size
  }
}
</script>

<template>
  <div class="reading-feed">
    <div class="hero">
      <div class="eyebrow">Reading Feed</div>
      <h1>Authentic Dutch</h1>
      <p class="muted">Read real articles adapted to your level. We track every word you encounter.</p>
    </div>

    <div class="articles-grid grid">
      <NuxtLink 
        v-for="article in articles" 
        :key="article.id" 
        :to="`/reading/${article.id}`"
        class="article-card card"
      >
        <div class="article-meta">
          <span class="level-badge" :class="article.level">{{ article.level }}</span>
          <span class="source">{{ article.source }}</span>
        </div>
        <h3>{{ article.title }}</h3>
        <p class="excerpt">{{ article.content.substring(0, 100) }}...</p>
        
        <div class="article-footer">
          <div class="match">
            <div class="match-meta">
              <span class="label">Vocabulary Match</span>
              <span class="value">{{ getMatchStats(article.content).percentage }}%</span>
            </div>
            <div class="progress-bar">
              <div class="fill" :style="{ width: getMatchStats(article.content).percentage + '%' }"></div>
            </div>
            <div v-if="getMatchStats(article.content).frontierCount > 0" class="frontier-count">
              {{ getMatchStats(article.content).frontierCount }} activation opportunities
            </div>
          </div>
          <span class="date">{{ article.publishedAt }}</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.reading-feed { padding: 20px 0; }
.hero { margin-bottom: 40px; }

.article-card {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 0.2s, border-color 0.2s;
}

.article-card:hover {
  transform: translateY(-4px);
  border-color: #176b5b;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

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

.source {
  font-size: 12px;
  color: #8a9a94;
  font-weight: 500;
}

.article-card h3 {
  font-size: 20px;
  margin: 0;
  color: #20302d;
}

.excerpt {
  font-size: 14px;
  color: #687873;
  line-height: 1.5;
  margin: 0;
}

.article-footer {
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid #f0f2f0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.match {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.match-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.match .label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #8a9a94;
}

.progress-bar {
  height: 4px;
  background: #f0f2f0;
  border-radius: 2px;
  width: 100%;
  max-width: 120px;
  overflow: hidden;
}

.progress-bar .fill {
  height: 100%;
  background: #176b5b;
}

.match .value {
  font-size: 12px;
  font-weight: 700;
  color: #176b5b;
}

.frontier-count {
  font-size: 10px;
  font-weight: 600;
  color: #d06b3c;
  background: #fff7ed;
  padding: 1px 6px;
  border-radius: 4px;
  align-self: flex-start;
}

.date {
  font-size: 11px;
  color: #8a9a94;
}
</style>
