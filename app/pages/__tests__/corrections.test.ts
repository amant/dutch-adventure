import { describe, it, expect, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import CorrectionsPage from '~/pages/corrections.vue'
import { resetLearnerMemory } from './helpers'
import { useLearnerMemory } from '~/composables/useLearnerMemory'

const redline = {
  id: 'r1',
  exerciseId: 'ex1',
  prompt: 'Zeg dat je morgen niet kunt komen.',
  userAnswer: 'Ik kan niet komen morgen.',
  naturalCorrection: 'Ik kan morgen helaas niet komen.',
  explanation: '"Helaas" klinkt natuurlijker.',
  date: new Date().toISOString(),
  vocabulary: ['helaas'],
  grammar: [],
}

describe('corrections page', () => {
  beforeEach(() => resetLearnerMemory())

  it('shows the empty state when there are no redlines', async () => {
    const wrapper = await mountSuspended(CorrectionsPage)

    expect(wrapper.text()).toContain('No Redlines Logged Yet!')
    expect(wrapper.find('.redlines-list').exists()).toBe(false)
  })

  it('lists recent redlines with the correction diff and tags', async () => {
    const { memory } = useLearnerMemory()
    memory.value.recentRedlines = [redline]

    const wrapper = await mountSuspended(CorrectionsPage)

    expect(wrapper.findAll('.redline-item')).toHaveLength(1)
    expect(wrapper.text()).toContain('Zeg dat je morgen niet kunt komen.')
    expect(wrapper.text()).toContain('Ik kan niet komen morgen.')
    expect(wrapper.text()).toContain('Ik kan morgen helaas niet komen.')
    expect(wrapper.text()).toContain('helaas')
  })

  it('opens the retry modal showing the previous attempt', async () => {
    const { memory } = useLearnerMemory()
    memory.value.recentRedlines = [redline]

    const wrapper = await mountSuspended(CorrectionsPage)
    await wrapper.findAll('button').find(b => b.text().includes('Try Re-producing'))!.trigger('click')

    expect(wrapper.find('.retry-overlay').exists()).toBe(true)
    expect(wrapper.text()).toContain('Ik kan niet komen morgen.')
  })

  it('evaluates the retry response and records progress', async () => {
    const { memory } = useLearnerMemory()
    memory.value.recentRedlines = [redline]

    const wrapper = await mountSuspended(CorrectionsPage)
    await wrapper.findAll('button').find(b => b.text().includes('Try Re-producing'))!.trigger('click')
    await wrapper.find('textarea').setValue('Ik kan morgen helaas niet komen.')
    await wrapper.findAll('button').find(b => b.text().includes('Check Naturalness'))!.trigger('click')

    expect(wrapper.find('.feedback-box').exists()).toBe(true)
    expect(wrapper.text()).toContain('That sounds perfectly natural!')
    // record() should have created a concept for the vocabulary tag
    expect(memory.value.vocabulary['helaas']).toBeDefined()
  })

  it('closes the retry modal', async () => {
    const { memory } = useLearnerMemory()
    memory.value.recentRedlines = [redline]

    const wrapper = await mountSuspended(CorrectionsPage)
    await wrapper.findAll('button').find(b => b.text().includes('Try Re-producing'))!.trigger('click')
    await wrapper.find('.close-btn').trigger('click')

    expect(wrapper.find('.retry-overlay').exists()).toBe(false)
  })
})
