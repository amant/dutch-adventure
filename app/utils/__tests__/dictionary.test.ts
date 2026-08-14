import { describe, it, expect } from 'vitest'
import { lookupWord } from '~/utils/dictionary'

describe('lookupWord', () => {
  it('returns a hint for common words', () => {
    expect(lookupWord('ik')).toEqual({ meaning: 'I', category: 'pronoun' })
  })

  it('is case-insensitive', () => {
    expect(lookupWord('DE')).toEqual({ meaning: 'the', category: 'article' })
  })

  it('strips punctuation before lookup', () => {
    expect(lookupWord('Het.')).toEqual({ meaning: 'the/it', category: 'article/pronoun' })
  })

  it('resolves words collected from article data', () => {
    expect(lookupWord('schijnt')).toEqual({ meaning: 'shines', category: 'verb' })
  })

  it('returns undefined for unknown words', () => {
    expect(lookupWord('zzz-onbekend')).toBeUndefined()
  })

  it('handles empty input', () => {
    expect(lookupWord('')).toBeUndefined()
  })
})
