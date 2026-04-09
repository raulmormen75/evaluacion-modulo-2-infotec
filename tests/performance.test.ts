import { describe, expect, it } from 'vitest';
import { allExercises } from '../src/data';
import { createInitialSnapshot } from '../src/features/evaluation/integrity';
import { getPerformanceFeedback } from '../src/features/evaluation/performance';
import { calculateMetrics } from '../src/features/evaluation/scoring';

function createResolvedSnapshot(incorrectAttemptsByExercise: Record<string, number> = {}) {
  const snapshot = createInitialSnapshot();

  for (const exercise of allExercises) {
    const incorrectAttempts = incorrectAttemptsByExercise[exercise.id] ?? 0;
    snapshot.exercises[exercise.id] = {
      id: exercise.id,
      attempts: incorrectAttempts + 1,
      incorrectAttempts,
      resolved: true,
      resolvedOnFirstAttempt: incorrectAttempts === 0
    };
  }

  snapshot.sequence = Object.values(snapshot.exercises).reduce((total, exercise) => total + exercise.attempts, 0);

  return snapshot;
}

describe('Retroalimentación de desempeño', () => {
  it('omite el refuerzo cuando el alumno cierra con 100 %', () => {
    const snapshot = createResolvedSnapshot();
    const feedback = getPerformanceFeedback(snapshot, calculateMetrics(snapshot));

    expect(feedback.badge).toBe('Resultado perfecto');
    expect(feedback.hasReinforcement).toBe(false);
    expect(feedback.opportunity).toBeNull();
    expect(feedback.reinforcementThemes).toHaveLength(0);
    expect(feedback.reinforcementSituations).toHaveLength(0);
  });

  it('mantiene refuerzo puntual cuando el resultado es alto pero no perfecto', () => {
    const snapshot = createResolvedSnapshot({
      'mcq-t2-2': 3
    });
    const feedback = getPerformanceFeedback(snapshot, calculateMetrics(snapshot));

    expect(feedback.tone).toBe('success');
    expect(feedback.badge).toBe('Logro sólido');
    expect(feedback.hasReinforcement).toBe(true);
    expect(feedback.reinforcementThemes[0]).toContain('Tema 2. Blockchain y telecom');
    expect(feedback.reinforcementThemes[0]).toContain('prioridad alta');
    expect(feedback.reinforcementThemes[0]).toContain('identidad digital, resguardo de datos y controles de acceso');
    expect(feedback.reinforcementSituations[0]).toContain('Blockchain para identidad digital');
    expect(feedback.opportunity).toContain('Tema 2. Blockchain y telecom');
  });

  it('muestra temas y situaciones concretas en un resultado de 80 %', () => {
    const snapshot = createResolvedSnapshot({
      'mcq-t2-2': 4,
      'mcq-t4-1': 4,
      'mcq-t5-2': 4
    });
    const feedback = getPerformanceFeedback(snapshot, calculateMetrics(snapshot));

    expect(feedback.tone).toBe('progress');
    expect(feedback.badge).toBe('Buen avance');
    expect(feedback.hasReinforcement).toBe(true);
    expect(feedback.opportunity).toContain('varios temas');
    expect(feedback.reinforcementThemes).toEqual([
      'Tema 2. Blockchain y telecom: identidad digital, resguardo de datos y controles de acceso (prioridad alta, 4 fallos)',
      'Tema 4. Economía colaborativa: tarifas, reputaciones y reglas centrales del servicio (prioridad alta, 4 fallos)',
      'Tema 5. Competencia digital: portabilidad de datos, costos de cambio y encerramiento del usuario (prioridad alta, 4 fallos)'
    ]);
    expect(feedback.reinforcementSituations).toEqual([
      'Blockchain para identidad digital y resguardo de datos sensibles (4 fallos)',
      'Plataformas de transporte o reparto que fijan tarifas, reputaciones y acceso (4 fallos)',
      'Portabilidad de datos y riesgo de encerramiento del usuario (4 fallos)'
    ]);
  });

  it('usa el nivel de apoyo cuando el resultado queda debajo de 70 y conserva el detalle de refuerzo', () => {
    const snapshot = createResolvedSnapshot({
      'mcq-t1-2': 3,
      'mcq-t2-2': 4,
      'match-t3-1': 4,
      'swipe-t4-1': 4,
      'swipe-t5-2': 4
    });
    const feedback = getPerformanceFeedback(snapshot, calculateMetrics(snapshot));

    expect(feedback.tone).toBe('support');
    expect(feedback.badge).toBe('Refuerzo necesario');
    expect(feedback.hasReinforcement).toBe(true);
    expect(feedback.opportunity).toContain('varios temas');
    expect(feedback.reinforcementThemes[0]).toContain('4 fallos');
    expect(feedback.reinforcementSituations[0]).toContain('4 fallos');
  });
});
