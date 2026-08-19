import { describe, it, expect, beforeEach } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import CapstoneMission from '~/components/CapstoneMission.vue';
import MissionSimulator from '~/components/MissionSimulator.vue';
import { capstoneExercise, correctFeedback, missionExercise, resetLearnerMemory } from './helpers';
import type { Feedback } from '~/types/learning';

const allGoalsFeedback: Feedback = {
  ...correctFeedback,
  achievedGoalIds: ['g1'],
};

describe('CapstoneMission', () => {
  beforeEach(() => resetLearnerMemory());

  it('renders the capstone header and mission goals from the exercise', async () => {
    const wrapper = await mountSuspended(CapstoneMission, { props: { exercise: capstoneExercise } });

    expect(wrapper.text()).toContain('Level Capstone');
    expect(wrapper.text()).toContain('Mission Goals');
    expect(wrapper.text()).toContain('Stel een vraag');
    expect(wrapper.text()).toContain('0% Success');
  });

  it('binds the defineModel response to the simulator textarea', async () => {
    const wrapper = await mountSuspended(CapstoneMission, {
      props: { exercise: capstoneExercise, modelValue: 'init' },
    });

    const textarea = wrapper.find('textarea');
    expect((textarea.element as HTMLTextAreaElement).value).toBe('init');

    await textarea.setValue('Mijn antwoord');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Mijn antwoord']);
  });

  it('keeps the response field available for conversations without goals after feedback', async () => {
    const wrapper = await mountSuspended(MissionSimulator, {
      props: {
        exercise: {
          ...missionExercise,
          missionGoals: undefined,
        },
        feedback: correctFeedback,
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.find('textarea').exists()).toBe(true);
  });

  it('re-emits submit coming from the mission simulator', async () => {
    const wrapper = await mountSuspended(CapstoneMission, { props: { exercise: capstoneExercise } });

    const simulator = wrapper.findComponent(MissionSimulator);
    expect(simulator.exists()).toBe(true);

    simulator.vm.$emit('submit', 'Hallo daar');
    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual(['Hallo daar']);
  });

  it('emits next when the simulator advances before completion', async () => {
    const wrapper = await mountSuspended(CapstoneMission, { props: { exercise: capstoneExercise } });

    wrapper.findComponent(MissionSimulator).vm.$emit('next');
    expect(wrapper.emitted('next')).toHaveLength(1);
    expect(wrapper.emitted('next')![0]).toEqual([]);
  });

  it('shows the completion state and emits next when claiming the certificate', async () => {
    const wrapper = await mountSuspended(CapstoneMission, {
      props: { exercise: capstoneExercise, feedback: allGoalsFeedback },
    });

    wrapper.findComponent(MissionSimulator).vm.$emit('next');
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Capability Mastered!');
    expect(wrapper.text()).toContain('1/1');

    await wrapper.findAll('button').find(b => b.text().includes('Claim Certificate'))!.trigger('click');
    expect(wrapper.emitted('next')).toHaveLength(1);
  });
});
