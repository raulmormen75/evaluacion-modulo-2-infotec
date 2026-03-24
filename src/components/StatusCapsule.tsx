import type { EvaluationMetrics } from '../data';

interface StatusCapsuleProps {
  metrics: EvaluationMetrics;
  isLocked?: boolean;
}

function getStatus(metrics: EvaluationMetrics, isLocked: boolean) {
  if (isLocked) {
    return {
      tone: 'blocked',
      label: 'Sesión bloqueada',
      note: 'Se requiere revisión de integridad.'
    };
  }

  if (metrics.resolvedCount === 0) {
    return {
      tone: 'ready',
      label: 'Lista para iniciar',
      note: 'La evaluación está lista para comenzar.'
    };
  }

  if (metrics.scorePercent <= 79) {
    return {
      tone: 'progress',
      label: 'Avance en curso',
      note: 'Continúa con la ruta de actividades.'
    };
  }

  return {
    tone: 'success',
    label: 'Buen avance',
    note: 'Mantén el ritmo para cerrar la evidencia.'
  };
}

export function StatusCapsule({ metrics, isLocked = false }: StatusCapsuleProps) {
  const status = getStatus(metrics, isLocked);

  return (
    <aside className={`status-capsule status-${status.tone}`} aria-live="polite">
      <div className="status-header">
        <div className="status-heading">
          <p className="status-label">Estado de la evaluación</p>
          <strong>{status.label}</strong>
        </div>
        <span className="status-indicator" aria-hidden="true" />
      </div>

      <p className="status-note">{status.note}</p>

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
