import { describe, it, expect, beforeEach } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import DailyPath from '~/components/DailyPath.vue';
import { useLearnerMemory } from '~/composables/useLearnerMemory';
import { resetLearnerMemory } from './helpers';

type LearnerMemory = ReturnType<typeof useLearnerMemory>;

/** Push a vocabulary concept into the frontier band: recognition > 60, production < 30. */
function seedFrontierConcept(memory: LearnerMemory) {
  for (let i = 0; i < 13; i++) {
    memory.recordExposure('wonen');
  }
}

function cardLabels(wrapper: Awaited<ReturnType<typeof mountSuspended>>) {
  return wrapper.findAll('.step-card').map(c => c.find('.step-label').text());
}

describe('DailyPath', () => {
  beforeEach(() => {
    resetLearnerMemory();
  });

  it('renders fluency and authentic cards with empty memory', async () => {
    const wrapper = await mountSuspended(DailyPath);

    const cards = wrapper.findAll('.step-card');
    expect(cards.length).toBe(2);

    const labels = cardLabels(wrapper);
    expect(labels).toContain('Daily Speed Drill');
    expect(labels).toContain('Real-world Dutch');

    // A NuxtLink renders for every step
    expect(wrapper.findAll('a').length).toBe(2);
  });

  it('adds an activation card when a frontier concept exists', async () => {
    const memory = useLearnerMemory();
    seedFrontierConcept(memory);

    const wrapper = await mountSuspended(DailyPath);

    expect(wrapper.findAll('.step-card').length).toBe(3);
    expect(cardLabels(wrapper)).toContain('Activate Frontier');
    expect(wrapper.text()).toContain('Activate now');
  });

  it('adds a maintenance card when a weak concept exists', async () => {
    const memory = useLearnerMemory();
    memory.record(['production'], 'retry', ['fiets']);

    const wrapper = await mountSuspended(DailyPath);

    expect(wrapper.findAll('.step-card').length).toBe(3);
    expect(cardLabels(wrapper)).toContain('Fix Weak Spot');
    expect(wrapper.text()).toContain('You\'ve struggled with "fiets"');
  });

  it('renders all four step cards when both a frontier and a weak concept exist', async () => {
    const memory = useLearnerMemory();
    seedFrontierConcept(memory);
    memory.record(['production'], 'retry', ['fiets']);

    const wrapper = await mountSuspended(DailyPath);

    expect(wrapper.findAll('.step-card').length).toBe(4);

    const labels = cardLabels(wrapper);
    expect(labels).toContain('Activate Frontier');
    expect(labels).toContain('Fix Weak Spot');
    expect(labels).toContain('Daily Speed Drill');
    expect(labels).toContain('Real-world Dutch');

    // Activation links to the frontier concept and maintenance to the weak one
    expect(wrapper.findAll('a').length).toBe(4);
  });
});
