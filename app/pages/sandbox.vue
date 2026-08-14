<script setup lang="ts">
import { useLearnerMemory } from '~/composables/useLearnerMemory'

const { getFrontierConcepts, hydrate } = useLearnerMemory()
onMounted(hydrate)

const scenario = ref('')
const frontier = computed(() => getFrontierConcepts(5))

const suggestions = [
  'Ordering a special cake at the bakery',
  'Explaining a project delay to a colleague',
  'Negotiating a lower price for a used bike',
  'Describing your symptoms to a pharmacist',
  'Asking a neighbor for help with a package'
]

function startMission(customScenario?: string) {
  const finalScenario = customScenario || scenario.value
  if (!finalScenario) return
  
  navigateTo({
    path: '/smart-review',
    query: {
      mode: 'sandbox',
      scenario: finalScenario
    }
  })
}
</script>

<template>
  <div class="sandbox-page">
    <div class="hero">
      <div class="eyebrow gold">CUSTOM VOYAGE GENERATOR</div>
      <h1>Scenario Sandbox</h1>
      <p class="muted">Tell the AI where you are and what mission you're trying to achieve. We'll weave in the Dutch concepts from your learning log to make real-world practice relevant to <i>your</i> life.</p>
    </div>

    <div class="sandbox-grid">
      <div class="card design-card">
        <h3>What's your mission scenario?</h3>
        <p class="small muted">Enter a specific real-world scenario or goal. For example: "I am at a tech conference in Amsterdam and I want to explain my app."</p>
        
        <div class="input-group">
          <textarea 
            v-model="scenario" 
            placeholder="E.g. I'm at the street market and I want to buy fresh vegetables..."
            class="scenario-input"
          ></textarea>
          <button class="button gold full-width" @click="startMission()" :disabled="!scenario">
            <span>⚡ Generate Custom Mission</span>
          </button>
        </div>

        <div class="suggestions">
          <h4>Or select an authentic expedition prompt:</h4>
          <div class="suggestion-list">
            <button 
              v-for="s in suggestions" 
              :key="s" 
              class="suggestion-btn"
              @click="startMission(s)"
            >
              <span>⛵ {{ s }}</span>
            </button>
          </div>
        </div>
      </div>

      <div class="card frontier-card">
        <h3>Target Concepts</h3>
        <p class="small muted">These concepts from your "Learning Frontier" will be actively prioritized during this mission:</p>
        
        <div v-if="frontier.length > 0" class="concept-list">
          <div v-for="f in frontier" :key="f.key" class="concept-item">
            <span class="type-tag" :class="f.kind">{{ f.kind }}</span>
            <span class="label">{{ f.key }}</span>
          </div>
        </div>
        <p v-else class="small muted mt-4">Keep practicing to identify your frontier concepts!</p>
        
        <div class="info-box">
          <p class="small"><b>Why these?</b> These are concepts you recognize but haven't used spontaneously yet. The sandbox forces you to activate them.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  margin-bottom: 40px;
}

.sandbox-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 28px;
  align-items: start;
}

.design-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  border: 1.5px solid $ocean-border;
  border-radius: $radius-xl;
  background: $white-pure;
}

.scenario-input {
  width: 100%;
  min-height: 120px;
  padding: 16px;
  border: 1.5px solid #cbd5e1;
  border-radius: $radius-md;
  font-size: 15px;
  font-family: inherit;
  margin-bottom: 16px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: $ocean-vibrant;
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.18);
  }
}

.suggestions {
  margin-top: 24px;

  h4 {
    font-family: $font-anime;
    font-size: 12px;
    text-transform: uppercase;
    color: $ocean-dark;
    letter-spacing: 0.08em;
    margin-bottom: 12px;
  }
}

.suggestion-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.suggestion-btn {
  text-align: left;
  background: $ocean-ice;
  border: 1px solid $ocean-border;
  padding: 12px 16px;
  border-radius: $radius-md;
  font-size: 14px;
  font-weight: 600;
  color: $ink-navy;
  cursor: pointer;
  transition: all $transition-fast;

  &:hover {
    background: $white-pure;
    border-color: $ocean-primary;
    color: $ocean-primary;
    transform: translateX(4px);
  }
}

.frontier-card {
  padding: 28px;
  border: 1.5px solid $gold-bright;
  border-top: 5px solid $gold-parchment;
  border-radius: $radius-xl;
  background: $white-pure;
}

.concept-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
}

.concept-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: $ocean-ice;
  border-radius: $radius-sm;
  border: 1px solid $ocean-border;

  .label {
    font-weight: 700;
    font-size: 14px;
    color: $ocean-deepest;
  }
}

.type-tag {
  font-family: $font-anime;
  font-size: 9px;
  text-transform: uppercase;
  padding: 2px 6px;
  border-radius: $radius-xs;
  font-weight: 800;

  &.vocabulary {
    background: $ocean-light;
    color: $ocean-dark;
  }

  &.grammar {
    background: $parchment-border;
    color: $gold-dark;
  }
}

.info-box {
  margin-top: 24px;
  padding: 14px;
  background: $ocean-ice;
  border-radius: $radius-md;
  color: $ocean-dark;
  border: 1px solid $ocean-border;
}

.mt-4 { margin-top: 16px; }
.full-width { width: 100%; }

@media (max-width: 900px) {
  .sandbox-grid {
    grid-template-columns: 1fr;
  }
}
</style>
