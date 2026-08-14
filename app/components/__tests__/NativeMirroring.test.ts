import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import NativeMirroring from '~/components/NativeMirroring.vue'
import { baseExercise, correctFeedback, retryFeedback } from './helpers'
import type { Exercise, Feedback } from '~/types/learning'

const mirroringExercise: Exercise = {
  ...baseExercise,
  id: 'mirroring-test',
  kind: 'mirroring',
  prompt: 'Je collega zegt dat hij niet kan komen. Reageer natuurlijk.',
  context: 'Het is voor mij niet mogelijk om morgen te komen.',
  target: 'Ik kan morgen helaas niet.',
  skills: ['pragmatic'],
}

const scoredFeedback: Feedback = {
  outcome: 'acceptable',
  message: 'Bijna! Voeg een partikel toe.',
  skills: ['pragmatic'],
  pragmaticScore: 62,
  teacherCorrection: {
    natural: 'Ik kan morgen helaas niet.',
    explanation: '"Helaas" klinkt natuurlijker.',
  },
}

describe('NativeMirroring', () => {
  it('renders the scenario and the stiff literal version', async () => {
    const wrapper = await mountSuspended(NativeMirroring, { props: { exercise: mirroringExercise } })

    expect(wrapper.text()).toContain('Je collega zegt dat hij niet kan komen. Reageer natuurlijk.')
    expect(wrapper.text()).toContain('Het is voor mij niet mogelijk om morgen te komen.')
  })

  it('binds the response through defineModel and emits submit', async () => {
    const wrapper = await mountSuspended(NativeMirroring, { props: { exercise: mirroringExercise } })

    await wrapper.find('textarea').setValue('Ik kan morgen helaas niet.')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Ik kan morgen helaas niet.'])

    await wrapper.findAll('button').find(b => b.text() === 'Check Naturalness')!.trigger('click')
    expect(wrapper.emitted('submit')).toHaveLength(1)
  })

  it('shows feedback with pragmatic score and native mirror correction', async () => {
    const wrapper = await mountSuspended(NativeMirroring, {
      props: { exercise: mirroringExercise, feedback: scoredFeedback },
    })

    expect(wrapper.find('.feedback-card').exists()).toBe(true)
    expect(wrapper.text()).toContain('acceptable')
    expect(wrapper.text()).toContain('Pragmatic Score: 62%')
    expect(wrapper.text()).toContain('Ik kan morgen helaas niet.')
    expect(wrapper.text()).toContain('"Helaas" klinkt natuurlijker.')
  })

  it('disables input and hides actions when feedback is provided, and emits next', async () => {
    const wrapper = await mountSuspended(NativeMirroring, {
      props: { exercise: mirroringExercise, feedback: retryFeedback },
    })

    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
    expect(wrapper.text()).not.toContain('Check Naturalness')

    await wrapper.findAll('button').find(b => b.text() === 'Continue')!.trigger('click')
    expect(wrapper.emitted('next')).toHaveLength(1)
  })
})
