import { describe, expect, it } from 'vitest';
import type { EvaluationSnapshot } from '../src/data';
import { allExerciseIds, swipeItems } from '../src/data';
import { getCurrentSwipeItem } from '../src/features/evaluation/selectors';
import { buildExerciseProgressMap } from '../src/features/evaluation/scoring';
import { seededShuffle } from '../src/utils/random';

function createSnapshot(seed = 'seed-prueba'): EvaluationSnapshot {
  return {
    version: '2',
    themeMode: 'light',
    seed,
    sequence: 0,
    integrityStatus: 'ready',
    integrityMessage: null,
    exercises: buildExerciseProgressMap(allExerciseIds),
    updatedAt: new Date().toISOString()
  };
}

describe('Orden de deslizamiento', () => {
  it('usa una mezcla estable por sesión para evitar patrones obvios', () => {
    const snapshot = createSnapshot();
    const orderedItems = seededShuffle(swipeItems, `${snapshot.seed}-swipe-order`);

    expect(getCurrentSwipeItem(snapshot)?.id).toBe(orderedItems[0].id);
  });
});
