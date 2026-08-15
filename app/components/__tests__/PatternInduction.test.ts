import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import PatternInduction from '~/components/PatternInduction.vue';
import { inductionExercise } from './helpers';

describe('PatternInduction', () => {
  it('renders the induction examples and the rule options', async () => {
    const wrapper = await mountSuspended(PatternInduction, { props: { exercise: inductionExercise } });

    expect(wrapper.findAll('.example-row').length).toBe(2);
    expect(wrapper.text()).toContain('Ik woon in Amsterdam.');
    expect(wrapper.text()).toContain('wonen');
    expect(wrapper.text()).toContain('Jij woont in Utrecht.');
    expect(wrapper.text()).toContain('Welke regel zie je?');

    const options = wrapper.findAll('.option-button');
    expect(options.map(o => o.text())).toEqual(['De regel is dat.', 'Niet waar.']);
  });

  it('keeps the confirm button disabled until an option is selected', async () => {
    const wrapper = await mountSuspended(PatternInduction, { props: { exercise: inductionExercise } });

    const confirm = wrapper.findAll('button').find(b => b.text() === 'Confirm Discovery')!;
    expect(confirm.attributes('disabled')).toBeDefined();

    await wrapper.findAll('.option-button')[0]!.trigger('click');
    expect(confirm.attributes('disabled')).toBeUndefined();
  });

  it('emits submit with the selected rule', async () => {
    const wrapper = await mountSuspended(PatternInduction, { props: { exercise: inductionExercise } });

    await wrapper.findAll('.option-button')[0]!.trigger('click');
    await wrapper.findAll('button').find(b => b.text() === 'Confirm Discovery')!.trigger('click');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual(['De regel is dat.']);
  });
});
