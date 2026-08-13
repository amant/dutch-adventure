<script setup lang="ts">
import type { Exercise, Feedback } from '~/types/learning'

const props = defineProps<{
  exercise: Exercise
}>()

const emit = defineEmits<{
  (e: 'submit', answer: string): void
}>()

const activeLevelIdx = ref(0)
const answers = ref<string[]>([])
const activeAnswer = ref('')

const levels = computed(() => props.exercise.formalityLevels || [])
const currentLevel = computed(() => levels.value[activeLevelIdx.value])

function nextLevel() {
  answers.value[activeLevelIdx.value] = activeAnswer.value
  if (activeLevelIdx.value < levels.value.length - 1) {
    activeLevelIdx.value++
    activeAnswer.value = answers.value[activeLevelIdx.value] || ''
  } else {
    // Final submit - join answers or just submit the last one? 
    // For simplicity, we'll submit the specific one that evaluateResponse expects, 
    // or evaluateResponse can handle the array. 
    // Actually, let's submit them one by one or as a combined string.
    // The design: User must complete all 3.
    emit('submit', answers.value.join(' | '))
  }
}

function prevLevel() {
  if (activeLevelIdx.value > 0) {
    answers.value[activeLevelIdx.value] = activeAnswer.value
    activeLevelIdx.value--
    activeAnswer.value = answers.value[activeLevelIdx.value] || ''
  }
}
</script>

<template>
  <div class="formality-drill">
    <div class="core-thought card">
      <div class="eyebrow">Core Thought</div>
      <p>{{ exercise.prompt }}</p>
    </div>

    <div class="levels-nav">
      <div 
        v-for="(lvl, idx) in levels" 
        :key="idx" 
        class="level-tab"
        :class="{ active: activeLevelIdx === idx, completed: !!answers[idx] }"
        @click="activeLevelIdx = idx; activeAnswer = answers[idx] || ''"
      >
        {{ lvl.level }}
      </div>
    </div>

    <div class="drill-content card">
      <div class="level-header">
        <h3>Express this {{ currentLevel.level }}ly</h3>
        <p class="small muted">{{ currentLevel.prompt || `How would you say this in a ${currentLevel.level} context?` }}</p>
      </div>

      <textarea 
        v-model="activeAnswer" 
        :placeholder="`Type your ${currentLevel.level} Dutch here...`"
        class="drill-input"
        @keydown.enter.prevent="nextLevel"
      ></textarea>

      <div class="actions">
        <button class="button secondary" @click="prevLevel" :disabled="activeLevelIdx === 0">Previous</button>
        <button class="button" @click="nextLevel">
          {{ activeLevelIdx === levels.length - 1 ? 'Finish Challenge' : 'Next Register' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.formality-drill { display: flex; flex-direction: column; gap: 20px; }
.core-thought { background: #f0f7f4; border-color: #cad6ce; }
.core-thought p { font-size: 18px; font-weight: 500; margin: 10px 0 0; }

.levels-nav { display: flex; gap: 10px; }
.level-tab {
  flex: 1; text-align: center; padding: 10px; background: white; 
  border: 1px solid #e1e8e4; border-radius: 10px; font-size: 12px;
  text-transform: uppercase; font-weight: 700; color: #8a9a94;
  cursor: pointer; transition: all 0.2s;
}
.level-tab.active { border-color: #176b5b; color: #176b5b; background: #e8f3ec; }
.level-tab.completed { border-bottom: 3px solid #176b5b; }

.drill-content { display: flex; flex-direction: column; gap: 20px; }
.level-header h3 { margin: 0; text-transform: capitalize; }
.drill-input {
  width: 100%; min-height: 100px; padding: 16px; border: 2px solid #cad6ce;
  border-radius: 12px; font-size: 16px; font-family: inherit; resize: none;
}
.drill-input:focus { outline: none; border-color: #176b5b; }
.actions { display: flex; justify-content: space-between; }
</style>
