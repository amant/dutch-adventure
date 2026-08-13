<script setup lang="ts">
const props = defineProps<{
  active?: boolean
}>()

const emit = defineEmits(['result', 'start', 'stop', 'error'])

const isListening = ref(false)
const isSupported = ref(false)
let recognition: any = null

onMounted(() => {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  if (SpeechRecognition) {
    isSupported.value = true
    recognition = new SpeechRecognition()
    recognition.lang = 'nl-NL'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      isListening.value = true
      emit('start')
    }

    recognition.onend = () => {
      isListening.value = false
      emit('stop')
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      emit('result', transcript)
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error)
      emit('error', event.error)
      isListening.value = false
    }
  }
})

function toggleListening() {
  if (!recognition) return
  if (isListening.value) {
    recognition.stop()
  } else {
    recognition.start()
  }
}
</script>

<template>
  <div v-if="isSupported" class="voice-input">
    <button 
      type="button"
      class="mic-button" 
      :class="{ listening: isListening, active: active }"
      @click="toggleListening"
      title="Speak your response"
    >
      <span class="icon">{{ isListening ? '⏹' : '🎤' }}</span>
      <div v-if="isListening" class="pulse"></div>
    </button>
  </div>
</template>

<style scoped>
.voice-input {
  display: inline-flex;
  align-items: center;
}

.mic-button {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #176b5b;
  background: white;
  color: #176b5b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  padding: 0;
  outline: none;
}

.mic-button:hover {
  background: #f0f7f4;
}

.mic-button.listening {
  background: #d06b3c;
  border-color: #d06b3c;
  color: white;
}

.mic-button.active {
  background: #176b5b;
  color: white;
}

.icon {
  font-size: 20px;
  z-index: 2;
}

.pulse {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 50%;
  border: 2px solid #d06b3c;
  animation: pulse 1.5s infinite;
  z-index: 1;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}
</style>
