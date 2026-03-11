import { useEffect, useRef, useState } from 'react';
import { getMatchItemsByTheme, getThemeById, type EvaluationSnapshot } from '../data';
import { getMatchResolvedCountByTheme, getMatchUnlockedTheme } from '../features/evaluation/selectors';
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
  const themeId = getMatchUnlockedTheme(snapshot);
  const theme = getThemeById(themeId);
  const items = getMatchItemsByTheme(themeId);
  const resolvedCount = getMatchResolvedCountByTheme(snapshot, themeId);
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timerRef = useRef<number | null>(null);

  const conceptOrder = seededShuffle(items, `${snapshot.seed}-match-concepts-${themeId}`);
  const definitionOrder = seededShuffle(items, `${snapshot.seed}-match-definitions-${themeId}`);
  const resolvedDefinitionIds = new Set(
    items.filter((item) => snapshot.exercises[item.id]?.resolved).map((item) => item.definitionId)
  );

  useEffect(() => {
    setSelectedConceptId(null);
    setFeedback(null);
    setIsSubmitting(false);
  }, [themeId]);

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
    }, 650);
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
          <p className="mini-label">{theme.label}</p>
          <h3>{theme.title}</h3>
          <p>{theme.description}</p>
        </div>
        <div className="progress-chip" aria-label={`Avance del tema ${resolvedCount} de 5`}>
          {resolvedCount} / 5 correctas
        </div>
      </div>

      <div className="match-grid" role="group" aria-label={`Relacionar conceptos del ${theme.title}`}>
        <div className="match-column">
          <h4>Conceptos</h4>
          {conceptOrder.map((item) => {
            const progress = snapshot.exercises[item.id];
            const isSelected = selectedConceptId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`match-button ${progress?.resolved ? 'is-matched' : ''} ${isSelected ? 'is-selected' : ''}`}
                disabled={progress?.resolved || isSubmitting}
                onClick={() => setSelectedConceptId(item.id)}
              >
                <span>{item.concept}</span>
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
