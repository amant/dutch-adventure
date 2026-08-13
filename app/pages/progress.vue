<script setup lang="ts">
import { useLearnerMemory } from '~/composables/useLearnerMemory'
import type { SkillDimension } from '~/types/learning'

const { memory, hydrate, reset } = useLearnerMemory()
onMounted(hydrate)

const skillLabels: Record<SkillDimension, { label: string, desc: string }> = {
  recognition: { label: 'Reading', desc: 'Recognizing patterns in text' },
  meaning: { label: 'Meaning', desc: 'Understanding the core concept' },
  listening: { label: 'Listening', desc: 'Processing spoken Dutch' },
  production: { label: 'Writing', desc: 'Producing correct Dutch sentences' },
  speaking: { label: 'Speaking', desc: 'Spontaneous oral production' },
  automaticity: { label: 'Fluency', desc: 'Using language without thinking' }
}

const levelForScore = (score: number) => {
  if (score < 20) return 'A0'
  if (score < 40) return 'A1'
  if (score < 60) return 'A2'
  if (score < 80) return 'B1'
  return 'B2'
}

const bottlenecks = computed(() => {
  return Object.entries(memory.value.overall)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 3)
    .filter(([, score]) => score < 90)
    .map(([id, score]) => ({
      id: id as SkillDimension,
      label: skillLabels[id as SkillDimension].label,
      score
    }))
})

const overallLevel = computed(() => {
  const avg = Object.values(memory.value.overall).reduce((a, b) => a + b, 0) / 6
  return levelForScore(avg)
})
</script>

<template>
  <section class="progress-view">
    <div class="eyebrow">Your Dutch level</div>
    <h1>{{ overallLevel }} candidate</h1>
    <p class="muted">Based on your practice across all capabilities.</p>

    <div class="card skill-table">
      <div v-for="(info, id) in skillLabels" :key="id" class="skill-row">
        <div class="skill-info">
          <strong>{{ info.label }}</strong>
          <span class="muted">{{ info.desc }}</span>
        </div>
        <div class="skill-meter">
          <div class="meter"><div :style="{ width: `${memory.overall[id]}%` }" /></div>
        </div>
        <div class="skill-level">
          {{ levelForScore(memory.overall[id]) }}
        </div>
      </div>
    </div>

    <div v-if="bottlenecks.length > 0" class="bottlenecks">
      <h2>Your biggest bottlenecks</h2>
      <div class="grid">
        <div v-for="b in bottlenecks" :key="b.id" class="card bottleneck-card">
          <div class="tag">Low {{ b.id }}</div>
          <h3>{{ b.label }}</h3>
          <p v-if="b.id === 'automaticity'" class="muted">You know the rules but need more timed practice to use them naturally.</p>
          <p v-else-if="b.id === 'production'" class="muted">You understand Dutch well, but struggle to produce it yourself from scratch.</p>
          <p v-else class="muted">Focusing on more {{ b.label.toLowerCase() }} exercises will help you reach the next level.</p>
        </div>
      </div>
    </div>

    <div class="actions">
      <button class="button secondary" @click="reset">Reset all progress</button>
    </div>
  </section>
</template>

<style scoped>
.skill-table { margin: 32px 0; padding: 12px 28px; }
.skill-row { display: flex; align-items: center; padding: 20px 0; border-bottom: 1px solid #f0f2ef; }
.skill-row:last-child { border-bottom: 0; }
.skill-info { flex: 1; display: flex; flex-direction: column; }
.skill-meter { flex: 1; padding: 0 40px; }
.skill-level { width: 40px; font-weight: 700; text-align: right; color: #176b5b; }
.meter { height: 8px; background: #e2e9e3; border-radius: 4px; overflow: hidden; }
.meter div { height: 100%; background: #176b5b; transition: width 0.6s ease; }

.bottlenecks { margin-top: 60px; }
.bottleneck-card { border-left: 4px solid #d06b3c; }
.tag { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #d06b3c; margin-bottom: 8px; }
.bottleneck-card h3 { margin: 0 0 12px; }

.actions { margin-top: 40px; }

@media (max-width: 768px) {
  .skill-row { flex-wrap: wrap; }
  .skill-meter { flex: 1 1 100%; padding: 15px 0 0; order: 3; }
}
</style>