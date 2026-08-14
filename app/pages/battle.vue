<script setup lang="ts">
useHead({
  title: 'Taalgevecht Arena • Dutch Adventure',
  meta: [
    { name: 'description', content: 'Neem het op tegen Marine Kapiteins en Zee-Koningen in een anime taalgevecht.' }
  ]
})
</script>

<template>
  <div class="battle-page-container">
    <div class="page-head anime-card">
      <div class="head-top">
        <span class="eyebrow">BATTLE ARENA // バトルアリーナ</span>
        <ComicSoundBadge text="DON!! 💥" variant="red" size="sm" />
      </div>
      <h1 class="page-title">Anime Taalgevecht Simulator</h1>
      <p class="muted">
        Ontketen zwaardaanvallen en Haki stoten door de juiste Nederlandse zinsstructuren en woorden te kiezen!
      </p>
    </div>

    <!-- Battle Arena Component -->
    <AnimeBattleArena />
  </div>
</template>

<style lang="scss" scoped>
.battle-page-container {
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
</style>
