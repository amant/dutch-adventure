import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import MemoryPage from '~/pages/memory.vue'
import { mkState, resetLearnerMemory } from './helpers'
import { useLearnerMemory } from '~/composables/useLearnerMemory'

const { navigateMock } = vi.hoisted(() => ({ navigateMock: vi.fn() }))
mockNuxtImport('navigateTo', () => navigateMock)

const daysAgo = (days: number) => new Date(Date.now() - days * 86_400_000).toISOString()

describe('memory page', () => {
  beforeEach(() => {
    resetLearnerMemory()
    navigateMock.mockClear()
  })

  it('shows empty wells when nothing is due for retrieval', async () => {
    const wrapper = await mountSuspended(MemoryPage)

    expect(wrapper.findAll('.empty-well')).toHaveLength(2)
  })

  it('lists decaying concepts that were last seen a day or more ago', async () => {
    const { memory } = useLearnerMemory()
    memory.value.vocabulary['fiets'] = mkState({ lastEncountered: daysAgo(3), automaticity: 30 })

    const wrapper = await mountSuspended(MemoryPage)

    expect(wrapper.text()).toContain('fiets')
    expect(wrapper.text()).toContain('3d since last use')
  })

  it('lists stage 6 retrieval candidates from recent usage history', async () => {
    const { memory } = useLearnerMemory()
    memory.value.vocabulary['overtuigen'] = mkState({
      usageHistory: [{ prompt: 'Ik wil je overtuigen.', snippet: 'Ik wil je overtuigen.', date: daysAgo(3), pragmaticScore: 70 }],
    })

    const wrapper = await mountSuspended(MemoryPage)

    expect(wrapper.find('.candidate-item').exists()).toBe(true)
    expect(wrapper.text()).toContain('Ik wil je overtuigen.')
    expect(wrapper.text()).toContain('3 days ago')
  })

  it('starts a custom smart-review session from a candidate', async () => {
    const { memory } = useLearnerMemory()
    memory.value.vocabulary['overtuigen'] = mkState({
      usageHistory: [{ prompt: 'Ik wil je overtuigen.', snippet: 'Ik wil je overtuigen.', date: daysAgo(3), pragmaticScore: 70 }],
    })
    const setItemSpy = vi.spyOn(sessionStorage, 'setItem')

    const wrapper = await mountSuspended(MemoryPage)
    await wrapper.find('.candidate-item').trigger('click')

    expect(setItemSpy).toHaveBeenCalled()
    expect(navigateMock).toHaveBeenCalledWith({ path: '/smart-review', query: { mode: 'custom' } })
    setItemSpy.mockRestore()
  })
})
