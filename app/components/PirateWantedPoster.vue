<script setup lang="ts">
import { usePirateGamification } from '~/composables/usePirateGamification'
import { useLearnerMemory } from '~/composables/useLearnerMemory'
import { useGsapAnimations } from '~/composables/useGsapAnimations'

const props = withDefaults(defineProps<{
  showCrimes?: boolean
  interactive?: boolean
  compact?: boolean
}>(), {
  showCrimes: true,
  interactive: true,
  compact: false
})

const { profile, calculatedBounty, crewRank, hakiLevels, devilFruit, hydrateProfile } = usePirateGamification()
const { memory } = useLearnerMemory()
const { animateBountyCounter, animateComicPop } = useGsapAnimations()

const posterRef = ref<HTMLElement | null>(null)
const bountyRef = ref<HTMLElement | null>(null)
const isCustomizing = ref(false)
const newName = ref('')

onMounted(() => {
  hydrateProfile()
  newName.value = profile.value.pirateName
  if (posterRef.value) {
    animateComicPop(posterRef)
  }
  if (bountyRef.value) {
    animateBountyCounter(bountyRef, 0, calculatedBounty.value, 1.6)
  }
})

const totalKnownWords = computed(() => Object.keys(memory.value.vocabulary || {}).length)
const totalGrammarMastered = computed(() => Object.keys(memory.value.grammar || {}).length)

function saveName() {
  if (newName.value.trim()) {
    profile.value.pirateName = newName.value.trim()
    isCustomizing.value = false
  }
}
</script>

<template>
  <div 
    ref="posterRef" 
    class="wanted-poster-frame"
    :class="{ 'compact': compact, 'interactive': interactive }"
  >
    <!-- Card Border Accents -->
    <div class="card-accent top-left"></div>
    <div class="card-accent top-right"></div>
    <div class="card-accent bottom-left"></div>
    <div class="card-accent bottom-right"></div>

    <div class="poster-inner">
      <!-- Top Title -->
      <div class="wanted-header">
        <span class="wanted-sub">PIRATE BOUNTY // 手配書</span>
        <span class="wanted-title">WANTED</span>
      </div>

      <!-- Pirate Avatar / Photo Area -->
      <div class="photo-area">
        <div class="avatar-frame">
          <div class="pirate-avatar-art">
            <span class="avatar-emoji">🏴‍☠️</span>
            <span class="rank-crown">{{ crewRank.icon }}</span>
          </div>
        </div>
        <div class="photo-caption">
          <span>{{ crewRank.sector }}</span>
        </div>
      </div>

      <!-- Dead or Alive Header -->
      <div class="condition-banner">
        <span class="condition-text">DEAD OR ALIVE</span>
        <span class="condition-dutch">LEVEND OF DOOD • GRAND LINE</span>
      </div>

      <!-- Pirate Name -->
      <div class="name-section">
        <div v-if="!isCustomizing" class="name-display" @click="interactive ? isCustomizing = true : null">
          <h2 class="pirate-name">{{ profile.pirateName }}</h2>
          <span v-if="interactive" class="edit-hint" title="Klik om naam te wijzigen">✏️</span>
        </div>
        <div v-else class="name-edit-form">
          <input v-model="newName" class="name-input" maxlength="24" @keyup.enter="saveName" />
          <button class="save-name-btn" @click="saveName">OK</button>
        </div>
        <div class="pirate-epithet">{{ crewRank.title }}</div>
      </div>

      <!-- Bounty Counter (฿) -->
      <div class="bounty-section">
        <div class="berry-symbol">฿</div>
        <div ref="bountyRef" class="bounty-number">
          {{ calculatedBounty.toLocaleString('nl-NL') }} -
        </div>
      </div>

      <!-- Accomplishments / Crimes List -->
      <div v-if="showCrimes && !compact" class="crimes-section">
        <div class="crimes-header">BEKEND VOOR DE VOLGENDE MISDADEN:</div>
        <ul class="crimes-list">
          <li>⚓ Beheerst <strong>{{ totalKnownWords }}</strong> Nederlandse piratenwoorden</li>
          <li>⚔️ Gebruikt <strong>{{ totalGrammarMastered }}</strong> grammaticaconstructies</li>
          <li>👁️ Observatie Haki: <strong>{{ hakiLevels.observation.score }}%</strong></li>
          <li>🍇 Fruit: <strong>{{ devilFruit.stage }}</strong></li>
        </ul>
      </div>

      <!-- Marine Footer & Stamp -->
      <div class="marine-footer">
        <div class="marine-text">MARINE HOOFDKWARTIER • TAALVLOOT</div>
        <div class="marine-stamp">VERIFIED</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wanted-poster-frame {
  @include wanted-poster();
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding: 14px 12px;
  background: #ffffff;
  border: 1.5px solid rgba(2, 132, 199, 0.3);
  border-radius: $radius-anime;
  box-shadow: $shadow-anime;
  user-select: none;
  position: relative;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &.interactive:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-anime-hover;
    border-color: $anime-blue-primary;
  }

  &.compact {
    max-width: 280px;
    padding: 10px 8px;
  }
}

.card-accent {
  position: absolute;
  width: 8px;
  height: 8px;
  border-color: $anime-blue-primary;
  pointer-events: none;

  &.top-left { top: 6px; left: 6px; border-top: 2px solid; border-left: 2px solid; }
  &.top-right { top: 6px; right: 6px; border-top: 2px solid; border-right: 2px solid; }
  &.bottom-left { bottom: 6px; left: 6px; border-bottom: 2px solid; border-left: 2px solid; }
  &.bottom-right { bottom: 6px; right: 6px; border-bottom: 2px solid; border-right: 2px solid; }
}

.poster-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(2, 132, 199, 0.15);
  border-radius: calc(#{$radius-anime} - 4px);
  padding: 14px 12px 12px;
  background: $anime-white;
}

.wanted-header {
  margin-bottom: 8px;

  .wanted-sub {
    display: block;
    font-family: $font-anime-title;
    font-size: 9px;
    letter-spacing: 0.16em;
    color: $anime-blue-primary;
    font-weight: 800;
    margin-bottom: 2px;
  }

  .wanted-title {
    display: block;
    font-family: $font-anime-title;
    font-size: clamp(2rem, 5vw, 2.8rem);
    font-weight: 900;
    letter-spacing: 0.14em;
    color: $anime-navy;
    line-height: 0.95;
  }
}

.photo-area {
  width: 92%;
  background: $anime-ice;
  border: 1px solid rgba(2, 132, 199, 0.25);
  border-radius: $radius-anime-sm;
  padding: 8px;
  margin-bottom: 10px;

  .avatar-frame {
    background: #ffffff;
    border: 1px solid rgba(2, 132, 199, 0.15);
    border-radius: 6px;
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    .avatar-emoji {
      font-size: 64px;
      filter: drop-shadow(0 4px 10px rgba(2, 132, 199, 0.2));
    }

    .rank-crown {
      position: absolute;
      top: 6px;
      right: 6px;
      font-size: 20px;
      background: $anime-ice;
      padding: 2px 4px;
      border-radius: 4px;
      border: 1px solid rgba(2, 132, 199, 0.2);
    }
  }

  .photo-caption {
    margin-top: 6px;
    font-family: $font-anime-title;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: $anime-blue-deep;
    text-transform: uppercase;
  }
}

.condition-banner {
  margin-bottom: 6px;

  .condition-text {
    display: block;
    font-family: $font-anime-title;
    font-size: 13px;
    font-weight: 900;
    letter-spacing: 0.18em;
    color: $anime-navy;
    line-height: 1;
  }

  .condition-dutch {
    font-size: 9px;
    letter-spacing: 0.1em;
    color: $ink-muted;
    font-weight: 600;
  }
}

.name-section {
  width: 100%;
  margin-bottom: 8px;

  .name-display {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;

    &:hover .edit-hint {
      opacity: 1;
    }
  }

  .pirate-name {
    font-family: $font-anime-title;
    font-size: clamp(1.2rem, 3vw, 1.6rem);
    font-weight: 900;
    color: $anime-navy;
    letter-spacing: 0.06em;
    margin: 0;
    text-transform: uppercase;
    line-height: 1.1;
  }

  .edit-hint {
    font-size: 13px;
    opacity: 0.4;
    transition: opacity 0.2s;
  }

  .name-edit-form {
    display: flex;
    gap: 4px;
    justify-content: center;
  }

  .name-input {
    font-family: $font-anime-title;
    font-size: 14px;
    font-weight: 700;
    padding: 4px 8px;
    border: 1px solid $anime-blue-primary;
    border-radius: 4px;
    background: #ffffff;
    text-align: center;
    text-transform: uppercase;
  }

  .save-name-btn {
    background: $anime-blue-primary;
    color: white;
    border: 0;
    border-radius: 4px;
    padding: 4px 10px;
    font-weight: 700;
    cursor: pointer;
  }

  .pirate-epithet {
    font-family: $font-anime-title;
    font-size: 11px;
    font-weight: 700;
    color: $anime-blue-deep;
    margin-top: 2px;
  }
}

.bounty-section {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 6px;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(245, 158, 11, 0.16) 100%);
  border: 1px solid rgba(245, 158, 11, 0.35);
  border-radius: $radius-anime-sm;
  width: 95%;
  padding: 6px 10px;
  margin-bottom: 10px;

  .berry-symbol {
    font-family: $font-anime-title;
    font-size: 20px;
    font-weight: 900;
    color: $bounty-gold-dark;
  }

  .bounty-number {
    font-family: $font-anime-title;
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    font-weight: 900;
    color: $bounty-gold-dark;
    letter-spacing: 0.04em;
    font-variant-numeric: tabular-nums;
  }
}

.crimes-section {
  width: 95%;
  text-align: left;
  border-top: 1px dashed rgba(2, 132, 199, 0.2);
  padding-top: 8px;
  margin-bottom: 10px;

  .crimes-header {
    font-family: $font-anime-title;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: $anime-blue-deep;
    margin-bottom: 4px;
  }

  .crimes-list {
    list-style: none;
    padding: 0;
    margin: 0;
    font-family: $font-body;
    font-size: 12px;
    color: $ink-dark;
    line-height: 1.5;

    li {
      margin-bottom: 3px;
    }
  }
}

.marine-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  border-top: 1px solid #e2e8f0;
  padding-top: 6px;

  .marine-text {
    font-family: $font-anime-title;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: $ink-muted;
  }

  .marine-stamp {
    font-family: $font-anime-title;
    font-size: 8px;
    font-weight: 900;
    color: $anime-blue-deep;
    border: 1px solid $anime-blue-deep;
    padding: 1px 4px;
    border-radius: 2px;
    letter-spacing: 0.05em;
  }
}
</style>
