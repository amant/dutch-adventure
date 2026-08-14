<script setup lang="ts">
import { usePirateGamification } from '~/composables/usePirateGamification'
import { useGsapAnimations } from '~/composables/useGsapAnimations'

const { profile, calculatedBounty, crewRank, hydrateProfile, toggleSoundEffects } = usePirateGamification()
const { animateBountyCounter } = useGsapAnimations()

const bountyDisplayRef = ref<HTMLElement | null>(null)
const prevBounty = ref(0)
const mobileMenuOpen = ref(false)

onMounted(() => {
  hydrateProfile()
  prevBounty.value = calculatedBounty.value
})

watch(calculatedBounty, (newVal, oldVal) => {
  if (newVal !== oldVal && bountyDisplayRef.value) {
    animateBountyCounter(bountyDisplayRef, oldVal || 0, newVal, 1.4)
  }
})
</script>

<template>
  <header class="pirate-hud">
    <div class="hud-container">
      <!-- Left: Pirate Jolly Roger Brand -->
      <div class="brand-area">
        <NuxtLink to="/" class="brand-link">
          <div class="jolly-roger-icon">
            <span class="skull">☠️</span>
            <span class="straw-hat">👒</span>
          </div>
          <div class="brand-text">
            <span class="sub-title">GRAND LINE // オランダ語航海</span>
            <span class="main-title">DUTCH ADVENTURE</span>
          </div>
        </NuxtLink>
      </div>

      <!-- Center: Bounty & Rank Badges -->
      <div class="pirate-status-bar">
        <!-- Bounty Badge with GSAP animation -->
        <NuxtLink to="/bounties" class="bounty-pill" title="Jouw huidige premie (Bounty)">
          <span class="bounty-label">BOUNTY</span>
          <span ref="bountyDisplayRef" class="bounty-amount">
            ฿ {{ calculatedBounty.toLocaleString('nl-NL') }}
          </span>
        </NuxtLink>

        <!-- Crew Rank Badge -->
        <NuxtLink to="/progress" class="rank-badge" :title="crewRank.sector">
          <span class="rank-icon">{{ crewRank.icon }}</span>
          <span class="rank-text">{{ crewRank.title.split('(')[0] }}</span>
          <span class="tier-tag">{{ crewRank.tier }}</span>
        </NuxtLink>

        <!-- Streak Flame -->
        <div class="streak-badge" title="Dagen achter elkaar op zee!">
          <span class="flame">🔥</span>
          <span class="streak-num">{{ profile.streakDays }}d</span>
        </div>
      </div>

      <!-- Right: Main Nav Links -->
      <nav class="hud-nav" :class="{ 'mobile-open': mobileMenuOpen }">
        <NuxtLink to="/" class="nav-item" @click="mobileMenuOpen = false">
          <span class="nav-icon">⚓</span>
          <span>Deck</span>
        </NuxtLink>
        <NuxtLink to="/map" class="nav-item" @click="mobileMenuOpen = false">
          <span class="nav-icon">🗺️</span>
          <span>Kaart</span>
        </NuxtLink>
        <NuxtLink to="/battle" class="nav-item battle-link" @click="mobileMenuOpen = false">
          <span class="nav-icon">⚔️</span>
          <span>Gevecht</span>
        </NuxtLink>
        <NuxtLink to="/bounties" class="nav-item" @click="mobileMenuOpen = false">
          <span class="nav-icon">📜</span>
          <span>Gezocht</span>
        </NuxtLink>
        <NuxtLink to="/progress" class="nav-item" @click="mobileMenuOpen = false">
          <span class="nav-icon">⚡</span>
          <span>Haki</span>
        </NuxtLink>
        <NuxtLink to="/memory" class="nav-item" @click="mobileMenuOpen = false">
          <span class="nav-icon">🧠</span>
          <span>Geheugen</span>
        </NuxtLink>
        <NuxtLink to="/vocabulary" class="nav-item" @click="mobileMenuOpen = false">
          <span class="nav-icon">💎</span>
          <span>Woorden</span>
        </NuxtLink>
        <NuxtLink to="/sandbox" class="nav-item" @click="mobileMenuOpen = false">
          <span class="nav-icon">🧭</span>
          <span>Sandbox</span>
        </NuxtLink>

        <!-- Sound FX Toggle -->
        <button 
          class="sfx-toggle" 
          :class="{ active: profile.soundEffectsEnabled }"
          @click="toggleSoundEffects"
          title="Schakel anime geluidseffecten in/uit"
        >
          <span>{{ profile.soundEffectsEnabled ? '🔊 SFX' : '🔇' }}</span>
        </button>
      </nav>

      <!-- Mobile Hamburger Button -->
      <button class="mobile-menu-btn" @click="mobileMenuOpen = !mobileMenuOpen">
        <span>{{ mobileMenuOpen ? '✖' : '☰' }}</span>
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.pirate-hud {
  background: #0b192c;
  border-bottom: 2px solid $anime-blue-primary;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.12);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 8px 0;
}

.hud-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand-area {
  display: flex;
  align-items: center;

  .brand-link {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: white;

    &:hover .jolly-roger-icon {
      transform: scale(1.06);
      box-shadow: 0 0 12px rgba(14, 165, 233, 0.4);
    }
  }

  .jolly-roger-icon {
    position: relative;
    width: 38px;
    height: 38px;
    background: #1e293b;
    border: 1.5px solid $anime-cyan;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease;

    .skull {
      font-size: 18px;
    }

    .straw-hat {
      position: absolute;
      top: -8px;
      right: -4px;
      font-size: 15px;
      transform: rotate(12deg);
    }
  }

  .brand-text {
    display: flex;
    flex-direction: column;

    .sub-title {
      font-family: $font-anime-title;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: $anime-cyan-light;
      line-height: 1;
    }

    .main-title {
      font-family: $font-anime-title;
      font-size: 18px;
      font-weight: 900;
      letter-spacing: 0.04em;
      color: #ffffff;
      line-height: 1.15;
    }
  }
}

.pirate-status-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.bounty-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(245, 158, 11, 0.4);
  border-radius: $radius-anime-sm;
  padding: 4px 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  transition: all 0.15s ease;

  &:hover {
    border-color: $bounty-gold;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25);
  }

  .bounty-label {
    font-family: $font-anime-title;
    font-size: 10px;
    font-weight: 800;
    color: #ffffff;
    background: #d97706;
    padding: 1px 4px;
    border-radius: 3px;
    letter-spacing: 0.06em;
  }

  .bounty-amount {
    font-family: $font-anime-title;
    font-size: 14px;
    font-weight: 800;
    color: #fbbf24;
    letter-spacing: 0.04em;
    font-variant-numeric: tabular-nums;
  }
}

.rank-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(14, 165, 233, 0.1);
  border: 1px solid rgba(14, 165, 233, 0.3);
  border-radius: $radius-anime-sm;
  padding: 4px 10px;
  color: #ffffff;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  transition: all 0.15s ease;

  &:hover {
    border-color: $anime-cyan;
    background: rgba(14, 165, 233, 0.2);
  }

  .rank-icon {
    font-size: 13px;
  }

  .tier-tag {
    background: $anime-blue-primary;
    color: white;
    font-family: $font-anime-title;
    font-size: 10px;
    font-weight: 800;
    padding: 1px 4px;
    border-radius: 3px;
    margin-left: 2px;
  }
}

.streak-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: $radius-anime-sm;
  padding: 4px 8px;
  color: #fca5a5;
  font-family: $font-anime-title;
  font-weight: 800;
  font-size: 12px;
}

.hud-nav {
  display: flex;
  align-items: center;
  gap: 4px;

  .nav-item {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 9px;
    color: #cbd5e1;
    text-decoration: none;
    font-family: $font-anime-title;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    border-radius: $radius-anime-sm;
    transition: all 0.15s ease;

    .nav-icon {
      font-size: 13px;
    }

    &:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.08);
      transform: translateY(-1px);
    }

    &.router-link-active {
      background: $anime-blue-primary;
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(2, 132, 199, 0.4);
    }

    &.battle-link {
      color: #fca5a5;
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.3);

      &:hover {
        background: $battle-red;
        color: white;
      }

      &.router-link-active {
        background: $battle-red;
        color: white;
      }
    }
  }

  .sfx-toggle {
    background: #1e293b;
    border: 1px solid #475569;
    color: #94a3b8;
    border-radius: $radius-anime-sm;
    padding: 4px 8px;
    font-family: $font-anime-title;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      border-color: #94a3b8;
      color: #ffffff;
    }

    &.active {
      background: rgba(14, 165, 233, 0.2);
      border-color: $anime-cyan;
      color: $anime-cyan-light;
      box-shadow: 0 0 8px rgba(6, 182, 212, 0.3);
    }
  }
}

.mobile-menu-btn {
  display: none;
  background: #1e293b;
  border: 1px solid $anime-cyan;
  color: white;
  font-size: 16px;
  padding: 5px 9px;
  border-radius: $radius-anime-sm;
  cursor: pointer;
}

@media (max-width: 1024px) {
  .pirate-status-bar {
    display: none;
  }
  .hud-nav .nav-item span:not(.nav-icon) {
    display: none;
  }
  .hud-nav .nav-item {
    padding: 6px 8px;
  }
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
  }
  .hud-nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #0b192c;
    border-bottom: 2px solid $anime-blue-primary;
    padding: 16px;
    flex-direction: column;
    gap: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);

    &.mobile-open {
      display: flex;
    }

    .nav-item {
      width: 100%;
      padding: 10px 14px;
      font-size: 14px;

      span:not(.nav-icon) {
        display: inline !important;
      }
    }
  }
}
</style>
