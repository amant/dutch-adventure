export type SkillDimension = 'recognition' | 'meaning' | 'production' | 'automaticity'

export type StageKind = 'discover' | 'understand' | 'retrieve' | 'transform' | 'personalise' | 'review'

export interface Exercise {
  id: string
  kind: 'info' | 'typed'
  prompt: string
  context?: string
  target?: string
  acceptedAnswers?: string[]
  explanation?: string
  correction?: string
  skills: SkillDimension[]
  placeholder?: string
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
  level: 'B1'
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
}

export interface Attempt {
  exerciseId: string
  answer: string
  feedback: Feedback
  createdAt: string
}

export type LearnerMemory = Record<SkillDimension, number>

export interface PersistedSession {
  chapterSlug: string
  stageIndex: number
  exerciseIndex: number
  attempts: Attempt[]
  completed: boolean
  memory: LearnerMemory
}