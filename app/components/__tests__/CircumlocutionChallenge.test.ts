import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import CircumlocutionChallenge from '~/components/CircumlocutionChallenge.vue'
import { circumlocutionExercise } from './helpers'

describe('CircumlocutionChallenge', () => {
  it('renders the target concept and forbidden words from the fixture', async () => {
    const wrapper = await mountSuspended(CircumlocutionChallenge, { props: { exercise: circumlocutionExercise } })

    expect(wrapper.text()).toContain('Circumlocution Challenge')
    expect(wrapper.text()).toContain('Target Concept')
    expect(wrapper.text()).toContain(circumlocutionExercise.circumlocutionData!.concept)
    expect(wrapper.text()).toContain('Forbidden Words')
    expect(wrapper.text()).toContain(circumlocutionExercise.forbiddenWords![0]!)
  })

  it('renders a textarea and keeps the submit button disabled until text is typed', async () => {
    const wrapper = await mountSuspended(CircumlocutionChallenge, { props: { exercise: circumlocutionExercise } })

    expect(wrapper.find('textarea').exists()).toBe(true)
    const submit = wrapper.findAll('button').find(b => b.text().includes('Submit Description'))!
    expect(submit.attributes('disabled')).toBeDefined()

    await wrapper.find('textarea').setValue('een voertuig met twee wielen')
    expect(submit.attributes('disabled')).toBeUndefined()
  })

  it('emits submit with the typed description', async () => {
    const wrapper = await mountSuspended(CircumlocutionChallenge, { props: { exercise: circumlocutionExercise } })

    await wrapper.find('textarea').setValue('een voertuig met twee wielen')
    await wrapper.findAll('button').find(b => b.text().includes('Submit Description'))!.trigger('click')

    expect(wrapper.emitted('submit')).toHaveLength(1)
    expect(wrapper.emitted('submit')![0]).toEqual(['een voertuig met twee wielen'])
  })
})
