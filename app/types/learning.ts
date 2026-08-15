export type SkillDimension = 'recognition' | 'meaning' | 'production' | 'automaticity' | 'listening' | 'speaking' | 'spelling' | 'pragmatic' | 'coherence' | 'idiomatic' | 'grammar' | 'writing' | 'reading' | 'flexibility' | 'interaction' | 'analysis';

export interface ConceptState {
  recognition: number;
  meaning: number;
  production: number;
  automaticity: number;
  listening: number;
  speaking: number;
  spelling: number;
  pragmatic: number;
  coherence: number;
  idiomatic: number;
  grammar?: number;
  writing?: number;
  reading?: number;
  flexibility?: number;
  interaction?: number;
  analysis?: number;
  encounters: number;
  successes: number;
  lastEncountered?: string;
  usageHistory?: { prompt: string; snippet: string; date: string; pragmaticScore?: number }[];
  redlineHistory?: { userAnswer: string; naturalCorrection: string; date: string }[];
  responseTimes?: number[];
  [key: string]: any;
}

export interface Redline {
  id: string;
  exerciseId: string;
  prompt: string;
  userAnswer: string;
  naturalCorrection: string;
  explanation: string;
  date: string;
  vocabulary?: string[];
  grammar?: string[];
}

export interface LearnerMemory {
  overall: Record<SkillDimension, number>;
  vocabulary: Record<string, ConceptState>;
  grammar: Record<string, ConceptState>;
  idioms: Record<string, ConceptState>;
  recentRedlines?: Redline[];
}

export type CEFR = 'A1' | 'A2' | 'B1' | 'B2';

export type StageKind = 'discover' | 'understand' | 'retrieve' | 'transform' | 'personalise' | 'review' | 'flexibility' | 'drill' | 'challenge' | 'conversation';

export type ExerciseKind = 'info' | 'typed' | 'conversation' | 'listening' | 'reading' | 'transformation' | 'flexibility' | 'challenge' | 'speed-drill' | 'pragmatic-drill' | 'formality-drill' | 'mediation' | 'connector-drill' | 'recombination-drill' | 'induction' | 'correction-challenge' | 'circumlocution' | 'nuance-drill' | 'collocation-drill' | 'fluency-challenge' | 'mirroring' | 'precision-drill' | 'inference-challenge' | 'morphing-drill' | 'listening-cloze' | 'debate' | 'understatement-drill' | 'cohesion-drill' | 'summary-challenge' | 'er-drill' | 'reframing-drill' | 'pronominal-drill' | 'nominalisation-drill' | 'passive-drill' | 'reported-speech-drill' | 'relative-clause-drill' | 'infinitive-drill' | 'double-infinitive-drill' | 'concession-drill' | 'participial-drill' | 'correlative-drill' | 'conditional-drill' | 'causality-drill' | 'prefix-verb-drill' | 'midfield-drill' | 'fixed-preposition-drill' | 'pronominal-splitting-drill' | 'aspect-drill' | 'modal-particle-drill' | 'topicalisation-drill' | 'personalise';

export interface Exercise {
  id: string;
  kind: ExerciseKind;
  prompt: string;
  context?: string;
  target?: string;
  acceptedAnswers?: string[];
  // For cloze
  clozeData?: {
    textWithGaps: string; // e.g. "Ik [..] naar huis [..] het regent."
    answers: string[];
  };
  // For debate
  debateData?: {
    phases: { id: string; label: string; prompt: string }[];
    requiredConnectors: string[];
  };
  explanation?: string;
  correction?: string;
  skills: SkillDimension[];
  vocabulary?: string[];
  grammar?: string[];
  idioms?: string[];
  placeholder?: string;
  // For listening ladder
  audioUrl?: string;
  transcript?: string;
  translation?: string;
  listeningQuestion?: string;
  listeningOptions?: { text: string; isCorrect: boolean }[];
  // For conversation
  simulatorResponse?: string;
  // For reading ladder
  readingContent?: string;
  wordHints?: Record<string, { meaning: string; category?: string }>;
  // For timed drills
  automaticitySeconds?: number;
  // For flexibility
  forbiddenWords?: string[];
  requiredWords?: string[];
  // For challenge
  minimumLength?: number;
  options?: (string | { text: string; isCorrect?: boolean; explanation?: string; label?: string })[];
  inferenceData?: {
    scenario?: string;
    premise?: string;
    options: { text: string; isCorrect: boolean; explanation?: string }[];
    hint?: string;
  };
  // For AI Personas
  aiPersonality?: {
    isDifficult?: boolean;
    style?: 'polite' | 'colloquial' | 'impatient' | 'helpful' | 'professional';
    pushbackProbability?: number;
  };
  // For pragmatic context choice
  pragmaticOptions?: { text: string; context: string; isBest: boolean; explanation: string }[];
  // For formality switcher
  formalityLevels?: { level: 'casual' | 'neutral' | 'formal'; target: string; prompt?: string }[];
  // For missions
  missionGoals?: { id: string; label: string; achieved?: boolean; keywords?: string[]; setRegister?: 'formal' | 'informal' }[];
  // For register control
  requiredRegister?: 'formal' | 'informal';
  // For mediation
  mediationSource?: { title: string; content: string; language: 'en' | 'nl' };
  mediationPoints?: { id: string; label: string; keywords: string[] }[];
  // For connectors
  connectorOptions?: { text: string; isCorrect: boolean }[];
  // For induction
  inductionData?: {
    examples: { prompt: string; answer: string }[];
    ruleChallenge: string;
    options: { text: string; isCorrect: boolean }[];
  };
  // For correction challenge
  correctionData?: {
    originalText: string;
    mistakes: { segment: string; correction: string; explanation: string }[];
  };
  // For circumlocution
  circumlocutionData?: {
    concept: string;
    requiredKeywords: string[];
  };
  // For morphing
  morphingData?: {
    baseSentence: string;
    steps: { instruction: string; target: string; hint?: string }[];
  };
  // For cohesion
  scrambledSentences?: string[];
  // For summarisation
  summaryPoints?: { id: string; label: string; keywords: string[] }[];
  // For 'Er' mastery
  erDrillData?: {
    sentence: string;
    options: { text: string; isCorrect: boolean; function?: 'locative' | 'partitive' | 'prepositional' | 'subjective' }[];
    explanation?: string;
  };
  // For pronominal adverbs
  pronominalData?: {
    sentence: string;
    preposition: string;
    object: string;
    hint?: string;
  };
  // For diplomatic reframing
  reframingData?: {
    bluntSentence: string;
    softeningElements: string[];
    targetContext: string;
  };
  // For nominalisation
  nominalisationData?: {
    verbalSentence: string;
    targetNoun: string;
    hint?: string;
  };
  // For passive voice
  passiveData?: {
    activeSentence: string;
    focus: 'process' | 'result' | 'er-passive';
    agent?: string;
  };
  // For reported speech
  reportedSpeechData?: {
    directQuote: string;
    reportingClause?: string;
    quoteType?: 'statement' | 'question' | 'instruction';
    speaker?: string;
    hint?: string;
  };
  // For relative clauses
  relativeClauseData?: {
    mainClause: string;
    subordinateInfo: string;
    antecedent: string;
    antecedentType: 'de-word' | 'het-word' | 'person-prep' | 'thing-prep' | 'general-wat';
    preposition?: string;
    relativePronoun?: string;
    hint?: string;
  };
  // For infinitive clauses (om... te / te + inf)
  infinitiveData?: {
    mainClause: string;
    infinitiveAction: string;
    constructionType: 'purpose-om-te' | 'adjective-om-te' | 'separable-te' | 'semi-auxiliary-te' | 'fixed-verb-te';
    verb?: string;
    separablePrefix?: string;
    baseVerb?: string;
    hint?: string;
  };
  // For double infinitive / IPP (Infinitivus Pro Participio)
  doubleInfinitiveData?: {
    sentenceContext: string;
    auxiliary: 'hebben' | 'zijn';
    governingVerb: string;
    governingType: 'modal' | 'causative-laten' | 'perception' | 'instruction-leren-helpen' | 'motion-blijven-gaan';
    mainVerb: string;
    isSubordinate?: boolean;
    subordinateConjunction?: string;
    hint?: string;
  };
  // For concessive clauses & contrast (hoewel, ondanks (dat), al-inversion, hoe... ook, weliswaar... maar)
  concessionData?: {
    triggerType: 'hoewel-ofschoon' | 'ondanks-noun-vs-clause' | 'al-inversion' | 'hoe-ook-correlative' | 'weliswaar-maar';
    premiseA: string;
    contrastB: string;
    connectorCue?: string;
    structureFormula?: string;
    hint?: string;
  };
  // For participial constructions & gerundives (het te-deelwoord, tegenwoordig/voltooid deelwoord, al doende, beknopte zinnen)
  participialData?: {
    triggerType: 'gerundive-modal' | 'present-participle-attr' | 'past-participle-attr' | 'al-participle-simultaneous' | 'concise-clause';
    baseClause: string;
    targetTypeLabel?: string;
    participleCue?: string;
    structureFormula?: string;
    hint?: string;
  };
  // For correlative connectors & balanced structures (zowel... als, niet alleen... maar ook, noch... noch, hetzij... hetzij, enerzijds... anderzijds, hoe... des te)
  correlativeData?: {
    pairType: 'zowel-als' | 'niet-alleen-maar-ook' | 'noch-noch' | 'hetzij-hetzij' | 'enerzijds-anderzijds' | 'hoe-des-te';
    premiseA: string;
    premiseB: string;
    pairCue?: string;
    structureFormula?: string;
    hint?: string;
  };
  // For conditional & restrictive clauses (mits, tenzij, op voorwaarde dat, gesteld dat, voor zover, mocht...)
  conditionalData?: {
    conditionType: 'mits' | 'tenzij' | 'op-voorwaarde-dat' | 'gesteld-dat' | 'voor-zover' | 'mocht-inversion';
    mainPremise: string;
    conditionPremise: string;
    connectorCue?: string;
    structureFormula?: string;
    hint?: string;
  };
  // For causal, consecutive & final relations (doordat, aangezien, te wijten aan, te danken aan, waardoor, dermate... dat, opdat, teneinde... te)
  causalityData?: {
    relationType: 'doordat-oorzaak' | 'aangezien-reden' | 'te-wijten-aan' | 'te-danken-aan' | 'waardoor-gevolg' | 'dermate-dat' | 'opdat-doel' | 'teneinde-te';
    premiseOrCause: string;
    resultOrAction: string;
    connectorCue?: string;
    structureFormula?: string;
    hint?: string;
  };
  // For separable vs. inseparable prefix verbs & stress semantics (voorkomen vs. vóórkomen, ondergaan vs. óndergaan, overleggen vs. óverleggen, etc.)
  prefixVerbData?: {
    verb: string;
    stressPattern: 'separable-stressed-prefix' | 'inseparable-stressed-stem';
    stressedForm: string;
    meaningDefinition: string;
    targetStructure: 'present-main' | 'present-subclause' | 'perfect-tense' | 'infinitive-te';
    contextPrompt: string;
    structureFormula?: string;
    hint?: string;
  };
  // For midfield word order, TMP sequencing & object/negation distribution (Tijd - Manier - Plaats, Lijdend/Meewerkend Voorwerp, Negatie)
  midfieldData?: {
    focusRule: 'tmp-order' | 'definite-vs-indefinite-object' | 'indirect-direct-object' | 'negation-placement' | 'modal-adverb-tmp';
    slots?: {
      time?: string;
      manner?: string;
      place?: string;
      directObject?: { text: string; isDefinite: boolean };
      indirectObject?: { text: string; preposition?: string };
      negation?: 'niet' | 'geen';
      predicateOrPrepObject?: string;
    };
    contextPrompt: string;
    providedElements: string[];
    structureFormula?: string;
    hint?: string;
  };
  // For fixed prepositions & prepositional regimes (twijfelen aan, rekening houden met, bestand zijn tegen, zich neerleggen bij, bijdragen aan, etc.)
  fixedPrepositionData?: {
    collocationType: 'verb-preposition' | 'adjective-preposition' | 'noun-preposition' | 'abstract-regime';
    governingHead: string;
    fixedPreposition: string;
    contextPrompt: string;
    commonTransferErrors?: string[];
    meaningContext?: string;
    structureFormula?: string;
    hint?: string;
  };
  // For pronominal adverb splitting & syntactic word order (er... over, waar... naar, daar... aan, hier... mee, nergens... in)
  pronominalSplittingData?: {
    rWord: 'er' | 'hier' | 'daar' | 'waar' | 'nergens' | 'overal' | 'ergens';
    preposition: string;
    combinedForm: string;
    clauseType: 'main-clause' | 'subclause' | 'question-waar' | 'fronted-topic';
    contextPrompt: string;
    providedElements?: string[];
    structureFormula?: string;
    splittingStatus: 'natural-split-preferred' | 'formal-unsplit-allowed' | 'mandatory-split';
    hint?: string;
  };
  // For aspectual verbs, posture verbs & progressive durative constructions (zitten/staan/liggen/lopen te, aan het... zijn, op het punt staan om te, plegen te, dreigen te)
  aspectData?: {
    aspectCategory: 'posture-durative' | 'progressive-aan-het' | 'imminent-op-het-punt' | 'customary-plegen' | 'prospective-dreigen-beloven' | 'perfect-posture-ipp';
    postureOrAspectVerb: string;
    infinitiveAction: string;
    contextPrompt: string;
    clauseType?: 'main-clause' | 'subclause' | 'perfect-tense-ipp';
    structureFormula?: string;
    hint?: string;
  };
  // For modal particle combinations & pragmatic shading (toch maar eens, nou eenmaal, wel degelijk, dan maar, eens even, maar beter, immers, eigenlijk)
  modalParticleData?: {
    particleCluster: string;
    pragmaticFunction: 'rebuttal-wel-degelijk' | 'inevitability-nou-eenmaal' | 'concession-toch-maar' | 'tactful-urgency-toch-maar-eens' | 'reluctant-alternative-dan-maar' | 'shared-premise-immers' | 'softened-inquiry-eens-even' | 'advisory-caution-maar-beter';
    stiffOriginalSentence: string;
    contextPrompt: string;
    structureFormula?: string;
    syntacticSlotHint?: string;
    hint?: string;
  };
  // For focus fronting, topicalisation & emphatic inversion (object fronting, infinitive with doen, participle fronting, left dislocation with resumptive pronouns, cleft sentences)
  topicalisationData?: {
    focusType: 'object-fronting-v2' | 'infinitive-fronting-doen' | 'participle-fronting' | 'left-dislocation-resumptive' | 'cleft-het-is-dat' | 'cleft-het-is-die' | 'inverted-conditional-mocht';
    frontedElement: string;
    baseSentence: string;
    resumptiveElement?: string;
    contextPrompt: string;
    structureFormula?: string;
    hint?: string;
  };
}

export interface ChapterStage {
  id: string;
  title: string;
  kind: StageKind;
  intro?: string;
  exercises: Exercise[];
}

export interface Chapter {
  id?: string;
  slug: string;
  level: CEFR;
  title: string;
  capability: string;
  description: string;
  estimatedMinutes: number;
  stages: ChapterStage[];
  relatedArticleSlug?: string;
  isCapstone?: boolean;
}

export type FeedbackOutcome = 'correct' | 'acceptable' | 'retry';

export interface Feedback {
  outcome: FeedbackOutcome;
  message: string;
  target?: string;
  explanation?: string;
  correction?: string;
  natural?: string;
  teacherTip?: string;
  isShadowing?: boolean;
  skills: SkillDimension[];
  vocabulary?: string[];
  grammar?: string[];
  idioms?: string[];
  changeModifier?: number;
  miniLesson?: {
    title: string;
    content: string;
    example: {
      wrong: string;
      right: string;
    };
  };
  teacherCorrection?: {
    natural: string;
    explanation: string;
  };
  pragmaticScore?: number;
  pragmaticFeedback?: string;
  achievedGoalIds?: string[];
  requiredRegister?: 'formal' | 'informal';
  mediationPointsAchieved?: string[];
}

export interface Attempt {
  exerciseId: string;
  answer: string;
  feedback: Feedback;
  createdAt: string;
}

export interface PersistedSession {
  chapterSlug: string;
  stageIndex: number;
  exerciseIndex: number;
  attempts: Attempt[];
  completed: boolean;
  memory: LearnerMemory;
}
