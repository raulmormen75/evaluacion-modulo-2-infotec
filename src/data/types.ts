export type ThemeId = 1 | 2 | 3 | 4 | 5;
export type ActivityType = 'match' | 'mcq' | 'swipe';
export type Difficulty = 'facil' | 'intermedio';

export interface ThemeSummary {
  id: ThemeId;
  label: string;
  shortTitle: string;
  title: string;
  description: string;
}

export interface BaseExercise {
  id: string;
  themeId: ThemeId;
  activity: ActivityType;
  subtype: string;
  prompt: string;
  difficulty: Difficulty;
}

export interface MatchItem extends BaseExercise {
  activity: 'match';
  concept: string;
  definitionId: string;
  definition: string;
  correctAnswer: string;
}

export interface MultipleChoiceOption {
  id: 'a' | 'b' | 'c' | 'd' | 'e';
  text: string;
}

export interface MultipleChoiceItem extends BaseExercise {
  activity: 'mcq';
  question: string;
  options: MultipleChoiceOption[];
  correctAnswer: MultipleChoiceOption['id'];
}

export interface SwipeItem extends BaseExercise {
  activity: 'swipe';
  statement: string;
  correctAnswer: boolean;
}

export interface ExerciseProgress {
  id: string;
  attempts: number;
  incorrectAttempts: number;
  resolved: boolean;
  resolvedOnFirstAttempt: boolean;
}

export interface EvaluationSnapshot {
  version: string;
  themeMode: 'light' | 'dark';
  seed: string;
  sequence: number;
  integrityStatus: 'ready' | 'locked';
  integrityMessage: string | null;
  exercises: Record<string, ExerciseProgress>;
  updatedAt: string;
}

export interface EvaluationMetrics {
  resolvedCount: number;
  incorrectAttempts: number;
  firstAttemptCorrectCount: number;
  scorePercent: number;
  completionPercent: number;
}
