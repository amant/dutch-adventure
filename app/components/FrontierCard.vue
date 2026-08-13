<script setup lang="ts">
defineProps<{
  frontier: { key: string, kind: string, passive: number, active: number }[]
}>()

const emit = defineEmits(['activate'])
</script>

<template>
  <div class="frontier-card card">
    <div class="eyebrow">The Learning Frontier</div>
    <h2>Turn passive into active</h2>
    <p class="muted">You recognize these concepts, but haven't used them in conversation yet. Ready to activate them?</p>
    
    <div class="frontier-list">
      <div v-for="item in frontier" :key="item.key" class="frontier-item">
        <div class="info">
          <span class="kind">{{ item.kind }}</span>
          <span class="key">{{ item.key }}</span>
        </div>
        <div class="gap-visualization">
          <div class="bar passive" :style="{ width: `${item.passive}%` }"></div>
          <div class="bar active" :style="{ width: `${item.active}%` }"></div>
          <span class="label">Gap: {{ Math.round(item.passive - item.active) }}%</span>
        </div>
      </div>
    </div>

    <button v-if="frontier.length > 0" class="button" @click="emit('activate')">
      Start Activation Session
    </button>
  </div>
</template>

<style scoped>
.frontier-card {
  background: linear-gradient(135deg, #ffffff 0%, #f0f7f4 100%);
  border: 2px solid #176b5b;
}

.frontier-list {
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.frontier-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.kind {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: #176b5b;
  background: #e0ebe5;
  padding: 2px 6px;
  border-radius: 4px;
}

.key {
  font-weight: 600;
  color: #20302d;
}

.gap-visualization {
  position: relative;
  height: 12px;
  background: #e1e5de;
  border-radius: 6px;
  overflow: hidden;
}

.bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 6px;
}

.bar.passive {
  background: #176b5b;
  opacity: 0.2;
}

.bar.active {
  background: #176b5b;
}

.label {
  position: absolute;
  right: 8px;
  top: -1px;
  font-size: 9px;
  font-weight: 700;
  color: #176b5b;
}

.button {
  width: 100%;
  text-align: center;
}
</style>
