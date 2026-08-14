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
    <div class="eyebrow gold">STRUCTURAL LOG POSE</div>
    <h1>Grammar Command Deck</h1>
    <p class="muted">Structural sentence patterns you've encountered and your current battle readiness across each dimension.</p>

    <div v-if="grammarPoints.length === 0" class="empty-state card">
      <div class="empty-icon">⚓</div>
      <h3>No Grammar Patterns Logged Yet</h3>
      <p class="muted">Patterns will be automatically recorded as you embark on chapter missions and tactical drills.</p>
      <NuxtLink to="/" class="button gold"><span>⚔️ Browse Chapter Missions</span></NuxtLink>
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

<style scoped lang="scss">
.grammar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.grammar-card {
  border: 1.5px solid $ocean-border;
  border-radius: $radius-xl;
  padding: 24px;
  background: $white-pure;
  transition: all $transition-fast;

  &:hover {
    border-color: $ocean-vibrant;
    transform: translateY(-3px);
    box-shadow: $shadow-card;
  }
}

.grammar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid $ocean-ice;

  h3 {
    margin: 0;
    color: $ocean-deepest;
    font-size: 20px;
    font-family: $font-anime;
    font-weight: 800;
  }
}

.encounter-badge {
  font-family: $font-anime;
  font-size: 11px;
  background: $parchment-bg;
  color: $gold-dark;
  border: 1px solid $parchment-border;
  padding: 3px 10px;
  border-radius: $radius-pill;
  font-weight: 800;
}

.dimensions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dimension-row {
  display: flex;
  align-items: center;
  font-size: 13px;
}

.dim-label {
  width: 95px;
  color: $ink-slate;
  font-weight: 600;
}

.dim-bar-container {
  flex: 1;
  height: 8px;
  background: #e2e8f0;
  border-radius: 999px;
  margin: 0 12px;
  overflow: hidden;
}

.dim-bar {
  height: 100%;
  background: linear-gradient(90deg, $gold-parchment 0%, $gold-bright 100%);
  border-radius: 999px;
  box-shadow: 0 0 6px rgba(245, 158, 11, 0.4);
  transition: width 0.35s ease;
}

.dim-value {
  width: 38px;
  text-align: right;
  font-family: $font-anime;
  font-weight: 800;
  color: $gold-deep;
}

.empty-state {
  text-align: center;
  padding: 60px 24px;
  background: $white-pure;
  border-radius: $radius-xl;
  border: 2px dashed $ocean-border;
  margin-top: 32px;

  .empty-icon {
    font-size: 48px;
    margin-bottom: 12px;
  }

  h3 {
    font-size: 24px;
    color: $ocean-deepest;
    margin-bottom: 8px;
  }

  .muted {
    max-width: 460px;
    margin: 0 auto 24px;
  }
}
</style>
