import type { Exercise, Feedback } from '~/types/learning'
import { useLearnerMemory } from '~/composables/useLearnerMemory'

/** Minimal valid Exercise shared by every drill. */
export const baseExercise: Exercise = {
  id: 'test-exercise',
  kind: 'typed',
  prompt: 'Say: ik woon in Amsterdam.',
  target: 'Ik woon in Amsterdam.',
  skills: ['production'],
}

export const correctFeedback: Feedback = {
  outcome: 'correct',
  message: 'That sounds perfectly natural!',
  skills: ['production'],
}

export const retryFeedback: Feedback = {
  outcome: 'retry',
  message: 'Not quite. Try again.',
  skills: ['production'],
}

export const acceptableFeedback: Feedback = {
  outcome: 'acceptable',
  message: 'Almost!',
  skills: ['production'],
}

/** Reset the shared learner memory (and any localStorage) between tests. */
export function resetLearnerMemory() {
  const memory = useLearnerMemory()
  memory.reset()
  memory.hydrated.value = false
}

export const aspectExercise: Exercise = {
  ...baseExercise,
  id: 'aspect-test',
  kind: 'aspect-drill',
  prompt: 'Ik ben ... een boek te lezen.',
  aspectData: {
    aspectCategory: 'progressive-aan-het',
    postureOrAspectVerb: 'zijn',
    infinitiveAction: 'lezen',
    contextPrompt: 'Je collega vraagt wat je aan het doen bent.',
    structureFormula: '[Onderwerp] + [zijn] + aan het + [infinitief]',
    hint: 'Gebruik "aan het" + infinitief.',
  },
}

export const causalityExercise: Exercise = {
  ...baseExercise,
  id: 'causality-test',
  kind: 'causality-drill',
  prompt: 'Maak een zin met "doordat".',
  causalityData: {
    relationType: 'doordat-oorzaak',
    premiseOrCause: 'het regende de hele dag',
    resultOrAction: 'bleven we binnen',
    structureFormula: 'Doordat + [oorzaak], + [gevolg]',
    hint: 'Gebruik "doordat" voor een directe oorzaak.',
  },
}

export const concessionExercise: Exercise = {
  ...baseExercise,
  id: 'concession-test',
  kind: 'concession-drill',
  prompt: 'Maak een zin met "hoewel".',
  concessionData: {
    triggerType: 'hoewel-ofschoon',
    premiseA: 'het regent',
    contrastB: 'we gaan wandelen',
    structureFormula: 'Hoewel + [bijzin], + [hoofdzin]',
    hint: 'Na "hoewel" gaat de persoonsvorm naar het einde.',
  },
}

export const conditionalExercise: Exercise = {
  ...baseExercise,
  id: 'conditional-test',
  kind: 'conditional-drill',
  prompt: 'Maak een zin met "mits".',
  conditionalData: {
    conditionType: 'mits',
    mainPremise: 'je mag meegaan',
    conditionPremise: 'je op tijd bent',
    structureFormula: '[Hoofdzin] mits [voorwaarde]',
    hint: 'Gebruik "mits" = op voorwaarde dat.',
  },
}

export const correlativeExercise: Exercise = {
  ...baseExercise,
  id: 'correlative-test',
  kind: 'correlative-drill',
  prompt: 'Maak een zin met "zowel ... als".',
  correlativeData: {
    pairType: 'zowel-als',
    premiseA: 'Ik hou van koffie',
    premiseB: 'Ik hou van thee',
    structureFormula: 'zowel ... als ...',
    hint: 'Zowel A als B.',
  },
}

export const doubleInfinitiveExercise: Exercise = {
  ...baseExercise,
  id: 'double-infinitive-test',
  kind: 'double-infinitive-drill',
  prompt: 'Vorm de zin om in de verleden tijd.',
  doubleInfinitiveData: {
    sentenceContext: 'Ik kan dat niet. (in het verleden)',
    auxiliary: 'hebben',
    governingVerb: 'kunnen',
    governingType: 'modal',
    mainVerb: 'doen',
    hint: 'Gebruik "hebben" + infinitief + infinitief.',
  },
}

export const infinitiveExercise: Exercise = {
  ...baseExercise,
  id: 'infinitive-test',
  kind: 'infinitive-drill',
  prompt: 'Vorm een zin met "om ... te".',
  infinitiveData: {
    mainClause: 'Hij is te laat',
    infinitiveAction: 'de trein halen',
    constructionType: 'purpose-om-te',
    hint: 'Gebruik "om te" + infinitief.',
  },
}


export const participialExercise: Exercise = {
  ...baseExercise,
  id: 'participial-test',
  kind: 'participial-drill',
  prompt: 'Vorm een deelwoordconstructie.',
  participialData: {
    triggerType: 'al-participle-simultaneous',
    baseClause: 'Terwijl hij fietste, belde hij zijn moeder.',
    structureFormula: '[Tegenwoordig deelwoord] + [hoofdzin]',
    hint: 'Gebruik "fietsend" als bijwoordelijke bepaling.',
  },
}

export const fixedPrepositionExercise: Exercise = {
  ...baseExercise,
  id: 'fixed-preposition-test',
  kind: 'fixed-preposition-drill',
  prompt: 'Vul de juiste vaste voorzetsel in.',
  fixedPrepositionData: {
    collocationType: 'verb-preposition',
    governingHead: 'twijfelen',
    fixedPreposition: 'aan',
    contextPrompt: 'Ik twijfel ... mijn antwoord.',
    structureFormula: 'twijfelen aan + [object]',
    hint: 'Twijfelen aan.',
  },
}

export const prefixVerbExercise: Exercise = {
  ...baseExercise,
  id: 'prefix-verb-test',
  kind: 'prefix-verb-drill',
  prompt: 'Vorm een zin met "voorkomen".',
  prefixVerbData: {
    verb: 'voorkomen',
    stressPattern: 'separable-stressed-prefix',
    stressedForm: 'vóórkomen',
    meaningDefinition: 'iets gebeurt',
    targetStructure: 'present-main',
    contextPrompt: 'Zeg: dat gebeurt soms.',
    hint: 'Gebruik "voor" + "komen" met klemtoon op "voor".',
  },
}

export const midfieldExercise: Exercise = {
  ...baseExercise,
  id: 'midfield-test',
  kind: 'midfield-drill',
  prompt: 'Plaats de zinsdelen in de juiste volgorde.',
  midfieldData: {
    focusRule: 'tmp-order',
    slots: { time: 'gisteren', manner: 'rustig', place: 'thuis' },
    contextPrompt: 'Zeg: gisteren - rustig - thuis.',
    providedElements: ['gisteren', 'rustig', 'thuis'],
    structureFormula: '[Onderwerp] + [PV] + Tijd + Manier + Plaats',
    hint: 'Tijd voor Manier voor Plaats.',
  },
}

export const pronominalSplittingExercise: Exercise = {
  ...baseExercise,
  id: 'pronominal-splitting-test',
  kind: 'pronominal-splitting-drill',
  prompt: 'Splits het pronominaal adverbium.',
  pronominalSplittingData: {
    rWord: 'daar',
    preposition: 'op',
    combinedForm: 'daarop',
    clauseType: 'main-clause',
    contextPrompt: 'Ik wacht ... (op dat antwoord)',
    splittingStatus: 'natural-split-preferred',
    structureFormula: 'daar + [werkwoord] + op',
    hint: 'Splits "daarop" in "daar ... op".',
  },
}

export const modalParticleExercise: Exercise = {
  ...baseExercise,
  id: 'modal-particle-test',
  kind: 'modal-particle-drill',
  prompt: 'Voeg een modaal partikel toe.',
  modalParticleData: {
    particleCluster: 'toch maar',
    pragmaticFunction: 'concession-toch-maar',
    stiffOriginalSentence: 'Ik ga naar huis.',
    contextPrompt: 'Je bent moe, maar je wilt eigenlijk blijven.',
    structureFormula: '[Onderwerp] + [PV] + toch maar + [Middenveld]',
    syntacticSlotHint: 'Plaats "toch maar" direct na de persoonsvorm.',
    hint: 'Gebruik "toch maar" voor een tegenzin-beslissing.',
  },
}

export const topicalisationExercise: Exercise = {
  ...baseExercise,
  id: 'topicalisation-test',
  kind: 'topicalisation-drill',
  prompt: 'Begin de zin met het lijdend voorwerp.',
  topicalisationData: {
    focusType: 'object-fronting-v2',
    frontedElement: 'Dat boek',
    baseSentence: 'Ik lees dat boek.',
    contextPrompt: 'Leg de nadruk op het boek.',
    structureFormula: '[Object] + [PV] + [Onderwerp] + ...',
    hint: 'Zet het object vooraan en pas inversie toe.',
  },
}

export const pronominalExercise: Exercise = {
  ...baseExercise,
  id: 'pronominal-test',
  kind: 'pronominal-drill',
  prompt: 'Vervang door een pronominaal adverbium.',
  pronominalData: {
    sentence: 'Ik wacht op het antwoord.',
    preposition: 'op',
    object: 'het',
    hint: 'Gebruik "erop" of "daar ... op".',
  },
}

export const passiveExercise: Exercise = {
  ...baseExercise,
  id: 'passive-test',
  kind: 'passive-drill',
  prompt: 'Maak de zin passief.',
  passiveData: {
    activeSentence: 'De kok bereidt het eten.',
    focus: 'process',
    agent: 'de kok',
  },
}

export const nominalisationExercise: Exercise = {
  ...baseExercise,
  id: 'nominalisation-test',
  kind: 'nominalisation-drill',
  prompt: 'Nominaliseer het werkwoord.',
  nominalisationData: {
    verbalSentence: 'De afdeling onderzoekt de zaak.',
    targetNoun: 'onderzoek',
    hint: 'Gebruik "het onderzoek van".',
  },
}

export const reportedSpeechExercise: Exercise = {
  ...baseExercise,
  id: 'reported-speech-test',
  kind: 'reported-speech-drill',
  prompt: 'Geef de zin in indirecte rede weer.',
  reportedSpeechData: {
    directQuote: 'Ik kom morgen.',
    reportingClause: 'Hij zei dat',
    quoteType: 'statement',
    speaker: 'hij',
    hint: 'Na "dat" gaat de persoonsvorm naar het einde.',
  },
}

export const relativeClauseExercise: Exercise = {
  ...baseExercise,
  id: 'relative-clause-test',
  kind: 'relative-clause-drill',
  prompt: 'Vorm een betrekkelijke bijzin.',
  relativeClauseData: {
    mainClause: 'Het boek is spannend.',
    subordinateInfo: 'Ik lees dat boek.',
    antecedent: 'boek',
    antecedentType: 'het-word',
    relativePronoun: 'dat',
    hint: 'Gebruik "dat" voor het-woorden.',
  },
}

export const reframingExercise: Exercise = {
  ...baseExercise,
  id: 'reframing-test',
  kind: 'reframing-drill',
  prompt: 'Formuleer diplomatieker.',
  reframingData: {
    bluntSentence: 'Dat is fout.',
    softeningElements: ['misschien', 'zou', 'eventueel'],
    targetContext: 'Professional Meeting',
  },
}

export const erDrillExercise: Exercise = {
  ...baseExercise,
  id: 'er-drill-test',
  kind: 'er-drill',
  prompt: 'Vul "er" in op de juiste plek.',
  erDrillData: {
    sentence: 'Ik heb gisteren ... aan gedacht.',
    options: [
      { text: 'er', isCorrect: true, function: 'prepositional' },
      { text: 'daar', isCorrect: false },
    ],
    explanation: 'Bij "denken aan" gebruik je "er ... aan".',
  },
}

export const collocationExercise: Exercise = {
  ...baseExercise,
  id: 'collocation-test',
  kind: 'collocation-drill',
  prompt: 'Kies het juiste werkwoord bij {target}.',
  context: 'besluit',
  options: ['nemen', 'maken', 'doen'],
  acceptedAnswers: ['nemen'],
}

export const connectorExercise: Exercise = {
  ...baseExercise,
  id: 'connector-test',
  kind: 'connector-drill',
  prompt: 'Ik wil koffie ___ ik wil thee.',
  context: 'Kies het juiste voegwoord.',
  connectorOptions: [
    { text: 'maar', isCorrect: true },
    { text: 'omdat', isCorrect: false },
  ],
}

export const formalityExercise: Exercise = {
  ...baseExercise,
  id: 'formality-test',
  kind: 'formality-drill',
  prompt: 'Kies het formele register.',
  formalityLevels: [
    { level: 'casual', target: 'Wil je wat drinken?' },
    { level: 'neutral', target: 'Wil je iets drinken?' },
    { level: 'formal', target: 'Wilt u iets drinken?' },
  ],
}

export const pragmaticExercise: Exercise = {
  ...baseExercise,
  id: 'pragmatic-test',
  kind: 'pragmatic-drill',
  prompt: 'Kies de meest natuurlijke reactie.',
  pragmaticOptions: [
    { text: 'Dank u wel!', context: 'café', isBest: true, explanation: 'Beleefd en natuurlijk.' },
    { text: 'Geef me maar.', context: 'café', isBest: false, explanation: 'Te direct.' },
  ],
}

export const cohesionExercise: Exercise = {
  ...baseExercise,
  id: 'cohesion-test',
  kind: 'cohesion-drill',
  prompt: 'Zet de zinnen in de juiste volgorde.',
  target: 'Eerst kom ik aan. Daarna ga ik naar binnen.',
  scrambledSentences: ['Daarna ga ik naar binnen.', 'Eerst kom ik aan.'],
}

export const recombinationExercise: Exercise = {
  ...baseExercise,
  id: 'recombination-test',
  kind: 'recombination-drill',
  prompt: 'Combineer de concepten in één zin.',
  requiredWords: ['omdat', 'gisteren'],
}

export const summaryExercise: Exercise = {
  ...baseExercise,
  id: 'summary-test',
  kind: 'summary-challenge',
  prompt: 'Vat het artikel samen.',
  summaryPoints: [
    { id: 's1', label: 'De oorzaak', keywords: ['oorzaak'] },
    { id: 's2', label: 'De oplossing', keywords: ['oplossing'] },
  ],
}

export const correctionExercise: Exercise = {
  ...baseExercise,
  id: 'correction-test',
  kind: 'correction-challenge',
  prompt: 'Verbeter de fouten in de tekst.',
  correctionData: {
    originalText: 'Ik ben naar de markt geweest en koopt brood.',
    mistakes: [
      { segment: 'koopt', correction: 'kocht', explanation: 'Verleden tijd.' },
    ],
  },
}

export const inferenceExercise: Exercise = {
  ...baseExercise,
  id: 'inference-test',
  kind: 'inference-challenge',
  prompt: 'Wat kun je afleiden?',
  inferenceData: {
    scenario: 'Het is zeven uur en de wekker gaat af.',
    options: [
      { text: 'Het is ochtend.', isCorrect: true, explanation: 'De wekker gaat s ochtends af.' },
      { text: 'Het is avond.', isCorrect: false },
    ],
    hint: 'Denk aan het dagritme.',
  },
}

export const inductionExercise: Exercise = {
  ...baseExercise,
  id: 'induction-test',
  kind: 'induction',
  prompt: 'Leid de regel af uit de voorbeelden.',
  inductionData: {
    examples: [
      { prompt: 'Ik woon in Amsterdam.', answer: 'wonen' },
      { prompt: 'Jij woont in Utrecht.', answer: 'wonen' },
    ],
    ruleChallenge: 'Welke regel zie je?',
    options: [
      { text: 'De regel is dat.', isCorrect: true },
      { text: 'Niet waar.', isCorrect: false },
    ],
  },
}

export const morphingExercise: Exercise = {
  ...baseExercise,
  id: 'morphing-test',
  kind: 'morphing-drill',
  prompt: 'Vervorm de zin stap voor stap.',
  morphingData: {
    baseSentence: 'Ik loop naar de winkel.',
    steps: [
      { instruction: 'Maak er verleden tijd van.', target: 'Ik liep naar de winkel.', hint: 'Gebruik "liep".' },
      { instruction: 'Maak de zin vragend.', target: 'Liep ik naar de winkel?', hint: 'Inversie.' },
    ],
  },
}

export const listeningLadderExercise: Exercise = {
  ...baseExercise,
  id: 'listening-test',
  kind: 'listening',
  prompt: 'Luister en beantwoord de vraag.',
  audioUrl: '/audio/test.mp3',
  transcript: 'Goedemorgen, ik ben de docent.',
  translation: 'Good morning, I am the teacher.',
  listeningQuestion: 'Wie spreekt er?',
  listeningOptions: [
    { text: 'de docent', isCorrect: true },
    { text: 'de student', isCorrect: false },
  ],
}

export const readingLadderExercise: Exercise = {
  ...baseExercise,
  id: 'reading-test',
  kind: 'reading',
  prompt: 'Lees de tekst en beantwoord de vraag.',
  readingContent: 'Amsterdam is de hoofdstad van Nederland. De stad heeft veel grachten.',
  translation: 'Amsterdam is the capital of the Netherlands.',
  wordHints: {
    'hoofdstad': { meaning: 'capital', category: 'noun' },
    'grachten': { meaning: 'canals', category: 'noun' },
  },
}

export const fluencyExercise: Exercise = {
  ...baseExercise,
  id: 'fluency-test',
  kind: 'fluency-challenge',
  prompt: 'Herhaal snel na:',
  transcript: 'Ik woon al tien jaar in Amsterdam.',
  automaticitySeconds: 10,
}

export const missionExercise: Exercise = {
  ...baseExercise,
  id: 'mission-test',
  kind: 'conversation',
  prompt: 'Je zit in een vergadering. Wat zeg je?',
  aiPersonality: { isDifficult: true, style: 'professional', pushbackProbability: 0.6 },
  missionGoals: [
    { id: 'g1', label: 'Gebruik "overtuigen"', keywords: ['overtuigen'] },
    { id: 'g2', label: 'Noem een oplossing', keywords: ['oplossing'] },
  ],
}

export const capstoneExercise: Exercise = {
  ...baseExercise,
  id: 'capstone-test',
  kind: 'challenge',
  prompt: 'Los de situatie op als professional.',
  minimumLength: 8,
  missionGoals: [
    { id: 'g1', label: 'Stel een vraag', keywords: ['vraag'] },
  ],
}

export const speedExercise: Exercise = {
  ...baseExercise,
  id: 'speed-test',
  kind: 'speed-drill',
  prompt: 'Type de Nederlandse vertaling zo snel mogelijk.',
  automaticitySeconds: 4,
}

export const nuanceExercise: Exercise = {
  ...baseExercise,
  id: 'nuance-test',
  kind: 'nuance-drill',
  prompt: 'Maak de zin natuurlijker met een modaal partikel.',
  target: 'Ik kom wel even langs.',
}

export const understatementExercise: Exercise = {
  ...baseExercise,
  id: 'understatement-test',
  kind: 'understatement-drill',
  prompt: 'Verwoord dit op een understated manier.',
  target: 'Het valt wel mee.',
}

export const precisionExercise: Exercise = {
  ...baseExercise,
  id: 'precision-test',
  kind: 'precision-drill',
  prompt: 'Kies het precieze woord.',
  options: [
    { text: 'verzoeken', isCorrect: true },
    { text: 'vragen', isCorrect: false },
  ],
}

export const transformationExercise: Exercise = {
  ...baseExercise,
  id: 'transformation-test',
  kind: 'transformation',
  prompt: 'Vervorm de zin naar verleden tijd.',
  target: 'Ik fietste naar huis.',
}


export const circumlocutionExercise: Exercise = {
  ...baseExercise,
  id: 'circumlocution-test',
  kind: 'circumlocution',
  prompt: 'Beschrijf het begrip zonder het woord te gebruiken.',
  circumlocutionData: {
    concept: 'fiets',
    requiredKeywords: ['twee', 'wielen', 'trappen'],
  },
  forbiddenWords: ['fiets'],
  minimumLength: 10,
}

export const mediationExercise: Exercise = {
  ...baseExercise,
  id: 'mediation-test',
  kind: 'mediation',
  prompt: 'Vat de bron samen voor een Nederlandstalige collega.',
  mediationSource: { title: 'Het probleem', content: 'Er is een probleem met de planning.', language: 'nl' },
  mediationPoints: [
    { id: 'p1', label: 'Noem het probleem', keywords: ['probleem'] },
    { id: 'p2', label: 'Noem de oplossing', keywords: ['oplossing'] },
  ],
}

