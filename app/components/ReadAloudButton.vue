<script setup lang="ts">
const props = defineProps<{
  text: string;
  rate?: number;
}>();

const { isSupported, isSpeaking, toggle } = useDutchSpeech();

const onClick = () => {
  toggle(props.text, { rate: props.rate });
};
</script>

<template>
  <button
    type="button"
    class="button small read-aloud"
    :class="isSpeaking ? 'battle-red' : 'secondary'"
    :disabled="!isSupported"
    :title="isSupported ? (isSpeaking ? 'Stop voorlezen' : 'Lees voor in het Nederlands') : 'Speech synthesis is not supported in this browser'"
    @click="onClick"
  >
    <span v-if="isSpeaking">⏹ Stop voorlezen</span>
    <span v-else>🔊 Lees voor</span>
  </button>
</template>

<style scoped lang="scss">
.read-aloud {
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
}
</style>
