import { describe, expect, it } from 'vitest';
import type { EvaluationMetrics } from '../src/data';
import { getPerformanceFeedback } from '../src/features/evaluation/performance';

function createMetrics(overrides: Partial<EvaluationMetrics>): EvaluationMetrics {
  return {
    resolvedCount: 30,
    incorrectAttempts: 0,
    firstAttemptCorrectCount: 30,
    totalAttempts: 30,
    scorePoints: 30,
    scorePercent: 100,
    completionPercent: 100,
    ...overrides
  };
}

describe('Retroalimentación de desempeño', () => {
  it('usa el nivel de apoyo cuando el resultado queda debajo de 70', () => {
    const feedback = getPerformanceFeedback(
      createMetrics({
        resolvedCount: 21,
        incorrectAttempts: 6,
        firstAttemptCorrectCount: 14,
        totalAttempts: 27,
        scorePoints: 20.5,
        scorePercent: 69,
        completionPercent: 70
      })
    );

    expect(feedback.tone).toBe('support');
    expect(feedback.badge).toBe('Refuerzo necesario');
    expect(feedback.opportunity).toContain('6 intentos fallidos');
  });

  it('usa el nivel intermedio desde 70 y reconoce el avance construido', () => {
    const feedback = getPerformanceFeedback(
      createMetrics({
        resolvedCount: 24,
        incorrectAttempts: 3,
        firstAttemptCorrectCount: 18,
        totalAttempts: 27,
        scorePoints: 21,
        scorePercent: 70,
        completionPercent: 80
      })
    );

    expect(feedback.tone).toBe('progress');
    expect(feedback.badge).toBe('Buen avance');
    expect(feedback.strength).toContain('24 de 30 ejercicios');
  });

  it('usa el nivel alto a partir de 90 y mantiene una oportunidad de mejora concreta', () => {
    const feedback = getPerformanceFeedback(
      createMetrics({
        resolvedCount: 30,
        incorrectAttempts: 2,
        firstAttemptCorrectCount: 26,
        totalAttempts: 32,
        scorePoints: 29,
        scorePercent: 90,
        completionPercent: 100
      })
    );

    expect(feedback.tone).toBe('success');
    expect(feedback.badge).toBe('Logro sólido');
    expect(feedback.strength).toContain('90 %');
    expect(feedback.opportunity).toContain('2 intentos fallidos');
  });
});
