<script setup lang="ts">
import { lookupWord } from '~/utils/dictionary';

interface SpeechRecognitionAlternativeLike {
  transcript: string;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternativeLike | undefined;
  item?: (index: number) => SpeechRecognitionAlternativeLike | undefined;
}

interface SpeechRecognitionResultListLike {
  length: number;
  [index: number]: SpeechRecognitionResultLike | undefined;
  item?: (index: number) => SpeechRecognitionResultLike | undefined;
}

interface SpeechRecognitionResultEventLike {
  results: SpeechRecognitionResultListLike;
}

interface SpeechRecognitionErrorEventLike {
  error: string;
}

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: SpeechRecognitionResultEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

const props = defineProps<{
  active?: boolean;
  modelValue?: string;
  language?: string;
}>();

const emit = defineEmits(['result', 'start', 'stop', 'error', 'update:modelValue', 'submit']);

const isListening = ref(false);
const isSupported = ref(false);
const errorMessage = ref('');
const transcript = ref('');
let recognition: SpeechRecognitionLike | null = null;
let disposed = false;

interface GlossToken {
  word: string;
  meaning?: string;
}

const gloss = computed<GlossToken[]>(() => {
  const text = transcript.value.trim();
  if (!text) return [];
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => {
      const hint = lookupWord(word);
      return { word, meaning: hint?.meaning };
    });
});

const showResult = computed(() => !isListening.value && !!transcript.value);

function resultAt(list: SpeechRecognitionResultListLike, index: number): SpeechRecognitionResultLike | undefined {
  const direct = list[index];
  if (direct) return direct;
  if (typeof list.item === 'function') return list.item(index);
  return undefined;
}

function alternativeText(result: SpeechRecognitionResultLike, index: number): string {
  const direct = result[index];
  if (direct?.transcript) return direct.transcript;
  if (typeof result.item === 'function') return result.item(index)?.transcript || '';
  return '';
}

function createRecognition(): SpeechRecognitionLike | null {
  const windowWithSpeech = window as unknown as {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  const SpeechRecognition = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;

  const rec = new SpeechRecognition();
  rec.lang = props.language || 'nl-NL';
  // Keep listening across pauses and multiple utterances; the user stops
  // explicitly by clicking the mic again.
  rec.continuous = true;
  // Enable interim results so we can show live feedback while speaking.
  rec.interimResults = true;

  rec.onstart = () => {
    isListening.value = true;
    errorMessage.value = '';
    transcript.value = '';
    emit('start');
  };

  rec.onend = () => {
    if (disposed) return;
    isListening.value = false;
    // Some engines cannot be reliably restarted after ending, so recreate on next use.
    recognition = null;

    const finalText = transcript.value.trim();
    if (finalText) {
      emit('result', finalText);
      emit('update:modelValue', finalText);
      emit('submit', finalText);
    }

    emit('stop');
  };

  rec.onresult = (event) => {
    if (disposed) return;
    const finals: string[] = [];
    let interim = '';

    for (let i = 0; i < event.results.length; i++) {
      const result = resultAt(event.results, i);
      if (!result) continue;
      const text = alternativeText(result, 0).trim();
      if (!text) continue;
      if (result.isFinal) finals.push(text);
      else interim = text;
    }

    transcript.value = [...finals, interim].filter(Boolean).join(' ').trim();
  };

  rec.onerror = (event) => {
    if (disposed) return;
    console.error('Speech recognition error', event.error);
    isListening.value = false;
    recognition = null;
    transcript.value = '';

    if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
      errorMessage.value = 'Microphone access denied. Check your browser permissions.';
    } else if (event.error === 'no-speech') {
      errorMessage.value = 'No speech detected. Please try again.';
    } else if (event.error === 'audio-capture') {
      errorMessage.value = 'No microphone detected.';
    } else {
      errorMessage.value = `Speech recognition failed (${event.error}).`;
    }
    emit('error', event.error);
  };

  return rec;
}

onMounted(() => {
  recognition = createRecognition();
  isSupported.value = !!recognition;
});

onUnmounted(() => {
  disposed = true;
  if (recognition) {
    try {
      recognition.abort();
    } catch {
      // Ignore teardown errors.
    }
  }
  recognition = null;
});

function toggleListening() {
  if (!recognition) {
    recognition = createRecognition();
    if (!recognition) return;
  }

  if (isListening.value) {
    try {
      recognition.stop();
    } catch {
      // stop() can throw if recognition is not active; just reset.
      isListening.value = false;
      recognition = null;
    }
    return;
  }

  try {
    recognition.start();
  } catch (error) {
    // e.g. InvalidStateError when start() is called while already starting.
    isListening.value = false;
    recognition = null;
    errorMessage.value = 'Voice input could not start. Please try again.';
    emit('error', (error as { name?: string })?.name || 'start-failed');
  }
}
</script>

<template>
  <div class="voice-input">
    <div class="voice-row">
      <button
        v-if="isSupported"
        type="button"
        class="mic-button"
        :class="{ listening: isListening, active: active }"
        :title="isListening ? 'Stop listening' : 'Speak your response'"
        :aria-label="isListening ? 'Stop listening' : 'Speak your response'"
        @click="toggleListening"
      >
        <span class="icon">{{ isListening ? '⏹' : '🎤' }}</span>
        <div
          v-if="isListening"
          class="pulse"
        />
      </button>

      <button
        v-else
        type="button"
        class="mic-button mic-button-disabled"
        title="Voice input is not supported in this browser"
        aria-label="Voice input is not supported in this browser"
        disabled
      >
        <span class="icon">🎤</span>
      </button>

      <span
        v-if="isListening"
        class="voice-listening"
      >
        Listening…<span
          v-if="transcript"
          class="voice-interim"
        > {{ transcript }}</span>
      </span>

      <span
        v-if="errorMessage"
        class="voice-error"
        role="alert"
      >
        {{ errorMessage }}
      </span>
    </div>

    <div
      v-if="showResult"
      class="voice-result"
    >
      <div class="voice-result-label">
        🎤 You said
      </div>
      <p class="voice-transcript">
        {{ transcript }}
      </p>
      <div
        v-if="gloss.length"
        class="voice-gloss"
      >
        <span class="gloss-label">Translation</span>
        <div class="gloss-tokens">
          <div
            v-for="(token, index) in gloss"
            :key="index"
            class="gloss-token"
          >
            <span class="gloss-nl">{{ token.word }}</span>
            <span class="gloss-en">{{ token.meaning || '—' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.voice-input {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.voice-row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.mic-button {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid $ocean-primary;
  background: $white-pure;
  color: $ocean-primary;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all $transition-fast;
  padding: 0;
  outline: none;
  box-shadow: 0 2px 6px rgba(0, 102, 204, 0.2);

  &:hover {
    background: $ocean-ice;
    transform: scale(1.05);
  }

  &.listening {
    background: linear-gradient(135deg, $battle-red-vibrant 0%, $battle-red 100%);
    border-color: $battle-red-dark;
    color: $white-pure;
    box-shadow: 0 0 15px rgba(239, 68, 68, 0.6);
  }

  &.active {
    background: $ocean-primary;
    color: $white-pure;
  }
}

.mic-button-disabled {
  opacity: 0.45;
  cursor: not-allowed;
  box-shadow: none;

  &:hover {
    background: $white-pure;
    transform: none;
  }
}

.icon {
  font-size: 20px;
  z-index: 2;
}

.voice-error {
  font-size: 12px;
  line-height: 1.3;
  color: $battle-red-dark;
  max-width: 240px;
}

.pulse {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 50%;
  border: 2px solid $battle-red-vibrant;
  animation: pulse 1.5s infinite;
  z-index: 1;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.6); opacity: 0; }
}

.voice-listening {
  font-size: 13px;
  color: $battle-red-dark;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.voice-interim {
  color: $ocean-primary;
  font-style: italic;
  font-weight: 400;
}

.voice-result {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 320px;
  padding: 12px 14px;
  background: $white-pure;
  border: 1px solid #e1e5de;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.voice-result-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #8a9a94;
}

.voice-transcript {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #20302d;
  line-height: 1.4;
}

.voice-gloss {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-top: 1px dashed #e1e5de;
  padding-top: 8px;
}

.gloss-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #8a9a94;
}

.gloss-tokens {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.gloss-token {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 8px;
  background: $ocean-ice;
  border-radius: 8px;
  min-width: 40px;
}

.gloss-nl {
  font-size: 14px;
  font-weight: 600;
  color: $ocean-primary;
}

.gloss-en {
  font-size: 12px;
  color: #687873;
}
</style>
