<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Exercise, Feedback } from '~/types/learning';
import VoiceInput from './VoiceInput.vue';

const props = defineProps<{
  exercise: Exercise;
  feedback?: Feedback;
}>();

const emit = defineEmits(['submit', 'next']);
const response = defineModel<string>();

const isSpeaking = ref(false);

function handleSubmit() {
  emit('submit', response.value);
}

function handleVoiceResult(text: string) {
  response.value = text;
  handleSubmit();
}

const lazyWord = computed(() => props.exercise.context?.split(' -> ')[0] || 'word');
const preciseWord = computed(() => props.exercise.context?.split(' -> ')[1] || 'better word');
</script>

<template>
  <div class="precision-drill">
    <div class="card drill-card">
      <div class="header">
        <div class="eyebrow">
          Vocabulary Precision
        </div>
        <div class="badge">
          B2 Skill
        </div>
      </div>

      <div class="transformation-box">
        <div class="word-path">
          <span class="lazy">{{ lazyWord }}</span>
          <span class="arrow">→</span>
          <span class="precise">{{ preciseWord }}</span>
        </div>
        <p class="instruction">
          Rewrite the sentence using <strong>{{ preciseWord }}</strong> to sound more professional.
        </p>
      </div>

      <div class="original-sentence card">
        <div class="eyebrow">
          Original:
        </div>
        <p class="prompt-text">
          "{{ exercise.prompt }}"
        </p>
      </div>

      <div class="input-area mt-6">
        <div class="input-wrapper">
          <input
            v-model="response"
            placeholder="Type the precise version..."
            autofocus
            @keyup.enter="handleSubmit"
          >
          <button
            class="button primary"
            @click="handleSubmit"
          >
            Submit
          </button>
        </div>

        <div class="voice-toggle mt-4">
          <VoiceInput @result="handleVoiceResult" />
          <span class="muted small ml-2">Or speak your answer</span>
        </div>
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
        <div class="outcome-badge">
          {{ feedback.outcome }}
        </div>
        <p class="feedback-message">
          {{ feedback.message }}
        </p>

        <div
          v-if="feedback.miniLesson"
          class="mini-lesson mt-4"
        >
          <h3>{{ feedback.miniLesson.title }}</h3>
          <p>{{ feedback.miniLesson.content }}</p>
          <div class="examples">
            <div class="ex wrong">
              ❌ {{ feedback.miniLesson.example.wrong }}
            </div>
            <div class="ex right">
              ✅ {{ feedback.miniLesson.example.right }}
            </div>
          </div>
        </div>

        <button
          class="button primary mt-6"
          @click="$emit('next')"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.precision-drill { max-width: 650px; margin: 0 auto; }
.drill-card { padding: 32px; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.badge { background: #e0f2fe; color: #0369a1; font-size: 10px; padding: 2px 8px; border-radius: 99px; font-weight: 800; text-transform: uppercase; }

.transformation-box { text-align: center; margin-bottom: 32px; background: #f8fafc; padding: 20px; border-radius: 12px; }
.word-path { display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 12px; }
.lazy { font-size: 20px; color: #64748b; text-decoration: line-through; }
.arrow { color: #94a3b8; font-weight: 800; }
.precise { font-size: 24px; color: #0f172a; font-weight: 800; }
.instruction { font-size: 14px; color: #475569; }

.original-sentence { background: #fffdf9; border: 1px solid #fde68a; padding: 20px; }
.prompt-text { font-size: 18px; font-weight: 500; color: #1a1a1a; margin-top: 4px; }

.input-wrapper { display: flex; gap: 12px; }
.input-wrapper input { flex: 1; padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 16px; }
.voice-toggle { display: flex; align-items: center; justify-content: center; }

.feedback-card { padding: 24px; border-left: 6px solid #cbd5e1; }
.feedback-card.correct { border-left-color: #176b5b; }
.feedback-card.acceptable { border-left-color: #f59e0b; }
.feedback-card.retry { border-left-color: #ef4444; }

.mini-lesson { background: #fdfaf3; padding: 16px; border-radius: 12px; }
.mini-lesson h3 { font-size: 16px; margin-bottom: 8px; color: #854d0e; }
.mini-lesson p { font-size: 14px; color: #713f12; margin-bottom: 12px; }
.examples { font-family: monospace; font-size: 13px; }
.ex { margin-bottom: 4px; }

.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
.ml-2 { margin-left: 8px; }
</style>
