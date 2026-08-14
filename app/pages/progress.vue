<script setup lang="ts">
import { useLearnerMemory } from '~/composables/useLearnerMemory'
import { articles } from '~/data/articles'
import type { SkillDimension } from '~/types/learning'

const { memory, hydrate, reset } = useLearnerMemory()
onMounted(hydrate)

const readingStats = computed(() => {
  const allVocab = Object.values(memory.value.vocabulary)
  const mastered = allVocab.filter(v => v.production > 80).length
  const recognized = allVocab.filter(v => v.recognition > 50 && v.production <= 80).length
  const totalEncountered = allVocab.length

  // Calculate avg coverage across articles
  const coverages = articles.map(article => {
    const words = article.content.toLowerCase().replace(/[.,!?;:()]/g, '').split(/\s+/).filter(w => w.length > 2)
    const unique = new Set(words)
    const known = Array.from(unique).filter(w => memory.value.vocabulary[w]?.recognition > 0.5)
    return (known.length / unique.size) * 100
  })
  const avgCoverage = coverages.reduce((a, b) => a + b, 0) / articles.length

  return {
    mastered,
    recognized,
    totalEncountered,
    avgCoverage: Math.round(avgCoverage)
  }
})

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

const retrievalTrend = computed(() => {
  const all = [...Object.values(memory.value.vocabulary), ...Object.values(memory.value.grammar)]
  const allSpeeds = all.flatMap(v => v.responseTimes || [])
  
  if (allSpeeds.length < 10) return null

  const recent = allSpeeds.slice(-10).reduce((a, b) => a + b, 0) / 10
  const previous = allSpeeds.slice(-20, -10).reduce((a, b) => a + b, 0) / Math.min(10, Math.max(1, allSpeeds.length - 10))

  return { 
    current: recent, 
    change: previous - recent, // Positive means faster (time decreased)
    history: allSpeeds.slice(-20) 
  }
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

    <div class="card reading-stats-card">
      <div class="eyebrow">Reading Proficiency</div>
      <div class="stats-grid mt-4">
        <div class="stat-item">
          <span class="stat-value">{{ readingStats.totalEncountered }}</span>
          <span class="stat-label">Words Encountered</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ readingStats.mastered }}</span>
          <span class="stat-label">Mastered</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ readingStats.recognized }}</span>
          <span class="stat-label">Recognized</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ readingStats.avgCoverage }}%</span>
          <span class="stat-label">Avg. Coverage</span>
        </div>
      </div>
      <div class="mt-6">
        <NuxtLink to="/reading" class="button secondary small">Explore Reading Feed</NuxtLink>
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

      <div v-if="retrievalTrend" class="card speed-trend-card mt-6">
        <div class="trend-header">
          <div class="stat-main">
            <span class="value">{{ retrievalTrend.current.toFixed(1) }}s</span>
            <span class="label">Current Speed</span>
          </div>
          <div class="trend-meta">
            <div class="trend-indicator" :class="{ up: retrievalTrend.change > 0, down: retrievalTrend.change < 0 }">
              {{ retrievalTrend.change > 0 ? '↑ Faster' : retrievalTrend.change < 0 ? '↓ Slower' : '→ Steady' }} 
              ({{ Math.abs(retrievalTrend.change).toFixed(1) }}s)
            </div>
            <p class="muted">Trend based on last 20 production attempts.</p>
          </div>
        </div>
        <div class="speed-graph">
          <div 
            v-for="(speed, idx) in retrievalTrend.history" 
            :key="idx" 
            class="speed-bar"
            :style="{ height: `${Math.min(100, (10 / speed) * 30)}%` }"
            :title="`${speed.toFixed(1)}s`"
          ></div>
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

<style scoped lang="scss">
.skill-table {
  margin: 32px 0;
  padding: 24px 32px;
  background: $white-pure;
  border: 1.5px solid $ocean-border;
  border-radius: $radius-xl;
  box-shadow: $shadow-card;
}

.can-do-card {
  background: linear-gradient(135deg, $white-pure 0%, $ocean-ice 100%);
  border: 1.5px solid $ocean-border;
  border-radius: $radius-lg;
  margin: 24px 0;
  padding: 28px;
  box-shadow: $shadow-card;

  h3 {
    margin: 8px 0 16px;
    color: $ocean-dark;
  }
}

.can-do-list {
  margin: 0;
  padding-left: 20px;
  color: $ink-slate;

  li {
    margin-bottom: 8px;
    font-weight: 600;
  }
}

.skill-row {
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid $ocean-ice;

  &:last-child {
    border-bottom: 0;
  }
}

.skill-info {
  flex: 1;
  display: flex;
  flex-direction: column;

  strong {
    font-family: $font-anime;
    font-size: 16px;
    color: $ocean-deepest;
  }
}

.skill-meter {
  flex: 1;
  padding: 0 40px;
}

.skill-level {
  width: 50px;
  font-family: $font-anime;
  font-weight: 800;
  text-align: right;
  color: $ocean-primary;
}

.meter {
  height: 10px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;

  div {
    height: 100%;
    background: linear-gradient(90deg, $ocean-primary 0%, $ocean-sky 100%);
    border-radius: 999px;
    transition: width 0.6s ease;
  }
}

.reading-stats-card {
  margin-top: 30px;
  padding: 28px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: $ocean-ice;
  padding: 16px;
  border-radius: $radius-md;
  border: 1px solid $ocean-border;
}

.stat-value {
  font-family: $font-anime;
  font-size: 26px;
  font-weight: 900;
  color: $ocean-primary;
}

.stat-label {
  font-size: 11px;
  color: $ink-muted;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: 4px;
}

.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }

@media (max-width: 600px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}

.pipeline-section {
  margin: 40px 0;
}

.pipeline-container {
  padding: 32px;
  background: $white-pure;
  border: 1.5px solid $ocean-border;
  border-radius: $radius-xl;
  box-shadow: $shadow-card;
}

.pipeline-grid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.pipeline-step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px 10px;
  background: $ocean-ice;
  border-radius: $radius-md;
  border: 1px solid $ocean-border;

  &.active {
    background: linear-gradient(135deg, $white-pure 0%, #ecfdf5 100%);
    border-color: $sea-emerald;
    color: $sea-emerald-dark;
  }

  .count {
    font-family: $font-anime;
    font-size: 28px;
    font-weight: 900;
    margin-bottom: 4px;
  }

  .label {
    font-family: $font-anime;
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .desc {
    font-size: 11px;
    color: $ink-muted;
  }
}

.pipeline-arrow {
  font-size: 20px;
  color: #cbd5e1;
  font-weight: 700;

  &.active {
    color: $ocean-primary;
  }
}

.fluency-section {
  margin: 40px 0;
}

.trend-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.fluency-card, .trend-card {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 32px;
  background: $white-pure;
  border: 1.5px solid $parchment-border;
  border-radius: $radius-xl;
  box-shadow: $shadow-card;
}

.trend-card {
  background: linear-gradient(135deg, $white-pure 0%, #fff1f2 100%);
  border-color: $battle-red-border;
}

.trend-meta {
  flex: 1;
}

.trend-indicator {
  font-family: $font-anime;
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 4px;

  &.up { color: $sea-emerald-dark; }
  &.down { color: $battle-red-vibrant; }
}

.stat-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 140px;

  .value {
    font-family: $font-anime;
    font-size: 44px;
    font-weight: 900;
    color: $gold-deep;
  }

  .label {
    font-family: $font-anime;
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 800;
    color: $ink-muted;
    letter-spacing: 0.1em;
  }
}

.stat-desc {
  flex: 1;
  font-size: 15px;
  line-height: 1.6;
  color: $ink-slate;

  strong {
    color: $ocean-primary;
  }
}

.speed-trend-card {
  padding: 32px;
  background: linear-gradient(135deg, $white-pure 0%, $ocean-ice 100%);
  border: 1.5px solid $ocean-border;
  border-radius: $radius-xl;
  box-shadow: $shadow-card;
}

.trend-header {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 24px;
}

.speed-graph {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 70px;
  padding: 10px 0;
  border-bottom: 2px solid $ocean-border;
}

.speed-bar {
  flex: 1;
  background: linear-gradient(180deg, $ocean-sky 0%, $ocean-primary 100%);
  border-radius: 4px 4px 0 0;
  min-height: 6px;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(180deg, $gold-bright 0%, $gold-deep 100%);
    transform: scaleY(1.05);
  }
}

.reading-progress {
  margin: 40px 0;
}

.reading-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;

  .stat {
    background: $white-pure;
    padding: 20px;
    border-radius: $radius-lg;
    border: 1.5px solid $ocean-border;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .label {
    font-size: 11px;
    color: $ink-muted;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 0.08em;
  }

  .value {
    font-family: $font-anime;
    font-size: 28px;
    font-weight: 900;
    color: $ocean-primary;
  }
}

.bottlenecks {
  margin-top: 50px;
}

.bottleneck-card {
  border-left: 5px solid $gold-parchment;

  &.red {
    border-left-color: $battle-red-vibrant;
    background: linear-gradient(135deg, $white-pure 0%, #fff1f2 100%);
    .tag { color: $battle-red-vibrant; }
  }

  &.orange {
    border-left-color: $gold-parchment;
    background: linear-gradient(135deg, $white-pure 0%, $parchment-bg 100%);
    .tag { color: $gold-deep; }
  }
}

.gain-card {
  position: relative;
  border-left: 5px solid $sea-emerald;
  background: linear-gradient(135deg, $white-pure 0%, #ecfdf5 100%);
}

.score-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  font-family: $font-anime;
  font-size: 24px;
  font-weight: 900;
  color: $sea-emerald;
  opacity: 0.35;
}

.actions {
  margin-top: 40px;
}

@media (max-width: 768px) {
  .skill-row { flex-wrap: wrap; }
  .skill-meter { flex: 1 1 100%; padding: 15px 0 0; order: 3; }
  .trend-grid { grid-template-columns: 1fr; }
}
</style>