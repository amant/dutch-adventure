<script setup lang="ts">
useHead({
  title: 'Grand Line Zeekaart • Dutch Adventure',
  meta: [
    { name: 'description', content: 'Verken de eilanden van Oost-Blauw tot de Nieuwe Wereld op de Grand Line.' }
  ]
})
</script>

<template>
  <div class="map-page-container">
    <div class="page-head anime-card">
      <div class="head-top">
        <span class="eyebrow">GRAND LINE NAVIGATION // 航海図</span>
        <ComicSoundBadge text="SAIL AHEAD ⛵" variant="gold" size="sm" />
      </div>
      <h1 class="page-title">Grand Line Zeekaart der Talen</h1>
      <p class="muted">
        Elk eiland vertegenwoordigt een essentiële Nederlandse taalvaardigheid. Voltooi alle etappes om door te varen naar de Nieuwe Wereld!
      </p>
    </div>

    <!-- Grand Line Map Component -->
    <GrandLineMap />
  </div>
</template>

<style lang="scss" scoped>
.map-page-container {
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
