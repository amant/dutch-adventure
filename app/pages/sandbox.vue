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
      <div class="eyebrow">Design your own mission</div>
      <h1>Scenario Sandbox</h1>
      <p class="muted">Tell the AI where you are and what you're trying to achieve. We'll weave in the Dutch concepts you're currently learning to make the practice relevant to <i>your</i> life.</p>
    </div>

    <div class="sandbox-grid">
      <div class="card design-card">
        <h3>What's the situation?</h3>
        <p class="small muted">Enter a specific scenario or goal. For example: "I am at a tech conference and I want to explain my app."</p>
        
        <div class="input-group">
          <textarea 
            v-model="scenario" 
            placeholder="E.g. I'm at the market and I want to buy organic vegetables..."
            class="scenario-input"
          ></textarea>
          <button class="button full-width" @click="startMission()" :disabled="!scenario">Generate Custom Mission</button>
        </div>

        <div class="suggestions">
          <h4>Or try a suggestion:</h4>
          <div class="suggestion-list">
            <button 
              v-for="s in suggestions" 
              :key="s" 
              class="suggestion-btn"
              @click="startMission(s)"
            >
              {{ s }}
            </button>
          </div>
        </div>
      </div>

      <div class="card frontier-card">
        <h3>Target Concepts</h3>
        <p class="small muted">These concepts from your "Learning Frontier" will be prioritized in your mission:</p>
        
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

<style scoped>
.hero { margin-bottom: 40px; }
.sandbox-grid { display: grid; grid-template-columns: 1fr 350px; gap: 24px; align-items: start; }

.design-card { display: flex; flex-direction: column; gap: 16px; }
.scenario-input {
  width: 100%; min-height: 120px; padding: 16px;
  border: 2px solid #cad6ce; border-radius: 12px;
  font-size: 16px; font-family: inherit; margin-bottom: 12px; resize: vertical;
}
.scenario-input:focus { outline: none; border-color: #176b5b; }

.suggestions { margin-top: 20px; }
.suggestions h4 { font-size: 14px; text-transform: uppercase; color: #8a9a94; margin-bottom: 12px; }
.suggestion-list { display: flex; flex-direction: column; gap: 8px; }
.suggestion-btn {
  text-align: left; background: #f8faf9; border: 1px solid #e1e8e4;
  padding: 12px 16px; border-radius: 8px; font-size: 14px; cursor: pointer;
  transition: all 0.2s;
}
.suggestion-btn:hover { background: #e8f3ec; border-color: #176b5b; color: #176b5b; }

.concept-list { display: flex; flex-direction: column; gap: 10px; margin-top: 16px; }
.concept-item { display: flex; align-items: center; gap: 12px; padding: 10px; background: white; border-radius: 8px; border: 1px solid #e1e8e4; }
.type-tag { font-size: 9px; text-transform: uppercase; padding: 2px 6px; border-radius: 4px; font-weight: 700; }
.type-tag.vocabulary { background: #e8f3ec; color: #176b5b; }
.type-tag.grammar { background: #fef1e8; color: #d06b3c; }
.concept-item .label { font-weight: 600; font-size: 14px; }

.info-box { margin-top: 24px; padding: 12px; background: #f0f7f4; border-radius: 8px; color: #176b5b; }
.mt-4 { margin-top: 16px; }
.full-width { width: 100%; }

@media (max-width: 900px) {
  .sandbox-grid { grid-template-columns: 1fr; }
}
</style>
