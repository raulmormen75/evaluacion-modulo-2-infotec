import { totalExercises, type EvaluationMetrics } from '../../data';

export interface PerformanceFeedback {
  tone: 'success' | 'progress' | 'support';
  badge: string;
  title: string;
  strength: string;
  opportunity: string;
}

function formatCount(value: number, singular: string, plural: string) {
  return `${value} ${value === 1 ? singular : plural}`;
}

export function getPerformanceFeedback(metrics: EvaluationMetrics): PerformanceFeedback {
  const firstAttemptSummary = formatCount(
    metrics.firstAttemptCorrectCount,
    'ejercicio correcto al primer intento',
    'ejercicios correctos al primer intento'
  );
  const incorrectAttemptSummary = formatCount(metrics.incorrectAttempts, 'intento fallido', 'intentos fallidos');

  if (metrics.scorePercent >= 90) {
    return {
      tone: 'success',
      badge: 'Logro sólido',
      title: 'Cerraste el repaso con un dominio muy favorable del módulo.',
      strength: `Tu fortaleza principal está en la precisión: alcanzaste ${metrics.scorePercent} % y resolviste ${firstAttemptSummary}.`,
      opportunity:
        metrics.incorrectAttempts === 0
          ? 'Para conservar este nivel, repasa una vez más los reactivos antes de la actividad práctica y mantén la misma seguridad al responder.'
          : `Tu área de oportunidad está en revisar los reactivos donde acumulaste ${incorrectAttemptSummary}, para sostener esa misma seguridad en todos los temas.`
    };
  }

  if (metrics.scorePercent >= 70) {
    return {
      tone: 'progress',
      badge: 'Buen avance',
      title: 'Tu repaso muestra un avance consistente en el módulo.',
      strength: `Ya construiste una base firme: completaste ${metrics.resolvedCount} de ${totalExercises} ejercicios y lograste ${firstAttemptSummary}.`,
      opportunity:
        metrics.incorrectAttempts === 0
          ? 'Para subir al nivel más alto, conviene repetir el repaso completo y responder con mayor seguridad desde el primer intento.'
          : `Tu área de oportunidad está en los reactivos que generaron ${incorrectAttemptSummary}; conviene repasarlos antes de la actividad práctica para reducir dudas.`
    };
  }

  return {
    tone: 'support',
    badge: 'Refuerzo necesario',
    title: 'Este resultado ya te muestra con claridad dónde concentrar el repaso.',
    strength: `Tu avance actual es útil para estudiar mejor: completaste ${metrics.resolvedCount} de ${totalExercises} ejercicios e identificaste los contenidos que requieren más atención.`,
    opportunity:
      metrics.incorrectAttempts === 0
        ? 'El siguiente paso es repetir el repaso completo para ganar seguridad y elevar tu porcentaje de logro antes de la actividad práctica.'
        : `Tu principal área de oportunidad está en los reactivos con ${incorrectAttemptSummary}; repásalos con calma y vuelve a practicar para fortalecer tu resultado.`
  };
}
