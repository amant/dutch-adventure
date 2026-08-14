<script setup lang="ts">
import { usePirateGamification } from '~/composables/usePirateGamification'

const { hydrateProfile } = usePirateGamification()

onMounted(hydrateProfile)

useHead({
  title: 'Netherlands Taal Avontuur • De Grote Taalroute',
  meta: [
    { name: 'description', content: 'Leer Nederlands via een episch anime piratenavontuur op de Grand Line!' },
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: `/favicon.svg` },
  ],
})
</script>

<template>
  <div class="app-shell">
    <NuxtRouteAnnouncer />
    
    <!-- Pirate Anime HUD Header -->
    <PirateHud />

    <!-- Sub-navigation strip for quick access to tools -->
    <div class="sub-nav-bar">
      <div class="sub-nav-container">
        <NuxtLink to="/graph" class="sub-link">🌐 Taal-Graaf</NuxtLink>
        <NuxtLink to="/reading" class="sub-link">📖 Verhalenladder</NuxtLink>
        <NuxtLink to="/reader" class="sub-link">🔍 Tekst Analyzer</NuxtLink>
        <NuxtLink to="/idioms" class="sub-link">💎 Spreekwoorden</NuxtLink>
        <NuxtLink to="/corrections" class="sub-link">✍️ Correctie Hub</NuxtLink>
        <NuxtLink to="/grammar" class="sub-link">🛡️ Grammatica Deck</NuxtLink>
      </div>
    </div>

    <!-- Main Content Area -->
    <main class="main-content">
      <NuxtPage />
    </main>

    <!-- Pirate Footer -->
    <footer class="pirate-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="jolly-emoji">☠️👒</span>
          <span class="footer-title">De Grote Taalroute • B2 Nederlands Piratenavontuur</span>
        </div>
        <div class="footer-links">
          <NuxtLink to="/">Command Deck</NuxtLink>
          <NuxtLink to="/map">Zeekaart</NuxtLink>
          <NuxtLink to="/battle">Taalgevechten</NuxtLink>
          <NuxtLink to="/bounties">Bounty Hunter</NuxtLink>
          <NuxtLink to="/progress">Haki & Voortgang</NuxtLink>
        </div>
        <p class="footer-quote">"Niet zomaar woorden leren. Verover de taal die je echt kunt gebruiken op zee!"</p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
// Global resets and base layout
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: $font-body;
  background-color: #f8fafc;
  color: #0f172a;
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>

<style lang="scss" scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: 
    radial-gradient(rgba(2, 132, 199, 0.06) 1.5px, transparent 1.5px),
    linear-gradient(180deg, #f0f7ff 0%, #f8fafc 400px);
  background-size: 24px 24px, 100% 100%;
}

.sub-nav-bar {
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  padding: 8px 0;
  overflow-x: auto;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.03);

  .sub-nav-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    gap: 12px;
    white-space: nowrap;
  }

  .sub-link {
    font-size: 13px;
    font-weight: 600;
    color: #64748b;
    text-decoration: none;
    padding: 4px 12px;
    border-radius: 6px;
    transition: all 0.15s ease;

    &:hover {
      color: $anime-blue-primary;
      background: $anime-ice;
    }

    &.router-link-active {
      color: $anime-blue-deep;
      background: $anime-ice;
      font-weight: 700;
    }
  }
}

.main-content {
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  padding: 24px 20px 80px;
  flex: 1;
}

.pirate-footer {
  background: $anime-navy;
  border-top: 3px solid $anime-blue-primary;
  color: #94a3b8;
  padding: 40px 20px 50px;
  text-align: center;
  font-size: 14px;
  position: relative;
  overflow: hidden;

  &::before {
    content: 'ONE PIECE STYLE DUTCH ADVENTURE // オランダ語の大航海';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4rem;
    font-weight: 900;
    font-family: $font-anime-title;
    color: rgba(255, 255, 255, 0.02);
    white-space: nowrap;
    pointer-events: none;
  }

  .footer-inner {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    position: relative;
    z-index: 1;
  }

  .footer-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: $font-anime-title;
    font-size: 16px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 0.06em;

    .jolly-emoji {
      font-size: 22px;
    }
  }

  .footer-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    font-weight: 600;
    font-size: 13px;

    a {
      color: #cbd5e1;
      padding: 4px 10px;
      border-radius: 4px;
      transition: all 0.15s ease;

      &:hover {
        color: #ffffff;
        background: rgba(2, 132, 199, 0.2);
      }
    }
  }

  .footer-quote {
    margin: 4px 0 0;
    font-style: normal;
    color: #64748b;
    font-size: 13px;
  }
}
</style>
