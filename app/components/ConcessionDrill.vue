<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Exercise, Feedback } from '~/types/learning'

const props = defineProps<{
  exercise: Exercise
  feedback?: Feedback
}>()

const emit = defineEmits(['submit', 'next'])

const answer = ref('')
const textarea = ref<HTMLTextAreaElement | null>(null)

onMounted(() => {
  textarea.value?.focus()
})

function handleSubmit() {
  if (!answer.value.trim() || props.feedback) return
  emit('submit', answer.value)
}

const typeBadge = computed(() => {
  switch (props.exercise.concessionData?.triggerType) {
    case 'hoewel-ofschoon': return 'Toegevende Bijzin (Hoewel / Ofschoon)'
    case 'ondanks-noun-vs-clause': return 'Prepositie vs Bijzin (Ondanks vs Ondanks dat)'
    case 'al-inversion': return 'Inversie met "Al" (Al + V1 + Onderwerp)'
    case 'hoe-ook-correlative': return 'Correlatief "Hoe ... ook"'
    case 'weliswaar-maar': return 'Contrastcoördinatie (Weliswaar... maar)'
    default: return 'Toegevend Verband & Contrast'
  }
})
</script>

<template>
  <div class="concession-drill">
    <div class="card drill-card">
      <div class="header">
        <div class="eyebrow">B2 Nuanced Discourse & Concessive Clauses</div>
        <div class="badge">{{ typeBadge }}</div>
      </div>

      <div class="instruction">
        <h3>{{ exercise.prompt }}</h3>
        <p class="muted">
          Combine the two premises into one cohesive Dutch sentence using the required concessive structure. 
          Pay close attention to word order, conjunctions, and inversion rules.
        </p>
      </div>

      <div class="drill-sources-view mt-6">
        <div class="premises-grid">
          <div class="source-box premise-box">
            <div class="box-label">Stelling / Feit A (Premise A)</div>
            <p class="source-text">{{ exercise.concessionData?.premiseA }}</p>
          </div>

          <div class="vs-divider">
            <span class="vs-badge">VS / DOCH</span>
          </div>

          <div class="source-box contrast-box">
            <div class="box-label">Tegenstelling / Uitkomst B (Contrast / Outcome B)</div>
            <p class="source-text">{{ exercise.concessionData?.contrastB }}</p>
          </div>
        </div>

        <div v-if="exercise.concessionData?.structureFormula || exercise.concessionData?.connectorCue" class="formula-blueprint-container">
          <div class="blueprint-label">Constructieschema (Structural Blueprint):</div>
          <div class="blueprint-pills">
            <span v-if="exercise.concessionData?.connectorCue" class="pill cue">
              Verbindingswoord: <strong>{{ exercise.concessionData.connectorCue }}</strong>
            </span>
            <span v-if="exercise.concessionData?.structureFormula" class="pill formula">
              Formule: <code>{{ exercise.concessionData.structureFormula }}</code>
            </span>
          </div>
        </div>

        <div class="arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>

        <div class="source-box combined-target">
          <div class="box-label">Jouw Samengestelde Zin (Combined Concessive Sentence)</div>
          <div class="input-wrapper">
            <textarea
              ref="textarea"
              v-model="answer"
              class="drill-input"
              placeholder="Typ hier de volledige samengestelde zin..."
              :disabled="!!feedback"
              @keydown.enter.prevent="handleSubmit"
            ></textarea>
            <div v-if="exercise.concessionData?.hint" class="hint-text">
              Hint: <span>{{ exercise.concessionData.hint }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!feedback" class="actions mt-8">
        <button 
          class="button primary full-width" 
          :disabled="!answer.trim()"
          @click="handleSubmit"
        >
          Check Toegevende Zin
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

        <div v-if="feedback.teacherCorrection" class="correction-box mt-4">
          <div class="eyebrow">Teacher's Natural Correction:</div>
          <TeacherRedline 
            :original="answer" 
            :corrected="feedback.teacherCorrection.natural" 
          />
          <p class="correction-note mt-2">{{ feedback.teacherCorrection.explanation }}</p>
        </div>

        <div v-if="feedback.miniLesson" class="mini-lesson mt-4">
          <div class="lesson-header">
            <span class="lesson-icon">🎓</span>
            <strong>{{ feedback.miniLesson.title }}</strong>
          </div>
          <p>{{ feedback.miniLesson.content }}</p>
          <div class="example-comparison mt-2">
            <div class="ex-item wrong">Incorrect: {{ feedback.miniLesson.example.wrong }}</div>
            <div class="ex-item right">Correct: {{ feedback.miniLesson.example.right }}</div>
          </div>
        </div>

        <button class="button primary mt-6" @click="$emit('next')">Continue Practice</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.concession-drill { max-width: 650px; margin: 0 auto; }
.drill-card { padding: 32px; border-top: 6px solid #0284c7; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.badge { background: #e0f2fe; color: #0369a1; font-size: 10px; padding: 2px 8px; border-radius: 99px; font-weight: 800; text-transform: uppercase; }

.instruction h3 { margin-bottom: 4px; color: #1e293b; }
.muted { color: #64748b; font-size: 14px; line-height: 1.5; }

.drill-sources-view { display: flex; flex-direction: column; gap: 14px; align-items: center; }

.premises-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 12px;
  align-items: center;
}

.source-box { width: 100%; padding: 18px 20px; border-radius: 12px; border: 1px solid #e2e8f0; position: relative; }
.source-box.premise-box { background: #f8fafc; }
.source-box.contrast-box { background: #f8fafc; }
.source-box.combined-target { border-color: #0284c7; background: white; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.06); }

.box-label { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #94a3b8; margin-bottom: 6px; letter-spacing: 0.05em; }
.source-text { font-size: 14px; color: #1e293b; line-height: 1.4; }

.vs-divider { display: flex; align-items: center; justify-content: center; }
.vs-badge {
  font-size: 9px;
  font-weight: 800;
  background: #f1f5f9;
  color: #64748b;
  padding: 4px 6px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
}

.formula-blueprint-container {
  width: 100%;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  padding: 14px 18px;
  border-radius: 10px;
}
.blueprint-label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  color: #0369a1;
  margin-bottom: 8px;
  letter-spacing: 0.04em;
}
.blueprint-pills {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
.pill {
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 6px;
  background: white;
  border: 1px solid #bae6fd;
  color: #0c4a6e;
}
.pill strong { color: #0284c7; }
.pill.formula code { font-family: monospace; font-size: 12px; color: #0369a1; font-weight: 600; }

.arrow { color: #cbd5e1; height: 28px; display: flex; align-items: center; }
.arrow svg { width: 22px; height: 22px; }

.input-wrapper { position: relative; }
.drill-input {
  width: 100%;
  border: 0;
  padding: 0;
  font-size: 16px;
  font-family: inherit;
  color: #1e293b;
  background: transparent;
  resize: none;
  min-height: 75px;
  outline: none;
}
.hint-text {
  position: absolute;
  bottom: -10px;
  right: 0;
  font-size: 12px;
  color: #64748b;
}
.hint-text span { font-weight: 700; color: #0284c7; }

.feedback-card { padding: 24px; border-left: 6px solid #cbd5e1; }
.feedback-card.correct { border-left-color: #176b5b; }
.feedback-card.acceptable { border-left-color: #f59e0b; }
.feedback-card.retry { border-left-color: #ef4444; }

.outcome-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.outcome-badge { text-transform: uppercase; font-weight: 800; font-size: 12px; letter-spacing: 0.05em; }
.score-badge { font-size: 12px; font-weight: 700; color: #176b5b; }

.correction-box { background: #f8fafc; padding: 16px; border-radius: 12px; }
.correction-note { font-size: 13px; color: #64748b; font-style: italic; }

.mini-lesson { background: #f0f9ff; padding: 16px; border-radius: 12px; border: 1px solid #bae6fd; }
.lesson-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; color: #0369a1; }
.mini-lesson p { font-size: 14px; color: #0c4a6e; line-height: 1.5; }
.example-comparison { font-size: 13px; }
.ex-item { padding: 4px 8px; border-radius: 4px; margin-top: 4px; }
.ex-item.wrong { background: #fee2e2; color: #991b1b; }
.ex-item.right { background: #dcfce7; color: #166534; }

.full-width { width: 100%; }
.mt-2 { margin-top: 8px; }
.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
.mt-8 { margin-top: 32px; }

@media (max-width: 640px) {
  .premises-grid { grid-template-columns: 1fr; }
  .vs-divider { margin: -6px 0; }
}
</style>
