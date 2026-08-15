import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import CohesionDrill from '~/components/CohesionDrill.vue';
import { cohesionExercise, correctFeedback } from './helpers';
import type { Feedback } from '~/types/learning';

const explanationFeedback: Feedback = {
  ...correctFeedback,
  explanation: 'Eerst de aankomst, dan de actie.',
};

describe('CohesionDrill', () => {
  it('renders the scrambled sentences in their given order', async () => {
    const wrapper = await mountSuspended(CohesionDrill, { props: { exercise: cohesionExercise } });

    expect(wrapper.findAll('.sentence-item').length).toBe(2);
    expect(wrapper.text()).toContain('Daarna ga ik naar binnen.');
    expect(wrapper.text()).toContain('Eerst kom ik aan.');
    expect(wrapper.find('.sentence-item .index').text()).toBe('1.');
  });

  it('reorders sentences and emits submit with the joined result', async () => {
    const wrapper = await mountSuspended(CohesionDrill, { props: { exercise: cohesionExercise } });

    await wrapper.findAll('.sentence-item')[0].findAll('button')[1].trigger('click');
    expect(wrapper.findAll('.sentence-item')[0].text()).toContain('Eerst kom ik aan.');

    await wrapper.findAll('button').find(b => b.text().includes('Check Logical Order'))!.trigger('click');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual(['Eerst kom ik aan. Daarna ga ik naar binnen.']);
  });

  it('disables the boundary move buttons', async () => {
    const wrapper = await mountSuspended(CohesionDrill, { props: { exercise: cohesionExercise } });

    const items = wrapper.findAll('.sentence-item');
    expect((items[0].findAll('button')[0].element as HTMLButtonElement).disabled).toBe(true);
    expect((items[1].findAll('button')[1].element as HTMLButtonElement).disabled).toBe(true);
  });

  it('hides controls, renders feedback and emits next on Continue', async () => {
    const wrapper = await mountSuspended(CohesionDrill, {
      props: { exercise: cohesionExercise, feedback: explanationFeedback },
    });

    expect(wrapper.findAll('.move-btn').length).toBe(0);
    expect(wrapper.findAll('button').some(b => b.text().includes('Check Logical Order'))).toBe(false);
    expect(wrapper.text()).toContain('That sounds perfectly natural!');
    expect(wrapper.text()).toContain('Eerst de aankomst, dan de actie.');

    await wrapper.findAll('button').find(b => b.text() === 'Continue')!.trigger('click');
    expect(wrapper.emitted('next')).toHaveLength(1);
  });
});
