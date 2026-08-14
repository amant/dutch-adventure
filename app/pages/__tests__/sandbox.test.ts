import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import SandboxPage from '~/pages/sandbox.vue'
import { mkState, resetLearnerMemory } from './helpers'
import { useLearnerMemory } from '~/composables/useLearnerMemory'

const { navigateMock } = vi.hoisted(() => ({ navigateMock: vi.fn() }))
mockNuxtImport('navigateTo', () => navigateMock)

describe('sandbox page', () => {
  beforeEach(() => {
    resetLearnerMemory()
    navigateMock.mockClear()
  })

  it('renders the five suggestion prompts', async () => {
    const wrapper = await mountSuspended(SandboxPage)

    expect(wrapper.findAll('.suggestion-btn')).toHaveLength(5)
    expect(wrapper.text()).toContain('Ordering a special cake at the bakery')
  })

  it('disables the generate button until a scenario is typed', async () => {
    const wrapper = await mountSuspended(SandboxPage)

    const generateBtn = () => wrapper.findAll('button').find(b => b.text().includes('Generate Custom Mission'))!
    expect(generateBtn().attributes('disabled')).toBeDefined()

    await wrapper.find('textarea').setValue('I want to buy a bike')

    expect(generateBtn().attributes('disabled')).toBeUndefined()
  })

  it('navigates to smart-review with the typed scenario', async () => {
    const wrapper = await mountSuspended(SandboxPage)

    await wrapper.find('textarea').setValue('I am at a conference')
    await wrapper.findAll('button').find(b => b.text().includes('Generate Custom Mission'))!.trigger('click')

    expect(navigateMock).toHaveBeenCalledWith({
      path: '/smart-review',
      query: { mode: 'sandbox', scenario: 'I am at a conference' },
    })
  })

  it('navigates to smart-review with a suggestion scenario', async () => {
    const wrapper = await mountSuspended(SandboxPage)

    await wrapper.findAll('.suggestion-btn')[0].trigger('click')

    expect(navigateMock).toHaveBeenCalledWith({
      path: '/smart-review',
      query: { mode: 'sandbox', scenario: 'Ordering a special cake at the bakery' },
    })
  })

  it('shows frontier concepts from learner memory', async () => {
    const { memory } = useLearnerMemory()
    memory.value.vocabulary['gezellig'] = mkState({ recognition: 70, production: 10 })

    const wrapper = await mountSuspended(SandboxPage)

    expect(wrapper.findAll('.concept-item').length).toBeGreaterThan(0)
    expect(wrapper.text()).toContain('gezellig')
  })
})
