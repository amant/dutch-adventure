<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import type { Exercise, Feedback } from '~/types/learning';
import { speedDrillDuration } from '~/utils/speedDrill';

const props = defineProps<{
  exercise: Exercise;
  feedback?: Feedback;
}>();

const emit = defineEmits(['submit', 'retry']);
const response = defineModel<string>();

const duration = speedDrillDuration(props.exercise.automaticitySeconds);
const timeLeft = ref(duration);
const timerActive = ref(false);
const timeUp = ref(false);
let interval: any;

const startTimer = () => {
  if (props.feedback) return;
  clearInterval(interval);
  timeLeft.value = duration;
  timeUp.value = false;
  timerActive.value = true;
  interval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value -= 0.1;
    } else {
      clearInterval(interval);
      timeLeft.value = 0;
      timerActive.value = false;
      timeUp.value = true;
    }
  }, 100);
};

const handleSubmit = () => {
  clearInterval(interval);
  timerActive.value = false;
  emit('submit');
};

const retry = () => {
  response.value = '';
  emit('retry');
  startTimer();
};

onMounted(() => {
  if (!props.feedback) startTimer();
});

onUnmounted(() => {
  clearInterval(interval);
});

const timerColor = computed(() => {
  if (timeLeft.value > 3) return '#176b5b';
  if (timeLeft.value > 1) return '#d06b3c';
  return '#e63946';
});

const progressWidth = computed(() => {
  return (timeLeft.value / duration) * 100;
});
</script>

<template>
  <div class="speed-drill">
    <div class="timer-container">
      <div
        class="timer-bar"
        :style="{ width: progressWidth + '%', backgroundColor: timerColor }"
      />
    </div>

    <div class="drill-card">
      <div class="eyebrow">
        Quick Recall! ({{ timeLeft.toFixed(1) }}s)
      </div>
      <h2 class="prompt">
        {{ exercise.prompt }}
      </h2>
      <p
        v-if="exercise.context"
        class="context"
      >
        {{ exercise.context }}
      </p>
    </div>

    <form
      v-if="!feedback && !timeUp"
      class="input-area"
      @submit.prevent="handleSubmit"
    >
      <input
        v-model="response"
        type="text"
        placeholder="Type the Dutch equivalent fast..."
        autocomplete="off"
        autofocus
        :disabled="!timerActive"
      >
      <button
        class="button"
        type="submit"
        :disabled="!response || !timerActive"
      >
        Submit
      </button>
    </form>

    <div
      v-if="timeUp && !feedback"
      class="time-up-message"
    >
      <h3>Time's Up!</h3>
      <p>Take your time on the next attempt.</p>
      <button
        class="button"
        type="button"
        @click="retry"
      >
        Try Again
      </button>
    </div>
  </div>
</template>

<style scoped>
.speed-drill {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.timer-container {
  height: 8px;
  background: #eef2f0;
  border-radius: 4px;
  overflow: hidden;
}

.timer-bar {
  height: 100%;
  transition: width 0.1s linear, background-color 0.3s;
}

.drill-card {
  text-align: center;
  padding: 40px;
  background: #f8faf9;
  border-radius: 20px;
  border: 2px solid #eef2f0;
}

.drill-card .prompt {
  font-size: 32px;
  margin: 16px 0;
  color: #20302d;
}

.drill-card .context {
  font-size: 18px;
  color: #687873;
}

.input-area {
  display: flex;
  gap: 12px;
}

.input-area input {
  flex: 1;
  padding: 16px;
  font-size: 20px;
  border: 2px solid #cad6ce;
  border-radius: 12px;
  transition: border-color 0.2s;
}

.input-area input:focus {
  outline: none;
  border-color: #176b5b;
}

.input-area .button {
  padding: 0 32px;
  font-size: 18px;
}

.time-up-message {
  text-align: center;
  padding: 32px;
  background: #fef2f2;
  border: 2px solid #ef4444;
  border-radius: 16px;
}

.time-up-message h3 {
  margin: 0 0 8px;
  color: #ef4444;
}

.time-up-message p {
  margin: 0 0 20px;
  color: #687873;
}
</style>
