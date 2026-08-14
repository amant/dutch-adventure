import { describe, it, expect, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import IdiomsPage from '~/pages/idioms.vue'
import { idioms } from '~/data/idioms'
import { mkState, resetLearnerMemory } from './helpers'
import { useLearnerMemory } from '~/composables/useLearnerMemory'

describe('idioms page', () => {
  beforeEach(() => resetLearnerMemory())

  it('renders every idiom with phrase, literal, meaning and example', async () => {
    const wrapper = await mountSuspended(IdiomsPage)

    expect(wrapper.findAll('.idiom-card')).toHaveLength(idioms.length)
    expect(wrapper.text()).toContain(idioms[0].phrase)
    expect(wrapper.text()).toContain(`Literal: "${idioms[0].literal}"`)
    expect(wrapper.text()).toContain('Nu komt de aap uit de mouw')
    expect(wrapper.findAll('.new-badge').length).toBe(idioms.length) // all "Discovered" without memory
  })

  it('shows encounter badges and dimension bars once an idiom is tracked', async () => {
    const { memory } = useLearnerMemory()
    const phrase = idioms[0].phrase
    memory.value.idioms[phrase] = mkState({ idiomatic: 50, successes: 3, encounters: 5 })

    const wrapper = await mountSuspended(IdiomsPage)

    expect(wrapper.text()).toContain('3/5 hits')
    expect(wrapper.find(`.idiom-card`).text()).not.toContain('Discovered')
    expect(wrapper.findAll('.dimension-row')).toHaveLength(4) // 4 idiom dimensions
  })

  it('marks a mastered idiom card when idiomatic mastery exceeds 80', async () => {
    const { memory } = useLearnerMemory()
    memory.value.idioms[idioms[0].phrase] = mkState({ idiomatic: 90 })

    const wrapper = await mountSuspended(IdiomsPage)

    expect(wrapper.find('.idiom-card.mastered').exists()).toBe(true)
  })
})
