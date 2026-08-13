<script setup lang="ts">
import { useLearnerMemory } from '~/composables/useLearnerMemory'
import { evaluateResponse } from '~/utils/evaluateResponse'
import type { Redline, Exercise, Feedback } from '~/types/learning'

const { memory, hydrate, record } = useLearnerMemory()
onMounted(hydrate)

const activeRedline = ref<Redline | null>(null)
const response = ref('')
const feedback = ref<Feedback | null>(null)

const recentRedlines = computed(() => memory.value.recentRedlines || [])

function startRetry(redline: Redline) {
  activeRedline.value = redline
  response.value = ''
  feedback.value = null
}

function submitRetry() {
  if (!activeRedline.value) return
  
  // Create a temporary exercise from the redline
  const tempExercise: Exercise = {
    id: `retry-${activeRedline.value.id}`,
    kind: 'typed',
    prompt: activeRedline.value.prompt,
    target: activeRedline.value.naturalCorrection,
    skills: ['production', 'automaticity'],
    vocabulary: activeRedline.value.vocabulary,
    grammar: activeRedline.value.grammar
  }
  
  const result = evaluateResponse(tempExercise, response.value)
  feedback.value = result
  
  // Record progress
  record(
    result.skills,
    result.outcome,
    result.vocabulary,
    result.grammar,
    result.changeModifier,
    response.value,
    activeRedline.value.prompt,
    result
  )
}

function closeRetry() {
  activeRedline.value = null
  response.value = ''
  feedback.value = null
}
</script>

<template>
  <div class="corrections-page">
    <div class="hero">
      <div class="eyebrow">The Feedback Loop</div>
      <h1>Correction Hub</h1>
      <p class="muted">Review and re-try sentences where you received a "Teacher's Redline". This is where passive correction becomes active learning.</p>
    </div>

    <div v-if="activeRedline" class="retry-overlay">
      <div class="card retry-card">
        <button class="close-btn" @click="closeRetry">×</button>
        <div class="eyebrow">Re-try Challenge</div>
        <h2>{{ activeRedline.prompt }}</h2>
        
        <div v-if="!feedback" class="previous-attempt">
          <div class="label">Your previous attempt:</div>
          <div class="text stiff">{{ activeRedline.userAnswer }}</div>
        </div>

        <div class="input-area">
          <textarea 
            v-model="response" 
            placeholder="Try saying it more naturally this time..."
            :disabled="!!feedback"
            class="retry-input"
          ></textarea>
          
          <div v-if="!feedback" class="actions">
            <button class="button" @click="submitRetry" :disabled="!response">Check Naturalness</button>
          </div>
        </div>

        <div v-if="feedback" class="feedback-box" :class="feedback.outcome">
          <p>{{ feedback.message }}</p>
          <div v-if="feedback.teacherCorrection || feedback.correction" class="natural-example">
            <div class="label">Natural Dutch:</div>
            <div class="text">{{ feedback.teacherCorrection?.natural || feedback.correction }}</div>
          </div>
          <button class="button secondary mt-4" @click="closeRetry">Done with this one</button>
        </div>
      </div>
    </div>

    <div v-if="recentRedlines.length > 0" class="redlines-list">
      <div v-for="redline in recentRedlines" :key="redline.id" class="card redline-item">
        <div class="redline-meta">
          <span class="date">{{ new Date(redline.date).toLocaleDateString() }}</span>
          <div class="tags">
            <span v-for="v in redline.vocabulary" :key="v" class="tag vocabulary">{{ v }}</span>
            <span v-for="g in redline.grammar" :key="g" class="tag grammar">{{ g }}</span>
          </div>
        </div>
        
        <h3>{{ redline.prompt }}</h3>
        
        <div class="diff-view">
          <div class="version">
            <span class="v-label">You said:</span>
            <span class="v-text error">{{ redline.userAnswer }}</span>
          </div>
          <div class="version">
            <span class="v-label">Teacher:</span>
            <span class="v-text success">{{ redline.naturalCorrection }}</span>
          </div>
        </div>

        <p class="explanation">{{ redline.explanation }}</p>
        
        <button class="button secondary full-width" @click="startRetry(redline)">Try again</button>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>No redlines yet! Keep practicing to get personalized feedback.</p>
      <NuxtLink to="/" class="button">Go to Chapters</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.corrections-page { padding-bottom: 60px; }
.hero { margin-bottom: 40px; }

.redlines-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(450px, 1fr)); gap: 24px; }
.redline-item { display: flex; flex-direction: column; gap: 16px; border-left: 6px solid #ef4444; }

.redline-meta { display: flex; justify-content: space-between; align-items: center; }
.date { font-size: 12px; color: #8a9a94; }
.tags { display: flex; gap: 6px; }
.tag { font-size: 10px; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; font-weight: 700; }
.tag.vocabulary { background: #e8f3ec; color: #176b5b; }
.tag.grammar { background: #fef1e8; color: #d06b3c; }

.diff-view { background: #f8faf9; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.version { display: flex; flex-direction: column; gap: 4px; }
.v-label { font-size: 11px; font-weight: 700; color: #8a9a94; text-transform: uppercase; }
.v-text { font-size: 15px; font-weight: 500; }
.v-text.error { color: #ef4444; text-decoration: line-through; opacity: 0.8; }
.v-text.success { color: #176b5b; }

.explanation { font-size: 14px; color: #687873; font-style: italic; }
.full-width { width: 100%; margin-top: auto; }

.retry-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(32, 48, 45, 0.9);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000; padding: 20px;
}
.retry-card { max-width: 600px; width: 100%; position: relative; }
.close-btn { position: absolute; top: 20px; right: 20px; border: 0; background: none; font-size: 24px; cursor: pointer; color: #8a9a94; }

.previous-attempt { margin-bottom: 20px; padding: 12px; background: #fff5f5; border-radius: 8px; }
.previous-attempt .label { font-size: 11px; font-weight: 700; color: #c53030; text-transform: uppercase; }
.previous-attempt .text { font-size: 16px; color: #c53030; }

.retry-input {
  width: 100%; min-height: 100px; padding: 16px;
  border: 2px solid #cad6ce; border-radius: 12px;
  font-size: 18px; font-family: inherit; margin-bottom: 12px;
}
.retry-input:focus { outline: none; border-color: #176b5b; }

.feedback-box { padding: 20px; border-radius: 12px; margin-top: 10px; }
.feedback-box.correct { background: #f0f7f4; color: #176b5b; border: 1px solid #176b5b; }
.feedback-box.acceptable { background: #fffbeb; color: #92400e; border: 1px solid #f59e0b; }
.feedback-box.retry { background: #fef2f2; color: #991b1b; border: 1px solid #ef4444; }

.natural-example { margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(0,0,0,0.05); }
.natural-example .label { font-size: 11px; font-weight: 700; text-transform: uppercase; opacity: 0.7; }
.natural-example .text { font-size: 18px; font-weight: 600; }

.mt-4 { margin-top: 16px; }

.empty-state { text-align: center; padding: 60px 20px; }
</style>
