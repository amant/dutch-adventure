import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SmartPalette from '~/components/SmartPalette.vue'

describe('SmartPalette', () => {
  it('renders chips and the used counter', async () => {
    const wrapper = await mountSuspended(SmartPalette, {
      props: {
        userText: 'Ik woon in Amsterdam',
        targetVocabulary: ['woon', 'fiets'],
        targetGrammar: ['omdat'],
        frontierConcepts: [{ key: 'gezellig', kind: 'vocabulary' }],
      },
    })

    const chips = wrapper.findAll('.chip')
    expect(chips.length).toBe(4)

    // 'woon' appears in the user text → 1 of 4 used
    expect(wrapper.text()).toContain('1 / 4 used')
    expect(wrapper.find('.chip.used .label').text()).toBe('woon')
    expect(wrapper.findAll('.chip.used').length).toBe(1)
  })

  it('marks chips as used case-insensitively', async () => {
    const wrapper = await mountSuspended(SmartPalette, {
      props: {
        userText: 'Ik WOON graag buiten',
        targetVocabulary: ['woon', 'buiten', 'eten'],
      },
    })

    expect(wrapper.text()).toContain('2 / 3 used')
    expect(wrapper.findAll('.chip.used').length).toBe(2)
  })

  it('deduplicates a frontier concept that is already a target', async () => {
    const wrapper = await mountSuspended(SmartPalette, {
      props: {
        userText: 'gezellig',
        targetVocabulary: ['gezellig'],
        frontierConcepts: [{ key: 'gezellig', kind: 'vocabulary' }],
      },
    })

    expect(wrapper.findAll('.chip').length).toBe(1)
    expect(wrapper.text()).toContain('1 / 1 used')
  })

  it('renders nothing when there are no targets', async () => {
    const wrapper = await mountSuspended(SmartPalette, {
      props: { userText: 'whatever' },
    })

    expect(wrapper.find('.smart-palette').exists()).toBe(false)
  })
})
