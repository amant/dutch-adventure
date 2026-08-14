<script setup lang="ts">
import { useLearnerMemory } from '~/composables/useLearnerMemory'
import { usePirateGamification } from '~/composables/usePirateGamification'

const { memory, getFrontierConcepts, getWeakConcepts } = useLearnerMemory()
const { profile } = usePirateGamification()

interface BountyTarget {
  id: string
  name: string
  epithet: string
  rewardBounty: number
  description: string
  actionUrl: string
  actionLabel: string
  threatLevel: 'Gevaarlijk' | 'Zeer Gevaarlijk' | 'Rampzalig'
  icon: string
}

const activeBounties = computed<BountyTarget[]>(() => {
  const list: BountyTarget[] = []

  // 1. Weak grammar
  const wordOrder = memory.value.grammar['word-order']
  if (!wordOrder || wordOrder.production < 70) {
    list.push({
      id: 'inversion-bandit',
      name: 'Inversie Rover',
      epithet: 'De Woordvolgorde Bandiet',
      rewardBounty: 1500000,
      description: 'Verwisselt constant onderwerp en persoonsvorm op de woelige baren!',
      actionUrl: '/chapter/opinions-en-redenen',
      actionLabel: 'Versla Inversie',
      threatLevel: 'Gevaarlijk',
      icon: '🦹'
    })
  }

  // 2. Er & Position verbs
  const erConcept = memory.value.grammar['er']
  if (!erConcept || erConcept.production < 60) {
    list.push({
      id: 'er-monster',
      name: 'Het "Er" Zeemonster',
      epithet: 'Verschrikking van Positiewerkwoorden',
      rewardBounty: 2000000,
      description: 'Houdt schatten verborgen achter "er staat", "er ligt" en "er zit"!',
      actionUrl: '/chapter/er-en-positiewerkwoorden',
      actionLabel: 'Verover "Er"',
      threatLevel: 'Zeer Gevaarlijk',
      icon: '🐙'
    })
  }

  // 3. Retrieval Speed
  const all = [...Object.values(memory.value.vocabulary || {}), ...Object.values(memory.value.grammar || {})]
  const speeds = all.flatMap(v => v.responseTimes || [])
  const avgSpeed = speeds.length > 0 ? speeds.reduce((a, b) => a + b, 0) / speeds.length : 5.0
  if (avgSpeed > 3.5) {
    list.push({
      id: 'speed-phantom',
      name: 'De Trage Denker',
      epithet: 'Vertrager van de Vloeiendheid',
      rewardBounty: 1200000,
      description: `Gemiddelde reactietijd is ${avgSpeed.toFixed(1)}s. Versnel je antwoorden!`,
      actionUrl: '/smart-review?mode=speed',
      actionLabel: 'Start Snelheidsdrill',
      threatLevel: 'Gevaarlijk',
      icon: '⏱️'
    })
  }

  // 4. Frontier vocabulary
  const frontier = getFrontierConcepts(5)
  if (frontier.length > 0) {
    list.push({
      id: 'frontier-outlaw',
      name: 'Passieve Kennis Piraat',
      epithet: 'De Woordenschat Kaper',
      rewardBounty: 1800000,
      description: `Je herkent ${frontier.length} woorden maar gebruikt ze nog niet actief in spraak!`,
      actionUrl: '/smart-review?mode=activation',
      actionLabel: 'Activeer Woorden',
      threatLevel: 'Zeer Gevaarlijk',
      icon: '💎'
    })
  }

  // Fallback if master
  if (list.length === 0) {
    list.push({
      id: 'b2-admiral',
      name: 'Admiraal der Vloeiendheid',
      epithet: 'Eindbaas van de Nieuwe Wereld',
      rewardBounty: 10000000,
      description: 'Beheers alle B2 diplomatieke nuances en complexe contrastzinnen!',
      actionUrl: '/chapter/b2-capstone-professionele-integratie',
      actionLabel: 'Start B2 Capstone',
      threatLevel: 'Rampzalig',
      icon: '👑'
    })
  }

  return list
})
</script>

<template>
  <div class="wanted-bounty-board card">
    <div class="board-header">
      <div class="header-left">
        <span class="eyebrow">BOUNTY TARGETS // 賞金首ターゲット</span>
        <h2 class="board-title">Bounty Hunter Bord</h2>
        <p class="muted">Jaag op je taal-knelpunten en claim enorme Beri-premies om je piratenrang te verhogen!</p>
      </div>

      <div class="board-badge">
        <ComicSoundBadge text="GEZOCHT! 📜" variant="red" size="sm" />
      </div>
    </div>

    <!-- Grid of Wanted Postings -->
    <div class="posters-grid">
      <div 
        v-for="target in activeBounties" 
        :key="target.id"
        class="bounty-poster anime-card-interactive"
      >
        <div class="poster-heading">WANTED // 賞金首</div>
        
        <div class="target-portrait">
          <span class="target-icon">{{ target.icon }}</span>
          <span class="threat-tag" :class="target.threatLevel.toLowerCase().replace(/\s+/g, '-')">
            {{ target.threatLevel }}
          </span>
        </div>

        <h3 class="target-name">{{ target.name }}</h3>
        <span class="target-epithet">"{{ target.epithet }}"</span>

        <p class="target-desc">{{ target.description }}</p>

        <div class="poster-bounty">
          <span class="bounty-sym">฿</span>
          <span class="bounty-num">{{ target.rewardBounty.toLocaleString('nl-NL') }}</span>
        </div>

        <div class="poster-cta">
          <NuxtLink :to="target.actionUrl" class="anime-btn red sm">
            <span>{{ target.actionLabel }} ⚔️</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wanted-bounty-board {
  background: #ffffff;
  border: 1px solid rgba(2, 132, 199, 0.2);
  border-radius: $radius-anime;
  box-shadow: $shadow-anime;
  padding: 24px;
  margin: 24px 0;
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 16px;
  margin-bottom: 24px;

  .board-title {
    margin: 4px 0 6px;
    font-size: 1.8rem;
    color: $anime-navy;
  }
}

.posters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.bounty-poster {
  background: #ffffff;
  border: 1px solid rgba(2, 132, 199, 0.25);
  border-radius: $radius-anime-sm;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.06);
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-3px);
    border-color: $anime-blue-primary;
    box-shadow: 0 8px 24px rgba(2, 132, 199, 0.15);
  }

  .poster-heading {
    font-family: $font-anime-title;
    font-weight: 900;
    font-size: 11px;
    letter-spacing: 0.12em;
    color: $anime-blue-deep;
    margin-bottom: 10px;
  }

  .target-portrait {
    width: 90%;
    height: 84px;
    background: $anime-ice;
    border: 1px solid rgba(2, 132, 199, 0.2);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 10px;

    .target-icon {
      font-size: 36px;
    }

    .threat-tag {
      position: absolute;
      bottom: -8px;
      font-family: $font-anime-title;
      font-size: 9px;
      font-weight: 800;
      padding: 1px 6px;
      border-radius: 3px;
      background: $battle-red;
      color: white;
      letter-spacing: 0.05em;

      &.zeer-gevaarlijk { background: #dc2626; }
      &.rampzalig { background: #7c3aed; }
    }
  }

  .target-name {
    font-family: $font-anime-title;
    font-size: 15px;
    font-weight: 800;
    color: $anime-navy;
    margin: 8px 0 2px;
  }

  .target-epithet {
    font-family: $font-anime-title;
    font-size: 11px;
    font-style: italic;
    color: $anime-blue-deep;
    margin-bottom: 8px;
  }

  .target-desc {
    font-size: 12px;
    color: $ink-muted;
    line-height: 1.5;
    margin: 0 0 12px;
    flex: 1;
  }

  .poster-bounty {
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.3);
    border-radius: 4px;
    padding: 4px 10px;
    width: 100%;
    margin-bottom: 12px;
    font-family: $font-anime-title;
    font-weight: 800;
    font-size: 15px;
    color: $bounty-gold-dark;
  }

  .poster-cta {
    width: 100%;
  }
}
</style>
