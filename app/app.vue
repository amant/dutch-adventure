<template>
  <div class="app-shell">
    <NuxtRouteAnnouncer />
    <header class="topbar">
      <NuxtLink to="/" class="brand">Netherlands Taal Avonturen</NuxtLink>
      <nav>
        <NuxtLink to="/graph">Graph</NuxtLink>
        <NuxtLink to="/reading">Reading</NuxtLink>
        <NuxtLink to="/vocabulary">Vocabulary</NuxtLink>
        <NuxtLink to="/grammar">Grammar</NuxtLink>
        <NuxtLink to="/progress">Progress</NuxtLink>
      </nav>
    </header>
    <main><NuxtPage /></main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Fraunces:opsz,wght@9..144,600&display=swap');
:root { color: #20302d; background: #f6f4ee; font-family: 'DM Sans', sans-serif; }
* { box-sizing: border-box; }
body { margin: 0; }
a { color: inherit; }
.app-shell { min-height: 100vh; }
.topbar { max-width: 1100px; margin: auto; padding: 28px 28px 18px; display: flex; justify-content: space-between; align-items: center; }
.brand { font: 600 25px Fraunces, serif; text-decoration: none; color: #176b5b; }
.topbar nav { display: flex; gap: 20px; }
.topbar nav a { text-decoration: none; font-size: 14px; color: #52645f; font-weight: 500; transition: color 0.2s; }
.topbar nav a:hover { color: #176b5b; }
.topbar nav a.router-link-active { color: #176b5b; font-weight: 700; }
main { max-width: 1100px; margin: auto; padding: 30px 28px 80px; }
.eyebrow { color: #d06b3c; text-transform: uppercase; letter-spacing: .14em; font-size: 12px; font-weight: 700; }
h1, h2 { font-family: Fraunces, serif; font-weight: 600; line-height: 1.1; }
h1 { font-size: clamp(38px, 7vw, 72px); max-width: 700px; margin: 18px 0; }
h2 { font-size: 32px; }
.muted { color: #687873; line-height: 1.6; }
.button { border: 0; border-radius: 999px; background: #176b5b; color: white; padding: 14px 22px; font-weight: 700; text-decoration: none; cursor: pointer; display: inline-block; }
.button.secondary { background: #e0ebe5; color: #176b5b; }
.card { background: white; border: 1px solid #e1e5de; border-radius: 22px; padding: 28px; box-shadow: 0 12px 35px #1c4d3b0c; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 22px; }
@media (max-width: 600px) { main { padding: 20px 18px 60px; } .topbar { padding: 22px 18px; } }
</style>
