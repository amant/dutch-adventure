<script setup lang="ts">
import { usePirateGamification } from '~/composables/usePirateGamification'
import { useGsapAnimations } from '~/composables/useGsapAnimations'

interface BossOpponent {
  id: string
  name: string
  title: string
  avatar: string
  maxHp: number
  bountyReward: number
  sector: string
  introDialogue: string
  attacks: {
    name: string
    prompt: string
    options: { text: string; isCorrect: boolean; damage: number }[]
    explanation: string
  }[]
}

const opponents: BossOpponent[] = [
  {
    id: 'smoker',
    name: 'Kapitein Smoker',
    title: 'Marine Kapitein der Grammatica',
    avatar: '💨',
    maxHp: 100,
    bountyReward: 2500000,
    sector: 'Oost-Blauw (Loguetown)',
    introDialogue: 'Jij denkt dat je de Grand Line op kunt varen zonder de Nederlandse inversie te beheersen?! Laat maar zien!',
    attacks: [
      {
        name: 'Inversie Aanval (Word Order)',
        prompt: 'Voltooi de zin: "Morgen [...] ik naar Amsterdam."',
        options: [
          { text: 'ga', isCorrect: true, damage: 35 },
          { text: 'ik ga', isCorrect: false, damage: 0 },
          { text: 'gaan', isCorrect: false, damage: 0 }
        ],
        explanation: 'Na een tijdsbepaling ("Morgen") komt eerst de persoonsvorm ("ga") en dan het onderwerp ("ik")!'
      },
      {
        name: 'Voegwoord Schot (Subordinate Clause)',
        prompt: 'Kies de juiste zinsbouw: "Ik blijf thuis, omdat..."',
        options: [
          { text: 'het vandaag regent.', isCorrect: true, damage: 35 },
          { text: 'regent het vandaag.', isCorrect: false, damage: 0 },
          { text: 'het regent vandaag.', isCorrect: false, damage: 0 }
        ],
        explanation: 'In een bijzin met "omdat" gaan alle werkwoorden naar het einde van de zin.'
      },
      {
        name: 'Santoryu Zwaard-Finale (Er & Positie)',
        prompt: 'Welk woord ontbreekt: "Wat staat [...] op tafel?"',
        options: [
          { text: 'er', isCorrect: true, damage: 40 },
          { text: 'daar', isCorrect: false, damage: 0 },
          { text: 'het', isCorrect: false, damage: 0 }
        ],
        explanation: 'We gebruiken subjectief "er" bij onbepaalde onderwerpen en vraagzinnen met positiewerkwoorden.'
      }
    ]
  },
  {
    id: 'aokiji',
    name: 'Admiraal Aokiji',
    title: 'Marine Admiraal van de IJzige Nuance',
    avatar: '❄️',
    maxHp: 120,
    bountyReward: 5000000,
    sector: 'Marineford (B1/B2)',
    introDialogue: 'Ararara... Te direct spreken breekt het ijs niet, piraat. Kun jij diplomatiek en vloeiend verzachten?',
    attacks: [
      {
        name: 'Pragmatische Verzachting (Diplomatic Softener)',
        prompt: 'Maak deze directe afwijzing beleefd en diplomatiek: "Dat kan niet."',
        options: [
          { text: 'Dat zou misschien lastig kunnen worden.', isCorrect: true, damage: 40 },
          { text: 'Dat is onmogelijk.', isCorrect: false, damage: 0 },
          { text: 'Ik wil dat niet doen.', isCorrect: false, damage: 0 }
        ],
        explanation: 'Gebruik "zou", "misschien" en "lastig" om een botte mededeling professioneel te verzachten.'
      },
      {
        name: 'Pronominaal Adverbium Bliksem (Pronominal Merge)',
        prompt: 'Vervang "met + het" in een natuurlijke zin: "Ik speel [...]"',
        options: [
          { text: 'ermee', isCorrect: true, damage: 40 },
          { text: 'met het', isCorrect: false, damage: 0 },
          { text: 'daarmee', isCorrect: false, damage: 0 }
        ],
        explanation: '"Met + het" smelt altijd samen tot "ermee" (waarbij "met" verandert in "mee").'
      },
      {
        name: 'Concessie Beheersing (Contrast Mastery)',
        prompt: 'Kies het juiste contrast-voegwoord: "[...] het regent, gaan we toch varen."',
        options: [
          { text: 'Hoewel', isCorrect: true, damage: 50 },
          { text: 'Ondanks', isCorrect: false, damage: 0 },
          { text: 'Want', isCorrect: false, damage: 0 }
        ],
        explanation: '"Hoewel" leidt een bijzin in met het werkwoord aan het einde.'
      }
    ]
  }
]

const { profile, recordBattleWin, addBounty } = usePirateGamification()
const { animateSlashImpact, animateDamageShake, animateHakiBurst } = useGsapAnimations()

const currentBossIndex = ref(0)
const currentBoss = computed(() => opponents[currentBossIndex.value])

const currentAttackIndex = ref(0)
const playerHp = ref(100)
const bossHp = ref(100)
const battleStatus = ref<'intro' | 'player-turn' | 'boss-turn' | 'victory' | 'defeat'>('intro')
const combatLog = ref<string[]>([])
const sfxBadge = ref<string | null>(null)
const arenaRef = ref<HTMLElement | null>(null)
const bossRef = ref<HTMLElement | null>(null)

function startBattle() {
  playerHp.value = 100
  bossHp.value = currentBoss.value.maxHp
  currentAttackIndex.value = 0
  combatLog.value = [`⚔️ Het gevecht tegen ${currentBoss.value.name} is begonnen!`]
  battleStatus.value = 'player-turn'
}

function handleAttackOption(option: { text: string; isCorrect: boolean; damage: number }) {
  if (battleStatus.value !== 'player-turn') return

  if (option.isCorrect) {
    sfxBadge.value = 'DON!! 💥'
    bossHp.value = Math.max(0, bossHp.value - option.damage)
    combatLog.value.unshift(`🔥 KRITIEKE SLAG! Jij gebruikt "${option.text}" en doet ${option.damage} schade!`)
    
    if (bossRef.value) {
      animateSlashImpact(bossRef)
    }

    if (bossHp.value <= 0) {
      setTimeout(() => {
        battleStatus.value = 'victory'
        recordBattleWin(currentBoss.value.bountyReward)
        sfxBadge.value = 'GEWELDIG!! 🏆'
      }, 700)
      return
    }

    currentAttackIndex.value = (currentAttackIndex.value + 1) % currentBoss.value.attacks.length
  } else {
    sfxBadge.value = 'MISSLAG! ❌'
    playerHp.value = Math.max(0, playerHp.value - 25)
    combatLog.value.unshift(`⚠️ MISSLAG! "${option.text}" is onjuist. ${currentBoss.value.name} valt terug aan (-25 HP)!`)
    
    if (arenaRef.value) {
      animateDamageShake(arenaRef)
    }

    if (playerHp.value <= 0) {
      battleStatus.value = 'defeat'
      return
    }
  }
}

function nextOpponent() {
  currentBossIndex.value = (currentBossIndex.value + 1) % opponents.length
  startBattle()
}
</script>

<template>
  <div ref="arenaRef" class="battle-arena card">
    <!-- Arena Header -->
    <div class="arena-header">
      <div class="header-badge">
        <span class="sector-pill">{{ currentBoss.sector }}</span>
        <ComicSoundBadge v-if="sfxBadge" :text="sfxBadge" variant="red" size="sm" />
      </div>
      <h2 class="battle-title">Taalgevecht Arena</h2>
      <p class="muted">Gebruik je Nederlandse grammatica & woordkennis om tegenstanders te verslaan!</p>
    </div>

    <!-- Battle Stage: Fighters & HP Bars -->
    <div class="battle-stage">
      <!-- Player Fighter -->
      <div class="fighter player-side">
        <div class="avatar-box">
          <span class="avatar-emoji">🏴‍☠️</span>
          <span class="fighter-name">{{ profile.pirateName }}</span>
        </div>
        <div class="hp-gauge">
          <div class="hp-label">
            <span>HP</span>
            <span>{{ playerHp }} / 100</span>
          </div>
          <div class="hp-track">
            <div class="hp-fill player" :style="{ width: `${playerHp}%` }"></div>
          </div>
        </div>
      </div>

      <!-- VS Sign -->
      <div class="vs-badge">
        <span>VS</span>
      </div>

      <!-- Boss Fighter -->
      <div ref="bossRef" class="fighter boss-side">
        <div class="avatar-box">
          <span class="avatar-emoji">{{ currentBoss.avatar }}</span>
          <span class="fighter-name">{{ currentBoss.name }}</span>
        </div>
        <div class="hp-gauge">
          <div class="hp-label">
            <span>HP</span>
            <span>{{ bossHp }} / {{ currentBoss.maxHp }}</span>
          </div>
          <div class="hp-track">
            <div class="hp-fill boss" :style="{ width: `${(bossHp / currentBoss.maxHp) * 100}%` }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Battle Interaction Center -->
    <div v-if="battleStatus === 'intro'" class="battle-interaction intro-panel anime-card">
      <div class="boss-dialogue-bubble">
        <span class="speaker">{{ currentBoss.name }}:</span>
        <p class="dialogue-text">"{{ currentBoss.introDialogue }}"</p>
      </div>
      <div class="intro-actions">
        <button class="anime-btn red lg" @click="startBattle">
          <span>⚔️ START HET TAALGEVECHT!</span>
        </button>
      </div>
    </div>

    <div v-else-if="battleStatus === 'player-turn'" class="battle-interaction combat-panel anime-card">
      <div class="attack-prompt-header">
        <span class="eyebrow">{{ currentBoss.attacks[currentAttackIndex].name }}</span>
        <h3 class="prompt-text">{{ currentBoss.attacks[currentAttackIndex].prompt }}</h3>
      </div>

      <div class="attack-options-grid">
        <button 
          v-for="(option, idx) in currentBoss.attacks[currentAttackIndex].options" 
          :key="idx"
          class="anime-btn attack-choice-btn"
          @click="handleAttackOption(option)"
        >
          <span class="choice-num">{{ idx + 1 }}.</span>
          <span class="choice-text">{{ option.text }}</span>
        </button>
      </div>
    </div>

    <!-- Victory Screen -->
    <div v-else-if="battleStatus === 'victory'" class="battle-interaction victory-panel anime-card">
      <ComicSoundBadge text="OVERWINNING!! 🎉" variant="gold" size="lg" />
      <h2 class="victory-title">GEWELDIG! JE HEBT GEWONNEN!</h2>
      <p class="victory-sub">{{ currentBoss.name }} erkent jouw Nederlandse taalbeheersing!</p>
      
      <div class="rewards-box">
        <div class="reward-item">
          <span class="reward-label">PREMIE VERHOGING:</span>
          <span class="reward-val gold-text">+ ฿ {{ currentBoss.bountyReward.toLocaleString('nl-NL') }}</span>
        </div>
        <div class="reward-item">
          <span class="reward-label">BERRIES BONUS:</span>
          <span class="reward-val">+ 250 🪙</span>
        </div>
      </div>

      <div class="victory-actions">
        <button class="anime-btn gold" @click="nextOpponent">
          <span>VOLGENDE TEGENSTANDER ⚔️</span>
        </button>
        <NuxtLink to="/map" class="anime-btn secondary">
          <span>TERUG NAAR DE ZEEKAART 🗺️</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Defeat Screen -->
    <div v-else-if="battleStatus === 'defeat'" class="battle-interaction defeat-panel anime-card">
      <h2 class="defeat-title">VERLOREN... 🌊</h2>
      <p>Je zinsbouw was niet sterk genoeg voor {{ currentBoss.name }}. Train je Haki en probeer het opnieuw!</p>
      <button class="anime-btn red" @click="startBattle">
        <span>HERKANSING! 🔄</span>
      </button>
    </div>

    <!-- Combat Log -->
    <div class="combat-log-container">
      <div class="log-title">📜 GEVECHTSLOG</div>
      <div class="log-entries">
        <div v-for="(entry, idx) in combatLog.slice(0, 4)" :key="idx" class="log-item">
          {{ entry }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.battle-arena {
  background: #ffffff;
  border: 1px solid rgba(2, 132, 199, 0.2);
  border-radius: $radius-anime;
  box-shadow: $shadow-anime;
  padding: 24px;
  margin: 24px 0;
}

.arena-header {
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 14px;
  margin-bottom: 20px;

  .header-badge {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .sector-pill {
    background: $anime-blue-deep;
    color: white;
    font-family: $font-anime-title;
    font-size: 11px;
    font-weight: 800;
    padding: 3px 8px;
    border-radius: 4px;
  }

  .battle-title {
    margin: 6px 0 4px;
    font-size: 1.8rem;
    color: $anime-navy;
  }
}

.battle-stage {
  background: #0b192c;
  background-image: linear-gradient(180deg, #0b192c 0%, #081426 100%);
  border: 1px solid rgba(2, 132, 199, 0.3);
  border-radius: $radius-anime-sm;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
}

.fighter {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;

  .avatar-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 8px;

    .avatar-emoji {
      font-size: 48px;
      filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.4));
    }

    .fighter-name {
      font-family: $font-anime-title;
      font-size: 13px;
      font-weight: 800;
      color: #ffffff;
      margin-top: 4px;
    }
  }

  .hp-gauge {
    width: 100%;

    .hp-label {
      display: flex;
      justify-content: space-between;
      font-family: $font-anime-title;
      font-size: 11px;
      font-weight: 800;
      color: $anime-cyan-light;
      margin-bottom: 3px;
    }

    .hp-track {
      height: 12px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      overflow: hidden;

      .hp-fill {
        height: 100%;
        transition: width 0.3s ease;

        &.player {
          background: linear-gradient(90deg, #10b981 0%, #06b6d4 100%);
        }

        &.boss {
          background: linear-gradient(90deg, #ef4444 0%, #b91c1c 100%);
        }
      }
    }
  }
}

.vs-badge {
  font-family: $font-anime-title;
  font-size: 20px;
  font-weight: 900;
  color: #ffffff;
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  background: $anime-blue-primary;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px rgba(2, 132, 199, 0.5);
}

.battle-interaction {
  background: #ffffff;
  padding: 20px;
  border-radius: $radius-anime-sm;
  border: 1px solid #e2e8f0;
  margin-bottom: 20px;

  &.victory-panel {
    text-align: center;
    background: #ffffff;
    border-color: rgba(245, 158, 11, 0.3);

    .victory-title {
      font-size: 1.6rem;
      color: $anime-navy;
      margin: 12px 0 6px;
    }

    .rewards-box {
      display: inline-flex;
      flex-direction: column;
      gap: 6px;
      background: $anime-ice;
      border: 1px solid rgba(2, 132, 199, 0.2);
      border-radius: 6px;
      padding: 12px 24px;
      margin: 14px 0 20px;
      font-family: $font-anime-title;

      .reward-val {
        font-size: 16px;
        font-weight: 800;
      }
    }

    .victory-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
    }
  }

  &.intro-panel {
    text-align: center;

    .boss-dialogue-bubble {
      background: $anime-ice;
      border: 1px solid rgba(2, 132, 199, 0.2);
      border-radius: 6px;
      padding: 14px;
      margin-bottom: 16px;

      .speaker {
        font-family: $font-anime-title;
        font-weight: 800;
        color: $anime-blue-deep;
        font-size: 13px;
      }

      .dialogue-text {
        font-size: 15px;
        font-style: normal;
        margin: 4px 0 0;
        color: $ink-dark;
      }
    }
  }

  &.combat-panel {
    .attack-prompt-header {
      margin-bottom: 16px;

      .prompt-text {
        margin: 6px 0;
        font-size: 1.3rem;
        color: $anime-navy;
      }
    }

    .attack-options-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;

      .attack-choice-btn {
        background: #ffffff;
        color: $ink-black;
        border: 1px solid rgba(2, 132, 199, 0.25);
        box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
        text-align: left;
        justify-content: flex-start;
        padding: 12px 18px;
        font-size: 14px;
        font-weight: 600;

        &:hover {
          background: $anime-ice;
          border-color: $anime-blue-primary;
          transform: translateY(-1px);
        }

        .choice-num {
          font-family: $font-anime-title;
          color: $anime-blue-deep;
          font-weight: 800;
          margin-right: 4px;
        }
      }
    }
  }
}

.combat-log-container {
  background: #0b192c;
  color: #94a3b8;
  border-radius: 6px;
  padding: 12px;
  font-size: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  .log-title {
    font-family: $font-anime-title;
    font-size: 11px;
    font-weight: 800;
    color: $anime-cyan-light;
    margin-bottom: 6px;
    letter-spacing: 0.06em;
  }

  .log-item {
    margin-bottom: 4px;
    line-height: 1.4;
  }
}

@media (max-width: 640px) {
  .battle-stage {
    flex-direction: column;
    gap: 16px;

    .fighter { width: 100%; }
  }
}
</style>
