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
  { label: 'Coherence', score: memory.value.overall.coherence, level: levelForScore(memory.value.overall.coherence) },
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

const averageRetrievalSpeed = computed(() => {
  const all = [...Object.values(memory.value.vocabulary), ...Object.values(memory.value.grammar)]
  const speeds = all.flatMap(v => v.responseTimes || [])
  if (speeds.length === 0) return 0
  return speeds.reduce((a, b) => a + b, 0) / speeds.length
})

const bottlenecks = computed(() => {
  const speed = averageRetrievalSpeed.value
  const skills = [
    { id: 'speaking', label: 'Retrieval speed', score: speed > 0 ? Math.max(0, 100 - speed * 10) : 100, status: speed > 6 ? 'red' : speed > 3 ? 'orange' : 'green', text: speed > 0 ? `Your average retrieval time is ${speed.toFixed(1)}s.` : 'Retrieval speed not yet measured.' },
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

const pipeline = computed(() => {
  const all = [...Object.values(memory.value.vocabulary), ...Object.values(memory.value.grammar)]
  return {
    new: all.filter(v => v.encounters < 3).length,
    recognized: all.filter(v => v.recognition > 50 && v.production <= 50).length,
    produced: all.filter(v => v.production > 50 && v.automaticity <= 50).length,
    automated: all.filter(v => v.automaticity > 50).length
  }
})

const naturalnessTrend = computed(() => {
  const allHistory = [...Object.values(memory.value.vocabulary), ...Object.values(memory.value.grammar)]
    .flatMap(v => v.usageHistory || [])
    .filter(h => h.pragmaticScore !== undefined)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (allHistory.length < 4) return null

  const recent = allHistory.slice(0, 5).reduce((acc, h) => acc + (h.pragmaticScore || 0), 0) / Math.min(5, allHistory.length)
  const previous = allHistory.slice(5, 10).reduce((acc, h) => acc + (h.pragmaticScore || 0), 0) / Math.min(5, Math.max(0, allHistory.length - 5))

  if (isNaN(previous)) return { score: Math.round(recent), change: 0 }
  return { score: Math.round(recent), change: Math.round(recent - previous) }
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

    <div class="pipeline-section">
      <h2>Knowledge Pipeline</h2>
      <div class="pipeline-container card">
        <div class="pipeline-grid">
          <div class="pipeline-step">
            <span class="count">{{ pipeline.new }}</span>
            <span class="label">New</span>
            <span class="desc">Exposure</span>
          </div>
          <div class="pipeline-arrow">→</div>
          <div class="pipeline-step">
            <span class="count">{{ pipeline.recognized }}</span>
            <span class="label">Recognized</span>
            <span class="desc">Passive</span>
          </div>
          <div class="pipeline-arrow active">→</div>
          <div class="pipeline-step active">
            <span class="count">{{ pipeline.produced }}</span>
            <span class="label">Produced</span>
            <span class="desc">Active</span>
          </div>
          <div class="pipeline-arrow">→</div>
          <div class="pipeline-step">
            <span class="count">{{ pipeline.automated }}</span>
            <span class="label">Automated</span>
            <span class="desc">Fluent</span>
          </div>
        </div>
      </div>
    </div>

    <div class="fluency-section">
      <div class="trend-grid">
        <div class="card fluency-card">
          <div class="stat-main">
            <span class="value">{{ averageRetrievalSpeed > 0 ? averageRetrievalSpeed.toFixed(1) : '--' }}s</span>
            <span class="label">Avg. Retrieval Time</span>
          </div>
          <div class="stat-desc">
            <p v-if="averageRetrievalSpeed > 5">You are in the <strong>Thinking</strong> phase. Retrieval is conscious and slow.</p>
            <p v-else-if="averageRetrievalSpeed > 2">You are reaching <strong>Functional Fluency</strong>. Retrieval is becoming semi-automatic.</p>
            <p v-else-if="averageRetrievalSpeed > 0">You are reaching <strong>Automaticity</strong>. You retrieve Dutch almost as fast as your native language.</p>
            <p v-else>Start missions and drills to measure your retrieval speed.</p>
          </div>
        </div>

        <div v-if="naturalnessTrend" class="card trend-card">
          <div class="stat-main">
            <span class="value">{{ naturalnessTrend.score }}%</span>
            <span class="label">Naturalness Score</span>
          </div>
          <div class="trend-meta">
            <div class="trend-indicator" :class="{ up: naturalnessTrend.change > 0, down: naturalnessTrend.change < 0 }">
              {{ naturalnessTrend.change > 0 ? '↑' : naturalnessTrend.change < 0 ? '↓' : '→' }} 
              {{ Math.abs(naturalnessTrend.change) }}%
            </div>
            <p class="muted">Trend over last 10 interactions.</p>
            <p class="desc">B2 learners should aim for >80% naturalness using native particles and flow.</p>
          </div>
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

.pipeline-section { margin: 40px 0; }
.pipeline-container { padding: 30px; background: #f8fafc; }
.pipeline-grid { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.pipeline-step { flex: 1; display: flex; flex-direction: column; align-items: center; text-align: center; }
.pipeline-step.active { color: #176b5b; }
.pipeline-step .count { font-size: 24px; font-weight: 800; font-family: Fraunces, serif; margin-bottom: 4px; }
.pipeline-step .label { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
.pipeline-step .desc { font-size: 11px; color: #8a9a94; }
.pipeline-step.active .desc { color: #176b5b; opacity: 0.8; }
.pipeline-arrow { font-size: 20px; color: #cbd5e1; font-weight: 700; }
.pipeline-arrow.active { color: #176b5b; }

.fluency-section { margin: 40px 0; }
.trend-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.fluency-card, .trend-card { display: flex; align-items: center; gap: 40px; padding: 32px; background: #fffdf9; border: 1px solid #f9e8b9; }
.trend-card { background: #fdf2f8; border-color: #fbcfe8; }
.trend-meta { flex: 1; }
.trend-indicator { font-size: 24px; font-weight: 800; margin-bottom: 4px; }
.trend-indicator.up { color: #176b5b; }
.trend-indicator.down { color: #ef4444; }
.trend-meta .desc { font-size: 13px; color: #9d174d; margin-top: 8px; }
.stat-main { display: flex; flex-direction: column; align-items: center; min-width: 140px; }
.stat-main .value { font-size: 42px; font-weight: 800; color: #d06b3c; font-family: Fraunces, serif; }
.stat-main .label { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #8a9a94; letter-spacing: 0.1em; }
.stat-desc { flex: 1; font-size: 16px; line-height: 1.5; color: #2c3e50; }
.stat-desc strong { color: #d06b3c; }

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