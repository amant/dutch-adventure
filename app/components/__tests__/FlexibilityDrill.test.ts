import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import FlexibilityDrill from '~/components/FlexibilityDrill.vue';
import { baseExercise } from './helpers';
import type { Exercise } from '~/types/learning';

const flexibilityExercise: Exercise = {
  ...baseExercise,
  id: 'flexibility-test',
  kind: 'flexibility',
  context: 'Ik woon in Amsterdam.',
  prompt: 'Herformuleer met: wonen',
  requiredWords: ['wonen'],
  forbiddenWords: ['Amsterdam'],
  placeholder: 'Typ je alternatieve versie...',
};

describe('FlexibilityDrill', () => {
  it('renders the original sentence, prompt, and word constraints', async () => {
    const wrapper = await mountSuspended(FlexibilityDrill, {
      props: { exercise: flexibilityExercise, modelValue: '' },
    });

    expect(wrapper.text()).toContain('Ik woon in Amsterdam.');
    expect(wrapper.text()).toContain('Herformuleer met: wonen');
    expect(wrapper.text()).toContain('Use: wonen');
    expect(wrapper.text()).toContain('Avoid: Amsterdam');
  });

  it('shows the bound modelValue and emits update:modelValue while typing', async () => {
    const wrapper = await mountSuspended(FlexibilityDrill, {
      props: { exercise: flexibilityExercise, modelValue: 'mijn antwoord' },
    });

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('mijn antwoord');

    await wrapper.find('input').setValue('Ik verblijf in de hoofdstad.');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['Ik verblijf in de hoofdstad.']);
  });

  it('emits a plain submit when Enter is pressed', async () => {
    const wrapper = await mountSuspended(FlexibilityDrill, {
      props: { exercise: flexibilityExercise, modelValue: 'mijn antwoord' },
    });

    await wrapper.find('input').trigger('keydown', { key: 'Enter' });

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual([]);
  });

  it('disables the input and ignores Enter when disabled', async () => {
    const wrapper = await mountSuspended(FlexibilityDrill, {
      props: { exercise: flexibilityExercise, modelValue: 'mijn antwoord', disabled: true },
    });

    expect(wrapper.find('input').attributes('disabled')).toBeDefined();

    await wrapper.find('input').trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('submit')).toBeUndefined();
  });
});
