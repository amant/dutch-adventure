import { describe, it, expect, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import TextAnalyzer from '~/components/TextAnalyzer.vue'
import { useLearnerMemory } from '~/composables/useLearnerMemory'
import { resetLearnerMemory } from './helpers'

describe('TextAnalyzer', () => {
  beforeEach(() => {
    resetLearnerMemory()
  })

  it('renders the stats bar with percentages for a fresh text', async () => {
    const wrapper = await mountSuspended(TextAnalyzer, {
      props: { text: 'Ik woon in Amsterdam.' },
    })

    expect(wrapper.find('.stats-bar').exists()).toBe(true)
    expect(wrapper.text()).toContain('Mastered: 0%')
    expect(wrapper.text()).toContain('Frontier: 0%')
    expect(wrapper.text()).toContain('Recognized: 0%')
    expect(wrapper.text()).toContain('New: 100%')
  })

  it('renders interactable words and opens a hint popup on click, recording exposure', async () => {
    const { memory } = useLearnerMemory()
    const wrapper = await mountSuspended(TextAnalyzer, {
      props: { text: 'Ik woon in Amsterdam.' },
    })

    const interactable = wrapper.findAll('.word.interactable')
    expect(interactable.length).toBeGreaterThan(0)

    // 'Ik' is in the dictionary, so it is interactable and shows a hint
    const ikWord = interactable.find(w => w.text() === 'Ik')!
    await ikWord.trigger('click')

    const popup = wrapper.find('.hint-popup')
    expect(popup.exists()).toBe(true)
    expect(popup.text()).toContain('ik')
    expect(popup.text()).toContain('I')

    // recordExposure created a vocabulary entry in learner memory
    expect(memory.value.vocabulary['ik']).toBeDefined()
    expect(memory.value.vocabulary['ik']!.encounters).toBeGreaterThanOrEqual(1)
  })

  it('closes the hint popup via the close button', async () => {
    const wrapper = await mountSuspended(TextAnalyzer, {
      props: { text: 'Ik woon in Amsterdam.' },
    })

    const ikWord = wrapper
      .findAll('.word.interactable')
      .find(w => w.text() === 'Ik')!
    await ikWord.trigger('click')
    expect(wrapper.find('.hint-popup').exists()).toBe(true)

    await wrapper.find('.close-btn').trigger('click')
    expect(wrapper.find('.hint-popup').exists()).toBe(false)
  })

  it('renders no words for empty text', async () => {
    const wrapper = await mountSuspended(TextAnalyzer, {
      props: { text: '' },
    })

    expect(wrapper.findAll('.word.interactable').length).toBe(0)
    expect(wrapper.find('.hint-popup').exists()).toBe(false)
  })
})
