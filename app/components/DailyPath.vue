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
      label: 'Activeren Passieve Kennis',
      description: `Gebruik "${frontier[0].key}" spontaan in een zin om het naar meesterschap te tillen.`,
      action: `/smart-review?mode=activation&target=${frontier[0].key}`,
      actionLabel: 'Activeer nu ⚡',
      status: 'pending',
      icon: '💎'
    })
  }

  // 2. Maintenance (Weak spots)
  const weak = [...Object.entries(memory.value.vocabulary || {}), ...Object.entries(memory.value.grammar || {})]
    .filter(([_, s]) => s.encounters > 0 && (s.successes / s.encounters < 0.7))
    .sort((a, b) => (a[1].successes / a[1].encounters) - (b[1].successes / b[1].encounters))[0]

  if (weak) {
    items.push({
      id: 'maintenance',
      label: 'Herstel Zwakke Plek',
      description: `Je worstelde eerder met "${weak[0].replace(/-/g, ' ')}". Tijd voor een versterking!`,
      action: `/smart-review?mode=speed&target=${weak[0]}`,
      actionLabel: 'Versterk 🛡️',
      status: 'pending',
      icon: '⚓'
    })
  }

  // 3. Fluency (Speed)
  items.push({
    id: 'fluency',
    label: 'Dagelijkse Snelheidsdrill',
    description: 'Verhoog je reactiesnelheid onder hoge druk op de woeste zee.',
    action: '/smart-review?mode=speed',
    actionLabel: 'Start Drill ⏱️',
    status: 'pending',
    icon: '⚔️'
  })

  // 4. Authentic (Reading)
  items.push({
    id: 'authentic',
    label: 'Echt Nederlands in Context',
    description: 'Lees een authentiek artikel en spot de geleerde structuren in het wild.',
    action: '/reader',
    actionLabel: 'Open Reader 📖',
    status: 'pending',
    icon: '📜'
  })

  return items.slice(0, 4)
})
</script>

<template>
  <div class="daily-path card anime-card">
    <div class="header">
      <div class="header-top">
        <span class="eyebrow">DAILY SAILING // デイリールート</span>
        <ComicSoundBadge text="DAILY ROUTINE ⛵" variant="gold" size="sm" />
      </div>
      <h3 class="daily-title">Jouw 10-Minuten Piratenroutine</h3>
      <p class="muted">Een gepersonaliseerde 4-stappen routine om wat je weet om te zetten in taal die je echt kunt gebruiken.</p>
    </div>

    <div class="steps-grid">
      <div v-for="(step, idx) in steps" :key="step.id" class="step-card anime-card-interactive">
        <div class="step-badge-row">
          <div class="step-number">{{ idx + 1 }}</div>
          <span class="step-icon">{{ step.icon }}</span>
        </div>
        <div class="step-content">
          <div class="step-label">{{ step.label }}</div>
          <p class="step-desc">{{ step.description }}</p>
          <NuxtLink :to="step.action" class="anime-btn gold sm">{{ step.actionLabel }}</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.daily-path {
  padding: 24px;
  background: #ffffff;
  border: 1px solid rgba(2, 132, 199, 0.2);
  border-radius: $radius-anime;
  box-shadow: $shadow-anime;
  margin: 24px 0;
}

.header {
  margin-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 14px;

  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .daily-title {
    font-size: 1.8rem;
    color: $anime-navy;
    margin: 6px 0 4px;
  }
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.step-card {
  background: #ffffff;
  border: 1px solid rgba(2, 132, 199, 0.2);
  border-radius: $radius-anime-sm;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  padding: 16px;
  display: flex;
  flex-direction: column;

  .step-badge-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .step-number {
    width: 28px;
    height: 28px;
    background: $anime-blue-primary;
    color: white;
    font-family: $font-anime-title;
    font-size: 14px;
    font-weight: 800;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
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
    font-family: $font-anime-title;
    font-size: 14px;
    font-weight: 800;
    color: $anime-navy;
    margin-bottom: 6px;
  }

  .step-desc {
    font-size: 12px;
    color: $ink-muted;
    line-height: 1.4;
    margin-bottom: 16px;
    flex: 1;
  }
}
</style>
