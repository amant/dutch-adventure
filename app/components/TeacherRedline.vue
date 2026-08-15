<script setup lang="ts">
import { computed } from 'vue';
import { diffStrings } from '~/utils/diffStrings';

const props = defineProps<{
  original: string;
  corrected: string;
}>();

const diff = computed(() => diffStrings(props.original, props.corrected));
</script>

<template>
  <div class="teacher-redline card">
    <div class="eyebrow red">
      Teacher's Redline
    </div>
    <div class="diff-view">
      <template
        v-for="(part, idx) in diff"
        :key="idx"
      >
        <span :class="part.type">{{ part.value }}</span>
      </template>
    </div>
    <p class="explanation">
      Strikethrough red shows literal/stiff phrasing. Emerald shows natural native-speaker flow.
    </p>
  </div>
</template>

<style scoped lang="scss">
.teacher-redline {
  background: linear-gradient(135deg, $white-pure 0%, $parchment-bg 100%);
  border-left: 5px solid $battle-red-vibrant;
  border-radius: $radius-lg;
  padding: 20px;
}

.diff-view {
  font-size: 18px;
  line-height: 1.6;
  margin: 12px 0;
  white-space: pre-wrap;
}

.removed {
  text-decoration: line-through;
  color: $battle-red-dark;
  background: $battle-red-light;
  padding: 1px 4px;
  border-radius: $radius-xs;
}

.added {
  color: $sea-emerald-dark;
  background: $sea-emerald-light;
  font-weight: 800;
  padding: 1px 4px;
  border-radius: $radius-xs;
}

.explanation {
  font-size: 12px;
  color: $ink-muted;
  font-style: italic;
  margin: 0;
}
</style>
