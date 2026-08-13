<script setup lang="ts">
import { chapters } from '~/data/chapters'
import { useLearnerMemory } from '~/composables/useLearnerMemory'

const { memory, hydrate, getFrontierConcepts } = useLearnerMemory()
onMounted(hydrate)

const frontier = computed(() => getFrontierConcepts(3))

const weakAreas = computed(() => {
  const items: { label: string, type: 'vocabulary' | 'grammar', score: number, priority: number }[] = []
  
  const process = (dict: Record<string, any>, type: 'vocabulary' | 'grammar') => {
    Object.entries(dict).forEach(([label, state]) => {
      const avg = (state.production + state.automaticity + state.speaking) / 3
      // Success rate: if they fail often relative to encounters, priority increases
      const successRate = state.encounters > 0 ? state.successes / state.encounters : 1
      const priority = (100 - avg) * (2 - successRate)
      
      if (state.encounters > 0 && avg < 80) {
        items.push({ 
          label: type === 'grammar' ? label.replace(/-/g, ' ') : label, 
          type, 
          score: Math.round(avg),
          priority
        })
      }
    })
  }
  
  process(memory.value.vocabulary, 'vocabulary')
  process(memory.value.grammar, 'grammar')
  
  return items.sort((a, b) => b.priority - a.priority).slice(0, 3)
})

const bottlenecks = computed(() => {
  const items: { label: string, status: 'red' | 'orange' | 'green', text: string, action: string, actionLabel: string }[] = []
  
  // 1. Retrieval Speed
  const all = [...Object.values(memory.value.vocabulary), ...Object.values(memory.value.grammar)]
  const speeds = all.flatMap(v => v.responseTimes || [])
  const avgSpeed = speeds.length > 0 ? speeds.reduce((a, b) => a + b, 0) / speeds.length : 0
  
  if (avgSpeed > 4) {
    items.push({ 
      label: 'Retrieval Speed', 
      status: avgSpeed > 7 ? 'red' : 'orange', 
      text: `Your average response time is ${avgSpeed.toFixed(1)}s. You're thinking too much!`,
      action: '/smart-review?mode=speed',
      actionLabel: 'Start Speed Drills'
    })
  }

  // 2. Frontier (Recognized but not produced)
  const frontier = getFrontierConcepts(5)
  if (frontier.length > 3) {
    items.push({
      label: 'Knowledge Gap',
      status: 'orange',
      text: `You recognize ${frontier.length} concepts but haven't used them in conversation yet.`,
      action: '/smart-review?mode=activation',
      actionLabel: 'Activate Concepts'
    })
  }

  // 3. Specific Weak Grammar (e.g. word order)
  const wordOrder = memory.value.grammar['word-order']
  if (wordOrder && (wordOrder.production < 60 || wordOrder.successes / wordOrder.encounters < 0.6)) {
    items.push({
      label: 'Word Order',
      status: 'red',
      text: 'You struggle with Dutch inversion and sentence structure.',
      action: '/chapter/opinions-en-redenen',
      actionLabel: 'Review Word Order'
    })
  }

  return items.slice(0, 3)
})
</script>
<template>
  <section class="home">
    <div class="hero">
      <div class="eyebrow">Dutch you can use</div>
      <h2>Use Language as you learn and explore!</h2>
      <p class="muted intro">Short, purposeful practice: notice a pattern, retrieve it, change it, and make it yours.</p>
    </div>

    <div v-if="bottlenecks.length > 0" class="bottlenecks-section">
      <div class="eyebrow">Actionable Bottlenecks</div>
      <div class="bottlenecks-grid">
        <div v-for="b in bottlenecks" :key="b.label" class="card bottleneck-card">
          <div class="b-meta">
            <span class="status-dot" :class="b.status"></span>
            <span class="b-label">{{ b.label }}</span>
          </div>
          <p class="b-text">{{ b.text }}</p>
          <NuxtLink :to="b.action" class="button secondary small">{{ b.actionLabel }}</NuxtLink>
        </div>
      </div>
    </div>

    <div class="capability-map-section">
      <CapabilityMap />
    </div>

    <div v-if="frontier.length > 0" class="frontier-section">
      <FrontierCard :frontier="frontier" @activate="navigateTo({ path: '/smart-review', query: { mode: 'activation' } })" />
    </div>

    <div class="card sandbox-cta">
      <div class="cta-content">
        <div class="eyebrow">Personalized Practice</div>
        <h3>Got a specific situation in mind?</h3>
        <p class="muted">Use the Sandbox to design a mission for a real-world scenario you're facing. We'll weave in your target vocabulary.</p>
        <NuxtLink to="/sandbox" class="button">Go to Scenario Sandbox</NuxtLink>
      </div>
    </div>
  </section>
</template>
<style scoped>
.home { padding: 45px 0; }
.hero { margin-bottom: 50px; }
.frontier-section { margin-bottom: 40px; }
.intro { font-size: 19px; max-width: 550px; margin-top: 14px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 24px; }
.chapter-card { display: flex; flex-direction: column; }
.chapter-card h2 { margin: 14px 0 10px; }
.chapter-card p { flex: 1; margin-bottom: 16px; }
.meta { color: #687873; font-size: 14px; margin-bottom: 22px; }

.bottlenecks-section { margin-bottom: 50px; }
.bottlenecks-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 16px; }
.bottleneck-card { padding: 24px; display: flex; flex-direction: column; gap: 12px; }
.b-meta { display: flex; align-items: center; gap: 10px; }
.status-dot { width: 8px; height: 8px; border-radius: 50%; }
.status-dot.red { background: #ef4444; box-shadow: 0 0 8px rgba(239, 68, 68, 0.4); }
.status-dot.orange { background: #f59e0b; box-shadow: 0 0 8px rgba(245, 158, 11, 0.4); }
.b-label { font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; }
.b-text { font-size: 15px; color: #334155; line-height: 1.5; flex: 1; }
.button.small { padding: 8px 16px; font-size: 13px; align-self: flex-start; }

.sandbox-cta { background: #176b5b; color: white; margin-bottom: 40px; padding: 32px; border: 0; }
.sandbox-cta .eyebrow { color: #88c7ba; }
.sandbox-cta .muted { color: #c2d6d1; margin: 8px 0 24px; font-size: 16px; }
.sandbox-cta .button { background: white; color: #176b5b; }
.sandbox-cta .button:hover { background: #e8f3ec; }

.review-card { background: #fffcf4; border: 1px solid #f9e8b9; margin-bottom: 40px; }
.review-card.delayed { background: #f0f7ff; border-color: #cce3ff; }
.review-card.delayed .type-tag.vocabulary { background: #dbeafe; color: #1e40af; }
.review-card h3 { margin: 12px 0 18px; }
.weak-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px; }
.weak-item { display: flex; align-items: center; gap: 12px; font-size: 15px; }
.type-tag { font-size: 10px; text-transform: uppercase; padding: 2px 6px; border-radius: 4px; font-weight: 700; letter-spacing: 0.05em; }
.type-tag.vocabulary { background: #e8f3ec; color: #176b5b; }
.type-tag.grammar { background: #fef1e8; color: #d06b3c; }
.weak-item .label { font-weight: 600; flex: 1; }
.weak-item .score { color: #8a9a94; font-size: 13px; }
</style>
