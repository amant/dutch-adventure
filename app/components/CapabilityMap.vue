<script setup lang="ts">
import { chapters } from '~/data/chapters'
import { useLearnerMemory } from '~/composables/useLearnerMemory'

const { memory } = useLearnerMemory()

const levels = ['A1', 'A2', 'B1', 'B2'] as const

const getCapabilityStatus = (chapter: typeof chapters[0]) => {
  const vocab = chapter.stages.flatMap(s => s.exercises.flatMap(e => e.vocabulary || []))
  const grammar = chapter.stages.flatMap(s => s.exercises.flatMap(e => e.grammar || []))
  
  if (vocab.length === 0 && grammar.length === 0) return 'not-started'
  
  const scores: number[] = []
  vocab.forEach(v => {
    if (memory.value.vocabulary[v]) {
      scores.push((memory.value.vocabulary[v].production + memory.value.vocabulary[v].automaticity) / 2)
    }
  })
  grammar.forEach(g => {
    if (memory.value.grammar[g]) {
      scores.push((memory.value.grammar[g].production + memory.value.grammar[g].automaticity) / 2)
    }
  })
  
  if (scores.length === 0) return 'not-started'
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length
  
  if (avg > 80) return 'mastered'
  if (avg > 20) return 'in-progress'
  return 'not-started'
}

const chaptersByLevel = computed(() => {
  const map: Record<string, typeof chapters> = {}
  levels.forEach(l => {
    map[l] = chapters.filter(c => c.level === l)
  })
  return map
})
</script>

<template>
  <div class="capability-map card anime-card">
    <div class="header-row">
      <div>
        <span class="eyebrow">GRAND LINE ROUTE MAP // 航海スキルマップ</span>
        <h2 class="cap-title">Jouw Vaardigheden Kaart</h2>
        <p class="muted">Beheers deze praktische scenario's om B2 zelfstandigheid op zee te bereiken.</p>
      </div>
      <ComicSoundBadge text="VOORTGANG 🧭" variant="gold" size="sm" />
    </div>
    
    <div class="levels-grid">
      <div v-for="level in levels" :key="level" class="level-column">
        <div class="level-header">
          <span class="level-badge">{{ level }}</span>
          <span class="level-label">{{ level === 'A1' ? 'Survival (Oost-Blauw)' : level === 'A2' ? 'Dagelijks (Grand Line)' : level === 'B1' ? 'Zelfstandig (Sabaody)' : 'Complex (Nieuwe Wereld)' }}</span>
        </div>
        
        <div class="capabilities-list">
          <NuxtLink 
            v-for="chapter in chaptersByLevel[level]" 
            :key="chapter.slug"
            :to="`/chapter/${chapter.slug}`"
            class="capability-item"
            :class="[getCapabilityStatus(chapter), { 'is-capstone': chapter.isCapstone }]"
          >
            <div class="dot"></div>
            <span class="title">{{ chapter.title }}</span>
            <span v-if="chapter.isCapstone" class="capstone-icon">👑</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.capability-map {
  margin: 30px 0;
  padding: 24px;
  background: #ffffff;
  border: 1px solid rgba(2, 132, 199, 0.2);
  border-radius: $radius-anime;
  box-shadow: $shadow-anime;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 14px;
  margin-bottom: 24px;

  .cap-title {
    font-size: 1.8rem;
    color: $anime-navy;
    margin: 6px 0 4px;
  }
}

.levels-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.level-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 14px;

  .level-badge {
    background: $anime-blue-primary;
    color: white;
    font-family: $font-anime-title;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    align-self: flex-start;
  }

  .level-label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: $ink-muted;
    letter-spacing: 0.05em;
  }
}

.capabilities-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.capability-item {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: $anime-navy;
  padding: 8px 12px;
  border-radius: 6px;
  background: #ffffff;
  border: 1px solid rgba(2, 132, 199, 0.15);
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.03);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateX(3px);
    border-color: $anime-blue-primary;
    background: $anime-ice;
    box-shadow: 0 4px 10px rgba(2, 132, 199, 0.1);
  }

  &.mastered {
    background: #f0fdf4;
    border-left: 3px solid $berry-green;
    color: #065f46;

    .dot {
      background: $berry-green;
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
    }
  }

  &.in-progress {
    border-left: 3px solid $bounty-gold;

    .dot {
      background: $bounty-gold;
    }
  }

  &.is-capstone {
    background: #fff5f5;
    border-color: rgba(239, 68, 68, 0.3);
    color: $battle-red-dark;

    &:hover {
      background: #fee2e2;
    }
  }

  .capstone-icon {
    margin-left: auto;
    font-size: 13px;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #cbd5e1;
    flex-shrink: 0;
  }
}

@media (max-width: 1024px) {
  .levels-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .levels-grid { grid-template-columns: 1fr; }
}
</style>
