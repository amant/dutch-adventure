import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import NuanceDrill from '~/components/NuanceDrill.vue'
import { nuanceExercise } from './helpers'

const exerciseWithContext = { ...nuanceExercise, context: 'Ik kom langs.' }

describe('NuanceDrill', () => {
  it('renders the stiff sentence and the full particle palette', async () => {
    const wrapper = await mountSuspended(NuanceDrill, { props: { exercise: exerciseWithContext } })

    expect(wrapper.text()).toContain('The Naturalness Injector')
    expect(wrapper.text()).toContain('Ik kom langs.')
    expect(wrapper.findAll('.particle-btn').length).toBe(8)
    expect(wrapper.text()).toContain('+ even')
    expect(wrapper.text()).toContain('+ eigenlijk')
  })

  it('injects a particle into the text and emits submit with the result', async () => {
    const wrapper = await mountSuspended(NuanceDrill, { props: { exercise: exerciseWithContext } })

    await wrapper.findAll('.particle-btn').find(b => b.text() === '+ even')!.trigger('click')

    expect((wrapper.find('.editor').element as HTMLTextAreaElement).value).toBe('Ik kom langs. even')

    await wrapper.findAll('button').find(b => b.text().includes('Submit Natural Version'))!.trigger('click')
    expect(wrapper.emitted('submit')![0]).toEqual(['Ik kom langs. even'])
  })

  it('emits submit with the text typed directly into the editor', async () => {
    const wrapper = await mountSuspended(NuanceDrill, { props: { exercise: exerciseWithContext } })

    await wrapper.find('textarea').setValue('Ik kom even langs.')
    await wrapper.findAll('button').find(b => b.text().includes('Submit Natural Version'))!.trigger('click')

    expect(wrapper.emitted('submit')![0]).toEqual(['Ik kom even langs.'])
  })

  it('disables submit until text is present and updates the naturalness preview', async () => {
    const wrapper = await mountSuspended(NuanceDrill, { props: { exercise: exerciseWithContext } })

    const submit = wrapper.findAll('button').find(b => b.text().includes('Submit Natural Version'))!
    expect((submit.element as HTMLButtonElement).disabled).toBe(true)
    expect(wrapper.find('.pragmatic-preview').text()).toContain('40% Natural')

    await wrapper.find('textarea').setValue('Ik kom even langs.')
    const submitAfter = wrapper.findAll('button').find(b => b.text().includes('Submit Natural Version'))!
    expect((submitAfter.element as HTMLButtonElement).disabled).toBe(false)
    expect(wrapper.find('.pragmatic-preview').text()).toContain('55% Natural')
  })
})
