import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import PassiveDrill from '~/components/PassiveDrill.vue';
import { passiveExercise, correctFeedback } from './helpers';
import type { Feedback } from '~/types/learning';

const detailedFeedback: Feedback = {
  outcome: 'retry',
  message: 'Worden + voltooid deelwoord.',
  skills: ['production'],
  changeModifier: 1,
  teacherCorrection: {
    natural: 'Het eten wordt door de kok bereid.',
    explanation: 'Ergermiddel met worden.',
  },
  miniLesson: {
    title: 'Process passive',
    content: 'Worden + voltooid deelwoord.',
    example: {
      wrong: 'De kok wordt het eten bereid.',
      right: 'Het eten wordt door de kok bereid.',
    },
  },
};

describe('PassiveDrill', () => {
  it('renders the prompt and active sentence from the fixture', async () => {
    const wrapper = await mountSuspended(PassiveDrill, { props: { exercise: passiveExercise } });

    expect(wrapper.text()).toContain('Maak de zin passief.');
    expect(wrapper.text()).toContain('Process (worden)');
    expect(wrapper.text()).toContain('De kok bereidt het eten.');
    expect(wrapper.text()).toContain('Include agent:');
    expect(wrapper.text()).toContain('de kok');
  });

  it('emits submit with the typed passive sentence', async () => {
    const wrapper = await mountSuspended(PassiveDrill, { props: { exercise: passiveExercise } });

    await wrapper.find('textarea').setValue('Het eten wordt door de kok bereid.');
    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual(['Het eten wordt door de kok bereid.']);
  });

  it('shows feedback state and disables the textarea when feedback is provided', async () => {
    const wrapper = await mountSuspended(PassiveDrill, {
      props: { exercise: passiveExercise, feedback: correctFeedback },
    });

    expect(wrapper.find('.feedback-card').exists()).toBe(true);
    expect(wrapper.text()).toContain('That sounds perfectly natural!');
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined();
    expect(wrapper.text()).not.toContain('Check Transformation');
  });

  it('renders the correction area and emits next from detailed feedback', async () => {
    const wrapper = await mountSuspended(PassiveDrill, {
      props: { exercise: passiveExercise, feedback: detailedFeedback },
    });

    expect(wrapper.find('.correction-box').exists()).toBe(true);
    expect(wrapper.text()).toContain('Teacher\'s Natural Correction:');
    expect(wrapper.text()).toContain('Het eten wordt door de kok bereid.');
    expect(wrapper.find('.mini-lesson').exists()).toBe(true);
    expect(wrapper.text()).toContain('Process passive');

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('next')).toHaveLength(1);
  });
});
