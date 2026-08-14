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
  switch (props.exercise.infinitiveData?.constructionType) {
    case 'purpose-om-te': return 'Doeluitdrukking (om... te)'
    case 'adjective-om-te': return 'Adjectiefconstructie (om... te)'
    case 'separable-te': return 'Scheidbaar Werkwoord (prefix + te + stam)'
    case 'semi-auxiliary-te': return 'Semi-hulpwerkwoord (hoeven / blijken te)'
    case 'fixed-verb-te': return 'Vast Werkwoord (besluiten / proberen te)'
    default: return 'Infinitiefconstructie (Te / Om te)'
  }
})
</script>

<template>
  <div class="infinitive-drill">
    <div class="card drill-card">
      <div class="header">
        <div class="eyebrow">B2 Complex Sentences & Precision</div>
        <div class="badge">{{ typeBadge }}</div>
      </div>

      <div class="instruction">
        <h3>{{ exercise.prompt }}</h3>
        <p class="muted">Construct a fluent infinitive clause using <em>te</em> or <em>om... te</em>. Pay special attention to separable verb placement and word order.</p>
      </div>

      <div class="drill-sources-view mt-6">
        <div class="source-box main-clause">
          <div class="box-label">Aanhef / Hoofdzin (Main clause / Trigger)</div>
          <p class="source-text">{{ exercise.infinitiveData?.mainClause }}</p>
        </div>

        <div class="plus-divider">
          <span class="plus-icon">+</span>
        </div>

        <div class="source-box action-info">
          <div class="box-label">Uit te drukken handeling (Action to express)</div>
          <p class="source-text">{{ exercise.infinitiveData?.infinitiveAction }}</p>
          <div v-if="exercise.infinitiveData?.separablePrefix && exercise.infinitiveData?.baseVerb" class="separable-pill">
            Scheidbaar werkwoord: <strong>{{ exercise.infinitiveData.separablePrefix }}</strong> + <em>te</em> + <strong>{{ exercise.infinitiveData.baseVerb }}</strong> &rarr; <span class="combined-verb">{{ exercise.infinitiveData.separablePrefix }} te {{ exercise.infinitiveData.baseVerb }}</span>
          </div>
        </div>

        <div class="arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>

        <div class="source-box combined-target">
          <div class="box-label">Volledige Zin (Infinitive Clause)</div>
          <div class="input-wrapper">
            <textarea
              ref="textarea"
              v-model="answer"
              class="drill-input"
              placeholder="Typ de volledige zin met (om...) te..."
              :disabled="!!feedback"
              @keydown.enter.prevent="handleSubmit"
            ></textarea>
            <div v-if="exercise.infinitiveData?.hint" class="hint-text">
              Hint: <span>{{ exercise.infinitiveData.hint }}</span>
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
          Check Infinitiefzin
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
.infinitive-drill { max-width: 650px; margin: 0 auto; }
.drill-card { padding: 32px; border-top: 6px solid #0284c7; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.badge { background: #e0f2fe; color: #0369a1; font-size: 10px; padding: 2px 8px; border-radius: 99px; font-weight: 800; text-transform: uppercase; }

.instruction h3 { margin-bottom: 4px; color: #1e293b; }
.muted { color: #64748b; font-size: 14px; }

.drill-sources-view { display: flex; flex-direction: column; gap: 14px; align-items: center; }
.source-box { width: 100%; padding: 18px 20px; border-radius: 12px; border: 1px solid #e2e8f0; position: relative; }
.source-box.main-clause { background: #f8fafc; }
.source-box.action-info { background: #f8fafc; }
.source-box.combined-target { border-color: #0284c7; background: white; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.06); }

.box-label { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #94a3b8; margin-bottom: 6px; letter-spacing: 0.05em; }
.source-text { font-size: 15px; color: #1e293b; line-height: 1.4; }

.separable-pill { margin-top: 10px; font-size: 12px; color: #0f172a; background: #e0f2fe; display: inline-block; padding: 4px 10px; border-radius: 6px; border: 1px solid #bae6fd; }
.separable-pill strong { color: #0369a1; }
.separable-pill em { color: #d97706; font-weight: 700; font-style: normal; }
.separable-pill .combined-verb { font-weight: 800; color: #0284c7; }

.plus-divider { color: #94a3b8; font-weight: 800; font-size: 18px; margin: -6px 0; }
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
</style>
