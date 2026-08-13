<script setup lang="ts">
import { useLearnerMemory } from '~/composables/useLearnerMemory'
import type { SkillDimension } from '~/types/learning'

const { memory, hydrate } = useLearnerMemory()
onMounted(hydrate)

const dimensions: { id: SkillDimension, label: string }[] = [
  { id: 'recognition', label: 'Recognition' },
  { id: 'meaning', label: 'Meaning' },
  { id: 'listening', label: 'Listening' },
  { id: 'production', label: 'Production' },
  { id: 'automaticity', label: 'Fluency' },
  { id: 'coherence', label: 'Coherence' }
]

const grammarPoints = computed(() => {
  return Object.entries(memory.value.grammar).sort(([a], [b]) => a.localeCompare(b))
})

const formatKey = (key: string) => {
  return key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}
</script>

<template>
  <section class="grammar-view">
    <div class="eyebrow">Language Graph</div>
    <h1>Grammar Assistant</h1>
    <p class="muted">Structural patterns you've encountered and your current mastery of their usage.</p>

    <div v-if="grammarPoints.length === 0" class="empty-state">
      <p>You haven't encountered any grammar patterns yet. Patterns appear as you work through missions.</p>
      <NuxtLink to="/" class="button">Browse chapters</NuxtLink>
    </div>

    <div v-else class="grammar-grid">
      <div v-for="[point, state] in grammarPoints" :key="point" class="card grammar-card">
        <div class="grammar-header">
          <h3>{{ formatKey(point) }}</h3>
          <div class="encounter-badge">{{ state.successes }}/{{ state.encounters }} hits</div>
        </div>
        <div class="dimensions">
          <div v-for="dim in dimensions" :key="dim.id" class="dimension-row">
            <span class="dim-label">{{ dim.label }}</span>
            <div class="dim-bar-container">
              <div class="dim-bar" :style="{ width: `${state[dim.id as keyof typeof state]}%` }"></div>
            </div>
            <span class="dim-value">{{ state[dim.id as keyof typeof state] }}%</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grammar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
  margin-top: 32px;
}

.grammar-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.grammar-header h3 {
  margin: 0;
  color: #176b5b;
  font-size: 20px;
}

.encounter-badge {
  font-size: 11px;
  background: #fdf2e9;
  color: #d4a373;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 600;
}

.dimensions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dimension-row {
  display: flex;
  align-items: center;
  font-size: 13px;
}

.dim-label {
  width: 90px;
  color: #687873;
}

.dim-bar-container {
  flex: 1;
  height: 8px;
  background: #f0f2ef;
  border-radius: 4px;
  margin: 0 12px;
  overflow: hidden;
}

.dim-bar {
  height: 100%;
  background: #d4a373; /* Different color for grammar */
  border-radius: 4px;
  transition: width 0.3s ease;
}

.dim-value {
  width: 35px;
  text-align: right;
  font-family: monospace;
  color: #176b5b;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  border: 1px dashed #c2cfc9;
  margin-top: 32px;
}
</style>
