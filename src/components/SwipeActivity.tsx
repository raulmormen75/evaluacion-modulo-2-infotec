import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { getThemeById, type EvaluationSnapshot } from '../data';
import { getCurrentSwipeIndex, getCurrentSwipeItem, getCurrentThemeProgressForSwipe } from '../features/evaluation/selectors';

interface SwipeActivityProps {
  snapshot: EvaluationSnapshot;
  onRecordAttempt: (exerciseId: string, wasCorrect: boolean) => void;
}

interface FeedbackState {
  tone: 'success' | 'error';
  message: string;
}

const THRESHOLD = 110;
const MAX_DRAG = 170;

export function SwipeActivity({ snapshot, onRecordAttempt }: SwipeActivityProps) {
  const item = getCurrentSwipeItem(snapshot);
  const statementIndex = getCurrentSwipeIndex(snapshot);
  const themeProgress = getCurrentThemeProgressForSwipe(snapshot);
  const theme = getThemeById(themeProgress.themeId);
  const [dragX, setDragX] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setDragX(0);
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

  function finishAttempt(answer: boolean) {
    if (isLocked) {
      return;
    }

    const isCorrect = currentItem.correctAnswer === answer;
    const targetX = answer ? MAX_DRAG : -MAX_DRAG;

    if (isCorrect) {
      setIsLocked(true);
      setDragX(targetX);
      setFeedback({
        tone: 'success',
        message: '¡MUY BIEN!'
      });
      timerRef.current = window.setTimeout(() => {
        onRecordAttempt(currentItem.id, true);
      }, 1200);
      return;
    }

    onRecordAttempt(currentItem.id, false);
    setIsLocked(true);
    setDragX(targetX * 0.7);
    setFeedback({
      tone: 'error',
      message: '¡INCORRECTO!'
    });
    timerRef.current = window.setTimeout(() => {
      setDragX(0);
      setFeedback(null);
      setIsLocked(false);
    }, 1800);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (isLocked) {
      return;
    }

    isDraggingRef.current = true;
    startXRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current || isLocked) {
      return;
    }

    const delta = event.clientX - startXRef.current;
    setDragX(Math.max(Math.min(delta, MAX_DRAG), -MAX_DRAG));
  }

  function handlePointerEnd() {
    if (!isDraggingRef.current || isLocked) {
      return;
    }

    isDraggingRef.current = false;

    if (dragX >= THRESHOLD) {
      finishAttempt(true);
      return;
    }

    if (dragX <= -THRESHOLD) {
      finishAttempt(false);
      return;
    }

    setDragX(0);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      finishAttempt(true);
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      finishAttempt(false);
    }
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
          <div className="progress-chip">Total: {statementIndex + 1} / 25</div>
        </div>
      </div>

      <div className="swipe-stage">
        <p className="swipe-helper">Desliza a la izquierda si es falso y a la derecha si es verdadero.</p>
        <p className="swipe-helper">También puedes usar las flechas del teclado.</p>

        <div className="swipe-feedback" aria-live="polite">
          {feedback?.message ?? 'Un enunciado a la vez.'}
        </div>

        <div
          className="swipe-card"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          style={{ '--drag-x': `${dragX}px` } as CSSProperties}
        >
          <span className="swipe-side swipe-false">Falso</span>
          <p>{currentItem.statement}</p>
          <span className="swipe-side swipe-true">Verdadero</span>
        </div>
      </div>
    </div>
  );
}
