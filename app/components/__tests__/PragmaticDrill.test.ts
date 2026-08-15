import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import PragmaticDrill from '~/components/PragmaticDrill.vue';
import { pragmaticExercise, correctFeedback } from './helpers';

describe('PragmaticDrill', () => {
  it('renders the scenario, context and options from the exercise', async () => {
    const wrapper = await mountSuspended(PragmaticDrill, { props: { exercise: pragmaticExercise } });

    expect(wrapper.text()).toContain('Kies de meest natuurlijke reactie.');
    expect(wrapper.text()).toContain('café');
    expect(wrapper.findAll('.option-card').length).toBe(2);
    expect(wrapper.text()).toContain('Dank u wel!');
    expect(wrapper.text()).toContain('Geef me maar.');
  });

  it('emits submit with the selected option and marks it selected', async () => {
    const wrapper = await mountSuspended(PragmaticDrill, { props: { exercise: pragmaticExercise } });

    await wrapper.findAll('.option-card')[0].trigger('click');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual(['Dank u wel!']);
    expect(wrapper.findAll('.option-card')[0].classes()).toContain('selected');
  });

  it('emits submit with the text of any option clicked', async () => {
    const wrapper = await mountSuspended(PragmaticDrill, { props: { exercise: pragmaticExercise } });

    await wrapper.findAll('.option-card')[1].trigger('click');

    expect(wrapper.emitted('submit')![0]).toEqual(['Geef me maar.']);
  });

  it('shows feedback state and blocks further submits when feedback is provided', async () => {
    const wrapper = await mountSuspended(PragmaticDrill, {
      props: { exercise: pragmaticExercise, feedback: correctFeedback },
    });

    expect(wrapper.findAll('.option-card')[0].classes()).toContain('best');
    expect(wrapper.text()).toContain('✅');
    expect(wrapper.text()).toContain('Beleefd en natuurlijk.');

    await wrapper.findAll('.option-card')[0].trigger('click');
    expect(wrapper.emitted('submit')).toBeUndefined();
  });
});
