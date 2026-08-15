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
  switch (props.exercise.topicalisationData?.focusType) {
    case 'object-fronting-v2': return 'Lijdend/Meewerkend Voorwerp Vooraan (V2 Inversie)';
    case 'infinitive-fronting-doen': return 'Infinitief Vooraan + Hulpwerkwoord Doen';
    case 'participle-fronting': return 'Deelwoord Vooraan (Contrastieve Focus)';
    case 'left-dislocation-resumptive': return 'Linkerdislocatie met Resumptief Pronomen';
    case 'cleft-het-is-dat': return 'Cleft-Focusconstructie (Het is... dat)';
    case 'cleft-het-is-die': return 'Cleft-Focusconstructie (Het is... die)';
    case 'inverted-conditional-mocht': return 'Emfatische Inversie zonder Voegwoord (Mocht...)';
    default: return 'Topicalisatie & Focus';
  }
});
</script>

<template>
  <div class="topicalisation-drill">
    <div class="card drill-card">
      <div class="header">
        <div class="eyebrow">
          B2 Focus Fronting &amp; Emphatic Word Order
        </div>
        <div
          class="badge"
          :class="exercise.topicalisationData?.focusType"
        >
          {{ ruleBadge }}
        </div>
      </div>

      <div class="instruction">
        <h3>{{ exercise.prompt }}</h3>
        <p class="muted">
          In advanced Dutch, word order is strategically rearranged to highlight contrast, convey urgency, or package information.
          Fronting elements requires strict adherence to the <strong>Verb Second (V2)</strong> rule, dummy auxiliary <strong>doen</strong> with infinitives, or <strong>resumptive pronouns</strong>.
        </p>
      </div>

      <div class="drill-blueprint">
        <!-- Fronted Focus Element & Target Pair -->
        <div class="focus-grid">
          <div class="focus-card fronted-card">
            <span class="card-label">Vooropgeplaatst Focuselement (Topic / Nadruk)</span>
            <span class="focus-title">{{ exercise.topicalisationData?.frontedElement || 'Dát element' }}</span>
          </div>

          <div
            v-if="exercise.topicalisationData?.resumptiveElement"
            class="focus-card resumptive-card"
          >
            <span class="card-label">Resumptief Element</span>
            <span class="resumptive-badge">{{ exercise.topicalisationData.resumptiveElement }}</span>
          </div>
        </div>

        <!-- Neutral Base Sentence vs Focus Target -->
        <div
          v-if="exercise.topicalisationData?.baseSentence"
          class="base-contrast-box"
        >
          <div class="base-row">
            <span class="base-tag">Neutrale Woordvolgorde (Basiszin):</span>
            <span class="base-text">"{{ exercise.topicalisationData.baseSentence }}"</span>
          </div>
          <div class="focus-transform-arrow">
            ➔ Herstructureer met emfatische focus / inversie:
          </div>
        </div>

        <div class="source-box">
          <div class="box-label">
            Context &amp; Communicatief Doel
          </div>
          <p class="source-text">
            {{ exercise.topicalisationData?.contextPrompt }}
          </p>
        </div>

        <div
          v-if="exercise.topicalisationData?.structureFormula"
          class="formula-box"
        >
          <div class="formula-label">
            Syntactisch Focus Bouwplan (Word Order Formula)
          </div>
          <code class="formula-code">{{ exercise.topicalisationData.structureFormula }}</code>
        </div>

        <div
          v-if="exercise.topicalisationData?.hint"
          class="hint-container"
        >
          <span class="hint-icon">💡</span>
          <span class="hint-text">{{ exercise.topicalisationData.hint }}</span>
        </div>
      </div>

      <form
        class="production-form"
        @submit.prevent="handleSubmit"
      >
        <label
          class="form-label"
          for="topicalisation-input"
        >
          Formuleer de zin met de vereiste focusconstructie en correcte inversie:
        </label>
        <textarea
          id="topicalisation-input"
          ref="textarea"
          v-model="answer"
          rows="3"
          :placeholder="exercise.placeholder || 'Typ hier de volledige zin met focusconstructie...'"
          :disabled="!!feedback"
          class="topicalisation-textarea"
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
.topicalisation-drill { max-width: 680px; margin: 0 auto; }
.drill-card { padding: 32px; border-top: 6px solid #ea580c; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.eyebrow { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #ea580c; }
.badge {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 9999px;
  background: #fff7ed;
  color: #c2410c;
  border: 1px solid #ffedd5;
}
.badge.object-fronting-v2 { background: #eff6ff; color: #1d4ed8; border-color: #bfdbfe; }
.badge.infinitive-fronting-doen { background: #fdf4ff; color: #86198f; border-color: #f5d0fe; }
.badge.participle-fronting { background: #fefce8; color: #854d0e; border-color: #fef08a; }
.badge.left-dislocation-resumptive { background: #ecfdf5; color: #065f46; border-color: #a7f3d0; }
.badge.cleft-het-is-dat, .badge.cleft-het-is-die { background: #f0fdfa; color: #0f766e; border-color: #99f6e4; }
.badge.inverted-conditional-mocht { background: #fdf2f8; color: #9d174d; border-color: #fbcfe8; }

.instruction h3 { font-size: 22px; margin: 0 0 8px 0; color: #1f2937; }
.instruction p { font-size: 15px; margin: 0; }

.drill-blueprint { display: flex; flex-direction: column; gap: 14px; margin: 20px 0 24px 0; }

.focus-grid {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.focus-card {
  flex: 1;
  min-width: 200px;
  padding: 14px 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.fronted-card {
  background: #fff7ed;
  border: 1px solid #fed7aa;
}
.resumptive-card {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  max-width: 180px;
}
.card-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #9a3412;
}
.resumptive-card .card-label {
  color: #166534;
}
.focus-title {
  font-size: 18px;
  font-weight: 800;
  color: #c2410c;
}
.resumptive-badge {
  font-size: 18px;
  font-weight: 800;
  color: #15803d;
}

.base-contrast-box {
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 10px;
  padding: 12px 14px;
}
.base-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}
.base-tag {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #64748b;
}
.base-text {
  font-size: 14px;
  color: #475569;
  font-style: italic;
}
.focus-transform-arrow {
  font-size: 12px;
  font-weight: 600;
  color: #ea580c;
  margin-top: 4px;
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
  color: #fb923c;
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
.topicalisation-textarea {
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
.topicalisation-textarea:focus {
  outline: none;
  border-color: #ea580c;
  box-shadow: 0 0 0 4px rgba(234, 88, 12, 0.15);
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
</style>
