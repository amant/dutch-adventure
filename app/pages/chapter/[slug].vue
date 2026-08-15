<script setup lang="ts">
import { getChapter } from '~/data/chapters';

const route = useRoute();
const chapter = getChapter(String(route.params.slug));
if (!chapter) throw createError({ statusCode: 404, statusMessage: 'Chapter not found' });
const session = useChapterSession(chapter);
const feedback = ref<ReturnType<typeof session.submit>>();

const timeLeft = ref<number | null>(null);
let timerInterval: any = null;

const startTimer = () => {
  if (timerInterval) clearInterval(timerInterval);
  if (session.exercise.value?.automaticitySeconds) {
    timeLeft.value = session.exercise.value.automaticitySeconds;
    timerInterval = setInterval(() => {
      if (timeLeft.value !== null && timeLeft.value > 0) {
        timeLeft.value--;
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);
  } else {
    timeLeft.value = null;
  }
};

watch([() => session.exercise.value?.id, feedback], () => {
  if (session.exercise.value && !feedback.value) {
    startTimer();
  } else {
    clearInterval(timerInterval);
    timeLeft.value = null;
  }
}, { immediate: true });

onUnmounted(() => clearInterval(timerInterval));

onMounted(session.hydrate);
function submit(answerOrContext?: string | any) {
  const answer = typeof answerOrContext === 'string'
    ? answerOrContext
    : undefined;

  const extraContext = typeof answerOrContext === 'object' && answerOrContext !== null
    ? answerOrContext
    : {};

  feedback.value = session.submit(answer, {
    timeLeft: timeLeft.value ?? undefined,
    ...extraContext,
  });
}
const achievedGoalIds = ref<Set<string>>(new Set());
watch(() => session.exercise.value?.id, () => achievedGoalIds.value.clear());
watch(feedback, (f) => {
  if (f?.achievedGoalIds) {
    f.achievedGoalIds.forEach(id => achievedGoalIds.value.add(id));
  }
});

const allGoalsMet = computed(() => {
  if (session.exercise.value?.kind !== 'conversation') return true;
  const goals = session.exercise.value.missionGoals;
  if (!goals?.length) return true;
  return goals.every(g => achievedGoalIds.value.has(g.id));
});

function next() {
  feedback.value = undefined;
  session.advance();
}
</script>

<template>
  <section
    v-if="session?.state?.value?.completed"
    class="card completion"
  >
    <div class="eyebrow">
      Loop complete
    </div>
    <h1>You practised a real capability.</h1>
    <p class="muted">
      You worked on {{ chapter.capability }} Your next review item is the same pattern in a fresh context.
    </p>

    <div
      v-if="chapter.relatedArticleSlug"
      class="related-article-cta"
    >
      <div class="eyebrow">
        Next step: Real Dutch
      </div>
      <h3>Apply this in context</h3>
      <p>We found an article that uses similar language. Try reading it to see these patterns "in the wild".</p>
      <NuxtLink
        :to="`/reading/${chapter.relatedArticleSlug}`"
        class="button secondary"
      >Read Related Article</NuxtLink>
    </div>

    <div class="completion-actions">
      <NuxtLink
        class="button"
        to="/progress"
      >See your progress</NuxtLink>
      <NuxtLink
        class="button secondary"
        to="/"
      >Back to Home</NuxtLink>
    </div>
  </section>
  <section
    v-else-if="session?.stage?.value && session?.exercise?.value"
    class="session"
  >
    <div class="session-head">
      <span class="eyebrow">Stage {{ session.state.value.stageIndex + 1 }} of {{ chapter.stages.length }}</span>
      <div
        v-if="timeLeft !== null"
        class="timer"
        :class="{ urgent: timeLeft < 5 }"
      >
        <span class="icon">⏱️</span> {{ timeLeft }}s
      </div>
      <span>{{ session.stage.value.title }}</span>
    </div>
    <div class="progress-track">
      <div :style="{ width: `${((session.state.value.stageIndex + 1) / chapter.stages.length) * 100}%` }" />
    </div>
    <article class="card exercise">
      <div class="eyebrow">
        {{ session.stage.value.kind }}
      </div>
      <p class="muted">
        {{ session.stage.value.intro }}
      </p>

      <div
        v-if="session.exercise.value.kind === 'induction'"
        class="renderer"
      >
        <PatternInduction
          :exercise="session.exercise.value"
          @submit="(answer) => submit(answer)"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'understatement-drill'"
        class="renderer"
      >
        <UnderstatementDrill
          v-model="session.response.value"
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'er-drill'"
        class="renderer"
      >
        <ErPositionDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'pronominal-drill'"
        class="renderer"
      >
        <PronominalDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'nominalisation-drill'"
        class="renderer"
      >
        <NominalisationDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'passive-drill'"
        class="renderer"
      >
        <PassiveDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'reported-speech-drill'"
        class="renderer"
      >
        <ReportedSpeechDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'relative-clause-drill'"
        class="renderer"
      >
        <RelativeClauseDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'infinitive-drill'"
        class="renderer"
      >
        <InfinitiveDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'double-infinitive-drill'"
        class="renderer"
      >
        <DoubleInfinitiveDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'concession-drill'"
        class="renderer"
      >
        <ConcessionDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'participial-drill'"
        class="renderer"
      >
        <ParticipialDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'correlative-drill'"
        class="renderer"
      >
        <CorrelativeDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'conditional-drill'"
        class="renderer"
      >
        <ConditionalDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'causality-drill'"
        class="renderer"
      >
        <CausalityDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'prefix-verb-drill'"
        class="renderer"
      >
        <PrefixVerbDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'midfield-drill'"
        class="renderer"
      >
        <MidfieldDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'fixed-preposition-drill'"
        class="renderer"
      >
        <FixedPrepositionDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'pronominal-splitting-drill'"
        class="renderer"
      >
        <PronominalSplittingDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'aspect-drill'"
        class="renderer"
      >
        <AspectDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'modal-particle-drill'"
        class="renderer"
      >
        <ModalParticleDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'topicalisation-drill'"
        class="renderer"
      >
        <TopicalisationDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'reframing-drill'"
        class="renderer"
      >
        <ReframingDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'cohesion-drill'"
        class="renderer"
      >
        <CohesionDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'correction-challenge'"
        class="renderer"
      >
        <CorrectionChallenge
          :exercise="session.exercise.value"
          @submit="submit"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'circumlocution'"
        class="renderer"
      >
        <CircumlocutionChallenge
          :exercise="session.exercise.value"
          @submit="submit"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'inference-challenge'"
        class="renderer"
      >
        <InferenceChallenge
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'precision-drill'"
        class="renderer"
      >
        <PrecisionDrill
          v-model="session.response.value"
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'nuance-drill'"
        class="renderer"
      >
        <NuanceDrill
          :exercise="session.exercise.value"
          @submit="submit"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'mirroring'"
        class="renderer"
      >
        <NativeMirroring
          v-model="session.response.value"
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'collocation-drill'"
        class="renderer"
      >
        <CollocationDrill
          :exercise="session.exercise.value"
          @submit="submit"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'listening' || session.exercise.value.kind === 'listening-cloze'"
        class="renderer"
      >
        <ListeningLadder
          v-model="session.response.value"
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'personalise'"
        class="renderer"
      >
        <PersonalisationExercise
          v-model="session.response.value"
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'conversation' || session.exercise.value.kind === 'debate'"
        class="renderer"
      >
        <CapstoneMission
          v-if="chapter.isCapstone"
          v-model="session.response.value"
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
        />
        <MissionSimulator
          v-else
          v-model="session.response.value"
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'reading'"
        class="renderer"
      >
        <ReadingLadder
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'transformation'"
        class="renderer"
      >
        <TransformationDrill
          v-model="session.response.value"
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'flexibility'"
        class="renderer"
      >
        <FlexibilityDrill
          v-model="session.response.value"
          :exercise="session.exercise.value"
          :disabled="!!feedback"
          @submit="submit"
        />
        <button
          v-if="!feedback"
          class="button"
          @click="submit"
        >
          Check flexibility
        </button>
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'challenge'"
        class="renderer"
      >
        <FinalChallenge
          v-model="session.response.value"
          :exercise="session.exercise.value"
          :disabled="!!feedback"
          @submit="submit"
        />
        <button
          v-if="!feedback"
          class="button"
          @click="submit"
        >
          Submit Final Mission
        </button>
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'speed-drill'"
        class="renderer"
      >
        <SpeedDrill
          :key="`${session.exercise.value.id}-${feedback ? 'feedback' : 'active'}`"
          v-model="session.response.value"
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'pragmatic-drill'"
        class="renderer"
      >
        <PragmaticDrill
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="(val) => { session.response.value = val; submit() }"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'formality-drill'"
        class="renderer"
      >
        <FormalityDrill
          :exercise="session.exercise.value"
          @submit="(val) => { session.response.value = val; submit() }"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'mediation'"
        class="renderer"
      >
        <MediationChallenge
          v-model="session.response.value"
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'connector-drill'"
        class="renderer"
      >
        <ConnectorDrill
          v-model="session.response.value"
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'fluency-challenge'"
        class="renderer"
      >
        <FluencyChallenge
          v-model="session.response.value"
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next="next"
          @retry="feedback = undefined"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'recombination-drill'"
        class="renderer"
      >
        <RecombinationDrill
          v-model="session.response.value"
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
        />
      </div>

      <div
        v-else-if="session.exercise.value.kind === 'morphing-drill'"
        class="renderer"
      >
        <MorphingDrill
          v-model="session.response.value"
          :exercise="session.exercise.value"
          :feedback="feedback"
          @submit="submit"
          @next-step="feedback = undefined"
        />
      </div>

      <div
        v-else
        class="default-renderer"
      >
        <h2>{{ session.exercise.value.prompt }}</h2>
        <pre v-if="session.exercise.value.context">{{ session.exercise.value.context }}</pre>

        <form
          v-if="session.exercise.value.kind === 'typed' && !feedback"
          @submit.prevent="submit"
        >
          <textarea
            v-model="session.response.value"
            :placeholder="session.exercise.value.placeholder"
            rows="4"
            autofocus
          />
          <div class="typed-actions">
            <VoiceInput @result="(t) => { session.response.value = t; submit({ isSpeaking: true }) }" />
            <button
              class="button"
              type="submit"
            >
              Check answer
            </button>
          </div>
        </form>

        <button
          v-else-if="!feedback"
          class="button"
          @click="next"
        >
          I’m ready to continue
        </button>
      </div>

      <div
        v-if="feedback && (session.exercise.value.kind !== 'conversation' || allGoalsMet)"
        class="feedback"
        :class="feedback.outcome"
      >
        <strong>{{ feedback.outcome === 'retry' ? 'Try once more' : feedback.outcome === 'acceptable' ? 'That works' : 'Correct' }}</strong>
        <p>{{ feedback.message }}</p>
        <p v-if="feedback.target">
          <b>Useful answer:</b> {{ feedback.target }}
        </p>
        <p
          v-if="feedback.explanation"
          class="muted"
        >
          {{ feedback.explanation }}
        </p>

        <div
          v-if="feedback.miniLesson"
          class="mini-lesson card"
        >
          <div class="tag">
            60-second Lesson
          </div>
          <h3>{{ feedback.miniLesson.title }}</h3>
          <p>{{ feedback.miniLesson.content }}</p>
          <div class="comparison">
            <div class="wrong">
              ❌ {{ feedback.miniLesson.example.wrong }}
            </div>
            <div class="right">
              ✅ {{ feedback.miniLesson.example.right }}
            </div>
          </div>
        </div>

        <PragmaticIndicator
          v-if="feedback.pragmaticScore !== undefined"
          :score="feedback.pragmaticScore"
          :feedback="feedback.pragmaticFeedback"
        />

        <div
          v-if="feedback.teacherCorrection"
          class="teacher-correction card"
        >
          <div class="tag">
            Teacher's Tip
          </div>
          <h3>A more natural way to say it:</h3>
          <TeacherRedline
            :original="session.response.value"
            :corrected="feedback.teacherCorrection.natural"
          />
          <p class="muted">
            {{ feedback.teacherCorrection.explanation }}
          </p>
        </div>

        <div class="actions">
          <button
            v-if="feedback.outcome !== 'retry'"
            class="button"
            @click="next"
          >
            Continue
          </button>
          <button
            v-else
            class="button secondary"
            @click="feedback = undefined"
          >
            Retry
          </button>
        </div>
      </div>
    </article>
  </section>
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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

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
    box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
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

.typed-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
}

.renderer {
  margin: 24px 0;
}

.default-renderer {
  margin: 24px 0;
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

.comparison {
  margin-top: 14px;
  background: $ocean-ice;
  padding: 14px;
  border-radius: $radius-sm;
  font-family: $font-mono;
  font-size: 14px;
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

.natural-text {
  font-size: 19px;
  font-weight: 700;
  color: $gold-dark;
  margin: 12px 0 !important;
  font-style: italic;
}

.wrong {
  color: $battle-red;
  margin-bottom: 6px;
  font-weight: 600;
}

.right {
  color: $sea-emerald-dark;
  font-weight: 600;
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
}

.completion-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 32px;
  flex-wrap: wrap;
}

.related-article-cta {
  background: linear-gradient(135deg, $white-pure 0%, $ocean-ice 100%);
  border: 1.5px solid $ocean-border;
  border-radius: $radius-lg;
  padding: 32px;
  margin: 40px auto;
  max-width: 520px;
  text-align: left;
  box-shadow: $shadow-card;

  h3 {
    margin: 8px 0 12px;
    color: $ocean-dark;
  }

  p {
    font-size: 15px;
    color: $ink-slate;
    margin-bottom: 24px;
  }
}
</style>
