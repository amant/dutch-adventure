import { describe, it, expect } from 'vitest'
import { evaluateFallback } from '~/utils/evaluateFallback'
import { makeExercise, makeInput } from './evaluationTestUtils'

describe('evaluateFallback', () => {
  it('asks for a typed answer when the input is empty', () => {
    const fb = evaluateFallback(makeInput(makeExercise({ kind: 'typed' }), ''))
    expect(fb.outcome).toBe('retry')
    expect(fb.message).toBe('Type an answer to try it.')
  })

  it('auto-passes info and reading exercises', () => {
    expect(evaluateFallback(makeInput(makeExercise({ kind: 'info' }), 'whatever')).outcome).toBe('correct')
    expect(evaluateFallback(makeInput(makeExercise({ kind: 'reading' }), 'whatever')).outcome).toBe('correct')
  })

  it('accepts an exact target match', () => {
    const fb = evaluateFallback(makeInput(makeExercise({ target: 'Ik woon in Amsterdam.' }), 'Ik woon in Amsterdam.'))
    expect(fb.outcome).toBe('correct')
    expect(fb.message).toBe('That sounds perfectly natural!')
  })

  it('accepts answers listed in acceptedAnswers', () => {
    const fb = evaluateFallback(makeInput(
      makeExercise({ target: 'Ik woon in Amsterdam.', acceptedAnswers: ['Ik woon in een huis.'] }),
      'ik woon in een huis.'
    ))
    expect(fb.outcome).toBe('correct')
  })

  describe('grammar assistant checks', () => {
    it('flags missing inversion after a time adverb', () => {
      const fb = evaluateFallback(makeInput(makeExercise(), 'gisteren ik ging naar huis'))
      expect(fb.outcome).toBe('retry')
      expect(fb.miniLesson?.title).toContain('Inversion')
      expect(fb.skills).toContain('automaticity')
    })

    it('flags hypothetical "als" without zou/had/was', () => {
      const fb = evaluateFallback(makeInput(makeExercise(), 'als ik rijk ben'))
      expect(fb.outcome).toBe('acceptable')
      expect(fb.miniLesson?.title).toContain('Hypothetical')
    })

    it('flags indirect questions using "als" instead of "of"', () => {
      const fb = evaluateFallback(makeInput(makeExercise(), 'hij vroeg als ik had gebeld'))
      expect(fb.outcome).toBe('acceptable')
      expect(fb.miniLesson?.title).toContain('Indirect Questions')
    })

    it('flags a wrong relative pronoun', () => {
      const fb = evaluateFallback(makeInput(makeExercise(), 'alles dat goed is'))
      expect(fb.outcome).toBe('acceptable')
      expect(fb.miniLesson?.title).toContain('Relative Pronoun')
    })

    it('flags a modal verb followed by "te"', () => {
      const fb = evaluateFallback(makeInput(makeExercise(), 'ik moet te werken'))
      expect(fb.outcome).toBe('acceptable')
      expect(fb.miniLesson?.title).toContain('Modal Verbs')
    })

    it('flags a modal participle where a double infinitive is required', () => {
      const fb = evaluateFallback(makeInput(makeExercise(), 'hij heeft gemoeten werken'))
      expect(fb.outcome).toBe('acceptable')
      expect(fb.miniLesson?.title).toContain('Double Infinitive')
    })

    it('flags "ondanks" followed by a full clause', () => {
      const fb = evaluateFallback(makeInput(makeExercise(), 'ondanks hij moe was ging hij door'))
      expect(fb.outcome).toBe('acceptable')
      expect(fb.miniLesson?.title).toContain('Ondanks')
    })

    it('flags a separable verb in an infinitive clause without the "te" infix', () => {
      const fb = evaluateFallback(makeInput(makeExercise(), 'de te oplossen problemen'))
      expect(fb.outcome).toBe('acceptable')
      expect(fb.miniLesson?.title).toContain('Separable Verbs')
    })

    it('flags an incomplete "niet alleen" correlative', () => {
      const fb = evaluateFallback(makeInput(makeExercise(), 'niet alleen de kosten stijgen maar de kwaliteit daalt'))
      expect(fb.outcome).toBe('acceptable')
      expect(fb.miniLesson?.title).toContain('Niet Alleen')
    })

    it('flags "op voorwaarde" without "dat"', () => {
      const fb = evaluateFallback(makeInput(makeExercise(), 'we gaan akkoord op voorwaarde we de targets halen'))
      expect(fb.outcome).toBe('acceptable')
      expect(fb.miniLesson?.title).toContain('Op Voorwaarde Dat')
    })

    it('flags "dermate" without the required "dat"', () => {
      const fb = evaluateFallback(makeInput(makeExercise(), 'de vraag steeg dermate snel'))
      expect(fb.outcome).toBe('acceptable')
      expect(fb.miniLesson?.title).toContain('Dermate')
    })

    it('flags a missing reflexive pronoun', () => {
      const fb = evaluateFallback(makeInput(makeExercise(), 'ik voel goed'))
      expect(fb.outcome).toBe('retry')
      expect(fb.message).toContain('reflexive pronoun')
    })

    it('flags a wrong fixed preposition regime', () => {
      const fb = evaluateFallback(makeInput(makeExercise(), 'ik twijfel over zijn eerlijkheid'))
      expect(fb.outcome).toBe('acceptable')
      expect(fb.message).toContain('twijfelen')
    })

    it('flags a wrong fixed preposition', () => {
      const fb = evaluateFallback(makeInput(makeExercise(), 'ik ben geïnteresseerd voor taal'))
      expect(fb.outcome).toBe('retry')
      expect(fb.message).toContain("always goes with")
    })

    it('flags the perfect tense with the wrong auxiliary', () => {
      const fb = evaluateFallback(makeInput(makeExercise(), 'ik heb gegaan'))
      expect(fb.outcome).toBe('retry')
      expect(fb.miniLesson?.title).toContain('Zijn vs Hebben')
    })

    it('flags an unsplit separable verb', () => {
      const fb = evaluateFallback(makeInput(makeExercise({ target: 'Ik maak de kamer schoon.' }), 'ik schoonmaken de kamer'))
      expect(fb.outcome).toBe('retry')
      expect(fb.miniLesson?.title).toContain('Separable Verbs')
    })

    it('flags verbs that are not final after "omdat"', () => {
      const fb = evaluateFallback(makeInput(makeExercise(), 'omdat ik heb geen tijd'))
      expect(fb.outcome).toBe('retry')
      expect(fb.miniLesson?.title).toContain('Subordinate Clauses')
    })

    it('flags a wrong de/het article', () => {
      const fb = evaluateFallback(makeInput(makeExercise(), 'het man loopt'))
      expect(fb.outcome).toBe('retry')
      expect(fb.miniLesson?.title).toContain('De vs Het')
    })

    it('flags a missing adjective ending', () => {
      const fb = evaluateFallback(makeInput(makeExercise(), 'een mooi man'))
      expect(fb.outcome).toBe('retry')
      expect(fb.miniLesson?.title).toContain('Adjective Endings')
    })
  })

  describe('register checks', () => {
    it('rejects mixing formal and informal registers', () => {
      const fb = evaluateFallback(makeInput(makeExercise(), 'u en je zijn hier'))
      expect(fb.outcome).toBe('retry')
      expect(fb.message).toContain('Mixing formal')
    })

    it('rejects informal language in a formal exercise', () => {
      const fb = evaluateFallback(makeInput(makeExercise({ requiredRegister: 'formal' }), 'ik wil je helpen'))
      expect(fb.outcome).toBe('retry')
      expect(fb.message).toContain('formal register')
    })

    it('rejects formal language when the context overrides to informal', () => {
      const fb = evaluateFallback(makeInput(makeExercise(), 'ik wil u helpen', { overrideRegister: 'informal' }))
      expect(fb.outcome).toBe('retry')
      expect(fb.message).toContain('informal register')
    })
  })

  it('accepts a near spelling mistake and adds the spelling skill', () => {
    const fb = evaluateFallback(makeInput(makeExercise({ target: 'Ik woon in Amsterdam.' }), 'Ik woon in Amsterdan'))
    expect(fb.outcome).toBe('acceptable')
    expect(fb.skills).toContain('spelling')
  })

  describe('recombination-drill', () => {
    it('reports missing required words', () => {
      const ex = makeExercise({
        kind: 'recombination-drill',
        requiredWords: ['zowel', 'als'],
      })
      const fb = evaluateFallback(makeInput(ex, 'alleen dit antwoord'))
      expect(fb.outcome).toBe('retry')
      expect(fb.message).toContain('You missed')
    })

    it('accepts a complete recombination', () => {
      const ex = makeExercise({
        kind: 'recombination-drill',
        requiredWords: ['twee', 'wielen'],
      })
      const fb = evaluateFallback(makeInput(ex, 'ik gebruik twee wielen en een stuur samen'))
      expect(fb.outcome).toBe('correct')
      expect(fb.changeModifier).toBe(5)
    })
  })

  describe('flexibility', () => {
    const ex = () => makeExercise({
      kind: 'flexibility',
      forbiddenWords: ['fiets'],
      requiredWords: ['rijden'],
    })

    it('rejects a forbidden word', () => {
      const fb = evaluateFallback(makeInput(ex(), 'ik pak mijn fiets en rijden'))
      expect(fb.outcome).toBe('retry')
      expect(fb.message).toContain("avoid using 'fiets'")
    })

    it('rejects a missing required word', () => {
      const fb = evaluateFallback(makeInput(ex(), 'ik ga naar buiten'))
      expect(fb.outcome).toBe('retry')
      expect(fb.message).toContain("use 'rijden'")
    })

    it('rejects answers with fewer than three words', () => {
      const fb = evaluateFallback(makeInput(ex(), 'rijden maar'))
      expect(fb.outcome).toBe('retry')
    })

    it('accepts a complete flexible answer', () => {
      const fb = evaluateFallback(makeInput(ex(), 'ik rijden graag door de stad'))
      expect(fb.outcome).toBe('correct')
    })
  })

  describe('challenge', () => {
    const ex = () => makeExercise({
      kind: 'challenge',
      prompt: 'Beschrijf je dag.',
      minimumLength: 5,
    })

    it('rejects answers below the minimum length', () => {
      const fb = evaluateFallback(makeInput(ex(), 'ik ga'))
      expect(fb.outcome).toBe('retry')
      expect(fb.message).toContain('at least 5 words')
    })

    it('rejects answers that repeat the prompt', () => {
      const fb = evaluateFallback(makeInput(ex(), 'beschrijf je dag want het is mooi weer vandaag'))
      expect(fb.outcome).toBe('retry')
      expect(fb.message).toContain('own words')
    })

    it('accepts a real-world challenge answer', () => {
      const fb = evaluateFallback(makeInput(ex(), 'ik sta vroeg op en drink koffie op het terras'))
      expect(fb.outcome).toBe('correct')
      expect(fb.changeModifier).toBe(10)
    })
  })

  describe('pragmatic-drill', () => {
    const ex = () => makeExercise({
      kind: 'pragmatic-drill',
      pragmaticOptions: [
        { text: 'Zou u dat kunnen herhalen?', context: 'c', isBest: true, explanation: 'e' },
        { text: 'Wat?', context: 'c', isBest: false, explanation: 'e' },
      ],
    })

    it('accepts the most natural option', () => {
      const fb = evaluateFallback(makeInput(ex(), 'Zou u dat kunnen herhalen?'))
      expect(fb.outcome).toBe('correct')
    })

    it('accepts a technically okay option', () => {
      const fb = evaluateFallback(makeInput(ex(), 'Wat?'))
      expect(fb.outcome).toBe('acceptable')
    })
  })

  describe('personalise and conversation', () => {
    it('accepts personal answers above the minimum length', () => {
      const ex = makeExercise({ kind: 'personalise', vocabulary: ['wonen'], grammar: [] })
      const fb = evaluateFallback(makeInput(ex, 'ik woon in een klein dorp'))
      expect(fb.outcome).toBe('correct')
      expect(fb.changeModifier).toBe(5)
    })
  })

  it('accepts free-form typed answers when no expected answer exists', () => {
    const ex = makeExercise({ kind: 'typed' })
    const fb = evaluateFallback(makeInput(ex, 'dit klinkt goed'))
    expect(fb.outcome).toBe('correct')
    expect(fb.message).toContain('Keep practicing')
  })

  it('returns the generic retry for an unmatched answer', () => {
    const fb = evaluateFallback(makeInput(makeExercise({ target: 'Ik woon in Amsterdam.' }), 'De kat slaapt'))
    expect(fb.outcome).toBe('retry')
    expect(fb.message).toBe('Not quite. Check the word order or spelling and try again.')
  })
})

