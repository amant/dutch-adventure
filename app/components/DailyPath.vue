<script setup lang="ts">
import { useLearnerMemory } from '~/composables/useLearnerMemory'

const { memory, getFrontierConcepts } = useLearnerMemory()

const steps = computed(() => {
  const items: { id: string, label: string, description: string, action: string, actionLabel: string, status: 'pending' | 'completed' }[] = []

  // 1. Activation (Frontier)
  const frontier = getFrontierConcepts(1)
  if (frontier.length > 0) {
    items.push({
      id: 'activation',
      label: 'Activate Frontier',
      description: `Spontaneously use "${frontier[0]}" in a sentence to move it towards mastery.`,
      action: `/smart-review?mode=activation&target=${frontier[0]}`,
      actionLabel: 'Activate now',
      status: 'pending'
    })
  }

  // 2. Maintenance (Weak spots)
  const weak = [...Object.entries(memory.value.vocabulary), ...Object.entries(memory.value.grammar)]
    .filter(([_, s]) => s.encounters > 0 && (s.successes / s.encounters < 0.7))
    .sort((a, b) => (a[1].successes / a[1].encounters) - (b[1].successes / b[1].encounters))[0]

  if (weak) {
    items.push({
      id: 'maintenance',
      label: 'Fix Weak Spot',
      description: `You've struggled with "${weak[0].replace(/-/g, ' ')}". Let's reinforce it.`,
      action: `/smart-review?mode=speed&target=${weak[0]}`,
      actionLabel: 'Reinforce',
      status: 'pending'
    })
  }

  // 3. Fluency (Speed)
  items.push({
    id: 'fluency',
    label: 'Daily Speed Drill',
    description: 'Boost your retrieval speed with a high-pressure session.',
    action: '/smart-review?mode=speed',
    actionLabel: 'Start Drill',
    status: 'pending'
  })

  // 4. Authentic (Reading)
  items.push({
    id: 'authentic',
    label: 'Real-world Dutch',
    description: 'Read an authentic article or use the Custom Reader to see Dutch in context.',
    action: '/reader',
    actionLabel: 'Open Reader',
    status: 'pending'
  })

  return items.slice(0, 4)
})
</script>

<template>
  <div class="daily-path card">
    <div class="header">
      <div class="eyebrow">Today's Recommended Path</div>
      <h3>Your Dutch Daily Routine</h3>
      <p class="muted">A personalized 10-minute loop designed to turn what you know into language you can use.</p>
    </div>

    <div class="steps-grid">
      <div v-for="(step, idx) in steps" :key="step.id" class="step-item">
        <div class="step-number">{{ idx + 1 }}</div>
        <div class="step-content">
          <div class="step-label">{{ step.label }}</div>
          <p class="step-desc">{{ step.description }}</p>
          <NuxtLink :to="step.action" class="button secondary small">{{ step.actionLabel }}</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.daily-path {
  padding: 32px;
  background: #fdfcf7;
  border: 1px solid #f9e8b9;
}

.header {
  margin-bottom: 32px;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.step-item {
  display: flex;
  gap: 16px;
}

.step-number {
  width: 28px;
  height: 28px;
  background: #176b5b;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.step-label {
  font-weight: 700;
  font-size: 15px;
  color: #1e293b;
}

.step-desc {
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 12px;
  flex: 1;
}

.button.small {
  padding: 6px 12px;
  font-size: 12px;
  align-self: flex-start;
}
</style>
