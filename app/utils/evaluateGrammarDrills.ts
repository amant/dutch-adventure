import type { Feedback } from '~/types/learning'
import type { EvaluationInput } from './evaluateExercise'
import * as helpers from './evaluationHelpers'

export function evaluateGrammarDrills(input: EvaluationInput): Feedback | undefined {
  const { exercise, normalized, context, target, base } = input
  const { normalizeAnswer, calculateSimilarity, checkRelativePronounError, checkDoubleInfinitiveError, checkConcessionError, checkConcessionDrillError, checkParticipialError, checkConditionalRestrictiveError, checkCausalityError, checkCorrelativeError, checkInfinitiveClauseError, checkSubordinateClauseError } = helpers

    // Relative Clause Drill Evaluation
    if (exercise.kind === 'relative-clause-drill' && exercise.relativeClauseData) {
      const target = normalizeAnswer(exercise.target || '')
      const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[]
      
      const relError = checkRelativePronounError(normalized)
      if (relError.found) {
        return {
          ...base,
          outcome: 'acceptable',
          message: relError.message,
          miniLesson: relError.miniLesson,
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: 'Remember the correct relative pronoun for this antecedent.'
          }
        }
      }

      if (accepted.includes(normalized)) {
        if (!base.skills.includes('production')) base.skills.push('production')
        if (!base.skills.includes('grammar')) base.skills.push('grammar')
        return {
          ...base,
          outcome: 'correct',
          message: 'Spot on! The antecedent, relative pronoun, and subordinate verb order are completely accurate.',
          changeModifier: (base.changeModifier || 0) + 20
        }
      }

      // Check for SVO inside die/dat/wat/waar clause
      const pronounsToCheck = ['die', 'dat', 'wat', 'waarmee', 'waarop', 'waaraan', 'waarover', 'waarnaar', 'wie']
      let foundSubError: any = null
      for (const p of pronounsToCheck) {
        const subErr = checkSubordinateClauseError(normalized, p)
        if (subErr.found) {
          foundSubError = subErr
          break
        }
      }

      if (foundSubError) {
        return {
          ...base,
          outcome: 'retry',
          message: 'In relative clauses, all verbs must be placed at the end of the clause.',
          explanation: foundSubError.message,
          miniLesson: foundSubError.miniLesson
        }
      }

      const similarity = calculateSimilarity(normalized, target)
      if (similarity > 0.75) {
        return {
          ...base,
          outcome: 'acceptable',
          message: 'Very close! Check the exact relative pronoun or word placement.',
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: exercise.explanation || 'Make sure the relative clause is linked with the proper pronoun and verb-final word order.'
          }
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: 'Not quite. Check how the two sentences connect using a relative pronoun.',
          explanation: exercise.explanation || 'Identify the antecedent and use the corresponding relative pronoun (die, dat, wie, waar+prep, or wat).'
        }
      }
    }

    // Infinitive Drill Evaluation (om... te / te + inf)
    if (exercise.kind === 'infinitive-drill' && exercise.infinitiveData) {
      const target = normalizeAnswer(exercise.target || '')
      const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[]

      const infError = checkInfinitiveClauseError(normalized)
      if (infError.found) {
        return {
          ...base,
          outcome: 'acceptable',
          message: infError.message,
          miniLesson: infError.miniLesson,
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: 'Pay close attention to separable verb placement and "te" in infinitive constructions.'
          }
        }
      }

      if (accepted.includes(normalized)) {
        if (!base.skills.includes('production')) base.skills.push('production')
        if (!base.skills.includes('grammar')) base.skills.push('grammar')
        return {
          ...base,
          outcome: 'correct',
          message: 'Fantastisch! Your infinitive clause is grammatically precise with proper "te" placement and word order.',
          changeModifier: (base.changeModifier || 0) + 20
        }
      }

      const similarity = calculateSimilarity(normalized, target)
      if (similarity > 0.75) {
        return {
          ...base,
          outcome: 'acceptable',
          message: 'Very close! Check the position of elements inside the (om...) te bracket.',
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: exercise.explanation || 'Ensure all objects and adverbs are placed between "om" and "te + infinitive".'
          }
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: 'Not quite. Check how the infinitive construction is formulated.',
          explanation: exercise.explanation || 'Structure the sentence with (om...) te and place all verbal elements at the end.'
        }
      }
    }

    // Double Infinitive (IPP) Drill Evaluation
    if (exercise.kind === 'double-infinitive-drill' && exercise.doubleInfinitiveData) {
      const target = normalizeAnswer(exercise.target || '')
      const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[]

      const ippError = checkDoubleInfinitiveError(normalized)
      if (ippError.found) {
        return {
          ...base,
          outcome: 'acceptable',
          message: ippError.message,
          miniLesson: ippError.miniLesson,
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: 'When governing verbs (modals, laten, horen, zien, leren, helpen) govern another verb in a compound tense, replace the participle with an infinitive (IPP).'
          }
        }
      }

      if (accepted.includes(normalized)) {
        if (!base.skills.includes('production')) base.skills.push('production')
        if (!base.skills.includes('grammar')) base.skills.push('grammar')
        return {
          ...base,
          outcome: 'correct',
          message: 'Uitstekend! Your double infinitive verb cluster and word order are completely accurate.',
          changeModifier: (base.changeModifier || 0) + 20
        }
      }

      const similarity = calculateSimilarity(normalized, target)
      if (similarity > 0.75) {
        return {
          ...base,
          outcome: 'acceptable',
          message: 'Very close! Check the position and sequence of the verbs in the cluster.',
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: exercise.explanation || 'Ensure the auxiliary and infinitives appear in the correct verb cluster sequence.'
          }
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: 'Not quite. Check the verb cluster formation and double infinitive rules.',
          explanation: exercise.explanation || 'Use the auxiliary (hebben/zijn) with the double infinitive sequence at the end of the clause.'
        }
      }
    }

    // Concession Drill Evaluation
    if (exercise.kind === 'concession-drill' && exercise.concessionData) {
      const target = normalizeAnswer(exercise.target || '')
      const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[]

      const concessionError = checkConcessionError(normalized)
      if (concessionError.found) {
        return {
          ...base,
          outcome: 'acceptable',
          message: concessionError.message,
          miniLesson: concessionError.miniLesson,
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: 'Concessive structures (hoewel, ondanks (dat), al + inversie, hoe... ook) require specific word order and connector combinations.'
          }
        }
      }

      const concessionDrillError = checkConcessionDrillError(normalized)
      if (concessionDrillError.found) {
        return {
          ...base,
          outcome: 'acceptable',
          message: concessionDrillError.message,
          miniLesson: concessionDrillError.miniLesson,
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: 'Concessive structures (hoewel, ondanks (dat), al + inversie, hoe... ook) require specific word order and connector combinations.'
          }
        }
      }

      if (accepted.includes(normalized)) {
        if (!base.skills.includes('production')) base.skills.push('production')
        if (!base.skills.includes('grammar')) base.skills.push('grammar')
        return {
          ...base,
          outcome: 'correct',
          message: 'Uitstekend! Your concessive structure and word order are completely accurate.',
          changeModifier: (base.changeModifier || 0) + 20
        }
      }

      const similarity = calculateSimilarity(normalized, target)
      if (similarity > 0.75) {
        return {
          ...base,
          outcome: 'acceptable',
          message: 'Very close! Check the conjunction and word order in both the concessive clause and main clause.',
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: exercise.explanation || 'Ensure the connector matches the clause type (subclause SOV vs preposition with noun phrase vs verb-first inversion).'
          }
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: 'Not quite. Check the connector choice and grammatical structure.',
          explanation: exercise.explanation || 'Combine the premises using the required concessive pattern.'
        }
      }
    }

    // Participial Drill Evaluation
    if (exercise.kind === 'participial-drill' && exercise.participialData) {
      const target = normalizeAnswer(exercise.target || '')
      const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[]

      const participialError = checkParticipialError(normalized)
      if (participialError.found) {
        return {
          ...base,
          outcome: 'acceptable',
          message: participialError.message,
          miniLesson: participialError.miniLesson,
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: 'Participial structures (het te-deelwoord, attributieve deelwoorden, al + deelwoord, beknopte zinnen) require precise inflection and prefix placement.'
          }
        }
      }

      if (accepted.includes(normalized)) {
        if (!base.skills.includes('production')) base.skills.push('production')
        if (!base.skills.includes('grammar')) base.skills.push('grammar')
        return {
          ...base,
          outcome: 'correct',
          message: 'Uitstekend! Your participial construction and grammatical structure are completely accurate.',
          changeModifier: (base.changeModifier || 0) + 20
        }
      }

      const similarity = calculateSimilarity(normalized, target)
      if (similarity > 0.75) {
        return {
          ...base,
          outcome: 'acceptable',
          message: 'Very close! Check the participle ending, particle placement, or word order.',
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: exercise.explanation || 'Ensure the participle (te + inf, present/past participle with -e, or concise clause) matches the required construction.'
          }
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: 'Not quite. Check the participial formation and grammatical structure.',
          explanation: exercise.explanation || 'Transform the base clause using the required participial formula.'
        }
      }
    }

    // Correlative Drill Evaluation
    if (exercise.kind === 'correlative-drill' && exercise.correlativeData) {
      const target = normalizeAnswer(exercise.target || '')
      const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[]

      const correlativeError = checkCorrelativeError(normalized)
      if (correlativeError.found) {
        return {
          ...base,
          outcome: 'acceptable',
          message: correlativeError.message,
          miniLesson: correlativeError.miniLesson,
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: 'Correlative structures (zowel... als, niet alleen... maar ook, noch... noch, hetzij... hetzij, enerzijds... anderzijds, hoe... des te) require balanced partners and accurate word order.'
          }
        }
      }

      if (accepted.includes(normalized)) {
        if (!base.skills.includes('production')) base.skills.push('production')
        if (!base.skills.includes('grammar')) base.skills.push('grammar')
        return {
          ...base,
          outcome: 'correct',
          message: 'Uitstekend! Your correlative sentence is perfectly balanced and grammatically flawless.',
          changeModifier: (base.changeModifier || 0) + 20
        }
      }

      const similarity = calculateSimilarity(normalized, target)
      if (similarity > 0.75) {
        return {
          ...base,
          outcome: 'acceptable',
          message: 'Very close! Check the correlative partner, comma placement, or clause word order.',
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: exercise.explanation || 'Ensure both parts of the correlative frame are correctly balanced and placed.'
          }
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: 'Not quite. Check the correlative frame and grammatical structure.',
          explanation: exercise.explanation || 'Combine both premises using the required correlative conjunction pair.'
        }
      }
    }

    // Conditional & Restrictive Drill Evaluation
    if (exercise.kind === 'conditional-drill' && exercise.conditionalData) {
      const target = normalizeAnswer(exercise.target || '')
      const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[]

      const condError = checkConditionalRestrictiveError(normalized, exercise.conditionalData.conditionType)
      if (condError.found) {
        return {
          ...base,
          outcome: 'acceptable',
          message: condError.message,
          miniLesson: condError.miniLesson,
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: 'Conditional and restrictive structures (mits, tenzij, op voorwaarde dat, gesteld dat, voor zover, mocht...) require precise conjunctions and verb-final subclause order.'
          }
        }
      }

      if (accepted.includes(normalized)) {
        if (!base.skills.includes('production')) base.skills.push('production')
        if (!base.skills.includes('grammar')) base.skills.push('grammar')
        return {
          ...base,
          outcome: 'correct',
          message: 'Uitstekend! Your conditional/restrictive sentence is syntactically accurate and natural.',
          changeModifier: (base.changeModifier || 0) + 20
        }
      }

      const similarity = calculateSimilarity(normalized, target)
      if (similarity > 0.75) {
        return {
          ...base,
          outcome: 'acceptable',
          message: 'Very close! Check the conjunction choice, word order, or clause inversion.',
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: exercise.explanation || 'Ensure the condition or restriction is accurately expressed with subordinate verb placement.'
          }
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: 'Not quite. Check the conditional conjunction and grammatical structure.',
          explanation: exercise.explanation || 'Combine the main clause and condition using the required conditional construction.'
        }
      }
    }

    // Causal, Consecutive & Final Drill Evaluation
    if (exercise.kind === 'causality-drill' && exercise.causalityData) {
      const target = normalizeAnswer(exercise.target || '')
      const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[]

      const causError = checkCausalityError(normalized, exercise.causalityData.relationType)
      if (causError.found) {
        return {
          ...base,
          outcome: 'acceptable',
          message: causError.message,
          miniLesson: causError.miniLesson,
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: 'Causal, consecutive, and purpose structures (doordat, aangezien, te wijten aan, te danken aan, waardoor, dermate... dat, opdat, teneinde... te) require precise connectors and subclause word order.'
          }
        }
      }

      if (accepted.includes(normalized)) {
        if (!base.skills.includes('production')) base.skills.push('production')
        if (!base.skills.includes('grammar')) base.skills.push('grammar')
        return {
          ...base,
          outcome: 'correct',
          message: 'Uitstekend! Your causal/consecutive sentence is syntactically accurate and logically coherent.',
          changeModifier: (base.changeModifier || 0) + 20
        }
      }

      const similarity = calculateSimilarity(normalized, target)
      if (similarity > 0.75) {
        return {
          ...base,
          outcome: 'acceptable',
          message: 'Very close! Check connector selection, subclause verb-final placement, or prepositional structures.',
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: exercise.explanation || 'Ensure the cause, consequence, or purpose is formulated with accurate Dutch syntax.'
          }
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: 'Not quite. Check the causal/consecutive connector and grammatical structure.',
          explanation: exercise.explanation || 'Combine the premise and consequence/purpose using the specified connector structure.'
        }
      }
    }


  return undefined
}

