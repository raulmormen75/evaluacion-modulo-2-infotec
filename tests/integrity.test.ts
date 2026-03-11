import { describe, expect, it } from 'vitest';
import { allExerciseIds } from '../src/data';
import {
  createInitialSnapshot,
  createLockedSnapshot,
  INTEGRITY_MESSAGES,
  normalizeSnapshot,
  stableStringify
} from '../src/features/evaluation/integrity';
import { buildExerciseProgressMap } from '../src/features/evaluation/scoring';

describe('Integridad local', () => {
  it('normaliza un snapshot válido y conserva su secuencia', () => {
    const snapshot = createInitialSnapshot('dark');
    snapshot.sequence = 3;
    snapshot.exercises[allExerciseIds[0]] = {
      ...snapshot.exercises[allExerciseIds[0]],
      attempts: 1,
      resolved: true,
      resolvedOnFirstAttempt: true
    };

    const normalized = normalizeSnapshot(snapshot);

    expect(normalized).not.toBeNull();
    expect(normalized?.themeMode).toBe('dark');
    expect(normalized?.sequence).toBe(3);
  });

  it('rechaza progreso inconsistente', () => {
    const exercises = buildExerciseProgressMap(allExerciseIds);
    exercises[allExerciseIds[0]] = {
      id: allExerciseIds[0],
      attempts: 1,
      incorrectAttempts: 1,
      resolved: true,
      resolvedOnFirstAttempt: true
    };

    const normalized = normalizeSnapshot({
      version: '2',
      themeMode: 'light',
      seed: 'x',
      sequence: 1,
      integrityStatus: 'ready',
      integrityMessage: null,
      exercises,
      updatedAt: new Date().toISOString()
    });

    expect(normalized).toBeNull();
  });

  it('genera un bloqueo legible para la interfaz', () => {
    const locked = createLockedSnapshot('light', INTEGRITY_MESSAGES.rollback, 5);

    expect(locked.integrityStatus).toBe('locked');
    expect(locked.integrityMessage).toBe(INTEGRITY_MESSAGES.rollback);
    expect(locked.sequence).toBe(5);
  });

  it('serializa de forma estable aunque cambie el orden de las claves', () => {
    const left = stableStringify({ b: 2, a: 1, nested: { d: 4, c: 3 } });
    const right = stableStringify({ nested: { c: 3, d: 4 }, a: 1, b: 2 });

    expect(left).toBe(right);
  });
});
