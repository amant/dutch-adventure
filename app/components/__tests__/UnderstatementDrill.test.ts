import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import UnderstatementDrill from '~/components/UnderstatementDrill.vue'
import { understatementExercise } from './helpers'
import type { Feedback } from '~/types/learning'

const exerciseWithContext = { ...understatementExercise, context: 'That was amazing!' }

const richFeedback: Feedback = {
  outcome: 'acceptable',
  message: 'Bijna! Nog iets subtieler.',
  skills: ['production'],
  pragmaticScore: 85,
  pragmaticFeedback: 'Dutch speakers prefer understatement.',
  teacherCorrection: {
    natural: 'Het valt wel mee.',
    explanation: 'Use "wel" for understated agreement.',
  },
}

describe('UnderstatementDrill', () => {
  it('renders the scenario, prompt and voice input from the exercise', async () => {
    const wrapper = await mountSuspended(UnderstatementDrill, { props: { exercise: exerciseWithContext } })

    expect(wrapper.text()).toContain('That was amazing!')
    expect(wrapper.text()).toContain('Verwoord dit op een understated manier.')
    expect(wrapper.text()).toContain('Or speak your answer')
  })

  it('binds the response via the model and emits submit with its value', async () => {
    const wrapper = await mountSuspended(UnderstatementDrill, {
      props: { exercise: exerciseWithContext, modelValue: '' },
    })

    await wrapper.find('input').setValue('Het valt wel mee.')
    expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual(['Het valt wel mee.'])

    await wrapper.setProps({ modelValue: 'Het valt wel mee.' })
    await wrapper.find('.input-wrapper .button.primary').trigger('click')
    expect(wrapper.emitted('submit')).toHaveLength(1)
    expect(wrapper.emitted('submit')![0]).toEqual(['Het valt wel mee.'])
  })

  it('emits submit when Enter is pressed in the input', async () => {
    const wrapper = await mountSuspended(UnderstatementDrill, {
      props: { exercise: exerciseWithContext, modelValue: 'Het valt wel mee.' },
    })

    await wrapper.find('input').trigger('keyup.enter')

    expect(wrapper.emitted('submit')![0]).toEqual(['Het valt wel mee.'])
  })

  it('renders score, tip and redline feedback and emits next on Continue', async () => {
    const wrapper = await mountSuspended(UnderstatementDrill, {
      props: { exercise: exerciseWithContext, feedback: richFeedback, modelValue: 'Het is wel oké.' },
    })

    expect(wrapper.text()).toContain('acceptable')
    expect(wrapper.text()).toContain('Naturalness: 85%')
    expect(wrapper.text()).toContain('Bijna! Nog iets subtieler.')
    expect(wrapper.text()).toContain('Dutch speakers prefer understatement.')
    expect(wrapper.text()).toContain('Native Alternative:')
    expect(wrapper.text()).toContain('Use "wel" for understated agreement.')

    await wrapper.findAll('button').find(b => b.text() === 'Continue')!.trigger('click')
    expect(wrapper.emitted('next')).toHaveLength(1)
  })
})
