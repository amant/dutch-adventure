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

const staleItems = computed(() => {
  const items: { label: string, type: 'vocabulary' | 'grammar', lastSeen: string }[] = []
  const now = new Date()
  
  const process = (dict: Record<string, any>, type: 'vocabulary' | 'grammar') => {
    Object.entries(dict).forEach(([label, state]) => {
      if (!state.lastEncountered) return
      const last = new Date(state.lastEncountered)
      const hoursSince = (now.getTime() - last.getTime()) / (1000 * 60 * 60)
      
      // Items seen more than 24 hours ago OR just high priority items to review
      if (hoursSince > 24 || (state.encounters > 0 && state.successes / state.encounters < 0.7)) {
        items.push({ 
          label: type === 'grammar' ? label.replace(/-/g, ' ') : label, 
          type, 
          lastSeen: state.lastEncountered 
        })
      }
    })
  }
  
  process(memory.value.vocabulary, 'vocabulary')
  process(memory.value.grammar, 'grammar')
  
  return items.sort((a, b) => new Date(a.lastSeen).getTime() - new Date(b.lastSeen).getTime()).slice(0, 3)
})
</script>
<template>
  <section class="home">
    <div class="hero">
      <div class="eyebrow">Dutch you can use</div>
      <h1>Turn what you know into language you can actually use.</h1>
      <p class="muted intro">Short, purposeful practice: notice a pattern, retrieve it, change it, and make it yours.</p>
    </div>

    <div v-if="staleItems.length > 0" class="card review-card delayed">
      <div class="eyebrow">Delayed Retrieval</div>
      <h3>Time to reactivate these:</h3>
      <div class="weak-list">
        <div v-for="item in staleItems" :key="item.label" class="weak-item">
          <span class="type-tag" :class="item.type">{{ item.type }}</span>
          <span class="label">{{ item.label }}</span>
          <span class="score">Last seen {{ new Date(item.lastSeen).toLocaleDateString() }}</span>
        </div>
      </div>
      <NuxtLink to="/smart-review" class="button secondary">Reactivate with Smart Review</NuxtLink>
    </div>

    <div class="capability-map-section">
      <CapabilityMap />
    </div>

    <div v-if="frontier.length > 0" class="frontier-section">
      <FrontierCard :frontier="frontier" @activate="navigateTo({ path: '/smart-review', query: { mode: 'activation' } })" />
    </div>

    <div v-if="weakAreas.length > 0" class="card review-card">
      <div class="eyebrow">Recommended Review</div>
      <h3>Strengthen these weak spots:</h3>
      <div class="weak-list">
        <div v-for="item in weakAreas" :key="item.label" class="weak-item">
          <span class="type-tag" :class="item.type">{{ item.type }}</span>
          <span class="label">{{ item.label }}</span>
          <span class="score">{{ item.score }}% mastery</span>
        </div>
      </div>
      <NuxtLink to="/smart-review" class="button">Start Smart Review</NuxtLink>
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