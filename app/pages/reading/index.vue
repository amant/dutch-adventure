<script setup lang="ts">
import { articles } from '~/data/articles';
import { useLearnerMemory } from '~/composables/useLearnerMemory';

const { memory, hydrate } = useLearnerMemory();
onMounted(hydrate);

const getMatchStats = (articleContent: string) => {
  const words = articleContent.toLowerCase().replace(/[.,!?;:()]/g, '').split(/\s+/);
  const uniqueWords = Array.from(new Set(words.filter(w => w.length > 2)));

  const known = uniqueWords.filter(w => (memory.value.vocabulary[w]?.recognition ?? 0) > 0.5);
  const frontier = uniqueWords.filter((w) => {
    const s = memory.value.vocabulary[w];
    return s && s.recognition > 0.5 && s.production < 0.3;
  });

  const percentage = Math.round((known.length / (uniqueWords.length || 1)) * 100);

  return {
    percentage,
    knownCount: known.length,
    frontierCount: frontier.length,
    totalCount: uniqueWords.length,
  };
};
</script>

<template>
  <div class="reading-feed">
    <div class="hero">
      <div class="eyebrow gold">
        AUTHENTIC TEXT ARCHIVES
      </div>
      <h1>Authentic Dutch Reading Logs</h1>
      <p class="muted">
        Read authentic Dutch chronicles adapted to your voyage level. We track every word encounter into your Language Graph.
      </p>
    </div>

    <div class="articles-grid grid">
      <NuxtLink
        v-for="article in articles"
        :key="article.id"
        :to="`/reading/${article.id}`"
        class="article-card card"
      >
        <div class="article-meta">
          <span
            class="level-badge"
            :class="article.level.toLowerCase()"
          >{{ article.level }}</span>
          <span class="source">{{ article.source }}</span>
        </div>
        <h3>{{ article.title }}</h3>
        <p class="excerpt">{{ article.content.substring(0, 110) }}...</p>

        <div class="article-footer">
          <div class="match">
            <div class="match-meta">
              <span class="label">Vocabulary Match</span>
              <span class="value">{{ getMatchStats(article.content).percentage }}%</span>
            </div>
            <div class="progress-bar">
              <div
                class="fill"
                :style="{ width: getMatchStats(article.content).percentage + '%' }"
              />
            </div>
            <div
              v-if="getMatchStats(article.content).frontierCount > 0"
              class="frontier-count"
            >
              ⚡ {{ getMatchStats(article.content).frontierCount }} activation opportunities
            </div>
          </div>
          <span class="date">{{ article.publishedAt }}</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.reading-feed {
  padding: 20px 0;
}

.hero {
  margin-bottom: 40px;
}

.article-card {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 26px;
  border: 1.5px solid $ocean-border;
  border-radius: $radius-xl;
  background: $white-pure;
  transition: all $transition-normal;

  &:hover {
    transform: translateY(-4px);
    border-color: $ocean-vibrant;
    box-shadow: $shadow-card;
  }

  h3 {
    font-size: 20px;
    margin: 0;
    color: $ocean-deepest;
  }
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.level-badge {
  font-family: $font-anime;
  font-size: 11px;
  font-weight: 900;
  padding: 3px 10px;
  border-radius: $radius-sm;
  color: $white-pure;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2);

  &.a1 { background: linear-gradient(135deg, #0284c7 0%, #38bdf8 100%); }
  &.a2 { background: linear-gradient(135deg, #0066cc 0%, #0284c7 100%); }
  &.b1 { background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%); }
  &.b2 { background: linear-gradient(135deg, #b91c1c 0%, #ef4444 100%); }
}

.source {
  font-family: $font-anime;
  font-size: 11px;
  color: $ink-muted;
  font-weight: 700;
  text-transform: uppercase;
}

.excerpt {
  font-size: 14px;
  color: $ink-slate;
  line-height: 1.6;
  margin: 0;
  flex: 1;
}

.article-footer {
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid $ocean-ice;
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
  max-width: 140px;
}

.match .label {
  font-family: $font-anime;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: $ink-muted;
  font-weight: 700;
}

.progress-bar {
  height: 6px;
  background: #e2e8f0;
  border-radius: 999px;
  width: 100%;
  max-width: 140px;
  overflow: hidden;

  .fill {
    height: 100%;
    background: linear-gradient(90deg, $ocean-primary 0%, $ocean-sky 100%);
    border-radius: 999px;
  }
}

.match .value {
  font-family: $font-anime;
  font-size: 12px;
  font-weight: 800;
  color: $ocean-primary;
}

.frontier-count {
  font-family: $font-anime;
  font-size: 10px;
  font-weight: 800;
  color: $gold-dark;
  background: $parchment-bg;
  border: 1px solid $parchment-border;
  padding: 2px 8px;
  border-radius: $radius-xs;
  align-self: flex-start;
  margin-top: 4px;
}

.date {
  font-family: $font-anime;
  font-size: 11px;
  color: $ink-muted;
  font-weight: 700;
}
</style>
