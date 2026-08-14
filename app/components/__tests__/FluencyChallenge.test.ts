import { describe, it, expect, afterEach, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { nextTick } from 'vue'
import FluencyChallenge from '~/components/FluencyChallenge.vue'
import { fluencyExercise, correctFeedback } from './helpers'
import type { Feedback } from '~/types/learning'

const correctionFeedback: Feedback = {
  outcome: 'acceptable',
  message: 'Bijna! Voeg een partikel toe.',
  skills: ['production'],
  teacherCorrection: {
    natural: 'Ik woon hier al tien jaar.',
    explanation: 'Natuurlijker met "hier".',
  },
}

describe('FluencyChallenge', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows the start screen with the prompt and countdown duration', async () => {
    const wrapper = await mountSuspended(FluencyChallenge, { props: { exercise: fluencyExercise } })

    expect(wrapper.find('.start-screen').exists()).toBe(true)
    expect(wrapper.text()).toContain('You have 10 seconds!')
    expect(wrapper.text()).toContain('Herhaal snel na:')
    expect(wrapper.findAll('button').some(b => b.text() === 'Start Countdown')).toBe(true)
  })

  it('starts the countdown and renders the live timer', async () => {
    vi.useFakeTimers()
    const wrapper = await mountSuspended(FluencyChallenge, { props: { exercise: fluencyExercise } })

    await wrapper.findAll('button').find(b => b.text() === 'Start Countdown')!.trigger('click')

    expect(wrapper.find('.start-screen').exists()).toBe(false)
    expect(wrapper.text()).toContain('10s remaining')
  })

  it('emits submit with the typed response', async () => {
    const wrapper = await mountSuspended(FluencyChallenge, { props: { exercise: fluencyExercise } })

    await wrapper.findAll('button').find(b => b.text() === 'Start Countdown')!.trigger('click')
    await wrapper.find('input').setValue('Ik woon al tien jaar in Amsterdam.')

    await wrapper.findAll('button').find(b => b.text() === 'Submit')!.trigger('click')

    expect(wrapper.emitted('submit')).toHaveLength(1)
    expect(wrapper.emitted('submit')![0]).toEqual(['Ik woon al tien jaar in Amsterdam.'])
  })

  it('shows the time-up screen and emits retry when the countdown elapses', async () => {
    vi.useFakeTimers()
    const wrapper = await mountSuspended(FluencyChallenge, { props: { exercise: fluencyExercise } })

    await wrapper.findAll('button').find(b => b.text() === 'Start Countdown')!.trigger('click')
    vi.advanceTimersByTime(10_000)
    await nextTick()

    expect(wrapper.text()).toContain("Time's Up!")
    expect(wrapper.findAll('button').some(b => b.text() === 'Try Again')).toBe(true)

    await wrapper.findAll('button').find(b => b.text() === 'Try Again')!.trigger('click')
    expect(wrapper.emitted('retry')).toHaveLength(1)
  })

  it('renders feedback with outcome and continue', async () => {
    const wrapper = await mountSuspended(FluencyChallenge, {
      props: { exercise: fluencyExercise, feedback: correctFeedback },
    })

    expect(wrapper.find('.feedback-card').exists()).toBe(true)
    expect(wrapper.text()).toContain('correct')
    expect(wrapper.text()).toContain('That sounds perfectly natural!')

    await wrapper.findAll('button').find(b => b.text() === 'Continue')!.trigger('click')
    expect(wrapper.emitted('next')).toHaveLength(1)
  })

  it('renders the teacher correction natural flow tip', async () => {
    const wrapper = await mountSuspended(FluencyChallenge, {
      props: { exercise: fluencyExercise, feedback: correctionFeedback },
    })

    expect(wrapper.find('.teacher-tip').exists()).toBe(true)
    expect(wrapper.text()).toContain('Ik woon hier al tien jaar.')
    expect(wrapper.text()).toContain('Natuurlijker met "hier".')
  })
})
