import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PronominalDrill from '~/components/PronominalDrill.vue'
import { pronominalExercise, correctFeedback } from './helpers'
import type { Exercise } from '~/types/learning'

const metExercise: Exercise = {
  ...pronominalExercise,
  pronominalData: { ...pronominalExercise.pronominalData!, preposition: 'met', object: 'het' },
}

describe('PronominalDrill', () => {
  it('renders the prompt and pronominal data from the fixture', async () => {
    const wrapper = await mountSuspended(PronominalDrill, { props: { exercise: pronominalExercise } })

    expect(wrapper.text()).toContain('Vervang door een pronominaal adverbium.')
    expect(wrapper.text()).toContain('Ik wacht op het antwoord.')
    expect(wrapper.text()).toContain('op')
    expect(wrapper.text()).toContain('het')

    const options = wrapper.findAll('.choice-btn').map(b => b.text())
    expect(options).toContain('er')
    expect(options).toContain('hier')
    expect(options).toContain('daar')
    expect(options).toContain('waar')
    expect(wrapper.find('.result-box').text()).toContain('???')
  })

  it('emits submit with the combined pronominal adverb', async () => {
    const wrapper = await mountSuspended(PronominalDrill, { props: { exercise: pronominalExercise } })

    await wrapper.findAll('.choice-btn').find(b => b.text() === 'daar')!.trigger('click')
    await wrapper.find('.prep-btn').trigger('click')
    await wrapper.findAll('button').find(b => b.text() === 'Check Combination')!.trigger('click')

    expect(wrapper.emitted('submit')).toHaveLength(1)
    expect(wrapper.emitted('submit')![0]).toEqual(['daarop'])
  })

  it('previews the resulting adverb as the user merges parts', async () => {
    const wrapper = await mountSuspended(PronominalDrill, { props: { exercise: pronominalExercise } })

    await wrapper.findAll('.choice-btn').find(b => b.text() === 'waar')!.trigger('click')
    await wrapper.find('.prep-btn').trigger('click')

    expect(wrapper.find('.result-box').text()).toContain('waarop')
    expect(wrapper.find('.result-box').classes()).not.toContain('empty')
  })

  it('applies the met → mee spelling shift', async () => {
    const wrapper = await mountSuspended(PronominalDrill, { props: { exercise: metExercise } })

    await wrapper.findAll('.choice-btn').find(b => b.text() === 'hier')!.trigger('click')
    await wrapper.find('.prep-btn').trigger('click')

    expect(wrapper.text()).toContain('Form shifts to mee')
    expect(wrapper.find('.result-box').text()).toContain('hiermee')
  })

  it('shows feedback state and disables interaction when feedback is provided', async () => {
    const wrapper = await mountSuspended(PronominalDrill, {
      props: { exercise: pronominalExercise, feedback: correctFeedback },
    })

    expect(wrapper.find('.feedback-card').exists()).toBe(true)
    expect(wrapper.text()).toContain('That sounds perfectly natural!')
    expect(wrapper.findAll('.choice-btn').every(b => b.attributes('disabled') !== undefined)).toBe(true)
    expect(wrapper.text()).not.toContain('Check Combination')

    await wrapper.findAll('button').find(b => b.text() === 'Next Exercise')!.trigger('click')
    expect(wrapper.emitted('next')).toHaveLength(1)
  })
})
