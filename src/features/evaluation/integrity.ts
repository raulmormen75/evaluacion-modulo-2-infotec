import { allExerciseIds } from '../../data';
import type { EvaluationSnapshot, ExerciseProgress } from '../../data';
import { buildExerciseProgressMap } from './scoring';

export const SNAPSHOT_VERSION = '2';
export const DEFAULT_THEME_MODE: EvaluationSnapshot['themeMode'] = 'light';

export const INTEGRITY_MESSAGES = {
  unsupported:
    'Este navegador no admite el resguardo local requerido para esta evaluación. Usa una versión actual de Chrome, Edge, Safari o Firefox.',
  invalidSignature:
    'Se detectó una alteración no autorizada del progreso. La evaluación quedó bloqueada para proteger la calificación.',
  rollback:
    'Se detectó una restauración o retroceso del avance. La evaluación quedó bloqueada para proteger la calificación.',
  resetDetected:
    'Se detectó un borrado del progreso después de iniciar la evaluación. La sesión quedó bloqueada para proteger la calificación.'
} as const;

function createSeed() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `seed-${Date.now()}`;
}

function isIsoDate(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value));
}

function inferSequence(exercises: Record<string, ExerciseProgress>) {
  return Object.values(exercises).reduce((total, exercise) => total + exercise.attempts, 0);
}

function isValidExerciseProgress(exerciseId: string, candidate: unknown): candidate is ExerciseProgress {
  if (!candidate || typeof candidate !== 'object') {
    return false;
  }

  const value = candidate as Partial<ExerciseProgress>;
  const attempts = value.attempts;
  const incorrectAttempts = value.incorrectAttempts;
  const resolved = value.resolved;
  const resolvedOnFirstAttempt = value.resolvedOnFirstAttempt;

  if (value.id !== undefined && value.id !== exerciseId) {
    return false;
  }

  if (!Number.isInteger(attempts) || attempts! < 0) {
    return false;
  }

  if (!Number.isInteger(incorrectAttempts) || incorrectAttempts! < 0) {
    return false;
  }

  if (incorrectAttempts! > attempts!) {
    return false;
  }

  if (typeof resolved !== 'boolean' || typeof resolvedOnFirstAttempt !== 'boolean') {
    return false;
  }

  if (!resolved && resolvedOnFirstAttempt) {
    return false;
  }

  if (resolved && attempts === 0) {
    return false;
  }

  if (resolvedOnFirstAttempt && !(resolved && attempts === 1 && incorrectAttempts === 0)) {
    return false;
  }

  return true;
}

export function createInitialSnapshot(
  themeMode: EvaluationSnapshot['themeMode'] = DEFAULT_THEME_MODE
): EvaluationSnapshot {
  return {
    version: SNAPSHOT_VERSION,
    themeMode,
    seed: createSeed(),
    sequence: 0,
    integrityStatus: 'ready',
    integrityMessage: null,
    exercises: buildExerciseProgressMap(allExerciseIds),
    updatedAt: new Date().toISOString()
  };
}

export function createLockedSnapshot(
  themeMode: EvaluationSnapshot['themeMode'],
  message: string,
  sequence = 0
): EvaluationSnapshot {
  const snapshot = createInitialSnapshot(themeMode);

  return {
    ...snapshot,
    sequence,
    integrityStatus: 'locked',
    integrityMessage: message
  };
}

export function normalizeSnapshot(
  candidate: Partial<EvaluationSnapshot> | null | undefined,
  fallbackThemeMode: EvaluationSnapshot['themeMode'] = DEFAULT_THEME_MODE
): EvaluationSnapshot | null {
  if (!candidate || typeof candidate !== 'object') {
    return null;
  }

  const base = createInitialSnapshot(fallbackThemeMode);
  const rawExercises = candidate.exercises;

  if (!rawExercises || typeof rawExercises !== 'object') {
    return null;
  }

  const mergedExercises = { ...base.exercises };

  for (const exerciseId of allExerciseIds) {
    const stored = rawExercises[exerciseId];

    if (!isValidExerciseProgress(exerciseId, stored)) {
      return null;
    }

    mergedExercises[exerciseId] = {
      ...stored,
      id: exerciseId
    };
  }

  const themeMode = candidate.themeMode === 'dark' ? 'dark' : 'light';
  const sequenceCandidate =
    typeof candidate.sequence === 'number' && Number.isInteger(candidate.sequence) && candidate.sequence >= 0
      ? candidate.sequence
      : inferSequence(mergedExercises);

  return {
    version: SNAPSHOT_VERSION,
    themeMode,
    seed: typeof candidate.seed === 'string' && candidate.seed ? candidate.seed : base.seed,
    sequence: sequenceCandidate,
    integrityStatus: candidate.integrityStatus === 'locked' ? 'locked' : 'ready',
    integrityMessage: typeof candidate.integrityMessage === 'string' ? candidate.integrityMessage : null,
    exercises: mergedExercises,
    updatedAt: isIsoDate(candidate.updatedAt) ? candidate.updatedAt : base.updatedAt
  };
}

export function stableStringify(value: unknown): string {
  return JSON.stringify(sortValue(value));
}

function sortValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => sortValue(item));
  }

  if (value && typeof value === 'object') {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((accumulator, key) => {
        accumulator[key] = sortValue((value as Record<string, unknown>)[key]);
        return accumulator;
      }, {});
  }

  return value;
}
