import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import TopicalisationDrill from '~/components/TopicalisationDrill.vue'
import { topicalisationExercise, correctFeedback } from './helpers'

describe('TopicalisationDrill', () => {
  it('renders the prompt and topicalisation data from the fixture', async () => {
    const wrapper = await mountSuspended(TopicalisationDrill, { props: { exercise: topicalisationExercise } })

    expect(wrapper.text()).toContain('Begin de zin met het lijdend voorwerp.')
    expect(wrapper.text()).toContain('Lijdend/Meewerkend Voorwerp Vooraan (V2 Inversie)')
    expect(wrapper.text()).toContain('Dat boek')
    expect(wrapper.text()).toContain('Ik lees dat boek.')
    expect(wrapper.text()).toContain('Leg de nadruk op het boek.')
    expect(wrapper.text()).toContain('[Object] + [PV] + [Onderwerp] + ...')
    expect(wrapper.text()).toContain('Zet het object vooraan en pas inversie toe.')
  })

  it('emits submit with the typed answer on form submit', async () => {
    const wrapper = await mountSuspended(TopicalisationDrill, { props: { exercise: topicalisationExercise } })

    await wrapper.find('textarea').setValue('Dat boek lees ik.')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')).toHaveLength(1)
    expect(wrapper.emitted('submit')![0]).toEqual(['Dat boek lees ik.'])
  })

  it('emits submit when Enter is pressed in the textarea', async () => {
    const wrapper = await mountSuspended(TopicalisationDrill, { props: { exercise: topicalisationExercise } })

    await wrapper.find('textarea').setValue('Dat boek lees ik.')
    await wrapper.find('textarea').trigger('keydown.enter')

    expect(wrapper.emitted('submit')).toHaveLength(1)
    expect(wrapper.emitted('submit')![0]).toEqual(['Dat boek lees ik.'])
  })

  it('disables input and hides the submit button when feedback is provided', async () => {
    const wrapper = await mountSuspended(TopicalisationDrill, {
      props: { exercise: topicalisationExercise, feedback: correctFeedback },
    })

    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').exists()).toBe(false)

    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('submit')).toBeUndefined()
  })
})
