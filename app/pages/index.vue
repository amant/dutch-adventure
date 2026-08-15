<script setup lang="ts">
import { chapters } from '~/data/chapters';
import { useLearnerMemory } from '~/composables/useLearnerMemory';

const { memory, hydrate, getFrontierConcepts } = useLearnerMemory();
onMounted(hydrate);

const frontier = computed(() => getFrontierConcepts(3));

const weakAreas = computed(() => {
  const items: { label: string; type: 'vocabulary' | 'grammar'; score: number; priority: number }[] = [];

  const process = (dict: Record<string, any>, type: 'vocabulary' | 'grammar') => {
    Object.entries(dict).forEach(([label, state]) => {
      const avg = (state.production + state.automaticity + state.speaking) / 3;
      const successRate = state.encounters > 0 ? state.successes / state.encounters : 1;
      const priority = (100 - avg) * (2 - successRate);

      if (state.encounters > 0 && avg < 80) {
        items.push({
          label: type === 'grammar' ? label.replace(/-/g, ' ') : label,
          type,
          score: Math.round(avg),
          priority,
        });
      }
    });
  };

  process(memory.value.vocabulary, 'vocabulary');
  process(memory.value.grammar, 'grammar');

  return items.sort((a, b) => b.priority - a.priority).slice(0, 3);
});

const bottlenecks = computed(() => {
  const items: { label: string; status: 'red' | 'orange' | 'green'; text: string; action: string; actionLabel: string; icon: string }[] = [];

  // 1. Retrieval Speed
  const all = [...Object.values(memory.value.vocabulary), ...Object.values(memory.value.grammar)];
  const speeds = all.flatMap(v => v.responseTimes || []);
  const avgSpeed = speeds.length > 0 ? speeds.reduce((a, b) => a + b, 0) / speeds.length : 0;

  if (avgSpeed > 4) {
    items.push({
      label: 'Retrieval Speed',
      status: avgSpeed > 7 ? 'red' : 'orange',
      text: `Your average response time is ${avgSpeed.toFixed(1)}s. Boost your reflexes to battle level!`,
      action: '/smart-review?mode=speed',
      actionLabel: 'Start Speed Drills',
      icon: '⚡',
    });
  }

  // 2. Frontier (Recognized but not produced)
  const frontierList = getFrontierConcepts(5);
  if (frontierList.length > 3) {
    items.push({
      label: 'Knowledge Gap',
      status: 'orange',
      text: `You recognize ${frontierList.length} concepts but haven't used them in real combat yet.`,
      action: '/smart-review?mode=activation',
      actionLabel: 'Activate Concepts',
      icon: '🧭',
    });
  }

  // 3. Specific Weak Grammar (e.g. word order)
  const wordOrder = memory.value.grammar['word-order'];
  if (wordOrder && (wordOrder.production < 60 || wordOrder.successes / wordOrder.encounters < 0.6)) {
    items.push({
      label: 'Word Order',
      status: 'red',
      text: 'You struggle with Dutch inversion and sentence structure.',
      action: '/chapter/opinions-en-redenen',
      actionLabel: 'Review Word Order',
      icon: '⚓',
    });
  }

  // 4. Stagnant naturalness
  const history = [...Object.values(memory.value.vocabulary), ...Object.values(memory.value.grammar)].flatMap(v => v.usageHistory || []);
  const recentPragmatic = history.slice(0, 5).reduce((acc, h) => acc + (h.pragmaticScore || 0), 0) / Math.min(5, history.length || 1);
  if (history.length > 10 && recentPragmatic < 70) {
    items.push({
      label: 'Stiff Dutch',
      status: 'orange',
      text: 'Your Dutch is correct but sounds literal. Time to mirror native sea-flow.',
      action: '/chapter/native-mirroring-challenge',
      actionLabel: 'Try Mirroring',
      icon: '🌊',
    });
  }

  return items.slice(0, 3);
});

const totalEncounters = computed(() => {
  const all = [...Object.values(memory.value.vocabulary), ...Object.values(memory.value.grammar)];
  return all.reduce((sum, item) => sum + (item.encounters || 0), 0);
});

const masteredCount = computed(() => {
  const all = [...Object.values(memory.value.vocabulary), ...Object.values(memory.value.grammar)];
  return all.filter(item => ((item.production + item.automaticity) / 2) >= 80).length;
});
</script>

<template>
  <section class="home">
    <!-- Hero Adventure Banner -->
    <div class="hero-banner">
      <div class="hero-left">
        <div class="eyebrow gold">
          GRAND LINE OF DUTCH FLUENCY
        </div>
        <h1 class="hero-title">
          Set Sail on Your <span class="highlight-blue">Dutch Adventure!</span>
        </h1>
        <p class="hero-intro">
          Transform passive recognition into active fluency. Notice the pattern, retrieve under pressure, adapt the structure, and make the language yours!
        </p>
        <div class="hero-actions">
          <NuxtLink
            to="/chapter/opinions-en-redenen"
            class="button large gold"
          >
            <span>⚔️ Set Sail Now</span>
          </NuxtLink>
          <NuxtLink
            to="/progress"
            class="button large secondary"
          >
            <span>🗺️ View Voyage Map</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Quick Voyage Log Stats -->
      <div class="hero-stats card">
        <div class="stats-header">
          <span class="stats-title">LOG POSE STATUS</span>
          <span class="badge gold">LIVE</span>
        </div>
        <div class="stats-grid">
          <div class="stat-box">
            <span class="stat-number">{{ totalEncounters }}</span>
            <span class="stat-label">Total Drills</span>
          </div>
          <div class="stat-box">
            <span class="stat-number">{{ masteredCount }}</span>
            <span class="stat-label">Mastered</span>
          </div>
          <div class="stat-box">
            <span class="stat-number">B2</span>
            <span class="stat-label">Target Rank</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Daily Routine Path -->
    <div class="section-container daily-path-section">
      <DailyPath />
    </div>

    <!-- Actionable Bottlenecks (Anime Alert Cards) -->
    <div
      v-if="bottlenecks.length > 0"
      class="section-container bottlenecks-section"
    >
      <div class="section-header">
        <div class="eyebrow red">
          TACTICAL RADAR
        </div>
        <h2>Actionable Bottlenecks</h2>
      </div>
      <div class="bottlenecks-grid">
        <div
          v-for="b in bottlenecks"
          :key="b.label"
          class="card bottleneck-card"
          :class="b.status"
        >
          <div class="b-meta">
            <span class="b-icon">{{ b.icon }}</span>
            <div class="b-info">
              <span class="b-label">{{ b.label }}</span>
              <span
                class="status-chip"
                :class="b.status"
              >{{ b.status === 'red' ? 'Urgent' : 'Needs Focus' }}</span>
            </div>
          </div>
          <p class="b-text">
            {{ b.text }}
          </p>
          <NuxtLink
            :to="b.action"
            class="button small"
            :class="b.status === 'red' ? 'battle-red' : 'secondary'"
          >
            {{ b.actionLabel }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Capability Map Section -->
    <div class="section-container capability-map-section">
      <CapabilityMap />
    </div>

    <!-- Frontier Activation Section -->
    <div
      v-if="frontier.length > 0"
      class="section-container frontier-section"
    >
      <FrontierCard
        :frontier="frontier"
        @activate="navigateTo({ path: '/smart-review', query: { mode: 'activation' } })"
      />
    </div>

    <!-- Scenario Sandbox CTA (Grand Naval Gradient) -->
    <div class="card sandbox-cta ocean-gradient">
      <div class="cta-content">
        <div class="eyebrow gold">
          OPEN SEA EXPEDITION
        </div>
        <h3>Got a specific situation in mind?</h3>
        <p class="muted">
          Use the Scenario Sandbox to design custom missions for real-world scenarios you're facing. We'll weave in your target vocabulary and grammar seamlessly.
        </p>
        <NuxtLink
          to="/sandbox"
          class="button gold large"
        >
          <span>⚡ Enter Scenario Sandbox</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.home {
  padding: 10px 0 40px;
}

.hero-banner {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 32px;
  align-items: center;
  margin-bottom: 48px;
  padding: 36px 32px;
  background: linear-gradient(135deg, $white-pure 0%, $ocean-ice 100%);
  border: 2px solid $ocean-border;
  border-radius: $radius-xl;
  box-shadow: $shadow-card;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 220px;
    height: 220px;
    background: radial-gradient(circle, rgba(2, 132, 199, 0.12) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
}

.hero-title {
  font-size: clamp(34px, 4.5vw, 52px);
  margin: 12px 0 16px;
  color: $ocean-deepest;
  line-height: 1.1;

  .highlight-blue {
    background: linear-gradient(135deg, $ocean-primary 0%, $ocean-sky 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.hero-intro {
  font-size: 17px;
  color: $ink-slate;
  line-height: 1.6;
  margin-bottom: 28px;
  max-width: 580px;
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.hero-stats {
  background: $white-pure;
  border: 1.5px solid $ocean-border;
  padding: 24px;
  box-shadow: $shadow-card;
  border-radius: $radius-lg;

  .stats-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid $ocean-ice;

    .stats-title {
      font-family: $font-anime;
      font-weight: 800;
      font-size: 12px;
      letter-spacing: 0.12em;
      color: $ocean-dark;
    }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .stat-box {
    text-align: center;
    background: $ocean-ice;
    padding: 16px 8px;
    border-radius: $radius-md;
    border: 1px solid $ocean-border;

    .stat-number {
      display: block;
      font-family: $font-anime;
      font-weight: 900;
      font-size: 28px;
      color: $ocean-primary;
      line-height: 1.1;
    }

    .stat-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: $ink-muted;
      margin-top: 4px;
    }
  }
}

.section-container {
  margin-bottom: 48px;
}

.section-header {
  margin-bottom: 20px;
}

.bottlenecks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.bottleneck-card {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  border-left: 5px solid $gold-parchment;

  &.red {
    border-left-color: $battle-red-vibrant;
    background: linear-gradient(135deg, $white-pure 0%, #fff5f5 100%);
  }

  &.orange {
    border-left-color: $gold-parchment;
    background: linear-gradient(135deg, $white-pure 0%, $parchment-bg 100%);
  }

  .b-meta {
    display: flex;
    align-items: center;
    gap: 12px;

    .b-icon {
      font-size: 24px;
    }

    .b-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .b-label {
      font-family: $font-anime;
      font-weight: 800;
      font-size: 14px;
      color: $ocean-deepest;
    }

    .status-chip {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 2px 6px;
      border-radius: $radius-xs;
      width: fit-content;

      &.red {
        background: $battle-red-light;
        color: $battle-red-dark;
      }

      &.orange {
        background: $parchment-border;
        color: $gold-dark;
      }
    }
  }

  .b-text {
    font-size: 14px;
    color: $ink-slate;
    line-height: 1.5;
    flex: 1;
    margin: 0;
  }
}

.sandbox-cta {
  padding: 40px;
  border-radius: $radius-xl;
  box-shadow: $shadow-card-hover;
  position: relative;
  overflow: hidden;

  &::after {
    content: '⚡';
    position: absolute;
    right: 24px;
    bottom: 20px;
    font-size: 120px;
    opacity: 0.08;
    pointer-events: none;
  }

  .cta-content {
    max-width: 640px;
    position: relative;
    z-index: 1;

    h3 {
      font-size: 28px;
      margin: 8px 0 12px;
    }

    .muted {
      font-size: 16px;
      margin-bottom: 24px;
    }
  }
}

@media (max-width: $bp-tablet) {
  .hero-banner {
    grid-template-columns: 1fr;
    padding: 24px 20px;
  }

  .sandbox-cta {
    padding: 28px 20px;
  }
}
</style>
