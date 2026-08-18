import { chapters } from '~/data/chapters';

const sessionKey = (slug: string) => `dutch-adventure-session-${slug}`;

/**
 * Tracks which chapters have been completed (finished the full learning loop),
 * by reading the per-chapter session state persisted by `useChapterSession`.
 */
export function useChapterCompletion() {
  const completed = useState<Record<string, boolean>>('chapter-completion', () => ({}));
  const hydrated = useState('chapter-completion-hydrated', () => false);

  function hydrate() {
    if (hydrated.value || !import.meta.client) return;
    try {
      const next: Record<string, boolean> = {};
      chapters.forEach((chapter) => {
        const raw = localStorage.getItem(sessionKey(chapter.slug));
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (parsed?.completed === true) next[chapter.slug] = true;
      });
      completed.value = next;
    } catch { /* Corrupt sessions are discarded. */ }
    hydrated.value = true;
  }

  function isCompleted(slug: string) {
    return !!completed.value[slug];
  }

  function reset() {
    completed.value = {};
    hydrated.value = false;
  }

  return { completed, hydrated, hydrate, isCompleted, reset };
}
