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

export interface EvaluationContext {
  timeLeft?: number
}

function checkInversionError(normalized: string) {
  const adverbs = ['gisteren', 'vandaag', 'morgen', 'soms', 'meestal', 'nu', 'daarna', 'toen']
  const pronouns = ['ik', 'je', 'jij', 'hij', 'zij', 'ze', 'het', 'we', 'wij', 'jullie']
  const words = normalized.split(' ')
  
  if (words.length >= 3 && adverbs.includes(words[0]) && pronouns.includes(words[1])) {
     return {
       found: true,
       message: `In Dutch, if you start with '${words[0]}', the verb must come next!`,
       explanation: `Try: ${words[0]} [verb] ${words[1]}...`
     }
  }
  return { found: false }
}

export function evaluateResponse(exercise: Exercise, answer: string, context?: EvaluationContext): Feedback {
  const normalized = normalizeAnswer(answer)
  const target = exercise.target
  const base: Feedback = { 
    outcome: 'retry',
    message: '',
    target, 
    explanation: exercise.explanation, 
    skills: [...exercise.skills], 
    vocabulary: exercise.vocabulary, 
    grammar: exercise.grammar,
    changeModifier: 0
  }

  // Automaticity check
  if (exercise.automaticitySeconds !== undefined) {
    if (!base.skills.includes('automaticity')) base.skills.push('automaticity')
    if (context?.timeLeft === 0) {
      base.changeModifier = (base.changeModifier || 0) - 5
    } else if (context?.timeLeft !== undefined && context.timeLeft > exercise.automaticitySeconds / 2) {
      base.changeModifier = (base.changeModifier || 0) + 4
    }
  }

  if (!normalized && exercise.kind === 'typed') {
    return { ...base, outcome: 'retry', message: 'Type an answer to try it.' }
  }

  if (exercise.kind === 'info' || exercise.kind === 'reading') {
    return { ...base, outcome: 'correct', message: 'Notice this pattern for the next activity.' }
  }

  const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[]
  
  if (accepted.includes(normalized)) {
    return { ...base, outcome: 'correct', message: 'That sounds perfectly natural!' }
  }

  // Grammar Assistant: Inversion Check
  const inversionError = checkInversionError(normalized)
  if (inversionError.found) {
    if (!base.skills.includes('automaticity')) base.skills.push('automaticity') // Inversion mistakes slow you down
    return { 
      ...base, 
      outcome: 'retry', 
      message: inversionError.message, 
      explanation: inversionError.explanation 
    }
  }

  // Spelling check
  if (isSpellingMistake(normalized, accepted)) {
    if (!base.skills.includes('spelling')) base.skills.push('spelling')
    return { ...base, outcome: 'acceptable', message: 'Almost! Watch out for that small spelling mistake.', correction: exercise.correction || target }
  }

  // Heuristic for personalised answers / conversations
  if (exercise.id.includes('personalise') || exercise.kind === 'conversation') {
    const hasGrammar = exercise.grammar?.every(g => normalized.includes(g.toLowerCase())) ?? true
    if (normalized.length > 10 && hasGrammar) {
      return { ...base, outcome: 'acceptable', message: 'Good effort! Your answer is understandable and uses the pattern.' }
    }
  }

  return { ...base, outcome: 'retry', message: 'Not quite. Check the word order or spelling and try again.', correction: exercise.correction }
}