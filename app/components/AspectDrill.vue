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
  switch (props.exercise.aspectData?.aspectCategory) {
    case 'posture-durative': return 'Houdingswerkwoord (Zitten/Staan/Liggen/Lopen te + inf)'
    case 'progressive-aan-het': return 'Dynamisch Continu Aspect (Aan het + inf zijn)'
    case 'imminent-op-het-punt': return 'Op Handen Zijnde Actie (Op het punt staan om te)'
    case 'customary-plegen': return 'Gewoonte / Formeel Aspect (Plegen te + inf)'
    case 'prospective-dreigen-beloven': return 'Dreiging / Belofte (Dreigen te / Beloven te)'
    case 'perfect-posture-ipp': return 'Voltooide Tijd IPP (Heeft zitten kijken ipv gezeten)'
    default: return 'Aspectuele Werkwoorden & Duur'
  }
})
</script>

<template>
  <div class="aspect-drill">
    <div class="card drill-card">
      <div class="header">
        <div class="eyebrow">B2 Aspectual Verbs &amp; Durative Syntax</div>
        <div class="badge" :class="exercise.aspectData?.aspectCategory">
          {{ ruleBadge }}
        </div>
      </div>

      <div class="instruction">
        <h3>{{ exercise.prompt }}</h3>
        <p class="muted">
          Dutch uses specific aspectual constructions to convey posture, ongoing action, imminence, or habit: 
          <strong>zitten/staan/liggen/lopen te + inf</strong>, <strong>aan het + inf zijn</strong>, 
          <strong>op het punt staan om te</strong>, and <strong>plegen te</strong>. In perfect tenses, posture verbs trigger the IPP (double infinitive) rule.
        </p>
      </div>

      <div class="drill-blueprint">
        <!-- Aspectual Verb & Action Pair breakdown -->
        <div class="aspect-grid">
          <div class="aspect-card verb-card">
            <span class="card-label">Aspectueel / Houdingswerkwoord</span>
            <span class="verb-title">{{ exercise.aspectData?.postureOrAspectVerb || 'zitten te' }}</span>
          </div>

          <div class="aspect-arrow">
            <span class="arrow-icon">➔</span>
            <span class="aspect-label">Modificeert actie</span>
          </div>

          <div class="aspect-card action-card">
            <span class="card-label">Hoofdhandeling (Infinitief)</span>
            <span class="action-badge">{{ exercise.aspectData?.infinitiveAction || 'lezen' }}</span>
          </div>
        </div>

        <div class="source-box">
          <div class="box-label">Context / Situatie (Prompt Context)</div>
          <p class="source-text">{{ exercise.aspectData?.contextPrompt }}</p>
        </div>

        <div v-if="exercise.aspectData?.structureFormula" class="formula-box">
          <div class="formula-label">Syntactisch Bouwplan (Aspectual Formula)</div>
          <code class="formula-code">{{ exercise.aspectData.structureFormula }}</code>
        </div>

        <div v-if="exercise.aspectData?.hint" class="hint-container">
          <span class="hint-icon">💡</span>
          <span class="hint-text">{{ exercise.aspectData.hint }}</span>
        </div>
      </div>

      <form class="production-form" @submit.prevent="handleSubmit">
        <label class="form-label" for="aspect-input">
          Formuleer de Nederlandse zin met de juiste aspectuele constructie:
        </label>
        <textarea
          id="aspect-input"
          ref="textarea"
          v-model="answer"
          rows="3"
          :placeholder="exercise.placeholder || 'Typ hier de volledige zin...'"
          :disabled="!!feedback"
          class="aspect-textarea"
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
.aspect-drill { max-width: 680px; margin: 0 auto; }
.drill-card { padding: 32px; border-top: 6px solid #d97706; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.eyebrow { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #d97706; }
.badge { 
  font-size: 12px; 
  font-weight: 600; 
  padding: 4px 10px; 
  border-radius: 9999px; 
  background: #fffbeb; 
  color: #b45309; 
  border: 1px solid #fde68a; 
}
.badge.posture-durative { background: #fef3c7; color: #92400e; border-color: #fcd34d; }
.badge.progressive-aan-het { background: #eff6ff; color: #1e40af; border-color: #bfdbfe; }
.badge.imminent-op-het-punt { background: #ecfdf5; color: #065f46; border-color: #a7f3d0; }
.badge.customary-plegen { background: #fdf4ff; color: #86198f; border-color: #f5d0fe; }
.badge.prospective-dreigen-beloven { background: #fff1f2; color: #be123c; border-color: #fecdd3; }
.badge.perfect-posture-ipp { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }

.instruction h3 { font-size: 22px; margin: 0 0 8px 0; color: #1f2937; }
.instruction p { font-size: 15px; margin: 0; }

.drill-blueprint { display: flex; flex-direction: column; gap: 14px; margin: 20px 0 24px 0; }

.aspect-grid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.aspect-card {
  flex: 1;
  padding: 14px 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.verb-card {
  background: #fffbeb;
  border: 1px solid #fde68a;
}
.action-card {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
}
.aspect-arrow {
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
.aspect-label {
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
.verb-card .card-label {
  color: #92400e;
}
.action-card .card-label {
  color: #166534;
}
.verb-title {
  font-size: 18px;
  font-weight: 800;
  color: #92400e;
}
.action-badge {
  font-size: 18px;
  font-weight: 800;
  color: #166534;
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
  color: #fcd34d;
  font-weight: 600;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.hint-container {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 8px;
  padding: 10px 14px;
}
.hint-icon { font-size: 15px; line-height: 1.2; }
.hint-text { font-size: 13px; color: #92400e; line-height: 1.4; }

.production-form { display: flex; flex-direction: column; gap: 12px; }
.form-label { font-size: 14px; font-weight: 600; color: #374151; }
.aspect-textarea {
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
.aspect-textarea:focus {
  outline: none;
  border-color: #d97706;
  box-shadow: 0 0 0 4px rgba(217, 119, 6, 0.15);
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
  .aspect-grid {
    flex-direction: column;
  }
  .aspect-arrow {
    transform: rotate(90deg);
    padding: 4px 0;
  }
}
</style>
