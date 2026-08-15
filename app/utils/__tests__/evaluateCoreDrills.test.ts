import { describe, it, expect } from 'vitest'
import { evaluateCoreDrills } from '~/utils/evaluateCoreDrills'
import { makeExercise, makeInput } from './evaluationTestUtils'

describe('evaluateCoreDrills', () => {
  it('returns undefined for kinds it does not handle', () => {
    const input = makeInput(makeExercise({ kind: 'typed', target: 'Ik woon in Amsterdam.' }), 'Ik woon in Amsterdam.')
    expect(evaluateCoreDrills(input)).toBeUndefined()
  })

  describe('er-drill', () => {
    const ex = () => makeExercise({
      kind: 'er-drill',
      erDrillData: {
        sentence: 'Ik woon in Amsterdam.',
        options: [
          { text: 'Ik woon er al tien jaar.', isCorrect: true },
          { text: 'Ik woon in er.', isCorrect: false },
        ],
      },
    })

    it('accepts the correct option', () => {
      const fb = evaluateCoreDrills(makeInput(ex(), 'Ik woon er al tien jaar.'))!
      expect(fb.outcome).toBe('correct')
      expect(fb.changeModifier).toBe(3)
    })

    it('rejects a wrong option', () => {
      const fb = evaluateCoreDrills(makeInput(ex(), 'Ik woon in er.'))!
      expect(fb.outcome).toBe('retry')
      expect(fb.explanation).toContain('Review the role of "er"')
    })
  })

  describe('pronominal-drill', () => {
    const ex = () => makeExercise({
      kind: 'pronominal-drill',
      target: 'Ik denk eraan.',
      pronominalData: { sentence: 'Ik denk aan het boek.', preposition: 'aan', object: 'het' },
    })

    it('accepts the merged pronominal adverb', () => {
      const fb = evaluateCoreDrills(makeInput(ex(), 'Ik denk eraan.'))!
      expect(fb.outcome).toBe('correct')
      expect(fb.skills).toContain('production')
      expect(fb.changeModifier).toBe(15)
    })

    it('rejects an unmerged form', () => {
      const fb = evaluateCoreDrills(makeInput(ex(), 'Ik denk aan het.'))!
      expect(fb.outcome).toBe('retry')
      expect(fb.explanation).toContain('merge')
    })
  })

  describe('passive-drill', () => {
    const processEx = () => makeExercise({
      kind: 'passive-drill',
      target: 'Het eten wordt door de kok bereid.',
      passiveData: { activeSentence: 'De kok bereidt het eten.', focus: 'process', agent: 'de kok' },
    })

    it('accepts the exact passive transformation', () => {
      const fb = evaluateCoreDrills(makeInput(processEx(), 'Het eten wordt door de kok bereid.'))!
      expect(fb.outcome).toBe('correct')
      expect(fb.skills).toContain('production')
      expect(fb.changeModifier).toBe(20)
    })

    it('accepts a passive missing the agent', () => {
      const fb = evaluateCoreDrills(makeInput(processEx(), 'Het eten wordt bereid.'))!
      expect(fb.outcome).toBe('acceptable')
      expect(fb.message).toContain('door')
    })

    it('rejects an er-passive that does not start with "Er"', () => {
      const erEx = makeExercise({
        kind: 'passive-drill',
        target: 'Er wordt hier gedanst.',
        passiveData: { activeSentence: 'Men danst hier.', focus: 'er-passive' },
      })
      const fb = evaluateCoreDrills(makeInput(erEx, 'Wordt hier gedanst.'))!
      expect(fb.outcome).toBe('retry')
      expect(fb.message).toContain('Er')
    })
  })

  describe('nominalisation-drill', () => {
    const ex = () => makeExercise({
      kind: 'nominalisation-drill',
      target: 'De groei van het bedrijf is indrukwekkend.',
      nominalisationData: { verbalSentence: 'Het bedrijf groeit.', targetNoun: 'groei' },
    })

    it('accepts the exact nominalised sentence', () => {
      const fb = evaluateCoreDrills(makeInput(ex(), 'De groei van het bedrijf is indrukwekkend.'))!
      expect(fb.outcome).toBe('correct')
      expect(fb.changeModifier).toBe(20)
    })

    it('accepts an answer containing the target noun', () => {
      const fb = evaluateCoreDrills(makeInput(ex(), 'de groei is er'))!
      expect(fb.outcome).toBe('acceptable')
    })

    it('rejects answers without the target noun', () => {
      const fb = evaluateCoreDrills(makeInput(ex(), 'het bedrijf groeit snel'))!
      expect(fb.outcome).toBe('retry')
    })
  })

  describe('reframing-drill', () => {
    const ex = () => makeExercise({
      kind: 'reframing-drill',
      reframingData: {
        bluntSentence: 'Geef me dat rapport.',
        softeningElements: ['misschien', 'zou je'],
        targetContext: 'professionele setting',
      },
    })

    it('accepts when all softeners are used', () => {
      const fb = evaluateCoreDrills(makeInput(ex(), 'zou je misschien even kunnen wachten'))!
      expect(fb.outcome).toBe('correct')
      expect(fb.pragmaticScore).toBe(100)
      expect(fb.skills).toContain('pragmatic')
      expect(fb.changeModifier).toBe(10)
    })

    it('accepts a partial reframe with a lower pragmatic score', () => {
      const fb = evaluateCoreDrills(makeInput(ex(), 'misschien kan ik dat morgen doen'))!
      expect(fb.outcome).toBe('acceptable')
      expect(fb.pragmaticScore).toBe(50)
      expect(fb.changeModifier).toBe(5)
    })

    it('rejects a response with no softeners', () => {
      const fb = evaluateCoreDrills(makeInput(ex(), 'geef me dat rapport nu'))!
      expect(fb.outcome).toBe('retry')
      expect(fb.message).toContain('too direct')
    })
  })

  describe('reported-speech-drill', () => {
    const ex = () => makeExercise({
      kind: 'reported-speech-drill',
      target: 'Hij zei dat hij moe was.',
      reportedSpeechData: { directQuote: 'Ik ben moe.', speaker: 'hij' },
    })

    it('accepts the exact reported sentence', () => {
      const fb = evaluateCoreDrills(makeInput(ex(), 'Hij zei dat hij moe was.'))!
      expect(fb.outcome).toBe('correct')
      expect(fb.skills).toEqual(expect.arrayContaining(['production', 'grammar']))
      expect(fb.changeModifier).toBe(20)
    })

    it('flags "als" instead of "of" in an indirect question', () => {
      const fb = evaluateCoreDrills(makeInput(ex(), 'hij vroeg als ik had gebeld'))!
      expect(fb.outcome).toBe('acceptable')
      expect(fb.miniLesson?.title).toContain('Indirect Questions')
    })

    it('flags verbs that are not placed at the end of the subclause', () => {
      const fb = evaluateCoreDrills(makeInput(ex(), 'hij zei dat hij is moe'))!
      expect(fb.outcome).toBe('retry')
      expect(fb.message).toContain('end of the embedded subclause')
    })

    it('accepts a near-miss reported sentence', () => {
      const fb = evaluateCoreDrills(makeInput(ex(), 'hij zegt dat hij moe was'))!
      expect(fb.outcome).toBe('acceptable')
      expect(fb.teacherCorrection?.natural).toBe('Hij zei dat hij moe was.')
    })

    it('rejects a completely different answer', () => {
      const fb = evaluateCoreDrills(makeInput(ex(), 'iets compleet anders'))!
      expect(fb.outcome).toBe('retry')
    })
  })
})

