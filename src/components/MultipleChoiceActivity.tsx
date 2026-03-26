import { useEffect, useRef, useState } from 'react';
import { getThemeById, type EvaluationSnapshot } from '../data';
import {
  getCurrentMultipleChoiceIndex,
  getCurrentMultipleChoiceItem,
  getCurrentThemeProgressForMcq
} from '../features/evaluation/selectors';

interface MultipleChoiceActivityProps {
  snapshot: EvaluationSnapshot;
  onRecordAttempt: (exerciseId: string, wasCorrect: boolean) => void;
}

interface FeedbackState {
  tone: 'success' | 'error';
  message: string;
}

export function MultipleChoiceActivity({ snapshot, onRecordAttempt }: MultipleChoiceActivityProps) {
  const item = getCurrentMultipleChoiceItem(snapshot);
  const questionIndex = getCurrentMultipleChoiceIndex(snapshot);
  const themeProgress = getCurrentThemeProgressForMcq(snapshot);
  const theme = getThemeById(themeProgress.themeId);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setFeedback(null);
    setIsLocked(false);
  }, [item?.id]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (!item) {
    return <p className="feedback-message">La actividad ya quedó completada.</p>;
  }

  const currentItem = item;

  function handleAnswer(optionId: string) {
    if (isLocked) {
      return;
    }

    if (optionId === currentItem.correctAnswer) {
      setIsLocked(true);
      setFeedback({
        tone: 'success',
        message: 'Respuesta correcta. Pasamos a la siguiente.'
      });
      timerRef.current = window.setTimeout(() => {
        onRecordAttempt(currentItem.id, true);
      }, 1200);
      return;
    }

    onRecordAttempt(currentItem.id, false);
    setFeedback({
      tone: 'error',
      message: 'No es correcta. Intenta otra opción.'
    });
    timerRef.current = window.setTimeout(() => {
      setFeedback(null);
    }, 1800);
  }

  return (
    <div className="activity-body">
      <div className="activity-summary">
        <div>
          <p className="mini-label">{theme.label}</p>
          <h3>{theme.title}</h3>
          <p>{theme.description}</p>
        </div>
        <div className="progress-stack">
          <div className="progress-chip">Tema: {themeProgress.resolved} / {themeProgress.total}</div>
        <div className="progress-chip">Total: {questionIndex + 1} / 50</div>
      </div>
      </div>

      <article className="question-card">
        <p className="mini-label">Pregunta actual</p>
        <h4>{currentItem.question}</h4>

        <ol className="option-list">
          {currentItem.options.map((option) => (
            <li key={option.id}>
              <button type="button" className="option-button" disabled={isLocked} onClick={() => handleAnswer(option.id)}>
                <span className="option-letter">{option.id})</span>
                <span>{option.text}</span>
              </button>
            </li>
          ))}
        </ol>
      </article>

      <p className={`feedback-message ${feedback ? `feedback-${feedback.tone}` : ''}`} aria-live="polite">
        {feedback?.message ?? 'Selecciona una opción. Solo avanzarás cuando sea correcta.'}
      </p>
    </div>
  );
}
