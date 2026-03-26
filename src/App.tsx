import { useEffect, useState } from 'react';
import { FinalSection } from './components/FinalSection';
import { Header } from './components/Header';
import { MatchActivity } from './components/MatchActivity';
import { MultipleChoiceActivity } from './components/MultipleChoiceActivity';
import { SectionCard } from './components/SectionCard';
import { StatusCapsule } from './components/StatusCapsule';
import { SwipeActivity } from './components/SwipeActivity';
import type { EvaluationSnapshot } from './data';
import { getActiveSection, getResolvedCountByActivity } from './features/evaluation/selectors';
import { calculateMetrics, recordExerciseAttempt } from './features/evaluation/scoring';
import { loadSnapshot, saveSnapshot } from './features/evaluation/storage';

export function App() {
  const [snapshot, setSnapshot] = useState<EvaluationSnapshot | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function initialize() {
      const loadedSnapshot = await loadSnapshot();

      if (!isMounted) {
        return;
      }

      setSnapshot(loadedSnapshot);
      setIsReady(true);
    }

    void initialize();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!snapshot) {
      return;
    }

    document.documentElement.dataset.theme = snapshot.themeMode;
    document.documentElement.style.colorScheme = snapshot.themeMode;

    if (!isReady) {
      return;
    }

    void saveSnapshot(snapshot);
  }, [isReady, snapshot]);

  if (!snapshot) {
    return (
      <div className="app-shell">
        <main className="content-stack">
          <SectionCard
            step="Carga"
            title="Preparando la actividad de apoyo"
            instructions="Estamos recuperando tu avance local antes de mostrar los ejercicios."
            state="active"
          >
            <p className="loading-message">Un momento, por favor.</p>
          </SectionCard>
        </main>
      </div>
    );
  }

  const metrics = calculateMetrics(snapshot);
  const activeSection = getActiveSection(snapshot);
  const matchResolved = getResolvedCountByActivity(snapshot, 'match');
  const mcqResolved = getResolvedCountByActivity(snapshot, 'mcq');
  const swipeResolved = getResolvedCountByActivity(snapshot, 'swipe');
  const isIntegrityLocked = snapshot.integrityStatus === 'locked';

  function handleRecordAttempt(exerciseId: string, wasCorrect: boolean) {
    setSnapshot((previous) => {
      if (!previous || previous.integrityStatus === 'locked') {
        return previous;
      }

      return recordExerciseAttempt(previous, exerciseId, wasCorrect);
    });
  }

  function handleToggleTheme() {
    setSnapshot((previous) => {
      if (!previous) {
        return previous;
      }

      return {
        ...previous,
        themeMode: previous.themeMode === 'light' ? 'dark' : 'light',
        updatedAt: new Date().toISOString()
      };
    });
  }

  return (
    <div className="app-shell">
      <section className="top-shell" aria-label="Orientación de la actividad de apoyo">
        <div className="app-hero-layout">
          <div className="app-main">
            <Header themeMode={snapshot.themeMode} onToggleTheme={handleToggleTheme} />
          </div>

          <aside className="app-sidebar" aria-label="Estado del repaso">
            <StatusCapsule metrics={metrics} isLocked={isIntegrityLocked} />
          </aside>
        </div>

        <nav className={`activity-strip ${isIntegrityLocked ? 'activity-strip-disabled' : ''}`} aria-label="Ruta de práctica y repaso">
          <span
            className={
              activeSection === 'match' ? 'strip-item current' : matchResolved === 25 ? 'strip-item done' : 'strip-item'
            }
          >
            1. Relacionar conceptos
          </span>
          <span
            className={activeSection === 'mcq' ? 'strip-item current' : mcqResolved === 50 ? 'strip-item done' : 'strip-item'}
          >
            2. Opción múltiple
          </span>
          <span
            className={
              activeSection === 'swipe' ? 'strip-item current' : swipeResolved === 25 ? 'strip-item done' : 'strip-item'
            }
          >
            3. Verdadero o falso
          </span>
          <span className={activeSection === 'final' ? 'strip-item current' : 'strip-item'}>4. Resultado de práctica</span>
        </nav>
      </section>

      <main className="content-stack">
        {isIntegrityLocked ? (
          <SectionCard
            step="Seguridad"
            title="Sesión de práctica protegida"
            instructions="Se detectó una alteración del avance o un intento de reinicio fuera del flujo permitido."
            state="locked"
          >
            <div className="security-panel" role="alert">
              <p className="security-message">
                {snapshot.integrityMessage ??
                  'La sesión de práctica se bloqueó para proteger la continuidad del avance en este navegador.'}
              </p>
              <p className="security-note">
                Esta versión no tiene backend. Aun así, la app registra una firma local y control anti-rollback para
                reducir alteraciones del avance en este navegador.
              </p>
            </div>
          </SectionCard>
        ) : (
          <>
            <SectionCard
              step="Actividad 1"
              title="Relacionar conceptos"
              instructions="Trabaja un tema por vez. El siguiente tema se desbloquea cuando completas las 5 relaciones del actual."
              state={matchResolved === 25 ? 'completed' : 'active'}
            >
              {matchResolved === 25 ? (
                <p className="locked-message">Los cinco temas ya quedaron repasados en esta actividad.</p>
              ) : (
                <MatchActivity snapshot={snapshot} onRecordAttempt={handleRecordAttempt} />
              )}
            </SectionCard>

            <SectionCard
              step="Actividad 2"
              title="Opción múltiple"
              instructions="Verás una sola pregunta por vista. Si fallas, vuelves a intentarlo hasta reforzar la respuesta correcta."
              state={matchResolved < 25 ? 'locked' : mcqResolved === 50 ? 'completed' : activeSection === 'mcq' ? 'active' : 'locked'}
            >
              {matchResolved < 25 ? (
                <p className="locked-message">Se desbloquea al completar la Actividad 1.</p>
              ) : mcqResolved === 50 ? (
                <p className="locked-message">Las 50 preguntas de opción múltiple ya quedaron resueltas.</p>
              ) : (
                <MultipleChoiceActivity snapshot={snapshot} onRecordAttempt={handleRecordAttempt} />
              )}
            </SectionCard>

            <SectionCard
              step="Actividad 3"
              title="Verdadero o falso con deslizamiento"
              instructions="Desliza la tarjeta o usa las flechas del teclado. Si fallas, repites el mismo enunciado para reforzar el tema."
              state={mcqResolved < 50 ? 'locked' : swipeResolved === 25 ? 'completed' : activeSection === 'swipe' ? 'active' : 'locked'}
            >
              {mcqResolved < 50 ? (
                <p className="locked-message">Se desbloquea al completar la Actividad 2.</p>
              ) : swipeResolved === 25 ? (
                <p className="locked-message">Los 25 enunciados ya quedaron resueltos.</p>
              ) : (
                <SwipeActivity snapshot={snapshot} onRecordAttempt={handleRecordAttempt} />
              )}
            </SectionCard>

            {activeSection === 'final' ? (
              <SectionCard
                step="Actividad 4"
                title="Resultado de práctica y descarga del reporte"
                instructions="Escribe tu nombre completo y genera tu reporte de práctica en PNG."
                state="active"
              >
                <FinalSection metrics={metrics} />
              </SectionCard>
            ) : null}
          </>
        )}
      </main>
    </div>
  );
}
