import { describe, it, expect } from 'vitest'
import { diffStrings } from '~/utils/diffStrings'

describe('diffStrings', () => {
  it('marks unchanged words as "same"', () => {
    const parts = diffStrings('ik ga naar huis', 'ik ga naar huis')
    expect(parts.every(p => p.type === 'same')).toBe(true)
  })

  it('flags a changed word as removed + added', () => {
    const parts = diffStrings('ik ga naar huis', 'ik loop naar huis')
    expect(parts).toContainEqual({ value: 'ga', type: 'removed' })
    expect(parts).toContainEqual({ value: 'loop', type: 'added' })
  })

  it('is case-insensitive for matching words', () => {
    const parts = diffStrings('Ik ga', 'ik ga')
    expect(parts.every(p => p.type === 'same')).toBe(true)
  })

  it('handles an added word at the end', () => {
    const parts = diffStrings('ik ga', 'ik ga naar huis')
    expect(parts).toContainEqual({ value: 'naar', type: 'added' })
    expect(parts).toContainEqual({ value: 'huis', type: 'added' })
  })

  it('handles a removed word at the end', () => {
    const parts = diffStrings('ik ga naar huis', 'ik ga')
    expect(parts).toContainEqual({ value: 'naar', type: 'removed' })
    expect(parts).toContainEqual({ value: 'huis', type: 'removed' })
  })

  it('handles empty strings', () => {
    const parts = diffStrings('ik ga', '')
    expect(parts).toContainEqual({ value: 'ik', type: 'removed' })
    expect(parts).toContainEqual({ value: 'ga', type: 'removed' })

    const added = diffStrings('', 'ik ga')
    expect(added).toContainEqual({ value: 'ik', type: 'added' })
    expect(added).toContainEqual({ value: 'ga', type: 'added' })
  })
})
