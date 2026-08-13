import type { LearnerMemory, SkillDimension, ConceptState } from '~/types/learning'

const storageKey = 'dutch-adventure-memory'

const emptyConcept = (): ConceptState => ({
  recognition: 0,
  meaning: 0,
  production: 0,
  automaticity: 0,
  listening: 0,
  speaking: 0,
  spelling: 0,
  pragmatic: 0,
  coherence: 0,
  idiomatic: 0,
  encounters: 0,
  successes: 0
})

const emptyMemory = (): LearnerMemory => ({
  overall: {
    recognition: 0,
    meaning: 0,
    production: 0,
    automaticity: 0,
    listening: 0,
    speaking: 0,
    spelling: 0,
    pragmatic: 0,
    coherence: 0,
    idiomatic: 0
  },
  vocabulary: {},
  grammar: {},
  idioms: {},
  recentRedlines: []
})

export function useLearnerMemory() {
  const memory = useState<LearnerMemory>('learner-memory', emptyMemory)
  const hydrated = useState('learner-memory-hydrated', () => false)

  function hydrate() {
    if (hydrated.value || !import.meta.client) return
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Migration/Sanitization
        const fresh = emptyMemory()
        if (parsed.overall) {
          for (const skill of Object.keys(fresh.overall) as SkillDimension[]) {
            if (typeof parsed.overall[skill] === 'number') {
              fresh.overall[skill] = Math.max(0, Math.min(100, parsed.overall[skill]))
            }
          }
        }
        if (parsed.vocabulary) fresh.vocabulary = parsed.vocabulary
        if (parsed.grammar) fresh.grammar = parsed.grammar
        if (parsed.idioms) fresh.idioms = parsed.idioms
        if (parsed.recentRedlines) fresh.recentRedlines = parsed.recentRedlines
        memory.value = fresh
      }
    } catch { /* Fail safe */ }
    hydrated.value = true
  }

  function record(
    skills: SkillDimension[],
    outcome: 'correct' | 'acceptable' | 'retry',
    vocabulary?: string[],
    grammar?: string[],
    idioms?: string[],
    changeModifier: number = 0,
    snippet?: string,
    prompt?: string,
    feedback?: any
  ) {
    let change = outcome === 'correct' ? 12 : outcome === 'acceptable' ? 8 : 2
    change = Math.max(1, change + changeModifier)
    const next = JSON.parse(JSON.stringify(memory.value)) as LearnerMemory

    // Update redlines if needed
    if (feedback && (outcome === 'acceptable' || outcome === 'retry') && (feedback.teacherCorrection || feedback.correction) && prompt && snippet) {
      const redline = {
        id: Math.random().toString(36).substr(2, 9),
        exerciseId: 'recorded-session',
        prompt,
        userAnswer: snippet,
        naturalCorrection: feedback.teacherCorrection?.natural || feedback.correction || '',
        explanation: feedback.teacherCorrection?.explanation || feedback.explanation || feedback.message || '',
        date: new Date().toISOString(),
        vocabulary,
        grammar
      }
      if (!next.recentRedlines) next.recentRedlines = []
      next.recentRedlines.unshift(redline)
      if (next.recentRedlines.length > 10) next.recentRedlines.pop()

      // Also add to concepts
      const addToConceptRedline = (key: string, dict: Record<string, ConceptState>) => {
        if (!dict[key]) dict[key] = emptyConcept()
        if (!dict[key].redlineHistory) dict[key].redlineHistory = []
        dict[key].redlineHistory!.unshift({ 
          userAnswer: snippet, 
          naturalCorrection: redline.naturalCorrection, 
          date: redline.date 
        })
        if (dict[key].redlineHistory!.length > 5) dict[key].redlineHistory!.pop()
      }
      vocabulary?.forEach(v => addToConceptRedline(v, next.vocabulary))
      grammar?.forEach(g => addToConceptRedline(g, next.grammar))
      idioms?.forEach(i => addToConceptRedline(i, next.idioms))
    }

    // Update overall
    for (const skill of skills) {
      next.overall[skill] = Math.min(100, next.overall[skill] + change)
    }

    // Update concepts
    const updateConcept = (key: string, dict: Record<string, ConceptState>) => {
      if (!dict[key]) dict[key] = emptyConcept()
      
      dict[key].encounters++
      dict[key].lastEncountered = new Date().toISOString()
      
      if (snippet && (outcome === 'correct' || outcome === 'acceptable')) {
        if (!dict[key].usageHistory) dict[key].usageHistory = []
        dict[key].usageHistory!.unshift({ snippet, date: new Date().toISOString() })
        if (dict[key].usageHistory!.length > 5) dict[key].usageHistory!.pop()
      }

      if (outcome === 'correct' || outcome === 'acceptable') {
        dict[key].successes++
      }

      for (const skill of skills) {
        if (skill in dict[key]) {
          const s = skill as keyof ConceptState
          dict[key][s] = Math.min(100, dict[key][s] + change)
        }
      }
    }

    if (vocabulary) vocabulary.forEach(v => updateConcept(v, next.vocabulary))
    if (grammar) grammar.forEach(g => updateConcept(g, next.grammar))
    if (idioms) idioms.forEach(i => updateConcept(i, next.idioms))

    memory.value = next
    if (import.meta.client) localStorage.setItem(storageKey, JSON.stringify(next))
  }

  function recordExposure(word: string, skills: SkillDimension[] = ['recognition', 'meaning']) {
    const next = JSON.parse(JSON.stringify(memory.value)) as LearnerMemory
    if (!next.vocabulary[word]) next.vocabulary[word] = emptyConcept()
    
    next.vocabulary[word].encounters++
    next.vocabulary[word].successes++ // Exposure counts as success for recognition
    next.vocabulary[word].lastEncountered = new Date().toISOString()

    for (const skill of skills) {
      if (skill in next.vocabulary[word]) {
        next.vocabulary[word][skill] = Math.min(100, next.vocabulary[word][skill] + 5)
      }
    }
    memory.value = next
    if (import.meta.client) localStorage.setItem(storageKey, JSON.stringify(next))
  }

  function reset() {
    memory.value = emptyMemory()
    if (import.meta.client) localStorage.removeItem(storageKey)
  }

  function getWeakConcepts(limit = 5) {
    const vList = Object.entries(memory.value.vocabulary)
      .map(([key, state]) => ({ 
        key, 
        score: (state.production + state.automaticity) / 2,
        ratio: state.encounters > 0 ? state.successes / state.encounters : 1
      }))
      .sort((a, b) => a.score - b.score || a.ratio - b.ratio)
      .slice(0, limit)
      .map(i => i.key)

    const gList = Object.entries(memory.value.grammar)
      .map(([key, state]) => ({ 
        key, 
        score: (state.production + state.automaticity) / 2,
        ratio: state.encounters > 0 ? state.successes / state.encounters : 1
      }))
      .sort((a, b) => a.score - b.score || a.ratio - b.ratio)
      .slice(0, Math.ceil(limit / 2))
      .map(i => i.key)

    return { vocabulary: vList, grammar: gList }
  }

  function getFrontierConcepts(limit = 3) {
    const vList = Object.entries(memory.value.vocabulary)
      .filter(([_, state]) => state.recognition > 60 && state.production < 30)
      .map(([key, state]) => ({
        key,
        kind: 'vocabulary',
        passive: state.recognition,
        active: state.production
      }))

    const gList = Object.entries(memory.value.grammar)
      .filter(([_, state]) => state.recognition > 60 && state.production < 30)
      .map(([key, state]) => ({
        key,
        kind: 'grammar',
        passive: state.recognition,
        active: state.production
      }))

    return [...vList, ...gList]
      .sort((a, b) => b.passive - a.passive)
      .slice(0, limit)
  }

  return { memory, hydrated, hydrate, record, recordExposure, reset, getWeakConcepts, getFrontierConcepts }
}