<script setup lang="ts">
defineProps<{
  frontier: { key: string, kind: string, passive: number, active: number }[]
}>()

const emit = defineEmits(['activate'])
</script>

<template>
  <div class="frontier-card card">
    <div class="header">
      <div class="eyebrow gold">FRONTIER ACTIVATION LAB</div>
      <h2>Turn Recognition into Battle Reflexes</h2>
      <p class="muted">You recognize these concepts, but haven't unleashed them in active speech yet. Time to awaken them!</p>
    </div>
    
    <div class="frontier-list">
      <div v-for="item in frontier" :key="item.key" class="frontier-item">
        <div class="info">
          <span class="kind-badge" :class="item.kind">{{ item.kind }}</span>
          <span class="key-name">{{ item.key }}</span>
          <span class="gap-text">Gap: {{ Math.round(item.passive - item.active) }}%</span>
        </div>
        <div class="gap-meter">
          <div class="bar passive" :style="{ width: `${item.passive}%` }" title="Passive Recognition"></div>
          <div class="bar active" :style="{ width: `${item.active}%` }" title="Active Production"></div>
        </div>
      </div>
    </div>

    <button v-if="frontier.length > 0" class="button gold full-width" @click="emit('activate')">
      <span>⚡ Launch Activation Mission</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.frontier-card {
  background: linear-gradient(135deg, $white-pure 0%, $parchment-bg 100%);
  border: 2px solid $gold-bright;
  border-radius: $radius-xl;
  padding: 36px;
  box-shadow: $shadow-card;
}

.header {
  margin-bottom: 24px;

  h2 {
    margin: 8px 0;
    font-size: 28px;
    color: $ocean-deepest;
  }
}

.frontier-list {
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.frontier-item {
  background: $white-pure;
  border: 1px solid $parchment-border;
  border-radius: $radius-md;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.kind-badge {
  font-family: $font-anime;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: $radius-xs;
  letter-spacing: 0.05em;

  &.vocabulary {
    background: $ocean-light;
    color: $ocean-dark;
  }

  &.grammar {
    background: $parchment-border;
    color: $gold-dark;
  }
}

.key-name {
  font-family: $font-anime;
  font-weight: 800;
  font-size: 16px;
  color: $ocean-deepest;
}

.gap-text {
  margin-left: auto;
  font-size: 12px;
  font-weight: 700;
  color: $gold-deep;
  font-family: $font-anime;
}

.gap-meter {
  position: relative;
  height: 12px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
}

.bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 999px;
  transition: width 0.4s ease;

  &.passive {
    background: linear-gradient(90deg, #93c5fd 0%, #38bdf8 100%);
    opacity: 0.7;
  }

  &.active {
    background: linear-gradient(90deg, $gold-parchment 0%, $gold-bright 100%);
    box-shadow: 0 0 8px rgba(245, 158, 11, 0.5);
  }
}

.full-width {
  width: 100%;
}

@media (max-width: $bp-mobile) {
  .frontier-card {
    padding: 22px 16px;
  }
}
</style>
