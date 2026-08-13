<script setup lang="ts">
import { useLearnerMemory } from '~/composables/useLearnerMemory'
import { createSmartReviewChapter, createActivationChapter } from '~/utils/exerciseGenerator'
import { useChapterSession } from '~/composables/useChapterSession'

const { getWeakConcepts, getFrontierConcepts, hydrate } = useLearnerMemory()
const route = useRoute()

const chapter = ref<any>(null)
const session = ref<any>(null)
const feedback = ref<any>()

const timeLeft = ref<number | null>(null)
let timerInterval: any = null

const startTimer = () => {
  if (timerInterval) clearInterval(timerInterval)
  if (session.value?.exercise.value?.automaticitySeconds) {
    timeLeft.value = session.value.exercise.value.automaticitySeconds
    timerInterval = setInterval(() => {
      if (timeLeft.value !== null && timeLeft.value > 0) {
        timeLeft.value--
      } else {
        clearInterval(timerInterval)
      }
    }, 1000)
  } else {
    timeLeft.value = null
  }
}

watch([() => session.value?.exercise.value?.id, feedback], () => {
  if (session.value?.exercise.value && !feedback.value) {
    startTimer()
  } else {
    clearInterval(timerInterval)
    timeLeft.value = null
  }
}, { immediate: true })

onUnmounted(() => clearInterval(timerInterval))

onMounted(() => {
  hydrate()
  
  if (route.query.mode === 'activation') {
    const frontier = getFrontierConcepts(3)
    chapter.value = createActivationChapter(frontier.map(f => ({ key: f.key, kind: f.kind as 'vocabulary' | 'grammar' })))
  } else {
    const { vocabulary, grammar } = getWeakConcepts(4)
    if (vocabulary.length === 0 && grammar.length === 0) {
      // Fallback if memory is empty
      chapter.value = createSmartReviewChapter(['zijn', 'wonen'], ['word-order'])
    } else {
      chapter.value = createSmartReviewChapter(vocabulary, grammar)
    }
  }
  
  session.value = useChapterSession(chapter.value)
  session.value.hydrate()
})

function submit() { 
  feedback.value = session.value.submit(undefined, { timeLeft: timeLeft.value ?? undefined }) 
}
function next() { 
  feedback.value = undefined
  session.value.advance() 
}
</script>

<template>
  <div v-if="session">
    <section v-if="session.state.value.completed" class="card completion">
      <div class="eyebrow">Smart Review complete</div>
      <h1>You strengthened your foundations.</h1>
      <p class="muted">These weak concepts have been moved further into your long-term memory.</p>
      <NuxtLink class="button" to="/progress">See your progress</NuxtLink>
    </section>
    
    <section v-else-if="session.stage.value && session.exercise.value" class="session">
      <div class="session-head">
        <span class="eyebrow">Stage {{ session.state.value.stageIndex + 1 }} of {{ chapter.stages.length }}</span>
        <div v-if="timeLeft !== null" class="timer" :class="{ urgent: timeLeft < 5 }">
          <span class="icon">⏱️</span> {{ timeLeft }}s
        </div>
        <span>{{ session.stage.value.title }}</span>
      </div>
      <div class="progress-track"><div :style="{ width: `${((session.state.value.stageIndex + 1) / chapter.stages.length) * 100}%` }" /></div>
      
      <article class="card exercise">
        <div class="eyebrow">{{ session.stage.value.kind }}</div>
        <p class="muted">{{ session.stage.value.intro }}</p>
        
        <div v-if="session.exercise.value.kind === 'conversation'" class="renderer">
          <MissionSimulator 
            :exercise="session.exercise.value" 
            v-model="session.response.value"
            :feedback="feedback"
            @submit="submit"
          />
        </div>

        <div v-else-if="session.exercise.value.kind === 'personalise'" class="renderer">
          <PersonalisationExercise 
            :exercise="session.exercise.value" 
            v-model="session.response.value"
            :feedback="feedback"
            @submit="submit"
          />
        </div>

        <div v-else-if="session.exercise.value.kind === 'speed-drill'" class="renderer">
          <SpeedDrill 
            :exercise="session.exercise.value" 
            v-model="session.response.value"
            :feedback="feedback"
            @submit="submit"
          />
        </div>

        <div v-else-if="session.exercise.value.kind === 'mediation'" class="renderer">
          <MediationChallenge 
            :exercise="session.exercise.value" 
            v-model="session.response.value"
            :feedback="feedback"
            @submit="submit"
          />
        </div>

        <div v-else-if="session.exercise.value.kind === 'connector-drill'" class="renderer">
          <ConnectorDrill 
            :exercise="session.exercise.value" 
            v-model="session.response.value"
            :feedback="feedback"
            @submit="submit"
          />
        </div>

        <div v-else-if="session.exercise.value.kind === 'recombination-drill'" class="renderer">
          <RecombinationDrill 
            :exercise="session.exercise.value" 
            v-model="session.response.value"
            :feedback="feedback"
            @submit="submit"
          />
        </div>

        <div v-else-if="session.exercise.value.kind === 'pragmatic-drill'" class="renderer">
          <PragmaticDrill 
            :exercise="session.exercise.value" 
            :feedback="feedback"
            @submit="(val) => { session.response.value = val; submit() }"
          />
        </div>

        <div v-else class="default-renderer">
          <h2>{{ session.exercise.value.prompt }}</h2>
          <pre v-if="session.exercise.value.context">{{ session.exercise.value.context }}</pre>
          
          <form v-if="session.exercise.value.kind === 'typed' && !feedback" @submit.prevent="submit">
            <textarea v-model="session.response.value" :placeholder="session.exercise.value.placeholder" rows="4" autofocus />
            <button class="button" type="submit">Check answer</button>
          </form>
          
          <button v-else-if="!feedback" class="button" @click="next">I’m ready to continue</button>
        </div>

        <div v-if="feedback" class="feedback" :class="feedback.outcome">
          <strong>{{ feedback.outcome === 'retry' ? 'Try once more' : feedback.outcome === 'acceptable' ? 'That works' : 'Correct' }}</strong>
          <p>{{ feedback.message }}</p>
          <p v-if="feedback.target"><b>Useful answer:</b> {{ feedback.target }}</p>
          
          <div v-if="feedback.miniLesson" class="mini-lesson card">
            <div class="tag">60-second Lesson</div>
            <h3>{{ feedback.miniLesson.title }}</h3>
            <p>{{ feedback.miniLesson.content }}</p>
          </div>

          <PragmaticIndicator 
            v-if="feedback.pragmaticScore !== undefined" 
            :score="feedback.pragmaticScore" 
            :feedback="feedback.pragmaticFeedback" 
          />

          <div v-if="feedback.teacherCorrection" class="teacher-correction card">
            <div class="tag">Teacher's Tip</div>
            <h3>A more natural way to say it:</h3>
            <TeacherRedline 
              :userAnswer="session.response.value" 
              :naturalCorrection="feedback.teacherCorrection.natural" 
            />
            <p class="muted">{{ feedback.teacherCorrection.explanation }}</p>
          </div>

          <div class="actions">
            <button v-if="feedback.outcome !== 'retry'" class="button" @click="next">Continue</button>
            <button v-else class="button secondary" @click="feedback = undefined">Retry</button>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.session { max-width: 760px; margin: auto; }
.session-head { display:flex; justify-content:space-between; color:#687873; margin-bottom:12px; align-items: baseline; }
.timer { font-weight: 700; color: #176b5b; background: #e8f3ec; padding: 2px 8px; border-radius: 6px; font-variant-numeric: tabular-nums; }
.timer.urgent { color: #d06b3c; background: #fef1e8; animation: pulse 1s infinite; }
@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
.progress-track { height:7px; background:#dfe7df; border-radius:9px; margin-bottom:32px; overflow: hidden; }
.progress-track div { height:100%; background:#d06b3c; border-radius:9px; transition:width .3s; }

.exercise h2 { font-size:36px; margin:24px 0; }
.exercise pre { white-space:pre-wrap; font: 500 21px/1.7 'DM Sans',sans-serif; background:#f3f7f2; border-radius:14px; padding:20px; color: #176b5b; }
.exercise textarea { width:100%; border:1px solid #cad6ce; border-radius:12px; padding:15px; font:inherit; resize:vertical; margin-bottom:14px; }

.feedback { margin-top:24px; padding:24px; border-radius:16px; background:#e8f3ec; border: 1px solid #c8e1d3; }
.feedback.retry { background:#fff0e7; border-color: #f7d8c5; }
.feedback strong { font-size:22px; display: block; margin-bottom: 8px; }
.feedback p { margin: 8px 0; font-size: 16px; line-height: 1.5; }
.feedback .actions { margin-top: 20px; }
.mini-lesson { margin: 20px 0; padding: 16px; background: #fff; border: 1px solid #cad6ce; text-align: left; }
.mini-lesson h3 { margin: 8px 0; color: #176b5b; font-size: 18px; }
.mini-lesson .tag { font-size: 11px; font-weight: 700; color: #d06b3c; text-transform: uppercase; }

.teacher-correction { margin: 20px 0; padding: 16px; background: #fefce8; border: 1px solid #fef08a; text-align: left; }
.teacher-correction h3 { margin: 8px 0; color: #176b5b; font-size: 18px; }
.teacher-correction .tag { font-size: 11px; font-weight: 700; color: #d06b3c; text-transform: uppercase; }

.completion { max-width:700px; margin:50px auto; text-align: center; }
.completion h1 { margin: 20px 0; }
.completion .button { margin-top: 30px; }
</style>
