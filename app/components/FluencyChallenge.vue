<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { Exercise, Feedback } from '~/types/learning';
import VoiceInput from './VoiceInput.vue';

const props = defineProps<{
  exercise: Exercise;
  feedback?: Feedback;
}>();

const emit = defineEmits(['submit', 'next', 'retry']);
const response = defineModel<string>();

const timeLeft = ref(15); // Default 15 seconds for the whole challenge
const isRunning = ref(false);
const isTimeUp = ref(false);
let timer: any = null;

const startChallenge = () => {
  isRunning.value = true;
  timeLeft.value = props.exercise.automaticitySeconds || 15;
  timer = setInterval(() => {
    timeLeft.value -= 1;
    if (timeLeft.value <= 0) {
      clearInterval(timer);
      isTimeUp.value = true;
      isRunning.value = false;
    }
  }, 1000);
};

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

function handleSubmit() {
  if (timer) clearInterval(timer);
  emit('submit', response.value);
}

function handleVoiceResult(text: string) {
  response.value = text;
  handleSubmit();
}
</script>

<template>
  <div class="fluency-challenge">
    <div
      v-if="!isRunning && !isTimeUp && !feedback"
      class="start-screen card"
    >
      <div class="timer-icon">
        ⚡
      </div>
      <h3>Fluency Challenge</h3>
      <p>Speak the Dutch response as quickly as possible. You have {{ exercise.automaticitySeconds || 15 }} seconds!</p>
      <div class="prompt-preview mt-4">
        <span class="eyebrow">Prompt:</span>
        <p>"{{ exercise.prompt }}"</p>
      </div>
      <button
        class="button primary mt-6"
        @click="startChallenge"
      >
        Start Countdown
      </button>
    </div>

    <div
      v-else
      class="challenge-active"
    >
      <div class="challenge-header">
        <div class="progress-container">
          <div class="time-label">
            {{ timeLeft }}s remaining
          </div>
          <div class="progress-bar-bg">
            <div
              class="progress-bar"
              :style="{ width: `${(timeLeft / (exercise.automaticitySeconds || 15)) * 100}%` }"
              :class="{ warning: timeLeft < 5 }"
            />
          </div>
        </div>
      </div>

      <div
        class="main-prompt card"
        :class="{ 'time-up': isTimeUp }"
      >
        <div class="eyebrow">
          Express this in Dutch:
        </div>
        <h2 class="prompt-text">
          {{ exercise.prompt }}
        </h2>
        <p
          v-if="exercise.context"
          class="context-hint"
        >
          {{ exercise.context }}
        </p>
      </div>

      <div
        v-if="!feedback && !isTimeUp"
        class="input-section"
      >
        <VoiceInput
          v-if="isRunning"
          @result="handleVoiceResult"
        />
        <div class="manual-input mt-4">
          <input
            v-model="response"
            placeholder="Or type quickly..."
            autofocus
            @keyup.enter="handleSubmit"
          >
          <button
            class="button"
            @click="handleSubmit"
          >
            Submit
          </button>
        </div>
      </div>

      <div
        v-if="isTimeUp && !feedback"
        class="time-up-message card"
      >
        <h3>Time's Up!</h3>
        <p>You didn't quite make it this time. In B2, speed is key to flow.</p>
        <button
          class="button secondary"
          @click="$emit('retry')"
        >
          Try Again
        </button>
      </div>

      <div
        v-if="feedback"
        class="feedback-container mt-6"
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
            v-if="feedback.teacherCorrection"
            class="teacher-tip mt-4"
          >
            <span class="eyebrow">Natural Flow</span>
            <p class="natural-text">
              "{{ feedback.teacherCorrection.natural }}"
            </p>
            <p class="tip-explanation">
              {{ feedback.teacherCorrection.explanation }}
            </p>
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
  </div>
</template>

<style scoped>
.fluency-challenge {
  max-width: 600px;
  margin: 0 auto;
}

.start-screen {
  text-align: center;
  padding: 40px;
}

.timer-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.challenge-header {
  margin-bottom: 24px;
}

.progress-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.time-label {
  font-size: 14px;
  font-weight: 800;
  color: #176b5b;
  text-align: right;
}

.progress-bar-bg {
  height: 12px;
  background: #eef2f0;
  border-radius: 6px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #176b5b;
  transition: width 1s linear;
}

.progress-bar.warning {
  background: #ef4444;
}

.main-prompt {
  padding: 32px;
  text-align: center;
  background: white;
  margin-bottom: 24px;
}

.main-prompt.time-up {
  opacity: 0.5;
  filter: grayscale(1);
}

.prompt-text {
  font-size: 32px;
  margin: 16px 0;
  color: #1a1a1a;
}

.context-hint {
  color: #687873;
  font-style: italic;
}

.input-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.manual-input {
  display: flex;
  gap: 10px;
  width: 100%;
}

.manual-input input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #cad6ce;
  border-radius: 8px;
  font-size: 16px;
}

.time-up-message {
  text-align: center;
  border-color: #ef4444;
  background: #fef2f2;
}

.time-up-message h3 { color: #ef4444; }

.feedback-card {
  padding: 24px;
}

.feedback-card.correct { border-left: 6px solid #176b5b; }
.feedback-card.acceptable { border-left: 6px solid #f59e0b; }
.feedback-card.retry { border-left: 6px solid #ef4444; }

.outcome-badge {
  display: inline-block;
  font-size: 10px;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 4px;
  background: #eef2f0;
  font-weight: 700;
  margin-bottom: 12px;
}

.teacher-tip {
  background: #fdfaf3;
  padding: 16px;
  border-radius: 12px;
}

.natural-text {
  font-weight: 700;
  color: #176b5b;
  margin: 4px 0;
}

.tip-explanation {
  font-size: 13px;
  color: #687873;
}

.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
</style>
