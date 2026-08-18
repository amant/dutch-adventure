import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { nextTick } from 'vue';
import SpeedDrill from '~/components/SpeedDrill.vue';
import { speedExercise, correctFeedback } from './helpers';

describe('SpeedDrill', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the prompt and the initial full timer bar', async () => {
    // speedExercise configures 4 seconds, but speed drills enforce a 60s minimum.
    const wrapper = await mountSuspended(SpeedDrill, { props: { exercise: speedExercise } });

    expect(wrapper.text()).toContain('Type de Nederlandse vertaling zo snel mogelijk.');
    expect(wrapper.text()).toContain('Quick Recall! (60.0s)');
    expect(wrapper.find('.timer-bar').attributes('style')).toContain('width: 100%');
  });

  it('emits submit with the typed response', async () => {
    const wrapper = await mountSuspended(SpeedDrill, { props: { exercise: speedExercise } });

    await wrapper.find('input').setValue('Ik woon in Amsterdam.');
    await wrapper.find('form').trigger('submit');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual([]);
  });

  it('shows the time-up screen with a retry button when time runs out', async () => {
    const wrapper = await mountSuspended(SpeedDrill, { props: { exercise: speedExercise } });

    vi.advanceTimersByTime(61_000);
    await nextTick();

    expect(wrapper.text()).toContain('Time\'s Up!');
    expect(wrapper.find('.time-up-message').exists()).toBe(true);
    expect(wrapper.find('form').exists()).toBe(false);
    expect(wrapper.emitted('submit')).toBeUndefined();

    const retryButton = wrapper.findAll('button').find(b => b.text() === 'Try Again');
    expect(retryButton).toBeDefined();
  });

  it('resets the timer and re-enables the form on retry', async () => {
    const wrapper = await mountSuspended(SpeedDrill, { props: { exercise: speedExercise } });

    vi.advanceTimersByTime(61_000);
    await nextTick();

    const retryButton = wrapper.findAll('button').find(b => b.text() === 'Try Again')!;
    await retryButton.trigger('click');
    await nextTick();

    expect(wrapper.emitted('retry')).toHaveLength(1);
    expect(wrapper.find('.time-up-message').exists()).toBe(false);
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.text()).toContain('Quick Recall! (60.0s)');
  });

  it('hides the input form when feedback is provided', async () => {
    const wrapper = await mountSuspended(SpeedDrill, {
      props: { exercise: speedExercise, feedback: correctFeedback },
    });

    expect(wrapper.find('form').exists()).toBe(false);
    expect(wrapper.find('input').exists()).toBe(false);
  });
});
