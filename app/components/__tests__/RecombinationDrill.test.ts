import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import RecombinationDrill from '~/components/RecombinationDrill.vue';
import { recombinationExercise, correctFeedback } from './helpers';
import type { Feedback } from '~/types/learning';

const answer = 'Ik ging gisteren naar huis omdat het regende.';

const correctionFeedback: Feedback = {
  ...correctFeedback,
  teacherCorrection: {
    natural: 'Omdat het gisteren regende, bleef ik thuis.',
    explanation: 'Omdat leidt een bijzin in.',
  },
};

describe('RecombinationDrill', () => {
  it('renders the required words and the prompt', async () => {
    const wrapper = await mountSuspended(RecombinationDrill, {
      props: { exercise: recombinationExercise, modelValue: '' },
    });

    expect(wrapper.text()).toContain('Combineer de concepten in één zin.');
    expect(wrapper.findAll('.target-tag').length).toBe(2);
    expect(wrapper.text()).toContain('omdat');
    expect(wrapper.text()).toContain('gisteren');
  });

  it('binds the response via the model and emits submit on Check Recombination', async () => {
    const wrapper = await mountSuspended(RecombinationDrill, {
      props: { exercise: recombinationExercise, modelValue: '' },
    });

    await wrapper.find('textarea').setValue(answer);
    expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual([answer]);

    await wrapper.setProps({ modelValue: answer });
    await wrapper.find('.controls button').trigger('click');

    expect(wrapper.emitted('submit')).toHaveLength(1);
  });

  it('keeps Check Recombination disabled until a response exists', async () => {
    const wrapper = await mountSuspended(RecombinationDrill, {
      props: { exercise: recombinationExercise, modelValue: '' },
    });

    expect((wrapper.find('.controls button').element as HTMLButtonElement).disabled).toBe(true);
  });

  it('marks required words as used when the response contains them', async () => {
    const wrapper = await mountSuspended(RecombinationDrill, {
      props: { exercise: recombinationExercise, modelValue: answer },
    });

    const tags = wrapper.findAll('.target-tag');
    expect(tags[0].classes()).toContain('used');
    expect(tags[0].text()).toContain('✓');
    expect(tags[1].classes()).toContain('used');
  });

  it('disables input and renders the correction when feedback is provided', async () => {
    const wrapper = await mountSuspended(RecombinationDrill, {
      props: { exercise: recombinationExercise, feedback: correctionFeedback },
    });

    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined();
    expect(wrapper.find('.controls').exists()).toBe(false);
    expect(wrapper.text()).toContain('That sounds perfectly natural!');
    expect(wrapper.text()).toContain('Omdat het gisteren regende, bleef ik thuis.');
  });
});
