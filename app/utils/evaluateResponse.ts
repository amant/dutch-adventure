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
       explanation: `Try: ${words[0]} [verb] ${words[1]}...`,
       miniLesson: {
         title: 'Inversion (Word Order)',
         content: 'When a sentence starts with something other than the subject (like an adverb of time), the verb and subject must swap places.',
         example: {
           wrong: `${words[0]} ${words[1]} werk...`,
           right: `${words[0]} werk ${words[1]}...`
         }
       }
     }
  }
  return { found: false }
}

function checkPerfectTenseError(normalized: string) {
  const motionVerbs = ['gegaan', 'gekomen', 'gebleven', 'gebeurd', 'vertrokken']
  const words = normalized.split(' ')
  
  if (words.includes('heb') || words.includes('heeft') || words.includes('hebben')) {
    const verb = motionVerbs.find(v => words.includes(v))
    if (verb) {
      return {
        found: true,
        message: `Almost! Dutch uses 'zijn' with '${verb}'.`,
        miniLesson: {
          title: 'Zijn vs Hebben',
          content: 'Most verbs use "hebben" in the perfect tense, but verbs of motion or change of state often use "zijn".',
          example: {
            wrong: `Ik heb ${verb}`,
            right: `Ik ben ${verb}`
          }
        }
      }
    }
  }
  return { found: false }
}

function checkSeparableVerbError(normalized: string, target: string) {
  const separableVerbs = [
    { full: 'schoonmaken', stem: 'maak', prefix: 'schoon' },
    { full: 'opbellen', stem: 'bel', prefix: 'op' },
    { full: 'uitnodigen', stem: 'nodig', prefix: 'uit' },
    { full: 'voorbereiden', stem: 'bereid', prefix: 'voor' }
  ]
  
  for (const v of separableVerbs) {
    if (normalized.includes(v.full) && target.includes(v.stem) && target.includes(v.prefix)) {
      return {
        found: true,
        message: `In a main clause, '${v.full}' splits!`,
        miniLesson: {
          title: 'Separable Verbs',
          content: 'Some Dutch verbs split in simple sentences. The prefix goes to the very end of the clause.',
          example: {
            wrong: `Ik ${v.full} de kamer.`,
            right: `Ik ${v.stem} de kamer ${v.prefix}.`
          }
        }
      }
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
      explanation: inversionError.explanation,
      miniLesson: inversionError.miniLesson
    }
  }

  // Grammar Assistant: Perfect Tense
  const perfectError = checkPerfectTenseError(normalized)
  if (perfectError.found) {
    return { ...base, outcome: 'retry', message: perfectError.message, miniLesson: perfectError.miniLesson }
  }

  // Grammar Assistant: Separable Verbs
  const separableError = checkSeparableVerbError(normalized, target || '')
  if (separableError.found) {
    return { ...base, outcome: 'retry', message: separableError.message, miniLesson: separableError.miniLesson }
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