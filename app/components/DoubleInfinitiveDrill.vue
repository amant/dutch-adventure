<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Exercise, Feedback } from '~/types/learning';

const props = defineProps<{
  exercise: Exercise;
  feedback?: Feedback;
}>();

const emit = defineEmits(['submit', 'next']);

const answer = ref('');
const textarea = ref<HTMLTextAreaElement | null>(null);

onMounted(() => {
  textarea.value?.focus();
});

function handleSubmit() {
  if (!answer.value.trim() || props.feedback) return;
  emit('submit', answer.value);
}

const typeBadge = computed(() => {
  switch (props.exercise.doubleInfinitiveData?.governingType) {
    case 'modal': return 'Modaal Werkwoord (moeten / kunnen / willen / mogen)';
    case 'causative-laten': return 'Causatief (laten doen / laten repareren)';
    case 'perception': return 'Perceptiewerkwoord (horen / zien / voelen)';
    case 'instruction-leren-helpen': return 'Instructie & Hulp (leren / helpen)';
    case 'motion-blijven-gaan': return 'Beweging & Toestand (blijven / gaan)';
    default: return 'Dubbele Infinitief (IPP)';
  }
});
</script>

<template>
  <div class="double-infinitive-drill">
    <div class="card drill-card">
      <div class="header">
        <div class="eyebrow">
          B2 Verb Clusters & Complex Tenses
        </div>
        <div class="badge">
          {{ typeBadge }}
        </div>
      </div>

      <div class="instruction">
        <h3>{{ exercise.prompt }}</h3>
        <p class="muted">
          Form the sentence in the compound tense using the <strong>Double Infinitive (IPP)</strong> rule.
          When a modal, causative, perception, or instruction verb governs another infinitive, the past participle is replaced by the infinitive.
        </p>
      </div>

      <div class="drill-sources-view mt-6">
        <div class="source-box context-box">
          <div class="box-label">
            Context / Aanleiding (Prompt Context)
          </div>
          <p class="source-text">
            {{ exercise.doubleInfinitiveData?.sentenceContext }}
          </p>
        </div>

        <div class="cluster-blueprint-container">
          <div class="blueprint-label">
            Werkwoordcluster Schema (Verb Cluster Blueprint):
          </div>
          <div class="cluster-pills">
            <span class="pill aux">Hulpwerkwoord: <strong>{{ exercise.doubleInfinitiveData?.auxiliary }}</strong></span>
            <span class="pill plus">+</span>
            <span class="pill gov">Regerend ww: <strong>{{ exercise.doubleInfinitiveData?.governingVerb }}</strong></span>
            <span class="pill plus">+</span>
            <span class="pill main">Actie: <strong>{{ exercise.doubleInfinitiveData?.mainVerb }}</strong></span>
          </div>
          <div
            v-if="exercise.doubleInfinitiveData?.isSubordinate"
            class="subclause-indicator"
          >
            ⚠️ <strong>Bijzin (Subclause):</strong> Plaats het hele werkwoordcluster aan het einde van de zin (bijv. <em>"...omdat we de auto <u>hebben moeten laten staan</u>"</em>).
          </div>
        </div>

        <div class="arrow">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>

        <div class="source-box combined-target">
          <div class="box-label">
            Jouw Zin (Voltooide Tijd met Dubbele Infinitief)
          </div>
          <div class="input-wrapper">
            <textarea
              ref="textarea"
              v-model="answer"
              class="drill-input"
              placeholder="Typ hier de volledige Nederlandse zin..."
              :disabled="!!feedback"
              @keydown.enter.prevent="handleSubmit"
            />
            <div
              v-if="exercise.doubleInfinitiveData?.hint"
              class="hint-text"
            >
              Hint: <span>{{ exercise.doubleInfinitiveData.hint }}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="!feedback"
        class="actions mt-8"
      >
        <button
          class="button primary full-width"
          :disabled="!answer.trim()"
          @click="handleSubmit"
        >
          Check Dubbele Infinitief
        </button>
      </div>
    </div>

    <div
      v-if="feedback"
      class="feedback-section mt-6"
    >
      <div
        class="card feedback-card"
        :class="feedback.outcome"
      >
        <div class="outcome-header">
          <span class="outcome-badge">{{ feedback.outcome }}</span>
          <span class="score-badge">+{{ feedback.changeModifier }} mastery</span>
        </div>

        <p class="feedback-message">
          {{ feedback.message }}
        </p>

        <div
          v-if="feedback.teacherCorrection"
          class="correction-box mt-4"
        >
          <div class="eyebrow">
            Teacher's Natural Correction:
          </div>
          <TeacherRedline
            :original="answer"
            :corrected="feedback.teacherCorrection.natural"
          />
          <p class="correction-note mt-2">
            {{ feedback.teacherCorrection.explanation }}
          </p>
        </div>

        <div
          v-if="feedback.miniLesson"
          class="mini-lesson mt-4"
        >
          <div class="lesson-header">
            <span class="lesson-icon">🎓</span>
            <strong>{{ feedback.miniLesson.title }}</strong>
          </div>
          <p>{{ feedback.miniLesson.content }}</p>
          <div class="example-comparison mt-2">
            <div class="ex-item wrong">
              Incorrect: {{ feedback.miniLesson.example.wrong }}
            </div>
            <div class="ex-item right">
              Correct: {{ feedback.miniLesson.example.right }}
            </div>
          </div>
        </div>

        <button
          class="button primary mt-6"
          @click="$emit('next')"
        >
          Continue Practice
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.double-infinitive-drill { max-width: 650px; margin: 0 auto; }
.drill-card { padding: 32px; border-top: 6px solid #4f46e5; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.badge { background: #e0e7ff; color: #4338ca; font-size: 10px; padding: 2px 8px; border-radius: 99px; font-weight: 800; text-transform: uppercase; }

.instruction h3 { margin-bottom: 4px; color: #1e293b; }
.muted { color: #64748b; font-size: 14px; line-height: 1.5; }

.drill-sources-view { display: flex; flex-direction: column; gap: 14px; align-items: center; }
.source-box { width: 100%; padding: 18px 20px; border-radius: 12px; border: 1px solid #e2e8f0; position: relative; }
.source-box.context-box { background: #f8fafc; }
.source-box.combined-target { border-color: #4f46e5; background: white; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.06); }

.box-label { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #94a3b8; margin-bottom: 6px; letter-spacing: 0.05em; }
.source-text { font-size: 15px; color: #1e293b; line-height: 1.4; }

.cluster-blueprint-container {
  width: 100%;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  padding: 14px 18px;
  border-radius: 10px;
}
.blueprint-label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  color: #475569;
  margin-bottom: 8px;
  letter-spacing: 0.04em;
}
.cluster-pills {
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
  border: 1px solid #cbd5e1;
  color: #334155;
}
.pill strong { color: #4338ca; }
.pill.plus { border: none; background: transparent; font-weight: 800; color: #94a3b8; padding: 0 2px; }

.subclause-indicator {
  margin-top: 10px;
  font-size: 12px;
  color: #b45309;
  background: #fef3c7;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #fde68a;
  line-height: 1.4;
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
.hint-text span { font-weight: 700; color: #4f46e5; }

.feedback-card { padding: 24px; border-left: 6px solid #cbd5e1; }
.feedback-card.correct { border-left-color: #176b5b; }
.feedback-card.acceptable { border-left-color: #f59e0b; }
.feedback-card.retry { border-left-color: #ef4444; }

.outcome-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.outcome-badge { text-transform: uppercase; font-weight: 800; font-size: 12px; letter-spacing: 0.05em; }
.score-badge { font-size: 12px; font-weight: 700; color: #176b5b; }

.correction-box { background: #f8fafc; padding: 16px; border-radius: 12px; }
.correction-note { font-size: 13px; color: #64748b; font-style: italic; }

.mini-lesson { background: #eef2ff; padding: 16px; border-radius: 12px; border: 1px solid #c7d2fe; }
.lesson-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; color: #4338ca; }
.mini-lesson p { font-size: 14px; color: #312e81; line-height: 1.5; }
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
