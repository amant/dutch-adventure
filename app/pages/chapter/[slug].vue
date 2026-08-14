<script setup lang="ts">
import { getChapter } from '~/data/chapters'
import { usePirateGamification } from '~/composables/usePirateGamification'

const route = useRoute()
const chapter = getChapter(String(route.params.slug))
if (!chapter) throw createError({ statusCode: 404, statusMessage: 'Chapter not found' })
const session = useChapterSession(chapter)
const { addBounty } = usePirateGamification()
const feedback = ref<ReturnType<typeof session.submit>>()

const timeLeft = ref<number | null>(null)
let timerInterval: any = null

const startTimer = () => {
  if (timerInterval) clearInterval(timerInterval)
  if (session.exercise.value?.automaticitySeconds) {
    timeLeft.value = session.exercise.value.automaticitySeconds
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

watch([() => session.exercise.value?.id, feedback], () => {
  if (session.exercise.value && !feedback.value) {
    startTimer()
  } else {
    clearInterval(timerInterval)
    timeLeft.value = null
  }
}, { immediate: true })

onUnmounted(() => clearInterval(timerInterval))

onMounted(session.hydrate)

function submit(extraContext?: any) { 
  feedback.value = session.submit(undefined, { 
    timeLeft: timeLeft.value ?? undefined,
    ...extraContext
  }) 
}

const achievedGoalIds = ref<Set<string>>(new Set())
watch(() => session.exercise.value?.id, () => achievedGoalIds.value.clear())
watch(feedback, (f) => {
  if (f?.achievedGoalIds) {
    f.achievedGoalIds.forEach(id => achievedGoalIds.value.add(id))
  }
})

const allGoalsMet = computed(() => {
  if (session.exercise.value?.kind !== 'conversation') return true
  const goals = session.exercise.value.missionGoals
  if (!goals?.length) return true
  return goals.every(g => achievedGoalIds.value.has(g.id))
})

function next() { 
  feedback.value = undefined
  session.advance()
  if (session.state.value.completed) {
    const reward = chapter?.isCapstone ? 5000000 : 500000
    addBounty(reward)
  }
}
</script>
<template>
  <section v-if="session.state.value.completed" class="card completion anime-card">
    <div class="completion-header">
      <ComicSoundBadge text="MISSIE VOLTOOID! 🏆" variant="gold" size="md" />
    </div>
    <h1 class="completion-title">Eiland Veroverd!</h1>
    <p class="muted">
      Geweldig gedaan, piraat! Je hebt de vaardigheid <strong>"{{ chapter.capability }}"</strong> met succes getraind.
      Je premie is verhoogd!
    </p>

    <div class="bounty-reward-banner">
      <span class="reward-tag">PREMIE VERDIEND:</span>
      <span class="reward-val gold-text">+ ฿ {{ (chapter.isCapstone ? 5000000 : 500000).toLocaleString('nl-NL') }}</span>
    </div>
    
    <div v-if="chapter.relatedArticleSlug" class="related-article-cta anime-card">
      <div class="eyebrow">VOLGENDE STAP: ECHT NEDERLANDS</div>
      <h3>Pas dit toe in authentieke tekst</h3>
      <p>We hebben een krantenartikel gevonden dat vergelijkbare structuren gebruikt op zee.</p>
      <NuxtLink :to="`/reading/${chapter.relatedArticleSlug}`" class="anime-btn secondary">Lees Verwante Artikel</NuxtLink>
    </div>

    <div class="completion-actions">
      <NuxtLink class="anime-btn gold" to="/progress">Bekijk je Haki & Premie ⚡</NuxtLink>
      <NuxtLink class="anime-btn secondary" to="/map">Terug naar de Zeekaart 🗺️</NuxtLink>
    </div>
  </section>
  <section v-else-if="session.stage.value && session.exercise.value" class="session">
    <div class="session-head">
      <span class="eyebrow">Etappe {{ session.state.value.stageIndex + 1 }} van {{ chapter.stages.length }}</span>
      <div v-if="timeLeft !== null" class="timer" :class="{ urgent: timeLeft < 5 }">
        <span class="icon">⏱️</span> {{ timeLeft }}s
      </div>
      <span class="stage-title-tag">{{ session.stage.value.title }}</span>
    </div>
    <div class="progress-track"><div :style="{ width: `${((session.state.value.stageIndex + 1) / chapter.stages.length) * 100}%` }" /></div>
    <article class="card exercise anime-card">
      <div class="exercise-badge-row">
        <span class="eyebrow">{{ session.stage.value.kind }}</span>
        <span class="chapter-level-tag">{{ chapter.level }}</span>
      </div>
      <p class="muted stage-intro">{{ session.stage.value.intro }}</p>
      
      <div v-if="session.exercise.value.kind === 'induction'" class="renderer">
        <PatternInduction 
          :exercise="session.exercise.value" 
          @submit="submit"
        />
      </div>

      <div v-else-if="session.exercise.value.kind === 'understatement-drill'" class="renderer">
        <UnderstatementDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          v-model="session.response.value"
          @submit="submit"
          @next="next"
        />
      </div>

      <div v-else-if="session.exercise.value.kind === 'er-drill'" class="renderer">
        <ErPositionDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div v-else-if="session.exercise.value.kind === 'pronominal-drill'" class="renderer">
        <PronominalDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div v-else-if="session.exercise.value.kind === 'nominalisation-drill'" class="renderer">
        <NominalisationDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div v-else-if="session.exercise.value.kind === 'passive-drill'" class="renderer">
        <PassiveDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div v-else-if="session.exercise.value.kind === 'reported-speech-drill'" class="renderer">
        <ReportedSpeechDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div v-else-if="session.exercise.value.kind === 'relative-clause-drill'" class="renderer">
        <RelativeClauseDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div v-else-if="session.exercise.value.kind === 'infinitive-drill'" class="renderer">
        <InfinitiveDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div v-else-if="session.exercise.value.kind === 'double-infinitive-drill'" class="renderer">
        <DoubleInfinitiveDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div v-else-if="session.exercise.value.kind === 'concession-drill'" class="renderer">
        <ConcessionDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div v-else-if="session.exercise.value.kind === 'reframing-drill'" class="renderer">
        <ReframingDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div v-else-if="session.exercise.value.kind === 'cohesion-drill'" class="renderer">
        <CohesionDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div v-else-if="session.exercise.value.kind === 'correction-challenge'" class="renderer">
        <CorrectionChallenge
          :exercise="session.exercise.value"
          @submit="submit"
        />
      </div>

      <div v-else-if="session.exercise.value.kind === 'circumlocution'" class="renderer">
        <CircumlocutionChallenge
          :exercise="session.exercise.value"
          @submit="submit"
        />
      </div>

      <div v-else-if="session.exercise.value.kind === 'inference-challenge'" class="renderer">
        <InferenceChallenge
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div v-else-if="session.exercise.value.kind === 'precision-drill'" class="renderer">
        <PrecisionDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          v-model="session.response.value"
          @submit="submit"
          @next="next"
        />
      </div>

      <div v-else-if="session.exercise.value.kind === 'nuance-drill'" class="renderer">
        <NuanceDrill
          :exercise="session.exercise.value"
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

      <div v-else-if="session.exercise.value.kind === 'collocation-drill'" class="renderer">
        <CollocationDrill
          :exercise="session.exercise.value"
          @submit="submit"
        />
      </div>

      <div v-else-if="session.exercise.value.kind === 'listening' || session.exercise.value.kind === 'listening-cloze'" class="renderer">
        <ListeningLadder 
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

      <div v-else-if="session.exercise.value.kind === 'conversation' || session.exercise.value.kind === 'debate'" class="renderer">
        <CapstoneMission 
          v-if="chapter.isCapstone"
          :exercise="session.exercise.value" 
          v-model="session.response.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
        <MissionSimulator 
          v-else
          :exercise="session.exercise.value" 
          v-model="session.response.value"
          :feedback="feedback"
          @submit="submit"
        />
      </div>

      <div v-else-if="session.exercise.value.kind === 'reading'" class="renderer">
        <ReadingLadder 
          :exercise="session.exercise.value" 
          :feedback="feedback"
          @submit="submit"
        />
      </div>

      <div v-else-if="session.exercise.value.kind === 'transformation'" class="renderer">
        <TransformationDrill 
          :exercise="session.exercise.value" 
          v-model="session.response.value"
          :feedback="feedback"
          @submit="submit"
        />
      </div>

      <div v-else-if="session.exercise.value.kind === 'flexibility'" class="renderer">
        <FlexibilityDrill 
          :exercise="session.exercise.value" 
          v-model="session.response.value"
          :disabled="!!feedback"
          @submit="submit"
        />
        <button v-if="!feedback" class="anime-btn gold" @click="submit">Controleer flexibiliteit</button>
      </div>

      <div v-else-if="session.exercise.value.kind === 'challenge'" class="renderer">
        <FinalChallenge 
          :exercise="session.exercise.value" 
          v-model="session.response.value"
          :disabled="!!feedback"
          @submit="submit"
        />
        <button v-if="!feedback" class="anime-btn red" @click="submit">Stuur Finale Missie In</button>
      </div>

      <div v-else-if="session.exercise.value.kind === 'speed-drill'" class="renderer">
        <SpeedDrill 
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

      <div v-else-if="session.exercise.value.kind === 'formality-drill'" class="renderer">
        <FormalityDrill 
          :exercise="session.exercise.value" 
          @submit="(val) => { session.response.value = val; submit() }"
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

      <div v-else-if="session.exercise.value.kind === 'morphing-drill'" class="renderer">
        <MorphingDrill 
          :exercise="session.exercise.value" 
          v-model="session.response.value"
          :feedback="feedback"
          @submit="submit"
          @next-step="feedback = undefined"
        />
      </div>

      <div v-else class="default-renderer">
        <h2>{{ session.exercise.value.prompt }}</h2>
        <pre v-if="session.exercise.value.context">{{ session.exercise.value.context }}</pre>
        
        <form v-if="session.exercise.value.kind === 'typed' && !feedback" @submit.prevent="submit">
          <textarea v-model="session.response.value" :placeholder="session.exercise.value.placeholder" rows="4" autofocus />
          <div class="typed-actions">
            <VoiceInput @result="(t) => { session.response.value = t; submit({ isSpeaking: true }) }" />
            <button class="anime-btn red" type="submit">Controleer antwoord ⚔️</button>
          </div>
        </form>
        
        <button v-else-if="!feedback" class="anime-btn gold" @click="next">Ik ben klaar om door te varen ⛵</button>
      </div>

      <div v-if="feedback && (session.exercise.value.kind !== 'conversation' || allGoalsMet)" class="feedback anime-card" :class="feedback.outcome">
        <div class="feedback-heading-row">
          <strong>{{ feedback.outcome === 'retry' ? 'Probeer nogmaals! ⚠️' : feedback.outcome === 'acceptable' ? 'Dat werkt! 👍' : 'Uitstekend! 💥' }}</strong>
          <ComicSoundBadge v-if="feedback.outcome === 'correct'" text="DON!! 🎯" variant="gold" size="sm" />
        </div>
        <p>{{ feedback.message }}</p>
        <p v-if="feedback.target"><b>Natuurlijk antwoord:</b> {{ feedback.target }}</p>
        <p v-if="feedback.explanation" class="muted">{{ feedback.explanation }}</p>
        
        <div v-if="feedback.miniLesson" class="mini-lesson card anime-card">
          <div class="tag">60-seconden Taalles</div>
          <h3>{{ feedback.miniLesson.title }}</h3>
          <p>{{ feedback.miniLesson.content }}</p>
          <div class="comparison">
            <div class="wrong">❌ {{ feedback.miniLesson.example.wrong }}</div>
            <div class="right">✅ {{ feedback.miniLesson.example.right }}</div>
          </div>
        </div>

        <PragmaticIndicator 
          v-if="feedback.pragmaticScore !== undefined" 
          :score="feedback.pragmaticScore" 
          :feedback="feedback.pragmaticFeedback" 
        />

        <div v-if="feedback.teacherCorrection" class="teacher-correction card anime-card">
          <div class="tag">Coach Tip</div>
          <h3>Een meer natuurlijke manier:</h3>
          <TeacherRedline 
            :userAnswer="session.response.value" 
            :naturalCorrection="feedback.teacherCorrection.natural" 
          />
          <p class="muted">{{ feedback.teacherCorrection.explanation }}</p>
        </div>

        <div class="actions">
          <button v-if="feedback.outcome !== 'retry'" class="anime-btn gold" @click="next">Volgende Etappe ⛵</button>
          <button v-else class="anime-btn secondary" @click="feedback = undefined">Opnieuw Proberen 🔄</button>
        </div>
      </div>
    </article>
  </section>
</template>
<style lang="scss" scoped>
.session { max-width: 840px; margin: auto; }
.session-head { display:flex; justify-content:space-between; color: $ink-dark; margin-bottom:12px; align-items: baseline; }
.timer { font-weight: 700; color: $anime-blue-deep; background: $anime-ice; border: 1px solid rgba(2, 132, 199, 0.3); padding: 3px 10px; border-radius: 6px; font-variant-numeric: tabular-nums; box-shadow: 0 1px 4px rgba(15, 23, 42, 0.05); }
.timer.urgent { color: white; background: $battle-red; animation: pulse 1s infinite; border-color: $battle-red-dark; }
@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.6; } 100% { opacity: 1; } }
.progress-track { height: 8px; background: #e2e8f0; border-radius: 4px; margin-bottom: 24px; overflow: hidden; }
.progress-track div { height: 100%; background: linear-gradient(90deg, #0284c7 0%, #38bdf8 100%); border-radius: 4px; transition: width .3s; }

.stage-title-tag {
  font-family: $font-anime-title;
  font-size: 14px;
  font-weight: 800;
  color: $anime-blue-deep;
}

.exercise-badge-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  .chapter-level-tag {
    background: $anime-blue-deep;
    color: white;
    font-family: $font-anime-title;
    font-size: 11px;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 4px;
  }
}

.exercise {
  background: #ffffff;
  border: 1px solid rgba(2, 132, 199, 0.2);
  border-radius: $radius-anime;
  box-shadow: $shadow-anime;
  padding: 28px;
}

.exercise h2 { font-size: clamp(1.6rem, 3.5vw, 2.2rem); margin: 18px 0; color: $anime-navy; }
.exercise pre { white-space: pre-wrap; font: 500 16px/1.7 $font-body; background: $anime-ice; border: 1px solid rgba(2, 132, 199, 0.2); border-radius: 8px; padding: 16px; color: $anime-navy; }
.exercise textarea { width: 100%; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px; font: inherit; resize: vertical; margin-bottom: 14px; background: #ffffff; &:focus { outline: none; border-color: $anime-blue-primary; box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15); } }
.typed-actions { display: flex; justify-content: flex-end; align-items: center; gap: 12px; }

.renderer { margin: 20px 0; }
.default-renderer { margin: 20px 0; }

.feedback { 
  margin-top: 24px; 
  padding: 20px; 
  border-radius: $radius-anime-sm; 
  background: #ffffff; 
  border: 1px solid #e2e8f0;
  box-shadow: $shadow-anime-sm;

  &.retry { background: #fff5f5; border-color: rgba(239, 68, 68, 0.3); }
  &.correct { background: #f0fdf4; border-color: rgba(16, 185, 129, 0.3); }

  .feedback-heading-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  strong { font-size: 18px; color: $anime-navy; font-family: $font-anime-title; font-weight: 800; }
  p { margin: 8px 0; font-size: 14px; line-height: 1.5; color: $ink-dark; }
  .actions { margin-top: 20px; }
}

.mini-lesson { margin: 16px 0; padding: 16px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; text-align: left; }
.mini-lesson h3, .teacher-correction h3 { margin: 6px 0; color: $anime-navy; font-size: 16px; }
.mini-lesson .tag, .teacher-correction .tag { font-size: 10px; font-weight: 800; color: $anime-blue-deep; text-transform: uppercase; font-family: $font-anime-title; }
.comparison { margin-top: 10px; background: #f8fafc; padding: 10px; border-radius: 6px; font-family: monospace; border: 1px solid #e2e8f0; font-size: 13px; }

.teacher-correction { margin: 16px 0; padding: 16px; background: #fffdf5; border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 8px; text-align: left; }
.wrong { color: #dc2626; margin-bottom: 4px; }
.right { color: #16a34a; font-weight: 700; }

.completion { 
  max-width: 680px; 
  margin: 40px auto; 
  text-align: center;
  background: #ffffff;
  border: 1px solid rgba(2, 132, 199, 0.25);
  border-radius: $radius-anime;
  box-shadow: $shadow-anime-lg;
  padding: 36px 28px;

  .completion-title {
    font-size: 2.4rem;
    color: $anime-navy;
    margin: 14px 0 10px;
  }

  .bounty-reward-banner {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: $anime-ice;
    border: 1px solid rgba(245, 158, 11, 0.4);
    border-radius: 8px;
    padding: 8px 18px;
    margin: 16px 0 22px;

    .reward-tag {
      font-family: $font-anime-title;
      color: $anime-blue-deep;
      font-size: 12px;
      font-weight: 800;
    }

    .reward-val {
      font-family: $font-anime-title;
      font-size: 20px;
      font-weight: 900;
      color: $bounty-gold-dark;
    }
  }

  .completion-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    justify-content: center;
    margin-top: 24px;
  }
}

.related-article-cta {
  background: $anime-ice;
  border: 1px solid rgba(2, 132, 199, 0.2);
  border-radius: 8px;
  padding: 20px;
  margin: 24px auto;
  max-width: 500px;
  text-align: left;

  h3 { margin: 6px 0 8px; color: $anime-navy; }
  p { margin: 0 0 14px; font-size: 14px; color: $ink-muted; }
}
</style>