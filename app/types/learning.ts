export type SkillDimension = 'recognition' | 'meaning' | 'production' | 'automaticity' | 'listening' | 'speaking' | 'spelling' | 'pragmatic'

export interface ConceptState {
  recognition: number
  meaning: number
  production: number
  automaticity: number
  listening: number
  speaking: number
  spelling: number
  pragmatic: number
  encounters: number
  successes: number
  lastEncountered?: string
  usageHistory?: { snippet: string, date: string }[]
}

export interface LearnerMemory {
  overall: Record<SkillDimension, number>
  vocabulary: Record<string, ConceptState>
  grammar: Record<string, ConceptState>
}

export type StageKind = 'discover' | 'understand' | 'retrieve' | 'transform' | 'personalise' | 'review'

export type ExerciseKind = 'info' | 'typed' | 'conversation' | 'listening' | 'reading' | 'transformation' | 'flexibility' | 'challenge' | 'speed-drill' | 'pragmatic-drill' | 'mediation'

export interface Exercise {
  id: string
  kind: ExerciseKind
  prompt: string
  context?: string
  target?: string
  acceptedAnswers?: string[]
  explanation?: string
  correction?: string
  skills: SkillDimension[]
  vocabulary?: string[]
  grammar?: string[]
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
  // For missions
  missionGoals?: { id: string, label: string, achieved?: boolean, keywords?: string[] }[]
  // For mediation
  mediationSource?: { title: string, content: string, language: 'en' | 'nl' }
  mediationPoints?: { id: string, label: string, keywords: string[] }[]
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