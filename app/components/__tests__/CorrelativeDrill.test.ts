import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import CorrelativeDrill from '~/components/CorrelativeDrill.vue'
import { correlativeExercise } from './helpers'
import type { Feedback } from '~/types/learning'

const detailedFeedback: Feedback = {
  outcome: 'retry',
  message: 'Houd de twee delen van het paar parallel.',
  skills: ['production'],
  changeModifier: 2,
  teacherCorrection: {
    natural: 'Ik hou zowel van koffie als van thee.',
    explanation: 'Zowel ... als verbindt twee parallelle elementen.',
  },
  miniLesson: {
    title: 'Correlative balance',
    content: 'zowel ... als links parallel elements.',
    example: {
      wrong: 'Ik hou zowel van koffie als thee',
      right: 'Ik hou zowel van koffie als van thee.',
    },
  },
}

describe('CorrelativeDrill', () => {
  it('renders the prompt and correlative context from the fixture', async () => {
    const wrapper = await mountSuspended(CorrelativeDrill, { props: { exercise: correlativeExercise } })

    expect(wrapper.text()).toContain('Maak een zin met "zowel ... als".')
    expect(wrapper.text()).toContain('Zowel ... als ... (Parallelle Coördinatie)')
    expect(wrapper.text()).toContain('Ik hou van koffie')
    expect(wrapper.text()).toContain('Ik hou van thee')
    expect(wrapper.text()).toContain('Zowel A als B.')
  })

  it('emits submit with the typed answer when the Check button is clicked', async () => {
    const wrapper = await mountSuspended(CorrelativeDrill, { props: { exercise: correlativeExercise } })

    await wrapper.find('textarea').setValue('Ik hou zowel van koffie als van thee.')
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('submit')).toHaveLength(1)
    expect(wrapper.emitted('submit')![0]).toEqual(['Ik hou zowel van koffie als van thee.'])
  })

  it('renders the correction area and disables interaction when feedback is provided', async () => {
    const wrapper = await mountSuspended(CorrelativeDrill, {
      props: { exercise: correlativeExercise, feedback: detailedFeedback },
    })

    expect(wrapper.find('.feedback-card').exists()).toBe(true)
    expect(wrapper.text()).toContain('Houd de twee delen van het paar parallel.')
    expect(wrapper.text()).toContain("Teacher's Natural Correction:")
    expect(wrapper.text()).toContain('Ik hou zowel van koffie als van thee.')
    expect(wrapper.text()).toContain('Correlative balance')
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
    expect(wrapper.text()).toContain('Continue Practice')
    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  it('emits next when Continue Practice is clicked', async () => {
    const wrapper = await mountSuspended(CorrelativeDrill, {
      props: { exercise: correlativeExercise, feedback: detailedFeedback },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('next')).toHaveLength(1)
  })
})
