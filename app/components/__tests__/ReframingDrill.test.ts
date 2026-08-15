import { describe, it, expect, beforeEach } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import ReframingDrill from '~/components/ReframingDrill.vue';
import { reframingExercise, correctFeedback, resetLearnerMemory } from './helpers';
import type { Feedback } from '~/types/learning';

const detailedFeedback: Feedback = {
  outcome: 'acceptable',
  message: 'Vriendelijker, maar nog directer kan.',
  skills: ['production'],
  pragmaticScore: 80,
  teacherCorrection: {
    natural: 'Misschien is dat niet helemaal juist.',
    explanation: 'Zachter met misschien.',
  },
};

describe('ReframingDrill', () => {
  beforeEach(() => resetLearnerMemory());

  it('renders the prompt and reframing scenario from the fixture', async () => {
    const wrapper = await mountSuspended(ReframingDrill, { props: { exercise: reframingExercise } });

    expect(wrapper.text()).toContain('Formuleer diplomatieker.');
    expect(wrapper.text()).toContain('Professional Meeting');
    expect(wrapper.text()).toContain('Dat is fout.');

    const chips = wrapper.findAll('.chip').map(c => c.text());
    expect(chips).toEqual(['misschien', 'zou', 'eventueel']);
  });

  it('appends softening elements when chips are clicked', async () => {
    const wrapper = await mountSuspended(ReframingDrill, { props: { exercise: reframingExercise } });

    await wrapper.findAll('.chip').find(c => c.text() === 'misschien')!.trigger('click');
    expect((wrapper.find('.reframe-input').element as HTMLTextAreaElement).value).toBe('misschien');

    await wrapper.findAll('.chip').find(c => c.text() === 'zou')!.trigger('click');
    expect((wrapper.find('.reframe-input').element as HTMLTextAreaElement).value).toBe('misschien zou');
  });

  it('emits submit with the typed reframe', async () => {
    const wrapper = await mountSuspended(ReframingDrill, { props: { exercise: reframingExercise } });

    await wrapper.find('textarea').setValue('Misschien is dat niet helemaal juist.');
    await wrapper.findAll('button').find(b => b.text().includes('Verify Reframe'))!.trigger('click');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual(['Misschien is dat niet helemaal juist.']);
  });

  it('shows feedback state and disables interaction when feedback is provided', async () => {
    const wrapper = await mountSuspended(ReframingDrill, {
      props: { exercise: reframingExercise, feedback: correctFeedback },
    });

    expect(wrapper.find('.feedback-card').exists()).toBe(true);
    expect(wrapper.text()).toContain('That sounds perfectly natural!');
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined();
    expect(wrapper.findAll('.chip').every(c => c.attributes('disabled') !== undefined)).toBe(true);
    expect(wrapper.findAll('button').some(b => b.text().includes('Verify Reframe'))).toBe(false);
  });

  it('renders the pragmatic score and natural reframe from detailed feedback', async () => {
    const wrapper = await mountSuspended(ReframingDrill, {
      props: { exercise: reframingExercise, feedback: detailedFeedback },
    });

    expect(wrapper.text()).toContain('Pragmatic: 80%');
    expect(wrapper.text()).toContain('Misschien is dat niet helemaal juist.');

    await wrapper.findAll('button').find(b => b.text() === 'Continue')!.trigger('click');
    expect(wrapper.emitted('next')).toHaveLength(1);
  });
});
