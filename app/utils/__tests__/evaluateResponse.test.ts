import { describe, it, expect } from 'vitest'
import type { Exercise } from '~/types/learning'
import { evaluateResponse, normalizeAnswer } from '~/utils/evaluateResponse'

function makeExercise(overrides: Partial<Exercise> = {}): Exercise {
  return {
    id: 'test-exercise',
    kind: 'typed',
    prompt: 'Say the sentence in Dutch.',
    skills: ['production'],
    ...overrides,
  }
}

describe('normalizeAnswer', () => {
  it('lowercases and trims the input', () => {
    expect(normalizeAnswer('  Ik WOON in Amsterdam  ')).toBe('ik woon in amsterdam')
  })

  it('strips common punctuation', () => {
    expect(normalizeAnswer('Dit, is. een? test!')).toBe('dit is een test')
  })

  it('collapses repeated whitespace', () => {
    expect(normalizeAnswer('ik  ga   nu\tnaar huis')).toBe('ik ga nu naar huis')
  })
})

describe('evaluateResponse', () => {
  it('returns correct for an exact target match', () => {
    const fb = evaluateResponse(
      makeExercise({ target: 'Ik woon in Amsterdam.' }),
      'Ik woon in Amsterdam!'
    )
    expect(fb.outcome).toBe('correct')
    expect(fb.target).toBe('Ik woon in Amsterdam.')
  })

  it('accepts answers listed in acceptedAnswers', () => {
    const fb = evaluateResponse(
      makeExercise({ target: 'Ik woon in Amsterdam.', acceptedAnswers: ['Ik woon in een huis.'] }),
      'ik woon in een huis.'
    )
    expect(fb.outcome).toBe('correct')
  })

  it('returns retry for a wrong answer', () => {
    const fb = evaluateResponse(
      makeExercise({ target: 'Ik woon in Amsterdam.' }),
      'De kat slaapt'
    )
    expect(fb.outcome).toBe('retry')
    expect(fb.message).toBe('Not quite. Check the word order or spelling and try again.')
  })

  it('returns acceptable for a near spelling mistake', () => {
    const fb = evaluateResponse(
      makeExercise({ target: 'Ik woon in Amsterdam.' }),
      'Ik woon in Amsterdan'
    )
    expect(fb.outcome).toBe('acceptable')
    expect(fb.message).toContain('spelling')
    expect(fb.skills).toContain('spelling')
  })

  it('applies a negative modifier when time runs out', () => {
    const fb = evaluateResponse(
      makeExercise({ target: 'Ik woon in Amsterdam.', automaticitySeconds: 4 }),
      'Ik woon in Amsterdam.',
      { timeLeft: 0 }
    )
    expect(fb.outcome).toBe('correct')
    expect(fb.changeModifier).toBe(-5)
  })

  it('applies a positive modifier for fast answers', () => {
    const fb = evaluateResponse(
      makeExercise({ target: 'Ik woon in Amsterdam.', automaticitySeconds: 4 }),
      'Ik woon in Amsterdam.',
      { timeLeft: 3 }
    )
    expect(fb.outcome).toBe('correct')
    expect(fb.changeModifier).toBe(4)
  })

  it('flags shadowing as correct when closely matched', () => {
    const fb = evaluateResponse(
      makeExercise({ target: 'Ik woon in Amsterdam.' }),
      'Ik woon in Amsterdam.',
      { isShadowing: true }
    )
    expect(fb.outcome).toBe('correct')
    expect(fb.isShadowing).toBe(true)
    expect(fb.skills).toEqual(expect.arrayContaining(['speaking', 'automaticity']))
  })

  it('flags shadowing as acceptable when partially matched', () => {
    const fb = evaluateResponse(
      makeExercise({ target: 'Ik woon in Amsterdam.' }),
      'Ik woon Amsterdam',
      { isShadowing: true }
    )
    expect(fb.outcome).toBe('acceptable')
  })

  it('flags shadowing as retry when poorly matched', () => {
    const fb = evaluateResponse(
      makeExercise({ target: 'Ik woon in Amsterdam.' }),
      'blauw',
      { isShadowing: true }
    )
    expect(fb.outcome).toBe('retry')
  })

  it('evaluates listening cloze answers', () => {
    const fb = evaluateResponse(
      makeExercise({
        kind: 'listening-cloze',
        clozeData: { textWithGaps: 'De [..] schijnt en het [..].', answers: ['zon', 'regent'] },
      }),
      '',
      { clozeAnswers: ['zon', 'regent'] }
    )
    expect(fb.outcome).toBe('correct')
  })

  it('evaluates listening cloze mistakes', () => {
    const fb = evaluateResponse(
      makeExercise({
        kind: 'listening-cloze',
        clozeData: { textWithGaps: 'De [..] schijnt en het [..].', answers: ['zon', 'regent'] },
      }),
      '',
      { clozeAnswers: ['zon', 'mist'] }
    )
    expect(fb.outcome).toBe('retry')
    expect(fb.message).toContain('You missed 1 word')
  })

  it('scores mediation when all points are covered', () => {
    const fb = evaluateResponse(
      makeExercise({
        kind: 'mediation',
        mediationPoints: [
          { id: 'p1', label: 'Noem het probleem', keywords: ['probleem'] },
          { id: 'p2', label: 'Noem de oplossing', keywords: ['oplossing'] },
        ],
      }),
      'Het probleem is groot maar de oplossing is simpel.'
    )
    expect(fb.outcome).toBe('correct')
    expect(fb.mediationPointsAchieved).toEqual(['p1', 'p2'])
  })

  it('rejects formal register when informal words are used', () => {
    const fb = evaluateResponse(
      makeExercise({ requiredRegister: 'formal' }),
      'ik wil je helpen'
    )
    expect(fb.outcome).toBe('retry')
    expect(fb.message).toContain('formal register')
  })

  it('rejects mixing formal and informal registers', () => {
    const fb = evaluateResponse(
      makeExercise({}),
      'u en je zijn hier'
    )
    expect(fb.outcome).toBe('retry')
    expect(fb.message).toContain('Mixing formal')
  })

  it('accepts personalise answers above minimum length', () => {
    const fb = evaluateResponse(
      makeExercise({ kind: 'personalise', vocabulary: [], grammar: [] }),
      'ik ben moe vandaag'
    )
    expect(fb.outcome).toBe('correct')
  })
})
