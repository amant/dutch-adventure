import { describe, it, expect, beforeEach } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import GraphPage from '~/pages/graph.vue';
import { chapters } from '~/data/chapters';
import { mkState, resetLearnerMemory } from './helpers';
import { useLearnerMemory } from '~/composables/useLearnerMemory';

describe('graph page', () => {
  beforeEach(() => resetLearnerMemory());

  it('renders one chapter node per chapter grouped into level columns', async () => {
    const wrapper = await mountSuspended(GraphPage);

    expect(wrapper.findAll('.level-column')).toHaveLength(4); // A1, A2, B1, B2
    expect(wrapper.findAll('.chapter-node')).toHaveLength(chapters.length);
  });

  it('suggests the first chapter when memory is empty', async () => {
    const wrapper = await mountSuspended(GraphPage);

    expect(wrapper.find('.suggestion').exists()).toBe(true);
    expect(wrapper.text()).toContain('Suggested Next Step');
    expect(wrapper.text()).toContain(chapters[0].title);
  });

  it('renders concept dots for each concept in a chapter', async () => {
    const wrapper = await mountSuspended(GraphPage);

    expect(wrapper.findAll('.concept-dot').length).toBeGreaterThan(0);
    expect(wrapper.findAll('.concept-dot.vocabulary').length).toBeGreaterThan(0);
    expect(wrapper.findAll('.concept-dot.grammar').length).toBeGreaterThan(0);
  });

  it('shows a mastery tooltip when a concept dot is hovered', async () => {
    const { memory } = useLearnerMemory();
    memory.value.vocabulary['zijn'] = mkState({ recognition: 80, production: 60, automaticity: 40, speaking: 50 });

    const wrapper = await mountSuspended(GraphPage);
    const dot = wrapper.findAll('.concept-dot')[0];
    await dot.trigger('mouseenter');

    expect(wrapper.find('.tooltip').exists()).toBe(true);
    expect(wrapper.find('.tooltip').text()).toContain('% mastered');
  });
});
