import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import CausalityDrill from '~/components/CausalityDrill.vue'
import { causalityExercise } from './helpers'
import type { Feedback } from '~/types/learning'

const detailedFeedback: Feedback = {
  outcome: 'retry',
  message: 'Let op de SOV-volgorde in de bijzin.',
  skills: ['production'],
  changeModifier: 3,
  teacherCorrection: {
    natural: 'Doordat het regende, bleven we binnen.',
    explanation: 'Doordat introduceert een bijzin; de persoonsvorm gaat naar het einde.',
  },
  miniLesson: {
    title: 'Subclause word order',
    content: 'In a doordat-bijzin the verb goes to the end.',
    example: {
      wrong: 'Doordat we bleven binnen',
      right: 'Doordat het regende, bleven we binnen.',
    },
  },
}

describe('CausalityDrill', () => {
  it('renders the prompt and causal context from the fixture', async () => {
    const wrapper = await mountSuspended(CausalityDrill, { props: { exercise: causalityExercise } })

    expect(wrapper.text()).toContain('Maak een zin met "doordat".')
    expect(wrapper.text()).toContain('Doordat (Onvrijwillige Oorzaak')
    expect(wrapper.text()).toContain('het regende de hele dag')
    expect(wrapper.text()).toContain('bleven we binnen')
    expect(wrapper.text()).toContain('Gebruik "doordat" voor een directe oorzaak.')
  })

  it('emits submit with the typed answer when the Check button is clicked', async () => {
    const wrapper = await mountSuspended(CausalityDrill, { props: { exercise: causalityExercise } })

    await wrapper.find('textarea').setValue('Doordat het regende, bleven we binnen.')
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('submit')).toHaveLength(1)
    expect(wrapper.emitted('submit')![0]).toEqual(['Doordat het regende, bleven we binnen.'])
  })

  it('renders the correction area and disables interaction when feedback is provided', async () => {
    const wrapper = await mountSuspended(CausalityDrill, {
      props: { exercise: causalityExercise, feedback: detailedFeedback },
    })

    expect(wrapper.find('.feedback-card').exists()).toBe(true)
    expect(wrapper.text()).toContain('Let op de SOV-volgorde in de bijzin.')
    expect(wrapper.text()).toContain("Teacher's Natural Correction:")
    expect(wrapper.text()).toContain('Doordat het regende, bleven we binnen.')
    expect(wrapper.text()).toContain('Subclause word order')
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
    expect(wrapper.text()).toContain('Continue Practice')
    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  it('emits next when Continue Practice is clicked', async () => {
    const wrapper = await mountSuspended(CausalityDrill, {
      props: { exercise: causalityExercise, feedback: detailedFeedback },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('next')).toHaveLength(1)
  })
})
