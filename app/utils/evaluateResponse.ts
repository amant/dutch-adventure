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

function checkParticipialError(normalized: string) {
  // Check 1: Separable verbs with te in front of whole word instead of infix
  // e.g. "de te oplossen problemen", "het te uitvoeren plan", "de te voorbereiden presentatie"
  const separableGerundiveRegex = /\b(de|het|een)\s+te\s+(oplossen|uitvoeren|aanpakken|voorbereiden|doorvoeren|indienen|afhandelen|samenstellen|invoeren|aannemen|aanvragen|opbellen|doorgeven|inleveren|uitstellen|overleggen|afstemmen)\b/i
  const matchSep = normalized.match(separableGerundiveRegex)
  if (matchSep) {
    const wrongWord = matchSep[2]
    return {
      found: true,
      message: `With separable verbs in gerundive (te-infinitive) constructions, insert 'te' between the prefix and the stem (e.g. 'de op te lossen problemen', NOT 'de te ${wrongWord} problemen').`,
      miniLesson: {
        title: 'Gerundive: Separable Verb Infixation',
        content: 'When forming the modal participle (gerundive) with a separable verb, the particle "te" must be placed between the separable prefix and the verb: [prefix] + te + [verb stem + en].',
        example: {
          wrong: `de te ${wrongWord} kwesties`,
          right: `de ${wrongWord.slice(0, wrongWord.length > 8 ? 3 : 2)} te ... kwesties`
        }
      }
    }
  }

  // Check 2: Missing '-e' on attributive present participles before de/het/plural nouns
  // e.g. "de stijgend kosten", "de toenemend invloed", "de dalend omzet", "de groeiend vraag"
  const uninflectedPresentParticiple = /\b(de|het)\s+(stijgend|toenemend|afnemend|dalend|groeiend|blijvend|beslissend|veranderend|dreigend|overheersend)\s+([a-z]+)\b/i
  const matchPres = normalized.match(uninflectedPresentParticiple)
  if (matchPres) {
    const art = matchPres[1]
    const part = matchPres[2]
    const noun = matchPres[3]
    return {
      found: true,
      message: `Attributive present participles used before nouns require the adjectival ending '-e': '${art} ${part}e ${noun}' (not '${part}').`,
      miniLesson: {
        title: 'Attributive Participle Inflection (-e)',
        content: 'Present participles (infinitive + -d) functioning as adjectives before nouns follow standard Dutch adjective inflection rules and almost always take an "-e" ending when preceded by "de" or "het".',
        example: {
          wrong: `${art} ${part} ${noun}`,
          right: `${art} ${part}e ${noun}`
        }
      }
    }
  }

  // Check 3: Missing 'al' in simultaneous present participle constructions
  // e.g. starting with "wandelend door het park dacht hij", "doende leert men" (without "al")
  const missingAlRegex = /^(wandelend|lezend|fietsend|pratend|rijdend|doende|zoekend|luisterend)\b/i
  if (missingAlRegex.test(normalized.trim())) {
    const verbPart = normalized.trim().split(/\s+/)[0]
    return {
      found: true,
      message: `In Dutch, simultaneous actions or manner expressed with a present participle are idiomatic when preceded by 'al' (e.g. 'Al ${verbPart}...').`,
      miniLesson: {
        title: 'Simultaneous Participle with "Al"',
        content: 'To express simultaneous action or progressive manner ("while walking / in doing so"), native Dutch pairs the present participle with "al" at the start of the clause (e.g. "Al doende leert men", "Al wandelend bedacht zij een oplossing").',
        example: {
          wrong: `${verbPart} door het park dacht hij na`,
          right: `Al ${verbPart} door het park dacht hij na`
        }
      }
    }
  }

  // Check 4: Preposition errors with concise participial formulas (Gelet op / Gezien)
  const geletPrepError = /\bgelet\s+(aan|naar|voor|over|bij)\b/i
  if (geletPrepError.test(normalized)) {
    return {
      found: true,
      message: `The fixed participial expression is 'Gelet op...' (meaning "In view of / Considering"), not 'gelet aan' or 'gelet naar'.`,
      miniLesson: {
        title: 'Fixed Participial Prepositions: Gelet op',
        content: '"Gelet op" is a standard formal Dutch participial expression that always requires the preposition "op".',
        example: {
          wrong: 'Gelet aan de recente ontwikkelingen',
          right: 'Gelet op de recente ontwikkelingen'
        }
      }
    }
  }

  return { found: false }
}

function checkConditionalRestrictiveError(normalized: string, conditionType?: string) {
  // Check 1: "mits" vs "tenzij" confusion
  if (conditionType === 'mits' && normalized.includes('tenzij')) {
    return {
      found: true,
      message: 'In this context, use "mits" (on condition that / provided that), not "tenzij" (unless / except if).',
      miniLesson: {
        title: 'Mits vs Tenzij (Condition vs Exception)',
        content: '"Mits" introduces a necessary condition that MUST be met ("alleen als" / provided that). "Tenzij" introduces an exception ("behalve als" / unless).',
        example: {
          wrong: 'We gaan akkoord, tenzij de kosten binnen budget blijven.',
          right: 'We gaan akkoord, mits de kosten binnen het budget blijven.'
        }
      }
    }
  }

  if (conditionType === 'tenzij' && normalized.includes('mits')) {
    return {
      found: true,
      message: 'In this context, use "tenzij" (unless / except if), not "mits" (provided that / only if).',
      miniLesson: {
        title: 'Tenzij vs Mits (Exception vs Condition)',
        content: '"Tenzij" expresses an exception ("behalve als" / unless). "Mits" means provided that ("alleen als").',
        example: {
          wrong: 'De vergadering gaat door, mits de voorzitter ziek is.',
          right: 'De vergadering gaat door, tenzij de voorzitter ziek is.'
        }
      }
    }
  }

  // Check 2: "op voorwaarde" missing "dat"
  const opVoorwaardeMissingDat = /\bop\s+voorwaarde\s+(we|wij|ze|zij|ik|je|jij|u|hij|het|men|de|het|ons|onze|deze|dit|[a-z]+)\b/i
  if (opVoorwaardeMissingDat.test(normalized) && !normalized.includes('op voorwaarde dat')) {
    return {
      found: true,
      message: 'The formal Dutch conjunction phrase requires "dat": "op voorwaarde dat...".',
      miniLesson: {
        title: 'Formal Condition: Op Voorwaarde Dat',
        content: 'When connecting clauses in formal Dutch, use "op voorwaarde dat" followed by subclause verb-final word order.',
        example: {
          wrong: 'op voorwaarde we de targets halen',
          right: 'op voorwaarde dat we de targets halen'
        }
      }
    }
  }

  // Check 3: "gesteld" or "aangenomen" missing "dat"
  const gesteldMissingDat = /\b(gesteld|aangenomen)\s+(we|wij|ze|zij|ik|je|jij|u|hij|het|men|de|het|ons|onze|deze|dit)\b/i
  if (gesteldMissingDat.test(normalized) && !normalized.includes('gesteld dat') && !normalized.includes('aangenomen dat')) {
    return {
      found: true,
      message: 'Hypothetical premise markers in formal Dutch require "dat": "gesteld dat..." or "aangenomen dat...".',
      miniLesson: {
        title: 'Hypothetical Premises: Gesteld Dat / Aangenomen Dat',
        content: 'To introduce a formal hypothetical scenario (Suppose that...), Dutch uses "gesteld dat" or "aangenomen dat" with subclause verb-final word order.',
        example: {
          wrong: 'gesteld we verliezen de klant, moeten we bezuinigen',
          right: 'gesteld dat we de klant verliezen, dan moeten we bezuinigen'
        }
      }
    }
  }

  // Check 4: Redundant "als" + "mocht(en)"
  if (normalized.includes('als') && (normalized.includes('mocht') || normalized.includes('mochten'))) {
    return {
      found: true,
      message: '"Mocht(en)" already triggers an inverted conditional structure replacing "als". Do not combine "als" and "mocht".',
      miniLesson: {
        title: 'Mocht... (Conditional Inversion without "Als")',
        content: 'In formal Dutch, fronting "Mocht(en) [onderwerp]..." functions as a conditional clause without needing "als".',
        example: {
          wrong: 'Als u nog vragen mocht hebben, bel ons dan.',
          right: 'Mocht u nog vragen hebben, bel ons dan.'
        }
      }
    }
  }

  // Check 5: "voor zover als" (Anglicism from "as far as")
  if (normalized.includes('voor zover als')) {
    return {
      found: true,
      message: 'In Dutch, say "voor zover" (not "voor zover als").',
      miniLesson: {
        title: 'Restrictive Clause: Voor Zover',
        content: 'Avoid literal translations of English "as far as". Dutch uses "voor zover" with subclause verb-final word order.',
        example: {
          wrong: 'voor zover als ik het dossier ken',
          right: 'voor zover ik het dossier ken'
        }
      }
    }
  }

  // Check 6: "tenzij" double negation
  if (normalized.includes('tenzij') && conditionType === 'tenzij') {
    const tenzijDoubleNegation = /\btenzij\s+.*\b(niet|geen|nooit)\b/i
    if (tenzijDoubleNegation.test(normalized)) {
      return {
        found: true,
        message: '"Tenzij" already means "unless / except if" (behalve als). Adding "niet" or "geen" creates an unintended double negative.',
        miniLesson: {
          title: 'Tenzij: Avoid Double Negation',
          content: 'Because "tenzij" already states a negative exception, adding "niet" reverses the meaning.',
          example: {
            wrong: 'De vergadering gaat door, tenzij er geen bezwaar is.',
            right: 'De vergadering gaat door, tenzij er bezwaar is.'
          }
        }
      }
    }
  }

  // Check 7: Subclause word order after "mits" or "tenzij"
  const subclauseVerbNonFinal = /\b(mits|tenzij|voor zover|op voorwaarde dat|gesteld dat)\s+(?:(?:de|het|een|ons|onze|deze|dit|geen)\s+)?([a-z]+)\s+(is|zijn|wordt|worden|blijft|blijven|heeft|hebben|kan|kunnen|moet|moeten|gaat|gaan)\s+(een|de|het|ons|onze|geen|veel|weinig|binnen|aan|in|op|voor|over|tegen|tot|direct|altijd|snel|nog)\b/i
  if (subclauseVerbNonFinal.test(normalized)) {
    return {
      found: true,
      message: 'Subordinating conjunctions like "mits", "tenzij", "op voorwaarde dat", and "voor zover" require all verbs at the end of the clause.',
      miniLesson: {
        title: 'Subclause Verb-Final Order in Conditionals',
        content: 'Conditional and restrictive conjunctions introduce subordinate clauses (SOV). Place the finite verb at the very end.',
        example: {
          wrong: 'mits het budget blijft binnen de perken',
          right: 'mits het budget binnen de perken blijft'
        }
      }
    }
  }

  return { found: false }
}

function checkCausalityError(normalized: string, relationType?: string) {
  // Check 1: "doordat" vs "omdat" (Involuntary physical/external cause vs voluntary motivation/reason)
  if (relationType === 'doordat-oorzaak') {
    if (normalized.includes('omdat') || normalized.includes(' want ')) {
      return {
        found: true,
        message: 'In formal and B2 Dutch, use "doordat" for involuntary causes, physical facts, or external events (not "omdat" or "want", which express human motivations or conscious reasons).',
        miniLesson: {
          title: 'Doordat vs Omdat (Oorzaak vs Reden)',
          content: 'Use "doordat" when something happens due to an external cause or natural force without human choice. Use "omdat" when a person makes a conscious decision based on a reason.',
          example: {
            wrong: 'Het treinverkeer lag stil omdat de bliksem was ingeslagen.',
            right: 'Het treinverkeer lag stil doordat de bliksem was ingeslagen.'
          }
        }
      }
    }
  }

  // Check 2: "aangezien" vs "doordat" (Conscious reasoned justification vs physical cause)
  if (relationType === 'aangezien-reden') {
    if (normalized.includes('doordat')) {
      return {
        found: true,
        message: 'Use "aangezien" (or "omdat") for conscious motivations and established premises, not "doordat" (which is reserved for involuntary physical causes).',
        miniLesson: {
          title: 'Aangezien (Reden) vs Doordat (Oorzaak)',
          content: 'Use "aangezien" for reasoned decisions and formal justifications ("since/as"). "Doordat" is reserved for physical or involuntary causes.',
          example: {
            wrong: 'Doordat we willen besparen, sluiten we de vestiging.',
            right: 'Aangezien we willen besparen, sluiten we de vestiging.'
          }
        }
      }
    }
  }

  // Check 3: "dankzij" or "te danken aan" used for negative outcomes/faults
  if (relationType === 'te-wijten-aan' || relationType === 'doordat-oorzaak') {
    if (normalized.includes('dankzij') || normalized.includes('te danken aan')) {
      return {
        found: true,
        message: 'In Dutch, "dankzij" and "te danken aan" are strictly used for positive or fortunate outcomes. For negative causes or faults, use "te wijten aan" (due to / to blame on) or "door/wegens".',
        miniLesson: {
          title: 'Te Wijten Aan vs Dankzij / Te Danken Aan',
          content: 'Use "te wijten aan" when blaming a negative outcome or fault. Use "dankzij" or "te danken aan" exclusively for positive achievements and fortunate circumstances.',
          example: {
            wrong: 'De vertraging was te danken aan een computerstoring.',
            right: 'De vertraging was te wijten aan een computerstoring.'
          }
        }
      }
    }
  }

  // Check 4: "te wijten aan" used for positive accomplishments
  if (relationType === 'te-danken-aan') {
    if (normalized.includes('te wijten aan')) {
      return {
        found: true,
        message: 'Use "te danken aan" or "dankzij" for positive successes and merits, not "te wijten aan" (which is for faults and negative outcomes).',
        miniLesson: {
          title: 'Te Danken Aan (Positive Merit)',
          content: 'In formal Dutch, "te danken aan" attributes success or credit to a positive factor, while "te wijten aan" assigns blame.',
          example: {
            wrong: 'De omzetgroei is te wijten aan de inzet van het team.',
            right: 'De omzetgroei is te danken aan de inzet van het team.'
          }
        }
      }
    }
  }

  // Check 5: "waardoor" vs "zodat" / "opdat" (Involuntary consequence vs deliberate purpose)
  if (relationType === 'waardoor-gevolg') {
    if (normalized.includes('zodat') || normalized.includes('opdat')) {
      return {
        found: true,
        message: 'Use "waardoor" (as a result of which) for an involuntary consequence or objective outcome. "Zodat" and "opdat" imply a deliberate purpose or planned intent.',
        miniLesson: {
          title: 'Waardoor (Gevolg) vs Zodat/Opdat (Doel/Opzet)',
          content: 'Use "waardoor" to connect an involuntary consequence of an event. Use "zodat" or "opdat" when an action is deliberately taken to achieve a specific goal.',
          example: {
            wrong: 'De server crashte, zodat alle bestanden verloren gingen.',
            right: 'De server crashte, waardoor alle bestanden verloren gingen.'
          }
        }
      }
    }
  }

  // Check 6: "teneinde" missing "te" or with finite verb
  if (relationType === 'teneinde-te' || normalized.includes('teneinde')) {
    if (normalized.includes('teneinde') && !normalized.includes(' te ') && !normalized.includes(' om ')) {
      return {
        found: true,
        message: 'The formal connector "teneinde" requires an infinitive clause with "te": "teneinde [object] te [infinitief]".',
        miniLesson: {
          title: 'Teneinde... Te (Formal Infinitive of Purpose)',
          content: 'In formal and legal Dutch, "teneinde" acts like "om... te" and must be paired with "te + infinitief" at the end of the clause.',
          example: {
            wrong: 'teneinde de kwaliteit waarborgen we',
            right: 'teneinde de kwaliteit te waarborgen'
          }
        }
      }
    }
  }

  // Check 7: "dermate" missing "dat"
  if (relationType === 'dermate-dat' || normalized.includes('dermate')) {
    if (normalized.includes('dermate') && !normalized.includes('dat')) {
      return {
        found: true,
        message: 'The correlative degree structure requires "dat": "dermate [adjectief/adverbium] dat...".',
        miniLesson: {
          title: 'Dermate... Dat (Degree & Consequence)',
          content: 'Use "dermate [intensiteit] dat [bijzin]" to express an outcome resulting from a specific high degree or magnitude.',
          example: {
            wrong: 'De vraag steeg dermate snel we konden niet leveren',
            right: 'De vraag steeg dermate snel dat we niet konden leveren'
          }
        }
      }
    }
  }

  // Check 8: "opdat" subclause word order (verbs must be final)
  if (normalized.includes('opdat')) {
    const opdatVerbNonFinal = /\bopdat\s+(?:(?:de|het|een|ons|onze|deze|dit|geen)\s+)?([a-z]+)\s+(is|zijn|wordt|worden|blijft|blijven|heeft|hebben|kan|kunnen|moet|moeten|zal|zullen)\s+([a-z]+)\b/i
    if (opdatVerbNonFinal.test(normalized)) {
      return {
        found: true,
        message: 'Clauses introduced by "opdat" are formal subordinate clauses and require verb-final (SOV) word order.',
        miniLesson: {
          title: 'Subclause Verb-Final Order after "Opdat"',
          content: '"Opdat" is a subordinating conjunction of purpose. Place all auxiliary and main verbs at the very end of the subclause.',
          example: {
            wrong: 'opdat we kunnen incidenten voorkomen',
            right: 'opdat we incidenten kunnen voorkomen'
          }
        }
      }
    }
  }

  // Check 9: "doordat" / "waardoor" / "aangezien" subclause word order
  const subclauseVerbNonFinalCausality = /\b(doordat|waardoor|aangezien|vermits)\s+(?:(?:de|het|een|ons|onze|deze|dit|geen)\s+)?([a-z]+)\s+(is|zijn|wordt|worden|blijft|blijven|heeft|hebben|kan|kunnen|moet|moeten|ging|gingen|viel|vielen|stond|stonden|lag|lagen)\s+([a-z]+)\b/i
  if (subclauseVerbNonFinalCausality.test(normalized)) {
    return {
      found: true,
      message: 'Conjunctions like "doordat", "waardoor", and "aangezien" introduce subordinate clauses and require verb-final (SOV) word order.',
      miniLesson: {
        title: 'Subclause Word Order in Causal & Consecutive Clauses',
        content: '"Doordat", "waardoor", and "aangezien" are subordinating conjunctions. The finite verb must be positioned at the end of the clause.',
        example: {
          wrong: 'doordat de stroom viel plotseling uit',
          right: 'doordat de stroom plotseling uitviel'
        }
      }
    }
  }

  return { found: false }
}

function checkFixedPrepositionRegimeError(
  normalized: string,
  fixedPrepositionData?: {
    collocationType?: string
    governingHead?: string
    fixedPreposition?: string
    commonTransferErrors?: string[]
  }
) {
  // 1. If specific fixedPrepositionData is provided for the exercise:
  if (fixedPrepositionData?.governingHead && fixedPrepositionData?.fixedPreposition) {
    const head = fixedPrepositionData.governingHead.toLowerCase()
    const rawPreps = fixedPrepositionData.fixedPreposition.toLowerCase()
    const requiredPreps = rawPreps.split(/[\/,]/).map(p => p.trim()).filter(Boolean)

    const headTokens = head.split(/[\s\/,]+/).filter(t => t.length > 2)
    const hasHead = headTokens.some(tok => normalized.includes(tok.replace(/(en|t|d)$/, ''))) || normalized.includes(head)

    if (hasHead) {
      const words = normalized.split(/\s+/)
      const hasAllRequiredPreps = requiredPreps.every(correctPrep => {
        return words.includes(correctPrep) || 
          normalized.includes(`${correctPrep} `) || 
          normalized.includes(`er${correctPrep}`) || 
          normalized.includes(`daar${correctPrep}`) || 
          normalized.includes(`waar${correctPrep}`) ||
          normalized.includes(`er ${correctPrep}`) ||
          normalized.includes(`hier${correctPrep}`)
      })

      if (!hasAllRequiredPreps) {
        const primaryPrep = requiredPreps[0]
        const typicalPreps = ['over', 'voor', 'aan', 'in', 'op', 'met', 'tegen', 'bij', 'van', 'naar', 'tot', 'om'].filter(p => !requiredPreps.includes(p))
        const usedWrong = typicalPreps.filter(p => words.includes(p))

        if (usedWrong.length > 0) {
          return {
            found: true,
            message: `Preposition error: '${fixedPrepositionData.governingHead}' strictly takes the fixed preposition '${fixedPrepositionData.fixedPreposition}', not '${usedWrong.join('/')}'.`,
            miniLesson: {
              title: `Vast Voorzetsel: ${fixedPrepositionData.governingHead} + ${fixedPrepositionData.fixedPreposition}`,
              content: `In Dutch, "${fixedPrepositionData.governingHead}" governs the preposition "${fixedPrepositionData.fixedPreposition}". Avoid direct translation or language-transfer from English/German.`,
              example: {
                wrong: `${fixedPrepositionData.governingHead} ${usedWrong[0]} ...`,
                right: `${fixedPrepositionData.governingHead} ${primaryPrep} ...`
              }
            }
          }
        }
      }
    }
  }

  // 2. Global catalogue of common B2 fixed preposition transfer errors
  const rules = [
    {
      headRegex: /\b(twijfel|twijfelt|twijfelen|getwijfeld)\b/i,
      wrongRegex: /\b(twijfel|twijfelt|twijfelen|getwijfeld)\b(?![^\.\,\;]*\baan\b)[^\.\,\;]*\b(over|in)\b/i,
      correctPrep: 'aan',
      headName: 'twijfelen',
      wrongExample: 'Ik twijfel over zijn eerlijkheid.',
      rightExample: 'Ik twijfel aan zijn eerlijkheid.',
      explanation: 'When expressing doubt about facts, reliability, or truth, Dutch strictly uses "twijfelen aan". ("Twijfelen over" is only used colloquially when hesitating between two choices).'
    },
    {
      headRegex: /\brekening\s+houd/i,
      wrongRegex: /\brekening\s+(?:moeten\s+|kunnen\s+|zullen\s+)?houden?\b(?![^\.\,\;]*\bmet\b)[^\.\,\;]*\b(voor|om|over|aan)\b/i,
      correctPrep: 'met',
      headName: 'rekening houden',
      wrongExample: 'Wij houden rekening voor vertragingen.',
      rightExample: 'Wij houden rekening met vertragingen.',
      explanation: '"Rekening houden" is always followed by "met" (to take into account / allow for).'
    },
    {
      headRegex: /\b(bestand\s+(?:is|zijn|was|waren|wezen)|bestand)\b/i,
      wrongRegex: /\bbestand\s+(?:is|zijn|was|waren)?\b(?![^\.\,\;]*\btegen\b)[^\.\,\;]*\b(voor|aan|op)\b/i,
      correctPrep: 'tegen',
      headName: 'bestand zijn',
      wrongExample: 'Dit materiaal is bestand voor hoge temperaturen.',
      rightExample: 'Dit materiaal is bestand tegen hoge temperaturen.',
      explanation: '"Bestand zijn" (to resist / withstand) requires the preposition "tegen".'
    },
    {
      headRegex: /\b(neerleggen|neergelegd|leg\s+\w+\s+neer|legt\s+\w+\s+neer)\b/i,
      wrongRegex: /\b(neerleggen|neergelegd|neer)\b(?![^\.\,\;]*\bbij\b)[^\.\,\;]*\b(aan|op|voor|met)\b/i,
      correctPrep: 'bij',
      headName: 'zich neerleggen',
      wrongExample: 'De werknemers leggen zich neer aan het besluit.',
      rightExample: 'De werknemers leggen zich neer bij het besluit.',
      explanation: '"Zich neerleggen bij" (to resign oneself to / accept an inevitable decision) always takes "bij".'
    },
    {
      headRegex: /\b(bijdragen|bijdraagt|bijgedragen|draag\s+\w+\s+bij|draagt\s+\w+\s+bij)\b/i,
      wrongRegex: /\b(bijdragen|bijdraagt|bijgedragen)\b(?![^\.\,\;]*\baan\b)[^\.\,\;]*\b(naar|voor|in)\b/i,
      correctPrep: 'aan',
      headName: 'bijdragen',
      wrongExample: 'Dit project draagt bij voor onze doelstellingen.',
      rightExample: 'Dit project draagt bij aan onze doelstellingen.',
      explanation: '"Bijdragen" (to contribute) takes "aan" in Dutch (bijdragen aan een doel/oplossing).'
    },
    {
      headRegex: /\b(voldoen|voldoet|voldaan)\b/i,
      wrongRegex: /\b(voldoen|voldoet|voldaan)\b(?![^\.\,\;]*\baan\b)[^\.\,\;]*\b(in|op|voor|met)\b/i,
      correctPrep: 'aan',
      headName: 'voldoen',
      wrongExample: 'Het voorstel voldoet voor alle eisen.',
      rightExample: 'Het voorstel voldoet aan alle eisen.',
      explanation: '"Voldoen aan" (to satisfy / comply with requirements or expectations) takes "aan".'
    },
    {
      headRegex: /\b(gepaard\s+gaan|gepaard\s+gaat|gepaard\s+ging|gepaard\s+gegaan)\b/i,
      wrongRegex: /\bgepaard\s+(?:gaat|gaan|ging|gegaan)\b(?![^\.\,\;]*\bmet\b)[^\.\,\;]*\b(in|aan|door|voor)\b/i,
      correctPrep: 'met',
      headName: 'gepaard gaan',
      wrongExample: 'De verandering gaat gepaard in grote risico\'s.',
      rightExample: 'De verandering gaat gepaard met grote risico\'s.',
      explanation: '"Gepaard gaan met" (to be accompanied by / go hand in hand with) always takes "met".'
    },
    {
      headRegex: /\b(inspelen|inspeelt|ingespeeld|speel\s+\w+\s+in|speelt\s+\w+\s+in)\b/i,
      wrongRegex: /\b(inspelen|inspeelt|ingespeeld)\b(?![^\.\,\;]*\bop\b)[^\.\,\;]*\b(in|aan|naar|voor)\b/i,
      correctPrep: 'op',
      headName: 'inspelen',
      wrongExample: 'Wij moeten inspelen naar de behoeften van de klant.',
      rightExample: 'Wij moeten inspelen op de behoeften van de klant.',
      explanation: '"Inspelen op" (to respond / anticipate / adapt to) takes "op".'
    },
    {
      headRegex: /\b(voorzien|voorziet|voorziening)\b/i,
      wrongRegex: /\b(voorzien|voorziet)\b(?![^\.\,\;]*\bin\b)[^\.\,\;]*\b(voor|met|aan)\s+(?:de\s+behoefte|het\s+onderhoud|de\s+kosten)\b/i,
      correctPrep: 'in',
      headName: 'voorzien',
      wrongExample: 'De subsidie voorziet voor de kosten.',
      rightExample: 'De subsidie voorziet in de kosten.',
      explanation: '"Voorzien in" (to provide for / cover a need or cost) takes "in".'
    },
    {
      headRegex: /\b(opgewassen)\b/i,
      wrongRegex: /\bopgewassen\s+(?:is|zijn|was|waren)?\b(?![^\.\,\;]*\btegen\b)[^\.\,\;]*\b(voor|aan|op)\b/i,
      correctPrep: 'tegen',
      headName: 'opgewassen zijn',
      wrongExample: 'Zij zijn niet opgewassen voor deze zware taak.',
      rightExample: 'Zij zijn niet opgewassen tegen deze zware taak.',
      explanation: '"Opgewassen zijn tegen" (to be equal to / up to a challenge or opponent) takes "tegen".'
    },
    {
      headRegex: /\b(behoefte)\b/i,
      wrongRegex: /\bbehoefte\b(?![^\.\,\;]*\baan\b)[^\.\,\;]*\b(voor|om|naar)\b/i,
      correctPrep: 'aan',
      headName: 'behoefte',
      wrongExample: 'Er is een grote behoefte voor vernieuwing.',
      rightExample: 'Er is een grote behoefte aan vernieuwing.',
      explanation: '"Behoefte aan" (need for / desire for) is always followed by "aan".'
    },
    {
      headRegex: /\b(bezwaar|bezwaren)\b/i,
      wrongRegex: /\bbezwaar\b(?![^\.\,\;]*\btegen\b)[^\.\,\;]*\b(op|voor|aan)\b/i,
      correctPrep: 'tegen',
      headName: 'bezwaar',
      wrongExample: 'Ik heb bezwaar op dit nieuwe beleid.',
      rightExample: 'Ik heb bezwaar tegen dit nieuwe beleid.',
      explanation: '"Bezwaar hebben tegen" / "bezwaar maken tegen" (to object to) requires "tegen".'
    },
    {
      headRegex: /\b(verantwoordelijk)\b/i,
      wrongRegex: /\bverantwoordelijk\b(?![^\.\,\;]*\bvoor\b)[^\.\,\;]*\b(over|aan|van)\b/i,
      correctPrep: 'voor',
      headName: 'verantwoordelijk',
      wrongExample: 'Wie is verantwoordelijk over dit project?',
      rightExample: 'Wie is verantwoordelijk voor dit project?',
      explanation: '"Verantwoordelijk voor" (responsible for) takes "voor".'
    },
    {
      headRegex: /\b(bemoeien|bemoeit|bemoeid|bemoei)\b/i,
      wrongRegex: /\b(bemoeien|bemoeit|bemoeid|bemoei)\b(?![^\.\,\;]*\bmet\b)[^\.\,\;]*\b(over|om|aan|in)\b/i,
      correctPrep: 'met',
      headName: 'zich bemoeien',
      wrongExample: 'Hij bemoeit zich over alles.',
      rightExample: 'Hij bemoeit zich met alles.',
      explanation: '"Zich bemoeien met" (to interfere with / mind someone\'s business) takes "met".'
    }
  ]

  for (const rule of rules) {
    if (rule.headRegex.test(normalized) && rule.wrongRegex.test(normalized) && !normalized.includes(rule.correctPrep)) {
      return {
        found: true,
        message: `Fixed Preposition error: "${rule.headName}" is paired with "${rule.correctPrep}", not with the preposition you used.`,
        miniLesson: {
          title: `Vaste Voorzetsels: ${rule.headName} + ${rule.correctPrep}`,
          content: rule.explanation,
          example: {
            wrong: rule.wrongExample,
            right: rule.rightExample
          }
        }
      }
    }
  }

  return { found: false }
}

function checkMidfieldOrderError(
  normalized: string,
  midfieldData?: {
    focusRule: 'tmp-order' | 'definite-vs-indefinite-object' | 'indirect-direct-object' | 'negation-placement' | 'modal-adverb-tmp'
    slots?: {
      time?: string
      manner?: string
      place?: string
      directObject?: { text: string; isDefinite: boolean }
      indirectObject?: { text: string; preposition?: string }
      negation?: 'niet' | 'geen'
      predicateOrPrepObject?: string
    }
  }
) {
  // 1. Check: "niet een" instead of "geen"
  if (/\bniet\s+een\b/i.test(normalized)) {
    return {
      found: true,
      message: 'In Dutch, do not use "niet een" to negate an indefinite noun. Use "geen" instead (e.g. "geen fout", "geen rapport").',
      miniLesson: {
        title: 'Negation: Geen vs Niet Een',
        content: 'Dutch always negates indefinite nouns (nouns preceded by "een" or plural nouns with no article) using "geen", never "niet een".',
        example: {
          wrong: 'Hij heeft gisteren niet een e-mail gestuurd.',
          right: 'Hij heeft gisteren geen e-mail gestuurd.'
        }
      }
    }
  }

  // 2. Check: "niet" placed at the very end after a prepositional/directional phrase or predicate adjective
  if (/\b(naar|in|op|aan|bij|voor|uit)\s+(?:(?:het|de|een|mijn|jouw|zijn|haar|ons|onze|hun|deze|dit|dat)\s+)?[a-z]+\s+niet\b/i.test(normalized) || /\b(klaar|tevreden|bereikbaar|aanwezig)\s+niet\b/i.test(normalized)) {
    return {
      found: true,
      message: 'In Dutch, "niet" is placed BEFORE prepositional/directional phrases and predicate adjectives, not after them.',
      miniLesson: {
        title: 'Negation Placement: Before Prepositional Phrases & Predicates',
        content: 'When negating a sentence, "niet" precedes prepositional phrases, directional complements, and predicate adjectives (e.g. "niet naar kantoor", "niet tevreden").',
        example: {
          wrong: 'De manager gaat naar Amsterdam niet.',
          right: 'De manager gaat niet naar Amsterdam.'
        }
      }
    }
  }

  // 3. Check: "niet" placed before a definite direct object (e.g. "niet het rapport", "niet de plannen")
  if (/\bniet\s+(het|de|dit|dat|deze|mijn|jouw|zijn|haar|ons|onze|hun)\s+[a-z]+/i.test(normalized)) {
    // Only flag if it is not a contrastive "niet X maar Y"
    if (!normalized.includes(' maar ')) {
      return {
        found: true,
        message: 'Definite direct objects (with "de/het/dit/mijn") precede "niet" in the midfield: "[Definite Object] + niet" (e.g. "het rapport niet ondertekend").',
        miniLesson: {
          title: 'Negation Placement: After Definite Direct Objects',
          content: 'A definite direct object (with de, het, dit, or possessives) comes before "niet" in the midfield, unless you are making a specific contrast with "maar".',
          example: {
            wrong: 'Ik heb gisteren niet het rapport gelezen.',
            right: 'Ik heb het rapport gisteren niet gelezen.'
          }
        }
      }
    }
  }

  // 4. Check: Place before Time (Plaats vóór Tijd)
  // E.g., "naar kantoor gisteren", "in amsterdam morgen", "op kantoor vandaag", "naar brussel vorige week"
  const placeBeforeTimeRegex = /\b(naar|in|op|bij|voor|uit|thuis)\s+(?:(?:het|de|een|mijn|jouw|zijn|haar|ons|onze|hun|deze|dit|dat)\s+)?[a-z]+\s+(gisteren|vandaag|morgen|vorige\s+week|volgende\s+week|altijd|nooit|vaak|om\s+\w+\s+uur|elke\s+dag|binnenkort)\b/i
  if (placeBeforeTimeRegex.test(normalized) || /\bthuis\s+(gisteren|vandaag|morgen|vorige\s+week|volgende\s+week|altijd|nooit|vaak)\b/i.test(normalized)) {
    return {
      found: true,
      message: 'TMP Rule violation: In the Dutch midfield, Time (Tijd) comes BEFORE Place (Plaats). Place should be after Time.',
      miniLesson: {
        title: 'TMP Rule: Time Before Place (Tijd vóór Plaats)',
        content: 'Adverbial adjuncts follow the strict order: Tijd (Time) → Manier (Manner) → Plaats (Place). Never put Place before Time.',
        example: {
          wrong: 'Ik reis naar kantoor morgen.',
          right: 'Ik reis morgen naar kantoor.'
        }
      }
    }
  }

  // 5. Check: Place before Manner (Plaats vóór Manier/Wijze)
  // E.g., "naar kantoor met de trein", "in het park snel", "op school aandachtig"
  const placeBeforeMannerRegex = /\b(naar|in|op|bij|voor|uit|thuis)\s+(?:(?:het|de|een|mijn|jouw|zijn|haar|ons|onze|hun|deze|dit|dat)\s+)?[a-z]+\s+(met\s+de\s+\w+|per\s+\w+|zorgvuldig|aandachtig|snel|rustig|graag|samen|alleen|met\s+plezier)\b/i
  if (placeBeforeMannerRegex.test(normalized) || /\bthuis\s+(met\s+de\s+\w+|per\s+\w+|zorgvuldig|aandachtig|snel|rustig|graag|samen|alleen|met\s+plezier)\b/i.test(normalized)) {
    return {
      found: true,
      message: 'TMP Rule violation: Manner / Means (Manier/Wijze) comes BEFORE Place (Plaats) in Dutch: Time → Manner → Place.',
      miniLesson: {
        title: 'TMP Rule: Manner Before Place (Manier vóór Plaats)',
        content: 'In Dutch, how you do something (Manner/Means) precedes where you do it (Place/Direction): "met de trein (Manier) naar Amsterdam (Plaats)".',
        example: {
          wrong: 'Wij reizen naar Brussel met de trein.',
          right: 'Wij reizen met de trein naar Brussel.'
        }
      }
    }
  }

  // 6. Check: Manner before Time (Manier vóór Tijd)
  // E.g., "met de trein gisteren", "zorgvuldig vandaag", "met plezier morgen"
  const mannerBeforeTimeRegex = /\b(met\s+de\s+\w+|per\s+\w+|zorgvuldig|aandachtig|met\s+plezier)\s+(gisteren|vandaag|morgen|vorige\s+week|volgende\s+week|om\s+\w+\s+uur)\b/i
  if (mannerBeforeTimeRegex.test(normalized)) {
    return {
      found: true,
      message: 'TMP Rule violation: Time (Tijd) comes BEFORE Manner (Manier/Wijze) in Dutch.',
      miniLesson: {
        title: 'TMP Rule: Time Before Manner (Tijd vóór Manier)',
        content: 'Adverbial time adjuncts take priority at the front of the midfield: Time first, then Manner, then Place.',
        example: {
          wrong: 'Zij heeft met veel plezier gisteren gewerkt.',
          right: 'Zij heeft gisteren met veel plezier gewerkt.'
        }
      }
    }
  }

  // 7. Check: Indirect Object without preposition placed AFTER Direct Object
  // E.g. "Ik geef het rapport de manager" instead of "Ik geef de manager het rapport" or "Ik geef het rapport aan de manager"
  if (midfieldData?.focusRule === 'indirect-direct-object') {
    if (/\bgeef(t)?\s+(het|de|dit)\s+[a-z]+\s+(de|het|deze|mijn)\s+[a-z]+\b/i.test(normalized) && !normalized.includes('aan') && !normalized.includes('voor')) {
      return {
        found: true,
        message: 'Without a preposition like "aan", the Indirect Object (Meewerkend Voorwerp) must come BEFORE the Direct Object (e.g. "Ik geef de directeur het document").',
        miniLesson: {
          title: 'Object Ordering: Indirect Before Direct',
          content: 'In Dutch without prepositions: [Onderwerp] + [Persoonsvorm] + [Indirect Object] + [Direct Object]. Alternatively, use "aan": [Direct Object] + [aan + Indirect Object].',
          example: {
            wrong: 'Ik overhandig het contract de klant.',
            right: 'Ik overhandig de klant het contract.'
          }
        }
      }
    }
  }

  // 8. Check: Indefinite Object placed before Time
  // E.g. "een boek gisteren" vs "gisteren een boek"
  if (midfieldData?.focusRule === 'definite-vs-indefinite-object') {
    if (/\b(een|twee|drie)\s+[a-z]+\s+(gisteren|vandaag|morgen|vorige\s+week)\b/i.test(normalized)) {
      return {
        found: true,
        message: 'Indefinite direct objects (with "een" / numerals) follow Time and Manner in the midfield: "gisteren (Time) een rapport (Indefinite Object)".',
        miniLesson: {
          title: 'Indefinite Object Position: After Time & Manner',
          content: 'Unlike definite objects which precede TMP, indefinite direct objects appear towards the end of the midfield, following Time and Manner.',
          example: {
            wrong: 'Ik heb een presentatie gisteren voorbereid.',
            right: 'Ik heb gisteren een presentatie voorbereid.'
          }
        }
      }
    }
  }

  return { found: false }
}

function checkPrefixVerbError(
  normalized: string,
  prefixVerbData?: {
    verb: string
    stressPattern: 'separable-stressed-prefix' | 'inseparable-stressed-stem'
    stressedForm: string
    meaningDefinition: string
    targetStructure: 'present-main' | 'present-subclause' | 'perfect-tense' | 'infinitive-te'
  }
) {
  if (!prefixVerbData) return { found: false }
  const { verb, stressPattern, targetStructure } = prefixVerbData

  // 1. Inseparable verb erroneously split in main clause present tense
  if (stressPattern === 'inseparable-stressed-stem' && targetStructure === 'present-main') {
    // E.g., voorkómen -> "komt ... voor", ondergáán -> "gaat ... onder", overléggen -> "legt ... over", achterhálen -> "haalt ... achter", doorbréken -> "breekt ... door"
    if (verb === 'voorkomen' && /\bkomt?\b.*\bvoor\b/i.test(normalized)) {
      return {
        found: true,
        message: 'In the meaning of "prevent" (voorkómen), the verb is inseparable (stress on -komen). It never splits in a main clause: "De arts voorkomt complicaties" (not "komt... voor").',
        miniLesson: {
          title: 'Voorkómen (Inseparable) vs Vóórkomen (Separable)',
          content: 'Voorkómen (stress on stem) means to prevent and is inseparable. Vóórkomen (stress on prefix) means to occur or appear in court and splits in main clauses.',
          example: {
            wrong: 'De specialist komt een ernstige fout voor.',
            right: 'De specialist voorkomt een ernstige fout.'
          }
        }
      }
    }

    if (verb === 'ondergaan' && /\bgaat?\b.*\bonder\b/i.test(normalized)) {
      return {
        found: true,
        message: 'In the meaning of "undergo / endure" (ondergáán), the verb is inseparable. It never splits: "De patiënt ondergaat een behandeling" (not "gaat... onder").',
        miniLesson: {
          title: 'Ondergáán (Inseparable: Undergo) vs Óndergaan (Separable: Set)',
          content: 'Ondergáán (inseparable) means to endure or undergo. Óndergaan (separable) is used for the sun setting or sinking.',
          example: {
            wrong: 'De patiënt gaat een zware operatie onder.',
            right: 'De patiënt ondergaat een zware operatie.'
          }
        }
      }
    }

    if (verb === 'overleggen' && /\blegt?\b.*\bover\b/i.test(normalized)) {
      return {
        found: true,
        message: 'In the meaning of "deliberate / consult" (overléggen), the verb is inseparable. It does not split: "De manager overlegt met het team" (not "legt... over").',
        miniLesson: {
          title: 'Overléggen (Consult) vs Óverleggen (Submit Proof)',
          content: 'Overléggen (inseparable) means to discuss or deliberate. Óverleggen (separable) means to present or submit documents.',
          example: {
            wrong: 'De manager legt met de commissie over.',
            right: 'De manager overlegt met de commissie.'
          }
        }
      }
    }

    if (verb === 'doorbreken' && /\bbreekt?\b.*\bdoor\b/i.test(normalized)) {
      return {
        found: true,
        message: 'In the figurative meaning of "break through a deadlock / taboo" (doorbréken), the verb is inseparable. It does not split: "De bemiddelaar doorbreekt de impasse" (not "breekt... door").',
        miniLesson: {
          title: 'Doorbréken (Break Deadlock) vs Dóórbreken (Break Physically)',
          content: 'Doorbréken (inseparable) is figurative (deadlock, taboo). Dóórbreken (separable) is physical (a dam bursting, sun breaking through clouds).',
          example: {
            wrong: 'Het team breekt de impasse door.',
            right: 'Het team doorbreekt de impasse.'
          }
        }
      }
    }

    if (verb === 'achterhalen' && /\bhaalt?\b.*\bachter\b/i.test(normalized)) {
      return {
        found: true,
        message: '"Achterhalen" (to find out / trace) is strictly inseparable in modern Dutch. It never splits: "De politie achterhaalt de waarheid" (not "haalt... achter").',
        miniLesson: {
          title: 'Achterhálen (Inseparable)',
          content: 'Achterhálen (stress on -halen) is inseparable. Never split it into "haalt... achter".',
          example: {
            wrong: 'De recherche haalt de identiteit achter.',
            right: 'De recherche achterhaalt de identiteit.'
          }
        }
      }
    }

    if (verb === 'doorlopen' && /\bloopt?\b.*\bdoor\b/i.test(normalized)) {
      return {
        found: true,
        message: 'In the meaning of "complete a curriculum / training" (doorlópen), the verb is inseparable: "De student doorloopt alle fasen" (not "loopt... door").',
        miniLesson: {
          title: 'Doorlópen (Complete) vs Dóórlopen (Keep Walking)',
          content: 'Doorlópen (inseparable) means completing a process or education. Dóórlopen (separable) means continuing to walk without stopping.',
          example: {
            wrong: 'De cursist loopt het hele traject door.',
            right: 'De cursist doorloopt het hele traject.'
          }
        }
      }
    }
  }

  // 2. Separable verb failed to split in main clause present tense
  if (stressPattern === 'separable-stressed-prefix' && targetStructure === 'present-main') {
    if (verb === 'voorkomen' && /\bvoorkomt\b/i.test(normalized)) {
      return {
        found: true,
        message: 'In the meaning of "occur / happen" (vóórkomen), the verb is separable and must split in a main clause: "Dit incident komt zelden voor" (not "voorkomt").',
        miniLesson: {
          title: 'Vóórkomen (Separable: Occur)',
          content: 'When vóórkomen means to occur, happen, or appear in court, it splits in main clauses: "Het komt regelmatig voor".',
          example: {
            wrong: 'Dit probleem voorkomt regelmatig in de praktijk.',
            right: 'Dit probleem komt regelmatig voor in de praktijk.'
          }
        }
      }
    }

    if (verb === 'overleggen' && /\boverlegt\b/i.test(normalized)) {
      return {
        found: true,
        message: 'In the meaning of "present / submit documents" (óverleggen), the verb is separable and must split: "De kandidaat legt zijn diploma over" (not "overlegt").',
        miniLesson: {
          title: 'Óverleggen (Separable: Submit Documents)',
          content: 'When óverleggen means submitting certificates or proof, it splits in main clauses: "Hij legt zijn papieren over".',
          example: {
            wrong: 'De sollicitant overlegt een geldig paspoort.',
            right: 'De sollicitant legt een geldig paspoort over.'
          }
        }
      }
    }

    if (verb === 'ondergaan' && /\bondergaat\b/i.test(normalized)) {
      return {
        found: true,
        message: 'When describing the sun setting (óndergaan), the verb is separable and must split: "De zon gaat om acht uur onder" (not "ondergaat").',
        miniLesson: {
          title: 'Óndergaan (Separable: Sun Setting)',
          content: 'Óndergaan (separable) splits in main clauses: "De zon gaat prachtig onder".',
          example: {
            wrong: 'De zon ondergaat langzaam aan de horizon.',
            right: 'De zon gaat langzaam onder aan de horizon.'
          }
        }
      }
    }
  }

  // 3. Participle formation errors in Perfect Tense
  if (targetStructure === 'perfect-tense') {
    // Inseparable participle with wrong "ge-" prefix
    if (stressPattern === 'inseparable-stressed-stem') {
      if (/\b(achtergehaald|ondergegaan|doorgebroken|omgevat)\b/i.test(normalized)) {
        return {
          found: true,
          message: 'Inseparable prefix verbs do NOT get "ge-" in the past participle: "heeft achterhaald", "heeft ondergaan", "heeft doorbroken", "heeft omvat".',
          miniLesson: {
            title: 'No "Ge-" in Inseparable Participles',
            content: 'Verbs with unstressed prefixes (voorkómen, achterhálen, ondergáán, doorbréken) form their past participle without "ge-".',
            example: {
              wrong: 'De politie heeft de waarheid achtergehaald.',
              right: 'De politie heeft de waarheid achterhaald.'
            }
          }
        }
      }

      if (verb === 'voorkomen' && /\bvoorgekomen\b/i.test(normalized)) {
        return {
          found: true,
          message: 'For "prevent" (voorkómen), the past participle is "heeft voorkomen" (no "ge-"). "Voorgekomen" is the participle of separable "vóórkomen" (occurred).',
          miniLesson: {
            title: 'Voorkomen (Prevented) vs Voorgekomen (Occurred)',
            content: 'Voorkómen (prevent) -> heeft voorkomen. Vóórkomen (occur) -> is voorgekomen.',
            example: {
              wrong: 'De directie heeft een crisis voorgekomen.',
              right: 'De directie heeft een crisis voorkomen.'
            }
          }
        }
      }

      if (verb === 'overleggen' && /\bovergelegd\b/i.test(normalized)) {
        return {
          found: true,
          message: 'For "consulted / deliberated" (overléggen), the participle is "overlegd" (no "ge-"). "Overgelegd" is for submitting documents.',
          miniLesson: {
            title: 'Overlegd (Deliberated) vs Overgelegd (Submitted)',
            content: 'Overléggen (consult) -> heeft overlegd. Óverleggen (submit proof) -> heeft overgelegd.',
            example: {
              wrong: 'De minister heeft met de bonden overgelegd.',
              right: 'De minister heeft met de bonden overlegd.'
            }
          }
        }
      }

      // Auxiliary error: using "zijn" instead of "hebben" for inseparable transitive actions
      if (verb === 'voorkomen' && /\b(is|zijn)\s+.*voorkomen\b/i.test(normalized)) {
        return {
          found: true,
          message: 'To prevent something (voorkómen) takes the auxiliary "hebben": "heeft een ramp voorkomen" (not "is voorkomen").',
          miniLesson: {
            title: 'Auxiliary with Voorkómen',
            content: 'Transitive voorkómen (prevent) uses "hebben". Intransitive vóórkomen (occur) uses "zijn".',
            example: {
              wrong: 'Het management is een crisis voorkomen.',
              right: 'Het management heeft een crisis voorkomen.'
            }
          }
        }
      }
    }

    // Separable participle missing "ge-" or with wrong auxiliary
    if (stressPattern === 'separable-stressed-prefix') {
      if (verb === 'voorkomen' && /\bheeft\s+.*voorgekomen\b/i.test(normalized)) {
        return {
          found: true,
          message: 'Intransitive "vóórkomen" (to occur / happen) takes the auxiliary "zijn": "Dit incident is vaker voorgekomen" (not "heeft").',
          miniLesson: {
            title: 'Auxiliary with Vóórkomen (Occur)',
            content: 'Vóórkomen in the sense of happening takes "zijn" (is voorgekomen).',
            example: {
              wrong: 'Dit probleem heeft al eerder voorgekomen.',
              right: 'Dit probleem is al eerder voorgekomen.'
            }
          }
        }
      }

      if (verb === 'ondergaan' && /\bheeft\s+.*ondergegaan\b/i.test(normalized)) {
        return {
          found: true,
          message: 'The sun setting (óndergaan) takes the auxiliary "zijn": "De zon is al ondergegaan" (not "heeft").',
          miniLesson: {
            title: 'Auxiliary with Óndergaan (Sun Setting)',
            content: 'Óndergaan (setting) is an intransitive state change and uses "zijn".',
            example: {
              wrong: 'De zon heeft al ondergegaan.',
              right: 'De zon is al ondergegaan.'
            }
          }
        }
      }
    }
  }

  // 4. "Te" Placement in Infinitive Clauses
  if (targetStructure === 'infinitive-te') {
    // Inseparable verb with "te" erroneously inserted inside prefix
    if (stressPattern === 'inseparable-stressed-stem') {
      if (/\b(voor te komen|achter te halen|onder te gaan|over te leggen|door te lopen|door te breken)\b/i.test(normalized)) {
        return {
          found: true,
          message: 'For inseparable verbs, "te" is placed BEFORE the entire verb: "om een ramp te voorkomen", "om de oorzaak te achterhalen" (never inserted between prefix and stem).',
          miniLesson: {
            title: 'Te + Inseparable Verb (No Infixation)',
            content: 'Inseparable verbs are treated as single atomic words. Place "te" directly in front of the verb (e.g. "te voorkomen", "te achterhalen").',
            example: {
              wrong: 'om de fout voor te komen',
              right: 'om de fout te voorkomen'
            }
          }
        }
      }
    }

    // Separable verb with "te" outside prefix
    if (stressPattern === 'separable-stressed-prefix') {
      if (/\bom\s+te\s+(overleggen|voorkomen)\b/i.test(normalized)) {
        return {
          found: true,
          message: 'For separable verbs, "te" is inserted BETWEEN the prefix and the stem: "over te leggen", "voor te komen".',
          miniLesson: {
            title: 'Te + Separable Verb (Infixation)',
            content: 'Separable verbs split around "te": [voorvoegsel] + te + [stam] (e.g. "over te leggen", "voor te komen").',
            example: {
              wrong: 'verplicht om te overleggen',
              right: 'verplicht om over te leggen'
            }
          }
        }
      }
    }
  }

  return { found: false }
}

function checkPronominalSplittingError(
  normalized: string,
  pronominalSplittingData?: {
    rWord?: string
    preposition?: string
    combinedForm?: string
    clauseType?: string
    splittingStatus?: string
  }
) {
  // 1. If explicit pronominalSplittingData is provided:
  if (pronominalSplittingData?.rWord && pronominalSplittingData?.preposition) {
    const rWord = pronominalSplittingData.rWord.toLowerCase()
    const prep = pronominalSplittingData.preposition.toLowerCase()
    const combined = (pronominalSplittingData.combinedForm || `${rWord}${prep}`).toLowerCase().replace(/\s+/g, '')

    // Check if learner kept the unsplit combined form in a clause where splitting was requested
    if (normalized.includes(combined)) {
      return {
        found: true,
        message: `In natural Dutch spoken register and standard word order, separate '${rWord}' and '${prep}'. Place '${rWord}' early in the clause and '${prep}' right before the verbal group or predicate.`,
        miniLesson: {
          title: 'Splitsing van het Voornaamwoordelijk Bijwoord',
          content: `In Dutch, pronominal adverbs like "${rWord} + ${prep}" are systematically split in natural communication. The R-word sits near the front/subject, and the stranded preposition sits at the end of the midfield right before the verb cluster.`,
          example: {
            wrong: `... ${combined} ...`,
            right: `... ${rWord} ... ${prep} [werkwoord]`
          }
        }
      }
    }

    // Check if preposition was placed right next to finite verb before the midfield (e.g. "Ik praat over er" or "Ik denk aan daar")
    const transferPattern = new RegExp(`\\b${prep}\\s+(?:er|hier|daar|waar|het|dat)\\b`, 'i')
    if (transferPattern.test(normalized)) {
      return {
        found: true,
        message: `In Dutch, you cannot combine prepositions directly with inanimate pronouns (e.g. "${prep} het" / "${prep} dat" is ungrammatical). Use the split R-form: "${rWord} ... ${prep}".`,
        miniLesson: {
          title: 'Geen Voorzetsel + Het/Dat bij Zaken',
          content: `Prepositions cannot take "het" or "dat" for inanimate objects. They must convert to R-words (er/hier/daar/waar) and split naturally across the midfield.`,
          example: {
            wrong: `... ${prep} het/dat ...`,
            right: `... ${rWord} ... ${prep} ...`
          }
        }
      }
    }
  }

  // 2. Global check for common unsplit pronominal adverbs in spoken-style drills
  const commonUnsplit = [
    { combined: 'erover', r: 'er', p: 'over' },
    { combined: 'ernaar', r: 'er', p: 'naar' },
    { combined: 'eraan', r: 'er', p: 'aan' },
    { combined: 'ermee', r: 'er', p: 'mee' },
    { combined: 'erin', r: 'er', p: 'in' },
    { combined: 'ervoor', r: 'er', p: 'voor' },
    { combined: 'ertegen', r: 'er', p: 'tegen' },
    { combined: 'erop', r: 'er', p: 'op' },
    { combined: 'waarover', r: 'waar', p: 'over' },
    { combined: 'waarnaar', r: 'waar', p: 'naar' },
    { combined: 'waaraan', r: 'waar', p: 'aan' },
    { combined: 'waarmee', r: 'waar', p: 'mee' },
    { combined: 'waarop', r: 'waar', p: 'op' }
  ]

  for (const item of commonUnsplit) {
    if (normalized.startsWith(`${item.combined} `) && !normalized.includes(` ${item.p} `)) {
      // Starting questions with "waarnaar..." or "waarover..."
      if (item.r === 'waar') {
        return {
          found: true,
          message: `While "${item.combined}" is accepted in formal written Dutch, starting questions with "${item.r} ... ${item.p}?" sounds much more natural and spontaneous.`,
          miniLesson: {
            title: 'Vraagzinnen met Waar... [Voorzetsel]?',
            content: `In everyday Dutch questions, split "${item.combined}" into "${item.r} ... ${item.p}?": place "${item.r}" at the start and "${item.p}" immediately before the final verb or sentence end.`,
            example: {
              wrong: `${item.combined} denk je?`,
              right: `${item.r} denk je aan?`
            }
          }
        }
      }
    }
  }

  return { found: false }
}

function checkAspectError(
  normalized: string,
  aspectData?: {
    aspectCategory?: string
    postureOrAspectVerb?: string
    infinitiveAction?: string
    clauseType?: string
  }
) {
  // 1. If explicit aspectData is provided:
  if (aspectData) {
    const { aspectCategory, postureOrAspectVerb } = aspectData

    // Posture durative missing 'te' (e.g. "zit studeren", "staat wachten", "ligt slapen", "loopt ijsberen")
    if (aspectCategory === 'posture-durative') {
      if (/\b(zit|zit|zitten|zat|zaten|staat|staan|stond|stonden|ligt|liggen|lag|lagen|loopt|lopen|liep|liepen|hangt|hangen|hing|hingen)\s+(?:[a-z\s]+)?(lezen|werken|studeren|kijken|wachten|denken|praten|slapen|ijsberen|luisteren)\b/i.test(normalized)) {
        if (!normalized.includes(' te ') && !normalized.includes('aan het')) {
          return {
            found: true,
            message: 'Posture verbs expressing durative action (zitten, staan, liggen, lopen, hangen) must be followed by "te + infinitief" (e.g. "zit te studeren", "staat te wachten").',
            miniLesson: {
              title: 'Houdingswerkwoorden + Te + Infinitief',
              content: 'When using posture verbs to describe an ongoing state or activity, Dutch always requires the particle "te" before the main infinitive.',
              example: {
                wrong: 'Hij zit de jaarcijfers bestuderen.',
                right: 'Hij zit de jaarcijfers te bestuderen.'
              }
            }
          }
        }
      }
    }

    // Dynamic progressive "aan het ... zijn" errors
    if (aspectCategory === 'progressive-aan-het') {
      if (normalized.includes('aan het')) {
        // Check if user conjugated the verb after "aan het" instead of using infinitive
        if (/\baan het\s+(werkt|studeert|leest|kijkt|doet|maakt|bouwt|organiseert|upgrade|upgradet)\b/i.test(normalized)) {
          return {
            found: true,
            message: 'In the progressive construction "aan het ... zijn", the verb after "aan het" MUST remain an infinitive (ending in -en, e.g. "aan het werken", "aan het upgraden").',
            miniLesson: {
              title: 'Aan het + Infinitief (Geen vervoeging)',
              content: 'The progressive structure is: [vorm van zijn] + [object/bepaling] + aan het + [onvervoegde infinitief]. Never conjugate the verb after "aan het".',
              example: {
                wrong: 'Zij zijn de server aan het upgradet.',
                right: 'Zij zijn de server aan het upgraden.'
              }
            }
          }
        }
      } else if (!normalized.includes('bezig met') && !normalized.includes('zit te') && !normalized.includes('staat te')) {
        return {
          found: true,
          message: 'Express this continuous ongoing action using the Dutch progressive construction "aan het + infinitief zijn" (e.g. "zijn momenteel het netwerk aan het upgraden").',
          miniLesson: {
            title: 'Dynamisch Continu Aspect: Aan het + Infinitief zijn',
            content: '"Aan het + infinitief zijn" is the standard Dutch equivalent of the English continuous "-ing" form for dynamic activities.',
            example: {
              wrong: 'Zij upgraden nu het netwerk.',
              right: 'Zij zijn nu het netwerk aan het upgraden.'
            }
          }
        }
      }
    }

    // Imminent action "op het punt staan om te"
    if (aspectCategory === 'imminent-op-het-punt') {
      if (normalized.includes('op het punt') || normalized.includes('het punt')) {
        if (!normalized.includes(' te ') && !normalized.includes('om te')) {
          return {
            found: true,
            message: '"Op het punt staan" must be followed by "(om) ... te + infinitief" (e.g. "staat op het punt om de bijeenkomst te openen").',
            miniLesson: {
              title: 'Op het punt staan om te + infinitief',
              content: '"Op het punt staan om te + inf" expresses an event that is about to occur immediately. "Om... te" is standard before the infinitive.',
              example: {
                wrong: 'De voorzitter staat op het punt de bijeenkomst openen.',
                right: 'De voorzitter staat op het punt om de bijeenkomst te openen.'
              }
            }
          }
        }
      }
    }

    // Customary/Habitual aspect "plegen te"
    if (aspectCategory === 'customary-plegen') {
      if (normalized.includes('pleegt') || normalized.includes('plegen') || normalized.includes('plachten')) {
        if (!normalized.includes(' te ')) {
          return {
            found: true,
            message: 'The formal aspectual verb "plegen" (to be accustomed / habitually do) strictly takes "te + infinitief" (e.g. "pleegt te vergaderen").',
            miniLesson: {
              title: 'Plegen te + Infinitief (Gewoonte-aspect)',
              content: '"Plegen te + infinitief" is a formal B2/C1 construction signifying habitual action (Dutch "de gewoonte hebben om te"). Always include "te".',
              example: {
                wrong: 'De raad pleegt tweemaal per jaar vergaderen.',
                right: 'De raad pleegt tweemaal per jaar te vergaderen.'
              }
            }
          }
        }
      }
    }

    // Prospective threat or promise "dreigen te" / "beloven te"
    if (aspectCategory === 'prospective-dreigen-beloven') {
      if ((normalized.includes('dreigt') || normalized.includes('dreigen') || normalized.includes('belooft') || normalized.includes('beloven')) && !normalized.includes(' te ')) {
        return {
          found: true,
          message: '"Dreigen" (impending danger) and "beloven" (promising prospect) require "te + infinitief" when used aspectually (e.g. "dreigt te mislukken", "belooft te worden").',
          miniLesson: {
            title: 'Dreigen te / Beloven te + Infinitief',
            content: 'When "dreigen" or "beloven" indicate an impending outcome rather than literal speech, they must be constructed with "te + infinitief".',
            example: {
              wrong: 'De onderhandelingen dreigen mislukken.',
              right: 'De onderhandelingen dreigen te mislukken.'
            }
          }
        }
      }
    }

    // Perfect tense IPP with posture verbs: "heeft zitten kijken" (NOT "heeft gezeten te kijken"!)
    if (aspectCategory === 'perfect-posture-ipp' || postureOrAspectVerb?.includes('zitten') || postureOrAspectVerb?.includes('staan') || postureOrAspectVerb?.includes('liggen') || postureOrAspectVerb?.includes('lopen')) {
      if (/\b(heeft|hebben|had|hadden)\s+(?:[a-z\s]+)?(gezeten|gestaan|gelegen|gelopen)\s+te\s+[a-z]+/i.test(normalized)) {
        return {
          found: true,
          message: 'IPP Rule (Infinitivus Pro Participio): In the perfect tense, posture verbs that combine with another verb become an INFINITIVE, not a participle, and "te" is dropped: "heeft zitten kijken" (NEVER "heeft gezeten te kijken").',
          miniLesson: {
            title: 'IPP bij Houdingswerkwoorden: Heeft zitten kijken',
            content: 'When posture verbs (zitten, staan, liggen, lopen) govern another infinitive in the perfect tense, they undergo IPP (Double Infinitive). The posture participle (gezeten) turns into an infinitive (zitten) and "te" is omitted.',
            example: {
              wrong: 'Hij heeft de hele ochtend gezeten te kijken.',
              right: 'Hij heeft de hele ochtend zitten kijken.'
            }
          }
        }
      }
    }
  }

  // 2. Global check for posture verbs in perfect tense without IPP
  if (/\b(heeft|hebben|had|hadden)\s+(?:[a-z\s]+)?(gezeten|gestaan|gelegen|gelopen)\s+te\s+(kijken|wachten|lezen|studeren|slapen|werken|praten)\b/i.test(normalized)) {
    return {
      found: true,
      message: 'Double Infinitive Rule (IPP): Use the infinitive without "te" in the perfect tense: "heeft zitten kijken" (not "heeft gezeten te kijken").',
      miniLesson: {
        title: 'IPP met Houdingswerkwoorden',
        content: 'Posture verbs drop "ge-" and "te" in the perfect tense when combined with another infinitive: heeft + [zitten/staan/liggen/lopen] + [infinitief].',
        example: {
          wrong: 'Hij heeft uren gestaan te wachten.',
          right: 'Hij heeft uren staan wachten.'
        }
      }
    }
  }

  return { found: false }
}

function checkCorrelativeError(normalized: string) {
  // Check 1: "niet alleen" missing "maar ook" (e.g. using "maar" alone or "en ook")
  if (normalized.includes('niet alleen')) {
    if (!normalized.includes('maar ook') && !normalized.includes('maar tevens') && !normalized.includes('maar eveneens')) {
      return {
        found: true,
        message: 'The correlative construction is "niet alleen ... maar ook ..." (not only ... but also ...). Don\'t forget "ook" in the second clause.',
        miniLesson: {
          title: 'Correlative Focus: Niet Alleen ... Maar Ook',
          content: 'In Dutch, "niet alleen" must pair with "maar ook" to form a complete additive correlative structure.',
          example: {
            wrong: 'niet alleen de kosten stijgen, maar de kwaliteit daalt',
            right: 'niet alleen stijgen de kosten, maar ook de kwaliteit daalt'
          }
        }
      }
    }
  }

  // Check 2: "noch ... noch" double negation (e.g. "noch niet", "noch ... niet", "noch ... geen")
  if (normalized.includes('noch')) {
    const doubleNegationRegex = /\b(niet|geen|geeneens|nooit|niks)\b/i
    if (doubleNegationRegex.test(normalized)) {
      return {
        found: true,
        message: '"Noch ... noch ..." already carries negative meaning ("neither ... nor ..."). Do not add extra negation words like "niet" or "geen" to a noch-construction.',
        miniLesson: {
          title: 'Negative Correlative: Noch ... Noch (No Double Negation)',
          content: '"Noch ... noch ..." translates to "neither ... nor ...". Because "noch" is inherently negative, adding "niet" or "geen" produces an ungrammatical double negation in Dutch.',
          example: {
            wrong: 'noch de manager niet, noch de directie was aanwezig',
            right: 'noch de manager, noch de directie was aanwezig'
          }
        }
      }
    }
  }

  // Check 3: "zowel ... en ..." (Anglicism from "both ... and ...") instead of "zowel ... als ..."
  if (normalized.includes('zowel') && !normalized.includes('als')) {
    return {
      found: true,
      message: 'In Dutch, the correlative pair is "zowel ... als ..." (not "zowel ... en ...").',
      miniLesson: {
        title: 'Parallel Coordination: Zowel ... Als',
        content: 'Unlike English "both ... and ...", Dutch strictly requires "zowel ... als ..." for parallel coordination.',
        example: {
          wrong: 'zowel het team en de directie',
          right: 'zowel het team als de directie'
        }
      }
    }
  }

  // Check 4: Proportional comparison "hoe ... des te / hoe ..." missing comparative or des te/hoe
  if (normalized.startsWith('hoe ') || normalized.includes(' hoe ')) {
    const hasDesTe = normalized.includes('des te') || normalized.includes('deste')
    const hasSecondHoe = (normalized.match(/\bhoe\b/g) || []).length >= 2
    if (!hasDesTe && !hasSecondHoe) {
      const comparativeIndicators = /\b(meer|minder|langer|korter|sneller|beter|hoger|lager|vroeger|later|harder|sterker|groter|kleiner)\b/
      if (comparativeIndicators.test(normalized)) {
        return {
          found: true,
          message: 'In proportional comparisons starting with "hoe ...", pair it with "des te ..." or a second "hoe ..." in the main clause (e.g. "Hoe meer we oefenen, des te beter we spreken").',
          miniLesson: {
            title: 'Proportional Comparison: Hoe ... Des te / Hoe ...',
            content: 'Proportional comparison expresses an increasing correlation using "Hoe + [comparative] + [subclause], des te / hoe + [comparative] + [verb + subject]".',
            example: {
              wrong: 'Hoe meer we oefenen, we spreken beter',
              right: 'Hoe meer we oefenen, des te beter we spreken'
            }
          }
        }
      }
    }
  }

  // Check 5: "enerzijds ... anderzijds" missing inversion in the second clause
  const anderzijdsNoInversion = /\banderzijds\s+(we|wij|ze|zij|ik|je|jij|u|hij|het|men|de|het|ons|onze|deze|dit)\s+([a-z]+)\b/i
  const matchAnderzijds = normalized.match(anderzijdsNoInversion)
  if (matchAnderzijds) {
    const subject = matchAnderzijds[1]
    const nextWord = matchAnderzijds[2]
    return {
      found: true,
      message: `When 'anderzijds' (or 'enerzijds') begins a clause, it occupies the first position and triggers subject-verb inversion (e.g. 'Anderzijds moeten we...', NOT 'Anderzijds we moeten...').`,
      miniLesson: {
        title: 'Contrastive Adverbs: Inversion after "Anderzijds"',
        content: '"Enerzijds" and "anderzijds" are adverbs. When placed at the start of a clause, standard Dutch word order requires subject-verb inversion (V1 + S).',
        example: {
          wrong: `anderzijds ${subject} ${nextWord}`,
          right: `anderzijds ${nextWord} ${subject}`
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

    // Separable vs. Inseparable Prefix Verb Drill Evaluation
    if (exercise.kind === 'prefix-verb-drill' && exercise.prefixVerbData) {
      const target = normalizeAnswer(exercise.target || '')
      const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[]

      const prefixError = checkPrefixVerbError(normalized, exercise.prefixVerbData)
      if (prefixError.found) {
        return {
          ...base,
          outcome: 'acceptable',
          message: prefixError.message,
          miniLesson: prefixError.miniLesson,
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: 'Remember: stressed prefixes (vóórkomen, óndergaan, óverleggen) split in main clauses and take "ge-" between prefix and stem, while unstressed prefixes (voorkómen, achterhálen, ondergáán, doorbréken) never split and do not take "ge-".'
          }
        }
      }

      if (accepted.includes(normalized)) {
        if (!base.skills.includes('production')) base.skills.push('production')
        if (!base.skills.includes('grammar')) base.skills.push('grammar')
        return {
          ...base,
          outcome: 'correct',
          message: 'Uitstekend! Correct prefix verb conjugation, split behavior, and stress-semantics applied.',
          changeModifier: (base.changeModifier || 0) + 20
        }
      }

      const similarity = calculateSimilarity(normalized, target)
      if (similarity > 0.75) {
        return {
          ...base,
          outcome: 'acceptable',
          message: 'Very close! Check whether the prefix should split, the participle form (with or without "ge-"), or "te" placement.',
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: exercise.explanation || 'Verify whether this prefix verb is separable or inseparable in this context.'
          }
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: 'Not quite. Check the prefix verb conjugation and split rules.',
          explanation: exercise.explanation || 'Conjugate the prefix verb according to its stress pattern and target structure.'
        }
      }
    }

    // Midfield Word Order & Syntactic Architecture Drill Evaluation
    if (exercise.kind === 'midfield-drill') {
      const target = normalizeAnswer(exercise.target || '')
      const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[]

      if (accepted.includes(normalized)) {
        if (!base.skills.includes('production')) base.skills.push('production')
        if (!base.skills.includes('grammar')) base.skills.push('grammar')
        return {
          ...base,
          outcome: 'correct',
          message: 'Uitstekend! Perfect Dutch midfield word order and syntactic sequencing.',
          changeModifier: (base.changeModifier || 0) + 20
        }
      }

      const midfieldError = checkMidfieldOrderError(normalized, exercise.midfieldData)
      if (midfieldError.found) {
        return {
          ...base,
          outcome: 'acceptable',
          message: midfieldError.message,
          miniLesson: midfieldError.miniLesson,
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: 'Remember the Dutch midfield hierarchy: Definite Object -> Tijd (Time) -> Manier (Manner) -> Negatie (Niet) -> Plaats (Place) -> Indefinite Object.'
          }
        }
      }

      const similarity = calculateSimilarity(normalized, target)
      if (similarity > 0.75) {
        return {
          ...base,
          outcome: 'acceptable',
          message: 'Very close! Check the relative ordering of Time, Manner, Place, Direct Object, and Negation.',
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: exercise.explanation || 'Verify the positions of Time, Manner, Place, and Objects in the midfield.'
          }
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: 'Not quite. Reorder the constituents according to Dutch TMP and object placement rules.',
          explanation: exercise.explanation || 'Construct the sentence following: [Subject] + [Verb] + [Definite Object] + [Time] + [Manner] + [Niet] + [Place] + [Indefinite Object].'
        }
      }
    }

    // Fixed Prepositions & Prepositional Regimes Drill Evaluation
    if (exercise.kind === 'fixed-preposition-drill') {
      const target = normalizeAnswer(exercise.target || '')
      const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[]

      if (accepted.includes(normalized)) {
        if (!base.skills.includes('production')) base.skills.push('production')
        if (!base.skills.includes('grammar')) base.skills.push('grammar')
        return {
          ...base,
          outcome: 'correct',
          message: 'Uitstekend! Perfect use of the fixed Dutch preposition and natural sentence structure.',
          changeModifier: (base.changeModifier || 0) + 20
        }
      }

      const prepRegimeError = checkFixedPrepositionRegimeError(normalized, exercise.fixedPrepositionData)
      if (prepRegimeError.found) {
        return {
          ...base,
          outcome: 'acceptable',
          message: prepRegimeError.message,
          miniLesson: prepRegimeError.miniLesson,
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: `Remember the fixed preposition regime: '${exercise.fixedPrepositionData?.governingHead || 'het woord'}' takes '${exercise.fixedPrepositionData?.fixedPreposition || 'het vaste voorzetsel'}'.`
          }
        }
      }

      const similarity = calculateSimilarity(normalized, target)
      if (similarity > 0.75) {
        return {
          ...base,
          outcome: 'acceptable',
          message: `Very close! Make sure to pair '${exercise.fixedPrepositionData?.governingHead || 'het woord'}' with '${exercise.fixedPrepositionData?.fixedPreposition || 'het vaste voorzetsel'}'.`,
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: exercise.explanation || `Verify that you used '${exercise.fixedPrepositionData?.governingHead}' with '${exercise.fixedPrepositionData?.fixedPreposition}'.`
          }
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: 'Not quite. Check the governing word, required fixed preposition, and word order.',
          explanation: exercise.explanation || `Combine '${exercise.fixedPrepositionData?.governingHead}' with '${exercise.fixedPrepositionData?.fixedPreposition}'.`
        }
      }
    }

    // Pronominal Adverb Splitting Drill Evaluation
    if (exercise.kind === 'pronominal-splitting-drill') {
      const target = normalizeAnswer(exercise.target || '')
      const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[]

      if (accepted.includes(normalized)) {
        if (!base.skills.includes('production')) base.skills.push('production')
        if (!base.skills.includes('grammar')) base.skills.push('grammar')
        return {
          ...base,
          outcome: 'correct',
          message: 'Uitstekend! Perfect natural pronominal adverb splitting and word order.',
          changeModifier: (base.changeModifier || 0) + 20
        }
      }

      const splittingError = checkPronominalSplittingError(normalized, exercise.pronominalSplittingData)
      if (splittingError.found) {
        return {
          ...base,
          outcome: 'acceptable',
          message: splittingError.message,
          miniLesson: splittingError.miniLesson,
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: `Split '${exercise.pronominalSplittingData?.rWord || 'er'}' and '${exercise.pronominalSplittingData?.preposition || 'voorzetsel'}': place '${exercise.pronominalSplittingData?.rWord || 'er'}' early and '${exercise.pronominalSplittingData?.preposition || 'voorzetsel'}' before the verb cluster.`
          }
        }
      }

      const similarity = calculateSimilarity(normalized, target)
      if (similarity > 0.75) {
        return {
          ...base,
          outcome: 'acceptable',
          message: 'Very close! Check the position of the R-word and the stranded preposition.',
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: exercise.explanation || 'Place the R-word early in the clause and the stranded preposition immediately before the verb group.'
          }
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: 'Not quite. Separate the R-word from the preposition and follow Dutch midfield word order.',
          explanation: exercise.explanation || `Construct the sentence splitting '${exercise.pronominalSplittingData?.rWord || 'het R-woord'}' and '${exercise.pronominalSplittingData?.preposition || 'het voorzetsel'}'.`
        }
      }
    }

    // Aspectual Verbs & Durative Constructions Drill Evaluation
    if (exercise.kind === 'aspect-drill') {
      const target = normalizeAnswer(exercise.target || '')
      const accepted = [target, ...(exercise.acceptedAnswers ?? [])].filter(Boolean).map(normalizeAnswer) as string[]

      if (accepted.includes(normalized)) {
        if (!base.skills.includes('production')) base.skills.push('production')
        if (!base.skills.includes('grammar')) base.skills.push('grammar')
        return {
          ...base,
          outcome: 'correct',
          message: 'Uitstekend! Flawless use of Dutch aspectual syntax and durative verb constructions.',
          changeModifier: (base.changeModifier || 0) + 20
        }
      }

      const aspectError = checkAspectError(normalized, exercise.aspectData)
      if (aspectError.found) {
        return {
          ...base,
          outcome: 'acceptable',
          message: aspectError.message,
          miniLesson: aspectError.miniLesson,
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: `Use the correct aspectual construction: '${exercise.aspectData?.postureOrAspectVerb || 'het aspectuele werkwoord'}' + '${exercise.aspectData?.infinitiveAction || 'infinitief'}'.`
          }
        }
      }

      const similarity = calculateSimilarity(normalized, target)
      if (similarity > 0.75) {
        return {
          ...base,
          outcome: 'acceptable',
          message: 'Very close! Make sure the posture/aspect verb and infinitive structure are correctly formed.',
          teacherCorrection: {
            natural: exercise.target || '',
            explanation: exercise.explanation || `Verify the aspectual construction: '${exercise.aspectData?.postureOrAspectVerb}'.`
          }
        }
      } else {
        return {
          ...base,
          outcome: 'retry',
          message: 'Not quite. Check the aspectual verb, preposition/particle ("te" / "aan het"), and infinitive form.',
          explanation: exercise.explanation || `Construct the sentence with '${exercise.aspectData?.postureOrAspectVerb}'.`
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