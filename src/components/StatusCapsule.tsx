import type { EvaluationMetrics } from '../data';

interface StatusCapsuleProps {
  metrics: EvaluationMetrics;
  isLocked?: boolean;
}

function getStatus(metrics: EvaluationMetrics, isLocked: boolean) {
  if (isLocked) {
    return {
      tone: 'blocked',
      label: 'Sesión protegida',
      note: 'Se requiere revisar la continuidad del avance.'
    };
  }

  if (metrics.resolvedCount === 0) {
    return {
      tone: 'ready',
      label: 'Lista para iniciar',
      note: 'La actividad de apoyo está lista para comenzar.'
    };
  }

  if (metrics.scorePercent >= 90) {
    return {
      tone: 'success',
      label: 'Repaso sólido',
      note: 'Has construido un muy buen dominio del módulo.'
    };
  }

  return {
    tone: 'progress',
    label: 'Avance en curso',
    note: 'Continúa practicando para reforzar los temas del módulo.'
  };
}

export function StatusCapsule({ metrics, isLocked = false }: StatusCapsuleProps) {
  const status = getStatus(metrics, isLocked);

  return (
    <aside className={`status-capsule status-${status.tone}`} aria-live="polite">
      <div className="status-header">
        <div className="status-heading">
          <p className="status-label">Estado del repaso</p>
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
          <dt>Intentos adicionales</dt>
          <dd>{metrics.incorrectAttempts}</dd>
        </div>
        <div>
          <dt>Desempeño actual</dt>
          <dd>{metrics.scorePercent}%</dd>
        </div>
      </dl>
    </aside>
  );
}
