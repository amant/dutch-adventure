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
  <div class="capability-map card">
    <div class="eyebrow">The B2 Journey</div>
    <h2>Your Capability Map</h2>
    <p class="muted">Master these real-world scenarios to reach B2 independence.</p>
    
    <div class="levels-grid">
      <div v-for="level in levels" :key="level" class="level-column">
        <div class="level-header">
          <span class="level-badge">{{ level }}</span>
          <span class="level-label">{{ level === 'A1' ? 'Survival' : level === 'A2' ? 'Everyday' : level === 'B1' ? 'Independent' : 'Complex' }}</span>
        </div>
        
        <div class="capabilities-list">
          <NuxtLink 
            v-for="chapter in chaptersByLevel[level]" 
            :key="chapter.slug"
            :to="`/chapter/${chapter.slug}`"
            class="capability-item"
            :class="getCapabilityStatus(chapter)"
          >
            <div class="dot"></div>
            <span class="title">{{ chapter.title }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.capability-map {
  margin: 40px 0;
  padding: 32px;
}

h2 { margin: 12px 0 8px; }

.levels-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 32px;
}

.level-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.level-badge {
  background: #176b5b;
  color: white;
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: 800;
  font-size: 14px;
}

.level-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #8a9a94;
  letter-spacing: 0.05em;
}

.capabilities-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.capability-item {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #52645f;
  padding: 10px 14px;
  border-radius: 12px;
  background: #f8f9f8;
  border: 1px solid #e1e5de;
  transition: all 0.2s ease;
}

.capability-item:hover {
  transform: translateX(4px);
  border-color: #176b5b;
  background: #fff;
}

.capability-item.mastered {
  background: #e6f2f0;
  border-color: #176b5b;
  color: #176b5b;
}

.capability-item.mastered .dot {
  background: #176b5b;
  box-shadow: 0 0 0 3px #176b5b22;
}

.capability-item.in-progress {
  border-left: 3px solid #d06b3c;
}

.capability-item.in-progress .dot {
  background: #d06b3c;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #cbd5e1;
  flex-shrink: 0;
}

@media (max-width: 1024px) {
  .levels-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .levels-grid { grid-template-columns: 1fr; }
}
</style>
