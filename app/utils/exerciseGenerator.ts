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
