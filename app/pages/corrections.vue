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
    undefined,
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
      <div class="eyebrow red">REDLINE TACTICAL LOG</div>
      <h1>Teacher's Redlines & Corrections</h1>
      <p class="muted">Review and re-engage sentences where you received a "Teacher's Redline". This is where passive correction becomes active conversational reflex.</p>
    </div>

    <!-- Active Re-try Modal Overlay -->
    <div v-if="activeRedline" class="retry-overlay">
      <div class="card retry-card">
        <button class="close-btn" @click="closeRetry" aria-label="Close">×</button>
        <div class="eyebrow gold">BATTLE RETRY CHALLENGE</div>
        <h2>{{ activeRedline.prompt }}</h2>
        
        <div v-if="!feedback" class="previous-attempt">
          <div class="label">Your previous attempt:</div>
          <div class="text stiff">{{ activeRedline.userAnswer }}</div>
        </div>

        <div class="input-area">
          <textarea 
            v-model="response" 
            placeholder="Try saying it more naturally with authentic Dutch flow..."
            :disabled="!!feedback"
            class="retry-input"
          ></textarea>
          
          <div v-if="!feedback" class="actions">
            <button class="button gold" @click="submitRetry" :disabled="!response">
              <span>⚔️ Check Naturalness</span>
            </button>
          </div>
        </div>

        <div v-if="feedback" class="feedback-box" :class="feedback.outcome">
          <p class="outcome-message">{{ feedback.message }}</p>
          <div v-if="feedback.teacherCorrection || feedback.correction" class="natural-example">
            <div class="label">Authentic Native Dutch:</div>
            <div class="text">{{ feedback.teacherCorrection?.natural || feedback.correction }}</div>
          </div>
          <button class="button secondary mt-4" @click="closeRetry">Done with this mission</button>
        </div>
      </div>
    </div>

    <!-- List of Recent Redlines -->
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
            <span class="v-label">Stiff / Literal:</span>
            <span class="v-text error">{{ redline.userAnswer }}</span>
          </div>
          <div class="version">
            <span class="v-label">Authentic Dutch:</span>
            <span class="v-text success">{{ redline.naturalCorrection }}</span>
          </div>
        </div>

        <p class="explanation">{{ redline.explanation }}</p>
        
        <button class="button secondary full-width" @click="startRetry(redline)">
          <span>⚡ Try Re-producing</span>
        </button>
      </div>
    </div>

    <div v-else class="empty-state card">
      <div class="empty-icon">🎯</div>
      <h3>No Redlines Logged Yet!</h3>
      <p class="muted">Keep practicing in chapter missions and drills to unlock personalized feedback and teacher corrections.</p>
      <NuxtLink to="/" class="button gold"><span>⚔️ Explore Chapters</span></NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.corrections-page {
  padding-bottom: 60px;
}

.hero {
  margin-bottom: 40px;
}

.redlines-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
  gap: 24px;
}

.redline-item {
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-left: 5px solid $battle-red-vibrant;
  border-radius: $radius-xl;
  padding: 26px;
  background: $white-pure;
  box-shadow: $shadow-card;

  h3 {
    margin: 0;
    font-size: 19px;
    color: $ocean-deepest;
  }
}

.redline-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date {
  font-family: $font-anime;
  font-size: 11px;
  font-weight: 700;
  color: $ink-muted;
}

.tags {
  display: flex;
  gap: 6px;
}

.tag {
  font-family: $font-anime;
  font-size: 10px;
  text-transform: uppercase;
  padding: 2px 8px;
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

.diff-view {
  background: $ocean-ice;
  border: 1px solid $ocean-border;
  border-radius: $radius-md;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.version {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.v-label {
  font-family: $font-anime;
  font-size: 10px;
  font-weight: 800;
  color: $ink-muted;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.v-text {
  font-size: 15px;
  font-weight: 600;

  &.error {
    color: $battle-red-vibrant;
    text-decoration: line-through;
    opacity: 0.85;
  }

  &.success {
    color: $sea-emerald-dark;
  }
}

.explanation {
  font-size: 14px;
  color: $ink-slate;
  font-style: italic;
  margin: 0;
}

.full-width {
  width: 100%;
  margin-top: auto;
}

.retry-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(7, 19, 38, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.retry-card {
  max-width: 620px;
  width: 100%;
  position: relative;
  background: $white-pure;
  border: 2px solid $ocean-border;
  border-radius: $radius-xl;
  padding: 36px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);

  h2 {
    margin: 8px 0 20px;
    font-size: 26px;
    color: $ocean-deepest;
  }
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  border: 0;
  background: none;
  font-size: 28px;
  cursor: pointer;
  color: $ink-muted;
  transition: color $transition-fast;

  &:hover {
    color: $battle-red-vibrant;
  }
}

.previous-attempt {
  margin-bottom: 20px;
  padding: 14px;
  background: #fff1f2;
  border: 1px solid $battle-red-border;
  border-radius: $radius-md;

  .label {
    font-family: $font-anime;
    font-size: 11px;
    font-weight: 800;
    color: $battle-red-dark;
    text-transform: uppercase;
  }

  .text {
    font-size: 16px;
    color: $battle-red-dark;
    font-weight: 600;
    margin-top: 4px;
  }
}

.retry-input {
  width: 100%;
  min-height: 100px;
  padding: 16px;
  border: 1.5px solid #cbd5e1;
  border-radius: $radius-md;
  font-size: 16px;
  font-family: inherit;
  margin-bottom: 16px;

  &:focus {
    outline: none;
    border-color: $ocean-vibrant;
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.18);
  }
}

.feedback-box {
  padding: 20px;
  border-radius: $radius-md;
  margin-top: 16px;

  &.correct {
    background: #ecfdf5;
    color: $sea-emerald-dark;
    border: 1.5px solid $sea-emerald;
  }

  &.acceptable {
    background: $parchment-bg;
    color: $gold-dark;
    border: 1.5px solid $gold-parchment;
  }

  &.retry {
    background: #fff1f2;
    color: $battle-red-dark;
    border: 1.5px solid $battle-red-vibrant;
  }

  .outcome-message {
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 8px;
  }
}

.natural-example {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);

  .label {
    font-family: $font-anime;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    opacity: 0.8;
  }

  .text {
    font-size: 18px;
    font-weight: 700;
    margin-top: 4px;
  }
}

.mt-4 { margin-top: 16px; }

.empty-state {
  text-align: center;
  padding: 60px 24px;
  background: $white-pure;
  border-radius: $radius-xl;
  border: 2px dashed $ocean-border;

  .empty-icon {
    font-size: 48px;
    margin-bottom: 12px;
  }

  h3 {
    font-size: 24px;
    margin-bottom: 8px;
    color: $ocean-deepest;
  }

  .muted {
    max-width: 440px;
    margin: 0 auto 24px;
  }
}

@media (max-width: $bp-tablet) {
  .redlines-list {
    grid-template-columns: 1fr;
  }
}
</style>
