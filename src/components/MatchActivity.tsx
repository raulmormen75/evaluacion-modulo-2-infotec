import { useEffect, useRef, useState } from 'react';
import { getMatchItemsByBatch, getThemeById, matchBatches, type EvaluationSnapshot } from '../data';
import { getCurrentMatchBatch, getMatchResolvedCountByBatch } from '../features/evaluation/selectors';
import { seededShuffle } from '../utils/random';

interface MatchActivityProps {
  snapshot: EvaluationSnapshot;
  onRecordAttempt: (exerciseId: string, wasCorrect: boolean) => void;
}

interface FeedbackState {
  tone: 'success' | 'error';
  message: string;
}

export function MatchActivity({ snapshot, onRecordAttempt }: MatchActivityProps) {
  const batch = getCurrentMatchBatch(snapshot);
  const items = getMatchItemsByBatch(batch);
  const resolvedCount = getMatchResolvedCountByBatch(snapshot, batch);
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timerRef = useRef<number | null>(null);

  const conceptOrder = seededShuffle(items, `${snapshot.seed}-match-concepts-${batch}`);
  const definitionOrder = seededShuffle(items, `${snapshot.seed}-match-definitions-${batch}`);
  const resolvedDefinitionIds = new Set(
    items.filter((item) => snapshot.exercises[item.id]?.resolved).map((item) => item.definitionId)
  );
  const themeList = items.map((item) => getThemeById(item.themeId).shortTitle).join(' · ');

  useEffect(() => {
    setSelectedConceptId(null);
    setFeedback(null);
    setIsSubmitting(false);
  }, [batch]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  function scheduleCleanup(callback?: () => void) {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setFeedback(null);
      setIsSubmitting(false);
      callback?.();
    }, 1600);
  }

  function handleDefinitionSelect(definitionId: string) {
    if (isSubmitting) {
      return;
    }

    if (!selectedConceptId) {
      setFeedback({
        tone: 'error',
        message: 'Primero elige un concepto.'
      });
      scheduleCleanup();
      return;
    }

    const conceptItem = items.find((item) => item.id === selectedConceptId);

    if (!conceptItem) {
      return;
    }

    if (conceptItem.correctAnswer === definitionId) {
      setIsSubmitting(true);
      setFeedback({
        tone: 'success',
        message: 'Relación correcta. Seguimos.'
      });
      scheduleCleanup(() => {
        onRecordAttempt(conceptItem.id, true);
        setSelectedConceptId(null);
      });
      return;
    }

    onRecordAttempt(conceptItem.id, false);
    setSelectedConceptId(null);
    setFeedback({
      tone: 'error',
      message: 'No coincide. Intenta de nuevo.'
    });
    scheduleCleanup();
  }

  return (
    <div className="activity-body">
      <div className="activity-summary">
        <div>
          <p className="mini-label">Bloque {batch} de {matchBatches.length}</p>
          <h3>Relaciona 5 conceptos del módulo</h3>
          <p>Completa este bloque para abrir el siguiente. Cada bloque reúne un concepto por tema.</p>
          <p className="summary-note">Temas incluidos: {themeList}</p>
        </div>
        <div className="progress-chip" aria-label={`Avance del bloque ${resolvedCount} de ${items.length}`}>
          {resolvedCount} / {items.length} correctas
        </div>
      </div>

      <div className="match-grid" role="group" aria-label={`Relacionar conceptos del bloque ${batch}`}>
        <div className="match-column">
          <h4>Conceptos</h4>
          {conceptOrder.map((item) => {
            const progress = snapshot.exercises[item.id];
            const isSelected = selectedConceptId === item.id;
            const theme = getThemeById(item.themeId);

            return (
              <button
                key={item.id}
                type="button"
                className={`match-button ${progress?.resolved ? 'is-matched' : ''} ${isSelected ? 'is-selected' : ''}`}
                disabled={progress?.resolved || isSubmitting}
                onClick={() => setSelectedConceptId(item.id)}
              >
                <span className="match-button-copy">
                  <small>{theme.label}</small>
                  <strong>{item.concept}</strong>
                </span>
                {progress?.resolved ? <strong>Listo</strong> : null}
              </button>
            );
          })}
        </div>

        <div className="match-column">
          <h4>Significados</h4>
          {definitionOrder.map((item) => {
            const isResolved = resolvedDefinitionIds.has(item.definitionId);

            return (
              <button
                key={item.definitionId}
                type="button"
                className={`match-button match-definition ${isResolved ? 'is-matched' : ''}`}
                disabled={isResolved || isSubmitting}
                onClick={() => handleDefinitionSelect(item.definitionId)}
              >
                <span>{item.definition}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className={`feedback-message ${feedback ? `feedback-${feedback.tone}` : ''}`} aria-live="polite">
        {feedback?.message ?? 'Toca un concepto y después su significado.'}
      </p>
    </div>
  );
}
