import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import DoubleInfinitiveDrill from '~/components/DoubleInfinitiveDrill.vue';
import { doubleInfinitiveExercise } from './helpers';
import type { Feedback } from '~/types/learning';

const detailedFeedback: Feedback = {
  outcome: 'retry',
  message: 'Het voltooid deelwoord wordt een infinitief (IPP).',
  skills: ['production'],
  changeModifier: 2,
  teacherCorrection: {
    natural: 'Ik heb dat niet kunnen doen.',
    explanation: 'Na een modaal werkwoord volgt in de voltooide tijd een dubbele infinitief.',
  },
  miniLesson: {
    title: 'Double infinitive (IPP)',
    content: 'hebben + infinitive + infinitive replaces the past participle.',
    example: {
      wrong: 'Ik heb dat niet gekund doen',
      right: 'Ik heb dat niet kunnen doen.',
    },
  },
};

describe('DoubleInfinitiveDrill', () => {
  it('renders the prompt and verb cluster from the fixture', async () => {
    const wrapper = await mountSuspended(DoubleInfinitiveDrill, { props: { exercise: doubleInfinitiveExercise } });

    expect(wrapper.text()).toContain('Vorm de zin om in de verleden tijd.');
    expect(wrapper.text()).toContain('Modaal Werkwoord (moeten / kunnen / willen / mogen)');
    expect(wrapper.text()).toContain('Ik kan dat niet. (in het verleden)');
    expect(wrapper.text()).toContain('hebben');
    expect(wrapper.text()).toContain('kunnen');
    expect(wrapper.text()).toContain('doen');
    expect(wrapper.text()).toContain('Gebruik "hebben" + infinitief + infinitief.');
  });

  it('emits submit with the typed answer when the Check button is clicked', async () => {
    const wrapper = await mountSuspended(DoubleInfinitiveDrill, { props: { exercise: doubleInfinitiveExercise } });

    await wrapper.find('textarea').setValue('Ik heb dat niet kunnen doen.');
    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual(['Ik heb dat niet kunnen doen.']);
  });

  it('renders the correction area and disables interaction when feedback is provided', async () => {
    const wrapper = await mountSuspended(DoubleInfinitiveDrill, {
      props: { exercise: doubleInfinitiveExercise, feedback: detailedFeedback },
    });

    expect(wrapper.find('.feedback-card').exists()).toBe(true);
    expect(wrapper.text()).toContain('Het voltooid deelwoord wordt een infinitief (IPP).');
    expect(wrapper.text()).toContain('Teacher\'s Natural Correction:');
    expect(wrapper.text()).toContain('Ik heb dat niet kunnen doen.');
    expect(wrapper.text()).toContain('Double infinitive (IPP)');
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined();
    expect(wrapper.text()).toContain('Continue Practice');
    expect(wrapper.emitted('submit')).toBeUndefined();
  });

  it('emits next when Continue Practice is clicked', async () => {
    const wrapper = await mountSuspended(DoubleInfinitiveDrill, {
      props: { exercise: doubleInfinitiveExercise, feedback: detailedFeedback },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('next')).toHaveLength(1);
  });
});
