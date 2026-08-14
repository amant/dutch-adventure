import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ReaderPage from '~/pages/reader.vue'

describe('reader page', () => {
  it('shows the input view with a disabled analyze button initially', async () => {
    const wrapper = await mountSuspended(ReaderPage)

    expect(wrapper.find('.input-view').exists()).toBe(true)
    expect(wrapper.findAll('button').find(b => b.text().includes('Analyze & Decode'))!.attributes('disabled')).toBeDefined()
  })

  it('analyzes pasted text and switches to the analysis view', async () => {
    const wrapper = await mountSuspended(ReaderPage)

    await wrapper.find('textarea').setValue('Ik woon in Amsterdam.')
    await wrapper.findAll('button').find(b => b.text().includes('Analyze & Decode'))!.trigger('click')

    expect(wrapper.find('.analysis-view').exists()).toBe(true)
    expect(wrapper.text()).toContain('Ik woon in Amsterdam.')
    expect(wrapper.find('.input-view').exists()).toBe(false)
  })

  it('returns to the input view on reset', async () => {
    const wrapper = await mountSuspended(ReaderPage)

    await wrapper.find('textarea').setValue('Ik woon in Amsterdam.')
    await wrapper.findAll('button').find(b => b.text().includes('Analyze & Decode'))!.trigger('click')
    await wrapper.findAll('button').find(b => b.text().includes('Enter New Text'))!.trigger('click')

    expect(wrapper.find('.input-view').exists()).toBe(true)
  })
})
