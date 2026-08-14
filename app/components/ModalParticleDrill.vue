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

const ruleBadge = computed(() => {
  switch (props.exercise.modalParticleData?.pragmaticFunction) {
    case 'rebuttal-wel-degelijk': return 'Weerlegging & Overtuiging (Wel degelijk)'
    case 'inevitability-nou-eenmaal': return 'Onvermijdelijke Realiteit (Nou eenmaal)'
    case 'concession-toch-maar': return 'Heroverweging / Toegeving (Toch maar)'
    case 'tactful-urgency-toch-maar-eens': return 'Tactisch Advies / Aansporing (Toch maar eens)'
    case 'reluctant-alternative-dan-maar': return 'Berusting / Alternatief (Dan maar)'
    case 'shared-premise-immers': return 'Gedeelde Kennis / Vanzelfsprekendheid (Immers)'
    case 'softened-inquiry-eens-even': return 'Verzacht Verzoek (Eens even)'
    case 'advisory-caution-maar-beter': return 'Voorzichtigheidsadvies (Maar beter)'
    default: return 'Modale Partikels & Schakering'
  }
})
</script>

<template>
  <div class="modal-particle-drill">
    <div class="card drill-card">
      <div class="header">
        <div class="eyebrow">B2 Modal Particles &amp; Pragmatic Shading</div>
        <div class="badge" :class="exercise.modalParticleData?.pragmaticFunction">
          {{ ruleBadge }}
        </div>
      </div>

      <div class="instruction">
        <h3>{{ exercise.prompt }}</h3>
        <p class="muted">
          Dutch modal particles (<em>schakeringspartikels</em>) transform literal, rigid statements into natural, authentic discourse. 
          They convey tone, certainty, softness, or shared understanding, and sit in the <strong>inner midfield</strong> directly after pronouns and finite verbs.
        </p>
      </div>

      <div class="drill-blueprint">
        <!-- Target Modal Cluster Card -->
        <div class="particle-cluster-card">
          <div class="cluster-label">Doel-Partikelcombinatie (Modal Cluster)</div>
          <div class="cluster-pill">
            <span class="pill-sparkle">✨</span>
            <span class="cluster-text">{{ exercise.modalParticleData?.particleCluster || 'toch maar' }}</span>
          </div>
        </div>

        <!-- Stiff vs Natural Context Box -->
        <div v-if="exercise.modalParticleData?.stiffOriginalSentence" class="contrast-box">
          <div class="stiff-row">
            <span class="contrast-tag stiff-tag">Letterlijk / Stijf (Zonder partikels):</span>
            <span class="stiff-text">"{{ exercise.modalParticleData.stiffOriginalSentence }}"</span>
          </div>
          <div class="contrast-arrow">➔ Transformeer met natuurlijke schakering:</div>
        </div>

        <div class="source-box">
          <div class="box-label">Context &amp; Situatie (Pragmatic Context)</div>
          <p class="source-text">{{ exercise.modalParticleData?.contextPrompt }}</p>
        </div>

        <div v-if="exercise.modalParticleData?.structureFormula" class="formula-box">
          <div class="formula-label">Syntactisch Bouwplan (Middenveld Volgorde)</div>
          <code class="formula-code">{{ exercise.modalParticleData.structureFormula }}</code>
        </div>

        <div v-if="exercise.modalParticleData?.syntacticSlotHint" class="slot-note">
          <span class="note-icon">📌</span>
          <span class="note-text">{{ exercise.modalParticleData.syntacticSlotHint }}</span>
        </div>

        <div v-if="exercise.modalParticleData?.hint" class="hint-container">
          <span class="hint-icon">💡</span>
          <span class="hint-text">{{ exercise.modalParticleData.hint }}</span>
        </div>
      </div>

      <form class="production-form" @submit.prevent="handleSubmit">
        <label class="form-label" for="particle-input">
          Formuleer de natuurlijke Nederlandse zin met de juiste partikelcombinatie en woordvolgorde:
        </label>
        <textarea
          id="particle-input"
          ref="textarea"
          v-model="answer"
          rows="3"
          :placeholder="exercise.placeholder || 'Typ hier de volledige natuurlijke zin...'"
          :disabled="!!feedback"
          class="particle-textarea"
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
.modal-particle-drill { max-width: 680px; margin: 0 auto; }
.drill-card { padding: 32px; border-top: 6px solid #8b5cf6; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.eyebrow { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #8b5cf6; }
.badge { 
  font-size: 12px; 
  font-weight: 600; 
  padding: 4px 12px; 
  border-radius: 9999px; 
  background: #f5f3ff; 
  color: #6d28d9; 
  border: 1px solid #ddd6fe; 
}
.badge.rebuttal-wel-degelijk { background: #eff6ff; color: #1d4ed8; border-color: #bfdbfe; }
.badge.inevitability-nou-eenmaal { background: #fef2f2; color: #b91c1c; border-color: #fecaca; }
.badge.concession-toch-maar { background: #fefce8; color: #854d0e; border-color: #fef08a; }
.badge.tactful-urgency-toch-maar-eens { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
.badge.reluctant-alternative-dan-maar { background: #fff7ed; color: #c2410c; border-color: #ffedd5; }
.badge.shared-premise-immers { background: #faf5ff; color: #7e22ce; border-color: #e9d5ff; }
.badge.softened-inquiry-eens-even { background: #ecfeff; color: #0e7490; border-color: #a5f3fc; }
.badge.advisory-caution-maar-beter { background: #fff1f2; color: #be123c; border-color: #fecdd3; }

.instruction h3 { font-size: 22px; margin: 0 0 8px 0; color: #1f2937; }
.instruction p { font-size: 15px; margin: 0; }

.drill-blueprint { display: flex; flex-direction: column; gap: 14px; margin: 20px 0 24px 0; }

.particle-cluster-card {
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
  border: 1px solid #c4b5fd;
  border-radius: 12px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cluster-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6d28d9;
}
.cluster-pill {
  background: #7c3aed;
  color: #ffffff;
  padding: 6px 16px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 4px rgba(124, 58, 237, 0.25);
}
.pill-sparkle { font-size: 14px; }
.cluster-text { font-size: 16px; font-weight: 800; letter-spacing: 0.02em; }

.contrast-box {
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 10px;
  padding: 12px 14px;
}
.stiff-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}
.contrast-tag {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}
.stiff-tag { color: #64748b; }
.stiff-text {
  font-size: 14px;
  color: #475569;
  font-style: italic;
}
.contrast-arrow {
  font-size: 12px;
  font-weight: 600;
  color: #8b5cf6;
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
  color: #a78bfa;
  font-weight: 600;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.slot-note {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: #f5f3ff;
  border: 1px solid #ddd6fe;
  border-radius: 8px;
  padding: 10px 14px;
}
.note-icon { font-size: 15px; }
.note-text { font-size: 13px; color: #5b21b6; line-height: 1.4; font-weight: 500; }

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
.particle-textarea {
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
.particle-textarea:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15);
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
