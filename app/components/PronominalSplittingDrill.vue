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
  switch (props.exercise.pronominalSplittingData?.clauseType) {
    case 'main-clause': return 'Hoofdzin (R-woord vroeg, Voorzetsel achteraan)';
    case 'subclause': return 'Bijzin (R-woord na voegwoord/onderwerp, Voorzetsel vóór werkwoordcluster)';
    case 'question-waar': return 'Vraagzin met Waar...? (Gescheiden vraagconstructie)';
    case 'fronted-topic': return 'Topicalisatie / Nadruk (Daar/Hier... vooraan)';
    default: return 'Splitsing van het Voornaamwoordelijk Bijwoord';
  }
});
</script>

<template>
  <div class="pronominal-splitting-drill">
    <div class="card drill-card">
      <div class="header">
        <div class="eyebrow">
          B2 Pronominal Adverb Splitting &amp; Syntactic Placement
        </div>
        <div
          class="badge"
          :class="exercise.pronominalSplittingData?.clauseType"
        >
          {{ ruleBadge }}
        </div>
      </div>

      <div class="instruction">
        <h3>{{ exercise.prompt }}</h3>
        <p class="muted">
          In natural and spoken Dutch, pronominal adverbs (<em>er, hier, daar, waar, nergens, overal, ergens</em> + preposition)
          are systematically <strong>split</strong>. The R-word appears early in the clause, while the preposition stays glued directly in front of the verbal cluster.
        </p>
      </div>

      <div class="drill-blueprint">
        <!-- R-Word & Preposition Pair breakdown -->
        <div class="splitting-grid">
          <div class="pair-card r-card">
            <span class="card-label">R-Woord (Vroeg / Vooraan)</span>
            <span class="r-title">{{ exercise.pronominalSplittingData?.rWord || 'er' }}</span>
          </div>

          <div class="split-arrow">
            <span class="arrow-icon">⟷</span>
            <span class="split-label">Gespleten door middenveld</span>
          </div>

          <div class="pair-card prep-card">
            <span class="card-label">Voorzetsel (Vóór werkwoord)</span>
            <span class="prep-badge">{{ exercise.pronominalSplittingData?.preposition || 'over' }}</span>
          </div>
        </div>

        <div
          v-if="exercise.pronominalSplittingData?.combinedForm"
          class="combined-note"
        >
          <span class="note-tag">Traditionele / Ongesplitste vorm:</span>
          <code class="combined-code">{{ exercise.pronominalSplittingData.combinedForm }}</code>
          <span class="vs-label">➔ Gespleten vorm klinkt veel natuurlijker!</span>
        </div>

        <div class="source-box">
          <div class="box-label">
            Context / Situatie (Prompt Context)
          </div>
          <p class="source-text">
            {{ exercise.pronominalSplittingData?.contextPrompt }}
          </p>
        </div>

        <!-- Available Elements if provided -->
        <div
          v-if="exercise.pronominalSplittingData?.providedElements?.length"
          class="elements-pool-card"
        >
          <div class="pool-label">
            Mee te nemen elementen:
          </div>
          <div class="tokens-list">
            <span
              v-for="(tok, idx) in exercise.pronominalSplittingData.providedElements"
              :key="idx"
              class="token-chip"
            >
              {{ tok }}
            </span>
          </div>
        </div>

        <div
          v-if="exercise.pronominalSplittingData?.structureFormula"
          class="formula-box"
        >
          <div class="formula-label">
            Syntactisch Bouwplan (Word Order Formula)
          </div>
          <code class="formula-code">{{ exercise.pronominalSplittingData.structureFormula }}</code>
        </div>

        <div
          v-if="exercise.pronominalSplittingData?.hint"
          class="hint-container"
        >
          <span class="hint-icon">💡</span>
          <span class="hint-text">{{ exercise.pronominalSplittingData.hint }}</span>
        </div>
      </div>

      <form
        class="production-form"
        @submit.prevent="handleSubmit"
      >
        <label
          class="form-label"
          for="splitting-input"
        >
          Formuleer de natuurlijke Nederlandse zin met de correcte gespleten woordvolgorde:
        </label>
        <textarea
          id="splitting-input"
          ref="textarea"
          v-model="answer"
          rows="3"
          :placeholder="exercise.placeholder || 'Typ hier de volledige zin met gespleten vorm...'"
          :disabled="!!feedback"
          class="splitting-textarea"
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
.pronominal-splitting-drill { max-width: 680px; margin: 0 auto; }
.drill-card { padding: 32px; border-top: 6px solid #0284c7; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.eyebrow { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #0284c7; }
.badge {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 9999px;
  background: #f0f9ff;
  color: #0369a1;
  border: 1px solid #bae6fd;
}
.badge.main-clause { background: #eff6ff; color: #1d4ed8; border-color: #bfdbfe; }
.badge.subclause { background: #fdf4ff; color: #86198f; border-color: #f5d0fe; }
.badge.question-waar { background: #fefce8; color: #854d0e; border-color: #fef08a; }
.badge.fronted-topic { background: #ecfdf5; color: #065f46; border-color: #a7f3d0; }

.instruction h3 { font-size: 22px; margin: 0 0 8px 0; color: #1f2937; }
.instruction p { font-size: 15px; margin: 0; }

.drill-blueprint { display: flex; flex-direction: column; gap: 14px; margin: 20px 0 24px 0; }

.splitting-grid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.pair-card {
  flex: 1;
  padding: 14px 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.r-card {
  background: #f0f9ff;
  border: 1px solid #bae6fd;
}
.prep-card {
  background: #fef2f2;
  border: 1px solid #fecaca;
}
.split-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
}
.arrow-icon {
  font-size: 24px;
  color: #64748b;
  font-weight: bold;
}
.split-label {
  font-size: 10px;
  text-transform: uppercase;
  color: #64748b;
  font-weight: 700;
  text-align: center;
}
.card-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #64748b;
}
.r-card .card-label {
  color: #0369a1;
}
.prep-card .card-label {
  color: #b91c1c;
}
.r-title {
  font-size: 20px;
  font-weight: 800;
  color: #0369a1;
}
.prep-badge {
  font-size: 20px;
  font-weight: 800;
  color: #b91c1c;
}

.combined-note {
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.note-tag {
  color: #64748b;
  font-weight: 600;
}
.combined-code {
  background: #e2e8f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: #334155;
  font-weight: bold;
}
.vs-label {
  color: #0284c7;
  font-weight: 600;
  font-size: 12px;
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
  letter-spacing: 0.04em;
  color: #8c827a;
  margin-bottom: 6px;
}
.source-text {
  font-size: 16px;
  line-height: 1.5;
  color: #2c2825;
  margin: 0;
  font-weight: 500;
}

.elements-pool-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px 14px;
}
.pool-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: 8px;
}
.tokens-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.token-chip {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #334155;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}

.formula-box {
  background: #0f172a;
  border-radius: 10px;
  padding: 12px 16px;
}
.formula-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
  font-weight: 700;
  margin-bottom: 4px;
}
.formula-code {
  font-size: 13px;
  color: #38bdf8;
  font-weight: 600;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.hint-container {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  padding: 10px 14px;
}
.hint-icon { font-size: 15px; line-height: 1.2; }
.hint-text { font-size: 13px; color: #1e40af; line-height: 1.4; }

.production-form { display: flex; flex-direction: column; gap: 12px; }
.form-label { font-size: 14px; font-weight: 600; color: #374151; }
.splitting-textarea {
  width: 100%;
  padding: 14px 16px;
  font-size: 16px;
  line-height: 1.5;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;
  color: #111827;
  transition: all 0.2s ease;
  resize: vertical;
  box-sizing: border-box;
}
.splitting-textarea:focus {
  outline: none;
  border-color: #0284c7;
  box-shadow: 0 0 0 4px rgba(2, 132, 199, 0.15);
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.input-helpers { display: flex; align-items: center; gap: 12px; }
.shortcut-tip { font-size: 12px; color: #6b7280; }

@media (max-width: 640px) {
  .splitting-grid {
    flex-direction: column;
  }
  .split-arrow {
    transform: rotate(90deg);
    padding: 4px 0;
  }
}
</style>
