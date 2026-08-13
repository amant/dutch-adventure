<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Exercise } from '~/types/learning'
import PragmaticIndicator from './PragmaticIndicator.vue'

const props = defineProps<{
  exercise: Exercise
}>()

const emit = defineEmits<{
  (e: 'submit', answer: string): void
}>()

const userText = ref('')
const particles = ['even', 'hoor', 'maar', 'toch', 'nou', 'eens', 'misschien', 'eigenlijk']

const injectParticle = (p: string) => {
  if (!userText.value) {
    userText.value = props.exercise.context || ''
  }
  // Simple injection logic: try to put it after the first verb or at the end
  userText.value = userText.value.trim() + ' ' + p
}

const submit = () => {
  emit('submit', userText.value)
}

// Simple heuristic for naturalness preview
const naturalnessScore = computed(() => {
  const text = userText.value.toLowerCase()
  let score = 40
  particles.forEach(p => {
    if (text.includes(p)) score += 15
  })
  return Math.min(score, 100)
})
</script>

<template>
  <div class="nuance-drill">
    <div class="drill-header">
      <div class="icon">✨</div>
      <div class="header-text">
        <h4>The Naturalness Injector</h4>
        <p class="muted">This sentence is technically correct, but sounds a bit "stiff". Add modal particles or softeners to make it sound like a native speaker.</p>
      </div>
    </div>

    <div class="base-sentence">
      <div class="label">Stiff Version</div>
      <div class="stiff-text">"{{ exercise.context || exercise.prompt }}"</div>
    </div>

    <div class="palette">
      <div class="label">Particle Palette</div>
      <div class="particle-list">
        <button 
          v-for="p in particles" 
          :key="p" 
          class="particle-btn"
          @click="injectParticle(p)"
        >
          + {{ p }}
        </button>
      </div>
    </div>

    <div class="editor-section">
      <div class="label">Your Natural Version</div>
      <textarea 
        v-model="userText" 
        class="editor" 
        placeholder="Edit the sentence to make it flow..."
        rows="3"
      ></textarea>
      
      <div class="pragmatic-preview">
        <PragmaticIndicator :score="naturalnessScore" />
      </div>
    </div>

    <div class="actions">
      <button 
        class="button primary full-width" 
        :disabled="!userText.trim()"
        @click="submit"
      >
        Submit Natural Version
      </button>
    </div>
  </div>
</template>

<style scoped>
.nuance-drill {
  background: white;
  padding: 32px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.drill-header {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.drill-header .icon {
  font-size: 24px;
  background: #f0fdf4;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.drill-header h4 {
  margin: 0;
  color: #1e293b;
}

.drill-header p {
  margin: 4px 0 0;
  font-size: 14px;
  line-height: 1.5;
}

.base-sentence {
  background: #f8fafc;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #cbd5e1;
  margin-bottom: 24px;
}

.label {
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 8px;
  letter-spacing: 0.05em;
}

.stiff-text {
  font-size: 18px;
  color: #475569;
  font-style: italic;
}

.palette {
  margin-bottom: 24px;
}

.particle-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.particle-btn {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
}

.particle-btn:hover {
  background: #e2e8f0;
  border-color: #cbd5e1;
  transform: translateY(-1px);
}

.editor-section {
  margin-bottom: 24px;
}

.editor {
  width: 100%;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-family: inherit;
  font-size: 17px;
  color: #1e293b;
  resize: none;
  margin-bottom: 12px;
}

.editor:focus {
  outline: none;
  border-color: #176b5b;
}

.pragmatic-preview {
  display: flex;
  justify-content: center;
}

.full-width {
  width: 100%;
}
</style>
