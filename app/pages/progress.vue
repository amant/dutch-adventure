<script setup lang="ts">
import { useLearnerMemory } from '~/composables/useLearnerMemory'
import { usePirateGamification } from '~/composables/usePirateGamification'
import { articles } from '~/data/articles'

const { memory, hydrate, reset } = useLearnerMemory()
const { profile, calculatedBounty, crewRank, hydrateProfile } = usePirateGamification()

onMounted(() => {
  hydrate()
  hydrateProfile()
})

const readingStats = computed(() => {
  const allVocab = Object.values(memory.value.vocabulary || {})
  const mastered = allVocab.filter(v => v.production > 80).length
  const recognized = allVocab.filter(v => v.recognition > 50 && v.production <= 80).length
  const totalEncountered = allVocab.length

  const coverages = articles.map(article => {
    const words = article.content.toLowerCase().replace(/[.,!?;:()]/g, '').split(/\s+/).filter(w => w.length > 2)
    const unique = new Set(words)
    const known = Array.from(unique).filter(w => memory.value.vocabulary[w]?.recognition > 0.5)
    return (known.length / unique.size) * 100
  })
  const avgCoverage = coverages.reduce((a, b) => a + b, 0) / (articles.length || 1)

  return {
    mastered,
    recognized,
    totalEncountered,
    avgCoverage: Math.round(avgCoverage)
  }
})

const levelForScore = (score: number) => {
  if (score < 20) return 'A0'
  if (score < 40) return 'A1 (Oost-Blauw)'
  if (score < 60) return 'A2 (Grand Line)'
  if (score < 80) return 'B1 (Sabaody)'
  return 'B2 (Nieuwe Wereld)'
}

const skillRows = computed(() => [
  { label: 'Lezen & Begrip', score: memory.value.overall.recognition, level: levelForScore(memory.value.overall.recognition), icon: '📖' },
  { label: 'Luisteren & Observatie', score: memory.value.overall.listening, level: levelForScore(memory.value.overall.listening), icon: '🎧' },
  { label: 'Woordenschat Meesterschap', score: vocabularyScore.value, level: levelForScore(vocabularyScore.value), icon: '💎' },
  { label: 'Grammatica & Structuur', score: grammarScore.value, level: levelForScore(grammarScore.value), icon: '🛡️' },
  { label: 'Schrijven & Productie', score: memory.value.overall.production, level: levelForScore(memory.value.overall.production), icon: '✍️' },
  { label: 'Spreekvaardigheid', score: memory.value.overall.speaking, level: levelForScore(memory.value.overall.speaking), icon: '🗣️' },
  { label: 'Vloeiendheid (Snelheid)', score: memory.value.overall.automaticity, level: levelForScore(memory.value.overall.automaticity), icon: '⚡' },
  { label: 'Pragmatiek (Verzachten)', score: memory.value.overall.pragmatic, level: levelForScore(memory.value.overall.pragmatic), icon: '🎭' },
  { label: 'Samenhang & Connectors', score: memory.value.overall.coherence, level: levelForScore(memory.value.overall.coherence), icon: '🔗' },
])

const vocabularyScore = computed(() => {
  const items = Object.values(memory.value.vocabulary || {})
  if (items.length === 0) return 0
  return items.reduce((acc, item) => acc + (item.recognition + item.meaning + item.production) / 3, 0) / items.length
})

const grammarScore = computed(() => {
  const items = Object.values(memory.value.grammar || {})
  if (items.length === 0) return 0
  return items.reduce((acc, item) => acc + (item.recognition + item.meaning + item.production) / 3, 0) / items.length
})

const averageRetrievalSpeed = computed(() => {
  const all = [...Object.values(memory.value.vocabulary || {}), ...Object.values(memory.value.grammar || {})]
  const speeds = all.flatMap(v => v.responseTimes || [])
  if (speeds.length === 0) return 0
  return speeds.reduce((a, b) => a + b, 0) / speeds.length
})

const overallLevel = computed(() => {
  const scores = skillRows.value.map(r => r.score)
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length
  return levelForScore(avg)
})

const canDoItems = computed(() => {
  const items = []
  if (memory.value.overall.recognition > 20) items.push('Begrijp eenvoudige introducties en borden in havensteden.')
  if (memory.value.overall.production > 30) items.push('Stel jezelf voor en vertel waar je vandaan vaart.')
  if (memory.value.overall.listening > 40) items.push('Volg duidelijke spraak in alledaagse markten en herbergen.')
  if (grammarScore.value > 50) items.push('Gebruik "omdat" en "want" om overtuigend redenen te geven.')
  if (memory.value.overall.automaticity > 60) items.push('Neem deel aan gesprekken zonder te aarzelen op het dek.')
  if (memory.value.overall.production > 70) items.push('Onderhandel en beargumenteer standpunten diplomatiek.')
  if (vocabularyScore.value > 80) items.push('Lees authentiek Nederlands nieuws en documenten moeiteloos.')
  return items.slice(-4)
})

const pipeline = computed(() => {
  const all = [...Object.values(memory.value.vocabulary || {}), ...Object.values(memory.value.grammar || {})]
  return {
    new: all.filter(v => v.encounters < 3).length,
    recognized: all.filter(v => v.recognition > 50 && v.production <= 50).length,
    produced: all.filter(v => v.production > 50 && v.automaticity <= 50).length,
    automated: all.filter(v => v.automaticity > 50).length
  }
})
</script>

<template>
  <section class="progress-view">
    <!-- Hero Status Banner -->
    <div class="hero-status-card card anime-card">
      <div class="status-top">
        <span class="eyebrow">PIRATENLOGBOEK & HAKI MATRIX</span>
        <ComicSoundBadge text="RANG STATUS 👑" variant="gold" size="sm" />
      </div>

      <div class="status-main-grid">
        <div class="status-info">
          <h1 class="rank-name">{{ crewRank.title }}</h1>
          <p class="rank-sector muted">Sector: <strong>{{ crewRank.sector }}</strong> ({{ overallLevel }})</p>
          <div class="bounty-pill-large">
            <span class="pill-label">OFFICIËLE PREMIE:</span>
            <span class="pill-val gold-text">฿ {{ calculatedBounty.toLocaleString('nl-NL') }}</span>
          </div>
        </div>

        <div class="status-summary-pills">
          <div class="summary-box">
            <span class="sum-icon">🔥</span>
            <span class="sum-val">{{ profile.streakDays }} Dagen</span>
            <span class="sum-label">Zeeloge Streak</span>
          </div>
          <div class="summary-box">
            <span class="sum-icon">⚔️</span>
            <span class="sum-val">{{ profile.battlesWon }}</span>
            <span class="sum-label">Gevechten Gewonnen</span>
          </div>
          <div class="summary-box">
            <span class="sum-icon">⏱️</span>
            <span class="sum-val">{{ averageRetrievalSpeed > 0 ? `${averageRetrievalSpeed.toFixed(1)}s` : 'N/A' }}</span>
            <span class="sum-label">Reactietijd</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Haki 3-Spheres Matrix -->
    <HakiGauge />

    <!-- Can-Do Capabilities -->
    <div v-if="canDoItems.length > 0" class="card can-do-card anime-card">
      <div class="eyebrow">BEWEZEN VAARDIGHEDEN</div>
      <h3>Wat jij kunt op de Zeven Zeeën:</h3>
      <ul class="can-do-list">
        <li v-for="item in canDoItems" :key="item">⚓ {{ item }}</li>
      </ul>
    </div>

    <!-- Skills Detailed Matrix -->
    <div class="card skill-table anime-card">
      <h2 class="table-heading">Gedetailleerde Taalvaardigheden</h2>
      <div v-for="row in skillRows" :key="row.label" class="skill-row">
        <div class="skill-info">
          <span class="skill-icon">{{ row.icon }}</span>
          <strong>{{ row.label }}</strong>
        </div>
        <div class="skill-meter">
          <div class="meter">
            <div :style="{ width: `${row.score}%` }" />
          </div>
        </div>
        <div class="skill-level">
          {{ row.level.split(' ')[0] }} ({{ Math.round(row.score) }}%)
        </div>
      </div>
    </div>

    <!-- Knowledge Pipeline -->
    <div class="pipeline-section">
      <h2 class="pipeline-title">Kennis Pijplijn (Geheugen Verloop)</h2>
      <div class="pipeline-container card anime-card">
        <div class="pipeline-grid">
          <div class="pipeline-step">
            <span class="count">{{ pipeline.new }}</span>
            <span class="label">Ontdekken</span>
            <span class="desc">Pas ontmoet</span>
          </div>
          <div class="pipeline-arrow">➔</div>
          <div class="pipeline-step">
            <span class="count">{{ pipeline.recognized }}</span>
            <span class="label">Herkennen</span>
            <span class="desc">Passief</span>
          </div>
          <div class="pipeline-arrow">➔</div>
          <div class="pipeline-step">
            <span class="count">{{ pipeline.produced }}</span>
            <span class="label">Gebruiken</span>
            <span class="desc">Actieve productie</span>
          </div>
          <div class="pipeline-arrow">➔</div>
          <div class="pipeline-step automated">
            <span class="count">{{ pipeline.automated }}</span>
            <span class="label">Automatisch</span>
            <span class="desc">Vloeiende reflex</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Reading Stats -->
    <div class="card reading-stats-card anime-card">
      <div class="eyebrow">LEESVAARDIGHEID & LOGBOEK</div>
      <div class="stats-grid mt-4">
        <div class="stat-item">
          <span class="stat-value">{{ readingStats.totalEncountered }}</span>
          <span class="stat-label">Woorden Ontmoet</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ readingStats.mastered }}</span>
          <span class="stat-label">Volledig Beheerst</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ readingStats.recognized }}</span>
          <span class="stat-label">Herkend</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ readingStats.avgCoverage }}%</span>
          <span class="stat-label">Gem. Tekstdekking</span>
        </div>
      </div>
      <div class="mt-6">
        <NuxtLink to="/reading" class="anime-btn gold sm">Verken Verhalenladder 📖</NuxtLink>
      </div>
    </div>

    <!-- Reset Data Action -->
    <div class="reset-actions">
      <button class="anime-btn secondary sm" @click="reset">Reset Geheugenlogboek 🔄</button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.progress-view {
  padding: 10px 0 40px;
}

.hero-status-card {
  background: #ffffff;
  border: 1px solid rgba(2, 132, 199, 0.2);
  border-radius: $radius-anime;
  box-shadow: $shadow-anime;
  padding: 24px;
  margin-bottom: 24px;

  .status-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .status-main-grid {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 24px;
    align-items: center;
  }

  .rank-name {
    font-size: clamp(1.8rem, 3.5vw, 2.4rem);
    color: $anime-navy;
    margin: 4px 0 6px;
  }

  .rank-sector {
    font-size: 14px;
    margin-bottom: 14px;
  }

  .bounty-pill-large {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: $anime-ice;
    border: 1px solid rgba(245, 158, 11, 0.4);
    border-radius: 8px;
    padding: 6px 14px;

    .pill-label {
      font-family: $font-anime-title;
      color: $anime-blue-deep;
      font-size: 11px;
      font-weight: 800;
    }

    .pill-val {
      font-family: $font-anime-title;
      font-size: 18px;
      font-weight: 900;
      color: $bounty-gold-dark;
    }
  }

  .status-summary-pills {
    display: flex;
    gap: 12px;

    .summary-box {
      background: $anime-ice;
      border: 1px solid rgba(2, 132, 199, 0.2);
      border-radius: 8px;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      min-width: 100px;

      .sum-icon { font-size: 20px; }
      .sum-val { font-family: $font-anime-title; font-size: 15px; font-weight: 800; color: $anime-navy; margin: 4px 0 2px; }
      .sum-label { font-size: 10px; color: $ink-muted; font-weight: 700; }
    }
  }
}

.can-do-card {
  background: #f0fdf4;
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: $radius-anime;
  box-shadow: $shadow-anime;
  padding: 22px;
  margin: 24px 0;

  h3 { margin: 6px 0 12px; color: #15803d; font-size: 1.2rem; }

  .can-do-list {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #166534;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}

.skill-table {
  background: #ffffff;
  border: 1px solid rgba(2, 132, 199, 0.2);
  border-radius: $radius-anime;
  box-shadow: $shadow-anime;
  padding: 24px;
  margin: 24px 0;

  .table-heading {
    font-size: 1.6rem;
    color: $anime-navy;
    margin: 0 0 16px;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 10px;
  }
}

.skill-row {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child { border-bottom: 0; }

  .skill-info {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: $anime-navy;
  }

  .skill-meter {
    flex: 1;
    padding: 0 24px;

    .meter {
      height: 8px;
      background: #f1f5f9;
      border-radius: 4px;
      overflow: hidden;

      div {
        height: 100%;
        background: linear-gradient(90deg, #0284c7 0%, #38bdf8 100%);
        border-radius: 4px;
        transition: width 0.4s ease;
      }
    }
  }

  .skill-level {
    font-family: $font-anime-title;
    font-size: 13px;
    font-weight: 700;
    color: $anime-blue-deep;
    min-width: 80px;
    text-align: right;
  }
}

.pipeline-section {
  margin: 28px 0;

  .pipeline-title {
    font-size: 1.6rem;
    color: $anime-navy;
    margin-bottom: 12px;
  }

  .pipeline-container {
    background: #ffffff;
    border: 1px solid rgba(2, 132, 199, 0.2);
    border-radius: $radius-anime;
    box-shadow: $shadow-anime;
    padding: 24px;
  }

  .pipeline-grid {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .pipeline-step {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .count {
      font-family: $font-anime-title;
      font-size: 24px;
      font-weight: 900;
      color: $anime-blue-deep;
    }

    .label {
      font-family: $font-anime-title;
      font-size: 13px;
      font-weight: 800;
      color: $anime-navy;
    }

    .desc {
      font-size: 11px;
      color: #64748b;
    }

    &.automated .count {
      color: $berry-green;
    }
  }

  .pipeline-arrow {
    font-size: 18px;
    color: #94a3b8;
    font-weight: 700;
  }
}

.reading-stats-card {
  background: #ffffff;
  border: 1px solid rgba(2, 132, 199, 0.2);
  border-radius: $radius-anime;
  box-shadow: $shadow-anime;
  padding: 24px;
  margin: 24px 0;

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin: 14px 0 18px;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: $anime-ice;
    border: 1px solid rgba(2, 132, 199, 0.15);
    border-radius: 6px;
    padding: 10px;

    .stat-value {
      font-family: $font-anime-title;
      font-size: 22px;
      font-weight: 900;
      color: $anime-blue-deep;
    }

    .stat-label {
      font-size: 10px;
      font-weight: 700;
      color: $ink-muted;
      text-transform: uppercase;
    }
  }
}

.reset-actions {
  margin-top: 24px;
  text-align: center;
}

@media (max-width: 800px) {
  .status-main-grid {
    grid-template-columns: 1fr;
  }
  .pipeline-grid {
    flex-direction: column;
  }
  .pipeline-arrow {
    transform: rotate(90deg);
  }
}
</style>
