import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MorphingDrill from '~/components/MorphingDrill.vue'
import { morphingExercise, correctFeedback } from './helpers'

describe('MorphingDrill', () => {
  it('renders the base sentence and the first step instruction', async () => {
    const wrapper = await mountSuspended(MorphingDrill, { props: { exercise: morphingExercise } })

    expect(wrapper.text()).toContain('Ik loop naar de winkel.')
    expect(wrapper.text()).toContain('Maak er verleden tijd van.')
    expect(wrapper.findAll('.step-dot')).toHaveLength(2)
    expect(wrapper.findAll('.step-dot.active')).toHaveLength(1)
  })

  it('does not emit submit for an empty response', async () => {
    const wrapper = await mountSuspended(MorphingDrill, { props: { exercise: morphingExercise } })

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  it('emits submit with the current step index', async () => {
    const wrapper = await mountSuspended(MorphingDrill, { props: { exercise: morphingExercise } })

    await wrapper.find('textarea').setValue('Ik liep naar de winkel.')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')).toHaveLength(1)
    expect(wrapper.emitted('submit')![0]).toEqual([{ morphingStepIndex: 0 }])
  })

  it('records the completed step and advances after correct feedback', async () => {
    const wrapper = await mountSuspended(MorphingDrill, { props: { exercise: morphingExercise } })

    await wrapper.find('textarea').setValue('Ik liep naar de winkel.')
    await wrapper.find('form').trigger('submit')

    await wrapper.setProps({ feedback: correctFeedback })

    expect(wrapper.text()).toContain('Step 1')
    expect(wrapper.text()).toContain('Ik liep naar de winkel.')

    await wrapper.findAll('button').find(b => b.text() === 'Next Change')!.trigger('click')

    expect(wrapper.emitted('next-step')).toHaveLength(1)
    await wrapper.setProps({ feedback: undefined })

    expect(wrapper.text()).toContain('Maak de zin vragend.')
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('')
  })

  it('hides the form on correct feedback for the final step', async () => {
    const wrapper = await mountSuspended(MorphingDrill, { props: { exercise: morphingExercise } })

    // Complete step 1 first
    await wrapper.find('textarea').setValue('Ik liep naar de winkel.')
    await wrapper.find('form').trigger('submit')
    await wrapper.setProps({ feedback: correctFeedback })
    await wrapper.findAll('button').find(b => b.text() === 'Next Change')!.trigger('click')
    await wrapper.setProps({ feedback: undefined })

    // Answer correctly on the final step
    await wrapper.find('textarea').setValue('Liep ik naar de winkel?')
    await wrapper.find('form').trigger('submit')
    await wrapper.setProps({ feedback: correctFeedback })

    expect(wrapper.find('form').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('Next Change')
  })
})
