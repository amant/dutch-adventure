export type SkillDimension = 'recognition' | 'meaning' | 'production' | 'automaticity' | 'listening' | 'speaking' | 'spelling' | 'pragmatic' | 'coherence' | 'idiomatic'

export interface ConceptState {
  recognition: number
  meaning: number
  production: number
  automaticity: number
  listening: number
  speaking: number
  spelling: number
  pragmatic: number
  coherence: number
  idiomatic: number
  encounters: number
  successes: number
  lastEncountered?: string
  usageHistory?: { prompt: string, snippet: string, date: string, pragmaticScore?: number }[]
  redlineHistory?: { userAnswer: string, naturalCorrection: string, date: string }[]
  responseTimes?: number[]
}

export interface Redline {
  id: string
  exerciseId: string
  prompt: string
  userAnswer: string
  naturalCorrection: string
  explanation: string
  date: string
  vocabulary?: string[]
  grammar?: string[]
}

export interface LearnerMemory {
  overall: Record<SkillDimension, number>
  vocabulary: Record<string, ConceptState>
  grammar: Record<string, ConceptState>
  idioms: Record<string, ConceptState>
  recentRedlines?: Redline[]
}

export type StageKind = 'discover' | 'understand' | 'retrieve' | 'transform' | 'personalise' | 'review'

export type ExerciseKind = 'info' | 'typed' | 'conversation' | 'listening' | 'reading' | 'transformation' | 'flexibility' | 'challenge' | 'speed-drill' | 'pragmatic-drill' | 'formality-drill' | 'mediation' | 'connector-drill' | 'recombination-drill' | 'induction' | 'correction-challenge' | 'circumlocution' | 'nuance-drill' | 'collocation-drill' | 'fluency-challenge' | 'mirroring' | 'precision-drill' | 'inference-challenge' | 'morphing-drill' | 'listening-cloze' | 'debate' | 'understatement-drill' | 'cohesion-drill' | 'summary-challenge' | 'er-drill' | 'reframing-drill' | 'pronominal-drill' | 'nominalisation-drill' | 'passive-drill' | 'reported-speech-drill'

export interface Exercise {
  id: string
  kind: ExerciseKind
  prompt: string
  context?: string
  target?: string
  acceptedAnswers?: string[]
  // For cloze
  clozeData?: {
    textWithGaps: string // e.g. "Ik [..] naar huis [..] het regent."
    answers: string[]
  }
  // For debate
  debateData?: {
    phases: { id: string, label: string, prompt: string }[]
    requiredConnectors: string[]
  }
  explanation?: string
  correction?: string
  skills: SkillDimension[]
  vocabulary?: string[]
  grammar?: string[]
  idioms?: string[]
  placeholder?: string
  // For listening ladder
  audioUrl?: string
  transcript?: string
  translation?: string
  listeningQuestion?: string
  listeningOptions?: { text: string, isCorrect: boolean }[]
  // For conversation
  simulatorResponse?: string
  // For reading ladder
  readingContent?: string
  wordHints?: Record<string, { meaning: string, category?: string }>
  // For timed drills
  automaticitySeconds?: number
  // For flexibility
  forbiddenWords?: string[]
  requiredWords?: string[]
  // For challenge
  minimumLength?: number
  // For AI Personas
  aiPersonality?: {
    isDifficult?: boolean
    style?: 'polite' | 'colloquial' | 'impatient' | 'helpful'
    pushbackProbability?: number
  }
  // For pragmatic context choice
  pragmaticOptions?: { text: string, context: string, isBest: boolean, explanation: string }[]
  // For formality switcher
  formalityLevels?: { level: 'casual' | 'neutral' | 'formal', target: string, prompt?: string }[]
  // For missions
  missionGoals?: { id: string, label: string, achieved?: boolean, keywords?: string[], setRegister?: 'formal' | 'informal' }[]
  // For register control
  requiredRegister?: 'formal' | 'informal'
  // For mediation
  mediationSource?: { title: string, content: string, language: 'en' | 'nl' }
  mediationPoints?: { id: string, label: string, keywords: string[] }[]
  // For connectors
  connectorOptions?: { text: string, isCorrect: boolean }[]
  // For induction
  inductionData?: {
    examples: { prompt: string, answer: string }[]
    ruleChallenge: string
    options: { text: string, isCorrect: boolean }[]
  }
  // For correction challenge
  correctionData?: {
    originalText: string
    mistakes: { segment: string, correction: string, explanation: string }[]
  }
  // For circumlocution
  circumlocutionData?: {
    concept: string
    requiredKeywords: string[]
  }
  // For morphing
  morphingData?: {
    baseSentence: string
    steps: { instruction: string, target: string, hint?: string }[]
  }
  // For cohesion
  scrambledSentences?: string[]
  // For summarisation
  summaryPoints?: { id: string, label: string, keywords: string[] }[]
  // For 'Er' mastery
  erDrillData?: {
    sentence: string
    options: { text: string, isCorrect: boolean, function?: 'locative' | 'partitive' | 'prepositional' | 'subjective' }[]
    explanation?: string
  }
  // For pronominal adverbs
  pronominalData?: {
    sentence: string
    preposition: string
    object: string
    hint?: string
  }
  // For diplomatic reframing
  reframingData?: {
    bluntSentence: string
    softeningElements: string[]
    targetContext: string
  }
  // For nominalisation
  nominalisationData?: {
    verbalSentence: string
    targetNoun: string
    hint?: string
  }
  // For passive voice
  passiveData?: {
    activeSentence: string
    focus: 'process' | 'result' | 'er-passive'
    agent?: string
  }
  // For reported speech
  reportedSpeechData?: {
    directQuote: string
    reportingClause?: string
    quoteType?: 'statement' | 'question' | 'instruction'
    speaker?: string
    hint?: string
  }
}

export interface ChapterStage {
  id: string
  title: string
  kind: StageKind
  intro?: string
  exercises: Exercise[]
}

export interface Chapter {
  slug: string
  level: 'A1' | 'A2' | 'B1' | 'B2'
  title: string
  capability: string
  description: string
  estimatedMinutes: number
  stages: ChapterStage[]
  relatedArticleSlug?: string
  isCapstone?: boolean
}

export type FeedbackOutcome = 'correct' | 'acceptable' | 'retry'

export interface Feedback {
  outcome: FeedbackOutcome
  message: string
  target?: string
  explanation?: string
  correction?: string
  skills: SkillDimension[]
  vocabulary?: string[]
  grammar?: string[]
  idioms?: string[]
  changeModifier?: number
  miniLesson?: {
    title: string
    content: string
    example: {
      wrong: string
      right: string
    }
  }
  teacherCorrection?: {
    natural: string
    explanation: string
  }
  pragmaticScore?: number
  pragmaticFeedback?: string
  achievedGoalIds?: string[]
  requiredRegister?: 'formal' | 'informal'
  mediationPointsAchieved?: string[]
}

export interface Attempt {
  exerciseId: string
  answer: string
  feedback: Feedback
  createdAt: string
}


export interface PersistedSession {
  chapterSlug: string
  stageIndex: number
  exerciseIndex: number
  attempts: Attempt[]
  completed: boolean
  memory: LearnerMemory
}