<script setup lang="ts">
import { diffStrings } from '~/utils/diffStrings'

const props = defineProps<{
  userAnswer: string
  naturalCorrection: string
}>()

const diff = computed(() => diffStrings(props.userAnswer, props.naturalCorrection))
</script>

<template>
  <div class="teacher-redline card">
    <div class="eyebrow">Teacher's Redline</div>
    <div class="diff-view">
      <template v-for="(part, idx) in diff" :key="idx">
        <span :class="part.type">{{ part.value }}</span>
      </template>
    </div>
    <p class="explanation">
      Red indicates your original phrasing. Green shows the natural native-speaker way.
    </p>
  </div>
</template>

<style scoped>
.teacher-redline {
  background: #fdfaf3;
  border-left: 4px solid #176b5b;
}

.diff-view {
  font-size: 18px;
  line-height: 1.6;
  margin: 12px 0;
  white-space: pre-wrap;
}

.removed {
  text-decoration: line-through;
  color: #d06b3c;
  background: #fef1e8;
  padding: 0 2px;
}

.added {
  color: #176b5b;
  background: #eef8f2;
  font-weight: 700;
  padding: 0 2px;
}

.explanation {
  font-size: 12px;
  color: #8a9a94;
  font-style: italic;
  margin: 0;
}
</style>
