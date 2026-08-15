<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Exercise } from '~/types/learning';
import VoiceInput from './VoiceInput.vue';

const props = defineProps<{
  exercise: Exercise;
}>();

const emit = defineEmits<{
  (e: 'submit', answer: string): void;
}>();

const userText = ref('');
const concept = computed(() => props.exercise.circumlocutionData?.concept || 'Unknown Concept');
const forbidden = computed(() => props.exercise.forbiddenWords || []);

const submit = () => {
  emit('submit', userText.value);
};

const onVoiceResult = (text: string) => {
  userText.value = text;
  submit();
};
</script>

<template>
  <div class="circumlocution-challenge">
    <div class="challenge-header">
      <div class="icon">
        🤐
      </div>
      <div class="header-text">
        <h4>Circumlocution Challenge</h4>
        <p class="muted">
          Describe the concept below without using the word itself or any of the forbidden terms.
        </p>
      </div>
    </div>

    <div class="target-card">
      <div class="label">
        Target Concept
      </div>
      <div class="concept-name">
        {{ concept }}
      </div>
    </div>

    <div
      v-if="forbidden.length > 0"
      class="forbidden-box"
    >
      <div class="label">
        Forbidden Words
      </div>
      <div class="forbidden-list">
        <span
          v-for="word in forbidden"
          :key="word"
          class="forbidden-tag"
        >
          {{ word }}
        </span>
      </div>
    </div>

    <div class="editor-container">
      <div class="label-row">
        <span>Your Description</span>
        <span class="char-count">{{ userText.length }} chars</span>
      </div>
      <textarea
        v-model="userText"
        class="editor"
        rows="5"
        placeholder="Explain what it is in your own words..."
      />

      <div class="voice-row">
        <VoiceInput @result="onVoiceResult" />
        <span class="voice-hint">Or speak your description</span>
      </div>
    </div>

    <div class="actions">
      <button
        class="button primary full-width"
        :disabled="!userText.trim()"
        @click="submit"
      >
        Submit Description
      </button>
    </div>
  </div>
</template>

<style scoped>
.circumlocution-challenge {
  background: white;
  padding: 32px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.challenge-header {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.challenge-header .icon {
  font-size: 24px;
  background: #fef1e8;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.challenge-header h4 {
  margin: 0;
  color: #1e293b;
}

.challenge-header p {
  margin: 4px 0 0;
  font-size: 14px;
}

.target-card {
  background: #f8fafc;
  border: 2px dashed #cbd5e1;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 20px;
}

.target-card .label {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 4px;
}

.concept-name {
  font-size: 24px;
  font-weight: 800;
  color: #176b5b;
}

.forbidden-box {
  background: #fff1f2;
  border: 1px solid #fecdd3;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 24px;
}

.forbidden-box .label {
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 700;
  color: #9f1239;
  margin-bottom: 8px;
}

.forbidden-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.forbidden-tag {
  background: #be123c;
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: line-through;
  opacity: 0.9;
}

.editor-container {
  margin-bottom: 24px;
}

.label-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 8px;
}

.editor {
  width: 100%;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-family: inherit;
  font-size: 16px;
  line-height: 1.6;
  color: #334155;
  background: white;
  resize: none;
  margin-bottom: 12px;
}

.editor:focus {
  outline: none;
  border-color: #176b5b;
}

.voice-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.voice-hint {
  font-size: 13px;
  color: #64748b;
  font-style: italic;
}

.actions {
  display: flex;
  gap: 12px;
}

.full-width {
  width: 100%;
}
</style>
