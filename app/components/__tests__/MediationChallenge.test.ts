import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import MediationChallenge from '~/components/MediationChallenge.vue';
import { mediationExercise, correctFeedback } from './helpers';
import type { Feedback } from '~/types/learning';

const achievedFeedback: Feedback = {
  ...correctFeedback,
  mediationPointsAchieved: ['p1'],
};

describe('MediationChallenge', () => {
  it('renders the mediation source and the key points to include', async () => {
    const wrapper = await mountSuspended(MediationChallenge, { props: { exercise: mediationExercise } });

    expect(wrapper.text()).toContain('Het probleem');
    expect(wrapper.text()).toContain('Er is een probleem met de planning.');
    expect(wrapper.text()).toContain('NL');
    expect(wrapper.text()).toContain('Vat de bron samen voor een Nederlandstalige collega.');
    expect(wrapper.text()).toContain('Noem het probleem');
    expect(wrapper.text()).toContain('Noem de oplossing');
  });

  it('binds the defineModel response and emits a plain submit', async () => {
    const wrapper = await mountSuspended(MediationChallenge, {
      props: { exercise: mediationExercise, modelValue: 'mijn samenvatting' },
    });

    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('mijn samenvatting');

    await wrapper.find('textarea').setValue('Er is een probleem met de planning.');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Er is een probleem met de planning.']);

    await wrapper.findAll('button').find(b => b.text().includes('Submit Mediation'))!.trigger('click');
    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual([]);
  });

  it('hides the input area and marks achieved points when feedback is present', async () => {
    const wrapper = await mountSuspended(MediationChallenge, {
      props: { exercise: mediationExercise, feedback: achievedFeedback },
    });

    expect(wrapper.find('.input-area').exists()).toBe(false);
    expect(wrapper.find('textarea').exists()).toBe(false);
    expect(wrapper.findAll('.point-item.achieved').length).toBe(1);
  });
});
