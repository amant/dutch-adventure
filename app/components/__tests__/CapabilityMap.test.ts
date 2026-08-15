import { describe, it, expect, beforeEach } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import CapabilityMap from '~/components/CapabilityMap.vue';
import { chapters } from '~/data/chapters';
import { resetLearnerMemory } from './helpers';

const levels = ['A1', 'A2', 'B1', 'B2'] as const;

describe('CapabilityMap', () => {
  beforeEach(() => {
    resetLearnerMemory();
  });

  it('renders one column per CEFR level', async () => {
    const wrapper = await mountSuspended(CapabilityMap);

    const columns = wrapper.findAll('.level-column');
    expect(columns.length).toBe(4);

    const badges = wrapper.findAll('.level-badge').map(b => b.text());
    expect(badges).toEqual(['A1', 'A2', 'B1', 'B2']);
  });

  it('renders chapters grouped by level with their titles', async () => {
    const wrapper = await mountSuspended(CapabilityMap);

    const columns = wrapper.findAll('.level-column');
    columns.forEach((column, idx) => {
      const level = levels[idx]!;
      const expected = chapters.filter(c => c.level === level).length;
      expect(column.findAll('.capability-item').length).toBe(expected);
    });

    // A representative title from each level
    expect(wrapper.text()).toContain('Introduce yourself');
    expect(wrapper.text()).toContain('Calling the doctor');
    expect(wrapper.text()).toContain('Give opinions and reasons');
    expect(wrapper.text()).toContain('Work discussion');
  });

  it('marks every chapter as not-started with empty memory', async () => {
    const wrapper = await mountSuspended(CapabilityMap);

    const items = wrapper.findAll('.capability-item');
    expect(items.length).toBeGreaterThan(0);
    expect(items.every(i => i.classes().includes('not-started'))).toBe(true);
  });
});
