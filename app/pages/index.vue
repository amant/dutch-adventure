<script setup lang="ts">
import { opinionChapter } from '~/data/chapters'
import { useChapterSession } from '~/composables/useChapterSession'
const session = useChapterSession(opinionChapter)
onMounted(session.hydrate)
const hasProgress = computed(() => session.state.value.attempts.length > 0 && !session.state.value.completed)
</script>
<template>
  <section class="hero">
    <div class="eyebrow">Dutch you can use</div>
    <h1>Turn what you know into language you can actually use.</h1>
    <p class="muted intro">Short, purposeful practice: notice a pattern, retrieve it, change it, and make it yours.</p>
    <div class="card chapter-card">
      <div class="eyebrow">{{ opinionChapter.level }} capability</div>
      <h2>{{ opinionChapter.title }}</h2>
      <p class="muted">{{ opinionChapter.description }}</p>
      <div class="meta">{{ opinionChapter.stages.length }} stages · {{ opinionChapter.estimatedMinutes }} minutes</div>
      <NuxtLink class="button" :to="`/chapter/${opinionChapter.slug}`">{{ hasProgress ? 'Resume chapter' : 'Start chapter' }}</NuxtLink>
    </div>
  </section>
</template>
<style scoped>
.hero { padding: 45px 0; }.intro { font-size: 19px; max-width: 550px; margin-bottom: 42px; }.chapter-card { max-width: 620px; }.chapter-card h2 { margin: 14px 0 10px; }.meta { color: #687873; font-size: 14px; margin: 22px 0; }
</style>