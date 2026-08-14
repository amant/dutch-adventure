import type { Exercise, ChapterStage, Chapter, ExerciseKind, SkillDimension } from '../types/learning'

// A small dictionary to help generate exercises if we don't have enough context
const contextDictionary: Record<string, { target: string, prompt: string, explanation: string }> = {
  'wonen': { prompt: 'I live in Amsterdam.', target: 'Ik woon in Amsterdam.', explanation: 'Use "wonen" for living in a place.' },
  'zijn': { prompt: 'I am a student.', target: 'Ik ben een student.', explanation: 'Use "zijn" for identity.' },
  'denken': { prompt: 'I think that it is good.', target: 'Ik denk dat het goed is.', explanation: 'Use "denken dat" for opinions.' },
  'vinden': { prompt: 'I find it difficult.', target: 'Ik vind het moeilijk.', explanation: 'Use "vinden" for personal opinions.' },
  'thuiswerken': { prompt: 'I like working from home.', target: 'Ik werk graag thuis.', explanation: 'Thuiswerken means working from home.' },
  'handig': { prompt: 'It is very useful.', target: 'Het is erg handig.', explanation: 'Handig means useful or handy.' },
  'omdat-clause': { prompt: 'I am staying home because it is raining.', target: 'Ik blijf thuis omdat het regent.', explanation: 'Verbs go to the end after omdat.' },
  'word-order': { prompt: 'Yesterday I went to the city.', target: 'Gisteren ging ik naar de stad.', explanation: 'Inversion happens when a sentence starts with time/place.' },
  'perfect-tense': { prompt: 'I have eaten a sandwich.', target: 'Ik heb een broodje gegeten.', explanation: 'Use "hebben" + participle for most past actions.' },
  'last hebben van': { prompt: 'I have a backache.', target: 'Ik heb last van mijn rug.', explanation: 'Use "last hebben van" for physical discomfort.' },
  'afspraak': { prompt: 'I would like to make an appointment.', target: 'Ik wil graag een afspraak maken.', explanation: 'An afspraak is an appointment.' },
  'hoewel': { prompt: 'Although it is cold, I am going outside.', target: 'Hoewel het koud is, ga ik naar buiten.', explanation: 'Hoewel is a subordinating conjunction (verb at end).' },
  'opstaan': { prompt: 'I get up at 7 o\'clock.', target: 'Ik sta om 7 uur op.', explanation: 'Opstaan is a separable verb.' },
  'schoonmaken': { prompt: 'I am cleaning the kitchen.', target: 'Ik maak de keuken schoon.', explanation: 'Schoonmaken is a separable verb.' },
  'verwarming': { prompt: 'The heating is broken.', target: 'De verwarming is kapot.', explanation: 'Verwarming means heating.' },
  'repareren': { prompt: 'Can you repair it?', target: 'Kunt u het repareren?', explanation: 'Repareren means to fix or repair.' },
  'tevreden': { prompt: 'I am not satisfied with the service.', target: 'Ik ben niet tevreden over de service.', explanation: 'Tevreden means satisfied.' },
  'formal-v-informal': { prompt: 'How are you? (formal)', target: 'Hoe gaat het met u?', explanation: 'Use "u" for formal situations.' },
  'duurzaam': { prompt: 'Sustainable energy', target: 'Duurzame energie', explanation: 'Duurzaam means sustainable.' },
  'tot slot': { prompt: 'In conclusion', target: 'Tot slot', explanation: 'Use "Tot slot" to end a presentation.' },
  'speculeren': { prompt: 'I am speculating about the future.', target: 'Ik ben aan het speculeren over de toekomst.', explanation: 'Speculeren means to speculate.' },
  'onderhandelen': { prompt: 'We need to negotiate the salary.', target: 'We moeten onderhandelen over het salaris.', explanation: 'Onderhandelen means to negotiate.' },
  'samenvatten': { prompt: 'Can you summarize the article?', target: 'Kun je het artikel samenvatten?', explanation: 'Samenvatten means to summarize.' },
  'overtuigen': { prompt: 'I want to convince you.', target: 'Ik wil je overtuigen.', explanation: 'Overtuigen means to convince.' },
  'pronominal-adverbs': { prompt: 'I am thinking about it.', target: 'Ik denk eraan.', explanation: 'Merge "er" + "aan" for "about it".' },
  'ermee': { prompt: 'I am working with it.', target: 'Ik ben ermee bezig.', explanation: 'Met + het becomes ermee.' },
  'daarom': { prompt: 'That is why I am here.', target: 'Daarom ben ik hier.', explanation: 'Om + dat becomes daarom.' },
  'nominalisation': { prompt: 'The prices are rising.', target: 'De stijging van de prijzen.', explanation: 'Transform the verb "stijgen" into the noun "stijging".' },
  'toename': { prompt: 'The number of people is increasing.', target: 'De toename van het aantal mensen.', explanation: 'Toename means increase.' },
  'uitbreiding': { prompt: 'The company is expanding.', target: 'De uitbreiding van het bedrijf.', explanation: 'Uitbreiding means expansion.' },
  'passive-voice': { prompt: 'The project is being prepared.', target: 'Het project wordt voorbereid.', explanation: 'Use "worden" + past participle for the passive process.' },
  'worden': { prompt: 'It is being done.', target: 'Het wordt gedaan.', explanation: 'Worden is the auxiliary for the passive voice.' },
  'gepland': { prompt: 'The meeting is being planned.', target: 'De vergadering wordt gepland.', explanation: 'Gepland is the past participle of plannen.' },
  'conditional': { prompt: 'If I had money, I would buy it.', target: 'Als ik geld had, zou ik het kopen.', explanation: 'Use "had" and "zou" for hypotheticals.' },
  'had': { prompt: 'If I had time...', target: 'Als ik tijd had...', explanation: 'Had is the past tense of hebben, used for hypotheticals.' },
  'zou': { prompt: 'I would do it.', target: 'Ik zou het doen.', explanation: 'Zou means would.' },
  'conditional-past': { prompt: 'If I had known it, I would have come.', target: 'Als ik het had geweten, zou ik zijn gekomen.', explanation: 'For past hypotheticals, use "had [participle]" and "zou zijn/hebben [participle]".' },
  'diplomatic-reframing': { prompt: 'Can you say that more politely?', target: 'Het zou misschien beter zijn als...', explanation: 'Use softeners like "zou" and "misschien" for diplomacy.' },
  'verzachten': { prompt: 'You should soften your feedback.', target: 'Je zou je feedback wat moeten verzachten.', explanation: 'Verzachten means to soften or mitigate.' },
  'zullen': { prompt: 'It will rain tomorrow.', target: 'Het zal morgen regenen.', explanation: 'Use "zullen" for future predictions.' },
  'indirecte-rede': { prompt: 'He said that he was coming.', target: 'Hij zei dat hij kwam.', explanation: 'In indirect speech with "dat", the verb moves to the end.' },
  'beweren': { prompt: 'They claim that it is true.', target: 'Ze beweren dat het waar is.', explanation: 'Beweren means to claim or assert.' },
  'aangeven': { prompt: 'She indicated that she agreed.', target: 'Zij gaf aan dat ze het ermee eens was.', explanation: 'Aangeven means to indicate or state.' },
  'vragen of': { prompt: 'He asked whether we were ready.', target: 'Hij vroeg of we klaar waren.', explanation: 'Use "of" for indirect questions.' },
  'betrekkelijke-bijzinnen': { prompt: 'The book that I am reading is interesting.', target: 'Het boek dat ik lees, is interessant.', explanation: 'Use "dat" for het-words in relative clauses.' },
  'die': { prompt: 'The colleague who is helping me.', target: 'De collega die mij helpt.', explanation: 'Use "die" for de-words in relative clauses.' },
  'dat': { prompt: 'The report that we received.', target: 'Het rapport dat we hebben ontvangen.', explanation: 'Use "dat" for het-words in relative clauses.' },
  'waarmee': { prompt: 'The tool with which we work.', target: 'Het gereedschap waarmee we werken.', explanation: 'Use "waarmee" for things with preposition met.' },
  'met wie': { prompt: 'The person with whom I spoke.', target: 'De persoon met wie ik sprak.', explanation: 'Use "met wie" for people with preposition met.' },
  'wat': { prompt: 'Everything that he says.', target: 'Alles wat hij zegt.', explanation: 'Use "wat" after indefinite pronouns like alles.' },
  'om-te-infinitief': { prompt: 'We are calling to make an appointment.', target: 'We bellen om een afspraak te maken.', explanation: 'Use "om ... te" for purpose clauses.' },
  'op te lossen': { prompt: 'It is important to solve the problem.', target: 'Het is belangrijk om het probleem op te lossen.', explanation: 'In separable verbs with "te", insert "te" between prefix and stem.' },
  'voor te bereiden': { prompt: 'You do not need to prepare a presentation.', target: 'U hoeft geen presentatie voor te bereiden.', explanation: 'The semi-auxiliary "hoeven" requires "te".' },
  'hoeven': { prompt: 'You don\'t have to wait.', target: 'Je hoeft niet te wachten.', explanation: '"Hoeven... niet" takes "te" + infinitive.' },
  'dubbele-infinitief': { prompt: 'We had to wait for three hours.', target: 'We hebben drie uur moeten wachten.', explanation: 'In compound tenses, modal participles become infinitives (IPP).' },
  'moeten wachten': { prompt: 'We had to wait for three hours.', target: 'We hebben drie uur moeten wachten.', explanation: 'Use the double infinitive "moeten wachten" with auxiliary "hebben".' },
  'laten repareren': { prompt: 'She had her car repaired.', target: 'Zij heeft haar auto laten repareren.', explanation: 'Causative "laten" takes the double infinitive "laten repareren".' },
  'leren programmeren': { prompt: 'He taught me how to program.', target: 'Hij heeft me leren programmeren.', explanation: '"Leren" takes the double infinitive without "ge-" prefix in compound tenses.' },
  'horen aankomen': { prompt: 'We heard the train arriving.', target: 'We hebben de trein horen aankomen.', explanation: 'Perception verbs trigger the double infinitive in compound tenses.' },
  'toegevende-verbanden': { prompt: 'Although the costs are high, we proceed.', target: 'Hoewel de kosten hoog zijn, gaan we door.', explanation: 'Use "hoewel" with verb-final word order for concessive clauses.' },
  'ondanks': { prompt: 'Despite the bad weather, we went outside.', target: 'Ondanks het slechte weer gingen we naar buiten.', explanation: '"Ondanks" is a preposition taking a noun phrase.' },
  'ondanks dat': { prompt: 'Despite the fact that it was late, we worked on.', target: 'Ondanks dat het laat was, werkten we door.', explanation: '"Ondanks dat" is a conjunction introducing a subclause.' },
  'weliswaar': { prompt: 'The plan is ambitious, but feasible.', target: 'Het plan is weliswaar ambitieus, maar haalbaar.', explanation: '"Weliswaar" is paired with "maar" for balanced contrast.' },
  'hoe ook': { prompt: 'No matter how difficult it is, we keep going.', target: 'Hoe moeilijk het ook is, we gaan door.', explanation: 'Use "hoe + [adj] + ... + ook" for correlative concessions.' },
}

export function generateExercisesForConcept(key: string, type: 'vocabulary' | 'grammar', kind: ExerciseKind): Exercise {
  const info = contextDictionary[key] || {
    prompt: `Use the concept: ${key}`,
    target: `[Correct usage of ${key}]`,
    explanation: `Practice using ${key} in a sentence.`
  }

  const skills: SkillDimension[] = []
  if (kind === 'typed') skills.push('production', 'spelling')
  if (kind === 'flexibility') skills.push('production', 'automaticity')
  if (kind === 'conversation') skills.push('speaking', 'production')
  if (kind === 'speed-drill') skills.push('automaticity', 'production')
  if (kind === 'reframing-drill') skills.push('production', 'pragmatic')
  if (kind === 'pronominal-drill') skills.push('production', 'grammar')
  if (kind === 'nominalisation-drill') skills.push('production', 'grammar')
  if (kind === 'passive-drill') skills.push('production', 'grammar')
  if (kind === 'reported-speech-drill') skills.push('production', 'grammar')
  if (kind === 'relative-clause-drill') skills.push('production', 'grammar')
  if (kind === 'infinitive-drill') skills.push('production', 'grammar')
  if (kind === 'double-infinitive-drill') skills.push('production', 'grammar')
  if (kind === 'concession-drill') skills.push('production', 'grammar')

  if (kind === 'reframing-drill') {
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      reframingData: {
        bluntSentence: `Direct version of ${key}`,
        softeningElements: ['misschien', 'zou', 'eventueel'],
        targetContext: 'Professional Meeting'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      correction: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'pronominal-drill') {
    const prepMap: Record<string, string> = {
      'ermee': 'met',
      'erop': 'op',
      'eraan': 'aan',
      'daarvoor': 'voor',
      'daarmee': 'met'
    }
    const prep = prepMap[key] || 'op'
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      pronominalData: {
        sentence: info.target,
        preposition: prep,
        object: key.startsWith('d') ? 'dat' : 'het'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: key,
      explanation: info.explanation
    }
  }

  if (kind === 'nominalisation-drill') {
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      nominalisationData: {
        verbalSentence: `De ${key} gebeurt nu.`,
        targetNoun: key
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'passive-drill') {
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      passiveData: {
        activeSentence: `Men ${key} het project.`,
        focus: 'process'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'reported-speech-drill') {
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      reportedSpeechData: {
        directQuote: `Ik zal ${key}.`,
        speaker: 'De collega',
        reportingClause: 'De collega zei dat...',
        quoteType: 'statement'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'relative-clause-drill') {
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      relativeClauseData: {
        mainClause: `Het onderwerp is belangrijk.`,
        subordinateInfo: `We bespreken ${key} vandaag.`,
        antecedent: key,
        antecedentType: key === 'wat' ? 'general-wat' : key === 'met wie' ? 'person-prep' : key === 'waarmee' ? 'thing-prep' : 'het-word'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'infinitive-drill') {
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      infinitiveData: {
        mainClause: 'Het is van groot belang voor het team.',
        infinitiveAction: `${key} volgens afspraak`,
        constructionType: 'purpose-om-te',
        hint: 'Use (om...) te and place all verbal elements at the end.'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'double-infinitive-drill') {
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      doubleInfinitiveData: {
        sentenceContext: 'Situatie in het verleden (compound tense met regerend werkwoord):',
        auxiliary: 'hebben',
        governingVerb: key.includes('laten') ? 'laten' : key.includes('leren') ? 'leren' : key.includes('horen') ? 'horen' : 'moeten',
        governingType: key.includes('laten') ? 'causative-laten' : key.includes('leren') ? 'instruction-leren-helpen' : key.includes('horen') ? 'perception' : 'modal',
        mainVerb: key.replace('laten ', '').replace('leren ', '').replace('horen ', '').replace('moeten ', ''),
        hint: 'Apply the Infinitivus Pro Participio (IPP) rule with double infinitive at the end.'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'concession-drill') {
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      concessionData: {
        triggerType: key.includes('ondanks') ? 'ondanks-noun-vs-clause' : key.includes('al') ? 'al-inversion' : key.includes('hoe') ? 'hoe-ook-correlative' : key.includes('weliswaar') ? 'weliswaar-maar' : 'hoewel-ofschoon',
        premiseA: `De omstandigheid (${key}) is uitdagend.`,
        contrastB: 'We zetten het plan desondanks succesvol voort.',
        connectorCue: key,
        structureFormula: 'Toegevende structuur met correcte woordvolgorde',
        hint: 'Combine the statements with accurate conjunctions and word order.'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  return {
    id: `smart-${type}-${key}-${kind}`,
    kind,
    prompt: info.prompt,
    target: info.target,
    explanation: info.explanation,
    skills,
    vocabulary: type === 'vocabulary' ? [key] : [],
    grammar: type === 'grammar' ? [key] : [],
    automaticitySeconds: kind === 'speed-drill' ? 4 : undefined
  }
}

export function createSmartReviewChapter(vocabularyKeys: string[], grammarKeys: string[]): Chapter {
  const stages: ChapterStage[] = []

  // Stage 1: Recognition / Discovery (for the ones you struggle with)
  if (vocabularyKeys.length > 0) {
    stages.push({
      id: 'smart-discover',
      title: 'Quick Refresh',
      kind: 'discover',
      intro: 'Let\'s review these concepts you\'ve encountered recently.',
      exercises: vocabularyKeys.slice(0, 3).map(k => ({
        id: `smart-info-${k}`,
        kind: 'info',
        prompt: `Remember: ${k}`,
        context: contextDictionary[k]?.target || `Usage example for ${k}`,
        skills: ['recognition', 'meaning'],
        vocabulary: [k]
      }))
    })
  }

  // Stage 2: Production
  const productionExercises: Exercise[] = [
    ...vocabularyKeys.slice(0, 2).map(k => generateExercisesForConcept(k, 'vocabulary', 'typed')),
    ...grammarKeys.slice(0, 1).map(k => generateExercisesForConcept(k, 'grammar', 'typed'))
  ]

  if (productionExercises.length > 0) {
    stages.push({
      id: 'smart-retrieve',
      title: 'Active Retrieval',
      kind: 'retrieve',
      intro: 'Try to produce these without hints.',
      exercises: productionExercises
    })
  }

  // Stage 3: High-pressure use
  if (vocabularyKeys.length > 0 || grammarKeys.length > 0) {
    const mainConcept = vocabularyKeys[0] || grammarKeys[0]
    stages.push({
      id: 'smart-automate',
      title: 'Automate Retrieval',
      kind: 'review',
      intro: 'Quick! Recall these concepts before the timer runs out.',
      exercises: [
        generateExercisesForConcept(mainConcept, vocabularyKeys[0] ? 'vocabulary' : 'grammar', 'speed-drill')
      ]
    })

    stages.push({
      id: 'smart-personalise',
      title: 'Real-world Use',
      kind: 'personalise',
      intro: 'Let\'s use what you know in a short conversation.',
      exercises: [{
        ...generateExercisesForConcept(mainConcept, vocabularyKeys[0] ? 'vocabulary' : 'grammar', 'conversation'),
        prompt: `Can you use ${mainConcept} in a sentence about your day?`,
        aiPersonality: { isDifficult: true, style: 'helpful', pushbackProbability: 0.5 }
      }]
    })
  }

  return {
    slug: 'smart-review',
    level: 'A1', // Dynamic
    title: 'Smart Review Session',
    capability: 'Reinforce weak spots and automate retrieval.',
    description: 'A dynamically generated session targeting your specific bottlenecks.',
    estimatedMinutes: 5,
    stages
  }
}

export function createActivationChapter(concepts: { key: string, kind: 'vocabulary' | 'grammar' }[]): Chapter {
  const stages: ChapterStage[] = []

  // Stage 1: Transformation (Bridging the gap)
  if (concepts.length > 0) {
    stages.push({
      id: 'activate-bridge',
      title: 'Bridge the Gap',
      kind: 'transform',
      intro: 'You know what these mean. Now let\'s try to manipulate them.',
      exercises: concepts.map(c => generateExercisesForConcept(c.key, c.kind, 'flexibility'))
    })

    // Stage 2: Retrieval
    stages.push({
      id: 'activate-retrieve',
      title: 'Own the Concept',
      kind: 'retrieve',
      intro: 'Produce these from scratch.',
      exercises: concepts.map(c => generateExercisesForConcept(c.key, c.kind, 'typed'))
    })

    // Stage 3: Personalisation
    stages.push({
      id: 'activate-personalise',
      title: 'Make it Yours',
      kind: 'personalise',
      intro: 'Use these in your own context.',
      exercises: concepts.map(c => ({
        ...generateExercisesForConcept(c.key, c.kind, 'conversation'),
        prompt: `Tell me something using "${c.key}".`,
        aiPersonality: { isDifficult: false, style: 'helpful', pushbackProbability: 0.3 }
      }))
    })
  }

  return {
    slug: 'activation-session',
    level: 'B2',
    title: 'Activation Session',
    capability: 'Turn passive recognition into active production.',
    description: 'A focused session to bridge your knowledge gaps.',
    estimatedMinutes: 8,
    stages
  }
}

export function createSpeedChapter(vocabularyKeys: string[], grammarKeys: string[]): Chapter {
  const allKeys = [...vocabularyKeys, ...grammarKeys]
  return {
    slug: 'speed-review',
    level: 'B1',
    title: 'High-Pressure Retrieval',
    capability: 'Automaticity under pressure.',
    description: 'Focus on reducing retrieval time for familiar concepts.',
    estimatedMinutes: 5,
    stages: [
      {
        id: 'speed-drills',
        title: 'Speed Drills',
        kind: 'retrieve',
        intro: 'You have very little time. Don\'t think, just produce!',
        exercises: allKeys.slice(0, 5).map(k => {
          const type = vocabularyKeys.includes(k) ? 'vocabulary' : 'grammar'
          const ex = generateExercisesForConcept(k, type, 'speed-drill')
          ex.automaticitySeconds = 3 // Extra tight!
          return ex
        })
      }
    ]
  }
}

export function createFluencyChapter(history: { key: string, prompt: string, snippet: string, type: 'vocabulary' | 'grammar' }[]): Chapter {
  return {
    slug: 'fluency-challenge',
    level: 'B2',
    title: 'Dynamic Fluency Challenge',
    capability: 'Automate production of your most used phrases.',
    description: 'A challenge built from your own history. Speak fast to build automaticity.',
    estimatedMinutes: 5,
    stages: [
      {
        id: 'fluency-stage',
        title: 'Spontaneous Retrieval',
        kind: 'review',
        intro: 'You have used these before. Now say them faster.',
        exercises: history.map((h, idx) => ({
          id: `fluency-${h.key}-${idx}`,
          kind: 'fluency-challenge',
          prompt: h.prompt,
          target: h.snippet,
          context: `You previously said: "${h.snippet}"`,
          skills: ['automaticity', 'speaking', 'production'],
          vocabulary: h.type === 'vocabulary' ? [h.key] : [],
          grammar: h.type === 'grammar' ? [h.key] : [],
          automaticitySeconds: 10
        }))
      }
    ]
  }
}

export function createScenarioMission(scenario: string, concepts: { key: string, kind: 'vocabulary' | 'grammar' }[]): Chapter {
  return {
    slug: 'sandbox-mission',
    level: 'B2',
    title: `Mission: ${scenario}`,
    capability: 'Adapt your language to a specific, custom context.',
    description: `A personalized mission focused on: ${scenario}`,
    estimatedMinutes: 10,
    stages: [
      {
        id: 'sandbox-understand',
        title: 'Vocabulary Preparation',
        kind: 'understand',
        intro: `To prepare for this scenario, let's look at how we might use these concepts.`,
        exercises: concepts.map(c => ({
          id: `sandbox-info-${c.key}`,
          kind: 'info',
          prompt: `Relevant concept: ${c.key}`,
          context: contextDictionary[c.key]?.target || `In this scenario, you might need ${c.key}.`,
          skills: ['recognition', 'meaning'],
          vocabulary: c.kind === 'vocabulary' ? [c.key] : [],
          grammar: c.kind === 'grammar' ? [c.key] : []
        }))
      },
      {
        id: 'sandbox-mission',
        title: 'The Simulation',
        kind: 'personalise',
        intro: `Goal: ${scenario}. Use as much Dutch as you can, and try to incorporate your target concepts.`,
        exercises: [{
          id: 'sandbox-simulator',
          kind: 'conversation',
          prompt: `Let's start. You are in this situation: ${scenario}. What do you say?`,
          skills: ['speaking', 'production', 'pragmatic'],
          vocabulary: concepts.filter(c => c.kind === 'vocabulary').map(c => c.key),
          grammar: concepts.filter(c => c.kind === 'grammar').map(c => c.key),
          aiPersonality: {
            isDifficult: true,
            style: 'colloquial',
            pushbackProbability: 0.6
          },
          missionGoals: concepts.slice(0, 3).map(c => ({
            id: `goal-${c.key}`,
            label: `Use "${c.key}" naturally`,
            keywords: [c.key]
          }))
        }]
      }
    ]
  }
}
