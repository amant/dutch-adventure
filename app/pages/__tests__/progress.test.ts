import { describe, it, expect, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ProgressPage from '~/pages/progress.vue'
import { mkState, resetLearnerMemory } from './helpers'
import { useLearnerMemory } from '~/composables/useLearnerMemory'

describe('progress page', () => {
  beforeEach(() => resetLearnerMemory())

  it('renders an A0 candidate with all nine skill rows when memory is empty', async () => {
    const wrapper = await mountSuspended(ProgressPage)

    expect(wrapper.text()).toContain('A0 candidate')
    expect(wrapper.findAll('.skill-row')).toHaveLength(9)
    expect(wrapper.text()).toContain('Start missions and drills to measure your retrieval speed.')
  })

  it('reflects seeded mastery in the reading stats', async () => {
    const { memory } = useLearnerMemory()
    memory.value.vocabulary['fiets'] = mkState({ recognition: 90, meaning: 80, production: 85, automaticity: 70 })
    memory.value.vocabulary['wonen'] = mkState({ recognition: 60, production: 40 })

    const wrapper = await mountSuspended(ProgressPage)

    const stats = wrapper.findAll('.reading-stats-card .stat-value')
    expect(stats[0].text()).toBe('2') // words encountered
    expect(stats[1].text()).toBe('1') // mastered
    expect(stats[2].text()).toBe('1') // recognized
    expect(stats[3].text()).toMatch(/\d+%/) // avg coverage
  })

  it('computes can-do achievements from skill thresholds', async () => {
    const { memory } = useLearnerMemory()
    memory.value.overall.recognition = 50
    memory.value.overall.production = 40
    memory.value.overall.listening = 60

    const wrapper = await mountSuspended(ProgressPage)

    expect(wrapper.find('.can-do-card').exists()).toBe(true)
    expect(wrapper.text()).toContain('Understand basic introductions and signs.')
    expect(wrapper.text()).toContain('Introduce yourself and state where you live.')
    expect(wrapper.text()).toContain('Follow slow, clear speech in everyday contexts.')
  })

  it('lists recent gains for concepts with strong success ratios', async () => {
    const { memory } = useLearnerMemory()
    memory.value.vocabulary['fiets'] = mkState({ encounters: 5, successes: 5, production: 60, automaticity: 50, lastEncountered: new Date().toISOString() })

    const wrapper = await mountSuspended(ProgressPage)

    expect(wrapper.find('.recent-progress').exists()).toBe(true)
    expect(wrapper.text()).toContain('fiets')
  })

  it('resets all progress when the reset button is clicked', async () => {
    const { memory } = useLearnerMemory()
    memory.value.vocabulary['fiets'] = mkState()

    const wrapper = await mountSuspended(ProgressPage)
    await wrapper.findAll('button').find(b => b.text().includes('Reset all progress'))!.trigger('click')

    expect(Object.keys(memory.value.vocabulary)).toHaveLength(0)
  })
})
