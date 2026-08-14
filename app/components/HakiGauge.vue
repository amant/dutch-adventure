<script setup lang="ts">
import { usePirateGamification } from '~/composables/usePirateGamification'

const { hakiLevels, devilFruit, hydrateProfile } = usePirateGamification()

onMounted(hydrateProfile)
</script>

<template>
  <div class="haki-matrix-card card">
    <div class="matrix-header">
      <div class="header-left">
        <span class="eyebrow">HAKI MATRIX & DEVIL FRUIT // 覇気マトリックス</span>
        <h2 class="matrix-title">De Drie Haki Vormen</h2>
        <p class="muted">Versterk je geest, grammatica en automatische spreekvaardigheid om de Grand Line te domineren!</p>
      </div>
      <div class="devil-fruit-tag">
        <span class="fruit-icon">🍇</span>
        <div class="fruit-info">
          <span class="fruit-name">{{ devilFruit.name }}</span>
          <span class="fruit-stage">{{ devilFruit.stage }} ({{ devilFruit.masteryPercent }}%)</span>
        </div>
      </div>
    </div>

    <!-- 3 Haki Spheres Grid -->
    <div class="haki-spheres-grid">
      <!-- Observation Haki -->
      <div class="haki-card observation anime-card-interactive">
        <div class="haki-badge-top">
          <span class="haki-icon">👁️</span>
          <span class="haki-type">OBSERVATIE HAKI // 見聞色</span>
        </div>
        <h3 class="haki-title">Kenbunshoku</h3>
        <p class="haki-desc">{{ hakiLevels.observation.description }}</p>

        <div class="power-meter">
          <div class="meter-info">
            <span>Luisteren & Herkennen</span>
            <span class="meter-score">{{ hakiLevels.observation.score }}%</span>
          </div>
          <div class="meter-track">
            <div class="meter-fill green" :style="{ width: `${hakiLevels.observation.score}%` }"></div>
          </div>
        </div>
      </div>

      <!-- Armament Haki -->
      <div class="haki-card armament anime-card-interactive">
        <div class="haki-badge-top">
          <span class="haki-icon">🛡️</span>
          <span class="haki-type">WAPENS HAKI // 武装色</span>
        </div>
        <h3 class="haki-title">Busoshoku</h3>
        <p class="haki-desc">{{ hakiLevels.armament.description }}</p>

        <div class="power-meter">
          <div class="meter-info">
            <span>Grammatica & Productie</span>
            <span class="meter-score">{{ hakiLevels.armament.score }}%</span>
          </div>
          <div class="meter-track">
            <div class="meter-fill red" :style="{ width: `${hakiLevels.armament.score}%` }"></div>
          </div>
        </div>
      </div>

      <!-- Conqueror's Haki -->
      <div class="haki-card conqueror anime-card-interactive">
        <div class="haki-badge-top">
          <span class="haki-icon">⚡</span>
          <span class="haki-type">VEROVERAARS HAKI // 覇王色</span>
        </div>
        <h3 class="haki-title">Haoshoku</h3>
        <p class="haki-desc">{{ hakiLevels.conqueror.description }}</p>

        <div class="power-meter">
          <div class="meter-info">
            <span>Automatisch & Vloeiend</span>
            <span class="meter-score">{{ hakiLevels.conqueror.score }}%</span>
          </div>
          <div class="meter-track">
            <div class="meter-fill purple" :style="{ width: `${hakiLevels.conqueror.score}%` }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.haki-matrix-card {
  background: #ffffff;
  border: 1px solid rgba(2, 132, 199, 0.2);
  border-radius: $radius-anime;
  box-shadow: $shadow-anime;
  padding: 24px;
  margin: 24px 0;
}

.matrix-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 16px;
  margin-bottom: 20px;

  .matrix-title {
    margin: 4px 0 6px;
    font-size: 1.8rem;
    color: $anime-navy;
  }
}

.devil-fruit-tag {
  display: flex;
  align-items: center;
  gap: 10px;
  background: $anime-ice;
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: $radius-anime-sm;
  padding: 8px 14px;
  color: $anime-navy;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.1);

  .fruit-icon {
    font-size: 24px;
  }

  .fruit-info {
    display: flex;
    flex-direction: column;

    .fruit-name {
      font-family: $font-anime-title;
      font-size: 13px;
      font-weight: 800;
      color: $haki-violet;
    }

    .fruit-stage {
      font-size: 11px;
      color: $ink-muted;
      font-weight: 600;
    }
  }
}

.haki-spheres-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.haki-card {
  background: #ffffff;
  border: 1px solid rgba(2, 132, 199, 0.2);
  border-radius: $radius-anime-sm;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05);
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(2, 132, 199, 0.12);
  }

  &.observation {
    border-top: 3px solid $berry-green;
  }

  &.armament {
    border-top: 3px solid $battle-red;
  }

  &.conqueror {
    border-top: 3px solid $haki-violet;
  }

  .haki-badge-top {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: $font-anime-title;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.06em;
    color: $ink-muted;
    margin-bottom: 4px;
  }

  .haki-title {
    font-size: 1.3rem;
    margin: 0 0 6px;
    color: $anime-navy;
  }

  .haki-desc {
    font-size: 12px;
    color: $ink-muted;
    line-height: 1.4;
    margin: 0 0 16px;
    flex: 1;
  }
}

.power-meter {
  .meter-info {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    font-weight: 700;
    color: $ink-dark;
    margin-bottom: 4px;

    .meter-score {
      font-family: $font-anime-title;
      font-size: 12px;
      font-weight: 800;
      color: $anime-blue-deep;
    }
  }

  .meter-track {
    height: 8px;
    background: #f1f5f9;
    border-radius: 4px;
    overflow: hidden;

    .meter-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.4s ease;

      &.green { background: linear-gradient(90deg, #10b981 0%, #06b6d4 100%); }
      &.red { background: linear-gradient(90deg, #ef4444 0%, #f59e0b 100%); }
      &.purple { background: linear-gradient(90deg, #8b5cf6 0%, #38bdf8 100%); }
    }
  }
}

@media (max-width: 900px) {
  .haki-spheres-grid {
    grid-template-columns: 1fr;
  }
  .matrix-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
