import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import AspectDrill from '~/components/AspectDrill.vue';
import { aspectExercise, correctFeedback } from './helpers';

describe('AspectDrill', () => {
  it('renders the prompt and aspect context from the fixture', async () => {
    const wrapper = await mountSuspended(AspectDrill, { props: { exercise: aspectExercise } });

    expect(wrapper.text()).toContain('Ik ben ... een boek te lezen.');
    expect(wrapper.text()).toContain('Dynamisch Continu Aspect');
    expect(wrapper.text()).toContain('zijn');
    expect(wrapper.text()).toContain('lezen');
    expect(wrapper.text()).toContain('Je collega vraagt wat je aan het doen bent.');
    expect(wrapper.text()).toContain('Gebruik "aan het" + infinitief.');
  });

  it('emits submit with the typed answer when the form is submitted', async () => {
    const wrapper = await mountSuspended(AspectDrill, { props: { exercise: aspectExercise } });

    await wrapper.find('textarea').setValue('Ik ben een boek aan het lezen.');
    await wrapper.find('form').trigger('submit');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual(['Ik ben een boek aan het lezen.']);
  });

  it('disables the textarea and hides the submit button when feedback is provided', async () => {
    const wrapper = await mountSuspended(AspectDrill, {
      props: { exercise: aspectExercise, feedback: correctFeedback },
    });

    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined();
    expect(wrapper.find('button[type="submit"]').exists()).toBe(false);

    // Submitting while feedback is present must not emit a new submit.
    await wrapper.find('form').trigger('submit');
    expect(wrapper.emitted('submit')).toBeUndefined();
  });
});
