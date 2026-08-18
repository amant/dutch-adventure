import { describe, it, expect, beforeEach } from 'vitest';
import { useChapterCompletion } from '~/composables/useChapterCompletion';
import { chapters } from '~/data/chapters';

const sessionKey = (slug: string) => `dutch-adventure-session-${slug}`;

describe('useChapterCompletion', () => {
  beforeEach(() => {
    useChapterCompletion().reset();
    localStorage.clear();
  });

  it('starts empty with no completed chapters', () => {
    const { completed, isCompleted } = useChapterCompletion();
    expect(completed.value).toEqual({});
    expect(isCompleted(chapters[0]!.slug)).toBe(false);
  });

  it('hydrate marks chapters whose session is completed', () => {
    localStorage.setItem(sessionKey(chapters[0]!.slug), JSON.stringify({ chapterSlug: chapters[0]!.slug, completed: true, attempts: [] }));

    const { hydrate, isCompleted } = useChapterCompletion();
    hydrate();

    expect(isCompleted(chapters[0]!.slug)).toBe(true);
    expect(isCompleted(chapters[1]!.slug)).toBe(false);
  });

  it('ignores sessions that are not completed', () => {
    localStorage.setItem(sessionKey(chapters[0]!.slug), JSON.stringify({ chapterSlug: chapters[0]!.slug, completed: false, attempts: [] }));

    const { hydrate, isCompleted } = useChapterCompletion();
    hydrate();

    expect(isCompleted(chapters[0]!.slug)).toBe(false);
  });
});
