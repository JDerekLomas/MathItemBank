export type Confidence = 'think' | 'know';
export type QuestionPhase = 'answering' | 'selected' | 'feedback' | 'complete';
export type SessionPhase = 'warmup' | 'challenge' | 'resolution';
export type Difficulty = 'beginning' | 'developing' | 'proficient' | 'advanced';

export interface QuizItem {
  id: string;
  domain: string;
  tags: string[];
  difficulty: Difficulty;
  title: string;
  question: string;
  correctAnswer: string;
  distractors: string[];
  explanation: string;
  hints?: string[];
  misconceptions?: string[];
}

export interface QuizQuestion {
  item: QuizItem;
  options: string[];
  correctIndex: number;
  selectedIndex: number | null;
  confidence: Confidence | null;
  isCorrect: boolean | null;
  timeStartedMs: number;
  timeSpentMs: number;
  phase: QuestionPhase;
}

export interface QuizSession {
  id: string;
  startedAt: number;
  questions: QuizQuestion[];
  currentIndex: number;
  xp: number;
  sessionPhase: SessionPhase;
}

export type FeedbackType =
  | 'confident-correct'
  | 'unsure-correct'
  | 'unsure-wrong'
  | 'confident-wrong';

export function getFeedbackType(
  confidence: Confidence,
  isCorrect: boolean
): FeedbackType {
  if (isCorrect && confidence === 'know') return 'confident-correct';
  if (isCorrect && confidence === 'think') return 'unsure-correct';
  if (!isCorrect && confidence === 'think') return 'unsure-wrong';
  return 'confident-wrong';
}

export function getXPForFeedback(type: FeedbackType): number {
  switch (type) {
    case 'confident-correct':
      return 15;
    case 'unsure-correct':
      return 10;
    case 'unsure-wrong':
      return 3;
    case 'confident-wrong':
      return 5;
  }
}
