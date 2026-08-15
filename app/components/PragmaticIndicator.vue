<script setup lang="ts">
defineProps<{
  score: number;
  feedback?: string;
}>();
</script>

<template>
  <div class="pragmatic-card card">
    <div class="header">
      <span class="tag">Pragmatic Naturalness</span>
      <span
        class="score"
        :class="{ high: score > 80, mid: score > 60 && score <= 80, low: score <= 60 }"
      >{{ score }}% Natural</span>
    </div>

    <div class="gauge-container">
      <div class="gauge-track">
        <div
          class="gauge-fill"
          :style="{ width: `${score}%` }"
          :class="{ high: score > 80, mid: score > 60 && score <= 80, low: score <= 60 }"
        />
      </div>
      <div class="labels">
        <span>Literal</span>
        <span>Natural</span>
        <span>Native Flow</span>
      </div>
    </div>

    <p
      v-if="feedback"
      class="feedback-text"
    >
      {{ feedback }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.pragmatic-card {
  margin: 20px 0;
  padding: 18px;
  background: $ocean-ice;
  border: 1.5px solid $ocean-border;
  border-radius: $radius-md;
  text-align: left;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.tag {
  font-family: $font-anime;
  font-size: 11px;
  font-weight: 800;
  color: $ocean-dark;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.score {
  font-family: $font-anime;
  font-weight: 800;
  font-size: 14px;
  color: $ocean-primary;

  &.high { color: $sea-emerald-dark; }
  &.mid { color: $gold-deep; }
  &.low { color: $battle-red-vibrant; }
}

.gauge-container {
  margin: 12px 0;
}

.gauge-track {
  height: 8px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
}

.gauge-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.5s ease-out;

  &.high { background: linear-gradient(90deg, $sea-emerald 0%, #34d399 100%); }
  &.mid { background: linear-gradient(90deg, $gold-parchment 0%, $gold-bright 100%); }
  &.low { background: linear-gradient(90deg, $battle-red-vibrant 0%, $battle-red 100%); }
}

.labels {
  display: flex;
  justify-content: space-between;
  font-family: $font-anime;
  font-size: 10px;
  font-weight: 700;
  color: $ink-muted;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 6px;
}

.feedback-text {
  font-size: 14px;
  color: $ink-slate;
  margin: 10px 0 0 !important;
  font-style: italic;
  line-height: 1.5;
}
</style>
