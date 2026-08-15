<script setup lang="ts">
import { chapters } from '~/data/chapters';
import { useLearnerMemory } from '~/composables/useLearnerMemory';

const { memory } = useLearnerMemory();

const levels = ['A1', 'A2', 'B1', 'B2'] as const;

const getCapabilityStatus = (chapter: typeof chapters[0]) => {
  const vocab = chapter.stages.flatMap(s => s.exercises.flatMap(e => e.vocabulary || []));
  const grammar = chapter.stages.flatMap(s => s.exercises.flatMap(e => e.grammar || []));

  if (vocab.length === 0 && grammar.length === 0) return 'not-started';

  const scores: number[] = [];
  vocab.forEach((v) => {
    if (memory.value.vocabulary[v]) {
      scores.push((memory.value.vocabulary[v].production + memory.value.vocabulary[v].automaticity) / 2);
    }
  });
  grammar.forEach((g) => {
    if (memory.value.grammar[g]) {
      scores.push((memory.value.grammar[g].production + memory.value.grammar[g].automaticity) / 2);
    }
  });

  if (scores.length === 0) return 'not-started';
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

  if (avg > 80) return 'mastered';
  if (avg > 20) return 'in-progress';
  return 'not-started';
};

const chaptersByLevel = computed(() => {
  const map: Record<string, typeof chapters> = {};
  levels.forEach((l) => {
    map[l] = chapters.filter(c => c.level === l);
  });
  return map;
});
</script>

<template>
  <div class="capability-map card">
    <div class="header">
      <div class="eyebrow gold">
        GRAND LINE NAVIGATION
      </div>
      <h2>Your Capability Map</h2>
      <p class="muted">
        Master these real-world mission capabilities to conquer the B2 language frontier.
      </p>
    </div>

    <div class="levels-grid">
      <div
        v-for="level in levels"
        :key="level"
        class="level-column"
      >
        <div class="level-header">
          <span
            class="level-badge"
            :class="level.toLowerCase()"
          >{{ level }}</span>
          <div class="level-meta">
            <span class="level-label">{{ level === 'A1' ? 'East Blue Survival' : level === 'A2' ? 'Everyday Voyage' : level === 'B1' ? 'Grand Line Independence' : 'New World Mastery' }}</span>
          </div>
        </div>

        <div class="capabilities-list">
          <NuxtLink
            v-for="chapter in chaptersByLevel[level]"
            :key="chapter.slug"
            :to="`/chapter/${chapter.slug}`"
            class="capability-item"
            :class="[getCapabilityStatus(chapter), { 'is-capstone': chapter.isCapstone }]"
          >
            <div class="dot" />
            <span class="title">{{ chapter.title }}</span>
            <span
              v-if="chapter.isCapstone"
              class="capstone-icon"
              title="Capstone Mission"
            >🏆</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.capability-map {
  margin: 40px 0;
  padding: 36px;
  background: $white-pure;
  border: 1.5px solid $ocean-border;
  border-radius: $radius-xl;
  box-shadow: $shadow-card;
}

.header {
  margin-bottom: 24px;

  h2 {
    margin: 8px 0;
    font-size: 28px;
  }
}

.levels-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 28px;
}

.level-column {
  background: $ocean-ice;
  border: 1px solid $ocean-border;
  border-radius: $radius-lg;
  padding: 18px 14px;
  display: flex;
  flex-direction: column;
}

.level-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid $ocean-border;
}

.level-badge {
  background: linear-gradient(135deg, $ocean-primary 0%, $ocean-vibrant 100%);
  color: $white-pure;
  padding: 4px 10px;
  border-radius: $radius-sm;
  font-family: $font-anime;
  font-weight: 900;
  font-size: 14px;
  box-shadow: 0 2px 0 $ocean-dark;

  &.a1 { background: linear-gradient(135deg, #0284c7 0%, #38bdf8 100%); }
  &.a2 { background: linear-gradient(135deg, #0066cc 0%, #0284c7 100%); }
  &.b1 { background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%); }
  &.b2 { background: linear-gradient(135deg, #b91c1c 0%, #ef4444 100%); }
}

.level-meta {
  display: flex;
  flex-direction: column;
}

.level-label {
  font-family: $font-anime;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  color: $ink-slate;
  letter-spacing: 0.05em;
  line-height: 1.2;
}

.capabilities-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.capability-item {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
  color: $ink-navy;
  padding: 10px 12px;
  border-radius: $radius-md;
  background: $white-pure;
  border: 1px solid rgba(0, 86, 179, 0.1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  transition: all $transition-fast;

  &:hover {
    transform: translateX(3px);
    border-color: $ocean-vibrant;
    box-shadow: 0 4px 12px rgba(0, 86, 179, 0.12);
    color: $ocean-primary;
  }

  &.mastered {
    background: #ecfdf5;
    border-color: $sea-emerald;
    color: $sea-emerald-dark;

    .dot {
      background: $sea-emerald;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25);
    }
  }

  &.in-progress {
    border-left: 3px solid $gold-parchment;
    background: #fffbeb;

    .dot {
      background: $gold-parchment;
    }
  }

  &.is-capstone {
    margin-top: 6px;
    background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%);
    border: 1.5px dashed $battle-red-vibrant;
    color: $battle-red-dark;

    &:hover {
      background: #ffe4e6;
      border-style: solid;
    }

    &.mastered {
      background: #fef08a;
      border: 1.5px solid $gold-parchment;
      color: $gold-dark;
    }
  }
}

.capstone-icon {
  margin-left: auto;
  font-size: 14px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #94a3b8;
  flex-shrink: 0;
}

@media (max-width: $bp-desktop) {
  .levels-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: $bp-mobile) {
  .capability-map { padding: 22px 16px; }
  .levels-grid { grid-template-columns: 1fr; }
}
</style>
