import type { Exercise, Feedback } from '~/types/learning'
import type { EvaluationContext } from './evaluateResponse'
import { evaluateCoreDrills } from './evaluateCoreDrills'
import { evaluateFallback } from './evaluateFallback'
import { evaluateGrammarDrills } from './evaluateGrammarDrills'
import { evaluateGuidedExercise } from './evaluateGuidedExercise'
import { evaluateSyntaxDrills } from './evaluateSyntaxDrills'

export interface EvaluationInput {
  exercise: Exercise
  normalized: string
  context?: EvaluationContext
  target: string | undefined
  base: Feedback
}

export function evaluateExercise(exercise: Exercise, normalized: string, context?: EvaluationContext): Feedback {
  const target = exercise.target
  const base: Feedback = { 
    outcome: 'retry',
    message: '',
    target, 
    explanation: exercise.explanation, 
    skills: [...(exercise.skills || [])], 
    vocabulary: exercise.vocabulary, 
    grammar: exercise.grammar,
    idioms: exercise.idioms,
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

  // Speaking check
  if (context?.isSpeaking) {
    if (!base.skills.includes('speaking')) base.skills.push('speaking')
    if (!base.skills.includes('automaticity')) base.skills.push('automaticity')
    base.changeModifier = (base.changeModifier || 0) + 2
  }

  // Goal detection for missions
  const achievedGoalIds: string[] = []
  if (exercise.missionGoals) {
    exercise.missionGoals.forEach(goal => {
      if (goal.keywords?.some(k => normalized.includes(k.toLowerCase()))) {
        achievedGoalIds.push(goal.id)
        if (goal.setRegister) {
          base.requiredRegister = goal.setRegister
        }
      }
    })
    base.achievedGoalIds = achievedGoalIds
  }

  const input: EvaluationInput = { exercise, normalized, context, target, base }

  for (const handler of [
    evaluateGuidedExercise,
    evaluateCoreDrills,
    evaluateGrammarDrills,
    evaluateSyntaxDrills
  ]) {
    const feedback = handler(input)
    if (feedback) return feedback
  }

  return evaluateFallback(input)
}


