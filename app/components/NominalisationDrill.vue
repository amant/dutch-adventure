<script setup lang="ts">
import { ref, onMounted } from 'vue';
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
</script>

<template>
  <div class="nominalisation-drill">
    <div class="card drill-card">
      <div class="header">
        <div class="eyebrow">
          B2 Academic & Professional Dutch
        </div>
        <div class="badge">
          Nominalisation
        </div>
      </div>

      <div class="instruction">
        <h3>{{ exercise.prompt }}</h3>
        <p class="muted">
          Transform the verbal expression into a noun-based formal construction.
        </p>
      </div>

      <div class="transformation-view mt-6">
        <div class="box verbal">
          <div class="box-label">
            Verbal (Less Formal)
          </div>
          <p>{{ exercise.nominalisationData?.verbalSentence }}</p>
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

        <div class="box nominal">
          <div class="box-label">
            Nominal (Formal / B2+)
          </div>
          <div class="input-wrapper">
            <textarea
              ref="textarea"
              v-model="answer"
              class="drill-input"
              placeholder="E.g. De verlaging van..."
              :disabled="!!feedback"
              @keydown.enter.prevent="handleSubmit"
            />
            <div
              v-if="exercise.nominalisationData?.targetNoun"
              class="target-hint"
            >
              Target noun: <span>{{ exercise.nominalisationData.targetNoun }}</span>
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
          Check Nominalisation
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
            Formal Correction:
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
              Verb: {{ feedback.miniLesson.example.wrong }}
            </div>
            <div class="ex-item right">
              Noun: {{ feedback.miniLesson.example.right }}
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
.nominalisation-drill { max-width: 650px; margin: 0 auto; }
.drill-card { padding: 32px; border-top: 6px solid #1e40af; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.badge { background: #dbeafe; color: #1e40af; font-size: 10px; padding: 2px 8px; border-radius: 99px; font-weight: 800; text-transform: uppercase; }

.instruction h3 { margin-bottom: 4px; color: #1e293b; }
.muted { color: #64748b; font-size: 14px; }

.transformation-view { display: flex; flex-direction: column; gap: 16px; align-items: center; }
.box { width: 100%; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; position: relative; }
.box.verbal { background: #f8fafc; }
.box.nominal { border-color: #1e40af; background: white; box-shadow: 0 4px 12px rgba(30, 64, 175, 0.05); }
.box-label { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #94a3b8; margin-bottom: 8px; letter-spacing: 0.05em; }

.arrow { color: #cbd5e1; height: 32px; display: flex; align-items: center; }
.arrow svg { width: 24px; height: 24px; }

.input-wrapper { position: relative; }
.drill-input {
  width: 100%;
  border: 0;
  padding: 0;
  font-size: 18px;
  font-family: inherit;
  color: #1e293b;
  background: transparent;
  resize: none;
  min-height: 80px;
  outline: none;
}
.target-hint {
  position: absolute;
  bottom: -10px;
  right: 0;
  font-size: 12px;
  color: #64748b;
}
.target-hint span { font-weight: 700; color: #1e40af; }

.feedback-card { padding: 24px; border-left: 6px solid #cbd5e1; }
.feedback-card.correct { border-left-color: #176b5b; }
.feedback-card.acceptable { border-left-color: #f59e0b; }
.feedback-card.retry { border-left-color: #ef4444; }

.outcome-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.outcome-badge { text-transform: uppercase; font-weight: 800; font-size: 12px; letter-spacing: 0.05em; }
.score-badge { font-size: 12px; font-weight: 700; color: #176b5b; }

.correction-box { background: #f8fafc; padding: 16px; border-radius: 12px; }
.correction-note { font-size: 13px; color: #64748b; font-style: italic; }

.mini-lesson { background: #eff6ff; padding: 16px; border-radius: 12px; border: 1px solid #dbeafe; }
.lesson-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; color: #1e40af; }
.mini-lesson p { font-size: 14px; color: #1e3a8a; line-height: 1.5; }
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
