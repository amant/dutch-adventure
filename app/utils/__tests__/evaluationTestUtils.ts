import type { Exercise, Feedback } from '~/types/learning';
import type { EvaluationContext } from '~/utils/evaluateResponse';
import type { EvaluationInput } from '~/utils/evaluateExercise';
import { normalizeAnswer } from '~/utils/evaluationHelpers';

/**
 * Builds a minimal Exercise. Mirrors the helper used by the other
 * evaluateResponse test suites so every new module test starts from the
 * same baseline.
 */
export function makeExercise(overrides: Partial<Exercise> = {}): Exercise {
  return {
    id: 'test-exercise',
    kind: 'typed',
    prompt: 'Schrijf de zin in het Nederlands.',
    skills: ['production'],
    ...overrides,
  };
}

/**
 * Builds the EvaluationInput the drill handlers receive. The base Feedback is
 * constructed exactly like `evaluateExercise` does so direct handler tests
 * exercise the same contract as the dispatcher.
 */
export function makeInput(exercise: Exercise, answer: string, context?: EvaluationContext): EvaluationInput {
  const target = exercise.target;
  const normalized = normalizeAnswer(answer);
  const base: Feedback = {
    outcome: 'retry',
    message: '',
    target,
    explanation: exercise.explanation,
    skills: [...(exercise.skills || [])],
    vocabulary: exercise.vocabulary,
    grammar: exercise.grammar,
    idioms: exercise.idioms,
    changeModifier: 0,
  };
  return { exercise, normalized, context, target, base };
}
