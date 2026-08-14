<script setup lang="ts">
import { useLearnerMemory } from '~/composables/useLearnerMemory'
import { createSmartReviewChapter, createActivationChapter, createScenarioMission, createSpeedChapter, createFluencyChapter } from '~/utils/exerciseGenerator'
import { useChapterSession } from '~/composables/useChapterSession'

const { getWeakConcepts, getFrontierConcepts, hydrate, memory } = useLearnerMemory()
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
  } else if (route.query.mode === 'fluency') {
    const history: { key: string, prompt: string, snippet: string, type: 'vocabulary' | 'grammar' }[] = []
    Object.entries(memory.value.vocabulary).forEach(([key, state]) => {
      state.usageHistory?.forEach(h => history.push({ key, ...h, type: 'vocabulary' }))
    })
    Object.entries(memory.value.grammar).forEach(([key, state]) => {
      state.usageHistory?.forEach(h => history.push({ key, ...h, type: 'grammar' }))
    })
    chapter.value = createFluencyChapter(history.sort(() => 0.5 - Math.random()).slice(0, 5))
  } else if (route.query.mode === 'speed') {
    const { vocabulary, grammar } = getWeakConcepts(5)
    chapter.value = createSpeedChapter(vocabulary, grammar)
  } else if (route.query.mode === 'sandbox') {
    const scenario = (route.query.scenario as string) || 'Buying coffee'
    const frontier = getFrontierConcepts(5)
    chapter.value = createScenarioMission(scenario, frontier.map(f => ({ key: f.key, kind: f.kind as 'vocabulary' | 'grammar' })))
  } else if (route.query.mode === 'custom') {
    const customExercise = JSON.parse(sessionStorage.getItem('custom-review-exercise') || '{}')
    if (customExercise.id) {
      chapter.value = {
        slug: 'custom-review',
        level: 'B1',
        title: 'Memory Lab Review',
        capability: 'Delayed Retrieval',
        description: 'Reactivating concepts from your history.',
        estimatedMinutes: 5,
        stages: [{
          id: 'stage-6',
          title: 'Stage 6 — Recall',
          kind: 'personalise',
          intro: 'Retrieve this expression you used a few days ago.',
          exercises: [customExercise]
        }]
      }
    }
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

        <div v-else-if="session.exercise.value.kind === 'fluency-challenge'" class="renderer">
          <FluencyChallenge 
            :exercise="session.exercise.value" 
            v-model="session.response.value"
            :feedback="feedback"
            @submit="submit"
            @next="next"
            @retry="feedback = undefined"
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

        <div v-else-if="session.exercise.value.kind === 'mirroring'" class="renderer">
          <NativeMirroring 
            :exercise="session.exercise.value" 
            v-model="session.response.value"
            :feedback="feedback"
            @submit="submit"
            @next="next"
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

<style scoped lang="scss">
.session {
  max-width: 800px;
  margin: 0 auto;
}

.session-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $ink-slate;
  margin-bottom: 14px;
}

.timer {
  font-family: $font-anime;
  font-weight: 800;
  color: $ocean-primary;
  background: $ocean-ice;
  border: 1px solid $ocean-border;
  padding: 4px 12px;
  border-radius: $radius-sm;
  font-variant-numeric: tabular-nums;

  &.urgent {
    color: $battle-red-vibrant;
    background: $battle-red-light;
    border-color: $battle-red-border;
    animation: anime-pulse 0.8s infinite;
  }
}

.progress-track {
  height: 10px;
  background: #e2e8f0;
  border-radius: 999px;
  margin-bottom: 32px;
  overflow: hidden;

  div {
    height: 100%;
    background: linear-gradient(90deg, $ocean-primary 0%, $gold-bright 100%);
    border-radius: 999px;
    box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
    transition: width 0.35s ease;
  }
}

.exercise {
  h2 {
    font-size: clamp(26px, 3.5vw, 36px);
    margin: 20px 0;
    color: $ocean-deepest;
  }

  pre {
    white-space: pre-wrap;
    font-family: $font-sans;
    font-weight: 500;
    font-size: 18px;
    line-height: 1.7;
    background: linear-gradient(135deg, $white-pure 0%, $ocean-ice 100%);
    border: 1.5px solid $ocean-border;
    border-radius: $radius-lg;
    padding: 24px;
    color: $ocean-dark;
  }

  textarea {
    width: 100%;
    border: 1.5px solid #cbd5e1;
    border-radius: $radius-md;
    padding: 16px;
    font-family: $font-sans;
    font-size: 16px;
    resize: vertical;
    margin-bottom: 16px;

    &:focus {
      border-color: $ocean-vibrant;
      box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.18);
    }
  }
}

.feedback {
  margin-top: 28px;
  padding: 26px;
  border-radius: $radius-lg;
  background: linear-gradient(135deg, $white-pure 0%, #ecfdf5 100%);
  border: 1.5px solid $sea-emerald-border;
  box-shadow: $shadow-card;

  &.retry {
    background: linear-gradient(135deg, $white-pure 0%, #fff1f2 100%);
    border-color: $battle-red-border;
  }

  strong {
    font-family: $font-anime;
    font-size: 22px;
    display: block;
    margin-bottom: 8px;
    color: $ocean-deepest;
  }

  p {
    margin: 8px 0;
    font-size: 16px;
    line-height: 1.6;
  }

  .actions {
    margin-top: 20px;
  }
}

.mini-lesson {
  margin: 20px 0;
  padding: 20px;
  background: $white-pure;
  border: 1.5px solid $ocean-border;
  border-radius: $radius-md;
  text-align: left;

  h3 {
    margin: 8px 0;
    color: $ocean-dark;
    font-size: 18px;
  }

  .tag {
    font-family: $font-anime;
    font-size: 11px;
    font-weight: 800;
    color: $gold-deep;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
}

.teacher-correction {
  margin: 20px 0;
  padding: 20px;
  background: linear-gradient(135deg, $parchment-bg 0%, #fef9c3 100%);
  border: 1.5px solid $parchment-border;
  border-radius: $radius-md;
  text-align: left;

  h3 {
    margin: 8px 0;
    color: $gold-dark;
    font-size: 18px;
  }

  .tag {
    font-family: $font-anime;
    font-size: 11px;
    font-weight: 800;
    color: $battle-red-vibrant;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
}

.completion {
  max-width: 720px;
  margin: 40px auto;
  text-align: center;

  h1 {
    margin: 20px 0;
    font-size: clamp(32px, 4vw, 44px);
    color: $ocean-deepest;
  }

  .button {
    margin-top: 30px;
  }
}
</style>
