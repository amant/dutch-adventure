import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import TransformationDrill from '~/components/TransformationDrill.vue';
import { transformationExercise, correctFeedback } from './helpers';
import type { Exercise } from '~/types/learning';

const withContextExercise: Exercise = {
  ...transformationExercise,
  context: 'Ik fietste naar huis.\nVerander de zin naar de verleden tijd.',
  placeholder: 'Type hier de nieuwe zin...',
};

describe('TransformationDrill', () => {
  it('renders the original sentence and the change instruction', async () => {
    const wrapper = await mountSuspended(TransformationDrill, { props: { exercise: withContextExercise } });

    expect(wrapper.text()).toContain('Ik fietste naar huis.');
    expect(wrapper.text()).toContain('Vervorm de zin naar verleden tijd.');
  });

  it('emits submit (response flows through defineModel)', async () => {
    const wrapper = await mountSuspended(TransformationDrill, { props: { exercise: withContextExercise } });

    await wrapper.find('textarea').setValue('Ik fietste naar huis.');
    await wrapper.find('form').trigger('submit');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual([]);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Ik fietste naar huis.']);
  });

  it('binds the response through defineModel', async () => {
    const wrapper = await mountSuspended(TransformationDrill, {
      props: { exercise: withContextExercise, modelValue: 'Mijn antwoord' },
    });

    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('Mijn antwoord');

    await wrapper.find('textarea').setValue('Nieuwe zin');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Nieuwe zin']);
  });

  it('uses the exercise placeholder', async () => {
    const wrapper = await mountSuspended(TransformationDrill, { props: { exercise: withContextExercise } });

    expect(wrapper.find('textarea').attributes('placeholder')).toBe('Type hier de nieuwe zin...');
  });

  it('hides the form when feedback is provided', async () => {
    const wrapper = await mountSuspended(TransformationDrill, {
      props: { exercise: withContextExercise, feedback: correctFeedback },
    });

    expect(wrapper.find('form').exists()).toBe(false);
    expect(wrapper.find('textarea').exists()).toBe(false);
  });
});
