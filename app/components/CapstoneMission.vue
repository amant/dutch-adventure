<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Exercise, Feedback } from '~/types/learning';
import MissionSimulator from './MissionSimulator.vue';

const props = defineProps<{
  exercise: Exercise;
  feedback?: Feedback;
}>();

const emit = defineEmits(['submit', 'next', 'retry']);
const response = defineModel<string>();

const isCompleted = ref(false);
const achievedGoalIds = ref<Set<string>>(new Set());

// Track goals locally to show progress
watch(() => props.feedback, (f) => {
  if (f?.achievedGoalIds) {
    f.achievedGoalIds.forEach(id => achievedGoalIds.value.add(id));
  }
}, { immediate: true });

const achievedCount = computed(() => achievedGoalIds.value.size);
const totalGoals = computed(() => props.exercise.missionGoals?.length || 0);
const progressPercent = computed(() => totalGoals.value > 0 ? (achievedCount.value / totalGoals.value) * 100 : 0);

function handleNext() {
  if (progressPercent.value === 100) {
    isCompleted.value = true;
  } else {
    emit('next');
  }
}

function handleClaim() {
  emit('next');
}
</script>

<template>
  <div class="capstone-mission">
    <div class="capstone-header">
      <div class="medal-icon">
        🏅
      </div>
      <div class="header-text">
        <div class="eyebrow">
          Level Capstone
        </div>
        <h3>Capability Assessment</h3>
      </div>
      <div class="overall-progress">
        <div class="progress-label">
          {{ Math.round(progressPercent) }}% Success
        </div>
        <div class="progress-bar-bg">
          <div
            class="progress-bar"
            :style="{ width: `${progressPercent}%` }"
          />
        </div>
      </div>
    </div>

    <div
      v-if="isCompleted"
      class="capstone-completion"
    >
      <div class="celebration">
        🎉
      </div>
      <h2>Capability Mastered!</h2>
      <p>You've successfully demonstrated your ability to handle this complex real-world scenario in Dutch.</p>

      <div class="report-card card">
        <h4>Teacher's Report Card</h4>
        <div class="report-grid">
          <div class="report-item">
            <span class="label">Contextual Mastery</span>
            <span class="value">Excellent</span>
          </div>
          <div class="report-item">
            <span class="label">Naturalness</span>
            <span class="value">B2 Flow</span>
          </div>
          <div class="report-item">
            <span class="label">Goal Completion</span>
            <span class="value">{{ achievedCount }}/{{ totalGoals }}</span>
          </div>
          <div class="report-item">
            <span class="label">Pragmatic Skill</span>
            <span class="value">High</span>
          </div>
        </div>
        <div class="teacher-note mt-4">
          <p><strong>Note:</strong> You navigated the pushbacks with ease and used logical connectors effectively. This is true B2-level communication.</p>
        </div>
      </div>

      <button
        class="button primary large mt-6"
        @click="handleClaim"
      >
        Claim Certificate & Exit
      </button>
    </div>

    <MissionSimulator
      v-else
      v-model="response"
      :exercise="exercise"
      :feedback="feedback"
      @submit="$emit('submit', $event)"
      @next="handleNext"
    />
  </div>
</template>

<style scoped>
.capstone-mission {
  max-width: 800px;
  margin: 0 auto;
}

.capstone-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  background: #fdf2f8;
  padding: 24px;
  border-radius: 20px;
  border: 1px solid #fbcfe8;
}

.medal-icon {
  font-size: 40px;
  background: white;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.header-text h3 { margin: 0; color: #9d174d; }
.header-text .eyebrow { color: #ec4899; }

.overall-progress {
  margin-left: auto;
  text-align: right;
  width: 150px;
}

.progress-label {
  font-size: 12px;
  font-weight: 800;
  color: #9d174d;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.progress-bar-bg {
  height: 8px;
  background: #fce7f3;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #ec4899;
  transition: width 0.5s ease;
}

.capstone-completion {
  text-align: center;
  padding: 40px 20px;
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.celebration { font-size: 64px; margin-bottom: 20px; }

.report-card {
  margin: 32px auto;
  max-width: 500px;
  padding: 32px;
  background: white;
  border: 2px solid #ec4899;
  text-align: left;
}

.report-card h4 {
  margin: 0 0 20px;
  color: #9d174d;
  font-size: 20px;
  border-bottom: 2px solid #fce7f3;
  padding-bottom: 12px;
}

.report-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 16px;
}

.report-item {
  display: flex;
  flex-direction: column;
}

.report-item .label {
  font-size: 11px;
  text-transform: uppercase;
  color: #8a9a94;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.report-item .value {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
}

.teacher-note {
  background: #fdf2f8;
  padding: 16px;
  border-radius: 12px;
  font-size: 14px;
  color: #9d174d;
  line-height: 1.6;
}

.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
.large { padding: 16px 40px; font-size: 18px; font-weight: 800; border-radius: 12px; }
</style>
