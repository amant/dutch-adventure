import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import FixedPrepositionDrill from '~/components/FixedPrepositionDrill.vue'
import { fixedPrepositionExercise, correctFeedback } from './helpers'

describe('FixedPrepositionDrill', () => {
  it('renders the prompt and prepositional regime from the fixture', async () => {
    const wrapper = await mountSuspended(FixedPrepositionDrill, { props: { exercise: fixedPrepositionExercise } })

    expect(wrapper.text()).toContain('Vul de juiste vaste voorzetsel in.')
    expect(wrapper.text()).toContain('Werkwoord + Vast Voorzetsel')
    expect(wrapper.text()).toContain('twijfelen')
    expect(wrapper.text()).toContain('+ aan')
    expect(wrapper.text()).toContain('Ik twijfel ... mijn antwoord.')
    expect(wrapper.text()).toContain('twijfelen aan + [object]')
    expect(wrapper.text()).toContain('Twijfelen aan.')
  })

  it('emits submit with the typed answer when the form is submitted', async () => {
    const wrapper = await mountSuspended(FixedPrepositionDrill, { props: { exercise: fixedPrepositionExercise } })

    await wrapper.find('textarea').setValue('Ik twijfel aan mijn antwoord.')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')).toHaveLength(1)
    expect(wrapper.emitted('submit')![0]).toEqual(['Ik twijfel aan mijn antwoord.'])
  })

  it('disables the textarea and hides the submit button when feedback is provided', async () => {
    const wrapper = await mountSuspended(FixedPrepositionDrill, {
      props: { exercise: fixedPrepositionExercise, feedback: correctFeedback },
    })

    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
    expect(wrapper.find('button[type="submit"]').exists()).toBe(false)

    // Submitting while feedback is present must not emit a new submit.
    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('submit')).toBeUndefined()
  })
})
