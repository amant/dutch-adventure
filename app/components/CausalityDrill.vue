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
  switch (props.exercise.causalityData?.relationType) {
    case 'doordat-oorzaak': return 'Doordat (Onvrijwillige Oorzaak / Externe Factor)';
    case 'aangezien-reden': return 'Aangezien / Vermits (Formele Premisse / Reden)';
    case 'te-wijten-aan': return 'Te Wijten Aan (Negatieve Oorzaak / Toerekening)';
    case 'te-danken-aan': return 'Te Danken Aan / Dankzij (Positieve Toeschrijving)';
    case 'waardoor-gevolg': return 'Waardoor (Relatieve Gevolgtrekking / Consequentie)';
    case 'dermate-dat': return 'Dermate... Dat (Geprononceerde Gevolgstructuur)';
    case 'opdat-doel': return 'Opdat (Formeel Beoogd Doel / Subclause)';
    case 'teneinde-te': return 'Teneinde... Te (Formeel Doelinfinitief)';
    default: return 'Oorzaak, Gevolg & Doelgericht Verband';
  }
});
</script>

<template>
  <div class="causality-drill">
    <div class="card drill-card">
      <div class="header">
        <div class="eyebrow">
          B2 Advanced Syntax & Causal-Consecutive Logic
        </div>
        <div class="badge">
          {{ typeBadge }}
        </div>
      </div>

      <div class="instruction">
        <h3>{{ exercise.prompt }}</h3>
        <p class="muted">
          Fuse the cause, consequence, or goal into a coherent Dutch sentence using the specified causal, consecutive, or final connector.
          Pay strict attention to subclause SOV word order, distinction between involuntary causes (<em>doordat</em>) and voluntary reasons (<em>aangezien/omdat</em>), negative attribution (<em>te wijten aan</em>) versus positive merit (<em>te danken aan/dankzij</em>), and formal purpose structures (<em>opdat</em>, <em>teneinde te</em>).
        </p>
      </div>

      <div class="drill-sources-view mt-6">
        <div class="premises-grid">
          <div class="source-box premise-box">
            <div class="box-label">
              Oorzaak / Uitgangspunt / Aanleiding (Premise / Cause / Context)
            </div>
            <p class="source-text">
              {{ exercise.causalityData?.premiseOrCause }}
            </p>
          </div>

          <div class="relation-divider">
            <span class="relation-badge">➔ OORZAAK / GEVOLG / DOEL</span>
          </div>

          <div class="source-box result-box">
            <div class="box-label">
              Gevolg / Uitkomst / Beoogd Doel (Consequence / Result / Purpose)
            </div>
            <p class="source-text">
              {{ exercise.causalityData?.resultOrAction }}
            </p>
          </div>
        </div>

        <div
          v-if="exercise.causalityData?.structureFormula || exercise.causalityData?.connectorCue"
          class="formula-blueprint-container"
        >
          <div class="blueprint-label">
            Constructieschema (Structural Blueprint):
          </div>
          <div class="blueprint-pills">
            <span
              v-if="exercise.causalityData?.connectorCue"
              class="pill cue"
            >
              Verbindingswoord: <strong>{{ exercise.causalityData.connectorCue }}</strong>
            </span>
            <span
              v-if="exercise.causalityData?.structureFormula"
              class="pill formula"
            >
              Formule: <code>{{ exercise.causalityData.structureFormula }}</code>
            </span>
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
            Jouw Samengestelde Zin (Combined Causal / Consecutive Sentence)
          </div>
          <div class="input-wrapper">
            <textarea
              ref="textarea"
              v-model="answer"
              class="drill-input"
              placeholder="Typ hier de volledige samengestelde zin..."
              :disabled="!!feedback"
              @keydown.enter.prevent="handleSubmit"
            />
            <div
              v-if="exercise.causalityData?.hint"
              class="hint-text"
            >
              Hint: <span>{{ exercise.causalityData.hint }}</span>
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
          Check Verband &amp; Zinsbouw
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
.causality-drill { max-width: 650px; margin: 0 auto; }
.drill-card { padding: 32px; border-top: 6px solid #6366f1; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.badge { background: #e0e7ff; color: #4338ca; font-size: 10px; padding: 2px 8px; border-radius: 99px; font-weight: 800; text-transform: uppercase; }

.instruction h3 { margin-bottom: 4px; color: #1e293b; }
.muted { color: #64748b; font-size: 14px; line-height: 1.5; }

.drill-sources-view { display: flex; flex-direction: column; gap: 14px; align-items: center; }

.premises-grid {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  position: relative;
}

.relation-divider {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -4px 0;
  z-index: 2;
}
.relation-badge {
  background: #eef2ff;
  border: 1px solid #c7d2fe;
  color: #4f46e5;
  font-size: 10px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 99px;
  letter-spacing: 0.05em;
}

.source-box { width: 100%; padding: 18px 20px; border-radius: 12px; border: 1px solid #e2e8f0; position: relative; }
.source-box.premise-box { background: #f8fafc; }
.source-box.result-box { background: #f8fafc; }
.source-box.combined-target { border-color: #6366f1; background: white; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.06); }

.box-label { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #94a3b8; margin-bottom: 6px; letter-spacing: 0.05em; }
.source-text { font-size: 14px; color: #1e293b; line-height: 1.4; }

.formula-blueprint-container {
  width: 100%;
  background: #eef2ff;
  border: 1px solid #c7d2fe;
  padding: 14px 18px;
  border-radius: 10px;
}
.blueprint-label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  color: #3730a3;
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
  border: 1px solid #c7d2fe;
  color: #312e81;
}
.pill strong { color: #4f46e5; }
.pill.formula code { font-family: monospace; font-size: 12px; color: #4f46e5; font-weight: 600; }

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
.lesson-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; color: #3730a3; }
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
