<script setup lang="ts">
import { ref } from 'vue'
import type { Exercise } from '~/types/learning'

const props = defineProps<{
  exercise: Exercise
}>()

const emit = defineEmits<{
  (e: 'submit', answer: string): void
}>()

const userText = ref('')
const options = computed<string[]>(() => (props.exercise.options || []).map(opt => typeof opt === 'string' ? opt : opt.text))

const selectOption = (opt: string) => {
  userText.value = opt
  submit()
}

const submit = () => {
  emit('submit', userText.value)
}
</script>

<template>
  <div class="collocation-drill">
    <div class="drill-header">
      <div class="icon">🧩</div>
      <div class="header-text">
        <h4>Collocation Precision</h4>
        <p class="muted">Native speakers pair certain words together. Choose the most natural companion for the highlighted word.</p>
      </div>
    </div>

    <div class="prompt-box">
      <div class="label">Sentence</div>
      <div class="prompt-text" v-html="exercise.prompt.replace('{target}', '<span class=\'target\'>' + (exercise.context || '...') + '</span>')"></div>
    </div>

    <div v-if="options.length > 0" class="options-grid">
      <button 
        v-for="opt in options" 
        :key="opt" 
        class="opt-btn"
        @click="selectOption(opt)"
      >
        {{ opt }}
      </button>
    </div>

    <div v-else class="manual-input">
      <div class="label">Your Answer</div>
      <input 
        v-model="userText" 
        type="text" 
        class="input-field" 
        placeholder="Which word fits best?"
        @keyup.enter="submit"
      />
      <button 
        class="button primary full-width mt-4" 
        :disabled="!userText.trim()"
        @click="submit"
      >
        Submit
      </button>
    </div>

    <div class="collocation-tip">
      <p><strong>B2 Tip:</strong> Using the correct collocation (e.g., <em>besluit nemen</em> instead of <em>besluit maken</em>) is one of the quickest ways to sound more professional and native-like.</p>
    </div>
  </div>
</template>

<style scoped>
.collocation-drill {
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
  background: #eff6ff;
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

.prompt-box {
  background: #f8fafc;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  text-align: center;
}

.label {
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 12px;
}

.prompt-text {
  font-size: 20px;
  color: #334155;
  line-height: 1.6;
}

:deep(.target) {
  color: #176b5b;
  font-weight: 800;
  border-bottom: 3px solid #176b5b;
}

.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}

.opt-btn {
  background: white;
  border: 2px solid #e2e8f0;
  padding: 14px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
}

.opt-btn:hover {
  border-color: #176b5b;
  color: #176b5b;
  background: #f0fdfa;
}

.input-field {
  width: 100%;
  padding: 14px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 16px;
  text-align: center;
}

.input-field:focus {
  outline: none;
  border-color: #176b5b;
}

.collocation-tip {
  background: #fffbeb;
  padding: 16px;
  border-radius: 10px;
  font-size: 14px;
  color: #92400e;
  border: 1px solid #fef3c7;
}

.collocation-tip p { margin: 0; }

.mt-4 { margin-top: 16px; }
.full-width { width: 100%; }
</style>
