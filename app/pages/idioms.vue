<script setup lang="ts">
import { useLearnerMemory } from '~/composables/useLearnerMemory'
import { idioms } from '~/data/idioms'
import type { SkillDimension } from '~/types/learning'

const { memory, hydrate } = useLearnerMemory()
onMounted(hydrate)

const dimensions: { id: SkillDimension, label: string }[] = [
  { id: 'recognition', label: 'Recognition' },
  { id: 'meaning', label: 'Meaning' },
  { id: 'production', label: 'Production' },
  { id: 'idiomatic', label: 'Idiomatic Use' }
]

const idiomPoints = computed(() => {
  return Object.entries(memory.value.idioms || {}).sort(([a], [b]) => a.localeCompare(b))
})

const getIdiomData = (phrase: string) => {
  return idioms.find(i => i.phrase === phrase)
}
</script>

<template>
  <section class="idioms-view">
    <div class="eyebrow gold">TREASURE VAULT</div>
    <h1>Idiom & Expression Library</h1>
    <p class="muted">Authentic, colloquial Dutch phrases and expressions that give your speech true native nuance and flair.</p>

    <div v-if="idioms.length === 0" class="empty-state card">
      <div class="empty-icon">💎</div>
      <h3>No Idioms Found in Vault</h3>
      <p class="muted">Check back as new authentic expressions are discovered.</p>
    </div>

    <div v-else class="idiom-grid">
      <div 
        v-for="idiom in idioms" 
        :key="idiom.phrase" 
        class="card idiom-card" 
        :class="{ mastered: (memory.idioms?.[idiom.phrase]?.idiomatic || 0) > 80 }"
      >
        <div class="idiom-header">
          <div>
            <h3>{{ idiom.phrase }}</h3>
            <p class="literal">Literal: "{{ idiom.literal }}"</p>
          </div>
          <div v-if="memory.idioms?.[idiom.phrase]" class="encounter-badge">
            {{ memory.idioms[idiom.phrase].successes }}/{{ memory.idioms[idiom.phrase].encounters }} hits
          </div>
          <div v-else class="new-badge">Discovered</div>
        </div>

        <div class="meaning">
          <strong>Meaning:</strong> {{ idiom.meaning }}
        </div>
        
        <div class="example">
          <strong>Context:</strong> "{{ idiom.example }}"
        </div>

        <div v-if="memory.idioms?.[idiom.phrase]" class="dimensions">
          <div v-for="dim in dimensions" :key="dim.id" class="dimension-row">
            <span class="dim-label">{{ dim.label }}</span>
            <div class="dim-bar-container">
              <div class="dim-bar" :style="{ width: `${memory.idioms[idiom.phrase][dim.id as keyof typeof memory.idioms[string]]}%` }"></div>
            </div>
            <span class="dim-value">{{ Math.round(memory.idioms[idiom.phrase][dim.id as keyof typeof memory.idioms[string]]) }}%</span>
          </div>
        </div>
        <div v-else class="unlock-hint">
          Encounter this idiom in a mission to start tracking your mastery!
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.idiom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.idiom-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 26px;
  border: 1.5px solid $ocean-border;
  border-radius: $radius-xl;
  background: $white-pure;
  transition: all $transition-normal;

  &:hover {
    border-color: $ocean-vibrant;
    transform: translateY(-3px);
    box-shadow: $shadow-card;
  }

  &.mastered {
    border-color: $gold-bright;
    border-top: 5px solid $gold-parchment;
    background: linear-gradient(135deg, $white-pure 0%, $parchment-bg 100%);
  }
}

.idiom-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;

  h3 {
    margin: 0;
    color: $ocean-deepest;
    font-size: 20px;
    font-family: $font-anime;
    font-weight: 800;
  }
}

.literal {
  font-style: italic;
  font-size: 13px;
  color: $ink-muted;
  margin: 4px 0 0;
}

.encounter-badge {
  font-family: $font-anime;
  font-size: 11px;
  background: $ocean-light;
  color: $ocean-dark;
  border: 1px solid $ocean-border;
  padding: 3px 8px;
  border-radius: $radius-pill;
  font-weight: 800;
}

.new-badge {
  font-family: $font-anime;
  font-size: 10px;
  background: $parchment-bg;
  color: $gold-dark;
  border: 1px solid $parchment-border;
  padding: 3px 8px;
  border-radius: $radius-pill;
  font-weight: 800;
  text-transform: uppercase;
}

.meaning, .example {
  font-size: 15px;
  line-height: 1.6;
  color: $ink-slate;
}

.example {
  background: $ocean-ice;
  padding: 14px;
  border-radius: $radius-md;
  border-left: 4px solid $ocean-sky;
}

.dimensions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid $ocean-ice;
}

.dimension-row {
  display: flex;
  align-items: center;
  font-size: 12px;
}

.dim-label {
  width: 105px;
  color: $ink-slate;
  font-weight: 600;
}

.dim-bar-container {
  flex: 1;
  height: 8px;
  background: #e2e8f0;
  border-radius: 999px;
  margin: 0 10px;
  overflow: hidden;
}

.dim-bar {
  height: 100%;
  background: linear-gradient(90deg, $ocean-primary 0%, $ocean-vibrant 100%);
  border-radius: 999px;
  transition: width 0.35s ease;
}

.dim-value {
  width: 34px;
  text-align: right;
  font-family: $font-anime;
  font-weight: 800;
  color: $ocean-primary;
}

.unlock-hint {
  font-size: 13px;
  color: $ink-muted;
  font-style: italic;
  margin-top: 12px;
  text-align: center;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: $white-pure;
  border-radius: $radius-xl;
  border: 2px dashed $ocean-border;
  margin-top: 32px;
}
</style>
