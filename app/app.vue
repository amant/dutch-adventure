<script setup lang="ts">
import { ref } from 'vue';

useHead({
  title: 'Netherlands Taal Avonturen | Grand Line Dutch Learning',
  meta: [
    { name: 'description', content: 'Master Dutch through an epic anime-inspired language voyage from A1 to B2.' },
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: `/favicon.svg` },
  ],
});

const isMobileNavOpen = ref(false);
const toggleMobileNav = () => {
  isMobileNavOpen.value = !isMobileNavOpen.value;
};

const navLinks = [
  { to: '/graph', label: 'Graph', icon: '🗺️' },
  { to: '/memory', label: 'Memory', icon: '🧠' },
  { to: '/reading', label: 'Reading', icon: '📖' },
  { to: '/reader', label: 'Reader', icon: '📜' },
  { to: '/sandbox', label: 'Sandbox', icon: '⚔️' },
  { to: '/idioms', label: 'Idioms', icon: '💎' },
  { to: '/corrections', label: 'Corrections', icon: '🎯' },
  { to: '/vocabulary', label: 'Vocabulary', icon: '⚡' },
  { to: '/grammar', label: 'Grammar', icon: '⚓' },
  { to: '/progress', label: 'Progress', icon: '🏆' },
];
</script>

<template>
  <div class="app-shell">
    <NuxtRouteAnnouncer />

    <!-- Top Adventure Header -->
    <header class="topbar">
      <div class="topbar-inner">
        <NuxtLink
          to="/"
          class="brand"
        >
          <span class="brand-emblem">⚓</span>
          <div class="brand-text">
            <span class="brand-title">Netherlands Taal Avonturen</span>
            <span class="brand-subtitle">GRAND LINE • DUTCH EXPEDITION</span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="nav-item"
          >
            <span class="nav-icon">{{ link.icon }}</span>
            <span class="nav-text">{{ link.label }}</span>
          </NuxtLink>
        </nav>

        <!-- Mobile Menu Toggle Button -->
        <button
          class="mobile-toggle"
          :class="{ active: isMobileNavOpen }"
          aria-label="Toggle navigation menu"
          @click="toggleMobileNav"
        >
          <span class="bar" />
          <span class="bar" />
          <span class="bar" />
        </button>
      </div>

      <!-- Mobile Dropdown Navigation -->
      <transition name="anime-drop">
        <nav
          v-if="isMobileNavOpen"
          class="mobile-nav"
        >
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="mobile-nav-item"
            @click="isMobileNavOpen = false"
          >
            <span class="nav-icon">{{ link.icon }}</span>
            <span class="nav-text">{{ link.label }}</span>
          </NuxtLink>
        </nav>
      </transition>
    </header>

    <!-- Main Content Area -->
    <main class="main-content">
      <NuxtPage />
    </main>

    <!-- Grand Line Adventure Footer -->
    <footer class="app-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-logo">
            <span class="logo-icon">🌊</span>
            <span class="logo-title">Netherlands Taal Avonturen</span>
          </div>
          <p class="footer-tagline">
            "Don't teach the learner more language. Turn what they know into language they can actually use."
          </p>
        </div>

        <div class="footer-links">
          <div class="footer-col">
            <h4>Log Pose</h4>
            <NuxtLink to="/">Home Base</NuxtLink>
            <NuxtLink to="/progress">Capability Map</NuxtLink>
            <NuxtLink to="/graph">Language Graph</NuxtLink>
            <NuxtLink to="/sandbox">Scenario Sandbox</NuxtLink>
          </div>
          <div class="footer-col">
            <h4>Training Grounds</h4>
            <NuxtLink to="/smart-review">Smart Review</NuxtLink>
            <NuxtLink to="/vocabulary">Vocabulary Vault</NuxtLink>
            <NuxtLink to="/grammar">Grammar Lab</NuxtLink>
            <NuxtLink to="/corrections">Redline Corrections</NuxtLink>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Netherlands Taal Avonturen • Inspired by One Piece links & Anime Spirit</span>
        <span class="voyage-status">⛵ VOYAGE LEVEL: B2 DESTINATION</span>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 2px solid $ocean-border;
  box-shadow: 0 4px 20px rgba(0, 59, 115, 0.06);
  transition: all $transition-normal;
}

.topbar-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  group: hover;
  transition: transform $transition-fast;

  &:hover {
    transform: translateY(-1px);

    .brand-emblem {
      transform: rotate(15deg) scale(1.1);
      box-shadow: 0 0 15px rgba(2, 132, 199, 0.5);
    }
  }
}

.brand-emblem {
  width: 42px;
  height: 42px;
  border-radius: $radius-md;
  background: linear-gradient(135deg, $ocean-primary 0%, $ocean-vibrant 100%);
  color: $white-pure;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  box-shadow: 0 3px 0 $ocean-dark, 0 4px 10px rgba(0, 102, 204, 0.3);
  transition: all $transition-bounce;
  flex-shrink: 0;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-family: $font-anime;
  font-weight: 900;
  font-size: 20px;
  letter-spacing: -0.01em;
  color: $ocean-deepest;
  line-height: 1.1;
  background: linear-gradient(135deg, $ocean-deepest 0%, $ocean-dark 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-subtitle {
  font-family: $font-anime;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.16em;
  color: $gold-deep;
  margin-top: 2px;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.nav-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: $radius-sm;
  font-family: $font-anime;
  font-size: 13px;
  font-weight: 700;
  color: $ink-slate;
  text-decoration: none;
  transition: all $transition-fast;
  position: relative;

  .nav-icon {
    font-size: 14px;
    transition: transform $transition-fast;
  }

  &:hover {
    color: $ocean-primary;
    background: $ocean-ice;
    transform: translateY(-1px);

    .nav-icon {
      transform: scale(1.15);
    }
  }

  &.router-link-active {
    color: $white-pure;
    background: linear-gradient(135deg, $ocean-primary 0%, $ocean-vibrant 100%);
    box-shadow: 0 2px 0 $ocean-dark, 0 4px 10px rgba(0, 102, 204, 0.25);

    &::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      width: 6px;
      height: 6px;
      background: $gold-bright;
      border-radius: 50%;
      box-shadow: 0 0 6px $gold-bright;
    }
  }
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 38px;
  height: 38px;
  background: $ocean-ice;
  border: 1px solid $ocean-border;
  border-radius: $radius-sm;
  padding: 8px;
  cursor: pointer;
  transition: background $transition-fast;

  .bar {
    width: 100%;
    height: 2.5px;
    background: $ocean-dark;
    border-radius: 2px;
    transition: all $transition-fast;
  }

  &.active {
    background: $ocean-light;
    .bar:nth-child(1) { transform: translateY(6px) rotate(45deg); }
    .bar:nth-child(2) { opacity: 0; }
    .bar:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
  }
}

.mobile-nav {
  display: none;
  padding: 12px 20px 20px;
  border-top: 1px solid $ocean-border;
  background: $white-pure;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: $radius-sm;
  background: $ocean-ice;
  font-family: $font-anime;
  font-size: 13px;
  font-weight: 700;
  color: $ink-slate;
  text-decoration: none;

  &.router-link-active {
    background: $ocean-primary;
    color: $white-pure;
  }
}

.main-content {
  flex: 1;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 24px 80px;
}

.app-footer {
  margin-top: auto;
  background: linear-gradient(180deg, $ocean-navy 0%, $ocean-deepest 100%);
  color: $white-pure;
  border-top: 4px solid $gold-parchment;
  padding: 50px 24px 24px;
}

.footer-inner {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
  padding-bottom: 36px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-brand {
  max-width: 440px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;

  .logo-icon {
    font-size: 24px;
  }

  .logo-title {
    font-family: $font-anime;
    font-weight: 800;
    font-size: 20px;
    color: $white-pure;
    letter-spacing: -0.01em;
  }
}

.footer-tagline {
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.6;
  font-style: italic;
}

.footer-links {
  display: flex;
  gap: 48px;
  flex-wrap: wrap;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 10px;

  h4 {
    font-family: $font-anime;
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: $gold-bright;
    margin-bottom: 6px;
  }

  a {
    font-size: 14px;
    color: #cbd5e1;
    transition: color $transition-fast, transform $transition-fast;

    &:hover {
      color: $ocean-sky;
      transform: translateX(3px);
    }
  }
}

.footer-bottom {
  max-width: 1440px;
  margin: 24px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #64748b;
  flex-wrap: wrap;
  gap: 12px;

  .voyage-status {
    font-family: $font-anime;
    font-weight: 800;
    color: $gold-bright;
    letter-spacing: 0.08em;
  }
}

// Transitions
.anime-drop-enter-active,
.anime-drop-leave-active {
  transition: all 0.25s ease-out;
}

.anime-drop-enter-from,
.anime-drop-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: $bp-desktop) {
  .desktop-nav {
    display: none;
  }

  .mobile-toggle {
    display: flex;
  }

  .mobile-nav {
    display: grid;
  }
}

@media (max-width: $bp-mobile) {
  .main-content {
    padding: 20px 16px 60px;
  }

  .topbar-inner {
    padding: 12px 16px;
  }

  .mobile-nav {
    grid-template-columns: 1fr;
  }

  .footer-inner {
    flex-direction: column;
    gap: 28px;
  }
}
</style>
