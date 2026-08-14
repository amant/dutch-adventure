<script setup lang="ts">
import { useLearnerMemory } from '~/composables/useLearnerMemory'
import { usePirateGamification } from '~/composables/usePirateGamification'

const { memory, hydrate, getFrontierConcepts } = useLearnerMemory()
const { profile, calculatedBounty, crewRank, hydrateProfile } = usePirateGamification()

onMounted(() => {
  hydrate()
  hydrateProfile()
})

const frontier = computed(() => getFrontierConcepts(3))
</script>

<template>
  <div class="captain-deck">
    <!-- Hero Command Deck -->
    <section class="hero-command-deck">
      <div class="deck-grid">
        <!-- Left: Live Pirate Wanted Poster -->
        <div class="poster-column">
          <PirateWantedPoster :interactive="true" />
        </div>

        <!-- Right: Captain's Mission & Status -->
        <div class="command-column">
          <div class="command-banner anime-card">
            <div class="banner-top">
              <span class="eyebrow">COMMAND DECK // 司令デッキ • {{ crewRank.sector }}</span>
              <ComicSoundBadge text="VAAR UIT! ⚓" variant="gold" size="sm" />
            </div>

            <h1 class="deck-title">Hijs de Zeilen van het Nederlands!</h1>
            <p class="deck-intro muted">
              Van de kalme wateren van <strong>Oost-Blauw (A1)</strong> tot de woeste stormen van de <strong>Nieuwe Wereld (B2)</strong>: 
              verover woordenschat, smeed onbreekbare zinsbouw en verhoog je premie op de Grand Line!
            </p>

            <!-- Quick Action Buttons -->
            <div class="deck-actions">
              <NuxtLink to="/map" class="anime-btn gold lg">
                <span>🗺️ OPEN DE ZEEKAART</span>
              </NuxtLink>
              <NuxtLink to="/battle" class="anime-btn red lg">
                <span>⚔️ TAALGEVECHT ARENA</span>
              </NuxtLink>
            </div>

            <!-- Stats Bar -->
            <div class="deck-stats-bar">
              <div class="stat-pill">
                <span class="stat-icon">👑</span>
                <span class="stat-text">Rang: <strong>{{ crewRank.title.split('(')[0] }}</strong></span>
              </div>
              <div class="stat-pill">
                <span class="stat-icon">💰</span>
                <span class="stat-text">Premie: <strong class="gold-text">฿ {{ calculatedBounty.toLocaleString('nl-NL') }}</strong></span>
              </div>
              <div class="stat-pill">
                <span class="stat-icon">🔥</span>
                <span class="stat-text">Zeeloge: <strong>{{ profile.streakDays }} Dagen</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Daily Sailing Path Routine -->
    <section class="daily-path-section">
      <DailyPath />
    </section>

    <!-- Wanted Bounty Hunter Board (Bottlenecks as Pirates) -->
    <section class="bounty-section">
      <WantedBountyBoard />
    </section>

    <!-- Grand Line Sailing Chart -->
    <section class="map-section">
      <GrandLineMap />
    </section>

    <!-- Haki & Devil Fruit Power Matrix -->
    <section class="haki-section">
      <HakiGauge />
    </section>

    <!-- Frontier Knowledge Card -->
    <section v-if="frontier.length > 0" class="frontier-section">
      <FrontierCard :frontier="frontier" @activate="navigateTo({ path: '/smart-review', query: { mode: 'activation' } })" />
    </section>

    <!-- Tavern & Sandbox Callout -->
    <section class="sandbox-tavern-section anime-card">
      <div class="tavern-content">
        <span class="eyebrow">PIRATE TAVERN & SANDBOX // 冒険場</span>
        <h2 class="tavern-title">Heb je een specifiek avontuur in gedachten?</h2>
        <p class="muted">
          Gebruik de Sandbox om op maat gemaakte missies te ontwerpen voor situaties in het echte leven. 
          We weven jouw gewenste doeltaal automatisch in het verhaal!
        </p>
        <div class="tavern-actions">
          <NuxtLink to="/sandbox" class="anime-btn purple">
            <span>🧭 NAAR HET SCENARIO SANDBOX</span>
          </NuxtLink>
          <NuxtLink to="/idioms" class="anime-btn gold">
            <span>💎 VERZAMELDE SPREEKWOORDEN</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.captain-deck {
  padding: 10px 0 40px;
}

.hero-command-deck {
  margin-bottom: 30px;
}

.deck-grid {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 24px;
  align-items: stretch;
}

.command-banner {
  background: #ffffff;
  border: 1px solid rgba(2, 132, 199, 0.2);
  border-radius: $radius-anime;
  box-shadow: $shadow-anime;
  padding: 28px 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .banner-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .deck-title {
    font-size: clamp(1.8rem, 3.2vw, 2.4rem);
    margin: 8px 0 12px;
    color: $anime-navy;
    line-height: 1.15;
  }

  .deck-intro {
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .deck-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 20px;
  }

  .deck-stats-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    border-top: 1px solid #e2e8f0;
    padding-top: 16px;

    .stat-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: $anime-ice;
      border: 1px solid rgba(2, 132, 199, 0.2);
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 12px;
      color: $anime-navy;

      .stat-icon {
        font-size: 14px;
      }
    }
  }
}

.sandbox-tavern-section {
  background: #ffffff;
  border: 1px solid rgba(139, 92, 246, 0.25);
  border-radius: $radius-anime;
  box-shadow: $shadow-anime;
  padding: 28px 24px;
  margin: 24px 0;

  .tavern-title {
    font-size: 1.8rem;
    color: $anime-navy;
    margin: 8px 0 10px;
  }

  .tavern-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 20px;
  }
}

@media (max-width: 960px) {
  .deck-grid {
    grid-template-columns: 1fr;
  }
  .poster-column {
    order: 2;
  }
  .command-column {
    order: 1;
  }
}
</style>
