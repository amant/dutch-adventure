import { describe, it, expect } from 'vitest'
import type { Exercise } from '~/types/learning'
import { evaluateExercise } from '~/utils/evaluateExercise'
import { normalizeAnswer } from '~/utils/evaluationHelpers'
import { makeExercise } from './evaluationTestUtils'

// evaluateExercise expects an already normalized answer string (see
// evaluateResponse), so wrap every call with normalizeAnswer.
function evaluate(ex: Exercise, answer: string, context?: Parameters<typeof evaluateExercise>[2]) {
  return evaluateExercise(ex, normalizeAnswer(answer), context)
}

describe('evaluateExercise', () => {
  it('carries exercise metadata into the base feedback', () => {
    const ex = makeExercise({
      target: 'Ik woon in Amsterdam.',
      explanation: 'Standaardwoordvolgorde',
      vocabulary: ['wonen'],
      grammar: ['woordvolgorde'],
      idioms: ['ergens wonen'],
    })
    const fb = evaluate(ex, 'iets heel anders')

    expect(fb.outcome).toBe('retry')
    expect(fb.target).toBe('Ik woon in Amsterdam.')
    expect(fb.explanation).toBe('Standaardwoordvolgorde')
    expect(fb.vocabulary).toEqual(['wonen'])
    expect(fb.grammar).toEqual(['woordvolgorde'])
    expect(fb.idioms).toEqual(['ergens wonen'])
    expect(fb.skills).toEqual(['production'])
    expect(fb.changeModifier).toBe(0)
  })

  it('routes er-drill exercises to the core drills evaluator', () => {
    const ex = makeExercise({
      kind: 'er-drill',
      erDrillData: {
        sentence: 'Ik woon in Amsterdam.',
        options: [{ text: 'Ik woon er al tien jaar.', isCorrect: true }],
      },
    })
    const fb = evaluate(ex, 'Ik woon er al tien jaar.')

    expect(fb.outcome).toBe('correct')
    expect(fb.changeModifier).toBe(3)
  })

  it('routes morphing-drill exercises to the guided exercise evaluator', () => {
    const ex = makeExercise({
      kind: 'morphing-drill',
      morphingData: {
        baseSentence: 'Ik loop naar de winkel.',
        steps: [{ instruction: 'Verleden tijd.', target: 'Ik liep naar de winkel.' }],
      },
    })
    const fb = evaluate(ex, 'Ik liep naar de winkel.', { morphingStepIndex: 0 })

    expect(fb.outcome).toBe('correct')
  })

  it('routes relative-clause-drill exercises to the grammar drills evaluator', () => {
    const ex = makeExercise({
      kind: 'relative-clause-drill',
      target: 'Het boek dat wij lezen is nieuw.',
      relativeClauseData: { mainClause: 'Het boek is nieuw.', subordinateInfo: 'We lezen het boek.', antecedent: 'boek', antecedentType: 'het-word' },
    })
    const fb = evaluate(ex, 'Het boek dat wij lezen is nieuw.')

    expect(fb.outcome).toBe('correct')
    expect(fb.skills).toContain('grammar')
    expect(fb.changeModifier).toBe(20)
  })

  it('routes prefix-verb-drill exercises to the syntax drills evaluator', () => {
    const ex = makeExercise({
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
    const fb = evaluate(ex, 'De arts voorkomt complicaties.')

    expect(fb.outcome).toBe('correct')
  })

  it('falls back to the generic evaluator for unhandled kinds', () => {
    const ex = makeExercise({ target: 'Ik woon in Amsterdam.' })
    const fb = evaluate(ex, 'ik woon in amsterdam')

    expect(fb.outcome).toBe('correct')
  })

  it('applies a negative modifier and automaticity skill when the timer ran out', () => {
    const ex = makeExercise({ target: 'Ik woon in Amsterdam.', automaticitySeconds: 4 })
    const fb = evaluate(ex, 'ik woon in amsterdam', { timeLeft: 0 })

    expect(fb.outcome).toBe('correct')
    expect(fb.changeModifier).toBe(-5)
    expect(fb.skills).toContain('automaticity')
  })

  it('applies a positive modifier for fast answers', () => {
    const ex = makeExercise({ target: 'Ik woon in Amsterdam.', automaticitySeconds: 4 })
    const fb = evaluate(ex, 'ik woon in amsterdam', { timeLeft: 3 })

    expect(fb.changeModifier).toBe(4)
  })

  it('leaves the modifier at 0 when no timer is configured', () => {
    const ex = makeExercise({ target: 'Ik woon in Amsterdam.' })
    const fb = evaluate(ex, 'ik woon in amsterdam')

    expect(fb.changeModifier).toBe(0)
    expect(fb.skills).not.toContain('automaticity')
  })

  it('adds speaking and automaticity skills when the learner speaks', () => {
    const ex = makeExercise({ target: 'Ik woon in Amsterdam.' })
    const fb = evaluate(ex, 'ik woon in amsterdam', { isSpeaking: true })

    expect(fb.skills).toEqual(expect.arrayContaining(['speaking', 'automaticity']))
    expect(fb.changeModifier).toBe(2)
  })

  it('records achieved mission goals and the register they set', () => {
    const ex = makeExercise({
      kind: 'conversation',
      missionGoals: [
        { id: 'g1', label: 'Overtuig de klant', keywords: ['overtuig'] },
        { id: 'g2', label: 'Noem een oplossing', keywords: ['oplossing'], setRegister: 'informal' },
      ],
    })
    const fb = evaluate(ex, 'ik wil je overtuigen met een oplossing')

    expect(fb.achievedGoalIds).toEqual(['g1', 'g2'])
    expect(fb.requiredRegister).toBe('informal')
  })

  it('returns an empty achieved goal list when no keyword matches', () => {
    const ex = makeExercise({
      missionGoals: [{ id: 'g1', label: 'Overtuig de klant', keywords: ['overtuig'] }],
    })
    const fb = evaluate(ex, 'iets heel anders')

    expect(fb.achievedGoalIds).toEqual([])
  })

  it('leaves achievedGoalIds undefined when the exercise has no mission goals', () => {
    const ex = makeExercise({ target: 'Ik woon in Amsterdam.' })
    const fb = evaluate(ex, 'ik woon in amsterdam')

    expect(fb.achievedGoalIds).toBeUndefined()
  })
})
