<script setup lang="ts">
import { getChapter } from '~/data/chapters'
const route = useRoute()
const chapter = getChapter(String(route.params.slug))
if (!chapter) throw createError({ statusCode: 404, statusMessage: 'Chapter not found' })
const session = useChapterSession(chapter)
const feedback = ref<ReturnType<typeof session.submit>>()
onMounted(session.hydrate)
function submit() { feedback.value = session.submit() }
function next() { feedback.value = undefined; session.advance() }
</script>
<template>
  <section v-if="session.state.value.completed" class="card completion">
    <div class="eyebrow">Loop complete</div><h1>You practised a real capability.</h1>
    <p class="muted">You worked on {{ chapter.capability }} Your next review item is the same pattern in a fresh context.</p>
    <NuxtLink class="button" to="/progress">See your progress</NuxtLink>
  </section>
  <section v-else-if="session.stage.value && session.exercise.value" class="session">
    <div class="session-head"><span class="eyebrow">Stage {{ session.state.value.stageIndex + 1 }} of {{ chapter.stages.length }}</span><span>{{ session.stage.value.title }}</span></div>
    <div class="progress-track"><div :style="{ width: `${((session.state.value.stageIndex + 1) / chapter.stages.length) * 100}%` }" /></div>
    <article class="card exercise"><div class="eyebrow">{{ session.stage.value.kind }}</div><p class="muted">{{ session.stage.value.intro }}</p><h2>{{ session.exercise.value.prompt }}</h2><pre v-if="session.exercise.value.context">{{ session.exercise.value.context }}</pre>
      <form v-if="session.exercise.value.kind === 'typed' && !feedback" @submit.prevent="submit"><textarea v-model="session.response.value" :placeholder="session.exercise.value.placeholder" rows="4" autofocus /><button class="button" type="submit">Check answer</button></form>
      <button v-else-if="!feedback" class="button" @click="next">I’m ready to continue</button>
      <div v-if="feedback" class="feedback" :class="feedback.outcome"><strong>{{ feedback.outcome === 'retry' ? 'Try once more' : feedback.outcome === 'acceptable' ? 'That works' : 'Correct' }}</strong><p>{{ feedback.message }}</p><p v-if="feedback.target"><b>Useful answer:</b> {{ feedback.target }}</p><p v-if="feedback.explanation" class="muted">{{ feedback.explanation }}</p><button v-if="feedback.outcome !== 'retry'" class="button" @click="next">Continue</button><button v-else class="button secondary" @click="feedback = undefined">Retry</button></div>
    </article>
  </section>
</template>
<style scoped>
.session { max-width: 760px; margin: auto; }.session-head { display:flex; justify-content:space-between; color:#687873; margin-bottom:12px; }.progress-track { height:7px; background:#dfe7df; border-radius:9px; margin-bottom:32px; }.progress-track div { height:100%; background:#d06b3c; border-radius:9px; transition:width .3s; }.exercise h2 { font-size:36px; margin:24px 0; }.exercise pre { white-space:pre-wrap; font: 500 21px/1.7 'DM Sans',sans-serif; background:#f3f7f2; border-radius:14px; padding:20px; }.exercise textarea { width:100%; border:1px solid #cad6ce; border-radius:12px; padding:15px; font:inherit; resize:vertical; margin-bottom:14px; }.feedback { margin-top:24px; padding:20px; border-radius:14px; background:#e8f3ec; }.feedback.retry { background:#fff0e7; }.feedback strong { font-size:20px; }.completion { max-width:700px; margin:50px auto; }
</style>