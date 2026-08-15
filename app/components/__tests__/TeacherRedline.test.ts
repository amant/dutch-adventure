import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import TeacherRedline from '~/components/TeacherRedline.vue';

describe('TeacherRedline', () => {
  it('renders removed and added spans when strings differ', async () => {
    const wrapper = await mountSuspended(TeacherRedline, {
      props: {
        original: 'I live in Amsterdam.',
        corrected: 'I live in Utrecht.',
      },
    });

    expect(wrapper.findAll('span.removed').length).toBe(1);
    expect(wrapper.findAll('span.added').length).toBe(1);
    expect(wrapper.findAll('span.same').length).toBeGreaterThan(0);
    expect(wrapper.text()).toContain('Amsterdam.');
    expect(wrapper.text()).toContain('Utrecht.');
  });

  it('renders all same spans when the strings are identical', async () => {
    const wrapper = await mountSuspended(TeacherRedline, {
      props: {
        original: 'Ik woon in Amsterdam.',
        corrected: 'Ik woon in Amsterdam.',
      },
    });

    expect(wrapper.findAll('span.removed').length).toBe(0);
    expect(wrapper.findAll('span.added').length).toBe(0);
    expect(wrapper.findAll('span.same').length).toBeGreaterThan(0);
    expect(wrapper.text()).toContain('Ik woon in Amsterdam.');
  });

  it('shows removed text without a matching addition', async () => {
    const wrapper = await mountSuspended(TeacherRedline, {
      props: {
        original: 'Hello world',
        corrected: 'Hello',
      },
    });

    // 'world' (plus its preceding whitespace token) is removed, nothing is added
    expect(wrapper.findAll('span.removed').length).toBe(2);
    expect(wrapper.findAll('span.added').length).toBe(0);
    expect(wrapper.findAll('span.same').length).toBeGreaterThan(0);
    expect(wrapper.text()).toContain('world');
  });
});
