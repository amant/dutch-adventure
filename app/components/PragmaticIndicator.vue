<script setup lang="ts">
defineProps<{
  score: number
  feedback?: string
}>()
</script>

<template>
  <div class="pragmatic-card card">
    <div class="header">
      <span class="tag">Pragmatic Competence</span>
      <span class="score">{{ score }}% Natural</span>
    </div>
    
    <div class="gauge-container">
      <div class="gauge-track">
        <div class="gauge-fill" :style="{ width: `${score}%`, background: score > 80 ? '#176b5b' : score > 60 ? '#d06b3c' : '#e53e3e' }"></div>
      </div>
      <div class="labels">
        <span>Stiff</span>
        <span>Natural</span>
        <span>Native</span>
      </div>
    </div>

    <p v-if="feedback" class="feedback-text">{{ feedback }}</p>
  </div>
</template>

<style scoped>
.pragmatic-card {
  margin: 20px 0;
  padding: 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  text-align: left;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.tag {
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
}

.score {
  font-weight: 700;
  color: #176b5b;
}

.gauge-container {
  margin: 12px 0;
}

.gauge-track {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.gauge-fill {
  height: 100%;
  transition: width 0.5s ease-out;
}

.labels {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #94a3b8;
  margin-top: 4px;
}

.feedback-text {
  font-size: 14px;
  color: #475569;
  margin: 8px 0 0 !important;
  font-style: italic;
}
</style>
