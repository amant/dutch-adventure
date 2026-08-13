<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Exercise } from '~/types/learning'

const props = defineProps<{
  exercise: Exercise
}>()

const emit = defineEmits<{
  (e: 'submit', answer: string): void
}>()

const userText = ref('')
const original = computed(() => props.exercise.correctionData?.originalText || '')
const mistakes = computed(() => props.exercise.correctionData?.mistakes || [])

onMounted(() => {
  userText.value = original.value
})

const fixedCount = computed(() => {
  if (!userText.value) return 0
  let count = 0
  mistakes.value.forEach(m => {
    // Check if the mistake segment is gone AND the correction is present
    // This is a simple heuristic
    const segmentMissing = !userText.value.includes(m.segment)
    const correctionPresent = userText.value.includes(m.correction)
    if (segmentMissing && correctionPresent) {
      count++
    }
  })
  return count
})

const totalMistakes = computed(() => mistakes.value.length)

const submit = () => {
  emit('submit', userText.value)
}
</script>

<template>
  <div class="correction-challenge">
    <div class="challenge-header">
      <div class="icon">🔍</div>
      <div class="header-text">
        <h4>Teacher Mode: Error Correction</h4>
        <p class="muted">A student wrote this Dutch text. It contains <strong>{{ totalMistakes }} errors</strong>. Fix them to improve the text.</p>
      </div>
    </div>

    <div class="editor-container">
      <div class="label-row">
        <span>Editing Student Work</span>
        <span class="status" :class="{ all: fixedCount === totalMistakes }">
          {{ fixedCount }} / {{ totalMistakes }} fixed
        </span>
      </div>
      <textarea 
        v-model="userText" 
        class="editor" 
        rows="8"
        placeholder="Fix the errors here..."
      ></textarea>
    </div>

    <div class="hints-box" v-if="fixedCount < totalMistakes">
      <span class="hint-title">Common pitfalls to check:</span>
      <ul class="hint-list">
        <li>Verb position (V2 rule vs Subordinate clauses)</li>
        <li>Perfect tense auxiliaries (hebben vs zijn)</li>
        <li>Adjective endings (-e or no -e)</li>
        <li>Word order with 'niet' and 'geen'</li>
      </ul>
    </div>

    <div class="actions">
      <button 
        class="button primary full-width" 
        :disabled="userText === original"
        @click="submit"
      >
        Finalize Corrections
      </button>
      <button class="button secondary full-width" @click="userText = original">
        Reset to Original
      </button>
    </div>
  </div>
</template>

<style scoped>
.correction-challenge {
  background: white;
  padding: 32px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.challenge-header {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.challenge-header .icon {
  font-size: 24px;
  background: #f1f5f9;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.challenge-header h4 {
  margin: 0;
  color: #1e293b;
}

.challenge-header p {
  margin: 4px 0 0;
  font-size: 14px;
}

.editor-container {
  margin-bottom: 24px;
}

.label-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 8px;
  letter-spacing: 0.05em;
}

.status {
  color: #f59e0b;
}

.status.all {
  color: #176b5b;
}

.editor {
  width: 100%;
  padding: 20px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #334155;
  background: #f8fafc;
  resize: none;
  transition: all 0.2s ease;
}

.editor:focus {
  outline: none;
  border-color: #176b5b;
  background: white;
}

.hints-box {
  background: #fffcf4;
  border: 1px solid #f9e8b9;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 32px;
}

.hint-title {
  display: block;
  font-weight: 700;
  font-size: 13px;
  color: #92400e;
  margin-bottom: 12px;
}

.hint-list {
  margin: 0;
  padding-left: 20px;
  font-size: 14px;
  color: #b45309;
}

.hint-list li {
  margin-bottom: 4px;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.full-width {
  width: 100%;
}
</style>
