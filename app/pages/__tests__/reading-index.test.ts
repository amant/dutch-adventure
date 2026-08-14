import { describe, it, expect, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ReadingIndexPage from '~/pages/reading/index.vue'
import { articles } from '~/data/articles'
import { mkState, resetLearnerMemory } from './helpers'
import { useLearnerMemory } from '~/composables/useLearnerMemory'

describe('reading index page', () => {
  beforeEach(() => resetLearnerMemory())

  it('renders a card for every article with its title and source', async () => {
    const wrapper = await mountSuspended(ReadingIndexPage)

    expect(wrapper.findAll('.article-card')).toHaveLength(articles.length)
    expect(wrapper.text()).toContain(articles[0].title)
    expect(wrapper.text()).toContain(articles[0].source)
  })

  it('links each article card to its reading route', async () => {
    const wrapper = await mountSuspended(ReadingIndexPage)

    const hrefs = wrapper.findAll('a.article-card').map(a => a.attributes('href'))
    expect(hrefs[0]).toContain(`/reading/${articles[0].id}`)
  })

  it('shows a match percentage for each article', async () => {
    const wrapper = await mountSuspended(ReadingIndexPage)

    const values = wrapper.findAll('.match .value')
    expect(values.length).toBe(articles.length)
    expect(values[0].text()).toMatch(/\d+%/)
  })

  it('shows activation opportunities when memory contains frontier words', async () => {
    const { memory } = useLearnerMemory()
    // 'schijnt' appears in the first (a1-weer) article; the page's frontier
    // check uses a 0-1 scale: recognition > 0.5 and production < 0.3
    memory.value.vocabulary['schijnt'] = mkState({ recognition: 60, production: 0 })

    const wrapper = await mountSuspended(ReadingIndexPage)

    expect(wrapper.findAll('.frontier-count').length).toBeGreaterThan(0)
    expect(wrapper.text()).toContain('activation opportunities')
  })
})
