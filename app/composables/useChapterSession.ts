import type { Attempt, Chapter, Feedback, PersistedSession } from '~/types/learning'
import { evaluateResponse, type EvaluationContext } from '~/utils/evaluateResponse'
import { useLearnerMemory } from '~/composables/useLearnerMemory'

const key = (slug: string) => `dutch-adventure-session-${slug}`
const fresh = (chapter: Chapter): PersistedSession => ({ 
  chapterSlug: chapter.slug, 
  stageIndex: 0, 
  exerciseIndex: 0, 
  attempts: [], 
  completed: false, 
  memory: { 
    overall: { recognition: 0, meaning: 0, production: 0, automaticity: 0, listening: 0, speaking: 0, spelling: 0 },
    vocabulary: {},
    grammar: {}
  } 
})

export function useChapterSession(chapter: Chapter) {
  const state = useState<PersistedSession>(`chapter-session-${chapter.slug}`, () => fresh(chapter))
  const response = ref('')
  const hydrated = useState(`chapter-session-hydrated-${chapter.slug}`, () => false)
  const learnerMemory = useLearnerMemory()

  const stage = computed(() => chapter.stages[state.value.stageIndex])
  const exercise = computed(() => stage.value?.exercises[state.value.exerciseIndex])
  const lastAttempt = computed(() => state.value.attempts[state.value.attempts.length - 1])

  function persist() { if (import.meta.client) localStorage.setItem(key(chapter.slug), JSON.stringify(state.value)) }
  function hydrate() {
    learnerMemory.hydrate()
    if (hydrated.value || !import.meta.client) return
    try {
      const parsed = JSON.parse(localStorage.getItem(key(chapter.slug)) ?? '')
      if (parsed?.chapterSlug === chapter.slug && Array.isArray(parsed.attempts)) {
        // Simple merge/sanitization for the session state
        state.value = { ...fresh(chapter), ...parsed }
      }
    } catch { /* Corrupt sessions are discarded. */ }
    hydrated.value = true
  }
  function submit(answer = response.value, context?: EvaluationContext): Feedback | undefined {
    if (!exercise.value) return
    const feedback = evaluateResponse(exercise.value, answer, context)
    const attempt: Attempt = { exerciseId: exercise.value.id, answer, feedback, createdAt: new Date().toISOString() }
    state.value.attempts = [...state.value.attempts, attempt]
    learnerMemory.record(feedback.skills, feedback.outcome, feedback.vocabulary, feedback.grammar, feedback.changeModifier)
    persist()
    response.value = ''
    return feedback
  }
  function advance() {
    if (state.value.exerciseIndex < stage.value.exercises.length - 1) state.value.exerciseIndex++
    else if (state.value.stageIndex < chapter.stages.length - 1) { state.value.stageIndex++; state.value.exerciseIndex = 0 }
    else state.value.completed = true
    persist()
  }
  function reset() { state.value = fresh(chapter); response.value = ''; persist() }
  return { state, response, hydrated, stage, exercise, lastAttempt, hydrate, submit, advance, reset, memory: learnerMemory.memory }
}