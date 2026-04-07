import { describe, expect, it } from 'vitest';
import type { EvaluationSnapshot } from '../src/data';
import { allExerciseIds, matchItems } from '../src/data';
import { getActiveSection } from '../src/features/evaluation/selectors';
import { buildExerciseProgressMap, calculateMetrics, recordExerciseAttempt } from '../src/features/evaluation/scoring';

function createSnapshot(): EvaluationSnapshot {
  return {
    version: '2',
    themeMode: 'light',
    seed: 'test-seed',
    sequence: 0,
    integrityStatus: 'ready',
    integrityMessage: null,
    exercises: buildExerciseProgressMap(allExerciseIds),
    updatedAt: new Date().toISOString()
  };
}

describe('Puntaje y avance', () => {
  it('suma el avance de un ejercicio correcto al primer intento', () => {
    const snapshot = recordExerciseAttempt(createSnapshot(), matchItems[0].id, true);
    const metrics = calculateMetrics(snapshot);

    expect(metrics.resolvedCount).toBe(1);
    expect(metrics.firstAttemptCorrectCount).toBe(1);
    expect(metrics.incorrectAttempts).toBe(0);
    expect(metrics.totalAttempts).toBe(1);
    expect(metrics.scorePoints).toBe(1);
    expect(metrics.scorePercent).toBe(3);
    expect(snapshot.sequence).toBe(1);
  });

  it('descuenta medio punto por cada intento fallido aunque luego se corrija', () => {
    const withError = recordExerciseAttempt(createSnapshot(), matchItems[0].id, false);
    const resolvedLater = recordExerciseAttempt(withError, matchItems[0].id, true);
    const metrics = calculateMetrics(resolvedLater);

    expect(metrics.resolvedCount).toBe(1);
    expect(metrics.firstAttemptCorrectCount).toBe(0);
    expect(metrics.incorrectAttempts).toBe(1);
    expect(metrics.totalAttempts).toBe(2);
    expect(metrics.scorePoints).toBe(0.5);
    expect(metrics.scorePercent).toBe(2);
    expect(resolvedLater.sequence).toBe(2);
  });

  it('no deja que el resultado baje de 0', () => {
    let snapshot = createSnapshot();

    snapshot = recordExerciseAttempt(snapshot, matchItems[0].id, false);
    snapshot = recordExerciseAttempt(snapshot, matchItems[1].id, false);
    snapshot = recordExerciseAttempt(snapshot, matchItems[2].id, false);

    expect(calculateMetrics(snapshot).scorePercent).toBe(0);
  });

  it('mantiene la navegación secuencial por actividad', () => {
    let snapshot = createSnapshot();

    expect(getActiveSection(snapshot)).toBe('match');

    for (const item of matchItems) {
      snapshot = recordExerciseAttempt(snapshot, item.id, true);
    }

    expect(getActiveSection(snapshot)).toBe('mcq');
  });

  it('bloquea nuevos intentos cuando la sesión fue invalidada', () => {
    const lockedSnapshot: EvaluationSnapshot = {
      ...createSnapshot(),
      integrityStatus: 'locked',
      integrityMessage: 'Sesión bloqueada'
    };

    const result = recordExerciseAttempt(lockedSnapshot, matchItems[0].id, true);

    expect(result).toEqual(lockedSnapshot);
  });
});
