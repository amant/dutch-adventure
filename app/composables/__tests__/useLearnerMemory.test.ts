import { describe, it, expect, beforeEach } from 'vitest'
import { useLearnerMemory } from '~/composables/useLearnerMemory'
import type { ConceptState } from '~/types/learning'

const emptyState: ConceptState = {
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
  encounters: 1,
  successes: 1,
}

describe('useLearnerMemory', () => {
  beforeEach(() => {
    const memory = useLearnerMemory()
    memory.reset()
    memory.hydrated.value = false
  })

  it('starts with empty memory and zeroed overall skills', () => {
    const { memory } = useLearnerMemory()
    expect(memory.value.vocabulary).toEqual({})
    expect(memory.value.grammar).toEqual({})
    expect(memory.value.idioms).toEqual({})
    for (const value of Object.values(memory.value.overall)) {
      expect(value).toBe(0)
    }
  })

  it('record updates overall skills and creates concepts', () => {
    const { memory, record } = useLearnerMemory()
    record(['production', 'grammar'], 'correct', ['wonen'], ['omdat-clause'])

    expect(memory.value.overall.production).toBe(12)
    expect(memory.value.overall.grammar).toBe(12)

    const concept = memory.value.vocabulary['wonen']
    expect(concept).toBeDefined()
    expect(concept!.production).toBe(12)
    expect(concept!.encounters).toBe(1)
    expect(concept!.successes).toBe(1)
    expect(concept!.lastEncountered).toBeDefined()

    expect(memory.value.grammar['omdat-clause']).toBeDefined()
  })

  it('record applies the changeModifier and enforces a minimum change', () => {
    const { memory, record } = useLearnerMemory()
    record(['production'], 'correct', ['wonen'], undefined, undefined, 5)
    expect(memory.value.overall.production).toBe(17)

    record(['production'], 'retry', ['wonen'], undefined, undefined, -100)
    expect(memory.value.overall.production).toBe(18)
  })

  it('record caps skill scores at 100', () => {
    const { memory, record } = useLearnerMemory()
    record(['production'], 'correct', ['wonen'], undefined, undefined, 100)
    expect(memory.value.overall.production).toBe(100)
    expect(memory.value.vocabulary['wonen']!.production).toBe(100)
  })

  it('record stores usage history for correct answers without duplicates', () => {
    const { memory, record } = useLearnerMemory()
    record(['production'], 'correct', ['wonen'], undefined, undefined, 0, 'Ik woon in Amsterdam', 'Waar woon je?')
    record(['production'], 'correct', ['wonen'], undefined, undefined, 0, 'Ik woon in Amsterdam', 'Waar woon je?')

    expect(memory.value.vocabulary['wonen']!.usageHistory).toHaveLength(1)
    expect(memory.value.vocabulary['wonen']!.usageHistory![0]).toMatchObject({
      snippet: 'Ik woon in Amsterdam',
      prompt: 'Waar woon je?',
    })
  })

  it('record tracks response times', () => {
    const { memory, record } = useLearnerMemory()
    record(['production'], 'correct', ['wonen'], undefined, undefined, 0, undefined, undefined, undefined, 1.5)
    expect(memory.value.vocabulary['wonen']!.responseTimes).toEqual([1.5])
  })

  it('record adds a redline when an incorrect answer receives a correction', () => {
    const { memory, record } = useLearnerMemory()
    record(['grammar'], 'retry', ['wonen'], undefined, undefined, 0, 'Ik ging', 'Hoe gaat het?', {
      correction: 'Ik ging gisteren',
      message: 'niet goed',
    })

    expect(memory.value.recentRedlines).toHaveLength(1)
    expect(memory.value.recentRedlines![0]).toMatchObject({
      prompt: 'Hoe gaat het?',
      userAnswer: 'Ik ging',
      naturalCorrection: 'Ik ging gisteren',
      explanation: 'niet goed',
    })
    expect(memory.value.vocabulary['wonen']!.redlineHistory).toHaveLength(1)
  })


  it('record does not create a redline for correct answers', () => {
    const { memory, record } = useLearnerMemory()
    record(['grammar'], 'correct', ['wonen'], undefined, undefined, 0, 'Ik ging', 'Hoe gaat het?', {
      correction: 'ik ging',
    })
    expect(memory.value.recentRedlines).toEqual([])
  })

  it('recordExposure creates a concept and boosts recognition', () => {
    const { memory, recordExposure } = useLearnerMemory()
    recordExposure('fiets')

    const concept = memory.value.vocabulary['fiets']
    expect(concept).toBeDefined()
    expect(concept!.encounters).toBe(1)
    expect(concept!.successes).toBe(1)
    expect(concept!.recognition).toBe(5)
    expect(concept!.meaning).toBe(5)
    expect(concept!.lastEncountered).toBeDefined()
  })

  it('getWeakConcepts returns the weakest concepts first', () => {
    const { record, getWeakConcepts } = useLearnerMemory()
    record(['production'], 'correct', ['sterk'], undefined, undefined, 100)
    record(['production'], 'retry', ['zwak'])

    const result = getWeakConcepts()
    expect(result.vocabulary).toEqual(['zwak', 'sterk'])
  })

  it('getFrontierConcepts returns high-recognition / low-production concepts', () => {
    const { recordExposure, record, getFrontierConcepts } = useLearnerMemory()
    recordExposure('zon')
    record(['recognition'], 'correct', ['zon'], undefined, undefined, 60)

    const frontier = getFrontierConcepts()
    expect(frontier).toHaveLength(1)
    expect(frontier[0]).toMatchObject({ key: 'zon', kind: 'vocabulary' })
    expect(frontier[0]!.passive).toBeGreaterThan(60)
    expect(frontier[0]!.active).toBeLessThan(30)
  })

  it('getWordState classifies mastery levels', () => {
    const { record, getWordState } = useLearnerMemory()

    expect(getWordState('onbekend')).toBe('new')

    record(['production'], 'correct', ['meester'], undefined, undefined, 100)
    expect(getWordState('meester')).toBe('mastered')

    record(['recognition'], 'correct', ['grens'], undefined, undefined, 60)
    expect(getWordState('grens')).toBe('frontier')

    record(['recognition'], 'correct', ['bekend'], undefined, undefined, 30)
    expect(getWordState('bekend')).toBe('recognized')
  })

  it('hydrate loads and sanitizes stored memory', () => {
    const { memory, hydrate, hydrated } = useLearnerMemory()
    localStorage.setItem('dutch-adventure-memory', JSON.stringify({
      overall: { production: 150, meaning: -5, grammar: 'nope' },
      vocabulary: { fiets: { encounters: 1, successes: 1 } },
    }))

    hydrate()

    expect(memory.value.overall.production).toBe(100)
    expect(memory.value.overall.meaning).toBe(0)
    expect(memory.value.overall.grammar).toBe(0)
    expect(memory.value.vocabulary['fiets']).toBeDefined()
    expect(hydrated.value).toBe(true)
  })

  it('caps recent redlines at 10 and per-concept redline history at 5', () => {
    const { memory, record } = useLearnerMemory()
    for (let i = 0; i < 11; i++) {
      record(['grammar'], 'retry', ['wonen'], ['omdat-clause'], ['klare taal'], 0, `Ik ging ${i}`, 'Hoe gaat het?', { correction: 'ik ging gisteren' })
    }

    expect(memory.value.recentRedlines).toHaveLength(10)
    expect(memory.value.vocabulary['wonen']!.redlineHistory).toHaveLength(5)
    expect(memory.value.grammar['omdat-clause']!.redlineHistory).toHaveLength(5)
    expect(memory.value.idioms['klare taal']!.redlineHistory).toHaveLength(5)
  })

  it('caps response times at 10 and usage history at 5 entries', () => {
    const { memory, record } = useLearnerMemory()
    for (let i = 0; i < 11; i++) {
      record(['production'], 'correct', ['wonen'], undefined, undefined, 0, `Ik woon ${i}`, 'Waar woon je?', undefined, 0.5)
    }

    expect(memory.value.vocabulary['wonen']!.responseTimes).toHaveLength(10)
    expect(memory.value.vocabulary['wonen']!.usageHistory).toHaveLength(5)
  })

  it('getWeakConcepts also ranks grammar concepts', () => {
    const { record, getWeakConcepts } = useLearnerMemory()
    record(['production'], 'retry', ['wonen'], ['omdat-clause'])

    const result = getWeakConcepts()
    expect(result.grammar).toContain('omdat-clause')
  })

  it('getWeakConcepts sorts grammar by score then ratio', () => {
    const { memory, getWeakConcepts } = useLearnerMemory()
    // Two weak concepts with identical scores (ratio decides) and one strong one
    memory.value.grammar['a-concept'] = { ...emptyState, production: 0, automaticity: 0 }
    memory.value.grammar['b-concept'] = { ...emptyState, production: 0, automaticity: 0 }
    memory.value.grammar['c-concept'] = { ...emptyState, production: 100, automaticity: 100 }

    const result = getWeakConcepts()
    expect(result.grammar[0]).toBe('a-concept')
    expect(result.grammar[1]).toBe('b-concept')
    expect(result.grammar).toContain('c-concept')
  })

  it('re-initializes recentRedlines when the field was cleared', () => {
    const { memory, record } = useLearnerMemory()
    memory.value.recentRedlines = undefined as any

    record(['grammar'], 'retry', ['wonen'], undefined, undefined, 0, 'Ik ging', 'Hoe gaat het?', { correction: 'ik ging gisteren' })

    expect(memory.value.recentRedlines).toHaveLength(1)
  })

  it('getFrontierConcepts includes grammar concepts and sorts by passive strength', () => {
    const { record, getFrontierConcepts } = useLearnerMemory()
    record(['recognition'], 'correct', ['wonen'], undefined, undefined, 60)
    record(['recognition'], 'correct', undefined, ['omdat-clause'], undefined, 60)

    const frontier = getFrontierConcepts()
    expect(frontier.some(f => f.kind === 'vocabulary')).toBe(true)
    expect(frontier.some(f => f.kind === 'grammar')).toBe(true)
    expect(frontier[0]!.passive).toBeGreaterThanOrEqual(frontier[1]!.passive)
  })

  it('reset clears all memory', () => {
    const { memory, record, reset } = useLearnerMemory()
    record(['production'], 'correct', ['wonen'])
    expect(memory.value.vocabulary).not.toEqual({})

    reset()
    expect(memory.value.vocabulary).toEqual({})
    expect(memory.value.overall.production).toBe(0)
  })
})
