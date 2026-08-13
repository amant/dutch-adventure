<script setup lang="ts">
import { articles } from '~/data/articles'
import { useLearnerMemory } from '~/composables/useLearnerMemory'

const { memory, hydrate } = useLearnerMemory()
onMounted(hydrate)

const getMatchPercentage = (articleContent: string) => {
  const words = articleContent.toLowerCase().replace(/[.,!?;:()]/g, '').split(/\s+/)
  const uniqueWords = new Set(words)
  const knownWords = Array.from(uniqueWords).filter(w => memory.value.vocabulary[w]?.recognition > 0.5)
  return Math.round((knownWords.length / uniqueWords.size) * 100)
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
            <span class="label">Vocabulary Match</span>
            <div class="progress-bar">
              <div class="fill" :style="{ width: getMatchPercentage(article.content) + '%' }"></div>
            </div>
            <span class="value">{{ getMatchPercentage(article.content) }}%</span>
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
  gap: 4px;
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
  width: 80px;
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

.date {
  font-size: 11px;
  color: #8a9a94;
}
</style>
