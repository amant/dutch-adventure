<script setup lang="ts">
import { useLearnerMemory } from '~/composables/useLearnerMemory'
import type { SkillDimension } from '~/types/learning'

const { memory, hydrate, reset } = useLearnerMemory()
onMounted(hydrate)

const levelForScore = (score: number) => {
  if (score < 20) return 'A0'
  if (score < 40) return 'A1'
  if (score < 60) return 'A2'
  if (score < 80) return 'B1'
  return 'B2'
}

const skillRows = computed(() => [
  { label: 'Reading', score: memory.value.overall.recognition, level: levelForScore(memory.value.overall.recognition) },
  { label: 'Listening', score: memory.value.overall.listening, level: levelForScore(memory.value.overall.listening) },
  { label: 'Vocabulary', score: vocabularyScore.value, level: levelForScore(vocabularyScore.value) },
  { label: 'Grammar', score: grammarScore.value, level: levelForScore(grammarScore.value) },
  { label: 'Writing', score: memory.value.overall.production, level: levelForScore(memory.value.overall.production) },
  { label: 'Speaking', score: memory.value.overall.speaking, level: levelForScore(memory.value.overall.speaking) },
  { label: 'Fluency', score: memory.value.overall.automaticity, level: levelForScore(memory.value.overall.automaticity) },
])

const vocabularyScore = computed(() => {
  const items = Object.values(memory.value.vocabulary)
  if (items.length === 0) return 0
  return items.reduce((acc, item) => acc + (item.recognition + item.meaning + item.production) / 3, 0) / items.length
})

const grammarScore = computed(() => {
  const items = Object.values(memory.value.grammar)
  if (items.length === 0) return 0
  return items.reduce((acc, item) => acc + (item.recognition + item.meaning + item.production) / 3, 0) / items.length
})

const bottlenecks = computed(() => {
  const skills = [
    { id: 'speaking', label: 'Speaking fluency', score: memory.value.overall.automaticity, status: 'red', text: 'You know the vocabulary but retrieve it slowly.' },
    { id: 'listening', label: 'Listening', score: memory.value.overall.listening, status: 'orange', text: 'Normal-speed speech is difficult.' },
    { id: 'grammar', label: 'Word order', score: grammarScore.value, status: 'orange', text: 'Subordinate clauses remain inconsistent.' }
  ]
  return skills
    .sort((a, b) => a.score - b.score)
    .filter(s => s.score < 80)
    .slice(0, 3)
})

const overallLevel = computed(() => {
  const scores = skillRows.value.map(r => r.score)
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length
  return levelForScore(avg)
})
</script>

<template>
  <section class="progress-view">
    <div class="eyebrow">Your Dutch level</div>
    <h1>{{ overallLevel }} candidate</h1>
    <p class="muted">Based on your practice across all capabilities.</p>

    <div class="card skill-table">
      <div v-for="row in skillRows" :key="row.label" class="skill-row">
        <div class="skill-info">
          <strong>{{ row.label }}</strong>
        </div>
        <div class="skill-meter">
          <div class="meter"><div :style="{ width: `${row.score}%` }" /></div>
        </div>
        <div class="skill-level">
          {{ row.level }}
        </div>
      </div>
    </div>

    <div v-if="bottlenecks.length > 0" class="bottlenecks">
      <h2>Your biggest bottlenecks</h2>
      <div class="grid">
        <div v-for="b in bottlenecks" :key="b.id" class="card bottleneck-card" :class="b.status">
          <div class="tag">Needs attention</div>
          <h3>{{ b.label }}</h3>
          <p class="muted">{{ b.text }}</p>
        </div>
      </div>
    </div>

    <div class="actions">
      <button class="button secondary" @click="reset">Reset all progress</button>
    </div>
  </section>
</template>

<style scoped>
.skill-table { margin: 32px 0; padding: 12px 28px; }
.skill-row { display: flex; align-items: center; padding: 20px 0; border-bottom: 1px solid #f0f2ef; }
.skill-row:last-child { border-bottom: 0; }
.skill-info { flex: 1; display: flex; flex-direction: column; }
.skill-meter { flex: 1; padding: 0 40px; }
.skill-level { width: 40px; font-weight: 700; text-align: right; color: #176b5b; }
.meter { height: 8px; background: #e2e9e3; border-radius: 4px; overflow: hidden; }
.meter div { height: 100%; background: #176b5b; transition: width 0.6s ease; }

.bottlenecks { margin-top: 60px; }
.bottleneck-card { border-left: 4px solid #ccc; }
.bottleneck-card.red { border-left-color: #e53e3e; }
.bottleneck-card.red .tag { color: #e53e3e; }
.bottleneck-card.orange { border-left-color: #d06b3c; }
.bottleneck-card.orange .tag { color: #d06b3c; }
.tag { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #d06b3c; margin-bottom: 8px; }
.bottleneck-card h3 { margin: 0 0 12px; }

.actions { margin-top: 40px; }

@media (max-width: 768px) {
  .skill-row { flex-wrap: wrap; }
  .skill-meter { flex: 1 1 100%; padding: 15px 0 0; order: 3; }
}
</style>