import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SummaryChallenge from '~/components/SummaryChallenge.vue'
import { summaryExercise, correctFeedback } from './helpers'
import type { Feedback } from '~/types/learning'

const detailedFeedback: Feedback = {
  ...correctFeedback,
  changeModifier: 4,
  explanation: 'Sterke samenvatting!',
}

describe('SummaryChallenge', () => {
  it('renders the prompt and the required summary points', async () => {
    const wrapper = await mountSuspended(SummaryChallenge, { props: { exercise: summaryExercise } })

    expect(wrapper.text()).toContain('Vat het artikel samen.')
    expect(wrapper.findAll('.point-item').length).toBe(2)
    expect(wrapper.text()).toContain('De oorzaak')
    expect(wrapper.text()).toContain('De oplossing')
  })

  it('marks captured key points and updates the progress bar while typing', async () => {
    const wrapper = await mountSuspended(SummaryChallenge, { props: { exercise: summaryExercise } })

    await wrapper.find('textarea').setValue('De oorzaak is het weer.')

    const points = wrapper.findAll('.point-item')
    expect(points[0].classes()).toContain('is-captured')
    expect(points[1].classes()).not.toContain('is-captured')
    expect(wrapper.find('.progress-bar').attributes('style')).toContain('50%')
  })

  it('emits submit with the typed summary', async () => {
    const wrapper = await mountSuspended(SummaryChallenge, { props: { exercise: summaryExercise } })

    await wrapper.find('textarea').setValue('De oorzaak is het weer. De oplossing is een paraplu.')
    await wrapper.findAll('button').find(b => b.text().includes('Submit Summary'))!.trigger('click')

    expect(wrapper.emitted('submit')).toHaveLength(1)
    expect(wrapper.emitted('submit')![0]).toEqual(['De oorzaak is het weer. De oplossing is een paraplu.'])
  })

  it('keeps Submit Summary disabled while the answer is empty', async () => {
    const wrapper = await mountSuspended(SummaryChallenge, { props: { exercise: summaryExercise } })

    const submit = wrapper.findAll('button').find(b => b.text().includes('Submit Summary'))!
    expect((submit.element as HTMLButtonElement).disabled).toBe(true)
  })

  it('disables the textarea, shows feedback and emits next on Continue Exploring', async () => {
    const wrapper = await mountSuspended(SummaryChallenge, {
      props: { exercise: summaryExercise, feedback: detailedFeedback },
    })

    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
    expect(wrapper.findAll('button').some(b => b.text().includes('Submit Summary'))).toBe(false)
    expect(wrapper.text()).toContain('correct')
    expect(wrapper.text()).toContain('+4 mastery')
    expect(wrapper.text()).toContain('That sounds perfectly natural!')
    expect(wrapper.text()).toContain('Sterke samenvatting!')

    await wrapper.findAll('button').find(b => b.text().includes('Continue Exploring'))!.trigger('click')
    expect(wrapper.emitted('next')).toHaveLength(1)
  })
})
