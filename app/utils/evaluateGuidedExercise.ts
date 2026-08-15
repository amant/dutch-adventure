import type { Feedback } from '~/types/learning'
import type { EvaluationInput } from './evaluateExercise'
import * as helpers from './evaluationHelpers'

export function evaluateGuidedExercise(input: EvaluationInput): Feedback | undefined {
  const { exercise, normalized, context, target, base } = input
  const { normalizeAnswer, calculateSimilarity } = helpers

    if (exercise.kind === 'induction' && exercise.inductionData) {
      const selectedOption = exercise.inductionData.options.find(
        option => normalizeAnswer(option.text) === normalized
      )

      if (selectedOption?.isCorrect) {
        return {
          ...base,
          outcome: 'correct',
          message: 'Correct! You identified the pattern.',
          changeModifier: (base.changeModifier || 0) + 3
        }
      }

      return {
        ...base,
        outcome: 'retry',
        message: 'Not quite. Check the examples and try again.',
        explanation: 'Look for the word or structure that appears in the relevant examples.'
      }
    }

    // Morphing Drill Evaluation
    if (exercise.kind === 'morphing-drill' && exercise.morphingData) {
      const stepIndex = context?.morphingStepIndex ?? 0
      const step = exercise.morphingData.steps[stepIndex]
      if (step) {
        const stepTarget = normalizeAnswer(step.target)
        
        if (normalized === stepTarget) {
          const isFinalStep = stepIndex === exercise.morphingData.steps.length - 1
          return {
            ...base,
            outcome: 'correct',
            message: isFinalStep ? 'Final morph complete! You successfully evolved the sentence.' : 'Step correct! Now for the next change.',
            changeModifier: (base.changeModifier || 0) + 2
          }
        } else {
          return {
            ...base,
            outcome: 'retry',
            message: 'That change doesn\'t look quite right.',
            explanation: step.hint || `Try to focus on: ${step.instruction}`
          }
        }
      }
    }

    // Listening Cloze Evaluation
    if (exercise.kind === 'listening-cloze' && exercise.clozeData) {
      const userAnswers = context?.clozeAnswers || []
      const correctAnswers = exercise.clozeData.answers
      
      const mistakes: number[] = []
      userAnswers.forEach((ans, idx) => {
        const expected = correctAnswers[idx] || ''
        if (normalizeAnswer(ans || '') !== normalizeAnswer(expected)) {
          mistakes.push(idx)
        }
      })
      
      if (mistakes.length === 0) {
        return {
          ...base,
          outcome: 'correct',
          message: 'Excellent transcription! You caught every word.',
          changeModifier: (base.changeModifier || 0) + 2
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: `You missed ${mistakes.length} word${mistakes.length > 1 ? 's' : ''}. Listen again carefully!`,
          explanation: 'Focus on the words marked by the gaps.'
        }
      }
    }

    // Shadowing check
    if (context?.isShadowing) {
      const targetText = normalizeAnswer(exercise.transcript || exercise.target || '')
      const score = calculateSimilarity(normalized, targetText)
      
      if (score > 0.85) {
        return {
          ...base,
          outcome: 'correct',
          message: 'Excellent flow! You matched the native pace and rhythm perfectly.',
          isShadowing: true,
          natural: exercise.transcript || exercise.target,
          skills: [...base.skills, 'speaking', 'automaticity'],
          changeModifier: (base.changeModifier || 0) + 8
        }
      } else if (score > 0.6) {
        return {
          ...base,
          outcome: 'acceptable',
          message: 'Good attempt, but your rhythm was a bit off. Try to mimic the speaker more closely.',
          isShadowing: true,
          skills: [...base.skills, 'speaking', 'automaticity'],
          changeModifier: (base.changeModifier || 0) + 2
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: 'That was a bit stumbling. Listen to the audio again and try to repeat it in one smooth breath.',
          isShadowing: true
        }
      }
    }

    // Mediation check
    if (exercise.kind === 'mediation' && exercise.mediationPoints) {
      const achievedPoints = exercise.mediationPoints.filter(point => 
        point.keywords.some(k => normalized.includes(k.toLowerCase()))
      )
      
      if (achievedPoints.length === exercise.mediationPoints.length) {
        return {
          ...base,
          outcome: 'correct',
          message: 'Excellent mediation! You captured all the key information accurately.',
          mediationPointsAchieved: achievedPoints.map(p => p.id),
          changeModifier: (base.changeModifier || 0) + 5
        }
      } else if (achievedPoints.length > 0) {
        return {
          ...base,
          outcome: 'acceptable',
          message: `Good start, but you missed some points: ${exercise.mediationPoints.filter(p => !achievedPoints.find(ap => ap.id === p.id)).map(p => p.label).join(', ')}.`,
          mediationPointsAchieved: achievedPoints.map(p => p.id),
          changeModifier: (base.changeModifier || 0) + 2
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: 'You need to include the key points from the source material in your Dutch explanation.'
        }
      }
    }

    // Correction Challenge check
    if (exercise.kind === 'correction-challenge' && exercise.correctionData) {
      const remainingMistakes = exercise.correctionData.mistakes.filter(m => 
        normalized.includes(normalizeAnswer(m.segment)) || !normalized.includes(normalizeAnswer(m.correction))
      )
      
      if (remainingMistakes.length === 0) {
        return {
          ...base,
          outcome: 'correct',
          message: 'Excellent eye! You spotted and fixed all the errors in the text.',
          changeModifier: (base.changeModifier || 0) + 5
        }
      } else {
        const foundFixed = exercise.correctionData.mistakes.length - remainingMistakes.length
        return {
          ...base,
          outcome: 'retry',
          message: `You've fixed ${foundFixed} out of ${exercise.correctionData.mistakes.length} errors. Keep looking!`,
          explanation: remainingMistakes[0] ? `Focus on: ${remainingMistakes[0].explanation}` : undefined
        }
      }
    }

    // Circumlocution Evaluation
    if (exercise.kind === 'circumlocution' && exercise.circumlocutionData) {
      const hasForbidden = exercise.forbiddenWords?.some(w => normalized.includes(w.toLowerCase()))
      if (hasForbidden) {
        const forbidden = exercise.forbiddenWords?.find(w => normalized.includes(w.toLowerCase()))
        return { ...base, outcome: 'retry', message: `Oops! You used a forbidden word: '${forbidden}'. Try to explain it without that word.` }
      }

      const missingKeywords = exercise.circumlocutionData.requiredKeywords.filter(kw => !normalized.includes(kw.toLowerCase()))
      
      if (missingKeywords.length > 0) {
        return { 
          ...base, 
          outcome: 'retry', 
          message: "You're on the right track, but your description isn't quite clear enough yet.",
          explanation: "Try to be more specific about the purpose or function of the concept."
        }
      }

      if (exercise.minimumLength && normalized.length < exercise.minimumLength) {
        return { 
          ...base, 
          outcome: 'retry', 
          message: "Your description is a bit too short for a B2 level. Can you expand on it?",
          explanation: "Use full sentences to explain the nuances."
        }
      }

      return {
        ...base,
        outcome: 'correct',
        message: `Great description! You successfully explained '${exercise.circumlocutionData.concept}' without the easy terms.`,
        changeModifier: (base.changeModifier || 0) + 5
      }
    }

    // Nuance Drill Evaluation
    if (exercise.kind === 'nuance-drill') {
      const particles = ['even', 'hoor', 'maar', 'toch', 'nou', 'eens', 'misschien', 'eigenlijk']
      const usedParticles = particles.filter(p => normalized.includes(p))
      
      if (usedParticles.length === 0) {
        return { 
          ...base, 
          outcome: 'retry', 
          message: "Technically correct, but still a bit stiff. Can you add a modal particle to soften it?",
          explanation: "Try adding 'even', 'hoor', or 'maar' to sound more natural."
        }
      }
      
      return {
        ...base,
        outcome: 'correct',
        message: `Nice! Adding '${usedParticles[0]}' makes the sentence sound much more natural.`,
        changeModifier: (base.changeModifier || 0) + 3,
        pragmaticScore: 85
      }
    }

    // Collocation Drill Evaluation
    if (exercise.kind === 'collocation-drill') {
      if (exercise.target && normalized === exercise.target.toLowerCase()) {
        return {
          ...base,
          outcome: 'correct',
          message: "Exactly! That's the most natural pairing.",
          changeModifier: (base.changeModifier || 0) + 2
        }
      } else if (exercise.forbiddenWords?.some(w => normalized.includes(w.toLowerCase()))) {
        return {
          ...base,
          outcome: 'retry',
          message: "That's an 'Anglicism' or a literal translation. It's technically understandable, but not how a native speaker would say it.",
          explanation: "In Dutch, we use specific verbs with certain nouns. For example, you 'take' a decision (besluit nemen) rather than 'make' it."
        }
      }
      return { ...base, outcome: 'retry', message: "Not quite the most natural word. Try another option!" }
    }

    // Understatement Drill Evaluation
    if (exercise.kind === 'understatement-drill') {
      const positiveWords = ['geweldig', 'super', 'fantastisch', 'mooi', 'goed', 'leuk']
      const hasPositive = positiveWords.some(w => normalized.includes(w))
      
      const understatements = ['niet verkeerd', 'niet slecht', 'valt wel mee', 'best wel', 'aardig']
      const hasUnderstatement = understatements.some(u => normalized.includes(u))

      if (hasPositive && !hasUnderstatement) {
        return { 
          ...base, 
          outcome: 'retry', 
          message: "A bit too direct! Can you express this in a more typically Dutch, understated way?",
          explanation: "Try using 'niet verkeerd' or 'valt wel mee' to sound more native."
        }
      }
      
      if (hasUnderstatement) {
        return {
          ...base,
          outcome: 'correct',
          message: "Exactly! That's the Dutch way. Subtle and understated.",
          changeModifier: (base.changeModifier || 0) + 3,
          pragmaticScore: 90,
          pragmaticFeedback: "Dutch speakers often prefer 'not bad' over 'amazing'. You nailed the cultural nuance!"
        }
      }
    }

    // Cohesion Drill Evaluation
    if (exercise.kind === 'cohesion-drill') {
      const targetText = normalizeAnswer(exercise.target || '')
      if (normalized === targetText) {
        return {
          ...base,
          outcome: 'correct',
          message: 'Excellent! You reordered the sentences into a logical, coherent paragraph.',
          changeModifier: (base.changeModifier || 0) + 4
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: 'The logic isn\'t quite right yet. Look at the transitions between sentences.',
          explanation: exercise.explanation || 'Try to identify the introduction, the supporting points, and the conclusion.'
        }
      }
    }

    // Summary Challenge Evaluation
    if (exercise.kind === 'summary-challenge' && exercise.summaryPoints) {
      const captured = exercise.summaryPoints.filter(point => 
        point.keywords.some(k => normalized.includes(k.toLowerCase()))
      )
      
      const missing = exercise.summaryPoints.filter(p => !captured.find(cp => cp.id === p.id))
      
      if (missing.length === 0) {
        return {
          ...base,
          outcome: 'correct',
          message: 'Great summary! You captured all the essential information from the article.',
          changeModifier: (base.changeModifier || 0) + 5
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: `You're missing some key information: ${missing.map(m => m.label).join(', ')}.`,
          explanation: missing[0] ? `Try to incorporate more details about: ${missing[0].label}.` : undefined
        }
      }
    }


  return undefined
}

