import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import InfinitiveDrill from '~/components/InfinitiveDrill.vue';
import { infinitiveExercise } from './helpers';
import type { Feedback } from '~/types/learning';

const detailedFeedback: Feedback = {
  outcome: 'retry',
  message: 'Om ... te omsluit de doelaanvulling.',
  skills: ['production'],
  changeModifier: 2,
  teacherCorrection: {
    natural: 'Hij is te laat om de trein te halen.',
    explanation: 'Een doelzin met om ... te staat achter de hoofdzin.',
  },
  miniLesson: {
    title: 'om ... te construction',
    content: 'Purpose uses om + te + infinitive.',
    example: {
      wrong: 'Hij is te laat de trein halen',
      right: 'Hij is te laat om de trein te halen.',
    },
  },
};

describe('InfinitiveDrill', () => {
  it('renders the prompt and infinitive context from the fixture', async () => {
    const wrapper = await mountSuspended(InfinitiveDrill, { props: { exercise: infinitiveExercise } });

    expect(wrapper.text()).toContain('Vorm een zin met "om ... te".');
    expect(wrapper.text()).toContain('Doeluitdrukking (om... te)');
    expect(wrapper.text()).toContain('Hij is te laat');
    expect(wrapper.text()).toContain('de trein halen');
    expect(wrapper.text()).toContain('Gebruik "om te" + infinitief.');
  });

  it('emits submit with the typed answer when the Check button is clicked', async () => {
    const wrapper = await mountSuspended(InfinitiveDrill, { props: { exercise: infinitiveExercise } });

    await wrapper.find('textarea').setValue('Hij is te laat om de trein te halen.');
    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual(['Hij is te laat om de trein te halen.']);
  });

  it('renders the correction area and disables interaction when feedback is provided', async () => {
    const wrapper = await mountSuspended(InfinitiveDrill, {
      props: { exercise: infinitiveExercise, feedback: detailedFeedback },
    });

    expect(wrapper.find('.feedback-card').exists()).toBe(true);
    expect(wrapper.text()).toContain('Om ... te omsluit de doelaanvulling.');
    expect(wrapper.text()).toContain('Teacher\'s Natural Correction:');
    expect(wrapper.text()).toContain('Hij is te laat om de trein te halen.');
    expect(wrapper.text()).toContain('om ... te construction');
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined();
    expect(wrapper.text()).toContain('Continue Practice');
    expect(wrapper.emitted('submit')).toBeUndefined();
  });

  it('emits next when Continue Practice is clicked', async () => {
    const wrapper = await mountSuspended(InfinitiveDrill, {
      props: { exercise: infinitiveExercise, feedback: detailedFeedback },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('next')).toHaveLength(1);
  });
});
