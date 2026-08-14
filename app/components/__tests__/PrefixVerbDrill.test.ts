import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PrefixVerbDrill from '~/components/PrefixVerbDrill.vue'
import { prefixVerbExercise } from './helpers'
import type { Feedback } from '~/types/learning'

const detailedFeedback: Feedback = {
  outcome: 'retry',
  message: 'Het voorvoegsel moet in de hoofdzin afsplitsen.',
  skills: ['production'],
  changeModifier: 2,
  teacherCorrection: {
    natural: 'Dat komt soms voor.',
    explanation: 'Voorkomen is scheidbaar: voor gaat naar het einde van de hoofdzin.',
  },
  miniLesson: {
    title: 'Separable prefix',
    content: 'voor splits off in the main clause.',
    example: {
      wrong: 'Dat voorkomt soms',
      right: 'Dat komt soms voor.',
    },
  },
}

describe('PrefixVerbDrill', () => {
  it('renders the prompt and prefix verb context from the fixture', async () => {
    const wrapper = await mountSuspended(PrefixVerbDrill, { props: { exercise: prefixVerbExercise } })

    expect(wrapper.text()).toContain('Vorm een zin met "voorkomen".')
    expect(wrapper.text()).toContain('Scheidbaar (Klemtoon op Voorvoegsel)')
    expect(wrapper.text()).toContain('vóórkomen')
    expect(wrapper.text()).toContain('Onvoltooid Tegenwoordige Tijd (Hoofdzin)')
    expect(wrapper.text()).toContain('iets gebeurt')
    expect(wrapper.text()).toContain('Zeg: dat gebeurt soms.')
    expect(wrapper.text()).toContain('Gebruik "voor" + "komen" met klemtoon op "voor".')
  })

  it('emits submit with the typed answer when the Check button is clicked', async () => {
    const wrapper = await mountSuspended(PrefixVerbDrill, { props: { exercise: prefixVerbExercise } })

    await wrapper.find('textarea').setValue('Dat komt soms voor.')
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('submit')).toHaveLength(1)
    expect(wrapper.emitted('submit')![0]).toEqual(['Dat komt soms voor.'])
  })

  it('renders the correction area and disables interaction when feedback is provided', async () => {
    const wrapper = await mountSuspended(PrefixVerbDrill, {
      props: { exercise: prefixVerbExercise, feedback: detailedFeedback },
    })

    expect(wrapper.find('.feedback-card').exists()).toBe(true)
    expect(wrapper.text()).toContain('Het voorvoegsel moet in de hoofdzin afsplitsen.')
    expect(wrapper.text()).toContain("Teacher's Natural Correction:")
    expect(wrapper.text()).toContain('Dat komt soms voor.')
    expect(wrapper.text()).toContain('Separable prefix')
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
    expect(wrapper.text()).toContain('Continue Practice')
    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  it('emits next when Continue Practice is clicked', async () => {
    const wrapper = await mountSuspended(PrefixVerbDrill, {
      props: { exercise: prefixVerbExercise, feedback: detailedFeedback },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('next')).toHaveLength(1)
  })
})
