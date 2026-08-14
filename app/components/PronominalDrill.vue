<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Exercise, Feedback } from '~/types/learning'

const props = defineProps<{
  exercise: Exercise
  feedback?: Feedback
}>()

const emit = defineEmits(['submit', 'next'])

const baseWord = ref<string | null>(null)
const selectedPreposition = ref(false)

const result = computed(() => {
  if (!baseWord.value) return ''
  if (!selectedPreposition.value) return baseWord.value
  
  const prep = props.exercise.pronominalData?.preposition || ''
  
  // Rules for Dutch pronominal adverbs:
  // 1. met -> mee
  // 2. tot -> toe
  // 3. naar -> naartoe (sometimes, but usually just naar)
  // 4. spelling: if prep starts with vowel, maybe 'er' + prep is fine, but some have changes.
  
  let adjustedPrep = prep
  if (prep === 'met') adjustedPrep = 'mee'
  if (prep === 'tot') adjustedPrep = 'toe'
  
  return baseWord.value + adjustedPrep
})

function handleSubmit() {
  if (!result.value) return
  emit('submit', result.value)
}

function reset() {
  baseWord.value = null
  selectedPreposition.value = false
}
</script>

<template>
  <div class="pronominal-drill">
    <div class="card drill-card">
      <div class="header">
        <div class="eyebrow">B1/B2 Logical Connection</div>
        <div class="badge">Pronominal Adverbs</div>
      </div>

      <div class="instruction">
        <h3>{{ exercise.prompt }}</h3>
        <p class="muted">Replace the direct object construction with a combined pronominal adverb.</p>
      </div>

      <div class="sentence-box mt-6">
        <div class="blunt-label">Original Sentence:</div>
        <p class="sentence">
          {{ exercise.pronominalData?.sentence }}
        </p>
        <div class="target-highlight mt-2">
          Focus: <span>{{ exercise.pronominalData?.preposition }} {{ exercise.pronominalData?.object }}</span>
        </div>
      </div>

      <div class="merger-interface mt-8">
        <div class="merger-grid">
          <div class="merger-column">
            <span class="column-label">Select Reference</span>
            <div class="choice-group">
              <button 
                v-for="b in ['er', 'hier', 'daar', 'waar']" 
                :key="b"
                class="choice-btn"
                :class="{ 'active': baseWord === b }"
                :disabled="!!feedback"
                @click="baseWord = b"
              >
                {{ b }}
              </button>
            </div>
            <p class="choice-hint">{{ baseWord === 'er' ? 'Unspecified/Weak' : baseWord === 'hier' ? 'Close to speaker' : baseWord === 'daar' ? 'Further away' : baseWord === 'waar' ? 'Relative/Question' : '' }}</p>
          </div>
          
          <div class="plus">+</div>

          <div class="merger-column">
            <span class="column-label">Preposition</span>
            <button 
              class="choice-btn prep-btn"
              :class="{ 'active': selectedPreposition }"
              :disabled="!!feedback"
              @click="selectedPreposition = !selectedPreposition"
            >
              {{ exercise.pronominalData?.preposition }}
            </button>
            <p v-if="selectedPreposition && (exercise.pronominalData?.preposition === 'met' || exercise.pronominalData?.preposition === 'tot')" class="choice-hint shift">
              Form shifts to <b>{{ exercise.pronominalData?.preposition === 'met' ? 'mee' : 'toe' }}</b>
            </p>
          </div>
        </div>

        <div class="result-preview mt-8">
          <span class="column-label">Resulting Adverb:</span>
          <div class="result-box" :class="{ 'empty': !result, 'submitted': !!feedback }">
            {{ result || '???' }}
          </div>
        </div>
      </div>

      <div v-if="!feedback" class="actions mt-8">
        <button 
          class="button primary full-width" 
          :disabled="!baseWord || !selectedPreposition"
          @click="handleSubmit"
        >
          Check Combination
        </button>
      </div>
    </div>

    <div v-if="feedback" class="feedback-section mt-6">
      <div class="card feedback-card" :class="feedback.outcome">
        <div class="outcome-header">
          <span class="outcome-badge">{{ feedback.outcome }}</span>
          <span class="score-badge">+{{ feedback.changeModifier }} mastery</span>
        </div>
        
        <p class="feedback-message">{{ feedback.message }}</p>

        <div v-if="feedback.explanation || exercise.explanation" class="explanation-box mt-4">
          <div class="eyebrow">Grammar Assistant:</div>
          <p>{{ feedback.explanation || exercise.explanation }}</p>
        </div>

        <button class="button primary mt-6" @click="$emit('next')">Next Exercise</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pronominal-drill { max-width: 600px; margin: 0 auto; }
.drill-card { padding: 32px; border-top: 6px solid #d06b3c; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.badge { background: #fef1e8; color: #d06b3c; font-size: 10px; padding: 2px 8px; border-radius: 99px; font-weight: 800; text-transform: uppercase; }

.instruction h3 { margin-bottom: 4px; color: #1e293b; }
.muted { color: #64748b; font-size: 14px; }

.sentence-box { background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; }
.blunt-label { font-size: 11px; color: #94a3b8; font-weight: 700; text-transform: uppercase; margin-bottom: 8px; }
.sentence { font-size: 18px; color: #334155; line-height: 1.5; }
.target-highlight { font-size: 13px; color: #64748b; }
.target-highlight span { color: #d06b3c; font-weight: 700; text-decoration: underline; }

.merger-grid { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.merger-column { flex: 1; display: flex; flex-direction: column; gap: 8px; min-height: 140px; }
.column-label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
.choice-group { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.choice-btn {
  padding: 10px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  font-size: 15px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
}
.choice-btn:hover:not(:disabled) { border-color: #d06b3c; color: #d06b3c; }
.choice-btn.active { background: #d06b3c; border-color: #d06b3c; color: white; }

.prep-btn { height: 100%; display: flex; align-items: center; justify-content: center; font-size: 18px; }

.plus { font-size: 24px; font-weight: 300; color: #cbd5e1; margin-top: -20px; }

.choice-hint { font-size: 12px; color: #64748b; font-style: italic; margin-top: 4px; }
.choice-hint.shift b { color: #d06b3c; }

.result-preview { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.result-box {
  width: 100%;
  padding: 20px;
  background: #f1f5f9;
  border-radius: 12px;
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  border: 2px dashed #cbd5e1;
  transition: all 0.3s;
}
.result-box.empty { color: #94a3b8; }
.result-box:not(.empty) { border-style: solid; border-color: #d06b3c; background: #fff7ed; color: #d06b3c; }
.result-box.submitted { background: #f8fafc; border-color: #e2e8f0; color: #1e293b; }

.feedback-card { padding: 24px; border-left: 6px solid #cbd5e1; }
.feedback-card.correct { border-left-color: #176b5b; }
.feedback-card.retry { border-left-color: #ef4444; }

.outcome-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.score-badge { font-size: 12px; font-weight: 700; color: #176b5b; }

.explanation-box { background: #fef1e8; padding: 16px; border-radius: 12px; border: 1px solid #fde6d2; }
.explanation-box p { font-size: 14px; color: #9a3412; margin-top: 4px; line-height: 1.5; }

.full-width { width: 100%; }
.mt-2 { margin-top: 8px; }
.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
.mt-8 { margin-top: 32px; }
</style>
