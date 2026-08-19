import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import SmartPalette from '~/components/SmartPalette.vue';

describe('SmartPalette', () => {
  it('renders chips and the used counter', async () => {
    const wrapper = await mountSuspended(SmartPalette, {
      props: {
        userText: 'Ik woon in Amsterdam',
        targetVocabulary: ['woon', 'fiets'],
        targetGrammar: ['omdat'],
        frontierConcepts: [{ key: 'gezellig', kind: 'vocabulary' }],
      },
    });

    const chips = wrapper.findAll('.chip');
    expect(chips.length).toBe(4);

    // 'woon' appears in the user text → 1 of 4 used
    expect(wrapper.text()).toContain('1 / 4 gebruikt');
    expect(wrapper.find('.chip.used .label').text()).toBe('woon');
    expect(wrapper.findAll('.chip.used').length).toBe(1);
  });

  it('marks chips as used case-insensitively', async () => {
    const wrapper = await mountSuspended(SmartPalette, {
      props: {
        userText: 'Ik WOON graag buiten',
        targetVocabulary: ['woon', 'buiten', 'eten'],
      },
    });

    expect(wrapper.text()).toContain('2 / 3 gebruikt');
    expect(wrapper.findAll('.chip.used').length).toBe(2);
  });

  it('deduplicates a frontier concept that is already a target', async () => {
    const wrapper = await mountSuspended(SmartPalette, {
      props: {
        userText: 'gezellig',
        targetVocabulary: ['gezellig'],
        frontierConcepts: [{ key: 'gezellig', kind: 'vocabulary' }],
      },
    });

    expect(wrapper.findAll('.chip').length).toBe(1);
    expect(wrapper.text()).toContain('1 / 1 gebruikt');
  });

  it('translates grammar keys for display while preserving their matching keys', async () => {
    const wrapper = await mountSuspended(SmartPalette, {
      props: {
        userText: 'Ik ben naar de supermarkt gegaan.',
        targetGrammar: ['perfect-tense', 'separable-verbs'],
      },
    });

    expect(wrapper.text()).toContain('Bouwstenen');
    expect(wrapper.text()).toContain('0 / 2 gebruikt');
    expect(wrapper.text()).toContain('voltooide tijd');
    expect(wrapper.text()).toContain('scheidbare werkwoorden');
    expect(wrapper.text()).not.toContain('perfect-tense');
    expect(wrapper.text()).not.toContain('separable-verbs');
  });

  it('renders nothing when there are no targets', async () => {
    const wrapper = await mountSuspended(SmartPalette, {
      props: { userText: 'whatever' },
    });

    expect(wrapper.find('.smart-palette').exists()).toBe(false);
  });
});
