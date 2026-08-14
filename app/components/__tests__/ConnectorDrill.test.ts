import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ConnectorDrill from '~/components/ConnectorDrill.vue'
import { connectorExercise, correctFeedback } from './helpers'
import type { Feedback } from '~/types/learning'

const explanationFeedback: Feedback = {
  ...correctFeedback,
  explanation: 'Maar drukt een tegenstelling uit.',
}

describe('ConnectorDrill', () => {
  it('renders the context, gapped prompt and connector options', async () => {
    const wrapper = await mountSuspended(ConnectorDrill, {
      props: { exercise: connectorExercise, modelValue: '' },
    })

    expect(wrapper.text()).toContain('Kies het juiste voegwoord.')
    expect(wrapper.text()).toContain('Ik wil koffie')
    expect(wrapper.text()).toContain('ik wil thee.')
    expect(wrapper.find('.gap').text()).toBe('...')
    expect(wrapper.text()).toContain('maar')
    expect(wrapper.text()).toContain('omdat')
  })

  it('emits update:modelValue and fills the gap when an option is clicked', async () => {
    const wrapper = await mountSuspended(ConnectorDrill, {
      props: { exercise: connectorExercise, modelValue: '' },
    })

    await wrapper.findAll('.option-button')[0].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['maar'])

    await wrapper.setProps({ modelValue: 'maar' })
    expect(wrapper.find('.gap').text()).toBe('maar')
    expect(wrapper.find('.gap').classes()).toContain('filled')
  })

  it('keeps Check Connector disabled until a response exists and then emits submit', async () => {
    const wrapper = await mountSuspended(ConnectorDrill, {
      props: { exercise: connectorExercise, modelValue: '' },
    })

    expect((wrapper.find('.footer button').element as HTMLButtonElement).disabled).toBe(true)

    await wrapper.findAll('.option-button')[0].trigger('click')
    await wrapper.setProps({ modelValue: 'maar' })

    await wrapper.find('.footer button').trigger('click')
    expect(wrapper.emitted('submit')).toHaveLength(1)
  })

  it('hides options and renders the explanation when feedback is provided', async () => {
    const wrapper = await mountSuspended(ConnectorDrill, {
      props: { exercise: connectorExercise, feedback: explanationFeedback, modelValue: 'maar' },
    })

    expect(wrapper.find('.options-grid').exists()).toBe(false)
    expect(wrapper.find('.footer').exists()).toBe(false)
    expect(wrapper.text()).toContain('Maar drukt een tegenstelling uit.')
  })
})
