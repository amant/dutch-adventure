<script setup lang="ts">
import { chapters } from '~/data/chapters'
import { useLearnerMemory } from '~/composables/useLearnerMemory'
import { useGsapAnimations } from '~/composables/useGsapAnimations'

const { memory } = useLearnerMemory()
const { animateComicPop } = useGsapAnimations()

const selectedIslandSlug = ref<string>('introduction-en-begroetingen')
const shipRef = ref<HTMLElement | null>(null)

// Map regions based on CEFR levels
const regions = [
  { id: 'A1', name: 'Oost-Blauw (East Blue)', subtitle: 'Survival Nederlands', sea: 'Kalme Zee' },
  { id: 'A2', name: 'Grand Line Entree', subtitle: 'Dagelijkse Zelfstandigheid', sea: 'Wilde Stroming' },
  { id: 'B1', name: 'Sabaody Archipel', subtitle: 'Onafhankelijk Communiceren', sea: 'Gevaarlijke Mangroves' },
  { id: 'B2', name: 'De Nieuwe Wereld', subtitle: 'Complexe Beheersing & B2 Capstone', sea: 'Heer der Zeeën' },
]

function getChapterStatus(slug: string) {
  const chapter = chapters.find(c => c.slug === slug)
  if (!chapter) return 'unlocked'

  const vocab = chapter.stages.flatMap(s => s.exercises.flatMap(e => e.vocabulary || []))
  const grammar = chapter.stages.flatMap(s => s.exercises.flatMap(e => e.grammar || []))
  if (!vocab.length && !grammar.length) return 'unlocked'

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

  if (scores.length === 0) return 'unlocked'
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length
  if (avg > 75) return 'mastered'
  if (avg > 15) return 'in-progress'
  return 'unlocked'
}

const activeChapter = computed(() => {
  return chapters.find(c => c.slug === selectedIslandSlug.value) || chapters[0]
})

function selectIsland(slug: string) {
  selectedIslandSlug.value = slug
}
</script>

<template>
  <div class="grand-line-map card">
    <!-- Map Header -->
    <div class="map-header">
      <div class="header-left">
        <span class="eyebrow">GRAND LINE NAVIGATION // 偉大なる航路</span>
        <h2 class="map-title">De Grote Taalroute</h2>
        <p class="muted">Navigeer per schip van eiland naar eiland en verover alle Nederlandse vaardigheden!</p>
      </div>

      <div class="log-pose-compass">
        <span class="compass-needle">🧭</span>
        <span class="log-pose-label">LOG POSE</span>
      </div>
    </div>

    <!-- Active Island Briefing Card -->
    <div v-if="activeChapter" class="island-briefing anime-card">
      <div class="briefing-badge">
        <span class="level-tag">{{ activeChapter.level }}</span>
        <span v-if="activeChapter.isCapstone" class="capstone-badge">🏆 CAPSTONE MISSIE</span>
      </div>
      
      <div class="briefing-body">
        <div class="briefing-info">
          <h3 class="briefing-title">{{ activeChapter.title }}</h3>
          <p class="briefing-capability">{{ activeChapter.capability }}</p>
          <div class="briefing-meta">
            <span>⏱️ {{ activeChapter.estimatedMinutes }} minuten</span>
            <span>📜 {{ activeChapter.stages.length }} Uitdagingen</span>
            <span class="status-indicator" :class="getChapterStatus(activeChapter.slug)">
              {{ getChapterStatus(activeChapter.slug) === 'mastered' ? '⭐ Veroverd' : getChapterStatus(activeChapter.slug) === 'in-progress' ? '⚔️ Aan het Varen' : '📍 Klaar voor vertrek' }}
            </span>
          </div>
        </div>

        <div class="briefing-actions">
          <NuxtLink :to="`/chapter/${activeChapter.slug}`" class="anime-btn gold lg">
            <span>VAAR NAAR DIT EILAND! ⛵</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- The Grand Line Sea Chart -->
    <div class="sea-chart-container">
      <div class="sea-regions-grid">
        <div v-for="region in regions" :key="region.id" class="sea-region-column">
          <!-- Region Title -->
          <div class="region-header">
            <span class="region-pill">{{ region.id }}</span>
            <div class="region-info">
              <span class="region-name">{{ region.name }}</span>
              <span class="region-sub">{{ region.subtitle }}</span>
            </div>
          </div>

          <!-- Island Nodes in Region -->
          <div class="islands-path">
            <div 
              v-for="chapter in chapters.filter(c => c.level === region.id)" 
              :key="chapter.slug"
              class="island-node"
              :class="[
                getChapterStatus(chapter.slug), 
                { 'active': chapter.slug === selectedIslandSlug, 'is-capstone': chapter.isCapstone }
              ]"
              @click="selectIsland(chapter.slug)"
            >
              <!-- Ship anchor indicator when selected -->
              <div v-if="chapter.slug === selectedIslandSlug" class="active-ship-anchor">
                <span class="ship-icon animate-ship">⛵</span>
              </div>

              <div class="island-icon-box">
                <span class="icon">{{ chapter.isCapstone ? '👑' : getChapterStatus(chapter.slug) === 'mastered' ? '🏝️' : '⚓' }}</span>
              </div>

              <div class="island-details">
                <span class="island-name">{{ chapter.title }}</span>
                <span class="island-status-tag">
                  {{ getChapterStatus(chapter.slug) === 'mastered' ? 'MEESTER' : chapter.isCapstone ? 'BAAS GEVECHT' : 'EILAND' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grand-line-map {
  background: #ffffff;
  border: 1px solid rgba(2, 132, 199, 0.2);
  border-radius: $radius-anime;
  box-shadow: $shadow-anime;
  padding: 24px;
  margin: 24px 0;
  position: relative;
}

.map-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 16px;
  margin-bottom: 20px;

  .map-title {
    margin: 4px 0 6px;
    font-size: 1.8rem;
    color: $anime-navy;
  }
}

.log-pose-compass {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $anime-ice;
  color: $anime-blue-deep;
  padding: 8px 14px;
  border: 1px solid rgba(2, 132, 199, 0.3);
  border-radius: $radius-anime-sm;
  box-shadow: 0 2px 8px rgba(2, 132, 199, 0.1);

  .compass-needle {
    font-size: 22px;
    animation: shipFloat 4s ease-in-out infinite;
  }

  .log-pose-label {
    font-family: $font-anime-title;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.12em;
  }
}

.island-briefing {
  background: #ffffff;
  border: 1px solid rgba(2, 132, 199, 0.25);
  border-radius: $radius-anime-sm;
  box-shadow: 0 4px 14px rgba(2, 132, 199, 0.08);
  padding: 18px 20px;
  margin-bottom: 24px;
  border-left: 4px solid $anime-blue-primary;

  .briefing-badge {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;

    .level-tag {
      background: $anime-blue-deep;
      color: white;
      font-family: $font-anime-title;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
    }

    .capstone-badge {
      background: $battle-red;
      color: white;
      font-family: $font-anime-title;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
    }
  }

  .briefing-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  .briefing-title {
    margin: 0 0 4px;
    font-size: 1.3rem;
    color: $anime-navy;
  }

  .briefing-capability {
    color: $ink-muted;
    font-size: 13px;
    margin: 0 0 10px;
  }

  .briefing-meta {
    display: flex;
    gap: 14px;
    font-size: 12px;
    font-weight: 700;
    color: $ink-dark;

    .status-indicator {
      padding: 2px 8px;
      border-radius: 4px;
      background: #f1f5f9;

      &.mastered { background: #d1fae5; color: #065f46; }
      &.in-progress { background: #fef3c7; color: #92400e; }
      &.unlocked { background: #dbeafe; color: #1e40af; }
    }
  }
}

.sea-chart-container {
  background: #0b192c;
  background-image: 
    radial-gradient(rgba(14, 165, 233, 0.15) 1px, transparent 1px),
    linear-gradient(180deg, #0b192c 0%, #081426 100%);
  background-size: 20px 20px, 100% 100%;
  border: 1px solid rgba(2, 132, 199, 0.3);
  border-radius: $radius-anime-sm;
  padding: 20px;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.4);
  overflow-x: auto;
}

.sea-regions-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(240px, 1fr));
  gap: 16px;
}

.sea-region-column {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
}

.region-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .region-pill {
    background: $anime-blue-primary;
    color: #ffffff;
    font-family: $font-anime-title;
    font-size: 11px;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 4px;
  }

  .region-name {
    display: block;
    font-family: $font-anime-title;
    color: #ffffff;
    font-size: 13px;
    font-weight: 800;
  }

  .region-sub {
    font-size: 10px;
    color: #94a3b8;
  }
}

.islands-path {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.island-node {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(2, 132, 199, 0.2);
  border-radius: 6px;
  padding: 8px 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateX(3px);
    background: #ffffff;
    border-color: $anime-cyan;
    box-shadow: 0 4px 12px rgba(6, 182, 212, 0.2);
  }

  &.active {
    background: #ffffff;
    border: 1.5px solid $anime-blue-primary;
    box-shadow: 0 0 12px rgba(2, 132, 199, 0.35);
  }

  &.mastered {
    border-left: 3px solid $berry-green;
  }

  &.is-capstone {
    background: #fff5f5;
    border-color: rgba(239, 68, 68, 0.4);
  }

  .active-ship-anchor {
    position: absolute;
    left: -12px;
    top: -10px;
    font-size: 18px;
    z-index: 2;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
  }

  .island-icon-box {
    font-size: 18px;
  }

  .island-details {
    display: flex;
    flex-direction: column;

    .island-name {
      font-family: $font-anime-title;
      font-size: 12px;
      font-weight: 700;
      color: $anime-navy;
      line-height: 1.2;
    }

    .island-status-tag {
      font-size: 10px;
      font-weight: 600;
      color: $ink-muted;
      text-transform: uppercase;
    }
  }
}

@media (max-width: 900px) {
  .island-briefing .briefing-body {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
