import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import InferenceChallenge from '~/components/InferenceChallenge.vue';
import { inferenceExercise, correctFeedback } from './helpers';
import type { Exercise } from '~/types/learning';

// The component parses pipe-separated options from `exercise.context`
// (not from `inferenceData.options`), so extend the fixture locally.
const inferenceWithContext: Exercise = {
  ...inferenceExercise,
  context: 'Het is ochtend.:true|Het is avond.:false',
  explanation: 'De wekker gaat s ochtends af.',
};

describe('InferenceChallenge', () => {
  it('renders the prompt and option buttons parsed from context', async () => {
    const wrapper = await mountSuspended(InferenceChallenge, { props: { exercise: inferenceWithContext } });

    expect(wrapper.text()).toContain('Wat kun je afleiden?');

    const buttons = wrapper.findAll('.option-button');
    expect(buttons.length).toBe(2);
    expect(buttons[0]!.text()).toBe('Het is ochtend.');
    expect(buttons[1]!.text()).toBe('Het is avond.');
  });

  it('emits submit with the selected option text', async () => {
    const wrapper = await mountSuspended(InferenceChallenge, { props: { exercise: inferenceWithContext } });

    await wrapper.findAll('.option-button')[1]!.trigger('click');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual(['Het is avond.']);
  });

  it('disables options and shows feedback with the explanation when feedback is provided', async () => {
    const wrapper = await mountSuspended(InferenceChallenge, {
      props: { exercise: inferenceWithContext, feedback: correctFeedback },
    });

    expect(wrapper.findAll('.option-button').every(b => b.attributes('disabled') !== undefined)).toBe(true);
    expect(wrapper.find('.feedback-card').exists()).toBe(true);
    expect(wrapper.text()).toContain('That sounds perfectly natural!');
    expect(wrapper.text()).toContain('De wekker gaat s ochtends af.');

    // Selecting an option while feedback is present must not emit a new submit.
    await wrapper.findAll('.option-button')[0]!.trigger('click');
    expect(wrapper.emitted('submit')).toBeUndefined();

    await wrapper.findAll('button').find(b => b.text() === 'Continue')!.trigger('click');
    expect(wrapper.emitted('next')).toHaveLength(1);
  });
});
