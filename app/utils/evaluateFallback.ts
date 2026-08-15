import type { Feedback } from '~/types/learning'
import type { EvaluationInput } from './evaluateExercise'
import * as helpers from './evaluationHelpers'

export function evaluateFallback(input: EvaluationInput): Feedback {
  const { exercise, normalized, context, target, base } = input
  const { normalizeAnswer, isSpellingMistake, checkInversionError, checkPerfectTenseError, checkSeparableVerbError, checkConditionalError, checkIndirectQuestionError, checkRelativePronounError, checkDoubleInfinitiveError, checkConcessionError, checkParticipialError, checkConditionalRestrictiveError, checkCausalityError, checkFixedPrepositionRegimeError, checkCorrelativeError, checkInfinitiveClauseError, checkSubordinateClauseError, checkArticleError, checkAdjectiveEndingError, checkReflexiveError, checkFixedPrepositionError } = helpers

    if (!normalized && exercise.kind === 'typed') {
      return { ...base, outcome: 'retry', message: 'Type an answer to try it.' }
    }

    if (exercise.kind === 'info' || exercise.kind === 'reading') {
      return { ...base, outcome: 'correct', message: 'Notice this pattern for the next activity.' }
    }

    const accepted = [target || '', ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[]
    
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

    // Grammar Assistant: Conditional Check
    const conditionalError = checkConditionalError(normalized)
    if (conditionalError.found) {
      return {
        ...base,
        outcome: 'acceptable',
        message: conditionalError.message,
        miniLesson: conditionalError.miniLesson
      }
    }

    // Grammar Assistant: Indirect Question Check (of vs als)
    const indirectQuestionError = checkIndirectQuestionError(normalized)
    if (indirectQuestionError.found) {
      return {
        ...base,
        outcome: 'acceptable',
        message: indirectQuestionError.message,
        miniLesson: indirectQuestionError.miniLesson
      }
    }

    // Grammar Assistant: Relative Pronoun Check
    const relativePronounError = checkRelativePronounError(normalized)
    if (relativePronounError.found) {
      return {
        ...base,
        outcome: 'acceptable',
        message: relativePronounError.message,
        miniLesson: relativePronounError.miniLesson
      }
    }

    // Grammar Assistant: Infinitive & Te Check
    const infinitiveError = checkInfinitiveClauseError(normalized)
    if (infinitiveError.found) {
      return {
        ...base,
        outcome: 'acceptable',
        message: infinitiveError.message,
        miniLesson: infinitiveError.miniLesson
      }
    }

    // Grammar Assistant: Double Infinitive (IPP) Check
    const doubleInfError = checkDoubleInfinitiveError(normalized)
    if (doubleInfError.found) {
      return {
        ...base,
        outcome: 'acceptable',
        message: doubleInfError.message,
        miniLesson: doubleInfError.miniLesson
      }
    }

    // Grammar Assistant: Concession & Contrast Check
    const concessionError = checkConcessionError(normalized)
    if (concessionError.found) {
      return {
        ...base,
        outcome: 'acceptable',
        message: concessionError.message,
        miniLesson: concessionError.miniLesson
      }
    }

    // Grammar Assistant: Participial & Gerundive Check
    const participialError = checkParticipialError(normalized)
    if (participialError.found) {
      return {
        ...base,
        outcome: 'acceptable',
        message: participialError.message,
        miniLesson: participialError.miniLesson
      }
    }

    // Grammar Assistant: Correlative Connectors Check
    const correlativeError = checkCorrelativeError(normalized)
    if (correlativeError.found) {
      return {
        ...base,
        outcome: 'acceptable',
        message: correlativeError.message,
        miniLesson: correlativeError.miniLesson
      }
    }

    // Grammar Assistant: Conditional & Restrictive Check
    const conditionalRestrictiveError = checkConditionalRestrictiveError(normalized)
    if (conditionalRestrictiveError.found) {
      return {
        ...base,
        outcome: 'acceptable',
        message: conditionalRestrictiveError.message,
        miniLesson: conditionalRestrictiveError.miniLesson
      }
    }

    // Grammar Assistant: Causal, Consecutive & Final Check
    const causalityAssistantError = checkCausalityError(normalized)
    if (causalityAssistantError.found) {
      return {
        ...base,
        outcome: 'acceptable',
        message: causalityAssistantError.message,
        miniLesson: causalityAssistantError.miniLesson
      }
    }

    // Grammar Assistant: Reflexive Check
    const reflexiveError = checkReflexiveError(normalized)
    if (reflexiveError.found) {
      return { ...base, outcome: 'retry', message: reflexiveError.message, miniLesson: reflexiveError.miniLesson }
    }

    // Grammar Assistant: Fixed Preposition Regime Check
    const prepRegimeAssistantError = checkFixedPrepositionRegimeError(normalized)
    if (prepRegimeAssistantError.found) {
      return {
        ...base,
        outcome: 'acceptable',
        message: prepRegimeAssistantError.message,
        miniLesson: prepRegimeAssistantError.miniLesson
      }
    }

    // Grammar Assistant: Fixed Preposition Check
    const prepositionError = checkFixedPrepositionError(normalized)
    if (prepositionError.found) {
      return { ...base, outcome: 'retry', message: prepositionError.message, miniLesson: prepositionError.miniLesson }
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

    // Grammar Assistant: Subordinate Clauses (omdat, hoewel)
    if (normalized.includes('omdat')) {
      const error = checkSubordinateClauseError(normalized, 'omdat')
      if (error.found) return { ...base, outcome: 'retry', message: error.message, miniLesson: error.miniLesson }
    }
    if (normalized.includes('hoewel')) {
      const error = checkSubordinateClauseError(normalized, 'hoewel')
      if (error.found) return { ...base, outcome: 'retry', message: error.message, miniLesson: error.miniLesson }
    }

    // Grammar Assistant: Articles (de/het)
    const articleError = checkArticleError(normalized, target || '')
    if (articleError.found) {
      return { ...base, outcome: 'retry', message: articleError.message, miniLesson: articleError.miniLesson }
    }

    // Grammar Assistant: Adjective Endings
    const adjectiveError = checkAdjectiveEndingError(normalized)
    if (adjectiveError.found) {
      return { ...base, outcome: 'retry', message: adjectiveError.message, miniLesson: adjectiveError.miniLesson }
    }

    // Grammar Assistant: Formal vs Informal consistency (B2 Capability: Adapt speech to context)
    const formalWords = ['u', 'uw']
    const informalWords = ['je', 'jij', 'jou', 'jouw']
    const hasFormal = formalWords.some(w => normalized.split(/\s+/).includes(w))
    const hasInformal = informalWords.some(w => normalized.split(/\s+/).includes(w))
    
    if (hasFormal && hasInformal) {
      return {
        ...base,
        outcome: 'retry',
        message: 'Mixing formal "u" and informal "je" in the same response is inconsistent. Stick to one style!',
        teacherTip: 'In Dutch, it is important to be consistent with your level of formality. If you start with "u", continue with "uw". If you use "je", continue with "jou".'
      }
    }

    const targetRegister = context?.overrideRegister || exercise.requiredRegister

    if (targetRegister === 'formal' && hasInformal && !hasFormal) {
      return {
        ...base,
        outcome: 'retry',
        message: 'This situation requires a formal register. Use "u" and "uw" instead of "je".',
        teacherTip: 'When speaking to strangers, elder people, or in many professional contexts in the Netherlands, using "u" is safer and more respectful.'
      }
    }

    if (targetRegister === 'informal' && hasFormal && !hasInformal) {
      return {
        ...base,
        outcome: 'retry',
        message: 'The speaker asked you to use the informal register ("tutoyeren"). Use "je" instead of "u".',
        teacherTip: 'If someone says "Zeg maar je hoor!", it is a sign of friendliness. Sticking to "u" after that can actually sound distant or awkward.'
      }
    }

    // Spelling check
    if (isSpellingMistake(normalized, accepted)) {
      if (!base.skills.includes('spelling')) base.skills.push('spelling')
      return { ...base, outcome: 'acceptable', message: 'Almost! Watch out for that small spelling mistake.', correction: exercise.correction || target }
    }

    // Recombination Drill Evaluation
    if (exercise.kind === 'recombination-drill') {
      const missing = exercise.requiredWords?.filter(w => !normalized.includes(w.toLowerCase()))
      if (missing && missing.length > 0) {
        return { 
          ...base, 
          outcome: 'retry', 
          message: `You missed: ${missing.join(', ')}. Try to combine all target concepts!` 
        }
      }
      if (normalized.length > 10) {
        return { 
          ...base, 
          outcome: 'correct', 
          message: 'Excellent recombination! You effectively used multiple concepts in one thought.',
          changeModifier: (base.changeModifier || 0) + 5
        }
      }
    }

    // Flexibility Drill Evaluation
    if (exercise.kind === 'flexibility') {
      const hasForbidden = exercise.forbiddenWords?.some(w => normalized.includes(w.toLowerCase()))
      const hasRequired = exercise.requiredWords?.every(w => normalized.includes(w.toLowerCase()))

      if (hasForbidden) {
        const forbidden = exercise.forbiddenWords?.find(w => normalized.includes(w.toLowerCase()))
        return { ...base, outcome: 'retry', message: `Nice try, but you need to avoid using '${forbidden}' for this challenge!` }
      }
      if (!hasRequired) {
        const missing = exercise.requiredWords?.find(w => !normalized.includes(w.toLowerCase()))
        return { ...base, outcome: 'retry', message: `Don't forget to use '${missing}' in your answer.` }
      }

      if (normalized.split(' ').filter(Boolean).length < 3) {
        return { ...base, outcome: 'retry', message: 'Try to write a complete sentence to show real flexibility.' }
      }

      return { ...base, outcome: 'correct', message: 'Great job! You successfully used a different structure.' }
    }

    // Final Challenge Evaluation
    if (exercise.kind === 'challenge') {
      const words = normalized.split(' ').filter(Boolean)
      const minLength = exercise.minimumLength || 0
      
      if (words.length < minLength) {
        return { ...base, outcome: 'retry', message: `Keep going! Try to write at least ${minLength} words.` }
      }

      if (exercise.prompt && normalized.includes(normalizeAnswer(exercise.prompt))) {
        return { ...base, outcome: 'retry', message: "Try to use your own words instead of just repeating the prompt." }
      }

      return { 
        ...base, 
        outcome: 'correct', 
        message: 'Excellent! You demonstrated real-world usage of these concepts.',
        changeModifier: (base.changeModifier || 0) + 10 
      }
    }

    // Pragmatic Drill Evaluation
    if (exercise.kind === 'pragmatic-drill') {
      const selected = exercise.pragmaticOptions?.find(o => normalizeAnswer(o.text) === normalized)
      if (selected?.isBest) {
        return { ...base, outcome: 'correct', message: 'Perfect! That is exactly how a native speaker would handle this situation.' }
      } else if (selected) {
        return { ...base, outcome: 'acceptable', message: 'Technically okay, but there is a more natural way to say it.' }
      }
    }

    // Heuristic for personalised answers / conversations
    if (exercise.kind === 'personalise' || exercise.kind === 'conversation' || exercise.id.includes('personalise')) {
      const missingGrammar = exercise.grammar?.find(g => !normalized.includes(g.toLowerCase()))
      const missingVocab = exercise.vocabulary?.find(v => !normalized.includes(v.toLowerCase()))
      
      if (normalized.length > 5) {
        if (missingGrammar && Math.random() < 0.3) {
           return { ...base, outcome: 'acceptable', message: `Good! But try to use '${missingGrammar}' to make it even better.` }
        }
        return { 
          ...base, 
          outcome: 'correct', 
          message: 'Excellent personalisation! You are using the language to talk about yourself.',
          changeModifier: (base.changeModifier || 0) + 5
        }
      }
    }

    // Free-form typed exercises (no expected answer): any substantive attempt counts
    if (exercise.kind === 'typed' && accepted.length === 0 && normalized.length > 0) {
      return { ...base, outcome: 'correct', message: 'That sounds good! Keep practicing.' }
    }

    return { ...base, outcome: 'retry', message: 'Not quite. Check the word order or spelling and try again.', correction: exercise.correction }
}

