import type { EvaluationMetrics, EvaluationSnapshot, ExerciseProgress } from '../../data';
import { clamp } from '../../utils/format';

export function createExerciseProgress(id: string): ExerciseProgress {
  return {
    id,
    attempts: 0,
    incorrectAttempts: 0,
    resolved: false,
    resolvedOnFirstAttempt: false
  };
}

export function buildExerciseProgressMap(exerciseIds: string[]) {
  return Object.fromEntries(exerciseIds.map((exerciseId) => [exerciseId, createExerciseProgress(exerciseId)]));
}

export function recordExerciseAttempt(
  snapshot: EvaluationSnapshot,
  exerciseId: string,
  wasCorrect: boolean
) {
  if (snapshot.integrityStatus === 'locked') {
    return snapshot;
  }

  const current = snapshot.exercises[exerciseId];

  if (!current) {
    return snapshot;
  }

  if (current.resolved && wasCorrect) {
    return snapshot;
  }

  const nextAttempts = current.attempts + 1;
  const updated: ExerciseProgress = wasCorrect
    ? {
        ...current,
        attempts: nextAttempts,
        resolved: true,
        resolvedOnFirstAttempt: current.attempts === 0
      }
    : {
        ...current,
        attempts: nextAttempts,
        incorrectAttempts: current.incorrectAttempts + 1
      };

  return {
    ...snapshot,
    sequence: snapshot.sequence + 1,
    exercises: {
      ...snapshot.exercises,
      [exerciseId]: updated
    },
    updatedAt: new Date().toISOString()
  };
}

export function calculateMetrics(snapshot: EvaluationSnapshot): EvaluationMetrics {
  const items = Object.values(snapshot.exercises);
  const resolvedCount = items.filter((item) => item.resolved).length;
  const incorrectAttempts = items.reduce((total, item) => total + item.incorrectAttempts, 0);
  const firstAttemptCorrectCount = items.filter((item) => item.resolvedOnFirstAttempt).length;
  const scorePercent = clamp(firstAttemptCorrectCount - incorrectAttempts, 0, 100);
  const completionPercent = Math.round((resolvedCount / items.length) * 100);

  return {
    resolvedCount,
    incorrectAttempts,
    firstAttemptCorrectCount,
    scorePercent,
    completionPercent
  };
}
