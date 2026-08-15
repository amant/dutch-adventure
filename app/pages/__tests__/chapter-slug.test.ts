import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import ChapterPage from '~/pages/chapter/[slug].vue';
import { getChapter } from '~/data/chapters';
import { useChapterSession } from '~/composables/useChapterSession';
import { resetLearnerMemory } from './helpers';

const { routeMock } = vi.hoisted(() => ({ routeMock: vi.fn() }));
mockNuxtImport('useRoute', () => routeMock);
mockNuxtImport('createError', () => (opts: any) => {
  const err: any = new Error(opts.statusMessage);
  err.statusCode = opts.statusCode;
  return err;
});

const slug = 'introduceer-jezelf';
const chapter = getChapter(slug)!;

describe('chapter page', () => {
  beforeEach(() => {
    resetLearnerMemory();
    localStorage.clear();
    routeMock.mockReset();
    routeMock.mockReturnValue({ params: { slug } });
    useChapterSession(chapter).reset();
    useChapterSession(chapter).hydrated.value = false;
  });

  it('renders the session header and the first induction exercise', async () => {
    const wrapper = await mountSuspended(ChapterPage);

    expect(wrapper.text()).toContain('Stage 1 of 4');
    expect(wrapper.text()).toContain('Dutch introductions use simple "ben" (am) and "woon" (live).');
    expect(wrapper.find('.pattern-induction').exists()).toBe(true);
    expect(wrapper.text()).toContain('Pattern Discovery');
  });

  it('submits an induction answer and renders feedback', async () => {
    const wrapper = await mountSuspended(ChapterPage);

    // Pick an incorrect rule option ("woon") so the induction check returns a retry outcome
    await wrapper.findAll('.option-button')[1].trigger('click');
    await wrapper.findAll('button').find(b => b.text() === 'Confirm Discovery')!.trigger('click');

    expect(wrapper.find('.feedback').exists()).toBe(true);
    expect(wrapper.find('.feedback').text()).toContain('Try once more');
  });

  it('clears feedback with the retry action', async () => {
    const wrapper = await mountSuspended(ChapterPage);

    await wrapper.findAll('.option-button')[1].trigger('click');
    await wrapper.findAll('button').find(b => b.text() === 'Confirm Discovery')!.trigger('click');
    await wrapper.findAll('button').find(b => b.text() === 'Retry')!.trigger('click');

    expect(wrapper.find('.feedback').exists()).toBe(false);
  });

  it('confirms a correct induction answer and advances', async () => {
    const wrapper = await mountSuspended(ChapterPage);

    // Pick the correct rule option ("ben")
    await wrapper.findAll('.option-button')[0].trigger('click');
    await wrapper.findAll('button').find(b => b.text() === 'Confirm Discovery')!.trigger('click');

    expect(wrapper.find('.feedback').text()).toContain('Correct');
    await wrapper.findAll('button').find(b => b.text() === 'Continue')!.trigger('click');

    expect(wrapper.text()).toContain('Stage 1 of 4');
    expect(wrapper.find('textarea').exists()).toBe(false);
  });

  it('restores a saved session and advances through it', async () => {
    // Seed a session that starts at the info exercise (index 1) of stage 0
    localStorage.setItem(`dutch-adventure-session-${slug}`, JSON.stringify({
      chapterSlug: slug,
      stageIndex: 0,
      exerciseIndex: 1,
      attempts: [],
      completed: false,
    }));

    const wrapper = await mountSuspended(ChapterPage);

    expect(wrapper.findAll('button').some(b => b.text().includes('ready to continue'))).toBe(true);

    await wrapper.findAll('button').find(b => b.text().includes('ready to continue'))!.trigger('click');

    // Advanced into the "Retrieve" stage which starts with a typed exercise
    expect(wrapper.text()).toContain('Stage 2 of 4');
    expect(wrapper.find('textarea').exists()).toBe(true);
  });

  it('throws a 404 error for an unknown chapter slug', async () => {
    routeMock.mockReturnValue({ params: { slug: 'does-not-exist' } });

    let threw = false;
    try {
      await mountSuspended(ChapterPage);
    } catch (error: any) {
      threw = true;
      expect(error.statusCode ?? error.cause?.statusCode ?? (error as any)?.data?.statusCode).toBe(404);
    }
    expect(threw).toBe(true);
  });
});
