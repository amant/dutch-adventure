<script setup lang="ts">
import { useLearnerMemory } from '~/composables/useLearnerMemory';
import { chapters } from '~/data/chapters';
import { getFamilyForWord } from '~/data/wordFamilies';
import type { SkillDimension } from '~/types/learning';

const { memory, hydrate } = useLearnerMemory();
onMounted(hydrate);

const dimensions: { id: SkillDimension; label: string }[] = [
  { id: 'recognition', label: 'Recognition' },
  { id: 'meaning', label: 'Meaning' },
  { id: 'listening', label: 'Listening' },
  { id: 'spelling', label: 'Spelling' },
  { id: 'production', label: 'Production' },
  { id: 'speaking', label: 'Speaking' },
  { id: 'automaticity', label: 'Automaticity' },
  { id: 'coherence', label: 'Coherence' },
  { id: 'idiomatic', label: 'Idiomatic' },
];

const words = computed(() => {
  return Object.entries(memory.value.vocabulary).sort(([a], [b]) => a.localeCompare(b));
});

const selectedWord = ref<string | null>(null);
const selectedState = computed(() => selectedWord.value ? memory.value.vocabulary[selectedWord.value] : null);

const corpusSearch = ref('');

const filteredWords = computed(() => {
  if (!corpusSearch.value) return words.value;
  const q = corpusSearch.value.toLowerCase();
  return words.value.filter(([word, state]) => {
    const inWord = word.toLowerCase().includes(q);
    const inHistory = state.usageHistory?.some(h => h.snippet.toLowerCase().includes(q));
    return inWord || inHistory;
  });
});

const allUsageSnippets = computed(() => {
  if (!corpusSearch.value) return [];
  const q = corpusSearch.value.toLowerCase();
  const snippets: { word: string; snippet: string; date: string }[] = [];

  words.value.forEach(([word, state]) => {
    state.usageHistory?.forEach((h) => {
      if (h.snippet.toLowerCase().includes(q) || word.toLowerCase().includes(q)) {
        snippets.push({ word, ...h });
      }
    });
  });

  return snippets.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

const relatedChapters = computed(() => {
  if (!selectedWord.value) return [];
  const w = selectedWord.value.toLowerCase();
  return chapters.filter(c =>
    c.stages.some(s =>
      s.exercises.some(e => e.vocabulary?.some(vocab => vocab.toLowerCase() === w)),
    ),
  );
});

const collocations = computed(() => {
  if (!selectedWord.value) return [];
  const w = selectedWord.value.toLowerCase();
  const found: string[] = [];

  chapters.forEach((c) => {
    c.stages.forEach((s) => {
      s.exercises.forEach((e) => {
        if (e.kind === 'collocation-drill' && e.context?.toLowerCase().includes(w)) {
          // If the word we selected is the noun, the collocation is target + noun
          if (e.target) {
            found.push(`${e.target} ${e.context}`);
          }
        }
        // Also check if it's explicitly listed in info contexts
        if (e.context?.toLowerCase().includes(w) && e.context.includes(' + ')) {
          const lines = e.context.split('\n');
          lines.forEach((line) => {
            if (line.toLowerCase().includes(w) && line.includes(' ')) {
              found.push(line.replace(/^- /, ''));
            }
          });
        }
      });
    });
  });

  return [...new Set(found)].slice(0, 5);
});

const wordFamily = computed(() => {
  if (!selectedWord.value) return null;
  return getFamilyForWord(selectedWord.value);
});
</script>

<template>
  <section class="vocabulary-view">
    <div class="eyebrow">
      Language Graph
    </div>
    <h1>Vocabulary Library</h1>
    <p class="muted">
      Every word you've encountered and your current mastery across all dimensions.
    </p>

    <div class="search-corpus card">
      <input
        v-model="corpusSearch"
        placeholder="Search words or your own sentences..."
        class="corpus-input"
      >
      <div
        v-if="corpusSearch"
        class="search-meta"
      >
        Found {{ filteredWords.length }} words and {{ allUsageSnippets.length }} snippets
      </div>
    </div>

    <div
      v-if="words.length === 0"
      class="empty-state"
    >
      <p>You haven't encountered any words yet. Start a chapter to build your vocabulary!</p>
      <NuxtLink
        to="/"
        class="button"
      >Browse chapters</NuxtLink>
    </div>

    <div
      v-else
      class="layout"
    >
      <div class="main-content">
        <div
          v-if="corpusSearch && allUsageSnippets.length > 0"
          class="corpus-results"
        >
          <div class="corpus-header">
            <div class="eyebrow">
              Personal Sentence Corpus
            </div>
            <NuxtLink
              :to="{ path: '/smart-review', query: { mode: 'fluency' } }"
              class="button secondary small"
            >
              Practice My Phrases
            </NuxtLink>
          </div>
          <div class="usage-grid">
            <div
              v-for="(h, idx) in allUsageSnippets"
              :key="idx"
              class="card usage-card"
              @click="selectedWord = h.word"
            >
              <p class="snippet">
                "{{ h.snippet }}"
              </p>
              <div class="usage-meta">
                <span class="word-link">{{ h.word }}</span>
                <span class="date">{{ new Date(h.date).toLocaleDateString() }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="word-grid">
          <div
            v-for="[word, state] in filteredWords"
            :key="word"
            class="card word-card"
            :class="{ active: selectedWord === word }"
            @click="selectedWord = word"
          >
            <div class="word-header">
              <div>
                <h3>{{ word }}</h3>
                <div
                  v-if="state.lastEncountered"
                  class="last-seen"
                >
                  Seen {{ new Date(state.lastEncountered).toLocaleDateString() }}
                </div>
              </div>
              <div class="encounter-badge">
                {{ state.successes }}/{{ state.encounters }} hits
              </div>
            </div>
            <div class="mini-graph">
              <div
                v-for="dim in dimensions"
                :key="dim.id"
                class="mini-bar"
                :style="{ height: `${state[dim.id] || 0}%`, opacity: 0.3 + ((state[dim.id] || 0) / 150) }"
                :title="dim.label"
              />
            </div>
          </div>
        </div>
      </div>

      <aside
        v-if="selectedWord && selectedState"
        class="detail-panel card"
      >
        <div class="detail-header">
          <h2>{{ selectedWord }}</h2>
          <button
            class="close-btn"
            @click="selectedWord = null"
          >
            ×
          </button>
        </div>

        <div class="dimensions-detail">
          <div
            v-for="dim in dimensions"
            :key="dim.id"
            class="dimension-row"
          >
            <span class="dim-label">{{ dim.label }}</span>
            <div class="dim-bar-container">
              <div
                class="dim-bar"
                :style="{ width: `${selectedState[dim.id] || 0}%` }"
              />
            </div>
            <span class="dim-value">{{ selectedState[dim.id] || 0 }}%</span>
          </div>
        </div>

        <div
          v-if="selectedState.usageHistory && selectedState.usageHistory.length > 0"
          class="history-section"
        >
          <div class="section-header">
            <div class="eyebrow">
              Usage History
            </div>
            <NuxtLink
              :to="{ path: '/smart-review', query: { mode: 'fluency' } }"
              class="practice-link"
            >
              Automate this word
            </NuxtLink>
          </div>
          <ul class="usage-list">
            <li
              v-for="(h, idx) in selectedState.usageHistory"
              :key="idx"
              class="usage-item"
            >
              <p class="snippet">
                "{{ h.snippet }}"
              </p>
              <span class="date">{{ new Date(h.date).toLocaleDateString() }}</span>
            </li>
          </ul>
        </div>

        <div
          v-if="collocations.length > 0"
          class="collocations-section"
        >
          <div class="eyebrow">
            Common Collocations
          </div>
          <div class="coll-list">
            <div
              v-for="coll in collocations"
              :key="coll"
              class="coll-item"
            >
              {{ coll }}
            </div>
          </div>
        </div>

        <div
          v-if="wordFamily"
          class="family-section"
        >
          <div class="eyebrow">
            Word Family
          </div>
          <div class="family-grid">
            <div
              v-for="member in wordFamily.members"
              :key="member.word"
              class="family-member"
              :class="{ current: member.word.toLowerCase() === selectedWord.toLowerCase() }"
              @click="selectedWord = member.word"
            >
              <span class="member-word">{{ member.word }}</span>
              <span class="member-role">{{ member.role }}</span>
            </div>
          </div>
          <div
            v-if="wordFamily.synonyms"
            class="synonyms mt-3"
          >
            <span class="muted">Synonyms: </span>
            <span
              v-for="(s, idx) in wordFamily.synonyms"
              :key="s"
            >
              {{ s }}{{ idx < wordFamily.synonyms.length - 1 ? ', ' : '' }}
            </span>
          </div>
        </div>

        <div
          v-if="relatedChapters.length > 0"
          class="related-section"
        >
          <div class="eyebrow">
            Found in Chapters
          </div>
          <div class="chapter-tags">
            <NuxtLink
              v-for="c in relatedChapters"
              :key="c.slug"
              :to="`/chapter/${c.slug}`"
              class="chapter-tag"
            >
              {{ c.title }}
            </NuxtLink>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped lang="scss">
.layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;
  margin-top: 32px;
  align-items: start;
}

.search-corpus {
  margin-top: 24px;
  padding: 20px;
  background: $ocean-ice;
  border: 1px solid $ocean-border;
  border-radius: $radius-lg;
}

.corpus-input {
  width: 100%;
  border: 1.5px solid #cbd5e1;
  border-radius: $radius-md;
  padding: 12px 16px;
  font-size: 15px;
  background: $white-pure;

  &:focus {
    border-color: $ocean-vibrant;
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.18);
  }
}

.search-meta {
  font-family: $font-anime;
  font-size: 11px;
  margin-top: 8px;
  color: $ink-muted;
  font-weight: 700;
  text-transform: uppercase;
}

.corpus-results {
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 2px solid $ocean-ice;
}

.usage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.usage-card {
  cursor: pointer;
  padding: 18px;
  background: $white-pure;
  border: 1.5px solid rgba(0, 86, 179, 0.12);
  border-radius: $radius-md;
  box-shadow: $shadow-sm;
  transition: all $transition-fast;

  &:hover {
    border-color: $ocean-vibrant;
    transform: translateY(-2px);
    box-shadow: $shadow-card;
  }
}

.usage-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.word-link {
  font-family: $font-anime;
  font-size: 12px;
  font-weight: 800;
  color: $ocean-primary;
  background: $ocean-light;
  padding: 3px 8px;
  border-radius: $radius-xs;
}

@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; }
}

.word-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.word-card {
  cursor: pointer;
  transition: all $transition-fast;
  padding: 18px;
  background: $white-pure;
  border: 1.5px solid $ocean-border;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;

  &:hover {
    transform: translateY(-2px);
    border-color: $ocean-vibrant;
    box-shadow: $shadow-card;
  }

  &.active {
    border-color: $ocean-primary;
    background: $ocean-ice;
    box-shadow: 0 0 0 2px $ocean-primary;
  }
}

.word-header h3 {
  margin: 0;
  color: $ocean-deepest;
  font-family: $font-anime;
  font-size: 18px;
  font-weight: 800;
}

.last-seen {
  font-size: 10px;
  color: $ink-muted;
}

.encounter-badge {
  font-family: $font-anime;
  font-size: 10px;
  background: $ocean-ice;
  color: $ocean-dark;
  padding: 2px 8px;
  border-radius: $radius-pill;
  font-weight: 700;
  margin-top: 4px;
}

.mini-graph {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 30px;
  margin-top: 12px;
}

.mini-bar {
  flex: 1;
  background: linear-gradient(180deg, $ocean-sky 0%, $ocean-primary 100%);
  border-radius: 2px 2px 0 0;
}

.detail-panel {
  position: sticky;
  top: 90px;
  padding: 28px;
  background: $white-pure;
  border: 1.5px solid $gold-bright;
  border-top: 5px solid $gold-parchment;
  border-radius: $radius-xl;
  box-shadow: $shadow-card;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h2 {
    margin: 0;
    font-size: 28px;
    color: $ocean-deepest;
  }
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: $ink-muted;
  cursor: pointer;
  transition: color $transition-fast;

  &:hover {
    color: $battle-red-vibrant;
  }
}

.dimensions-detail {
  margin-bottom: 32px;
}

.dimension-row {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-bottom: 10px;
}

.dim-label {
  width: 90px;
  color: $ink-slate;
  font-weight: 600;
}

.dim-bar-container {
  flex: 1;
  height: 8px;
  background: #e2e8f0;
  border-radius: 999px;
  margin: 0 10px;
  overflow: hidden;
}

.dim-bar {
  height: 100%;
  background: linear-gradient(90deg, $ocean-primary 0%, $gold-bright 100%);
  border-radius: 999px;
  transition: width 0.3s;
}

.dim-value {
  width: 34px;
  text-align: right;
  font-family: $font-anime;
  font-weight: 800;
  color: $ocean-primary;
}

.section-header, .corpus-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.practice-link {
  font-family: $font-anime;
  font-size: 11px;
  font-weight: 800;
  color: $ocean-primary;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:hover {
    text-decoration: underline;
    color: $ocean-vibrant;
  }
}

.history-section { margin-top: 24px; }
.usage-list { list-style: none; padding: 0; margin: 12px 0; }
.usage-item { margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid $ocean-ice; }
.snippet { font-style: italic; margin: 0; font-size: 14px; color: $ink-slate; }
.date { font-size: 10px; color: $ink-muted; }

.collocations-section { margin-top: 24px; }
.coll-list { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
.coll-item {
  font-size: 14px;
  color: $ink-dark;
  background: $ocean-ice;
  padding: 8px 12px;
  border-radius: $radius-sm;
  border: 1px solid $ocean-border;
  font-weight: 600;
}

.family-section { margin-top: 24px; }
.family-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.family-member {
  cursor: pointer;
  padding: 8px 12px;
  background: $white-pure;
  border: 1px solid $ocean-border;
  border-radius: $radius-sm;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 80px;
  transition: all $transition-fast;

  &:hover {
    border-color: $ocean-vibrant;
    background: $ocean-ice;
  }

  &.current {
    border-color: $gold-parchment;
    background: $parchment-bg;
  }
}

.member-word { font-size: 14px; font-weight: 700; color: $ocean-deepest; }
.member-role { font-size: 10px; color: $ink-muted; text-transform: uppercase; font-weight: 700; font-family: $font-anime; }
.synonyms { font-size: 13px; color: $ink-slate; margin-top: 12px; }
.mt-3 { margin-top: 12px; }

.related-section { margin-top: 24px; }
.chapter-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.chapter-tag {
  font-family: $font-anime;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  background: $ocean-ice;
  border: 1px solid $ocean-border;
  border-radius: $radius-pill;
  text-decoration: none;
  color: $ocean-dark;
  transition: all $transition-fast;

  &:hover {
    border-color: $ocean-primary;
    background: $ocean-light;
    color: $ocean-primary;
  }
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: $white-pure;
  border-radius: $radius-xl;
  border: 2px dashed $ocean-border;
  margin-top: 32px;
}
</style>
