import type { Feedback } from '~/types/learning';
import type { EvaluationInput } from './evaluateExercise';
import * as helpers from './evaluationHelpers';

export function evaluateCoreDrills(input: EvaluationInput): Feedback | undefined {
  const { exercise, normalized, context, target, base } = input;
  const { normalizeAnswer, calculateSimilarity, checkIndirectQuestionError, checkSubordinateClauseError } = helpers;

  // Er-Drill Evaluation
  if (exercise.kind === 'er-drill' && exercise.erDrillData) {
    const correctOption = exercise.erDrillData.options.find(o => o.isCorrect);
    if (normalized === normalizeAnswer(correctOption?.text || '')) {
      return {
        ...base,
        outcome: 'correct',
        message: 'Perfect! You identified the correct usage.',
        changeModifier: (base.changeModifier || 0) + 3,
      };
    } else {
      return {
        ...base,
        outcome: 'retry',
        message: 'Not quite. That function or placement doesn\'t fit this context.',
        explanation: exercise.erDrillData.explanation || 'Review the role of "er" in this sentence.',
      };
    }
  }

  // Pronominal-Drill Evaluation
  if (exercise.kind === 'pronominal-drill' && exercise.pronominalData) {
    const correct = normalizeAnswer(exercise.target || '');
    if (normalized === correct) {
      if (!base.skills.includes('production')) base.skills.push('production');
      return {
        ...base,
        outcome: 'correct',
        message: 'Perfect combination! You successfully merged the preposition and the reference word.',
        changeModifier: (base.changeModifier || 0) + 15,
      };
    } else {
      return {
        ...base,
        outcome: 'retry',
        message: 'That combination is not quite right.',
        explanation: exercise.explanation || `In Dutch, we merge "${exercise.pronominalData.preposition}" and "${exercise.pronominalData.object}" into "${correct}".`,
      };
    }
  }

  // Passive Drill Evaluation
  if (exercise.kind === 'passive-drill' && exercise.passiveData) {
    const target = normalizeAnswer(exercise.target || '');
    const containsDoor = normalized.includes(' door ');
    const containsWorden = normalized.includes('wordt') || normalized.includes('worden') || normalized.includes('werd');
    const containsZijn = normalized.includes(' is ') || normalized.includes(' zijn ') || normalized.includes(' was ');

    if (normalized === target) {
      if (!base.skills.includes('production')) base.skills.push('production');
      return {
        ...base,
        outcome: 'correct',
        message: 'Excellent passive transformation! Your word order and auxiliary choice are perfect.',
        changeModifier: (base.changeModifier || 0) + 20,
      };
    } else if (exercise.passiveData.focus === 'er-passive' && !normalized.startsWith('er ')) {
      return {
        ...base,
        outcome: 'retry',
        message: 'This impersonal construction should start with "Er".',
        explanation: 'In Dutch, we use "Er wordt..." to focus on the action when there is no specific subject.',
      };
    } else if (exercise.passiveData.agent && !containsDoor) {
      return {
        ...base,
        outcome: 'acceptable',
        message: 'Good passive structure, but you forgot to mention the agent (the "door" phrase).',
        teacherCorrection: {
          natural: exercise.target || '',
          explanation: `The agent in a passive sentence is introduced by the preposition "door".`,
        },
      };
    }
  }

  // Nominalisation Drill Evaluation
  if (exercise.kind === 'nominalisation-drill' && exercise.nominalisationData) {
    const target = normalizeAnswer(exercise.target || '');
    const targetNoun = exercise.nominalisationData.targetNoun.toLowerCase();
    const escapedTargetNoun = targetNoun.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const containsTargetNoun = new RegExp(`\\b${escapedTargetNoun}\\b`).test(normalized);

    if (normalized === target) {
      if (!base.skills.includes('production')) base.skills.push('production');
      return {
        ...base,
        outcome: 'correct',
        message: 'Excellent formal phrasing! You successfully transformed the verbal expression.',
        changeModifier: (base.changeModifier || 0) + 20,
      };
    } else if (containsTargetNoun) {
      return {
        ...base,
        outcome: 'acceptable',
        message: 'Good start. You used the target noun, but the sentence structure could be more formal.',
        teacherCorrection: {
          natural: exercise.target || '',
          explanation: `The formal version usually starts with the nominalised subject: "De ${exercise.nominalisationData.targetNoun} van..."`,
        },
      };
    } else {
      return {
        ...base,
        outcome: 'retry',
        message: 'Try to use the noun-based version to sound more formal.',
        explanation: `In formal Dutch, we often use "${exercise.nominalisationData.targetNoun}" instead of the verbal form.`,
      };
    }
  }

  // Reframing-Drill Evaluation
  if (exercise.kind === 'reframing-drill' && exercise.reframingData) {
    const softeners = exercise.reframingData.softeningElements || [];
    const usedSofteners = softeners.filter(s => normalized.includes(s.toLowerCase()));

    const pragmaticScore = Math.min(100, (usedSofteners.length / Math.max(1, softeners.length)) * 100);

    if (usedSofteners.length > 0) {
      if (!base.skills.includes('pragmatic')) base.skills.push('pragmatic');

      return {
        ...base,
        outcome: pragmaticScore > 60 ? 'correct' : 'acceptable',
        message: pragmaticScore > 60
          ? 'Excellent diplomacy! Your reframe sounds much more professional.'
          : 'Good effort, but you could add more softening markers to sound even more natural.',
        pragmaticScore,
        changeModifier: (base.changeModifier || 0) + (usedSofteners.length * 5),
      };
    } else {
      return {
        ...base,
        outcome: 'retry',
        message: 'Your response still sounds a bit too direct for this context. Try using some of the suggested softeners.',
        explanation: 'In professional Dutch, we often use words like "misschien", "zou", or "eventueel" to soften direct statements.',
      };
    }
  }

  // Reported Speech Drill Evaluation
  if (exercise.kind === 'reported-speech-drill' && exercise.reportedSpeechData) {
    const target = normalizeAnswer(exercise.target || '');
    const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[];

    const indirectQuestionErr = checkIndirectQuestionError(normalized);
    if (indirectQuestionErr.found) {
      return {
        ...base,
        outcome: 'acceptable',
        message: indirectQuestionErr.message,
        miniLesson: indirectQuestionErr.miniLesson,
        teacherCorrection: {
          natural: exercise.target || '',
          explanation: 'Remember to use "of" instead of "als" when embedding a yes/no question.',
        },
      };
    }

    if (accepted.includes(normalized)) {
      if (!base.skills.includes('production')) base.skills.push('production');
      if (!base.skills.includes('grammar')) base.skills.push('grammar');
      return {
        ...base,
        outcome: 'correct',
        message: 'Excellent reporting! Your conjunction, pronoun shift, and subclause word order are spotless.',
        changeModifier: (base.changeModifier || 0) + 20,
      };
    }

    // Check for SVO inside dat/of clause (verbs not at the end)
    const subclauseErrDat = checkSubordinateClauseError(normalized, 'dat');
    const subclauseErrOf = checkSubordinateClauseError(normalized, 'of');
    if (subclauseErrDat.found || subclauseErrOf.found) {
      const err = subclauseErrDat.found ? subclauseErrDat : subclauseErrOf;
      return {
        ...base,
        outcome: 'retry',
        message: 'In reported speech, all verbs must go to the end of the embedded subclause.',
        explanation: err.message,
        miniLesson: err.miniLesson,
      };
    }

    const similarity = calculateSimilarity(normalized, target);
    if (similarity > 0.75) {
      return {
        ...base,
        outcome: 'acceptable',
        message: 'Very close! Notice the exact word order or pronoun in the target reporting.',
        teacherCorrection: {
          natural: exercise.target || '',
          explanation: exercise.explanation || 'Make sure the verbs are placed together at the end of the clause.',
        },
      };
    } else {
      return {
        ...base,
        outcome: 'retry',
        message: 'Not quite. Check how the quote transforms into an indirect clause.',
        explanation: exercise.explanation || 'Start with the reporting clause, use "dat" or "of", and move verbs to the end.',
      };
    }
  }

  return undefined;
}
