import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MidfieldDrill from '~/components/MidfieldDrill.vue'
import { midfieldExercise, correctFeedback } from './helpers'
import type { Feedback } from '~/types/learning'

const detailedFeedback: Feedback = {
  outcome: 'retry',
  message: 'Let op de TMP-volgorde.',
  skills: ['production'],
  changeModifier: 2,
  teacherCorrection: {
    natural: 'Ik woonde gisteren rustig thuis.',
    explanation: 'Tijd vóór manier vóór plaats.',
  },
  miniLesson: {
    title: 'TMP-Volgorde',
    content: 'Tijd, manier, plaats in het middenveld.',
    example: {
      wrong: 'Ik woonde thuis gisteren rustig.',
      right: 'Ik woonde gisteren rustig thuis.',
    },
  },
}

describe('MidfieldDrill', () => {
  it('renders the prompt and midfield data from the fixture', async () => {
    const wrapper = await mountSuspended(MidfieldDrill, { props: { exercise: midfieldExercise } })

    expect(wrapper.text()).toContain('Plaats de zinsdelen in de juiste volgorde.')
    expect(wrapper.text()).toContain('TMP-Volgorde')
    expect(wrapper.text()).toContain('gisteren')
    expect(wrapper.text()).toContain('rustig')
    expect(wrapper.text()).toContain('thuis')
    expect(wrapper.text()).toContain('Zeg: gisteren - rustig - thuis.')
    expect(wrapper.text()).toContain('[Onderwerp] + [PV] + Tijd + Manier + Plaats')
    expect(wrapper.text()).toContain('Tijd voor Manier voor Plaats.')
    expect(wrapper.findAll('.slot-pill').length).toBe(3)
  })

  it('emits submit with the typed answer when the validate button is clicked', async () => {
    const wrapper = await mountSuspended(MidfieldDrill, { props: { exercise: midfieldExercise } })

    await wrapper.find('textarea').setValue('Ik woonde gisteren rustig thuis.')
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('submit')).toHaveLength(1)
    expect(wrapper.emitted('submit')![0]).toEqual(['Ik woonde gisteren rustig thuis.'])
  })

  it('shows feedback state and disables the textarea when feedback is provided', async () => {
    const wrapper = await mountSuspended(MidfieldDrill, {
      props: { exercise: midfieldExercise, feedback: correctFeedback },
    })

    expect(wrapper.find('.feedback-card').exists()).toBe(true)
    expect(wrapper.text()).toContain('That sounds perfectly natural!')
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
    expect(wrapper.text()).not.toContain('Valideer Zinsvolgorde')
  })

  it('renders the teacher correction and mini lesson from detailed feedback', async () => {
    const wrapper = await mountSuspended(MidfieldDrill, {
      props: { exercise: midfieldExercise, feedback: detailedFeedback },
    })

    expect(wrapper.find('.correction-box').exists()).toBe(true)
    expect(wrapper.text()).toContain("Teacher's Natural Correction:")
    expect(wrapper.text()).toContain('Ik woonde gisteren rustig thuis.')
    expect(wrapper.find('.mini-lesson').exists()).toBe(true)
    expect(wrapper.text()).toContain('TMP-Volgorde')

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('next')).toHaveLength(1)
  })
})
