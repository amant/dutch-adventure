import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import FrontierCard from '~/components/FrontierCard.vue'

describe('FrontierCard', () => {
  it('renders frontier items and their gaps', async () => {
    const wrapper = await mountSuspended(FrontierCard, {
      props: {
        frontier: [
          { key: 'wonen', kind: 'vocabulary', passive: 80, active: 20 },
          { key: 'omdat-clause', kind: 'grammar', passive: 70, active: 10 },
        ],
      },
    })

    expect(wrapper.text()).toContain('wonen')
    expect(wrapper.text()).toContain('omdat-clause')
    expect(wrapper.text()).toContain('Gap: 60%')
    expect(wrapper.text()).toContain('Gap: 60%')
  })

  it('emits activate when the launch button is clicked', async () => {
    const wrapper = await mountSuspended(FrontierCard, {
      props: {
        frontier: [{ key: 'wonen', kind: 'vocabulary', passive: 80, active: 20 }],
      },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('activate')).toHaveLength(1)
  })

  it('hides the launch button when there are no frontier items', async () => {
    const wrapper = await mountSuspended(FrontierCard, {
      props: { frontier: [] },
    })

    expect(wrapper.find('button').exists()).toBe(false)
    expect(wrapper.find('.frontier-list').exists()).toBe(true)
  })
})
