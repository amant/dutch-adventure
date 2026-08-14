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

function checkIndirectQuestionError(normalized: string) {
  const phrases = [
    'vroeg als', 'vroegen als', 'vraagt als', 'vragen als',
    'wilde weten als', 'wil weten als', 'benieuwd als', 'onzeker als'
  ]
  const foundPhrase = phrases.find(p => normalized.includes(p))
  if (foundPhrase) {
    const verb = foundPhrase.split(' ')[0]
    return {
      found: true,
      message: `In Dutch, indirect questions use 'of' (if/whether), not 'als'.`,
      miniLesson: {
        title: 'Indirect Questions (Of vs Als)',
        content: 'When reporting a yes/no question (e.g. "He asked if..."), Dutch always uses "of". "Als" is only used for conditional clauses (if/when something happens).',
        example: {
          wrong: `${verb} als ik kwam`,
          right: `${verb} of ik kwam`
        }
      }
    }
  }
  return { found: false }
}

function checkRelativePronounError(normalized: string) {
  // Check 1: 'alles dat', 'iets dat', 'niets dat', 'het enige dat' -> should be 'wat'
  const indefiniteMatches = [
    { wrong: 'alles dat', right: 'alles wat', word: 'alles' },
    { wrong: 'iets dat', right: 'iets wat', word: 'iets' },
    { wrong: 'niets dat', right: 'niets wat', word: 'niets' },
    { wrong: 'het enige dat', right: 'het enige wat', word: 'het enige' },
    { wrong: 'het beste dat', right: 'het beste wat', word: 'het beste' }
  ]
  for (const m of indefiniteMatches) {
    if (normalized.includes(m.wrong)) {
      return {
        found: true,
        message: `After '${m.word}', Dutch uses the relative pronoun 'wat', not 'dat'.`,
        miniLesson: {
          title: 'Relative Pronoun "Wat"',
          content: 'Use "wat" (not "dat") when referring to indefinite pronouns (alles, iets, niets, veel, weinig), superlatives (het beste, het mooiste), or an entire preceding sentence.',
          example: {
            wrong: m.wrong,
            right: m.right
          }
        }
      }
    }
  }

  // Check 2: Het-words incorrectly followed by 'die'
  const hetWords = ['rapport', 'boek', 'plan', 'probleem', 'team', 'voorstel', 'project', 'contract', 'bedrijf', 'gebouw', 'document']
  for (const hw of hetWords) {
    if (normalized.includes(`het ${hw} die`) || normalized.includes(`dat ${hw} die`)) {
      return {
        found: true,
        message: `'${hw}' is a het-word, so its relative pronoun is 'dat', not 'die'.`,
        miniLesson: {
          title: 'Relative Pronouns: Die vs Dat',
          content: 'Use "die" for de-words and all plural nouns. Use "dat" for het-words in the singular.',
          example: {
            wrong: `het ${hw} die we zagen`,
            right: `het ${hw} dat we zagen`
          }
        }
      }
    }
  }

  // Check 3: De-words incorrectly followed by 'dat'
  const deWords = ['manager', 'collega', 'klant', 'presentatie', 'offerte', 'vergadering', 'oplossing', 'strategie', 'commissie']
  for (const dw of deWords) {
    if (normalized.includes(`de ${dw} dat`) || normalized.includes(`die ${dw} dat`)) {
      return {
        found: true,
        message: `'${dw}' is a de-word, so its relative pronoun is 'die', not 'dat'.`,
        miniLesson: {
          title: 'Relative Pronouns: Die vs Dat',
          content: 'Use "die" for de-words (and plurals). "Dat" is strictly for singular het-words.',
          example: {
            wrong: `de ${dw} dat hier werkt`,
            right: `de ${dw} die hier werkt`
          }
        }
      }
    }
  }

  return { found: false }
}

function checkDoubleInfinitiveError(normalized: string) {
  // Check 1: Modal participles incorrectly used with an infinitive / compound tense
  const modalParticiples = [
    { part: 'gemoeten', inf: 'moeten', label: 'moeten' },
    { part: 'gekund', inf: 'kunnen', label: 'kunnen' },
    { part: 'gewild', inf: 'willen', label: 'willen' },
    { part: 'gemogen', inf: 'mogen', label: 'mogen' },
    { part: 'gezuld', inf: 'zullen', label: 'zullen' }
  ]

  for (const mp of modalParticiples) {
    if (normalized.includes(mp.part)) {
      return {
        found: true,
        message: `In compound tenses with another action verb, Dutch replaces the modal participle with an infinitive (IPP): use '${mp.inf}' instead of '${mp.part}'.`,
        miniLesson: {
          title: `Double Infinitive (IPP): ${mp.label.toUpperCase()}`,
          content: `When a modal verb is combined with an auxiliary and a main action verb, you must use the double infinitive (e.g. "hebben moeten wachten", not "hebben gemoeten wachten").`,
          example: {
            wrong: `hebben ${mp.part} doen`,
            right: `hebben ${mp.inf} doen`
          }
        }
      }
    }
  }

  // Check 2: Causative 'laten' incorrectly used as 'gelaten' with an infinitive
  if (normalized.includes('gelaten')) {
    const commonInfinitives = ['repareren', 'maken', 'zien', 'komen', 'wachten', 'staan', 'doen', 'halen', 'brengen', 'bezorgen', 'bouwen', 'vervangen', 'weten']
    const hasInf = commonInfinitives.some(inf => normalized.includes(inf))
    if (hasInf || normalized.includes('laten')) {
      return {
        found: true,
        message: `When 'laten' governs an action verb (causative), use the double infinitive 'laten [werkwoord]' instead of the participle 'gelaten'.`,
        miniLesson: {
          title: 'Causative "Laten": Double Infinitive',
          content: 'When "laten" is used to mean "having something done" or "letting someone do something", it becomes an infinitive in the perfect tense (e.g. "heeft laten repareren").',
          example: {
            wrong: 'heeft de auto gelaten repareren',
            right: 'heeft de auto laten repareren'
          }
        }
      }
    }
  }

  // Check 3: Perception verbs (horen, zien) incorrectly used as participles with an infinitive
  const perceptionParticiples = [
    { part: 'gehoord', inf: 'horen', label: 'horen' },
    { part: 'gezien', inf: 'zien', label: 'zien' }
  ]
  for (const pp of perceptionParticiples) {
    const commonInfinitives = ['zeggen', 'praten', 'aankomen', 'vertrekken', 'roepen', 'zingen', 'lopen', 'binnenkomen', 'rijden']
    if (normalized.includes(pp.part) && commonInfinitives.some(inf => normalized.includes(inf))) {
      return {
        found: true,
        message: `Perception verbs like '${pp.label}' take the double infinitive when governing another action verb: use '${pp.inf}' instead of '${pp.part}'.`,
        miniLesson: {
          title: `Perception Verbs & IPP: ${pp.label}`,
          content: `In Dutch, when you hear or see someone perform an action in the past, use the double infinitive (e.g. "Ik heb hem horen praten" instead of "gehoord praten").`,
          example: {
            wrong: `hebben hem ${pp.part} praten`,
            right: `hebben hem ${pp.inf} praten`
          }
        }
      }
    }
  }

  // Check 4: Instruction/Help verbs (leren, helpen) with participles + infinitive
  const instructionParticiples = [
    { part: 'geleerd', inf: 'leren', label: 'leren' },
    { part: 'geholpen', inf: 'helpen', label: 'helpen' }
  ]
  for (const ip of instructionParticiples) {
    const commonInfinitives = ['programmeren', 'spreken', 'koken', 'zwemmen', 'rijden', 'verhuizen', 'dragen', 'schoonmaken', 'schrijven', 'oplossen']
    if (normalized.includes(ip.part) && commonInfinitives.some(inf => normalized.includes(inf))) {
      return {
        found: true,
        message: `When '${ip.label}' governs an action verb in a compound tense, use the double infinitive '${ip.inf}' instead of '${ip.part}'.`,
        miniLesson: {
          title: `Instruction & Help: ${ip.label}`,
          content: `Verbs like "leren" and "helpen" drop the "ge-" prefix in compound tenses when followed by an infinitive (e.g. "hij heeft me leren programmeren").`,
          example: {
            wrong: `heeft me ${ip.part} zwemmen`,
            right: `heeft me ${ip.inf} zwemmen`
          }
        }
      }
    }
  }

  // Check 5: Motion/state verbs (blijven, gaan) with 'zijn' + participle + infinitive
  const motionParticiples = [
    { part: 'gebleven', inf: 'blijven', label: 'blijven' },
    { part: 'gegaan', inf: 'gaan', label: 'gaan' }
  ]
  for (const mp of motionParticiples) {
    const commonInfinitives = ['slapen', 'eten', 'wonen', 'zitten', 'staan', 'wandelen', 'zoeken', 'sporten', 'werken']
    if (normalized.includes(mp.part) && commonInfinitives.some(inf => normalized.includes(inf))) {
      return {
        found: true,
        message: `Verbs like '${mp.label}' take the double infinitive with 'zijn' when combined with an action: use '${mp.inf}' instead of '${mp.part}'.`,
        miniLesson: {
          title: `Double Infinitive: ${mp.label}`,
          content: `When "blijven" or "gaan" is combined with another infinitive in compound tenses with "zijn", use the double infinitive (e.g. "Zij is blijven slapen").`,
          example: {
            wrong: `is ${mp.part} slapen`,
            right: `is ${mp.inf} slapen`
          }
        }
      }
    }
  }

  return { found: false }
}

function checkConcessionError(normalized: string) {
  // Check 1: 'ondanks' used with a subject pronoun without 'dat' or 'het feit dat'
  // e.g. "ondanks hij ziek was", "ondanks we weinig tijd hadden", "ondanks ik"
  const pronounAfterOndanks = /\bondanks\s+(hij|zij|ze|wij|we|ik|je|jij|jullie|u|men)\b/i
  if (pronounAfterOndanks.test(normalized) && !normalized.includes('ondanks dat') && !normalized.includes('ondanks het feit dat')) {
    return {
      found: true,
      message: `Use 'ondanks dat' (or 'ondanks het feit dat') when introducing a clause with a verb. 'Ondanks' alone is a preposition that only takes a noun phrase (e.g. 'ondanks zijn ziekte', 'ondanks de regen').`,
      miniLesson: {
        title: 'Ondanks (Preposition) vs Ondanks dat (Conjunction)',
        content: 'In Dutch, "ondanks" is a preposition followed directly by a noun phrase. To connect a full clause containing a conjugated verb, you must use "ondanks dat" or "ondanks het feit dat".',
        example: {
          wrong: 'ondanks hij moe was, ging hij door',
          right: 'ondanks dat hij moe was, ging hij door (or: ondanks zijn vermoeidheid)'
        }
      }
    }
  }

  // Check 2: 'al' used concessively at the start without verb-first inversion
  // e.g. "al het regent", "al we weinig tijd hebben" (without "ook al")
  const startsWithAlPronoun = /^al\s+(het|hij|zij|ze|wij|we|ik|je|jij|jullie|u|de|het|een)\s+/i
  if (startsWithAlPronoun.test(normalized.trim()) && !normalized.trim().startsWith('ook al')) {
    return {
      found: true,
      message: `When starting a concessive sentence with 'al' (meaning "even though / even if"), you must use verb-first inversion (V1): 'Al [persoonsvorm] [onderwerp]...' (e.g. 'Al regent het...'). Alternatively, use 'ook al' for standard subclause order ('Ook al regent het...').`,
      miniLesson: {
        title: 'Concessive "Al": Verb-First Inversion',
        content: 'When "al" is used concessively at the head of a sentence, the finite verb must precede the subject (inversion). "Ook al", conversely, acts as a subordinating conjunction with verb-final word order.',
        example: {
          wrong: 'Al het regent, we gaan wandelen',
          right: 'Al regent het, we gaan wandelen (or: Ook al regent het...)'
        }
      }
    }
  }

  // Check 3: Correlative 'hoe [adjectief] ...' missing 'ook'
  // e.g. "hoe moeilijk het is", "hoe hard we werken", "hoe complex de situatie is"
  const hoeAdjectiveMatch = /^hoe\s+(moeilijk|zwaar|complex|veel|weinig|hard|groot|duur|ingewikkeld|lastig|goed|slecht|dringend)\b/i
  if (hoeAdjectiveMatch.test(normalized.trim()) && !normalized.includes('ook')) {
    return {
      found: true,
      message: `The correlative concessive frame 'hoe [adjectief/bijwoord] ...' requires the particle 'ook' before the verb (e.g. 'Hoe moeilijk het ook is...', 'Hoeveel moeite het ook kost...').`,
      miniLesson: {
        title: 'Correlative Concession: "Hoe [adjectief] ... ook"',
        content: 'To express "no matter how [difficult/challenging]" in Dutch, use the structure "Hoe + [adjectief/bijwoord] + [onderwerp] + [rest] + ook + [werkwoord]". The word "ook" is grammatically mandatory.',
        example: {
          wrong: 'Hoe moeilijk het is, we geven niet op',
          right: 'Hoe moeilijk het ook is, we geven niet op'
        }
      }
    }
  }

  // Check 4: 'weliswaar' missing 'maar'
  if (normalized.includes('weliswaar') && !normalized.includes('maar')) {
    return {
      found: true,
      message: `'Weliswaar' introduces a concession that must be balanced by 'maar' in the contrasting clause (e.g. 'Het voorstel is weliswaar duur, maar het levert veel op').`,
      miniLesson: {
        title: 'Correlative Contrast: "Weliswaar... maar"',
        content: '"Weliswaar" acknowledges a limitation or caveat and must be paired with "maar" to introduce the decisive counterpoint.',
        example: {
          wrong: 'Het is weliswaar duur, het levert veel op',
          right: 'Het is weliswaar duur, maar het levert veel op'
        }
      }
    }
  }

  return { found: false }
}

function checkInfinitiveClauseError(normalized: string) {
  // Check 1: Separable verbs incorrectly preceded by 'te' or 'om te'
  const separableVerbs: { full: string, prefix: string, stem: string }[] = [
    { full: 'oplossen', prefix: 'op', stem: 'lossen' },
    { full: 'voorbereiden', prefix: 'voor', stem: 'bereiden' },
    { full: 'meenemen', prefix: 'mee', stem: 'nemen' },
    { full: 'invoeren', prefix: 'in', stem: 'voeren' },
    { full: 'afspreken', prefix: 'af', stem: 'spreken' },
    { full: 'aanpakken', prefix: 'aan', stem: 'pakken' },
    { full: 'afmaken', prefix: 'af', stem: 'maken' },
    { full: 'aannemen', prefix: 'aan', stem: 'nemen' },
    { full: 'aanvragen', prefix: 'aan', stem: 'vragen' },
    { full: 'uitvoeren', prefix: 'uit', stem: 'voeren' },
    { full: 'opbellen', prefix: 'op', stem: 'bellen' },
    { full: 'doorgeven', prefix: 'door', stem: 'geven' },
    { full: 'uitnodigen', prefix: 'uit', stem: 'nodigen' },
    { full: 'samenwerken', prefix: 'samen', stem: 'werken' },
    { full: 'aankondigen', prefix: 'aan', stem: 'kondigen' },
    { full: 'doorsturen', prefix: 'door', stem: 'sturen' },
    { full: 'invullen', prefix: 'in', stem: 'vullen' },
    { full: 'opsturen', prefix: 'op', stem: 'sturen' },
    { full: 'inleveren', prefix: 'in', stem: 'leveren' },
    { full: 'aanmelden', prefix: 'aan', stem: 'melden' },
    { full: 'uitstellen', prefix: 'uit', stem: 'stellen' },
    { full: 'overleggen', prefix: 'over', stem: 'leggen' },
    { full: 'afstemmen', prefix: 'af', stem: 'stemmen' }
  ]

  for (const sv of separableVerbs) {
    if (normalized.includes(`om te ${sv.full}`) || normalized.includes(` te ${sv.full}`) || normalized.startsWith(`te ${sv.full}`)) {
      return {
        found: true,
        message: `With separable verbs, 'te' is inserted between the prefix and the stem: '${sv.prefix} te ${sv.stem}' (not 'te ${sv.full}').`,
        miniLesson: {
          title: 'Separable Verbs with "Te"',
          content: 'In Dutch infinitive clauses, "te" is inserted between the separable prefix and the verb root (e.g. "op te lossen", "voor te bereiden").',
          example: {
            wrong: `om te ${sv.full}`,
            right: `om ${sv.prefix} te ${sv.stem}`
          }
        }
      }
    }
  }

  // Check 2: Pure modal verbs incorrectly used with 'te'
  const modalTePatterns = [
    'moet te', 'moeten te', 'moest te', 'moesten te',
    'kan te', 'kunnen te', 'kon te', 'konden te',
    'wil te', 'willen te', 'wilde te', 'wilden te',
    'mag te', 'mogen te', 'mocht te', 'mochten te',
    'zal te', 'zullen te', 'zou te', 'zouden te'
  ]
  for (const mt of modalTePatterns) {
    if (normalized.includes(mt)) {
      return {
        found: true,
        message: 'Pure modal verbs (moeten, kunnen, willen, mogen, zullen) take a bare infinitive without "te".',
        miniLesson: {
          title: 'Modal Verbs: No "Te"',
          content: 'Pure modal verbs are followed directly by the infinitive without "te". Only semi-auxiliary verbs (like hoeven, blijken, schijnen, lijken) take "te".',
          example: {
            wrong: `${mt} doen`,
            right: `${mt.replace(' te', '')} doen`
          }
        }
      }
    }
  }

  // Check 3: Semi-auxiliary 'hoeven' used without 'te'
  const hasHoeven = normalized.includes('hoef niet') || 
                    normalized.includes('hoeft niet') || 
                    normalized.includes('hoeven niet') || 
                    normalized.includes('hoefde niet') || 
                    normalized.includes('hoefden niet') ||
                    normalized.includes('hoef geen') ||
                    normalized.includes('hoeft geen') ||
                    normalized.includes('hoeven geen')
  if (hasHoeven && !normalized.includes(' te ') && !normalized.includes(' te-')) {
    return {
      found: true,
      message: 'The semi-auxiliary verb "hoeven" (with niet/geen) always requires "te" before the infinitive.',
      miniLesson: {
        title: 'Semi-Auxiliary "Hoeven" Requires "Te"',
        content: 'Unlike "moeten", the verb "hoeven" must always take "te" before the infinitive (e.g. "Je hoeft niet te wachten").',
        example: {
          wrong: 'je hoeft niet wachten',
          right: 'je hoeft niet te wachten'
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

    // Reported Speech Drill Evaluation
    if (exercise.kind === 'reported-speech-drill' && exercise.reportedSpeechData) {
      const target = normalizeAnswer(exercise.target || '')
      const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[]
      
      const indirectQuestionErr = checkIndirectQuestionError(normalized)
      if (indirectQuestionErr.found) {
        return {
          ...base,
          outcome: 'acceptable',
          message: indirectQuestionErr.message,
          miniLesson: indirectQuestionErr.miniLesson,
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: 'Remember to use "of" instead of "als" when embedding a yes/no question.'
          }
        }
      }

      if (accepted.includes(normalized)) {
        if (!base.skills.includes('production')) base.skills.push('production')
        if (!base.skills.includes('grammar')) base.skills.push('grammar')
        return {
          ...base,
          outcome: 'correct',
          message: 'Excellent reporting! Your conjunction, pronoun shift, and subclause word order are spotless.',
          changeModifier: (base.changeModifier || 0) + 20
        }
      }

      // Check for SVO inside dat/of clause (verbs not at the end)
      const subclauseErrDat = checkSubordinateClauseError(normalized, 'dat')
      const subclauseErrOf = checkSubordinateClauseError(normalized, 'of')
      if (subclauseErrDat.found || subclauseErrOf.found) {
        const err = subclauseErrDat.found ? subclauseErrDat : subclauseErrOf
        return {
          ...base,
          outcome: 'retry',
          message: 'In reported speech, all verbs must go to the end of the embedded subclause.',
          explanation: err.message,
          miniLesson: err.miniLesson
        }
      }

      const similarity = calculateSimilarity(normalized, target)
      if (similarity > 0.75) {
        return {
          ...base,
          outcome: 'acceptable',
          message: 'Very close! Notice the exact word order or pronoun in the target reporting.',
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: exercise.explanation || 'Make sure the verbs are placed together at the end of the clause.'
          }
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: 'Not quite. Check how the quote transforms into an indirect clause.',
          explanation: exercise.explanation || 'Start with the reporting clause, use "dat" or "of", and move verbs to the end.'
        }
      }
    }

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