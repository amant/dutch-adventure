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
  { label: 'Pragmatic', score: memory.value.overall.pragmatic, level: levelForScore(memory.value.overall.pragmatic) },
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

const canDoItems = computed(() => {
  const items = []
  if (memory.value.overall.recognition > 20) items.push('Understand basic introductions and signs.')
  if (memory.value.overall.production > 30) items.push('Introduce yourself and state where you live.')
  if (memory.value.overall.listening > 40) items.push('Follow slow, clear speech in everyday contexts.')
  if (grammarScore.value > 50) items.push('Use "omdat" and "want" to explain reasons correctly.')
  if (memory.value.overall.automaticity > 60) items.push('Participate in simple conversations without too much hesitation.')
  if (memory.value.overall.production > 70) items.push('Argue a position and disagree politely in work discussions.')
  if (vocabularyScore.value > 80) items.push('Read authentic news articles with minimal dictionary help.')
  
  return items.slice(-4) // Show the 4 most recent achievements
})

const recentGains = computed(() => {
  const items = [...Object.entries(memory.value.vocabulary), ...Object.entries(memory.value.grammar)]
    .filter(([_, state]) => state.encounters > 3 && state.successes / state.encounters > 0.8)
    .sort((a, b) => new Date(b[1].lastEncountered || 0).getTime() - new Date(a[1].lastEncountered || 0).getTime())
    .slice(0, 3)
    .map(([key, state]) => ({ 
      label: key.replace(/-/g, ' '), 
      score: Math.round((state.production + state.automaticity) / 2) 
    }))
  return items
})
</script>

<template>
  <section class="progress-view">
    <div class="eyebrow">Your Dutch level</div>
    <h1>{{ overallLevel }} candidate</h1>
    <p class="muted">Based on your practice across all capabilities.</p>

    <div class="card can-do-card" v-if="canDoItems.length > 0">
      <div class="eyebrow">Capabilities</div>
      <h3>What you can do:</h3>
      <ul class="can-do-list">
        <li v-for="item in canDoItems" :key="item">{{ item }}</li>
      </ul>
    </div>

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

    <div class="reading-progress">
      <h2>Reading Proficiency</h2>
      <div class="card">
        <div class="reading-stats-grid">
          <div class="stat">
            <span class="label">Total Words Encountered</span>
            <span class="value">{{ Object.keys(memory.vocabulary).length }}</span>
          </div>
          <div class="stat">
            <span class="label">Mastered in Context</span>
            <span class="value">{{ Object.values(memory.vocabulary).filter(v => v.recognition > 70).length }}</span>
          </div>
          <div class="stat">
            <span class="label">Reading Accuracy</span>
            <span class="value">{{ Math.round((Object.values(memory.vocabulary).reduce((acc, v) => acc + (v.successes / (v.encounters || 1)), 0) / (Object.keys(memory.vocabulary).length || 1)) * 100) }}%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="recent-progress" v-if="recentGains.length > 0">
      <h2>Recent Gains</h2>
      <div class="grid">
        <div v-for="gain in recentGains" :key="gain.label" class="card gain-card">
          <div class="tag success">Mastery Improving</div>
          <h3>{{ gain.label }}</h3>
          <div class="score-badge">{{ gain.score }}%</div>
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

.can-do-card { background: #f0f7ff; border: 1px solid #cce3ff; margin: 24px 0; padding: 24px; }
.can-do-card h3 { margin: 8px 0 16px; color: #1e40af; }
.can-do-list { margin: 0; padding-left: 20px; color: #1e40af; }
.can-do-list li { margin-bottom: 8px; font-weight: 500; }

.skill-row { display: flex; align-items: center; padding: 20px 0; border-bottom: 1px solid #f0f2ef; }
.skill-row:last-child { border-bottom: 0; }
.skill-info { flex: 1; display: flex; flex-direction: column; }
.skill-meter { flex: 1; padding: 0 40px; }
.skill-level { width: 40px; font-weight: 700; text-align: right; color: #176b5b; }
.meter { height: 8px; background: #e2e9e3; border-radius: 4px; overflow: hidden; }
.meter div { height: 100%; background: #176b5b; transition: width 0.6s ease; }

.reading-progress { margin: 40px 0; }
.reading-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; }
.reading-stats-grid .stat { display: flex; flex-direction: column; gap: 8px; }
.reading-stats-grid .label { font-size: 12px; color: #8a9a94; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; }
.reading-stats-grid .value { font-size: 28px; font-weight: 700; color: #176b5b; font-family: Fraunces, serif; }

.bottlenecks { margin-top: 60px; }
.bottleneck-card { border-left: 4px solid #ccc; }
.bottleneck-card.red { border-left-color: #e53e3e; }
.bottleneck-card.red .tag { color: #e53e3e; }
.bottleneck-card.orange { border-left-color: #d06b3c; }
.bottleneck-card.orange .tag { color: #d06b3c; }
.tag { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #d06b3c; margin-bottom: 8px; }
.tag.success { color: #176b5b; }
.bottleneck-card h3, .gain-card h3 { margin: 0 0 12px; }

.gain-card { position: relative; border-left: 4px solid #176b5b; }
.score-badge { position: absolute; top: 16px; right: 16px; font-size: 24px; font-weight: 800; color: #176b5b; opacity: 0.2; }

.actions { margin-top: 40px; }

@media (max-width: 768px) {
  .skill-row { flex-wrap: wrap; }
  .skill-meter { flex: 1 1 100%; padding: 15px 0 0; order: 3; }
}
</style>