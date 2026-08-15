import { describe, it, expect } from 'vitest'
import { evaluateSyntaxDrills } from '~/utils/evaluateSyntaxDrills'
import { makeExercise, makeInput } from './evaluationTestUtils'

describe('evaluateSyntaxDrills', () => {
  it('returns undefined for kinds it does not handle', () => {
    const input = makeInput(makeExercise({ kind: 'typed', target: 'Ik woon in Amsterdam.' }), 'Ik woon in Amsterdam.')
    expect(evaluateSyntaxDrills(input)).toBeUndefined()
  })

  describe('prefix-verb-drill', () => {
    const ex = () => makeExercise({
      kind: 'prefix-verb-drill',
      target: 'De arts voorkomt complicaties.',
      prefixVerbData: {
        verb: 'voorkomen',
        stressPattern: 'inseparable-stressed-stem',
        stressedForm: 'voorkomen',
        meaningDefinition: 'prevent',
        targetStructure: 'present-main',
      },
    })

    it('accepts the exact prefix verb sentence', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'De arts voorkomt complicaties.'))!
      expect(fb.outcome).toBe('correct')
      expect(fb.skills).toEqual(expect.arrayContaining(['production', 'grammar']))
      expect(fb.changeModifier).toBe(20)
    })

    it('flags an inseparable verb that was split', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'De arts komt complicaties voor.'))!
      expect(fb.outcome).toBe('acceptable')
      expect(fb.miniLesson?.title).toContain('Voorkómen')
    })

    it('accepts a near-miss prefix verb sentence', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'de arts voorkomt de complicaties'))!
      expect(fb.outcome).toBe('acceptable')
    })

    it('rejects a completely different answer', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'iets geheel anders'))!
      expect(fb.outcome).toBe('retry')
    })
  })

  describe('midfield-drill', () => {
    const ex = () => makeExercise({
      kind: 'midfield-drill',
      target: 'Wij reizen morgen met de trein naar Brussel.',
      midfieldData: { focusRule: 'tmp-order', contextPrompt: 'p' },
    })

    it('accepts the exact TMP ordering', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'Wij reizen morgen met de trein naar Brussel.'))!
      expect(fb.outcome).toBe('correct')
      expect(fb.changeModifier).toBe(20)
    })

    it('flags place before manner', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'Wij reizen naar Brussel met de trein.'))!
      expect(fb.outcome).toBe('acceptable')
      expect(fb.miniLesson?.title).toContain('TMP Rule')
    })

    it('accepts a near-miss ordering', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'wij reizen morgen met de bus naar brussel'))!
      expect(fb.outcome).toBe('acceptable')
    })

    it('rejects a completely different answer', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'willekeurig antwoord'))!
      expect(fb.outcome).toBe('retry')
    })
  })

  describe('fixed-preposition-drill', () => {
    const ex = () => makeExercise({
      kind: 'fixed-preposition-drill',
      target: 'Ik twijfel aan zijn eerlijkheid.',
      fixedPrepositionData: { governingHead: 'twijfelen', fixedPreposition: 'aan', contextPrompt: 'p' },
    })

    it('accepts the exact fixed preposition sentence', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'Ik twijfel aan zijn eerlijkheid.'))!
      expect(fb.outcome).toBe('correct')
      expect(fb.changeModifier).toBe(20)
    })

    it('flags the wrong preposition regime', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'ik twijfel over zijn eerlijkheid'))!
      expect(fb.outcome).toBe('acceptable')
      expect(fb.miniLesson?.title).toContain('twijfelen')
    })

    it('accepts a near-miss fixed preposition sentence', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'ik twijfel aan zijn eerlijkheid vandaag'))!
      expect(fb.outcome).toBe('acceptable')
    })

    it('rejects a completely different answer', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'geen idee'))!
      expect(fb.outcome).toBe('retry')
    })
  })

  describe('pronominal-splitting-drill', () => {
    const ex = () => makeExercise({
      kind: 'pronominal-splitting-drill',
      target: 'Ik denk daar niet over na.',
      pronominalSplittingData: {
        rWord: 'daar',
        preposition: 'over',
        combinedForm: 'daarover',
        clauseType: 'main-clause',
        splittingStatus: 'natural-split-preferred',
      },
    })

    it('accepts the exact split pronominal adverb', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'Ik denk daar niet over na.'))!
      expect(fb.outcome).toBe('correct')
      expect(fb.changeModifier).toBe(20)
    })

    it('flags an unsplit pronominal adverb', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'ik denk daarover na'))!
      expect(fb.outcome).toBe('acceptable')
      expect(fb.miniLesson?.title).toContain('Splitsing')
    })

    it('accepts a near-miss split sentence', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'ik denk daar niet over na vandaag'))!
      expect(fb.outcome).toBe('acceptable')
    })

    it('rejects a completely different answer', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'willekeurig antwoord'))!
      expect(fb.outcome).toBe('retry')
    })
  })

  describe('aspect-drill', () => {
    const ex = () => makeExercise({
      kind: 'aspect-drill',
      target: 'Hij zit te studeren.',
      aspectData: { aspectCategory: 'posture-durative', postureOrAspectVerb: 'zit', infinitiveAction: 'studeren', contextPrompt: 'p' },
    })

    it('accepts the exact aspectual construction', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'Hij zit te studeren.'))!
      expect(fb.outcome).toBe('correct')
      expect(fb.changeModifier).toBe(20)
    })

    it('flags a posture verb missing "te"', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'hij zit studeren'))!
      expect(fb.outcome).toBe('acceptable')
      expect(fb.miniLesson?.title).toContain('Houdingswerkwoorden')
    })

    it('accepts a near-miss aspectual construction', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'hij zit te studeren nu'))!
      expect(fb.outcome).toBe('acceptable')
    })

    it('rejects a completely different answer', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'willekeurig antwoord'))!
      expect(fb.outcome).toBe('retry')
    })
  })

  describe('modal-particle-drill', () => {
    const ex = () => makeExercise({
      kind: 'modal-particle-drill',
      target: 'Het team heeft wel degelijk aan de eisen voldaan.',
      modalParticleData: { particleCluster: 'wel degelijk', pragmaticFunction: 'rebuttal-wel-degelijk', contextPrompt: 'p' },
    })

    it('accepts the exact modal particle placement', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'Het team heeft wel degelijk aan de eisen voldaan.'))!
      expect(fb.outcome).toBe('correct')
      expect(fb.skills).toEqual(expect.arrayContaining(['production', 'pragmatic', 'grammar']))
      expect(fb.changeModifier).toBe(20)
    })

    it('flags a missing particle cluster', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'het team heeft aan de eisen voldaan'))!
      expect(fb.outcome).toBe('acceptable')
      expect(fb.miniLesson?.title).toContain('Wel Degelijk')
    })

    it('accepts a near-miss placement', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'het team heeft wel degelijk aan de eisen voldaan vandaag'))!
      expect(fb.outcome).toBe('acceptable')
    })

    it('rejects a completely different answer', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'willekeurig antwoord'))!
      expect(fb.outcome).toBe('retry')
    })
  })

  describe('topicalisation-drill', () => {
    const ex = () => makeExercise({
      kind: 'topicalisation-drill',
      target: 'Mocht de situatie verslechteren, neem dan contact op.',
      topicalisationData: { focusType: 'inverted-conditional-mocht', frontedElement: 'mocht', baseSentence: 'Neem contact op als de situatie verslechtert.' },
    })

    it('accepts the exact topicalised construction', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'Mocht de situatie verslechteren, neem dan contact op.'))!
      expect(fb.outcome).toBe('correct')
      expect(fb.changeModifier).toBe(20)
    })

    it('flags a conditional still using "als"', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'als de situatie mocht verslechteren neem dan contact op'))!
      expect(fb.outcome).toBe('acceptable')
      expect(fb.miniLesson?.title).toContain('Mocht')
    })

    it('accepts a near-miss topicalised construction', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'mocht de situatie verslechteren neem dan contact op vandaag'))!
      expect(fb.outcome).toBe('acceptable')
    })

    it('rejects a completely different answer', () => {
      const fb = evaluateSyntaxDrills(makeInput(ex(), 'mocht het stormen blijven we thuis'))!
      expect(fb.outcome).toBe('retry')
    })
  })
})

