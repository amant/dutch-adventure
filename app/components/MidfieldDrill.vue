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

const ruleBadge = computed(() => {
  switch (props.exercise.midfieldData?.focusRule) {
    case 'tmp-order': return 'TMP-Volgorde (Tijd ⏱️ → Manier ⚙️ → Plaats 📍)';
    case 'definite-vs-indefinite-object': return 'Objectpositie (Bepalend vóór TMP / Onbepaald ná TMP)';
    case 'indirect-direct-object': return 'Meewerkend vs Lijdend Voorwerp';
    case 'negation-placement': return 'Negatieplaatsing (Niet / Geen in het Middenveld)';
    case 'modal-adverb-tmp': return 'Modale Bepalingen & TMP-Syntaxis';
    default: return 'Middenveld-Syntaxis';
  }
});
</script>

<template>
  <div class="midfield-drill">
    <div class="card drill-card">
      <div class="header">
        <div class="eyebrow">
          B2 Midfield Word Order &amp; Syntactic Architecture
        </div>
        <div
          class="badge"
          :class="exercise.midfieldData?.focusRule"
        >
          {{ ruleBadge }}
        </div>
      </div>

      <div class="instruction">
        <h3>{{ exercise.prompt }}</h3>
        <p class="muted">
          In the Dutch <em>middenveld</em> (between V2 finite verb and final verb cluster), adjuncts strictly follow
          <strong>Tijd (Time) &rarr; Wijze/Manier (Manner) &rarr; Plaats (Place)</strong>.
          Definite objects (<em>het/de</em>) precede TMP and negation; indefinite objects (<em>een/geen</em>) follow TMP.
        </p>
      </div>

      <div class="drill-sources-view mt-6">
        <!-- Structural Slot Blueprint Breakdown -->
        <div
          v-if="exercise.midfieldData?.slots"
          class="slots-blueprint-grid"
        >
          <div
            v-if="exercise.midfieldData.slots.directObject?.isDefinite"
            class="slot-pill definite-obj"
          >
            <span class="slot-tag">Bepalend Object</span>
            <span class="slot-val">{{ exercise.midfieldData.slots.directObject.text }}</span>
          </div>
          <div
            v-if="exercise.midfieldData.slots.indirectObject"
            class="slot-pill indirect-obj"
          >
            <span class="slot-tag">Meewerkend Vw</span>
            <span class="slot-val">{{ exercise.midfieldData.slots.indirectObject.text }}</span>
          </div>
          <div
            v-if="exercise.midfieldData.slots.time"
            class="slot-pill time-slot"
          >
            <span class="slot-tag">⏱️ Tijd</span>
            <span class="slot-val">{{ exercise.midfieldData.slots.time }}</span>
          </div>
          <div
            v-if="exercise.midfieldData.slots.manner"
            class="slot-pill manner-slot"
          >
            <span class="slot-tag">⚙️ Manier / Wijze</span>
            <span class="slot-val">{{ exercise.midfieldData.slots.manner }}</span>
          </div>
          <div
            v-if="exercise.midfieldData.slots.negation && exercise.midfieldData.slots.negation !== 'geen'"
            class="slot-pill negation-slot"
          >
            <span class="slot-tag">🚫 Negatie</span>
            <span class="slot-val">{{ exercise.midfieldData.slots.negation }}</span>
          </div>
          <div
            v-if="exercise.midfieldData.slots.place"
            class="slot-pill place-slot"
          >
            <span class="slot-tag">📍 Plaats / Richting</span>
            <span class="slot-val">{{ exercise.midfieldData.slots.place }}</span>
          </div>
          <div
            v-if="exercise.midfieldData.slots.directObject && !exercise.midfieldData.slots.directObject.isDefinite"
            class="slot-pill indefinite-obj"
          >
            <span class="slot-tag">Onbepaald Object</span>
            <span class="slot-val">{{ exercise.midfieldData.slots.directObject.text }}</span>
          </div>
          <div
            v-if="exercise.midfieldData.slots.predicateOrPrepObject"
            class="slot-pill prep-obj"
          >
            <span class="slot-tag">Vaste Bepaling / Predicaat</span>
            <span class="slot-val">{{ exercise.midfieldData.slots.predicateOrPrepObject }}</span>
          </div>
        </div>

        <div class="source-box context-box">
          <div class="box-label">
            Context / Situatie (Prompt Context)
          </div>
          <p class="source-text">
            {{ exercise.midfieldData?.contextPrompt }}
          </p>
        </div>

        <!-- Available Elements / Scrambled Components -->
        <div
          v-if="exercise.midfieldData?.providedElements?.length"
          class="elements-pool-card"
        >
          <div class="pool-label">
            Bouwstenen van de zin (Elements to integrate):
          </div>
          <div class="tokens-list">
            <span
              v-for="(tok, idx) in exercise.midfieldData.providedElements"
              :key="idx"
              class="token-chip"
            >
              {{ tok }}
            </span>
          </div>
        </div>

        <div
          v-if="exercise.midfieldData?.structureFormula"
          class="formula-blueprint-container"
        >
          <div class="blueprint-label">
            Syntactisch Constructieschema (Structural Blueprint):
          </div>
          <div class="blueprint-pills">
            <span class="pill formula">
              Formule: <code>{{ exercise.midfieldData.structureFormula }}</code>
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
            Jouw Zin (Doelzin met Correcte Middenveld-Volgorde)
          </div>
          <div class="input-wrapper">
            <textarea
              ref="textarea"
              v-model="answer"
              class="drill-input"
              placeholder="Typ hier de volledige natuurlijke Nederlandse zin..."
              :disabled="!!feedback"
              @keydown.enter.prevent="handleSubmit"
            />
            <div
              v-if="exercise.midfieldData?.hint"
              class="hint-text"
            >
              Hint: <span>{{ exercise.midfieldData.hint }}</span>
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
          Valideer Zinsvolgorde &amp; Middenveld
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
.midfield-drill { max-width: 650px; margin: 0 auto; }
.drill-card { padding: 32px; border-top: 6px solid #0284c7; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.badge { font-size: 10px; padding: 3px 10px; border-radius: 99px; font-weight: 800; text-transform: uppercase; }
.badge.tmp-order { background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; }
.badge.definite-vs-indefinite-object { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
.badge.indirect-direct-object { background: #f3e8ff; color: #7e22ce; border: 1px solid #e9d5ff; }
.badge.negation-placement { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }
.badge.modal-adverb-tmp { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }

.instruction h3 { margin-bottom: 4px; color: #1e293b; }
.muted { color: #64748b; font-size: 14px; line-height: 1.5; }

.drill-sources-view { display: flex; flex-direction: column; gap: 14px; align-items: center; }

.slots-blueprint-grid {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 12px;
  padding: 14px 16px;
}
.slot-pill {
  display: flex;
  flex-direction: column;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid transparent;
}
.slot-tag {
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2px;
}
.slot-val {
  font-size: 13px;
  font-weight: 700;
}

.definite-obj { background: #fef3c7; color: #92400e; border-color: #fde68a; }
.definite-obj .slot-tag { color: #b45309; }

.indirect-obj { background: #fae8ff; color: #86198f; border-color: #f5d0fe; }
.indirect-obj .slot-tag { color: #a21caf; }

.time-slot { background: #e0f2fe; color: #075985; border-color: #bae6fd; }
.time-slot .slot-tag { color: #0284c7; }

.manner-slot { background: #dcfce7; color: #166534; border-color: #bbf7d0; }
.manner-slot .slot-tag { color: #15803d; }

.negation-slot { background: #fee2e2; color: #991b1b; border-color: #fecaca; }
.negation-slot .slot-tag { color: #dc2626; }

.place-slot { background: #ede9fe; color: #5b21b6; border-color: #ddd6fe; }
.place-slot .slot-tag { color: #7c3aed; }

.indefinite-obj { background: #fffbeb; color: #78350f; border-color: #fef3c7; }
.indefinite-obj .slot-tag { color: #d97706; }

.prep-obj { background: #f1f5f9; color: #334155; border-color: #cbd5e1; }
.prep-obj .slot-tag { color: #64748b; }

.source-box { width: 100%; padding: 18px 20px; border-radius: 12px; border: 1px solid #e2e8f0; position: relative; }
.source-box.context-box { background: #f8fafc; }
.source-box.combined-target { border-color: #0284c7; background: white; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.06); }

.box-label { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #94a3b8; margin-bottom: 6px; letter-spacing: 0.05em; }
.source-text { font-size: 14px; color: #1e293b; line-height: 1.4; }

.elements-pool-card {
  width: 100%;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 10px;
  padding: 12px 16px;
}
.pool-label {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: 8px;
}
.tokens-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.token-chip {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.formula-blueprint-container {
  width: 100%;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  padding: 12px 18px;
  border-radius: 10px;
}
.blueprint-label {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  color: #15803d;
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
  color: #166534;
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
.mini-lesson p { font-size: 14px; color: #075985; line-height: 1.5; }
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
