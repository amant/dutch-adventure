import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ErPositionDrill from '~/components/ErPositionDrill.vue'
import { erDrillExercise, correctFeedback } from './helpers'
import type { Feedback } from '~/types/learning'

const detailedFeedback: Feedback = {
  ...correctFeedback,
  changeModifier: 3,
  explanation: 'Gebruik er ... aan.',
}

describe('ErPositionDrill', () => {
  it('renders the prompt, sentence and options from the exercise', async () => {
    const wrapper = await mountSuspended(ErPositionDrill, { props: { exercise: erDrillExercise } })

    expect(wrapper.text()).toContain('Vul "er" in op de juiste plek.')
    expect(wrapper.text()).toContain('Ik heb gisteren ... aan gedacht.')
    expect(wrapper.text()).toContain('Mastering \'Er\' & Position')
    expect(wrapper.findAll('.option-button').length).toBe(2)
    expect(wrapper.text()).toContain('er')
    expect(wrapper.text()).toContain('daar')
    expect(wrapper.text()).toContain('prepositional')
  })

  it('emits submit with the selected option when Verify Selection is clicked', async () => {
    const wrapper = await mountSuspended(ErPositionDrill, { props: { exercise: erDrillExercise } })

    await wrapper.findAll('.option-button')[0].trigger('click')
    expect(wrapper.findAll('.option-button')[0].classes()).toContain('selected')

    await wrapper.findAll('button').find(b => b.text().includes('Verify Selection'))!.trigger('click')
    expect(wrapper.emitted('submit')).toHaveLength(1)
    expect(wrapper.emitted('submit')![0]).toEqual(['er'])
  })

  it('disables Verify Selection until an option is selected', async () => {
    const wrapper = await mountSuspended(ErPositionDrill, { props: { exercise: erDrillExercise } })

    const verify = wrapper.findAll('button').find(b => b.text().includes('Verify Selection'))!
    expect((verify.element as HTMLButtonElement).disabled).toBe(true)

    await wrapper.findAll('.option-button')[1].trigger('click')
    const verifyAfter = wrapper.findAll('button').find(b => b.text().includes('Verify Selection'))!
    expect((verifyAfter.element as HTMLButtonElement).disabled).toBe(false)
  })

  it('shows feedback, disables options and emits next on Continue Practice', async () => {
    const wrapper = await mountSuspended(ErPositionDrill, {
      props: { exercise: erDrillExercise, feedback: detailedFeedback },
    })

    expect(wrapper.findAll('.option-button').every(b => b.attributes('disabled') !== undefined)).toBe(true)
    expect(wrapper.text()).toContain('correct')
    expect(wrapper.text()).toContain('+3 mastery')
    expect(wrapper.text()).toContain('That sounds perfectly natural!')
    expect(wrapper.text()).toContain('Gebruik er ... aan.')

    await wrapper.findAll('button').find(b => b.text().includes('Continue Practice'))!.trigger('click')
    expect(wrapper.emitted('next')).toHaveLength(1)
  })
})
