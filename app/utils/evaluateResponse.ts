import type { Exercise, Feedback } from '~/types/learning';
import { calculatePragmaticScore, checkCoherenceConnectors } from './evaluationHelpers';
import { evaluateExercise } from './evaluateExercise';

export function normalizeAnswer(answer: string) {
  return answer.toLowerCase().trim().replace(/[.,!?]/g, '').replace(/\s+/g, ' ');
}
export interface EvaluationContext {
  timeLeft?: number;
  isSpeaking?: boolean;
  isShadowing?: boolean;
  overrideRegister?: 'formal' | 'informal';
  morphingStepIndex?: number;
  clozeAnswers?: string[];
}

export function evaluateResponse(exercise: Exercise, answer: string, context?: EvaluationContext): Feedback {
  const normalized = normalizeAnswer(answer);
  const feedback = evaluateExercise(exercise, normalized, context);

  // Add Pragmatic Analysis for correct/acceptable answers
  if (feedback.outcome !== 'retry') {
    if (feedback.pragmaticScore === undefined) {
      const pragmatics = calculatePragmaticScore(normalized, exercise);
      feedback.pragmaticScore = pragmatics.score;
      feedback.pragmaticFeedback = pragmatics.feedback;
      if (pragmatics.score > 70 && !feedback.skills.includes('pragmatic')) {
        feedback.skills.push('pragmatic');
      }
    }

    // Coherence Analysis
    const coherence = checkCoherenceConnectors(normalized);
    if (coherence.found.length > 0) {
      if (!feedback.skills.includes('coherence')) feedback.skills.push('coherence');
      feedback.changeModifier = (feedback.changeModifier || 0) + (coherence.found.length * 2);
      if (!feedback.pragmaticFeedback) feedback.pragmaticFeedback = `Excellent logical flow! You used these connectors: ${coherence.found.join(', ')}.`;
      else feedback.pragmaticFeedback += ` Also, great use of logical connectors like '${coherence.found[0]}'.`;
    }

    // Idiom detection
    if (exercise.idioms) {
      const foundIdiom = exercise.idioms.find(i => normalized.includes(i.toLowerCase().replace(/[.,!?]/g, '')));
      if (foundIdiom) {
        if (!feedback.skills.includes('idiomatic')) feedback.skills.push('idiomatic');
        feedback.changeModifier = (feedback.changeModifier || 0) + 15;
        if (feedback.outcome === 'correct') {
          feedback.message = `Fantastic! You used the idiom '${foundIdiom}' correctly.`;
        }
      }
    }
  }

  // Add teacher correction if provided and the answer wasn't a complete failure
  if (exercise.correction && feedback.outcome !== 'retry') {
    feedback.teacherCorrection = {
      natural: exercise.correction,
      explanation: exercise.explanation || 'Here is how to say it more naturally.',
    };
  }

  return feedback;
}
