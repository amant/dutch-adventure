import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import ConditionalDrill from '~/components/ConditionalDrill.vue';
import { conditionalExercise } from './helpers';
import type { Feedback } from '~/types/learning';

const detailedFeedback: Feedback = {
  outcome: 'retry',
  message: 'Mits vereist een volledige bijzin.',
  skills: ['production'],
  changeModifier: 2,
  teacherCorrection: {
    natural: 'Je mag meegaan, mits je op tijd bent.',
    explanation: 'Mits introduceert een voorwaardelijke bijzin.',
  },
  miniLesson: {
    title: 'Restrictive condition',
    content: 'mits means on the condition that.',
    example: {
      wrong: 'Je mag meegaan mits je bent op tijd',
      right: 'Je mag meegaan, mits je op tijd bent.',
    },
  },
};

describe('ConditionalDrill', () => {
  it('renders the prompt and conditional context from the fixture', async () => {
    const wrapper = await mountSuspended(ConditionalDrill, { props: { exercise: conditionalExercise } });

    expect(wrapper.text()).toContain('Maak een zin met "mits".');
    expect(wrapper.text()).toContain('Mits (Strikte Voorwaarde)');
    expect(wrapper.text()).toContain('je mag meegaan');
    expect(wrapper.text()).toContain('je op tijd bent');
    expect(wrapper.text()).toContain('Gebruik "mits" = op voorwaarde dat.');
  });

  it('emits submit with the typed answer when the Check button is clicked', async () => {
    const wrapper = await mountSuspended(ConditionalDrill, { props: { exercise: conditionalExercise } });

    await wrapper.find('textarea').setValue('Je mag meegaan, mits je op tijd bent.');
    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual(['Je mag meegaan, mits je op tijd bent.']);
  });

  it('renders the correction area and disables interaction when feedback is provided', async () => {
    const wrapper = await mountSuspended(ConditionalDrill, {
      props: { exercise: conditionalExercise, feedback: detailedFeedback },
    });

    expect(wrapper.find('.feedback-card').exists()).toBe(true);
    expect(wrapper.text()).toContain('Mits vereist een volledige bijzin.');
    expect(wrapper.text()).toContain('Teacher\'s Natural Correction:');
    expect(wrapper.text()).toContain('Je mag meegaan, mits je op tijd bent.');
    expect(wrapper.text()).toContain('Restrictive condition');
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined();
    expect(wrapper.text()).toContain('Continue Practice');
    expect(wrapper.emitted('submit')).toBeUndefined();
  });

  it('emits next when Continue Practice is clicked', async () => {
    const wrapper = await mountSuspended(ConditionalDrill, {
      props: { exercise: conditionalExercise, feedback: detailedFeedback },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('next')).toHaveLength(1);
  });
});
