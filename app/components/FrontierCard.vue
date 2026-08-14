<script setup lang="ts">
defineProps<{
  frontier: { key: string, kind: string, passive: number, active: number }[]
}>()

const emit = defineEmits(['activate'])
</script>

<template>
  <div class="frontier-card card anime-card">
    <div class="card-top">
      <span class="eyebrow">PASSIEVE NAAR ACTIEVE KENNIS // フロンティア</span>
      <ComicSoundBadge text="FRONTIER! ⚡" variant="gold" size="sm" />
    </div>
    <h2 class="frontier-title">Activeer Je Verborgen Kennis</h2>
    <p class="muted">Je herkent deze concepten wel bij het lezen, maar hebt ze nog niet spontaan gebruikt in spraak. Tijd om ze te activeren!</p>
    
    <div class="frontier-list">
      <div v-for="item in frontier" :key="item.key" class="frontier-item anime-card">
        <div class="info">
          <span class="kind-tag">{{ item.kind }}</span>
          <span class="key-label">{{ item.key }}</span>
        </div>
        <div class="gap-visualization">
          <div class="bar passive" :style="{ width: `${item.passive}%` }"></div>
          <div class="bar active" :style="{ width: `${item.active}%` }"></div>
          <span class="gap-label">Kloof: {{ Math.round(item.passive - item.active) }}%</span>
        </div>
      </div>
    </div>

    <button v-if="frontier.length > 0" class="anime-btn gold lg full-width" @click="emit('activate')">
      <span>START ACTIVATIE SESSIE ⚡</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.frontier-card {
  background: #ffffff;
  border: 1px solid rgba(2, 132, 199, 0.2);
  border-radius: $radius-anime;
  box-shadow: $shadow-anime;
  padding: 24px;
  margin: 24px 0;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.frontier-title {
  font-size: 1.8rem;
  color: $anime-navy;
  margin: 6px 0 8px;
}

.frontier-list {
  margin: 20px 0 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.frontier-item {
  background: #ffffff;
  border: 1px solid rgba(2, 132, 199, 0.2);
  border-radius: $radius-anime-sm;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info {
  display: flex;
  align-items: center;
  gap: 10px;

  .kind-tag {
    font-family: $font-anime-title;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: white;
    background: $anime-blue-primary;
    padding: 2px 6px;
    border-radius: 4px;
  }

  .key-label {
    font-weight: 700;
    font-size: 14px;
    color: $anime-navy;
  }
}

.gap-visualization {
  position: relative;
  height: 10px;
  background: #f1f5f9;
  border-radius: 5px;
  overflow: hidden;

  .bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 4px;

    &.passive {
      background: $bounty-gold;
      opacity: 0.35;
    }

    &.active {
      background: $anime-blue-primary;
    }
  }

  .gap-label {
    position: absolute;
    right: 6px;
    top: -1px;
    font-size: 9px;
    font-weight: 800;
    color: $ink-dark;
  }
}

.full-width {
  width: 100%;
  text-align: center;
  justify-content: center;
}
</style>
