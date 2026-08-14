import { describe, it, expect, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import RelativeClauseDrill from '~/components/RelativeClauseDrill.vue'
import { relativeClauseExercise, correctFeedback, resetLearnerMemory } from './helpers'
import type { Feedback } from '~/types/learning'

const detailedFeedback: Feedback = {
  outcome: 'retry',
  message: 'Gebruik "dat" voor het-woorden.',
  skills: ['production'],
  changeModifier: 1,
  teacherCorrection: {
    natural: 'Het boek dat ik lees is spannend.',
    explanation: 'Dat verwijst naar het-woord "boek".',
  },
  miniLesson: {
    title: 'Het-woord (dat)',
    content: 'Relatief voornaamwoord dat.',
    example: {
      wrong: 'Het boek die ik lees is spannend.',
      right: 'Het boek dat ik lees is spannend.',
    },
  },
}

describe('RelativeClauseDrill', () => {
  beforeEach(() => resetLearnerMemory())

  it('renders the prompt and clause sources from the fixture', async () => {
    const wrapper = await mountSuspended(RelativeClauseDrill, { props: { exercise: relativeClauseExercise } })

    expect(wrapper.text()).toContain('Vorm een betrekkelijke bijzin.')
    expect(wrapper.text()).toContain('Het-woord (dat)')
    expect(wrapper.text()).toContain('Het boek is spannend.')
    expect(wrapper.text()).toContain('Ik lees dat boek.')
    expect(wrapper.text()).toContain('Antecedent:')
    expect(wrapper.text()).toContain('boek')
    expect(wrapper.text()).toContain('Gebruik "dat" voor het-woorden.')
  })

  it('emits submit with the typed combined sentence', async () => {
    const wrapper = await mountSuspended(RelativeClauseDrill, { props: { exercise: relativeClauseExercise } })

    await wrapper.find('textarea').setValue('Het boek dat ik lees is spannend.')
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('submit')).toHaveLength(1)
    expect(wrapper.emitted('submit')![0]).toEqual(['Het boek dat ik lees is spannend.'])
  })

  it('shows feedback state and disables the textarea when feedback is provided', async () => {
    const wrapper = await mountSuspended(RelativeClauseDrill, {
      props: { exercise: relativeClauseExercise, feedback: correctFeedback },
    })

    expect(wrapper.find('.feedback-card').exists()).toBe(true)
    expect(wrapper.text()).toContain('That sounds perfectly natural!')
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
    expect(wrapper.text()).not.toContain('Check Betrekkelijke Bijzin')
  })

  it('renders the correction area and emits next from detailed feedback', async () => {
    const wrapper = await mountSuspended(RelativeClauseDrill, {
      props: { exercise: relativeClauseExercise, feedback: detailedFeedback },
    })

    expect(wrapper.find('.correction-box').exists()).toBe(true)
    expect(wrapper.text()).toContain("Teacher's Natural Correction:")
    expect(wrapper.text()).toContain('Het boek dat ik lees is spannend.')
    expect(wrapper.find('.mini-lesson').exists()).toBe(true)
    expect(wrapper.text()).toContain('Het-woord (dat)')

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('next')).toHaveLength(1)
  })
})
