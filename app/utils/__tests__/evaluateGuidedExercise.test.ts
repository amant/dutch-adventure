import { describe, it, expect } from 'vitest'
import { evaluateGuidedExercise } from '~/utils/evaluateGuidedExercise'
import { makeExercise, makeInput } from './evaluationTestUtils'

describe('evaluateGuidedExercise', () => {
  it('returns undefined for kinds it does not handle', () => {
    const input = makeInput(makeExercise({ kind: 'typed', target: 'Ik woon in Amsterdam.' }), 'Ik woon in Amsterdam.')
    expect(evaluateGuidedExercise(input)).toBeUndefined()
  })

  describe('induction', () => {
    const ex = () => makeExercise({
      kind: 'induction',
      inductionData: {
        examples: [{ prompt: 'a', answer: 'b' }],
        ruleChallenge: 'Welke vorm zie je terug?',
        options: [
          { text: 'patroon', isCorrect: true },
          { text: 'verkeerd', isCorrect: false },
        ],
      },
    })

    it('marks the correct option', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'patroon'))!
      expect(fb.outcome).toBe('correct')
      expect(fb.changeModifier).toBe(3)
    })

    it('rejects a wrong option', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'verkeerd'))!
      expect(fb.outcome).toBe('retry')
      expect(fb.explanation).toContain('examples')
    })
  })

  describe('morphing-drill', () => {
    const ex = () => makeExercise({
      kind: 'morphing-drill',
      morphingData: {
        baseSentence: 'Ik loop naar de winkel.',
        steps: [
          { instruction: 'Verleden tijd.', target: 'Ik liep naar de winkel.' },
          { instruction: 'Maak vragend.', target: 'Liep ik naar de winkel?' },
        ],
      },
    })

    it('scores every step and marks the final step', () => {
      const stepOne = evaluateGuidedExercise(makeInput(ex(), 'Ik liep naar de winkel.', { morphingStepIndex: 0 }))!
      expect(stepOne.outcome).toBe('correct')
      expect(stepOne.message).toContain('Step correct')
      expect(stepOne.changeModifier).toBe(2)

      const final = evaluateGuidedExercise(makeInput(ex(), 'Liep ik naar de winkel?', { morphingStepIndex: 1 }))!
      expect(final.outcome).toBe('correct')
      expect(final.message).toContain('Final morph complete')
    })

    it('returns retry with the step hint on a wrong change', () => {
      const withHint = makeExercise({
        kind: 'morphing-drill',
        morphingData: {
          baseSentence: 'Ik loop naar de winkel.',
          steps: [
            { instruction: 'Verleden tijd.', target: 'Ik liep naar de winkel.', hint: 'Denk aan de sterke werkwoorden.' },
          ],
        },
      })
      const fb = evaluateGuidedExercise(makeInput(withHint, 'Ik loop naar de winkel.', { morphingStepIndex: 0 }))!
      expect(fb.outcome).toBe('retry')
      expect(fb.explanation).toContain('Denk aan de sterke werkwoorden')
    })

    it('returns undefined for an out-of-range step index', () => {
      expect(evaluateGuidedExercise(makeInput(ex(), 'Ik liep naar de winkel.', { morphingStepIndex: 9 }))).toBeUndefined()
    })
  })

  describe('listening-cloze', () => {
    const ex = () => makeExercise({
      kind: 'listening-cloze',
      clozeData: { textWithGaps: 'De [..] schijnt en het [..].', answers: ['zon', 'regent'] },
    })

    it('accepts fully correct transcriptions', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), '', { clozeAnswers: ['zon', 'regent'] }))!
      expect(fb.outcome).toBe('correct')
    })

    it('reports the number of missed words', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), '', { clozeAnswers: ['zon', 'mist'] }))!
      expect(fb.outcome).toBe('retry')
      expect(fb.message).toContain('You missed 1 word')
    })
  })

  describe('shadowing', () => {
    const ex = () => makeExercise({ target: 'Ik woon in Amsterdam.' })

    it('accepts closely matched shadowing and adds speaking/automaticity', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'Ik woon in Amsterdam.', { isShadowing: true }))!
      expect(fb.outcome).toBe('correct')
      expect(fb.isShadowing).toBe(true)
      expect(fb.skills).toEqual(expect.arrayContaining(['speaking', 'automaticity']))
      expect(fb.changeModifier).toBe(8)
    })

    it('accepts partially matched shadowing', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'Ik woon Amsterdam', { isShadowing: true }))!
      expect(fb.outcome).toBe('acceptable')
      expect(fb.isShadowing).toBe(true)
    })

    it('rejects poorly matched shadowing', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'blauw', { isShadowing: true }))!
      expect(fb.outcome).toBe('retry')
      expect(fb.isShadowing).toBe(true)
    })
  })

  describe('mediation', () => {
    const ex = () => makeExercise({
      kind: 'mediation',
      mediationPoints: [
        { id: 'p1', label: 'Noem het probleem', keywords: ['probleem'] },
        { id: 'p2', label: 'Noem de oplossing', keywords: ['oplossing'] },
      ],
    })

    it('scores all mediation points', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'Het probleem is groot maar de oplossing is simpel.'))!
      expect(fb.outcome).toBe('correct')
      expect(fb.mediationPointsAchieved).toEqual(['p1', 'p2'])
      expect(fb.changeModifier).toBe(5)
    })

    it('accepts partial coverage and lists the missing points', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'het probleem is groot'))!
      expect(fb.outcome).toBe('acceptable')
      expect(fb.mediationPointsAchieved).toEqual(['p1'])
      expect(fb.message).toContain('Noem de oplossing')
    })

    it('retries when no point is covered', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'ik weet het niet'))!
      expect(fb.outcome).toBe('retry')
    })
  })

  describe('correction-challenge', () => {
    const ex = () => makeExercise({
      kind: 'correction-challenge',
      correctionData: {
        originalText: 'Ik ben moe.',
        mistakes: [
          { segment: 'een fout', correction: 'de correcte', explanation: 'fout1' },
          { segment: 'nog een fout', correction: 'nog een correcte', explanation: 'fout2' },
        ],
      },
    })

    it('accepts when every mistake is corrected', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'de correcte is hier gebruikt en nog een correcte'))!
      expect(fb.outcome).toBe('correct')
    })

    it('reports how many errors were fixed', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'de correcte is hier gebruikt'))!
      expect(fb.outcome).toBe('retry')
      expect(fb.message).toContain("You've fixed 1 out of 2 errors")
      expect(fb.explanation).toContain('fout2')
    })
  })


  describe('circumlocution', () => {
    const ex = () => makeExercise({
      kind: 'circumlocution',
      circumlocutionData: { concept: 'fiets', requiredKeywords: ['twee', 'wielen'] },
      forbiddenWords: ['fiets'],
      minimumLength: 25,
    })

    it('rejects the forbidden word', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'de fiets staat buiten'))!
      expect(fb.outcome).toBe('retry')
      expect(fb.message).toContain('forbidden word')
    })

    it('rejects an answer missing a required keyword', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'een ding met twee'))!
      expect(fb.outcome).toBe('retry')
    })

    it('rejects answers below the minimum length', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'twee wielen maar kort'))!
      expect(fb.outcome).toBe('retry')
    })

    it('accepts a complete circumlocution', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'een voertuig met twee wielen waar je op trapt en snel mee reist'))!
      expect(fb.outcome).toBe('correct')
    })
  })

  describe('nuance-drill', () => {
    it('requires a modal particle', () => {
      const ex = makeExercise({ kind: 'nuance-drill' })

      expect(evaluateGuidedExercise(makeInput(ex, 'ik kom'))!.outcome).toBe('retry')

      const good = evaluateGuidedExercise(makeInput(ex, 'ik kom wel even langs'))!
      expect(good.outcome).toBe('correct')
      expect(good.pragmaticScore).toBe(85)
    })
  })
  describe('collocation-drill', () => {
    const ex = () => makeExercise({
      kind: 'collocation-drill',
      target: 'een besluit nemen',
      forbiddenWords: ['besluit maken'],
    })

    it('accepts the exact collocation', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'een besluit nemen'))!
      expect(fb.outcome).toBe('correct')
    })

    it('flags forbidden words as anglicisms', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'ik wil een besluit maken'))!
      expect(fb.outcome).toBe('retry')
      expect(fb.message).toContain('Anglicism')
    })

    it('retries a generic answer', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'volledig ander antwoord'))!
      expect(fb.outcome).toBe('retry')
    })
  })

  describe('understatement-drill', () => {
    const ex = () => makeExercise({ kind: 'understatement-drill' })

    it('rejects direct praise', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'dat is geweldig'))!
      expect(fb.outcome).toBe('retry')
      expect(fb.explanation).toContain('niet verkeerd')
    })

    it('accepts Dutch understatement', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'dat valt wel mee'))!
      expect(fb.outcome).toBe('correct')
      expect(fb.pragmaticScore).toBe(90)
    })

    it('returns undefined for a neutral answer without a clear marker', () => {
      expect(evaluateGuidedExercise(makeInput(ex(), 'ik zie het wel'))).toBeUndefined()
    })
  })

  describe('cohesion-drill', () => {
    const ex = () => makeExercise({ kind: 'cohesion-drill', target: 'Eerst regent het, daarna schijnt de zon.' })

    it('accepts the exact paragraph', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'Eerst regent het, daarna schijnt de zon.'))!
      expect(fb.outcome).toBe('correct')
      expect(fb.changeModifier).toBe(4)
    })

    it('rejects a wrong order', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'daarna regent het eerst'))!
      expect(fb.outcome).toBe('retry')
    })
  })

  describe('summary-challenge', () => {
    const ex = () => makeExercise({
      kind: 'summary-challenge',
      summaryPoints: [
        { id: 's1', label: 'het probleem', keywords: ['probleem'] },
        { id: 's2', label: 'de oorzaak', keywords: ['oorzaak'] },
      ],
    })

    it('accepts when all points are captured', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'het probleem heeft een duidelijke oorzaak'))!
      expect(fb.outcome).toBe('correct')
    })

    it('lists the missing points', () => {
      const fb = evaluateGuidedExercise(makeInput(ex(), 'alleen het probleem'))!
      expect(fb.outcome).toBe('retry')
      expect(fb.message).toContain('de oorzaak')
    })
  })
})

