<script setup lang="ts">
import { articles } from '~/data/articles';
import { useLearnerMemory } from '~/composables/useLearnerMemory';
import { evaluateResponse } from '~/utils/evaluateResponse';
import type { Feedback } from '~/types/learning';
import SummaryChallenge from '~/components/SummaryChallenge.vue';
import TeacherRedline from '~/components/TeacherRedline.vue';
import VoiceInput from '~/components/VoiceInput.vue';

const route = useRoute();
const { memory, hydrate, recordExposure, record } = useLearnerMemory();
onMounted(hydrate);

const article = computed(() => articles.find(a => a.id === route.params.id));

const selectedWord = ref<{ word: string; meaning: string; category?: string } | null>(null);

const tokens = computed(() => {
  if (!article.value) return [];
  const rawTokens = article.value.content.split(/(\s+)/);

  return rawTokens.map((token) => {
    if (token.match(/^\s+$/)) return { text: token, isInteractable: false };

    const cleanWord = token.toLowerCase().replace(/[.,!?;:()]/g, '').trim();
    const hint = article.value ? article.value.wordHints[cleanWord] : undefined;

    // Check memory
    const state = memory.value.vocabulary[cleanWord];
    const mastery = state ? (state.recognition + state.meaning) / 2 : 0;

    return {
      text: token,
      isInteractable: true,
      hint,
      mastery,
      isKnown: mastery > 50,
      isWeak: mastery > 0 && mastery <= 50,
    };
  });
});

const handleWordClick = (token: any) => {
  const cleanWord = token.text.toLowerCase().replace(/[.,!?;:()]/g, '').trim();

  if (token.hint) {
    selectedWord.value = { word: token.text.replace(/[.,!?;:()]/g, '').trim(), ...token.hint };
  } else {
    // Fallback dictionary for common words not in hints
    const fallbackDict: Record<string, string> = {
      'het': 'the (neuter)',
      'de': 'the (masculine/feminine)',
      'is': 'is',
      'vandaag': 'today',
      'mooi': 'beautiful',
      'weer': 'weather',
      'in': 'in',
      'nederland': 'the Netherlands',
      'de zon': 'the sun',
      'warm': 'warm',
      'veel': 'many',
      'mensen': 'people',
      'gaan': 'to go',
      'naar': 'to',
      'park': 'park',
      'maar': 'but',
      'morgen': 'tomorrow',
      'gaat': 'goes',
      'regenen': 'to rain',
      'dat': 'that',
      'nederlands': 'Dutch',
    };

    selectedWord.value = {
      word: token.text.replace(/[.,!?;:()]/g, '').trim(),
      meaning: fallbackDict[cleanWord] || 'No definition found, but we recorded your encounter!',
    };
  }

  recordExposure(cleanWord);
};

const readingFinished = ref(false);
const showChallenge = ref(false);
const currentResponse = ref('');
const feedback = ref<Feedback | undefined>(undefined);

const finishReading = () => {
  readingFinished.value = true;
  if (article.value?.challenge) {
    showChallenge.value = true;
    // Scroll to challenge if it's a summary challenge
    if (article.value.challenge.kind === 'summary-challenge') {
      setTimeout(() => {
        document.querySelector('.summary-challenge-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }
};

const handleChallengeSubmit = (response: string) => {
  if (!article.value?.challenge) return;
  currentResponse.value = response;

  const result = evaluateResponse(article.value.challenge, response);
  feedback.value = result;

  if (result.outcome === 'correct' || result.outcome === 'acceptable') {
    record(
      result.skills,
      result.outcome,
      article.value.challenge.vocabulary,
      article.value.challenge.grammar,
      article.value.challenge.idioms,
      result.changeModifier,
      response,
      article.value.challenge.prompt,
      result,
    );
  }
};

const handleSubmitChallenge = () => {
  handleChallengeSubmit(currentResponse.value);
};

const handleNext = () => {
  showChallenge.value = false;
  navigateTo('/reading');
};
</script>

<template>
  <div
    v-if="article"
    class="article-page"
  >
    <header class="article-header">
      <NuxtLink
        to="/reading"
        class="back-link"
      >← Back to Feed</NuxtLink>
      <div class="meta">
        <span
          class="level-badge"
          :class="article.level"
        >{{ article.level }}</span>
        <span class="source">{{ article.source }}</span>
      </div>
      <h1>{{ article.title }}</h1>
    </header>

    <div class="content-container">
      <div class="article-content card">
        <template
          v-for="(token, idx) in tokens"
          :key="idx"
        >
          <span
            v-if="token.isInteractable"
            class="word"
            :class="{
              'known': token.isKnown,
              'weak': token.isWeak,
              'has-hint': !!token.hint,
              'active': selectedWord?.word.toLowerCase() === token.text.toLowerCase().replace(/[.,!?;:()]/g, '').trim(),
            }"
            @click="handleWordClick(token)"
          >
            {{ token.text }}
          </span>
          <span v-else>{{ token.text }}</span>
        </template>
      </div>

      <div
        v-if="showChallenge && article.challenge?.kind === 'summary-challenge'"
        class="summary-challenge-section mt-10"
      >
        <SummaryChallenge
          :exercise="article.challenge"
          :feedback="feedback"
          @submit="handleChallengeSubmit"
          @next="handleNext"
        />
      </div>

      <aside class="sidebar">
        <div
          v-if="selectedWord"
          class="word-card card"
        >
          <div class="header">
            <h3>{{ selectedWord.word }}</h3>
            <span
              v-if="selectedWord.category"
              class="tag"
            >{{ selectedWord.category }}</span>
          </div>
          <p class="meaning">
            {{ selectedWord.meaning }}
          </p>
          <div class="status-info">
            <span
              v-if="(memory.vocabulary[selectedWord.word.toLowerCase()]?.encounters ?? 0) > 1"
              class="encounters"
            >
              You've seen this {{ memory.vocabulary[selectedWord.word.toLowerCase()]?.encounters }} times
            </span>
            <span
              v-else
              class="new"
            >New word!</span>
          </div>
          <button
            class="close-btn"
            @click="selectedWord = null"
          >
            Close
          </button>
        </div>

        <div class="reading-stats card">
          <h3>Reading Progress</h3>
          <div class="stat-item">
            <span class="label">Known Words</span>
            <span class="value">{{ tokens.filter(t => t.isKnown).length }}</span>
          </div>
          <div class="stat-item">
            <span class="label">New Words Seen</span>
            <span class="value">{{ tokens.filter(t => t.isInteractable && !t.isKnown && !t.isWeak).length }}</span>
          </div>
          <button
            v-if="!readingFinished"
            class="button full-width"
            @click="finishReading"
          >
            Finish Reading
          </button>
          <div
            v-else
            class="finished-state"
          >
            <span class="check">✓</span> Finished! Knowledge graph updated.
          </div>
        </div>

        <div
          v-if="showChallenge && article.challenge && article.challenge.kind !== 'summary-challenge'"
          class="post-reading-challenge card"
        >
          <div class="eyebrow">
            Post-Reading Challenge
          </div>
          <h3>{{ article.challenge.prompt }}</h3>
          <p class="muted">
            {{ article.challenge.context }}
          </p>

          <div class="input-area">
            <textarea
              v-model="currentResponse"
              :placeholder="article.challenge.placeholder || 'Your response...'"
              rows="4"
              :disabled="feedback?.outcome === 'correct'"
            />
            <button
              v-if="feedback?.outcome !== 'correct'"
              class="button full-width"
              @click="handleSubmitChallenge"
            >
              Submit Answer
            </button>
          </div>

          <div
            v-if="feedback"
            class="feedback card"
            :class="feedback.outcome"
          >
            <div class="outcome-header">
              <span class="icon">{{ feedback.outcome === 'correct' ? '🎉' : '⚠️' }}</span>
              {{ feedback.message }}
            </div>

            <div
              v-if="feedback.correction"
              class="correction"
            >
              <TeacherRedline
                :original="currentResponse"
                :corrected="feedback.correction"
              />
            </div>

            <div
              v-if="feedback.outcome === 'correct'"
              class="success-actions"
            >
              <button
                class="button secondary full-width"
                @click="showChallenge = false"
              >
                Back to reading
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
  <div
    v-else
    class="not-found"
  >
    Article not found.
  </div>
</template>

<style scoped lang="scss">
.article-page {
  max-width: 1080px;
  margin: 0 auto;
  padding-bottom: 60px;
}

.article-header {
  margin-bottom: 36px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
  color: $ocean-primary;
  text-decoration: none;
  font-family: $font-anime;
  font-weight: 700;
  font-size: 14px;
  transition: transform $transition-fast;

  &:hover {
    transform: translateX(-4px);
    color: $ocean-dark;
  }
}

.meta {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.level-badge {
  font-family: $font-anime;
  font-size: 11px;
  font-weight: 900;
  padding: 3px 10px;
  border-radius: $radius-sm;
  color: $white-pure;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2);

  &.a1 { background: linear-gradient(135deg, #0284c7 0%, #38bdf8 100%); }
  &.a2 { background: linear-gradient(135deg, #0066cc 0%, #0284c7 100%); }
  &.b1 { background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%); }
  &.b2 { background: linear-gradient(135deg, #b91c1c 0%, #ef4444 100%); }
}

.source {
  font-family: $font-anime;
  font-size: 13px;
  color: $ink-muted;
  font-weight: 700;
  text-transform: uppercase;
}

.content-container {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 32px;
}

.article-content {
  font-size: 19px;
  line-height: 1.8;
  padding: 40px;
  color: $ocean-deepest;
  white-space: pre-wrap;
  background: $white-pure;
  border: 1.5px solid $ocean-border;
  border-radius: $radius-xl;
  box-shadow: $shadow-card;
}

.word {
  cursor: pointer;
  transition: all $transition-fast;
  border-bottom: 1.5px solid transparent;
  padding: 1px 3px;
  border-radius: $radius-xs;

  &:hover {
    background: $ocean-ice;
    color: $ocean-primary;
  }

  &.has-hint {
    border-bottom: 2px dashed rgba(0, 102, 204, 0.4);
  }

  &.known {
    color: $ocean-dark;
    font-weight: 600;
  }

  &.weak {
    color: $gold-deep;
    font-weight: 700;
    border-bottom-color: $gold-bright;
  }

  &.active {
    background: linear-gradient(135deg, $ocean-primary 0%, $ocean-vibrant 100%);
    color: $white-pure !important;
    box-shadow: 0 2px 6px rgba(0, 102, 204, 0.35);
  }
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.word-card {
  background: linear-gradient(135deg, $white-pure 0%, $parchment-bg 100%);
  border: 1.5px solid $gold-bright;
  border-top: 5px solid $gold-parchment;
  border-radius: $radius-xl;
  padding: 24px;
  box-shadow: $shadow-card;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  h3 {
    margin: 0;
    font-size: 18px;
    color: $ocean-deepest;
  }

  .tag {
    font-family: $font-anime;
    font-size: 10px;
    background: $parchment-border;
    color: $gold-dark;
    padding: 2px 8px;
    border-radius: $radius-xs;
    font-weight: 800;
    text-transform: uppercase;
  }

  .meaning {
    margin-bottom: 16px;
    font-size: 15px;
    line-height: 1.5;
    color: $ink-slate;
  }

  .status-info {
    font-size: 12px;
    color: $ink-muted;
    margin-bottom: 16px;
  }

  .close-btn {
    width: 100%;
    padding: 8px;
    border: 1px solid $ocean-border;
    border-radius: $radius-md;
    background: $white-pure;
    cursor: pointer;
    font-size: 13px;
    font-weight: 700;
    color: $ocean-dark;
    transition: all $transition-fast;

    &:hover {
      background: $ocean-ice;
    }
  }
}

.reading-stats {
  padding: 24px;
  border: 1.5px solid $ocean-border;
  border-radius: $radius-xl;
  background: $white-pure;

  h3 {
    font-size: 16px;
    margin-bottom: 20px;
    color: $ocean-deepest;
  }
}

.stat-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;

  .label { color: $ink-muted; font-weight: 600; }
  .value { font-family: $font-anime; font-weight: 800; color: $ocean-primary; }
}

.full-width {
  width: 100%;
  margin-top: 10px;
}

.finished-state {
  margin-top: 20px;
  text-align: center;
  color: $sea-emerald-dark;
  font-weight: 700;
  font-size: 14px;
}

.check {
  font-size: 20px;
}

.post-reading-challenge {
  background: linear-gradient(135deg, $white-pure 0%, $ocean-ice 100%);
  border: 1.5px solid $ocean-border;
  border-radius: $radius-xl;
  padding: 24px;

  h3 {
    font-size: 18px;
    margin: 12px 0 8px;
    color: $ocean-deepest;
  }

  .input-area {
    margin-top: 16px;
  }

  textarea {
    width: 100%;
    padding: 12px;
    border: 1.5px solid #cbd5e1;
    border-radius: $radius-md;
    margin-bottom: 12px;
    font-family: inherit;
    resize: vertical;

    &:focus {
      border-color: $ocean-vibrant;
      outline: none;
    }
  }
}

.feedback {
  margin-top: 20px;
  padding: 16px;
  border-radius: $radius-md;

  &.correct {
    background: #ecfdf5;
    border: 1.5px solid $sea-emerald;
    color: $sea-emerald-dark;
  }

  &.retry {
    background: #fff1f2;
    border: 1.5px solid $battle-red-vibrant;
    color: $battle-red-dark;
  }
}

.outcome-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: $font-anime;
  font-weight: 800;
  margin-bottom: 8px;
}

.correction {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);

  .label {
    font-family: $font-anime;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    opacity: 0.8;
  }

  p {
    margin: 4px 0 0;
    font-style: italic;
  }
}

@media (max-width: 800px) {
  .content-container { grid-template-columns: 1fr; }
  .sidebar { order: -1; }
}
</style>
