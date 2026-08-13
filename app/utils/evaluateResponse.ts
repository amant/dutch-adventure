import type { Exercise, Feedback } from '~/types/learning'

export function normalizeAnswer(answer: string) {
  return answer.toLowerCase().trim().replace(/[.,!?]/g, '').replace(/\s+/g, ' ')
}

function isSpellingMistake(normalized: string, accepted: string[]) {
  return accepted.some(a => {
    if (Math.abs(a.length - normalized.length) > 1) return false
    let diffs = 0
    const len = Math.min(a.length, normalized.length)
    for (let i = 0; i < len; i++) {
      if (a[i] !== normalized[i]) diffs++
    }
    diffs += Math.abs(a.length - normalized.length)
    return diffs > 0 && diffs <= 2
  })
}

export function evaluateResponse(exercise: Exercise, answer: string): Feedback {
  const normalized = normalizeAnswer(answer)
  const target = exercise.target
  const base = { target, explanation: exercise.explanation, skills: [...exercise.skills], vocabulary: exercise.vocabulary, grammar: exercise.grammar }

  if (!normalized && exercise.kind === 'typed') {
    return { ...base, outcome: 'retry', message: 'Type an answer to try it.' }
  }

  if (exercise.kind === 'info') {
    return { ...base, outcome: 'correct', message: 'Notice this pattern for the next activity.' }
  }

  const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[]
  
  if (accepted.includes(normalized)) {
    return { ...base, outcome: 'correct', message: 'That sounds perfectly natural!' }
  }

  // Spelling check
  if (isSpellingMistake(normalized, accepted)) {
    if (!base.skills.includes('spelling')) base.skills.push('spelling')
    return { ...base, outcome: 'acceptable', message: 'Almost! Watch out for that small spelling mistake.', correction: exercise.correction || target }
  }

  // Heuristic for personalised answers
  if (exercise.id.includes('personalise')) {
    const hasGrammar = exercise.grammar?.every(g => normalized.includes(g.toLowerCase())) ?? true
    if (normalized.length > 10 && hasGrammar) {
      return { ...base, outcome: 'acceptable', message: 'Good effort! Your answer is understandable and uses the pattern.' }
    }
  }

  return { ...base, outcome: 'retry', message: 'Not quite. Check the word order or spelling and try again.', correction: exercise.correction }
}