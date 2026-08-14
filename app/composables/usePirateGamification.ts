import { useLearnerMemory } from '~/composables/useLearnerMemory'

export interface PirateProfile {
  pirateName: string
  crewName: string
  avatar: string
  title: string
  extraBounty: number
  berries: number
  battlesWon: number
  streakDays: number
  lastSaileddate: string
  unlockedTitles: string[]
  unlockedTreasures: string[]
  soundEffectsEnabled: boolean
}

const defaultProfile: PirateProfile = {
  pirateName: 'Taalpiraat',
  crewName: 'Strohoed Bemanning',
  avatar: 'pirate-luffy',
  title: 'Rookie Piraat van Oost-Blauw',
  extraBounty: 0,
  berries: 1250,
  battlesWon: 0,
  streakDays: 3,
  lastSaileddate: new Date().toISOString(),
  unlockedTitles: ['Rookie Piraat van Oost-Blauw'],
  unlockedTreasures: ['Kompas van de Log Pose', 'Woordenboek der Zeven Zeeën'],
  soundEffectsEnabled: true
}

export function usePirateGamification() {
  const { memory, hydrate } = useLearnerMemory()
  const profile = useState<PirateProfile>('pirate-profile', () => defaultProfile)
  const hydrated = useState('pirate-profile-hydrated', () => false)

  function hydrateProfile() {
    hydrate()
    if (hydrated.value || !import.meta.client) return
    try {
      const stored = localStorage.getItem('dutch-adventure-pirate-profile')
      if (stored) {
        profile.value = { ...defaultProfile, ...JSON.parse(stored) }
      }
    } catch {
      /* Fallback to default */
    }
    hydrated.value = true
  }

  function persistProfile() {
    if (import.meta.client) {
      localStorage.setItem('dutch-adventure-pirate-profile', JSON.stringify(profile.value))
    }
  }

  // Calculate dynamic bounty in Beri (฿) based on learner's language prowess
  const calculatedBounty = computed(() => {
    let bounty = 30000 // Base starting rookie bounty

    // 1. Vocabulary knowledge
    const vocabList = Object.values(memory.value.vocabulary || {})
    vocabList.forEach(v => {
      bounty += Math.round(v.recognition * 1500)
      bounty += Math.round(v.production * 5000)
      if (v.production > 80) bounty += 100000 // Mastered word bounty
    })

    // 2. Grammar mastery
    const grammarList = Object.values(memory.value.grammar || {})
    grammarList.forEach(g => {
      bounty += Math.round(g.production * 15000)
      bounty += Math.round(g.automaticity * 20000)
    })

    // 3. Overall skill dimension bounties
    const overall = memory.value.overall
    if (overall) {
      bounty += Math.round(overall.recognition * 10000)
      bounty += Math.round(overall.listening * 15000)
      bounty += Math.round(overall.speaking * 25000)
      bounty += Math.round(overall.production * 20000)
      bounty += Math.round(overall.automaticity * 35000)
      bounty += Math.round((overall.pragmatic || 0) * 30000)
    }

    // 4. Battles and bonuses
    bounty += profile.value.battlesWon * 2500000
    bounty += profile.value.extraBounty

    return bounty
  })

  // Crew Rank Title based on Bounty
  const crewRank = computed(() => {
    const b = calculatedBounty.value
    if (b < 200000) return { title: 'Kajuitjongen (Cabin Boy)', tier: 'A1', icon: '🧹', sector: 'Oost-Blauw' }
    if (b < 1000000) return { title: 'Dekzwabber (Swabber)', tier: 'A1', icon: '⚓', sector: 'Oost-Blauw' }
    if (b < 5000000) return { title: 'Dappere Matroos (Sailor)', tier: 'A2', icon: '🧭', sector: 'Grand Line Entree' }
    if (b < 20000000) return { title: 'Ervaren Bootsman (Boatswain)', tier: 'A2', icon: '⚔️', sector: 'Grand Line' }
    if (b < 80000000) return { title: 'Kwartiermeester (Quartermaster)', tier: 'B1', icon: '🗺️', sector: 'Sabaody Archipel' }
    if (b < 250000000) return { title: 'Eerste Stuurman (First Mate)', tier: 'B1', icon: '⚡', sector: 'Sabaody Archipel' }
    if (b < 1000000000) return { title: 'Grote Piraat Kapitein (Captain)', tier: 'B2', icon: '👑', sector: 'Nieuwe Wereld' }
    return { title: 'Koning der Taalpiraten (Language King)', tier: 'B2+', icon: '🏴‍☠️', sector: 'Laugh Tale' }
  })

  // Haki levels (0 - 100 scale)
  const hakiLevels = computed(() => {
    const overall = memory.value.overall || { recognition: 0, listening: 0, production: 0, automaticity: 0, pragmatic: 0 }
    
    // Kenbunshoku (Observation): Listening & Recognition
    const observation = Math.min(100, Math.round(((overall.recognition || 0) * 0.5) + ((overall.listening || 0) * 0.5)))
    
    // Busoshoku (Armament): Production & Grammar
    const grammarScores = Object.values(memory.value.grammar || {})
    const grammarAvg = grammarScores.length > 0 
      ? grammarScores.reduce((acc, g) => acc + g.production, 0) / grammarScores.length 
      : 0
    const armament = Math.min(100, Math.round(((overall.production || 0) * 0.5) + (grammarAvg * 0.5)))

    // Haoshoku (Conqueror's): Automaticity, Speaking & Pragmatics
    const conqueror = Math.min(100, Math.round(((overall.automaticity || 0) * 0.4) + ((overall.speaking || 0) * 0.3) + ((overall.pragmatic || 0) * 0.3)))

    return {
      observation: {
        name: 'Observatie Haki (Kenbunshoku)',
        description: 'Voorspel de betekenis van woorden en luister natuurlijk.',
        score: observation,
        color: '#06d6a0',
        badge: '👁️ OOG VAN HET WOORD'
      },
      armament: {
        name: 'Wapens Haki (Busoshoku)',
        description: 'Smeed onbreekbare zinnen met sterke woordvolgorde en grammatica.',
        score: armament,
        color: '#e63946',
        badge: '🛡️ GRAMMATICA PANTSER'
      },
      conqueror: {
        name: 'Veroveraars Haki (Haoshoku)',
        description: 'Spreek met automatische snelheid en overtuigende B2 flair.',
        score: conqueror,
        color: '#7209b7',
        badge: '⚡ VLOEIENDE DOMINANTIE'
      }
    }
  })

  // Devil Fruit Awakening Status
  const devilFruit = computed(() => {
    const overallAvg = (hakiLevels.value.observation.score + hakiLevels.value.armament.score + hakiLevels.value.conqueror.score) / 3
    let stage = 'Nog Niet Ontwaakt'
    let power = 'Basis Taal-Begrip'

    if (overallAvg > 75) {
      stage = 'Volledig Ontwaakt (Awakened)'
      power = 'Vloeiend B2 Spreken & Moeiteloze Automatische Zinsbouw'
    } else if (overallAvg > 50) {
      stage = 'Gedeeltelijk Ontwaakt (Gear 4)'
      power = 'Snelle Zinsinversie & Natuurlijke Pragmatische Verzachting'
    } else if (overallAvg > 25) {
      stage = 'Ontluikende Kracht (Gear 2)'
      power = 'Verbinden van Gedachten & Pronominale Woorden'
    }

    return {
      name: 'Woord-Woord Vrucht (Gomu Gomu no Taal)',
      type: 'Paramecia Taal-Type',
      stage,
      power,
      masteryPercent: Math.round(overallAvg)
    }
  })

  // Reward functions
  function addBounty(amount: number, berryReward = Math.round(amount / 500)) {
    profile.value.extraBounty += amount
    profile.value.berries += berryReward
    persistProfile()
  }

  function recordBattleWin(difficultyBonus = 500000) {
    profile.value.battlesWon++
    profile.value.berries += 250
    profile.value.extraBounty += difficultyBonus
    persistProfile()
  }

  function toggleSoundEffects() {
    profile.value.soundEffectsEnabled = !profile.value.soundEffectsEnabled
    persistProfile()
  }

  return {
    profile,
    hydrated,
    hydrateProfile,
    calculatedBounty,
    crewRank,
    hakiLevels,
    devilFruit,
    addBounty,
    recordBattleWin,
    toggleSoundEffects
  }
}
