import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import ParticipialDrill from '~/components/ParticipialDrill.vue';
import { participialExercise } from './helpers';
import type { Feedback } from '~/types/learning';

const detailedFeedback: Feedback = {
  outcome: 'retry',
  message: 'Vervang de bijzin door een beknopte deelwoordconstructie.',
  skills: ['production'],
  changeModifier: 2,
  teacherCorrection: {
    natural: 'Fietsend belde hij zijn moeder.',
    explanation: 'Het tegenwoordig deelwoord vervangt de tijdsbijzin.',
  },
  miniLesson: {
    title: 'Participial construction',
    content: 'Use a present participle for simultaneity.',
    example: {
      wrong: 'Terwijl hij fietste, belde hij',
      right: 'Fietsend belde hij zijn moeder.',
    },
  },
};

describe('ParticipialDrill', () => {
  it('renders the prompt and participial context from the fixture', async () => {
    const wrapper = await mountSuspended(ParticipialDrill, { props: { exercise: participialExercise } });

    expect(wrapper.text()).toContain('Vorm een deelwoordconstructie.');
    expect(wrapper.text()).toContain('Gelijktijdigheid met "Al"');
    expect(wrapper.text()).toContain('Terwijl hij fietste, belde hij zijn moeder.');
    expect(wrapper.text()).toContain('[Tegenwoordig deelwoord] + [hoofdzin]');
    expect(wrapper.text()).toContain('Gebruik "fietsend" als bijwoordelijke bepaling.');
  });

  it('emits submit with the typed answer when the Check button is clicked', async () => {
    const wrapper = await mountSuspended(ParticipialDrill, { props: { exercise: participialExercise } });

    await wrapper.find('textarea').setValue('Fietsend belde hij zijn moeder.');
    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual(['Fietsend belde hij zijn moeder.']);
  });

  it('renders the correction area and disables interaction when feedback is provided', async () => {
    const wrapper = await mountSuspended(ParticipialDrill, {
      props: { exercise: participialExercise, feedback: detailedFeedback },
    });

    expect(wrapper.find('.feedback-card').exists()).toBe(true);
    expect(wrapper.text()).toContain('Vervang de bijzin door een beknopte deelwoordconstructie.');
    expect(wrapper.text()).toContain('Teacher\'s Natural Correction:');
    expect(wrapper.text()).toContain('Fietsend belde hij zijn moeder.');
    expect(wrapper.text()).toContain('Participial construction');
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined();
    expect(wrapper.text()).toContain('Continue Practice');
    expect(wrapper.emitted('submit')).toBeUndefined();
  });

  it('emits next when Continue Practice is clicked', async () => {
    const wrapper = await mountSuspended(ParticipialDrill, {
      props: { exercise: participialExercise, feedback: detailedFeedback },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('next')).toHaveLength(1);
  });
});
