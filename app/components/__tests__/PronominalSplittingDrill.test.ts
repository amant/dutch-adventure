import { describe, it, expect, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PronominalSplittingDrill from '~/components/PronominalSplittingDrill.vue'
import { pronominalSplittingExercise, correctFeedback, resetLearnerMemory } from './helpers'

describe('PronominalSplittingDrill', () => {
  beforeEach(() => resetLearnerMemory())

  it('renders the prompt and splitting data from the fixture', async () => {
    const wrapper = await mountSuspended(PronominalSplittingDrill, {
      props: { exercise: pronominalSplittingExercise },
    })

    expect(wrapper.text()).toContain('Splits het pronominaal adverbium.')
    expect(wrapper.text()).toContain('Hoofdzin (R-woord vroeg, Voorzetsel achteraan)')
    expect(wrapper.text()).toContain('daar')
    expect(wrapper.text()).toContain('op')
    expect(wrapper.text()).toContain('daarop')
    expect(wrapper.text()).toContain('Ik wacht ... (op dat antwoord)')
    expect(wrapper.text()).toContain('daar + [werkwoord] + op')
    expect(wrapper.text()).toContain('Splits "daarop" in "daar ... op".')
  })

  it('emits submit with the typed answer on form submit', async () => {
    const wrapper = await mountSuspended(PronominalSplittingDrill, {
      props: { exercise: pronominalSplittingExercise },
    })

    await wrapper.find('textarea').setValue('Daar wacht ik op.')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')).toHaveLength(1)
    expect(wrapper.emitted('submit')![0]).toEqual(['Daar wacht ik op.'])
  })

  it('does not emit submit for an empty answer', async () => {
    const wrapper = await mountSuspended(PronominalSplittingDrill, {
      props: { exercise: pronominalSplittingExercise },
    })

    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  it('disables input and hides the submit button when feedback is provided', async () => {
    const wrapper = await mountSuspended(PronominalSplittingDrill, {
      props: { exercise: pronominalSplittingExercise, feedback: correctFeedback },
    })

    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').exists()).toBe(false)

    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('submit')).toBeUndefined()
  })
})
