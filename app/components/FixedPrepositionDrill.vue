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
  switch (props.exercise.fixedPrepositionData?.collocationType) {
    case 'verb-preposition': return 'Werkwoord + Vast Voorzetsel';
    case 'adjective-preposition': return 'Bijvoeglijk Naamwoord + Voorzetsel';
    case 'noun-preposition': return 'Zelfstandig Naamwoord + Voorzetsel';
    case 'abstract-regime': return 'Abstract Voorzetselregime';
    default: return 'Vast Voorzetsel';
  }
});
</script>

<template>
  <div class="fixed-prep-drill">
    <div class="card drill-card">
      <div class="header">
        <div class="eyebrow">
          B2 Fixed Prepositions &amp; Prepositional Regimes
        </div>
        <div
          class="badge"
          :class="exercise.fixedPrepositionData?.collocationType"
        >
          {{ typeBadge }}
        </div>
      </div>

      <div class="instruction">
        <h3>{{ exercise.prompt }}</h3>
        <p class="muted">
          In Dutch, many verbs, adjectives, and nouns require a <strong>specific fixed preposition</strong> that cannot be translated literally from English or other languages.
        </p>
      </div>

      <div class="drill-blueprint mt-6">
        <!-- Blueprint cards -->
        <div class="regime-grid">
          <div class="regime-card head-card">
            <span class="card-label">Regerend Woord (Governing Head)</span>
            <span class="head-title">{{ exercise.fixedPrepositionData?.governingHead }}</span>
          </div>

          <div class="regime-card prep-card">
            <span class="card-label">Vast Voorzetsel (Required Preposition)</span>
            <span class="prep-badge">+ {{ exercise.fixedPrepositionData?.fixedPreposition }}</span>
          </div>
        </div>

        <div class="source-box context-box">
          <div class="box-label">
            Context / Situatie
          </div>
          <p class="source-text">
            {{ exercise.fixedPrepositionData?.contextPrompt }}
          </p>
          <p
            v-if="exercise.fixedPrepositionData?.meaningContext"
            class="meaning-note"
          >
            💡 <em>Betekenis: {{ exercise.fixedPrepositionData.meaningContext }}</em>
          </p>
        </div>

        <!-- Transfer Error Warning -->
        <div
          v-if="exercise.fixedPrepositionData?.commonTransferErrors?.length"
          class="transfer-warning-box"
        >
          <div class="warning-title">
            ⚠️ Let op: Vermijd taaltransferfouten (Do not use)
          </div>
          <div class="error-tags">
            <span
              v-for="(err, idx) in exercise.fixedPrepositionData.commonTransferErrors"
              :key="idx"
              class="error-tag"
            >
              ❌ {{ err }}
            </span>
          </div>
        </div>

        <div
          v-if="exercise.fixedPrepositionData?.structureFormula"
          class="formula-blueprint-container"
        >
          <span class="formula-label">Zinsstructuur (Blueprint):</span>
          <code class="formula-code">{{ exercise.fixedPrepositionData.structureFormula }}</code>
        </div>

        <div
          v-if="exercise.fixedPrepositionData?.hint"
          class="hint-container"
        >
          <span class="hint-icon">💡</span>
          <span class="hint-text">{{ exercise.fixedPrepositionData.hint }}</span>
        </div>
      </div>

      <form
        class="production-form"
        @submit.prevent="handleSubmit"
      >
        <label
          class="form-label"
          for="prep-input"
        >
          Formuleer de correcte Nederlandse zin met het vereiste vaste voorzetsel:
        </label>
        <textarea
          id="prep-input"
          ref="textarea"
          v-model="answer"
          rows="3"
          :placeholder="exercise.placeholder || 'Typ hier de volledige zin...'"
          :disabled="!!feedback"
          class="prep-textarea"
          @keydown.enter.exact.prevent="handleSubmit"
        />

        <div class="form-actions">
          <div class="input-helpers">
            <VoiceInput
              v-if="!feedback"
              @result="(t) => { answer = t; handleSubmit() }"
            />
            <span class="shortcut-tip">Druk op <strong>Enter ↵</strong> om te controleren</span>
          </div>

          <button
            v-if="!feedback"
            type="submit"
            class="button primary"
            :disabled="!answer.trim()"
          >
            Controleer antwoord
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.fixed-prep-drill { max-width: 680px; margin: 0 auto; }
.drill-card { padding: 32px; border-top: 6px solid #059669; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.eyebrow { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #059669; }
.badge {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 9999px;
  background: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}
.badge.verb-preposition { background: #eff6ff; color: #1e40af; border-color: #bfdbfe; }
.badge.adjective-preposition { background: #fdf4ff; color: #86198f; border-color: #f5d0fe; }
.badge.noun-preposition { background: #fffbeb; color: #92400e; border-color: #fde68a; }
.badge.abstract-regime { background: #f0fdf4; color: #166534; border-color: #bbf7d0; }

.instruction h3 { font-size: 22px; margin: 0 0 8px 0; color: #1f2937; }
.instruction p { font-size: 15px; margin: 0; }

.drill-blueprint { display: flex; flex-direction: column; gap: 14px; margin: 20px 0 24px 0; }

.regime-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.regime-card {
  padding: 14px 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.head-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}
.prep-card {
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
}
.card-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #64748b;
}
.prep-card .card-label {
  color: #047857;
}
.head-title {
  font-size: 17px;
  font-weight: 700;
  color: #1e293b;
}
.prep-badge {
  font-size: 18px;
  font-weight: 800;
  color: #065f46;
}

.source-box {
  background: #fdfcf9;
  border: 1px solid #e7e3da;
  border-radius: 12px;
  padding: 16px;
}
.box-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #8c7355;
  margin-bottom: 6px;
}
.source-text {
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
  color: #2c2925;
  font-weight: 500;
}
.meaning-note {
  margin: 8px 0 0 0;
  font-size: 13px;
  color: #64748b;
}

.transfer-warning-box {
  background: #fff1f2;
  border: 1px solid #fecdd3;
  border-radius: 12px;
  padding: 12px 16px;
}
.warning-title {
  font-size: 12px;
  font-weight: 700;
  color: #be123c;
  margin-bottom: 6px;
}
.error-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.error-tag {
  font-size: 13px;
  font-weight: 600;
  color: #9f1239;
  background: #ffe4e6;
  padding: 3px 8px;
  border-radius: 6px;
}

.formula-blueprint-container {
  background: #0f172a;
  color: #f8fafc;
  padding: 12px 16px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.formula-label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
.formula-code { font-family: monospace; font-size: 13px; color: #34d399; }

.hint-container {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #065f46;
  background: #f0fdf4;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #bbf7d0;
}

.production-form { margin-top: 16px; display: flex; flex-direction: column; gap: 12px; }
.form-label { font-size: 14px; font-weight: 600; color: #374151; }
.prep-textarea {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 16px;
  line-height: 1.5;
  font-family: inherit;
  resize: vertical;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.prep-textarea:focus {
  outline: none;
  border-color: #059669;
  box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.15);
}

.form-actions { display: flex; justify-content: space-between; align-items: center; }
.input-helpers { display: flex; align-items: center; gap: 12px; }
.shortcut-tip { font-size: 12px; color: #94a3b8; }
.button.primary {
  background: #059669;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.button.primary:hover:not(:disabled) { background: #047857; }
.button.primary:disabled { opacity: 0.5; cursor: not-allowed; }

@media (max-width: 640px) {
  .regime-grid { grid-template-columns: 1fr; }
  .form-actions { flex-direction: column; align-items: flex-start; gap: 12px; }
}
</style>
