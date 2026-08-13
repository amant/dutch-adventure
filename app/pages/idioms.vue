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
    <div class="eyebrow">Language Graph</div>
    <h1>Idiom Library</h1>
    <p class="muted">Natural Dutch expressions that make you sound like a native speaker.</p>

    <div v-if="idioms.length === 0" class="empty-state">
      <p>No idioms found in the library.</p>
    </div>

    <div v-else class="idiom-grid">
      <div v-for="idiom in idioms" :key="idiom.phrase" class="card idiom-card" :class="{ mastered: (memory.idioms?.[idiom.phrase]?.idiomatic || 0) > 80 }">
        <div class="idiom-header">
          <div>
            <h3>{{ idiom.phrase }}</h3>
            <p class="literal">Literal: "{{ idiom.literal }}"</p>
          </div>
          <div v-if="memory.idioms?.[idiom.phrase]" class="encounter-badge">
            {{ memory.idioms[idiom.phrase].successes }}/{{ memory.idioms[idiom.phrase].encounters }} hits
          </div>
          <div v-else class="new-badge">New</div>
        </div>

        <div class="meaning">
          <strong>Meaning:</strong> {{ idiom.meaning }}
        </div>
        
        <div class="example">
          <strong>Example:</strong> "{{ idiom.example }}"
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

<style scoped>
.idiom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.idiom-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease;
}

.idiom-card.mastered {
  border-color: #176b5b;
  background: #f0f7f4;
}

.idiom-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.idiom-header h3 {
  margin: 0;
  color: #176b5b;
  font-size: 22px;
}

.literal {
  font-style: italic;
  font-size: 14px;
  color: #8a9a94;
  margin: 4px 0 0;
}

.encounter-badge {
  font-size: 11px;
  background: #e8f3ec;
  color: #176b5b;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 600;
}

.new-badge {
  font-size: 11px;
  background: #fef1e8;
  color: #d06b3c;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 600;
  text-transform: uppercase;
}

.meaning, .example {
  font-size: 15px;
  line-height: 1.5;
}

.example {
  background: #f9faf9;
  padding: 12px;
  border-radius: 8px;
  border-left: 4px solid #cad6ce;
}

.dimensions {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid #f0f2ef;
}

.dimension-row {
  display: flex;
  align-items: center;
  font-size: 12px;
}

.dim-label {
  width: 100px;
  color: #687873;
}

.dim-bar-container {
  flex: 1;
  height: 6px;
  background: #f0f2ef;
  border-radius: 3px;
  margin: 0 10px;
  overflow: hidden;
}

.dim-bar {
  height: 100%;
  background: #176b5b;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.dim-value {
  width: 30px;
  text-align: right;
  font-family: monospace;
}

.unlock-hint {
  font-size: 13px;
  color: #8a9a94;
  font-style: italic;
  margin-top: 12px;
  text-align: center;
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
