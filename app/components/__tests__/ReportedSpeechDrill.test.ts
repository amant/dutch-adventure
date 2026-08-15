import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import ReportedSpeechDrill from '~/components/ReportedSpeechDrill.vue';
import { reportedSpeechExercise, correctFeedback } from './helpers';
import type { Feedback } from '~/types/learning';

const detailedFeedback: Feedback = {
  outcome: 'retry',
  message: 'De persoonsvorm gaat naar het einde.',
  skills: ['production'],
  changeModifier: 1,
  teacherCorrection: {
    natural: 'Hij zei dat hij morgen komt.',
    explanation: 'Na "dat" staat de persoonsvorm achteraan.',
  },
  miniLesson: {
    title: 'Indirecte rede',
    content: 'Dat + bijzin met persoonsvorm achteraan.',
    example: {
      wrong: 'Hij zei dat hij komt morgen.',
      right: 'Hij zei dat hij morgen komt.',
    },
  },
};

describe('ReportedSpeechDrill', () => {
  it('renders the prompt and direct quote from the fixture', async () => {
    const wrapper = await mountSuspended(ReportedSpeechDrill, { props: { exercise: reportedSpeechExercise } });

    expect(wrapper.text()).toContain('Geef de zin in indirecte rede weer.');
    expect(wrapper.text()).toContain('Statement (dat-clause)');
    expect(wrapper.text()).toContain('hij:');
    expect(wrapper.text()).toContain('Ik kom morgen.');
    expect(wrapper.text()).toContain('Hij zei dat');
    expect(wrapper.text()).toContain('Na "dat" gaat de persoonsvorm naar het einde.');
  });

  it('emits submit with the typed reported sentence', async () => {
    const wrapper = await mountSuspended(ReportedSpeechDrill, { props: { exercise: reportedSpeechExercise } });

    await wrapper.find('textarea').setValue('Hij zei dat hij morgen komt.');
    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual(['Hij zei dat hij morgen komt.']);
  });

  it('shows feedback state and disables the textarea when feedback is provided', async () => {
    const wrapper = await mountSuspended(ReportedSpeechDrill, {
      props: { exercise: reportedSpeechExercise, feedback: correctFeedback },
    });

    expect(wrapper.find('.feedback-card').exists()).toBe(true);
    expect(wrapper.text()).toContain('That sounds perfectly natural!');
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined();
    expect(wrapper.text()).not.toContain('Check Reported Speech');
  });

  it('renders the correction area and emits next from detailed feedback', async () => {
    const wrapper = await mountSuspended(ReportedSpeechDrill, {
      props: { exercise: reportedSpeechExercise, feedback: detailedFeedback },
    });

    expect(wrapper.find('.correction-box').exists()).toBe(true);
    expect(wrapper.text()).toContain('Teacher\'s Reported Correction:');
    expect(wrapper.text()).toContain('Hij zei dat hij morgen komt.');
    expect(wrapper.find('.mini-lesson').exists()).toBe(true);
    expect(wrapper.text()).toContain('Indirecte rede');

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('next')).toHaveLength(1);
  });
});
