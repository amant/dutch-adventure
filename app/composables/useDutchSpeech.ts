export interface DutchSpeechOptions {
  rate?: number;
}

/**
 * Shared Dutch text-to-speech helper built on the browser's Web Speech API.
 * Speaks text with the `nl-NL` locale and a Dutch voice when one is available,
 * and exposes a simple speak / stop / toggle interface.
 */
export function useDutchSpeech() {
  const isSupported = ref(false);
  const isSpeaking = ref(false);
  const voices = ref<SpeechSynthesisVoice[]>([]);

  // Monotonic id that invalidates in-flight utterance callbacks whenever speech
  // is restarted or stopped, so stale `onend` handlers can't flip `isSpeaking`.
  let sessionId = 0;

  const getSpeechSynthesis = (): SpeechSynthesis | null => {
    if (typeof window === 'undefined') return null;
    if (!window.speechSynthesis) return null;
    return window.speechSynthesis;
  };

  const loadVoices = () => {
    const synth = getSpeechSynthesis();
    if (!synth) return;
    voices.value = synth.getVoices().filter(v => v.lang.toLowerCase().startsWith('nl'));
  };

  const pickVoice = (): SpeechSynthesisVoice | null => {
    const nlNl = voices.value.find(v => v.lang.toLowerCase().startsWith('nl-nl'));
    return nlNl || voices.value[0] || null;
  };

  // Chrome truncates long utterances (~15s), so split into sentences first.
  const splitIntoSentences = (text: string): string[] => {
    const parts = text
      .replace(/\n+/g, ' ')
      .split(/(?<=[.!?])\s+/)
      .map(sentence => sentence.trim())
      .filter(Boolean);
    return parts.length ? parts : [text.trim()].filter(Boolean);
  };

  const stop = () => {
    sessionId += 1;
    const synth = getSpeechSynthesis();
    if (synth) synth.cancel();
    isSpeaking.value = false;
  };

  const speak = (text: string, options: DutchSpeechOptions = {}) => {
    const synth = getSpeechSynthesis();
    if (!synth || !text?.trim()) return;

    stop();
    const mySession = sessionId;
    const sentences = splitIntoSentences(text);
    const rate = options.rate ?? 0.95;

    let pending = sentences.length;
    isSpeaking.value = pending > 0;

    for (const sentence of sentences) {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = 'nl-NL';
      utterance.rate = rate;
      utterance.voice = pickVoice();

      const onDone = () => {
        if (mySession !== sessionId) return;
        pending -= 1;
        if (pending <= 0) isSpeaking.value = false;
      };
      utterance.onend = onDone;
      utterance.onerror = onDone;

      synth.speak(utterance);
    }
  };

  const toggle = (text: string, options: DutchSpeechOptions = {}) => {
    if (isSpeaking.value) {
      stop();
    } else {
      speak(text, options);
    }
  };

  onMounted(() => {
    const synth = getSpeechSynthesis();
    isSupported.value = !!synth;
    if (!synth) return;
    loadVoices();
    synth.onvoiceschanged = loadVoices;
  });

  onBeforeUnmount(stop);

  return {
    isSupported,
    isSpeaking,
    voices,
    speak,
    stop,
    toggle,
    loadVoices,
  };
}
