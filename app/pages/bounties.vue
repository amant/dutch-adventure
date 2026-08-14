<script setup lang="ts">
useHead({
  title: 'Gezocht & Premies • Dutch Adventure',
  meta: [
    { name: 'description', content: 'Bekijk je piratenpremie en jaag op gezochte taalknelpunten.' }
  ]
})
</script>

<template>
  <div class="bounties-page-container">
    <div class="page-head anime-card">
      <div class="head-top">
        <span class="eyebrow">BOUNTY HEADQUARTERS // 懸賞金本部</span>
        <ComicSoundBadge text="WANTED 📜" variant="gold" size="sm" />
      </div>
      <h1 class="page-title">Wanted Premies & Gezochten</h1>
      <p class="muted">
        Bekijk je persoonlijke Wanted poster en ga op jacht naar knelpunten om je totale premie in Beri (฿) te laten exploderen!
      </p>
    </div>

    <!-- Wanted Poster Showcase -->
    <div class="wanted-showcase-section">
      <PirateWantedPoster :interactive="true" />
    </div>

    <!-- Bounty Hunter Board -->
    <div class="board-section">
      <WantedBountyBoard />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bounties-page-container {
  padding: 10px 0 40px;
}

.page-head {
  background: #ffffff;
  border: 1px solid rgba(2, 132, 199, 0.2);
  border-radius: $radius-anime;
  box-shadow: $shadow-anime;
  padding: 24px;
  margin-bottom: 24px;

  .head-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .page-title {
    font-size: 2rem;
    color: $anime-navy;
    margin: 8px 0 6px;
  }
}

.wanted-showcase-section {
  margin-bottom: 36px;
  display: flex;
  justify-content: center;
}
</style>
