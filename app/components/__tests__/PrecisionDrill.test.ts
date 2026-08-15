import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import PrecisionDrill from '~/components/PrecisionDrill.vue';
import { precisionExercise } from './helpers';
import type { Exercise, Feedback } from '~/types/learning';

// The component renders a word path parsed from `exercise.context`
// (lazy word -> precise word) next to a free-text input.
const precisionWithContext: Exercise = {
  ...precisionExercise,
  context: 'zeggen -> beweren',
};

const miniLessonFeedback: Feedback = {
  outcome: 'retry',
  message: 'Probeer het preciezere woord.',
  skills: ['production'],
  miniLesson: {
    title: 'Precisie',
    content: 'Kies het preciezere woord.',
    example: { wrong: 'zeggen', right: 'beweren' },
  },
};

describe('PrecisionDrill', () => {
  it('renders the word path and the prompt from the fixture', async () => {
    const wrapper = await mountSuspended(PrecisionDrill, { props: { exercise: precisionWithContext } });

    expect(wrapper.text()).toContain('zeggen');
    expect(wrapper.text()).toContain('beweren');
    expect(wrapper.text()).toContain('Kies het precieze woord.');
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('binds the defineModel response and emits submit with it', async () => {
    const wrapper = await mountSuspended(PrecisionDrill, {
      props: { exercise: precisionWithContext, modelValue: 'mijn antwoord' },
    });

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('mijn antwoord');

    await wrapper.find('input').setValue('Ik beweer dat dit klopt.');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Ik beweer dat dit klopt.']);

    await wrapper.findAll('button').find(b => b.text() === 'Submit')!.trigger('click');
    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual(['Ik beweer dat dit klopt.']);
  });

  it('shows the feedback card with the mini lesson and emits next on Continue', async () => {
    const wrapper = await mountSuspended(PrecisionDrill, {
      props: { exercise: precisionWithContext, feedback: miniLessonFeedback },
    });

    expect(wrapper.find('.feedback-card').exists()).toBe(true);
    expect(wrapper.text()).toContain('Probeer het preciezere woord.');
    expect(wrapper.find('.mini-lesson').exists()).toBe(true);
    expect(wrapper.text()).toContain('Precisie');

    await wrapper.findAll('button').find(b => b.text() === 'Continue')!.trigger('click');
    expect(wrapper.emitted('next')).toHaveLength(1);
  });
});
