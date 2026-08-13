import type { Exercise, Feedback } from '~/types/learning'

export function normalizeAnswer(answer: string) {
  return answer.toLowerCase().trim().replace(/[.,!?]/g, '').replace(/\s+/g, ' ')
}

export function evaluateResponse(exercise: Exercise, answer: string): Feedback {
  const normalized = normalizeAnswer(answer)
  const target = exercise.target
  if (!normalized) return { outcome: 'retry', message: 'Type an answer to try it.', target, explanation: exercise.explanation, skills: exercise.skills }
  if (exercise.kind === 'info') return { outcome: 'correct', message: 'Take this idea with you into the next activity.', skills: exercise.skills }
  const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer)
  if (accepted.includes(normalized)) return { outcome: 'correct', message: 'That works naturally.', target, explanation: exercise.explanation, skills: exercise.skills }
  if (exercise.id === 'personalise-1' && normalized.includes('omdat') && normalized.length > 20) return { outcome: 'acceptable', message: 'Good personal answer. Keep practising this structure for more automatic use.', target, explanation: exercise.explanation, skills: exercise.skills }
  return { outcome: 'retry', message: 'Not quite yet. Compare your sentence with the useful pattern and try again.', target, correction: exercise.correction, explanation: exercise.explanation, skills: exercise.skills }
}