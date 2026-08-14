import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PragmaticIndicator from '~/components/PragmaticIndicator.vue'

describe('PragmaticIndicator', () => {
  it('renders the score percentage and the feedback text when provided', async () => {
    const wrapper = await mountSuspended(PragmaticIndicator, {
      props: {
        score: 75,
        feedback: 'Sounding more natural!',
      },
    })

    expect(wrapper.text()).toContain('75% Natural')
    expect(wrapper.find('.feedback-text').text()).toContain('Sounding more natural!')
  })

  it('renders the score percentage without feedback text when feedback is absent', async () => {
    const wrapper = await mountSuspended(PragmaticIndicator, {
      props: {
        score: 40,
      },
    })

    expect(wrapper.text()).toContain('40% Natural')
    expect(wrapper.find('.feedback-text').exists()).toBe(false)
  })

  it('renders a 100% score', async () => {
    const wrapper = await mountSuspended(PragmaticIndicator, {
      props: {
        score: 100,
        feedback: 'Perfect native flow.',
      },
    })

    expect(wrapper.text()).toContain('100% Natural')
    expect(wrapper.text()).toContain('Perfect native flow.')
  })
})
