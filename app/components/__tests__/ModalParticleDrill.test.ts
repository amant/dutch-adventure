import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import ModalParticleDrill from '~/components/ModalParticleDrill.vue';
import { modalParticleExercise, correctFeedback } from './helpers';

describe('ModalParticleDrill', () => {
  it('renders the prompt and modal particle data from the fixture', async () => {
    const wrapper = await mountSuspended(ModalParticleDrill, { props: { exercise: modalParticleExercise } });

    expect(wrapper.text()).toContain('Voeg een modaal partikel toe.');
    expect(wrapper.text()).toContain('Heroverweging / Toegeving (Toch maar)');
    expect(wrapper.text()).toContain('toch maar');
    expect(wrapper.text()).toContain('Ik ga naar huis.');
    expect(wrapper.text()).toContain('Je bent moe, maar je wilt eigenlijk blijven.');
    expect(wrapper.text()).toContain('[Onderwerp] + [PV] + toch maar + [Middenveld]');
    expect(wrapper.text()).toContain('Plaats "toch maar" direct na de persoonsvorm.');
    expect(wrapper.text()).toContain('Gebruik "toch maar" voor een tegenzin-beslissing.');
  });

  it('emits submit with the typed answer on form submit', async () => {
    const wrapper = await mountSuspended(ModalParticleDrill, { props: { exercise: modalParticleExercise } });

    await wrapper.find('textarea').setValue('Ik ga toch maar naar huis.');
    await wrapper.find('form').trigger('submit');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual(['Ik ga toch maar naar huis.']);
  });

  it('emits submit when Enter is pressed in the textarea', async () => {
    const wrapper = await mountSuspended(ModalParticleDrill, { props: { exercise: modalParticleExercise } });

    await wrapper.find('textarea').setValue('Ik ga toch maar naar huis.');
    await wrapper.find('textarea').trigger('keydown.enter');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual(['Ik ga toch maar naar huis.']);
  });

  it('disables input and hides the submit button when feedback is provided', async () => {
    const wrapper = await mountSuspended(ModalParticleDrill, {
      props: { exercise: modalParticleExercise, feedback: correctFeedback },
    });

    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined();
    expect(wrapper.find('button').exists()).toBe(false);

    await wrapper.find('form').trigger('submit');
    expect(wrapper.emitted('submit')).toBeUndefined();
  });
});
