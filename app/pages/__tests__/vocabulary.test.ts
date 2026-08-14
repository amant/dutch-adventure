import { describe, it, expect, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import VocabularyPage from '~/pages/vocabulary.vue'
import { mkState, resetLearnerMemory } from './helpers'
import { useLearnerMemory } from '~/composables/useLearnerMemory'

describe('vocabulary page', () => {
  beforeEach(() => resetLearnerMemory())

  it('shows the empty state when no words are logged', async () => {
    const wrapper = await mountSuspended(VocabularyPage)

    expect(wrapper.find('.empty-state').exists()).toBe(true)
    expect(wrapper.text()).toContain("You haven't encountered any words yet.")
  })

  it('renders word cards with hit badges', async () => {
    const { memory } = useLearnerMemory()
    memory.value.vocabulary['fiets'] = mkState({ encounters: 4, successes: 2 })
    memory.value.vocabulary['wonen'] = mkState({ encounters: 1, successes: 1 })

    const wrapper = await mountSuspended(VocabularyPage)

    expect(wrapper.findAll('.word-card')).toHaveLength(2)
    expect(wrapper.text()).toContain('2/4 hits')
    expect(wrapper.text()).toContain('1/1 hits')
  })

  it('opens a detail panel when a word is selected', async () => {
    const { memory } = useLearnerMemory()
    memory.value.vocabulary['fiets'] = mkState()

    const wrapper = await mountSuspended(VocabularyPage)
    await wrapper.findAll('.word-card')[0].trigger('click')

    expect(wrapper.find('.detail-panel').exists()).toBe(true)
    expect(wrapper.text()).toContain('Automaticity')
    expect(wrapper.find('.close-btn').exists()).toBe(true)
  })

  it('filters words through the corpus search', async () => {
    const { memory } = useLearnerMemory()
    memory.value.vocabulary['fiets'] = mkState()
    memory.value.vocabulary['wonen'] = mkState()

    const wrapper = await mountSuspended(VocabularyPage)
    await wrapper.find('.corpus-input').setValue('wonen')

    expect(wrapper.findAll('.word-card')).toHaveLength(1)
    expect(wrapper.find('.word-card h3').text()).toBe('wonen')
    expect(wrapper.text()).toContain('Found 1 words and 0 snippets')
  })
})
