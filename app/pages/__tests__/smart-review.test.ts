import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import SmartReviewPage from '~/pages/smart-review.vue'
import { createSmartReviewChapter } from '~/utils/exerciseGenerator'
import { useChapterSession } from '~/composables/useChapterSession'
import { mkState, resetLearnerMemory } from './helpers'
import { useLearnerMemory } from '~/composables/useLearnerMemory'

const { routeMock } = vi.hoisted(() => ({ routeMock: vi.fn() }))
mockNuxtImport('useRoute', () => routeMock)

describe('smart-review page', () => {
  beforeEach(() => {
    resetLearnerMemory()
    routeMock.mockReset()
    useChapterSession(createSmartReviewChapter(['zijn', 'wonen'], ['word-order'])).reset()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('builds a fallback review chapter when memory is empty', async () => {
    routeMock.mockReturnValue({ query: {} })

    const wrapper = await mountSuspended(SmartReviewPage)

    expect(wrapper.text()).toContain('Smart Review')
    expect(wrapper.text()).toContain('Remember: zijn')
    expect(wrapper.findAll('button').some(b => b.text().includes('ready to continue'))).toBe(true)
  })

  it('advances to the next exercise', async () => {
    routeMock.mockReturnValue({ query: {} })

    const wrapper = await mountSuspended(SmartReviewPage)
    await wrapper.findAll('button').find(b => b.text().includes('ready to continue'))!.trigger('click')

    expect(wrapper.text()).toContain('Remember: wonen')
  })

  it('builds a speed chapter in speed mode from weak concepts', async () => {
    vi.useFakeTimers()
    const { memory } = useLearnerMemory()
    memory.value.vocabulary['zijn'] = mkState({ production: 10, automaticity: 10 })
    routeMock.mockReturnValue({ query: { mode: 'speed' } })

    const wrapper = await mountSuspended(SmartReviewPage)

    expect(wrapper.text()).toContain('Speed Drills')
    expect(wrapper.find('.speed-drill').exists()).toBe(true)
  })

  it('builds a custom chapter from session storage in custom mode', async () => {
    sessionStorage.setItem('custom-review-exercise', JSON.stringify({
      id: 'c1',
      kind: 'typed',
      prompt: 'Zeg iets over je dag.',
      target: 'Ik heb een goede dag gehad.',
      skills: ['production'],
    }))
    routeMock.mockReturnValue({ query: { mode: 'custom' } })

    const wrapper = await mountSuspended(SmartReviewPage)

    expect(wrapper.text()).toContain('Zeg iets over je dag.')
    expect(wrapper.find('textarea').exists()).toBe(true)
  })
})
