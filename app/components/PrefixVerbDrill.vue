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

const stressBadge = computed(() => {
  if (props.exercise.prefixVerbData?.stressPattern === 'separable-stressed-prefix') {
    return 'Scheidbaar (Klemtoon op Voorvoegsel)'
  }
  return 'Onscheidbaar (Klemtoon op Grondwoord)'
})

const structureLabel = computed(() => {
  switch (props.exercise.prefixVerbData?.targetStructure) {
    case 'present-main': return 'Onvoltooid Tegenwoordige Tijd (Hoofdzin)'
    case 'present-subclause': return 'Ondergeschikte Bijzin (SOV)'
    case 'perfect-tense': return 'Voltooid Tegenwoordige Tijd (Hulpwerkwoord + Deelwoord)'
    case 'infinitive-te': return 'Infinitiefconstructie met (om...) te'
    default: return 'Doelstructuur'
  }
})
</script>

<template>
  <div class="prefix-verb-drill">
    <div class="card drill-card">
      <div class="header">
        <div class="eyebrow">B2 Prefix Verbs &amp; Stress Semantics</div>
        <div class="badge" :class="exercise.prefixVerbData?.stressPattern">
          {{ stressBadge }}
        </div>
      </div>

      <div class="instruction">
        <h3>{{ exercise.prompt }}</h3>
        <p class="muted">
          Dutch prefix verbs with identical spelling change their meaning and conjugation depending on stress:
          <strong>Stressed prefix</strong> = separable (splits in main clauses, takes <em>ge-</em> after prefix, <em>te</em> inserted).
          <strong>Stressed stem</strong> = inseparable (never splits, no <em>ge-</em> in participle, <em>te</em> placed in front).
        </p>
      </div>

      <div class="drill-sources-view mt-6">
        <!-- Phonetic & Semantic Contrast Card -->
        <div class="contrast-banner">
          <div class="banner-top">
            <span class="verb-stress">{{ exercise.prefixVerbData?.stressedForm }}</span>
            <span class="structure-badge">{{ structureLabel }}</span>
          </div>
          <p class="meaning-def">{{ exercise.prefixVerbData?.meaningDefinition }}</p>
        </div>

        <div class="source-box context-box">
          <div class="box-label">Context / Situatieschets (Prompt Context)</div>
          <p class="source-text">{{ exercise.prefixVerbData?.contextPrompt }}</p>
        </div>

        <div v-if="exercise.prefixVerbData?.structureFormula" class="formula-blueprint-container">
          <div class="blueprint-label">Constructieschema (Structural Blueprint):</div>
          <div class="blueprint-pills">
            <span class="pill formula">
              Formule: <code>{{ exercise.prefixVerbData.structureFormula }}</code>
            </span>
          </div>
        </div>

        <div class="arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>

        <div class="source-box combined-target">
          <div class="box-label">Jouw Zin (Doelzin met Correcte Vervoeging)</div>
          <div class="input-wrapper">
            <textarea
              ref="textarea"
              v-model="answer"
              class="drill-input"
              placeholder="Typ hier de volledige Nederlandse zin..."
              :disabled="!!feedback"
              @keydown.enter.prevent="handleSubmit"
            ></textarea>
            <div v-if="exercise.prefixVerbData?.hint" class="hint-text">
              Hint: <span>{{ exercise.prefixVerbData.hint }}</span>
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
          Check Vervoeging &amp; Zinsbouw
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
.prefix-verb-drill { max-width: 650px; margin: 0 auto; }
.drill-card { padding: 32px; border-top: 6px solid #8b5cf6; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.badge { font-size: 10px; padding: 3px 10px; border-radius: 99px; font-weight: 800; text-transform: uppercase; }
.badge.separable-stressed-prefix { background: #ede9fe; color: #6d28d9; border: 1px solid #ddd6fe; }
.badge.inseparable-stressed-stem { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }

.instruction h3 { margin-bottom: 4px; color: #1e293b; }
.muted { color: #64748b; font-size: 14px; line-height: 1.5; }

.drill-sources-view { display: flex; flex-direction: column; gap: 14px; align-items: center; }

.contrast-banner {
  width: 100%;
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
  border: 1px solid #c4b5fd;
  border-radius: 12px;
  padding: 16px 20px;
}
.banner-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.verb-stress {
  font-family: monospace;
  font-size: 18px;
  font-weight: 800;
  color: #5b21b6;
  letter-spacing: 0.05em;
}
.structure-badge {
  background: #ffffff;
  color: #6d28d9;
  border: 1px solid #c4b5fd;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 6px;
  text-transform: uppercase;
}
.meaning-def {
  font-size: 13px;
  color: #4c1d95;
  font-weight: 500;
  line-height: 1.4;
}

.source-box { width: 100%; padding: 18px 20px; border-radius: 12px; border: 1px solid #e2e8f0; position: relative; }
.source-box.context-box { background: #f8fafc; }
.source-box.combined-target { border-color: #8b5cf6; background: white; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.06); }

.box-label { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #94a3b8; margin-bottom: 6px; letter-spacing: 0.05em; }
.source-text { font-size: 14px; color: #1e293b; line-height: 1.4; }

.formula-blueprint-container {
  width: 100%;
  background: #fdf4ff;
  border: 1px solid #f0abfc;
  padding: 12px 18px;
  border-radius: 10px;
}
.blueprint-label {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  color: #86198f;
  margin-bottom: 6px;
  letter-spacing: 0.04em;
}
.blueprint-pills {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
.pill.formula code {
  font-family: monospace;
  font-size: 12px;
  color: #86198f;
  font-weight: 600;
}

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
.hint-text span { font-weight: 700; color: #7c3aed; }

.feedback-card { padding: 24px; border-left: 6px solid #cbd5e1; }
.feedback-card.correct { border-left-color: #176b5b; }
.feedback-card.acceptable { border-left-color: #f59e0b; }
.feedback-card.retry { border-left-color: #ef4444; }

.outcome-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.outcome-badge { text-transform: uppercase; font-weight: 800; font-size: 12px; letter-spacing: 0.05em; }
.score-badge { font-size: 12px; font-weight: 700; color: #176b5b; }

.correction-box { background: #f8fafc; padding: 16px; border-radius: 12px; }
.correction-note { font-size: 13px; color: #64748b; font-style: italic; }

.mini-lesson { background: #f5f3ff; padding: 16px; border-radius: 12px; border: 1px solid #ddd6fe; }
.lesson-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; color: #5b21b6; }
.mini-lesson p { font-size: 14px; color: #4c1d95; line-height: 1.5; }
.example-comparison { font-size: 13px; }
.ex-item { padding: 4px 8px; border-radius: 4px; margin-top: 4px; }
.ex-item.wrong { background: #fee2e2; color: #991b1b; }
.ex-item.right { background: #dcfce7; color: #166534; }

.full-width { width: 100%; }
.mt-2 { margin-top: 8px; }
.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
.mt-8 { margin-top: 32px; }
</style>
