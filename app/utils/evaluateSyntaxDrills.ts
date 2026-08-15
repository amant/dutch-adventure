import type { Feedback } from '~/types/learning';
import type { EvaluationInput } from './evaluateExercise';
import * as helpers from './evaluationHelpers';

export function evaluateSyntaxDrills(input: EvaluationInput): Feedback | undefined {
  const { exercise, normalized, context, target, base } = input;
  const { normalizeAnswer, calculateSimilarity, sharesContentWords, checkFixedPrepositionRegimeError, checkMidfieldOrderError, checkPrefixVerbError, checkPronominalSplittingError, checkAspectError, checkModalParticleError, checkTopicalisationError } = helpers;

  // Separable vs. Inseparable Prefix Verb Drill Evaluation
  if (exercise.kind === 'prefix-verb-drill' && exercise.prefixVerbData) {
    const target = normalizeAnswer(exercise.target || '');
    const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[];

    const prefixError = checkPrefixVerbError(normalized, exercise.prefixVerbData);
    if (prefixError.found) {
      return {
        ...base,
        outcome: 'acceptable',
        message: prefixError.message,
        miniLesson: prefixError.miniLesson,
        teacherCorrection: {
          natural: exercise.target || '',
          explanation: 'Remember: stressed prefixes (vóórkomen, óndergaan, óverleggen) split in main clauses and take "ge-" between prefix and stem, while unstressed prefixes (voorkómen, achterhálen, ondergáán, doorbréken) never split and do not take "ge-".',
        },
      };
    }

    if (accepted.includes(normalized)) {
      if (!base.skills.includes('production')) base.skills.push('production');
      if (!base.skills.includes('grammar')) base.skills.push('grammar');
      return {
        ...base,
        outcome: 'correct',
        message: 'Uitstekend! Correct prefix verb conjugation, split behavior, and stress-semantics applied.',
        changeModifier: (base.changeModifier || 0) + 20,
      };
    }

    const similarity = calculateSimilarity(normalized, target);
    if (similarity > 0.75) {
      return {
        ...base,
        outcome: 'acceptable',
        message: 'Very close! Check whether the prefix should split, the participle form (with or without "ge-"), or "te" placement.',
        teacherCorrection: {
          natural: exercise.target || '',
          explanation: exercise.explanation || 'Verify whether this prefix verb is separable or inseparable in this context.',
        },
      };
    } else {
      return {
        ...base,
        outcome: 'retry',
        message: 'Not quite. Check the prefix verb conjugation and split rules.',
        explanation: exercise.explanation || 'Conjugate the prefix verb according to its stress pattern and target structure.',
      };
    }
  }

  // Midfield Word Order & Syntactic Architecture Drill Evaluation
  if (exercise.kind === 'midfield-drill') {
    const target = normalizeAnswer(exercise.target || '');
    const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[];

    if (accepted.includes(normalized)) {
      if (!base.skills.includes('production')) base.skills.push('production');
      if (!base.skills.includes('grammar')) base.skills.push('grammar');
      return {
        ...base,
        outcome: 'correct',
        message: 'Uitstekend! Perfect Dutch midfield word order and syntactic sequencing.',
        changeModifier: (base.changeModifier || 0) + 20,
      };
    }

    const midfieldError = checkMidfieldOrderError(normalized, exercise.midfieldData);
    if (midfieldError.found) {
      return {
        ...base,
        outcome: 'acceptable',
        message: midfieldError.message,
        miniLesson: midfieldError.miniLesson,
        teacherCorrection: {
          natural: exercise.target || '',
          explanation: 'Remember the Dutch midfield hierarchy: Definite Object -> Tijd (Time) -> Manier (Manner) -> Negatie (Niet) -> Plaats (Place) -> Indefinite Object.',
        },
      };
    }

    const similarity = calculateSimilarity(normalized, target);
    if (similarity > 0.75) {
      return {
        ...base,
        outcome: 'acceptable',
        message: 'Very close! Check the relative ordering of Time, Manner, Place, Direct Object, and Negation.',
        teacherCorrection: {
          natural: exercise.target || '',
          explanation: exercise.explanation || 'Verify the positions of Time, Manner, Place, and Objects in the midfield.',
        },
      };
    } else {
      return {
        ...base,
        outcome: 'retry',
        message: 'Not quite. Reorder the constituents according to Dutch TMP and object placement rules.',
        explanation: exercise.explanation || 'Construct the sentence following: [Subject] + [Verb] + [Definite Object] + [Time] + [Manner] + [Niet] + [Place] + [Indefinite Object].',
      };
    }
  }

  // Fixed Prepositions & Prepositional Regimes Drill Evaluation
  if (exercise.kind === 'fixed-preposition-drill') {
    const target = normalizeAnswer(exercise.target || '');
    const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[];

    if (accepted.includes(normalized)) {
      if (!base.skills.includes('production')) base.skills.push('production');
      if (!base.skills.includes('grammar')) base.skills.push('grammar');
      return {
        ...base,
        outcome: 'correct',
        message: 'Uitstekend! Perfect use of the fixed Dutch preposition and natural sentence structure.',
        changeModifier: (base.changeModifier || 0) + 20,
      };
    }

    const prepRegimeError = checkFixedPrepositionRegimeError(normalized, exercise.fixedPrepositionData);
    if (prepRegimeError.found) {
      return {
        ...base,
        outcome: 'acceptable',
        message: prepRegimeError.message,
        miniLesson: prepRegimeError.miniLesson,
        teacherCorrection: {
          natural: exercise.target || '',
          explanation: `Remember the fixed preposition regime: '${exercise.fixedPrepositionData?.governingHead || 'het woord'}' takes '${exercise.fixedPrepositionData?.fixedPreposition || 'het vaste voorzetsel'}'.`,
        },
      };
    }

    const similarity = calculateSimilarity(normalized, target);
    if (similarity > 0.75) {
      return {
        ...base,
        outcome: 'acceptable',
        message: `Very close! Make sure to pair '${exercise.fixedPrepositionData?.governingHead || 'het woord'}' with '${exercise.fixedPrepositionData?.fixedPreposition || 'het vaste voorzetsel'}'.`,
        teacherCorrection: {
          natural: exercise.target || '',
          explanation: exercise.explanation || `Verify that you used '${exercise.fixedPrepositionData?.governingHead}' with '${exercise.fixedPrepositionData?.fixedPreposition}'.`,
        },
      };
    } else {
      return {
        ...base,
        outcome: 'retry',
        message: 'Not quite. Check the governing word, required fixed preposition, and word order.',
        explanation: exercise.explanation || `Combine '${exercise.fixedPrepositionData?.governingHead}' with '${exercise.fixedPrepositionData?.fixedPreposition}'.`,
      };
    }
  }

  // Pronominal Adverb Splitting Drill Evaluation
  if (exercise.kind === 'pronominal-splitting-drill') {
    const target = normalizeAnswer(exercise.target || '');
    const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[];

    if (accepted.includes(normalized)) {
      if (!base.skills.includes('production')) base.skills.push('production');
      if (!base.skills.includes('grammar')) base.skills.push('grammar');
      return {
        ...base,
        outcome: 'correct',
        message: 'Uitstekend! Perfect natural pronominal adverb splitting and word order.',
        changeModifier: (base.changeModifier || 0) + 20,
      };
    }

    const splittingError = checkPronominalSplittingError(normalized, exercise.pronominalSplittingData);
    if (splittingError.found) {
      return {
        ...base,
        outcome: 'acceptable',
        message: splittingError.message,
        miniLesson: splittingError.miniLesson,
        teacherCorrection: {
          natural: exercise.target || '',
          explanation: `Split '${exercise.pronominalSplittingData?.rWord || 'er'}' and '${exercise.pronominalSplittingData?.preposition || 'voorzetsel'}': place '${exercise.pronominalSplittingData?.rWord || 'er'}' early and '${exercise.pronominalSplittingData?.preposition || 'voorzetsel'}' before the verb cluster.`,
        },
      };
    }

    const similarity = calculateSimilarity(normalized, target);
    if (similarity > 0.75) {
      return {
        ...base,
        outcome: 'acceptable',
        message: 'Very close! Check the position of the R-word and the stranded preposition.',
        teacherCorrection: {
          natural: exercise.target || '',
          explanation: exercise.explanation || 'Place the R-word early in the clause and the stranded preposition immediately before the verb group.',
        },
      };
    } else {
      return {
        ...base,
        outcome: 'retry',
        message: 'Not quite. Separate the R-word from the preposition and follow Dutch midfield word order.',
        explanation: exercise.explanation || `Construct the sentence splitting '${exercise.pronominalSplittingData?.rWord || 'het R-woord'}' and '${exercise.pronominalSplittingData?.preposition || 'het voorzetsel'}'.`,
      };
    }
  }

  // Aspectual Verbs & Durative Constructions Drill Evaluation
  if (exercise.kind === 'aspect-drill') {
    const target = normalizeAnswer(exercise.target || '');
    const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[];

    if (accepted.includes(normalized)) {
      if (!base.skills.includes('production')) base.skills.push('production');
      if (!base.skills.includes('grammar')) base.skills.push('grammar');
      return {
        ...base,
        outcome: 'correct',
        message: 'Uitstekend! Flawless use of Dutch aspectual syntax and durative verb constructions.',
        changeModifier: (base.changeModifier || 0) + 20,
      };
    }

    const aspectError = checkAspectError(normalized, exercise.aspectData);
    if (aspectError.found && sharesContentWords(normalized, target)) {
      return {
        ...base,
        outcome: 'acceptable',
        message: aspectError.message,
        miniLesson: aspectError.miniLesson,
        teacherCorrection: {
          natural: exercise.target || '',
          explanation: `Use the correct aspectual construction: '${exercise.aspectData?.postureOrAspectVerb || 'het aspectuele werkwoord'}' + '${exercise.aspectData?.infinitiveAction || 'infinitief'}'.`,
        },
      };
    }

    const similarity = calculateSimilarity(normalized, target);
    if (similarity > 0.75) {
      return {
        ...base,
        outcome: 'acceptable',
        message: 'Very close! Make sure the posture/aspect verb and infinitive structure are correctly formed.',
        teacherCorrection: {
          natural: exercise.target || '',
          explanation: exercise.explanation || `Verify the aspectual construction: '${exercise.aspectData?.postureOrAspectVerb}'.`,
        },
      };
    } else {
      return {
        ...base,
        outcome: 'retry',
        message: 'Not quite. Check the aspectual verb, preposition/particle ("te" / "aan het"), and infinitive form.',
        explanation: exercise.explanation || `Construct the sentence with '${exercise.aspectData?.postureOrAspectVerb}'.`,
      };
    }
  }

  // Modal Particles & Pragmatic Shading Drill Evaluation
  if (exercise.kind === 'modal-particle-drill') {
    const target = normalizeAnswer(exercise.target || '');
    const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[];

    if (accepted.includes(normalized)) {
      if (!base.skills.includes('production')) base.skills.push('production');
      if (!base.skills.includes('pragmatic')) base.skills.push('pragmatic');
      if (!base.skills.includes('grammar')) base.skills.push('grammar');
      return {
        ...base,
        outcome: 'correct',
        message: 'Uitstekend! Perfect integration of Dutch modal particles with authentic pragmatic nuance and correct midfield placement.',
        changeModifier: (base.changeModifier || 0) + 20,
      };
    }

    const modalError = checkModalParticleError(normalized, exercise.modalParticleData);
    if (modalError.found && sharesContentWords(normalized, target)) {
      return {
        ...base,
        outcome: 'acceptable',
        message: modalError.message,
        miniLesson: modalError.miniLesson,
        teacherCorrection: {
          natural: exercise.target || '',
          explanation: `Include the particle cluster '${exercise.modalParticleData?.particleCluster || 'modale partikels'}' in the inner midfield.`,
        },
      };
    }

    const similarity = calculateSimilarity(normalized, target);
    if (similarity > 0.75) {
      return {
        ...base,
        outcome: 'acceptable',
        message: 'Very close! Make sure the modal particles are in their natural position directly after pronouns/finite verbs in the midfield.',
        teacherCorrection: {
          natural: exercise.target || '',
          explanation: exercise.explanation || `Ensure '${exercise.modalParticleData?.particleCluster}' is placed correctly in the midfield.`,
        },
      };
    } else {
      return {
        ...base,
        outcome: 'retry',
        message: 'Not quite. Formulate the sentence with the required modal particles in their natural midfield slot.',
        explanation: exercise.explanation || `Integrate '${exercise.modalParticleData?.particleCluster}' into the sentence.`,
      };
    }
  }

  // Focus Fronting & Topicalisation Drill Evaluation
  if (exercise.kind === 'topicalisation-drill') {
    const target = normalizeAnswer(exercise.target || '');
    const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[];

    if (accepted.includes(normalized)) {
      if (!base.skills.includes('production')) base.skills.push('production');
      if (!base.skills.includes('grammar')) base.skills.push('grammar');
      return {
        ...base,
        outcome: 'correct',
        message: 'Uitstekend! Flawless execution of Dutch focus fronting, topicalisation, and emphatic word order.',
        changeModifier: (base.changeModifier || 0) + 20,
      };
    }

    const topError = checkTopicalisationError(normalized, exercise.topicalisationData);
    if (topError.found) {
      return {
        ...base,
        outcome: 'acceptable',
        message: topError.message,
        miniLesson: topError.miniLesson,
        teacherCorrection: {
          natural: exercise.target || '',
          explanation: `Apply the focus construction with fronted element '${exercise.topicalisationData?.frontedElement || 'focuselement'}'.`,
        },
      };
    }

    const similarity = calculateSimilarity(normalized, target);
    if (similarity > 0.75) {
      return {
        ...base,
        outcome: 'acceptable',
        message: 'Very close! Check the fronted focus element, subject-verb inversion (V2), and resumptive pronouns.',
        teacherCorrection: {
          natural: exercise.target || '',
          explanation: exercise.explanation || `Verify the focus construction starting with '${exercise.topicalisationData?.frontedElement}'.`,
        },
      };
    } else {
      return {
        ...base,
        outcome: 'retry',
        message: 'Not quite. Check the fronted element, auxiliary verb (e.g. doen), or inverted word order.',
        explanation: exercise.explanation || `Construct the emphatic sentence starting with '${exercise.topicalisationData?.frontedElement}'.`,
      };
    }
  }

  return undefined;
}
