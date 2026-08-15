import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import ConcessionDrill from '~/components/ConcessionDrill.vue';
import { concessionExercise } from './helpers';
import type { Feedback } from '~/types/learning';

const detailedFeedback: Feedback = {
  outcome: 'retry',
  message: 'Let op de inversie na de bijzin.',
  skills: ['production'],
  changeModifier: 2,
  teacherCorrection: {
    natural: 'Hoewel het regent, gaan we wandelen.',
    explanation: 'Na hoewel staat de persoonsvorm aan het einde van de bijzin.',
  },
  miniLesson: {
    title: 'Concessive word order',
    content: 'Hoewel introduces a subordinate clause with SOV order.',
    example: {
      wrong: 'Hoewel we gaan wandelen het regent',
      right: 'Hoewel het regent, gaan we wandelen.',
    },
  },
};

describe('ConcessionDrill', () => {
  it('renders the prompt and concessive context from the fixture', async () => {
    const wrapper = await mountSuspended(ConcessionDrill, { props: { exercise: concessionExercise } });

    expect(wrapper.text()).toContain('Maak een zin met "hoewel".');
    expect(wrapper.text()).toContain('Toegevende Bijzin (Hoewel / Ofschoon)');
    expect(wrapper.text()).toContain('het regent');
    expect(wrapper.text()).toContain('we gaan wandelen');
    expect(wrapper.text()).toContain('Na "hoewel" gaat de persoonsvorm naar het einde.');
  });

  it('emits submit with the typed answer when the Check button is clicked', async () => {
    const wrapper = await mountSuspended(ConcessionDrill, { props: { exercise: concessionExercise } });

    await wrapper.find('textarea').setValue('Hoewel het regent, gaan we wandelen.');
    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual(['Hoewel het regent, gaan we wandelen.']);
  });

  it('renders the correction area and disables interaction when feedback is provided', async () => {
    const wrapper = await mountSuspended(ConcessionDrill, {
      props: { exercise: concessionExercise, feedback: detailedFeedback },
    });

    expect(wrapper.find('.feedback-card').exists()).toBe(true);
    expect(wrapper.text()).toContain('Let op de inversie na de bijzin.');
    expect(wrapper.text()).toContain('Teacher\'s Natural Correction:');
    expect(wrapper.text()).toContain('Hoewel het regent, gaan we wandelen.');
    expect(wrapper.text()).toContain('Concessive word order');
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined();
    expect(wrapper.text()).toContain('Continue Practice');
    expect(wrapper.emitted('submit')).toBeUndefined();
  });

  it('emits next when Continue Practice is clicked', async () => {
    const wrapper = await mountSuspended(ConcessionDrill, {
      props: { exercise: concessionExercise, feedback: detailedFeedback },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('next')).toHaveLength(1);
  });
});
