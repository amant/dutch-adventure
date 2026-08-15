import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import FinalChallenge from '~/components/FinalChallenge.vue';
import { baseExercise } from './helpers';

describe('FinalChallenge', () => {
  it('renders the prompt and shows the bound modelValue in the textarea', async () => {
    const wrapper = await mountSuspended(FinalChallenge, {
      props: { exercise: baseExercise, modelValue: 'mijn antwoord' },
    });

    expect(wrapper.text()).toContain('Say: ik woon in Amsterdam.');
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('mijn antwoord');
    expect(wrapper.text()).toContain('2 / 0 words');
  });

  it('emits update:modelValue while typing', async () => {
    const wrapper = await mountSuspended(FinalChallenge, {
      props: { exercise: baseExercise, modelValue: '' },
    });

    await wrapper.find('textarea').setValue('Ik woon in Amsterdam.');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['Ik woon in Amsterdam.']);
  });

  it('disables the textarea when the disabled prop is set', async () => {
    const wrapper = await mountSuspended(FinalChallenge, {
      props: { exercise: baseExercise, modelValue: 'mijn antwoord', disabled: true },
    });

    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined();
  });
});
