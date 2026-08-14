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
  isSpeaking?: boolean
  isShadowing?: boolean
  overrideRegister?: 'formal' | 'informal'
  morphingStepIndex?: number
  clozeAnswers?: string[]
}

function calculateSimilarity(s1: string, s2: string): number {
  const longer = s1.length > s2.length ? s1 : s2
  const shorter = s1.length > s2.length ? s2 : s1
  const longerLength = longer.length
  if (longerLength === 0) return 1.0
  return (longerLength - editDistance(longer, shorter)) / longerLength
}

function editDistance(s1: string, s2: string): number {
  const costs = []
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) costs[j] = j
      else {
        if (j > 0) {
          let newValue = costs[j - 1]
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1
          }
          costs[j - 1] = lastValue
          lastValue = newValue
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue
  }
  return costs[s2.length]
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
    { full: 'voorbereiden', stem: 'bereid', prefix: 'voor' },
    { full: 'opstaan', stem: 'sta', prefix: 'op' }
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

function checkConditionalError(normalized: string) {
  const words = normalized.split(' ')
  const hasAls = words.includes('als')
  const hasZou = words.includes('zou') || words.includes('zouden')
  const hasHad = words.includes('had') || words.includes('hadden')
  const hasWas = words.includes('was') || words.includes('waren')

  if (hasAls && !hasZou && !hasHad && !hasWas) {
    return {
      found: true,
      message: 'When using "als" for a hypothetical, you usually need "zou", "had", or "was".',
      miniLesson: {
        title: 'Hypothetical Conditions',
        content: 'To express something that is not real or unlikely, Dutch uses the past tense (had/was) or "zou" + infinitive.',
        example: {
          wrong: 'Als ik geld heb, koop ik een auto.',
          right: 'Als ik geld had, zou ik een auto kopen.'
        }
      }
    }
  }
  
  if (normalized.includes('als ik zou hebben')) {
    return {
      found: true,
      message: 'While "zou hebben" is okay, using "had" after "als" is often more natural for hypotheticals.',
      miniLesson: {
        title: 'Als + Had/Was',
        content: 'In the "if" clause (als...), Dutch speakers prefer the simple past (had, was, kon) over "zou hebben/zijn/kunnen".',
        example: {
          wrong: 'Als ik tijd zou hebben...',
          right: 'Als ik tijd had...'
        }
      }
    }
  }

  return { found: false }
}

function checkSubordinateClauseError(normalized: string, conjunction: string) {
  const words = normalized.split(' ')
  const index = words.indexOf(conjunction)
  if (index !== -1 && index < words.length - 2) {
    const nextWords = words.slice(index + 1)
    const pronouns = ['ik', 'je', 'jij', 'hij', 'zij', 'ze', 'het', 'we', 'wij', 'jullie']
    // A common mistake is to put the verb right after the subject in a subordinate clause
    if (pronouns.includes(nextWords[0]) && nextWords.length > 1) {
      // This is a very rough heuristic but often catches SVO in subordinate clauses
      // We check if the last word is NOT a verb-like word (usually ends in -en, -t, or is short)
      // Actually, it's safer to just check if the second word is a common verb
      const commonVerbs = ['is', 'bent', 'zijn', 'heeft', 'heb', 'hebben', 'kan', 'kunt', 'kunnen', 'wil', 'wilt', 'willen']
      if (commonVerbs.includes(nextWords[1])) {
        return {
          found: true,
          message: `After '${conjunction}', the verb moves to the end of the sentence!`,
          miniLesson: {
            title: 'Subordinate Clauses',
            content: `When you use '${conjunction}', the word order changes. The verb must go to the very end.`,
            example: {
              wrong: `... ${conjunction} ik ${nextWords[1]} ziek.`,
              right: `... ${conjunction} ik ziek ${nextWords[1]}.`
            }
          }
        }
      }
    }
  }
  return { found: false }
}

function checkArticleError(normalized: string, target: string) {
  const deWords = ['man', 'vrouw', 'tafel', 'stoel', 'stad', 'bakker', 'collega', 'vergadering']
  const hetWords = ['kind', 'meisje', 'boek', 'huis', 'weer', 'werk', 'hotel', 'ontbijt']
  
  const words = normalized.split(' ')
  for (let i = 0; i < words.length - 1; i++) {
    if (words[i] === 'het' && deWords.includes(words[i+1])) {
      return {
        found: true,
        message: `'${words[i+1]}' is a "de-word", not "het".`,
        miniLesson: {
          title: 'De vs Het',
          content: 'Every Dutch noun is either "de" or "het". Most words (about 75%) are "de". Diminutives (ending in -je) are always "het".',
          example: {
            wrong: `het ${words[i+1]}`,
            right: `de ${words[i+1]}`
          }
        }
      }
    }
    if (words[i] === 'de' && hetWords.includes(words[i+1])) {
      return {
        found: true,
        message: `'${words[i+1]}' is a "het-word", not "de".`,
        miniLesson: {
          title: 'De vs Het',
          content: 'Every Dutch noun is either "de" or "het". Learning the article with the word is essential.',
          example: {
            wrong: `de ${words[i+1]}`,
            right: `het ${words[i+1]}`
          }
        }
      }
    }
  }
  return { found: false }
}

function checkAdjectiveEndingError(normalized: string) {
  const words = normalized.split(' ')
  // Check for common adjectives missing the -e before a noun
  const commonAdjectives = ['mooi', 'groot', 'klein', 'leuk', 'lekker', 'warm', 'koud']
  const deWords = ['man', 'vrouw', 'dag', 'stad', 'tafel', 'stoel', 'bakker']
  
  for (let i = 0; i < words.length - 1; i++) {
    if (commonAdjectives.includes(words[i]) && deWords.includes(words[i+1])) {
      return {
        found: true,
        message: `Before '${words[i+1]}', the adjective should usually end in -e: '${words[i]}e'.`,
        miniLesson: {
          title: 'Adjective Endings',
          content: 'Most adjectives get an -e when they come before a noun, except for "het-words" preceded by "een" or no article.',
          example: {
            wrong: `${words[i]} ${words[i+1]}`,
            right: `${words[i]}e ${words[i+1]}`
          }
        }
      }
    }
  }
  return { found: false }
}

function checkReflexiveError(normalized: string) {
  const reflexives = [
    { verb: 'herinner', correct: 'me', wrong: ['mij'] },
    { verb: 'verveel', correct: 'je', wrong: [] },
    { verb: 'vergist', correct: 'je', wrong: [] },
    { verb: 'voel', correct: 'me', subject: 'ik' },
    { verb: 'voelt', correct: 'je', subject: 'je' }
  ]
  
  const words = normalized.split(' ')
  
  if (words.includes('ik') && (words.includes('herinner') || words.includes('voel')) && !words.includes('me')) {
    return {
      found: true,
      message: "Don't forget the reflexive pronoun! 'Ik voel me...' or 'Ik herinner me...'",
      miniLesson: {
        title: 'Reflexive Verbs',
        content: 'Some verbs in Dutch are reflexive, meaning the action reflects back to the subject. You must use "me", "je", "zich", etc.',
        example: {
          wrong: 'Ik voel goed.',
          right: 'Ik voel me goed.'
        }
      }
    }
  }
  return { found: false }
}

function checkFixedPrepositionError(normalized: string) {
  const fixed = [
    { verb: 'wachten', prep: 'op' },
    { verb: 'rekenen', prep: 'op' },
    { verb: 'denken', prep: 'aan' },
    { verb: 'houden', prep: 'van' },
    { verb: 'bang', prep: 'voor' },
    { verb: 'geïnteresseerd', prep: 'in' },
    { verb: 'trots', prep: 'op' }
  ]
  
  const words = normalized.split(' ')
  for (const f of fixed) {
    if (words.some(w => w.startsWith(f.verb)) && !words.includes(f.prep)) {
      // Check if there is another preposition used instead
      const otherPreps = ['met', 'van', 'bij', 'voor', 'naar', 'in', 'op', 'aan'].filter(p => p !== f.prep)
      if (otherPreps.some(p => words.includes(p))) {
        return {
          found: true,
          message: `The verb '${f.verb}' always goes with '${f.prep}' in this context.`,
          miniLesson: {
            title: 'Fixed Prepositions',
            content: 'Many Dutch verbs and adjectives are paired with a specific preposition. These must be learned together as a single unit.',
            example: {
              wrong: `Ik wacht voor de bus.`,
              right: `Ik wacht op de bus.`
            }
          }
        }
      }
    }
  }
  return { found: false }
}

function checkCoherenceConnectors(normalized: string): { score: number, found: string[] } {
  const connectors = {
    addition: ['bovendien', 'daarnaast', 'ook', 'verder'],
    contrast: ['daarentegen', 'echter', 'toch', 'hoewel', 'aan de andere kant'],
    cause: ['daarom', 'immers', 'omdat', 'want', 'doordat'],
    conclusion: ['kortom', 'concluderend', 'dus', 'derhalve']
  }
  
  const found: string[] = []
  const words = normalized.split(/\s+/)
  
  Object.values(connectors).flat().forEach(c => {
    if (c.includes(' ')) {
      if (normalized.includes(c)) found.push(c)
    } else {
      if (words.includes(c)) found.push(c)
    }
  })
  
  return {
    score: Math.min(100, found.length * 25),
    found
  }
}

function calculatePragmaticScore(normalized: string, exercise: Exercise): { score: number, feedback?: string } {
  let score = 70 // Base score for correct but neutral Dutch
  let feedback = ""

  // 1. Softeners (Politeness)
  const softeners = ['graag', 'even', 'misschien', 'zou', 'mag', 'kunt', 'wil']
  const hasSofteners = softeners.some(s => normalized.includes(s))
  if (hasSofteners) {
    score += 15
    feedback = "Nice use of softeners! It makes you sound more polite."
  }

  // 2. Native Fillers / Particles
  const fillers = ['hoor', 'nou', 'eigenlijk', 'wel', 'toch', 'natuurlijk']
  const hasFillers = fillers.some(f => normalized.split(' ').includes(f))
  if (hasFillers) {
    score += 10
    feedback = feedback ? feedback + " Also, your use of particles is very natural." : "Great use of Dutch particles! This is very native-like."
  }

  // 3. Stiff phrasing (Direct translation from English)
  const stiffPhrases = [
    { stiff: 'ik wil', better: 'ik zou graag ... willen' },
    { stiff: 'kan ik hebben', better: 'mag ik' },
    { stiff: 'ik ben goed', better: 'het gaat goed met mij' }
  ]
  
  for (const p of stiffPhrases) {
    if (normalized.includes(p.stiff)) {
      score -= 20
      feedback = `Technically correct, but '${p.stiff}' is a bit stiff. Try using '${p.better}' instead.`
      break
    }
  }

  return { score: Math.min(100, Math.max(0, score)), feedback }
}

export function evaluateResponse(exercise: Exercise, answer: string, context?: EvaluationContext): Feedback {
  const normalized = normalizeAnswer(answer)
  const target = exercise.target
  
  const getFeedback = (): Feedback => {
    const base: Feedback = { 
      outcome: 'retry',
      message: '',
      target, 
      explanation: exercise.explanation, 
      skills: [...exercise.skills], 
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

    // Morphing Drill Evaluation
    if (exercise.kind === 'morphing-drill' && exercise.morphingData) {
      const stepIndex = context?.morphingStepIndex ?? 0
      const step = exercise.morphingData.steps[stepIndex]
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

    // Listening Cloze Evaluation
    if (exercise.kind === 'listening-cloze' && exercise.clozeData) {
      const userAnswers = context?.clozeAnswers || []
      const correctAnswers = exercise.clozeData.answers
      
      const mistakes: number[] = []
      userAnswers.forEach((ans, idx) => {
        if (normalizeAnswer(ans) !== normalizeAnswer(correctAnswers[idx])) {
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
          explanation: `Focus on: ${remainingMistakes[0].explanation}`
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
          outcome: 'incorrect',
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
          explanation: `Try to incorporate more details about: ${missing[0].label}.`
        }
      }
    }

    // Er-Drill Evaluation
    if (exercise.kind === 'er-drill' && exercise.erDrillData) {
      const correctOption = exercise.erDrillData.options.find(o => o.isCorrect)
      if (normalized === normalizeAnswer(correctOption?.text || '')) {
        return {
          ...base,
          outcome: 'correct',
          message: 'Perfect! You identified the correct usage.',
          changeModifier: (base.changeModifier || 0) + 3
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: 'Not quite. That function or placement doesn\'t fit this context.',
          explanation: exercise.erDrillData.explanation || 'Review the role of "er" in this sentence.'
        }
      }
    }

    // Pronominal-Drill Evaluation
    if (exercise.kind === 'pronominal-drill' && exercise.pronominalData) {
      const correct = exercise.target || ''
      if (normalized === correct.toLowerCase()) {
        if (!base.skills.includes('production')) base.skills.push('production')
        return {
          ...base,
          outcome: 'correct',
          message: 'Perfect combination! You successfully merged the preposition and the reference word.',
          changeModifier: (base.changeModifier || 0) + 15
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: 'That combination is not quite right.',
          explanation: exercise.explanation || `In Dutch, we merge "${exercise.pronominalData.preposition}" and "${exercise.pronominalData.object}" into "${correct}".`
        }
      }
    }

    // Passive Drill Evaluation
    if (exercise.kind === 'passive-drill' && exercise.passiveData) {
      const target = normalizeAnswer(exercise.target || '')
      const containsDoor = normalized.includes(' door ')
      const containsWorden = normalized.includes('wordt') || normalized.includes('worden') || normalized.includes('werd')
      const containsZijn = normalized.includes(' is ') || normalized.includes(' zijn ') || normalized.includes(' was ')
      
      if (normalized === target) {
        if (!base.skills.includes('production')) base.skills.push('production')
        return {
          ...base,
          outcome: 'correct',
          message: 'Excellent passive transformation! Your word order and auxiliary choice are perfect.',
          changeModifier: (base.changeModifier || 0) + 20
        }
      } else if (exercise.passiveData.focus === 'er-passive' && !normalized.startsWith('er ')) {
        return {
          ...base,
          outcome: 'retry',
          message: 'This impersonal construction should start with "Er".',
          explanation: 'In Dutch, we use "Er wordt..." to focus on the action when there is no specific subject.'
        }
      } else if (exercise.passiveData.agent && !containsDoor) {
        return {
          ...base,
          outcome: 'acceptable',
          message: 'Good passive structure, but you forgot to mention the agent (the "door" phrase).',
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: `The agent in a passive sentence is introduced by the preposition "door".`
          }
        }
      }
    }

    // Nominalisation Drill Evaluation
    if (exercise.kind === 'nominalisation-drill' && exercise.nominalisationData) {
      const target = normalizeAnswer(exercise.target || '')
      const containsTargetNoun = normalized.includes(exercise.nominalisationData.targetNoun.toLowerCase())
      
      if (normalized === target) {
        if (!base.skills.includes('production')) base.skills.push('production')
        return {
          ...base,
          outcome: 'correct',
          message: 'Excellent formal phrasing! You successfully transformed the verbal expression.',
          changeModifier: (base.changeModifier || 0) + 20
        }
      } else if (containsTargetNoun) {
        return {
          ...base,
          outcome: 'acceptable',
          message: 'Good start. You used the target noun, but the sentence structure could be more formal.',
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: `The formal version usually starts with the nominalised subject: "De ${exercise.nominalisationData.targetNoun} van..."`
          }
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: 'Try to use the noun-based version to sound more formal.',
          explanation: `In formal Dutch, we often use "${exercise.nominalisationData.targetNoun}" instead of the verbal form.`
        }
      }
    }

    // Reframing-Drill Evaluation
    if (exercise.kind === 'reframing-drill' && exercise.reframingData) {
      const softeners = exercise.reframingData.softeningElements || []
      const usedSofteners = softeners.filter(s => normalized.includes(s.toLowerCase()))
      
      const pragmaticScore = Math.min(100, (usedSofteners.length / Math.max(1, softeners.length)) * 100)
      
      if (usedSofteners.length > 0) {
        if (!base.skills.includes('pragmatic')) base.skills.push('pragmatic')
        
        return {
          ...base,
          outcome: pragmaticScore > 60 ? 'correct' : 'acceptable',
          message: pragmaticScore > 60 
            ? 'Excellent diplomacy! Your reframe sounds much more professional.' 
            : 'Good effort, but you could add more softening markers to sound even more natural.',
          pragmaticScore,
          changeModifier: (base.changeModifier || 0) + (usedSofteners.length * 5)
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: 'Your response still sounds a bit too direct for this context. Try using some of the suggested softeners.',
          explanation: 'In professional Dutch, we often use words like "misschien", "zou", or "eventueel" to soften direct statements.'
        }
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

    // Grammar Assistant: Reflexive Check
    const reflexiveError = checkReflexiveError(normalized)
    if (reflexiveError.found) {
      return { ...base, outcome: 'retry', message: reflexiveError.message, miniLesson: reflexiveError.miniLesson }
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

      if (normalized.length > 5) {
        return { ...base, outcome: 'correct', message: 'Great job! You successfully used a different structure.' }
      }
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

    return { ...base, outcome: 'retry', message: 'Not quite. Check the word order or spelling and try again.', correction: exercise.correction }
  }

  const feedback = getFeedback()
    
  // Add Pragmatic Analysis for correct/acceptable answers
  if (feedback.outcome !== 'retry') {
    const pragmatics = calculatePragmaticScore(normalized, exercise)
    feedback.pragmaticScore = pragmatics.score
    feedback.pragmaticFeedback = pragmatics.feedback
    if (pragmatics.score > 70 && !feedback.skills.includes('pragmatic')) {
      feedback.skills.push('pragmatic')
    }

    // Coherence Analysis
    const coherence = checkCoherenceConnectors(normalized)
    if (coherence.found.length > 0) {
      if (!feedback.skills.includes('coherence')) feedback.skills.push('coherence')
      feedback.changeModifier = (feedback.changeModifier || 0) + (coherence.found.length * 2)
      if (!feedback.pragmaticFeedback) feedback.pragmaticFeedback = `Excellent logical flow! You used these connectors: ${coherence.found.join(', ')}.`
      else feedback.pragmaticFeedback += ` Also, great use of logical connectors like '${coherence.found[0]}'.`
    }

    // Idiom detection
    if (exercise.idioms) {
      const foundIdiom = exercise.idioms.find(i => normalized.includes(i.toLowerCase().replace(/[.,!?]/g, '')))
      if (foundIdiom) {
        if (!feedback.skills.includes('idiomatic')) feedback.skills.push('idiomatic')
        feedback.changeModifier = (feedback.changeModifier || 0) + 15
        if (feedback.outcome === 'correct') {
          feedback.message = `Fantastic! You used the idiom '${foundIdiom}' correctly.`
        }
      }
    }
  }

  // Add teacher correction if provided and the answer wasn't a complete failure
  if (exercise.correction && feedback.outcome !== 'retry') {
    feedback.teacherCorrection = {
      natural: exercise.correction,
      explanation: exercise.explanation || "Here is how to say it more naturally."
    }
  }

  return feedback
}