import { describe, it, expect, beforeEach } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import GrammarPage from '~/pages/grammar.vue';
import { mkState, resetLearnerMemory } from './helpers';
import { useLearnerMemory } from '~/composables/useLearnerMemory';

describe('grammar page', () => {
  beforeEach(() => resetLearnerMemory());

  it('shows the empty state when no grammar patterns are logged', async () => {
    const wrapper = await mountSuspended(GrammarPage);

    expect(wrapper.find('.empty-state').exists()).toBe(true);
    expect(wrapper.text()).toContain('No Grammar Patterns Logged Yet');
    expect(wrapper.find('.grammar-grid').exists()).toBe(false);
  });

  it('renders grammar cards with formatted keys and dimension rows', async () => {
    const { memory } = useLearnerMemory();
    memory.value.grammar['omdat-zinsbouw'] = mkState();
    memory.value.grammar['want-bijzin'] = mkState({ successes: 5, encounters: 6 });

    const wrapper = await mountSuspended(GrammarPage);

    expect(wrapper.find('.empty-state').exists()).toBe(false);
    expect(wrapper.findAll('.grammar-card')).toHaveLength(2);
    expect(wrapper.text()).toContain('Omdat Zinsbouw');
    expect(wrapper.text()).toContain('Want Bijzin');
    expect(wrapper.text()).toContain('5/6 hits');
    // 2 cards × 6 skill dimensions
    expect(wrapper.findAll('.dimension-row')).toHaveLength(12);
  });
});
