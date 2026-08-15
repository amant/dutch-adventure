import { describe, it, expect, beforeEach } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import ReadingLadder from '~/components/ReadingLadder.vue';
import { readingLadderExercise, correctFeedback, resetLearnerMemory } from './helpers';
import { useLearnerMemory } from '~/composables/useLearnerMemory';

describe('ReadingLadder', () => {
  beforeEach(() => resetLearnerMemory());

  it('renders the text with interactable hint words', async () => {
    const wrapper = await mountSuspended(ReadingLadder, { props: { exercise: readingLadderExercise } });

    expect(wrapper.text()).toContain('Amsterdam is de hoofdstad van Nederland.');

    const interactable = wrapper.findAll('.word.interactable');
    expect(interactable.length).toBe(2);
    expect(interactable[0].text()).toBe('hoofdstad');
  });

  it('shows a hint popup when an interactable word is clicked', async () => {
    const wrapper = await mountSuspended(ReadingLadder, { props: { exercise: readingLadderExercise } });

    await wrapper.findAll('.word.interactable')[0].trigger('click');

    expect(wrapper.find('.hint-popup').exists()).toBe(true);
    expect(wrapper.text()).toContain('capital');
    expect(wrapper.text()).toContain('noun');
  });

  it('records exposure for the clicked word in learner memory', async () => {
    const { memory } = useLearnerMemory();
    const wrapper = await mountSuspended(ReadingLadder, { props: { exercise: readingLadderExercise } });

    await wrapper.findAll('.word.interactable')[0].trigger('click');

    expect(memory.value.vocabulary['hoofdstad'].encounters).toBe(1);
  });

  it('closes the hint popup', async () => {
    const wrapper = await mountSuspended(ReadingLadder, { props: { exercise: readingLadderExercise } });

    await wrapper.findAll('.word.interactable')[0].trigger('click');
    await wrapper.find('.close-btn').trigger('click');

    expect(wrapper.find('.hint-popup').exists()).toBe(false);
  });

  it('emits submit when finished reading and hides the button after feedback', async () => {
    const wrapper = await mountSuspended(ReadingLadder, { props: { exercise: readingLadderExercise } });

    await wrapper.findAll('button').find(b => b.text() === 'I\'ve finished reading')!.trigger('click');
    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual([]);

    const withFeedback = await mountSuspended(ReadingLadder, {
      props: { exercise: readingLadderExercise, feedback: correctFeedback },
    });
    expect(withFeedback.text()).not.toContain('I\'ve finished reading');
  });
});
