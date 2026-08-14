<script setup lang="ts">
import { useLearnerMemory } from '~/composables/useLearnerMemory'

const { memory, getFrontierConcepts } = useLearnerMemory()

const steps = computed(() => {
  const items: { id: string, label: string, description: string, action: string, actionLabel: string, status: 'pending' | 'completed', icon: string }[] = []

  // 1. Activation (Frontier)
  const frontier = getFrontierConcepts(1)
  if (frontier.length > 0) {
    items.push({
      id: 'activation',
      label: 'Activate Frontier',
      description: `Spontaneously use "${frontier[0]}" in a sentence to move it towards mastery.`,
      action: `/smart-review?mode=activation&target=${frontier[0]}`,
      actionLabel: 'Activate now',
      status: 'pending',
      icon: '🧭'
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
      status: 'pending',
      icon: '🛡️'
    })
  }

  // 3. Fluency (Speed)
  items.push({
    id: 'fluency',
    label: 'Daily Speed Drill',
    description: 'Boost your retrieval speed with a high-pressure session.',
    action: '/smart-review?mode=speed',
    actionLabel: 'Start Drill',
    status: 'pending',
    icon: '⚡'
  })

  // 4. Authentic (Reading)
  items.push({
    id: 'authentic',
    label: 'Real-world Dutch',
    description: 'Read an authentic article or use the Custom Reader to see Dutch in context.',
    action: '/reader',
    actionLabel: 'Open Reader',
    status: 'pending',
    icon: '📜'
  })

  return items.slice(0, 4)
})
</script>

<template>
  <div class="daily-path card">
    <div class="header">
      <div class="eyebrow gold">EXPEDITION ROUTINE</div>
      <h3>Today's Recommended Voyage</h3>
      <p class="muted">A personalized 10-minute training loop designed to turn knowledge into active conversational reflexes.</p>
    </div>

    <div class="steps-grid">
      <div v-for="(step, idx) in steps" :key="step.id" class="step-card">
        <div class="step-header">
          <div class="step-badge">
            <span class="step-number">{{ idx + 1 }}</span>
          </div>
          <span class="step-icon">{{ step.icon }}</span>
        </div>
        <div class="step-content">
          <div class="step-label">{{ step.label }}</div>
          <p class="step-desc">{{ step.description }}</p>
          <NuxtLink :to="step.action" class="button secondary small">{{ step.actionLabel }}</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.daily-path {
  padding: 36px;
  background: linear-gradient(180deg, $white-pure 0%, $ocean-ice 100%);
  border: 1.5px solid $ocean-border;
  border-top: 5px solid $gold-bright;
  box-shadow: $shadow-card;
}

.header {
  margin-bottom: 28px;

  h3 {
    font-size: 26px;
    margin: 8px 0;
  }
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.step-card {
  background: $white-pure;
  border: 1px solid rgba(0, 86, 179, 0.12);
  border-radius: $radius-lg;
  padding: 22px;
  display: flex;
  flex-direction: column;
  transition: transform $transition-normal, box-shadow $transition-normal, border-color $transition-normal;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-card-hover;
    border-color: $ocean-vibrant;
  }
}

.step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.step-badge {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, $ocean-primary 0%, $ocean-vibrant 100%);
  color: $white-pure;
  border-radius: $radius-sm;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $font-anime;
  font-size: 15px;
  font-weight: 900;
  box-shadow: 0 2px 0 $ocean-dark;
}

.step-icon {
  font-size: 20px;
}

.step-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.step-label {
  font-family: $font-anime;
  font-weight: 800;
  font-size: 16px;
  color: $ocean-deepest;
  margin-bottom: 8px;
}

.step-desc {
  font-size: 14px;
  color: $ink-slate;
  line-height: 1.5;
  margin-bottom: 18px;
  flex: 1;
}

@media (max-width: $bp-mobile) {
  .daily-path {
    padding: 24px 18px;
  }
}
</style>
