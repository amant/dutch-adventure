<script setup lang="ts">
import { useLearnerMemory } from '~/composables/useLearnerMemory'
import type { ConceptState, Exercise } from '~/types/learning'

const { memory, hydrate } = useLearnerMemory()
onMounted(hydrate)

const now = new Date()

const decayingConcepts = computed(() => {
  const items: { label: string, type: 'vocabulary' | 'grammar' | 'idiom', state: ConceptState, daysSince: number }[] = []
  
  const process = (dict: Record<string, ConceptState>, type: 'vocabulary' | 'grammar' | 'idiom') => {
    Object.entries(dict).forEach(([label, state]) => {
      if (!state.lastEncountered) return
      const last = new Date(state.lastEncountered)
      const diffDays = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
      
      if (diffDays >= 1) {
        items.push({ label, type, state, daysSince: Math.floor(diffDays) })
      }
    })
  }
  
  process(memory.value.vocabulary, 'vocabulary')
  process(memory.value.grammar, 'grammar')
  process(memory.value.idioms, 'idiom')
  
  return items.sort((a, b) => b.daysSince - a.daysSince)
})

const stage6Candidates = computed(() => {
  const candidates: { concept: string, type: string, prompt: string, expected: string, date: string, daysAgo: number }[] = []
  
  const process = (dict: Record<string, ConceptState>, type: string) => {
    Object.entries(dict).forEach(([label, state]) => {
      if (!state.usageHistory) return
      state.usageHistory.forEach(usage => {
        if (!usage.prompt) return
        const date = new Date(usage.date)
        const diffDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
        
        // Target: 2-5 days ago for optimal "Delayed Retrieval"
        if (diffDays >= 2 && diffDays <= 7) {
          candidates.push({
            concept: label,
            type,
            prompt: usage.prompt,
            expected: usage.snippet,
            date: usage.date,
            daysAgo: Math.floor(diffDays)
          })
        }
      })
    })
  }
  
  process(memory.value.vocabulary, 'vocabulary')
  process(memory.value.grammar, 'grammar')
  
  return candidates.sort((a, b) => Math.abs(3 - a.daysAgo) - Math.abs(3 - b.daysAgo)) // Prioritize ~3 days ago
})

const startStage6 = (candidate: typeof stage6Candidates.value[0]) => {
  // Create a custom exercise from the candidate
  const exercise: Exercise = {
    id: `stage6-${candidate.concept}-${Date.now()}`,
    kind: 'conversation',
    prompt: candidate.prompt,
    acceptedAnswers: [candidate.expected],
    skills: ['production', 'automaticity'],
    vocabulary: candidate.type === 'vocabulary' ? [candidate.concept] : [],
    grammar: candidate.type === 'grammar' ? [candidate.concept] : [],
    explanation: `This is something you said ${candidate.daysAgo} days ago. Can you produce it again?`
  }
  
  // Store in session and navigate
  if (import.meta.client) {
    sessionStorage.setItem('custom-review-exercise', JSON.stringify(exercise))
    navigateTo({ path: '/smart-review', query: { mode: 'custom' } })
  }
}
</script>

<template>
  <section class="memory-lab">
    <div class="eyebrow gold">MEMORY LABORATORY</div>
    <h1>Delayed Retrieval & Decay Watch</h1>
    <p class="muted">Stage 6: Reactivate concepts through delayed retrieval to forge unbreakable long-term conversational reflexes.</p>

    <div class="grid">
      <!-- Stage 6: Delayed Retrieval -->
      <div class="card stage6-section">
        <div class="eyebrow gold">STAGE 6</div>
        <h3>Delayed Retrieval</h3>
        <p class="card-intro">These are personal expressions you produced a few days ago on previous voyages. Can you still retrieve them spontaneously without hints?</p>
        
        <div v-if="stage6Candidates.length > 0" class="candidate-list">
          <div v-for="c in stage6Candidates.slice(0, 5)" :key="c.date" class="candidate-item" @click="startStage6(c)">
            <div class="c-meta">
              <span class="days-badge">{{ c.daysAgo }} days ago</span>
              <span class="concept-tag">{{ c.concept }}</span>
            </div>
            <div class="c-prompt">"{{ c.prompt }}"</div>
            <div class="c-action"><span>⚡ Reactivate Spontaneously →</span></div>
          </div>
        </div>
        <div v-else class="empty-well">
          <p>No concepts ready for Stage 6 retrieval yet. Keep using Dutch in chapter missions to build your voyage history!</p>
        </div>
      </div>

      <!-- Memory Decay Watch -->
      <div class="card decay-section">
        <div class="eyebrow red">TACTICAL RADAR</div>
        <h3>Memory Decay Watch</h3>
        <p class="card-intro">Concepts you haven't reinforced recently. Re-drill them before they slip from active memory.</p>
        
        <div v-if="decayingConcepts.length > 0" class="decay-list">
          <div v-for="item in decayingConcepts.slice(0, 8)" :key="item.label" class="decay-item">
            <div class="decay-info">
              <span class="label">{{ item.label }}</span>
              <span class="type">{{ item.type }}</span>
            </div>
            <div class="decay-meta">
              <span class="days">{{ item.daysSince }}d since last use</span>
              <div class="mini-bar">
                <div 
                  class="mini-progress" 
                  :style="{ 
                    width: `${item.state.automaticity}%`, 
                    background: item.daysSince > 7 ? '#ef4444' : '#0066cc' 
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="empty-well">
          <p>Your memory is in peak shape! All concepts have been practiced recently.</p>
        </div>
        <NuxtLink to="/smart-review" class="button secondary full-width">
          <span>⚡ Full Refresh Session</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.memory-lab {
  padding-bottom: 60px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-top: 32px;
}

.stage6-section {
  border: 1.5px solid $gold-bright;
  border-top: 5px solid $gold-parchment;
  background: linear-gradient(180deg, $white-pure 0%, $parchment-bg 100%);
  border-radius: $radius-xl;
  padding: 32px;
}

.decay-section {
  border: 1.5px solid $ocean-border;
  border-top: 5px solid $battle-red-vibrant;
  background: $white-pure;
  border-radius: $radius-xl;
  padding: 32px;
}

.card-intro {
  font-size: 15px;
  color: $ink-slate;
  margin-bottom: 24px;
}

.candidate-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.candidate-item { 
  background: $white-pure; 
  border: 1.5px solid $parchment-border; 
  padding: 18px; 
  border-radius: $radius-md; 
  cursor: pointer;
  box-shadow: $shadow-sm;
  transition: all $transition-normal;

  &:hover {
    transform: translateY(-2px);
    border-color: $gold-deep;
    box-shadow: $shadow-card;
  }
}

.c-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.days-badge {
  font-family: $font-anime;
  font-size: 10px;
  background: $ocean-light;
  color: $ocean-dark;
  padding: 2px 8px;
  border-radius: $radius-xs;
  font-weight: 800;
}

.concept-tag {
  font-family: $font-anime;
  font-size: 12px;
  font-weight: 800;
  color: $gold-deep;
}

.c-prompt {
  font-size: 16px;
  font-weight: 600;
  color: $ocean-deepest;
  line-height: 1.4;
}

.c-action {
  margin-top: 12px;
  font-family: $font-anime;
  font-size: 13px;
  font-weight: 800;
  color: $ocean-primary;
  text-align: right;
}

.decay-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 24px;
}

.decay-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid $ocean-ice;
}

.decay-info {
  display: flex;
  flex-direction: column;

  .label {
    font-weight: 700;
    font-size: 15px;
    color: $ocean-deepest;
  }

  .type {
    font-family: $font-anime;
    font-size: 10px;
    text-transform: uppercase;
    color: $ink-muted;
    letter-spacing: 0.05em;
    font-weight: 700;
  }
}

.decay-meta {
  text-align: right;
  width: 160px;

  .days {
    font-family: $font-anime;
    font-size: 12px;
    color: $battle-red-vibrant;
    font-weight: 700;
  }
}

.mini-bar {
  height: 6px;
  background: #e2e8f0;
  border-radius: 999px;
  margin-top: 6px;
  overflow: hidden;
}

.mini-progress {
  height: 100%;
  border-radius: 999px;
  transition: width 0.3s ease;
}

.empty-well {
  padding: 40px;
  text-align: center;
  background: $ocean-ice;
  border: 1.5px dashed $ocean-border;
  border-radius: $radius-lg;
  color: $ink-muted;
  font-style: italic;
  font-size: 14px;
}

.full-width {
  width: 100%;
  text-align: center;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
