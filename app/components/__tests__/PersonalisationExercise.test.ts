import { describe, it, expect, beforeEach } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import PersonalisationExercise from '~/components/PersonalisationExercise.vue';
import { missionExercise, correctFeedback, resetLearnerMemory } from './helpers';
import type { Exercise } from '~/types/learning';

// Extend the conversation fixture with vocabulary/grammar so the SmartPalette
// renders its "Bouwstenen" chips.
const paletteExercise: Exercise = {
  ...missionExercise,
  vocabulary: ['overtuigen'],
  grammar: ['zou'],
};

describe('PersonalisationExercise', () => {
  beforeEach(() => resetLearnerMemory());

  it('renders the prompt and a textarea with a check button', async () => {
    const wrapper = await mountSuspended(PersonalisationExercise, { props: { exercise: missionExercise } });

    expect(wrapper.text()).toContain('Je zit in een vergadering. Wat zeg je?');
    expect(wrapper.find('textarea').exists()).toBe(true);
    expect(wrapper.findAll('button').some(b => b.text() === 'Check Answer')).toBe(true);
  });

  it('binds the defineModel response and emits a plain submit on form submit', async () => {
    const wrapper = await mountSuspended(PersonalisationExercise, {
      props: { exercise: missionExercise, modelValue: 'mijn antwoord' },
    });

    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('mijn antwoord');

    await wrapper.find('textarea').setValue('Ik wil u overtuigen.');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Ik wil u overtuigen.']);

    await wrapper.find('form').trigger('submit');
    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual([]);
  });

  it('renders the target vocabulary and grammar through the smart palette', async () => {
    const wrapper = await mountSuspended(PersonalisationExercise, { props: { exercise: paletteExercise } });

    expect(wrapper.text()).toContain('Bouwstenen');
    expect(wrapper.text()).toContain('overtuigen');
    expect(wrapper.text()).toContain('zou');
    expect(wrapper.text()).toContain('0 / 2 gebruikt');
  });

  it('hides the form when feedback is provided', async () => {
    const wrapper = await mountSuspended(PersonalisationExercise, {
      props: { exercise: missionExercise, feedback: correctFeedback },
    });

    expect(wrapper.find('.input-area').exists()).toBe(false);
    expect(wrapper.find('textarea').exists()).toBe(false);
  });
});
