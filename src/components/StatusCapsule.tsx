import type { EvaluationMetrics } from '../data';

interface StatusCapsuleProps {
  metrics: EvaluationMetrics;
  isLocked?: boolean;
}

function getStatus(scorePercent: number, isLocked: boolean) {
  if (isLocked) {
    return {
      emoji: '🔒',
      tone: 'danger',
      label: 'Bloqueada'
    };
  }

  if (scorePercent <= 50) {
    return {
      emoji: '❌',
      tone: 'danger',
      label: 'Atención'
    };
  }

  if (scorePercent <= 79) {
    return {
      emoji: '🟡',
      tone: 'warning',
      label: 'En progreso'
    };
  }

  return {
    emoji: '✅',
    tone: 'success',
    label: 'Buen avance'
  };
}

export function StatusCapsule({ metrics, isLocked = false }: StatusCapsuleProps) {
  const status = getStatus(metrics.scorePercent, isLocked);

  return (
    <aside className={`status-capsule status-${status.tone}`} aria-live="polite">
      <div className="status-header">
        <span className="status-emoji" aria-hidden="true">
          {status.emoji}
        </span>
        <div>
          <p className="status-label">Estado actual</p>
          <strong>{status.label}</strong>
        </div>
      </div>

      <dl className="status-metrics">
        <div>
          <dt>Resueltos</dt>
          <dd>{metrics.resolvedCount} / 100</dd>
        </div>
        <div>
          <dt>Incorrectos acumulados</dt>
          <dd>{metrics.incorrectAttempts}</dd>
        </div>
        <div>
          <dt>Calificación actual</dt>
          <dd>{metrics.scorePercent}%</dd>
        </div>
      </dl>
    </aside>
  );
}
