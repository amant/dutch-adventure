import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import CollocationDrill from '~/components/CollocationDrill.vue'
import { collocationExercise } from './helpers'

describe('CollocationDrill', () => {
  it('renders the prompt, target and options from the exercise', async () => {
    const wrapper = await mountSuspended(CollocationDrill, { props: { exercise: collocationExercise } })

    expect(wrapper.text()).toContain('Collocation Precision')
    expect(wrapper.find('.target').text()).toBe('besluit')
    expect(wrapper.findAll('.opt-btn').length).toBe(3)
    expect(wrapper.text()).toContain('nemen')
    expect(wrapper.text()).toContain('maken')
    expect(wrapper.text()).toContain('doen')
  })

  it('emits submit with the selected option when clicked', async () => {
    const wrapper = await mountSuspended(CollocationDrill, { props: { exercise: collocationExercise } })

    await wrapper.findAll('.opt-btn')[0].trigger('click')

    expect(wrapper.emitted('submit')).toHaveLength(1)
    expect(wrapper.emitted('submit')![0]).toEqual(['nemen'])
  })

  it('falls back to manual input when no options are present', async () => {
    const wrapper = await mountSuspended(CollocationDrill, {
      props: { exercise: { ...collocationExercise, options: [] } },
    })

    expect(wrapper.find('.options-grid').exists()).toBe(false)
    expect(wrapper.find('.manual-input').exists()).toBe(true)

    await wrapper.find('.input-field').setValue('nemen')
    await wrapper.findAll('button').find(b => b.text() === 'Submit')!.trigger('click')

    expect(wrapper.emitted('submit')![0]).toEqual(['nemen'])
  })

  it('keeps the manual Submit disabled until text is entered and submits on Enter', async () => {
    const wrapper = await mountSuspended(CollocationDrill, {
      props: { exercise: { ...collocationExercise, options: [] } },
    })

    const submit = wrapper.findAll('button').find(b => b.text() === 'Submit')!
    expect((submit.element as HTMLButtonElement).disabled).toBe(true)

    await wrapper.find('.input-field').setValue('doen')
    await wrapper.find('.input-field').trigger('keyup.enter')

    expect(wrapper.emitted('submit')![0]).toEqual(['doen'])
  })
})
