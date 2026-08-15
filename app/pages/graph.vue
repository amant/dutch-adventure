<script setup lang="ts">
import { chapters } from '~/data/chapters';
import { useLearnerMemory } from '~/composables/useLearnerMemory';

const { memory, hydrate } = useLearnerMemory();
onMounted(hydrate);

const levels = ['A1', 'A2', 'B1', 'B2'] as const;

const getConceptState = (type: 'vocabulary' | 'grammar', id: string) => {
  return memory.value[type][id];
};

const getMastery = (type: 'vocabulary' | 'grammar', id: string) => {
  const state = getConceptState(type, id);
  if (!state) return 0;
  return (state.production + state.automaticity + state.speaking + state.recognition) / 4;
};

const chapterData = computed(() => {
  return chapters.map((c) => {
    const vocab = new Set<string>();
    const grammar = new Set<string>();
    c.stages.forEach(s => s.exercises.forEach((ex) => {
      ex.vocabulary?.forEach(v => vocab.add(v));
      ex.grammar?.forEach(g => grammar.add(g));
    }));

    const vList = Array.from(vocab).map(v => ({ id: v, type: 'vocabulary' as const, mastery: getMastery('vocabulary', v) }));
    const gList = Array.from(grammar).map(g => ({ id: g, type: 'grammar' as const, mastery: getMastery('grammar', g) }));

    const totalMastery = [...vList, ...gList].reduce((acc, curr) => acc + curr.mastery, 0);
    const avgMastery = [...vList, ...gList].length > 0 ? totalMastery / [...vList, ...gList].length : 0;

    return {
      ...c,
      concepts: [...vList, ...gList],
      avgMastery,
    };
  });
});

const filteredChapters = (level: string) => chapterData.value.filter(c => c.level === level);

const activeConcept = ref<{ id: string; type: 'vocabulary' | 'grammar'; level: string; chapterTitle: string } | null>(null);

const conceptRelations = computed(() => {
  if (!activeConcept.value) return [];

  const relations: { fromChapter: string; toChapter: string }[] = [];
  chapterData.value.forEach((c) => {
    if (c.concepts.some(con => con.id === activeConcept.value?.id) && c.title !== activeConcept.value?.chapterTitle) {
      relations.push({ fromChapter: activeConcept.value!.chapterTitle, toChapter: c.title });
    }
  });
  return relations;
});

const suggestedChapter = computed(() => {
  // Find the first chapter that has < 80% mastery but has some encounters
  // Or the first chapter that has 0 encounters but is at the "frontier" of their level
  const frontier = chapterData.value.find(c => c.avgMastery < 80);
  return frontier;
});
</script>

<template>
  <div class="graph-page">
    <div class="hero-flex">
      <div class="hero">
        <div class="eyebrow">
          Language Graph
        </div>
        <h1>Your Dutch Network</h1>
        <p class="muted">
          Every concept you learn connects to another. Watch your network grow as you build capabilities.
        </p>
      </div>

      <div
        v-if="suggestedChapter"
        class="suggestion card"
      >
        <div class="eyebrow">
          Suggested Next Step
        </div>
        <h3>{{ suggestedChapter.title }}</h3>
        <p class="muted">
          {{ suggestedChapter.capability }}
        </p>
        <NuxtLink
          :to="`/chapter/${suggestedChapter.slug}`"
          class="button secondary"
        >Continue Path</NuxtLink>
      </div>
    </div>

    <div class="graph-container">
      <div
        v-for="level in levels"
        :key="level"
        class="level-column"
      >
        <div class="level-header">
          <span class="level-tag">{{ level }}</span>
        </div>

        <div class="chapters-stack">
          <div
            v-for="chapter in filteredChapters(level)"
            :key="chapter.slug"
            class="chapter-node"
            :class="{ related: conceptRelations.some(r => r.toChapter === chapter.title) }"
          >
            <div class="chapter-info">
              <h3>{{ chapter.title }}</h3>
              <div class="mastery-mini-bar">
                <div
                  class="fill"
                  :style="{ width: chapter.avgMastery + '%' }"
                />
              </div>
            </div>

            <div class="concept-cloud">
              <div
                v-for="concept in chapter.concepts"
                :key="concept.id"
                class="concept-dot"
                :class="[concept.type, { active: activeConcept?.id === concept.id, highlighted: activeConcept?.id === concept.id }]"
                :style="{
                  opacity: 0.3 + (concept.mastery / 100) * 0.7,
                  transform: `scale(${0.8 + (concept.mastery / 100) * 0.4})`,
                }"
                @mouseenter="activeConcept = { ...concept, level, chapterTitle: chapter.title }"
                @mouseleave="activeConcept = null"
              >
                <div
                  v-if="activeConcept?.id === concept.id"
                  class="tooltip"
                >
                  <strong>{{ concept.id }}</strong>
                  <span>{{ Math.round(concept.mastery) }}% mastered</span>
                  <div class="hits">
                    Hits: {{ getConceptState(concept.type, concept.id)?.successes || 0 }} / {{ getConceptState(concept.type, concept.id)?.encounters || 0 }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="legend">
      <div class="legend-item">
        <span class="dot vocabulary" /> Vocabulary
      </div>
      <div class="legend-item">
        <span class="dot grammar" /> Grammar
      </div>
      <div class="legend-item">
        <span class="dot-scale" /> Mastery (Size/Opacity)
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.graph-page { padding: 20px 0; }
.hero { flex: 1; }
.hero-flex { display: flex; align-items: flex-end; gap: 40px; margin-bottom: 50px; }

.suggestion {
  flex: 0 0 340px;
  background: linear-gradient(135deg, $white-pure 0%, $parchment-bg 100%);
  border: 1.5px solid $gold-bright;
  border-radius: $radius-xl;
  padding: 24px;
  box-shadow: $shadow-card;

  h3 { font-size: 18px; margin: 8px 0; color: $ocean-deepest; }
  p { font-size: 13px; margin-bottom: 16px; color: $ink-slate; }
  .button { font-size: 13px; padding: 10px 18px; }
}

.graph-container {
  display: flex;
  gap: 32px;
  overflow-x: auto;
  padding-bottom: 30px;
  min-height: 550px;
}

.level-column {
  flex: 1;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.level-header {
  border-bottom: 2px solid $ocean-border;
  padding-bottom: 12px;
  margin-bottom: 8px;
}

.level-tag {
  background: linear-gradient(135deg, $ocean-primary 0%, $ocean-vibrant 100%);
  color: $white-pure;
  padding: 4px 14px;
  border-radius: $radius-pill;
  font-family: $font-anime;
  font-weight: 800;
  font-size: 14px;
  box-shadow: 0 2px 0 $ocean-dark;
}

.chapters-stack {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.chapter-node {
  background: $white-pure;
  border: 1.5px solid $ocean-border;
  border-radius: $radius-lg;
  padding: 18px;
  position: relative;
  transition: all $transition-normal;
  box-shadow: $shadow-sm;

  &:hover, &.related {
    border-color: $ocean-vibrant;
    box-shadow: $shadow-card;
  }

  &.related {
    background: $ocean-ice;
    transform: scale(1.02);
  }
}

.chapter-info h3 {
  font-family: $font-anime;
  font-weight: 800;
  font-size: 16px;
  margin: 0 0 8px;
  color: $ocean-deepest;
}

.mastery-mini-bar {
  height: 6px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 15px;

  .fill {
    height: 100%;
    background: linear-gradient(90deg, $ocean-primary 0%, $gold-bright 100%);
    transition: width 1s ease-out;
  }
}

.concept-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.concept-dot {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  position: relative;
  cursor: help;
  transition: transform 0.2s;

  &.vocabulary {
    background: $ocean-primary;
    box-shadow: 0 0 4px rgba(0, 102, 204, 0.4);
  }

  &.grammar {
    background: $gold-deep;
    box-shadow: 0 0 4px rgba(217, 119, 6, 0.4);
  }

  &.highlighted {
    box-shadow: 0 0 0 2px white, 0 0 0 4px $gold-bright;
    z-index: 5;
    opacity: 1 !important;
    transform: scale(1.35) !important;
  }

  &:hover {
    transform: scale(1.5) !important;
    z-index: 10;
    opacity: 1 !important;
  }
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: $ocean-deepest;
  color: $white-pure;
  padding: 8px 12px;
  border-radius: $radius-sm;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  margin-bottom: 10px;
  box-shadow: 0 8px 20px rgba(7, 19, 38, 0.35);
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: 100;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: $ocean-deepest;
  }

  strong { font-size: 13px; font-family: $font-anime; color: $gold-bright; }
  .hits { font-size: 10px; opacity: 0.8; }
}

.legend {
  margin-top: 40px;
  display: flex;
  gap: 30px;
  padding: 18px 24px;
  background: $white-pure;
  border-radius: $radius-lg;
  border: 1.5px solid $ocean-border;
  width: fit-content;
  box-shadow: $shadow-sm;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 700;
  font-family: $font-anime;
  color: $ink-slate;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;

  &.vocabulary { background: $ocean-primary; }
  &.grammar { background: $gold-deep; }
}

.dot-scale {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: linear-gradient(135deg, #cbd5e1, $ocean-primary);
}

@media (max-width: 900px) {
  .hero-flex {
    flex-direction: column;
    align-items: stretch;
  }

  .graph-container {
    flex-direction: column;
  }

  .level-column {
    min-width: 0;
  }
}
</style>
