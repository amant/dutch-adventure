import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import NominalisationDrill from '~/components/NominalisationDrill.vue'
import { nominalisationExercise, correctFeedback } from './helpers'
import type { Feedback } from '~/types/learning'

const detailedFeedback: Feedback = {
  outcome: 'retry',
  message: 'Gebruik het zelfstandig naamwoord.',
  skills: ['production'],
  changeModifier: 1,
  teacherCorrection: {
    natural: 'Het onderzoek van de zaak is gestart.',
    explanation: 'Nominalisatie met van.',
  },
  miniLesson: {
    title: 'Nominalisation',
    content: 'Van werkwoord naar zelfstandig naamwoord.',
    example: {
      wrong: 'De afdeling onderzoekt de zaak.',
      right: 'Het onderzoek van de zaak is gestart.',
    },
  },
}

describe('NominalisationDrill', () => {
  it('renders the prompt and verbal sentence from the fixture', async () => {
    const wrapper = await mountSuspended(NominalisationDrill, { props: { exercise: nominalisationExercise } })

    expect(wrapper.text()).toContain('Nominaliseer het werkwoord.')
    expect(wrapper.text()).toContain('Nominalisation')
    expect(wrapper.text()).toContain('De afdeling onderzoekt de zaak.')
    expect(wrapper.text()).toContain('Target noun:')
    expect(wrapper.text()).toContain('onderzoek')
  })

  it('emits submit with the typed nominalisation', async () => {
    const wrapper = await mountSuspended(NominalisationDrill, { props: { exercise: nominalisationExercise } })

    await wrapper.find('textarea').setValue('Het onderzoek van de zaak is gestart.')
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('submit')).toHaveLength(1)
    expect(wrapper.emitted('submit')![0]).toEqual(['Het onderzoek van de zaak is gestart.'])
  })

  it('shows feedback state and disables the textarea when feedback is provided', async () => {
    const wrapper = await mountSuspended(NominalisationDrill, {
      props: { exercise: nominalisationExercise, feedback: correctFeedback },
    })

    expect(wrapper.find('.feedback-card').exists()).toBe(true)
    expect(wrapper.text()).toContain('That sounds perfectly natural!')
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
    expect(wrapper.text()).not.toContain('Check Nominalisation')
  })

  it('renders the correction area and emits next from detailed feedback', async () => {
    const wrapper = await mountSuspended(NominalisationDrill, {
      props: { exercise: nominalisationExercise, feedback: detailedFeedback },
    })

    expect(wrapper.find('.correction-box').exists()).toBe(true)
    expect(wrapper.text()).toContain('Formal Correction:')
    expect(wrapper.text()).toContain('Het onderzoek van de zaak is gestart.')
    expect(wrapper.find('.mini-lesson').exists()).toBe(true)
    expect(wrapper.text()).toContain('Nominalisation')

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('next')).toHaveLength(1)
  })
})
