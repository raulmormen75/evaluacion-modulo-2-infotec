import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type MutableRefObject } from 'react';
import { getMatchItemsByBatch, getThemeById, matchBatches, type EvaluationSnapshot, type MatchItem } from '../data';
import { getCurrentMatchBatch } from '../features/evaluation/selectors';
import { seededShuffle } from '../utils/random';

interface MatchActivityProps {
  snapshot: EvaluationSnapshot;
  onRecordAttempt: (exerciseId: string, wasCorrect: boolean) => void;
}

interface FeedbackState {
  tone: 'success' | 'error';
  message: string;
}

interface MatchPairState {
  conceptId: string;
  definitionId: string;
}

interface MatchConnection {
  conceptId: string;
  definitionId: string;
  path: string;
}

interface MatchBoardMetrics {
  width: number;
  height: number;
}

function buildConnectionPath(startRect: DOMRect, endRect: DOMRect, containerRect: DOMRect) {
  const startX = startRect.right - containerRect.left;
  const startY = startRect.top - containerRect.top + startRect.height / 2;
  const endX = endRect.left - containerRect.left;
  const endY = endRect.top - containerRect.top + endRect.height / 2;
  const controlOffset = Math.max(68, Math.abs(endX - startX) * 0.32);

  return `M ${startX} ${startY} C ${startX + controlOffset} ${startY}, ${endX - controlOffset} ${endY}, ${endX} ${endY}`;
}

export function MatchActivity({ snapshot, onRecordAttempt }: MatchActivityProps) {
  const batch = getCurrentMatchBatch(snapshot);
  const items = getMatchItemsByBatch(batch);
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorConceptId, setErrorConceptId] = useState<string | null>(null);
  const [freshMatch, setFreshMatch] = useState<MatchPairState | null>(null);
  const [pendingMatchId, setPendingMatchId] = useState<string | null>(null);
  const [connections, setConnections] = useState<MatchConnection[]>([]);
  const [boardMetrics, setBoardMetrics] = useState<MatchBoardMetrics>({ width: 0, height: 0 });
  const feedbackTimerRef = useRef<number | null>(null);
  const visualTimerRef = useRef<number | null>(null);
  const measureFrameRef = useRef<number | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const conceptButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const definitionButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const conceptOrder = useMemo(
    () => seededShuffle(items, `${snapshot.seed}-match-concepts-${batch}`),
    [items, snapshot.seed, batch]
  );
  const definitionOrder = useMemo(
    () => seededShuffle(items, `${snapshot.seed}-match-definitions-${batch}`),
    [items, snapshot.seed, batch]
  );
  const pendingMatchItem = useMemo(
    () => items.find((item) => item.id === pendingMatchId) ?? null,
    [items, pendingMatchId]
  );
  const resolvedItems = useMemo(() => {
    const alreadyResolved = items.filter((item) => snapshot.exercises[item.id]?.resolved);

    if (!pendingMatchItem || alreadyResolved.some((item) => item.id === pendingMatchItem.id)) {
      return alreadyResolved;
    }

    return [...alreadyResolved, pendingMatchItem];
  }, [items, pendingMatchItem, snapshot.exercises]);
  const resolvedConceptIds = useMemo(() => new Set(resolvedItems.map((item) => item.id)), [resolvedItems]);
  const resolvedDefinitionIds = useMemo(() => new Set(resolvedItems.map((item) => item.definitionId)), [resolvedItems]);
  const resolvedCount = resolvedItems.length;
  const themeList = useMemo(
    () => items.map((item) => getThemeById(item.themeId).shortTitle).join(' · '),
    [items]
  );

  const clearTimer = useCallback((timerRef: MutableRefObject<number | null>) => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const clearScheduledState = useCallback(() => {
    clearTimer(feedbackTimerRef);
    clearTimer(visualTimerRef);

    if (measureFrameRef.current) {
      window.cancelAnimationFrame(measureFrameRef.current);
      measureFrameRef.current = null;
    }
  }, [clearTimer]);

  useEffect(() => {
    clearScheduledState();
    setSelectedConceptId(null);
    setFeedback(null);
    setIsSubmitting(false);
    setErrorConceptId(null);
    setFreshMatch(null);
    setPendingMatchId(null);
    setConnections([]);
    setBoardMetrics({ width: 0, height: 0 });
  }, [batch, clearScheduledState]);

  useEffect(() => {
    return () => {
      clearScheduledState();
    };
  }, [clearScheduledState]);

  const measureConnections = useCallback(() => {
    const boardElement = boardRef.current;

    if (!boardElement) {
      setConnections([]);
      setBoardMetrics({ width: 0, height: 0 });
      return;
    }

    const boardRect = boardElement.getBoundingClientRect();
    const nextConnections = resolvedItems.flatMap((item) => {
      const conceptButton = conceptButtonRefs.current[item.id];
      const definitionButton = definitionButtonRefs.current[item.definitionId];

      if (!conceptButton || !definitionButton) {
        return [];
      }

      return [
        {
          conceptId: item.id,
          definitionId: item.definitionId,
          path: buildConnectionPath(
            conceptButton.getBoundingClientRect(),
            definitionButton.getBoundingClientRect(),
            boardRect
          )
        }
      ];
    });

    setConnections(nextConnections);
    setBoardMetrics({
      width: boardRect.width,
      height: boardRect.height
    });
  }, [resolvedItems]);

  useLayoutEffect(() => {
    function requestMeasure() {
      if (measureFrameRef.current) {
        window.cancelAnimationFrame(measureFrameRef.current);
      }

      measureFrameRef.current = window.requestAnimationFrame(() => {
        measureConnections();
      });
    }

    requestMeasure();
    window.addEventListener('resize', requestMeasure);

    let resizeObserver: ResizeObserver | null = null;

    if ('ResizeObserver' in window && boardRef.current) {
      resizeObserver = new ResizeObserver(requestMeasure);
      resizeObserver.observe(boardRef.current);
    }

    return () => {
      window.removeEventListener('resize', requestMeasure);
      resizeObserver?.disconnect();

      if (measureFrameRef.current) {
        window.cancelAnimationFrame(measureFrameRef.current);
        measureFrameRef.current = null;
      }
    };
  }, [measureConnections]);

  function scheduleFeedbackCleanup(delay: number) {
    clearTimer(feedbackTimerRef);
    feedbackTimerRef.current = window.setTimeout(() => {
      setFeedback(null);
    }, delay);
  }

  function scheduleVisualCleanup(callback: () => void, delay: number) {
    clearTimer(visualTimerRef);
    visualTimerRef.current = window.setTimeout(callback, delay);
  }

  function handleSuccessfulMatch(conceptItem: MatchItem) {
    setIsSubmitting(true);
    setErrorConceptId(null);
    setPendingMatchId(conceptItem.id);
    setFreshMatch({
      conceptId: conceptItem.id,
      definitionId: conceptItem.definitionId
    });
    setSelectedConceptId(null);
    setFeedback({
      tone: 'success',
      message: 'Relación correcta. Seguimos con la siguiente.'
    });
    scheduleFeedbackCleanup(1500);
    scheduleVisualCleanup(() => {
      onRecordAttempt(conceptItem.id, true);
      setPendingMatchId(null);
      setFreshMatch(null);
      setIsSubmitting(false);
    }, 1100);
  }

  function handleIncorrectMatch(conceptItem: MatchItem) {
    onRecordAttempt(conceptItem.id, false);
    setSelectedConceptId(null);
    setPendingMatchId(null);
    setFreshMatch(null);
    setErrorConceptId(conceptItem.id);
    setIsSubmitting(true);
    setFeedback({
      tone: 'error',
      message: 'No coincide. Revisa ese concepto e inténtalo otra vez.'
    });
    scheduleFeedbackCleanup(1550);
    scheduleVisualCleanup(() => {
      setErrorConceptId(null);
      setIsSubmitting(false);
    }, 780);
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
      scheduleFeedbackCleanup(1300);
      return;
    }

    const conceptItem = items.find((item) => item.id === selectedConceptId);

    if (!conceptItem) {
      return;
    }

    if (conceptItem.correctAnswer === definitionId) {
      handleSuccessfulMatch(conceptItem);
      return;
    }

    handleIncorrectMatch(conceptItem);
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

      <div className="match-board">
        <div className="match-board-inner" ref={boardRef}>
          <svg
            className="match-connections"
            viewBox={`0 0 ${Math.max(boardMetrics.width, 1)} ${Math.max(boardMetrics.height, 1)}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {connections.map((connection) => {
              const isFreshConnection =
                freshMatch?.conceptId === connection.conceptId && freshMatch.definitionId === connection.definitionId;

              return (
                <path
                  key={`${connection.conceptId}-${connection.definitionId}`}
                  className={`match-connection-path ${isFreshConnection ? 'is-just-matched' : ''}`}
                  d={connection.path}
                  pathLength={1}
                />
              );
            })}
          </svg>

          <div className="match-grid" role="group" aria-label={`Relacionar conceptos del bloque ${batch}`}>
            <div className="match-column">
              <h4>Conceptos</h4>
              {conceptOrder.map((item) => {
                const isMatched = resolvedConceptIds.has(item.id);
                const isSelected = selectedConceptId === item.id;
                const isError = errorConceptId === item.id;
                const isFresh = freshMatch?.conceptId === item.id;
                const theme = getThemeById(item.themeId);

                return (
                  <button
                    key={item.id}
                    ref={(node) => {
                      conceptButtonRefs.current[item.id] = node;
                    }}
                    type="button"
                    className={`match-button match-concept ${isMatched ? 'is-matched' : ''} ${isSelected ? 'is-selected' : ''} ${isError ? 'is-error' : ''} ${isFresh ? 'is-just-matched' : ''}`}
                    disabled={isMatched || isSubmitting}
                    aria-pressed={isSelected}
                    onClick={() => {
                      setFeedback(null);
                      setErrorConceptId(null);
                      setSelectedConceptId(item.id);
                    }}
                  >
                    <span className="match-button-copy">
                      <small>{theme.label}</small>
                      <strong>{item.concept}</strong>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="match-column">
              <h4>Significados</h4>
              {definitionOrder.map((item) => {
                const isResolved = resolvedDefinitionIds.has(item.definitionId);
                const isFresh = freshMatch?.definitionId === item.definitionId;

                return (
                  <button
                    key={item.definitionId}
                    ref={(node) => {
                      definitionButtonRefs.current[item.definitionId] = node;
                    }}
                    type="button"
                    className={`match-button match-definition ${isResolved ? 'is-matched' : ''} ${isFresh ? 'is-just-matched' : ''}`}
                    disabled={isResolved || isSubmitting}
                    onClick={() => handleDefinitionSelect(item.definitionId)}
                  >
                    <span>{item.definition}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <p className={`feedback-message ${feedback ? `feedback-${feedback.tone}` : ''}`} aria-live="polite">
        {feedback?.message ?? 'Toca un concepto de la izquierda y después su significado.'}
      </p>
    </div>
  );
}
