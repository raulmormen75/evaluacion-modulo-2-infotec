import { useEffect, useState } from 'react';
import { FinalSection } from './components/FinalSection';
import { Header } from './components/Header';
import { MatchActivity } from './components/MatchActivity';
import { MultipleChoiceActivity } from './components/MultipleChoiceActivity';
import { SectionCard } from './components/SectionCard';
import { StatusCapsule } from './components/StatusCapsule';
import { SwipeActivity } from './components/SwipeActivity';
import { matchItems, multipleChoiceItems, swipeItems, type EvaluationSnapshot } from './data';
import { getActiveSection, getResolvedCountByActivity } from './features/evaluation/selectors';
import { calculateMetrics, recordExerciseAttempt } from './features/evaluation/scoring';
import { loadSnapshot } from './features/evaluation/storage';

export function App() {
  const [snapshot, setSnapshot] = useState<EvaluationSnapshot | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function initialize() {
      const loadedSnapshot = await loadSnapshot();

      if (!isMounted) {
        return;
      }

      setSnapshot(loadedSnapshot);
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
  }, [snapshot]);

  if (!snapshot) {
    return (
      <div className="app-shell">
        <main className="content-stack">
          <SectionCard
            step="Carga"
            title="Preparando la actividad de apoyo"
            instructions="Estamos iniciando una nueva sesión de práctica antes de mostrar los ejercicios."
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

  function handleRecordAttempt(exerciseId: string, wasCorrect: boolean) {
    setSnapshot((previous) => {
      if (!previous) {
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
            <StatusCapsule metrics={metrics} />
          </aside>
        </div>

        <nav className="activity-strip" aria-label="Ruta de práctica y repaso">
          <span className={activeSection === 'match' ? 'strip-item current' : matchResolved === matchItems.length ? 'strip-item done' : 'strip-item'}>
            1. Relacionar conceptos
          </span>
          <span className={activeSection === 'mcq' ? 'strip-item current' : mcqResolved === multipleChoiceItems.length ? 'strip-item done' : 'strip-item'}>
            2. Opción múltiple
          </span>
          <span className={activeSection === 'swipe' ? 'strip-item current' : swipeResolved === swipeItems.length ? 'strip-item done' : 'strip-item'}>
            3. Verdadero o falso
          </span>
          <span className={activeSection === 'final' ? 'strip-item current' : 'strip-item'}>4. Resultado de práctica</span>
        </nav>
      </section>

      <main className="content-stack">
        <SectionCard
          step="Actividad 1"
          title="Relacionar conceptos"
          instructions="Primero relaciona 5 conceptos. Al completar ese bloque, se desbloquean los otros 5."
          state={matchResolved === matchItems.length ? 'completed' : 'active'}
        >
          {matchResolved === matchItems.length ? (
            <p className="locked-message">Los 10 ejercicios de relacionar conceptos ya quedaron resueltos.</p>
          ) : (
            <MatchActivity snapshot={snapshot} onRecordAttempt={handleRecordAttempt} />
          )}
        </SectionCard>

        <SectionCard
          step="Actividad 2"
          title="Opción múltiple"
          instructions="Verás un reactivo por vista. Si fallas, vuelves a intentarlo hasta reforzar la respuesta correcta."
          state={
            matchResolved < matchItems.length
              ? 'locked'
              : mcqResolved === multipleChoiceItems.length
                ? 'completed'
                : activeSection === 'mcq'
                  ? 'active'
                  : 'locked'
          }
        >
          {matchResolved < matchItems.length ? (
            <p className="locked-message">Se desbloquea al completar la Actividad 1.</p>
          ) : mcqResolved === multipleChoiceItems.length ? (
            <p className="locked-message">Los 10 reactivos de opción múltiple ya quedaron resueltos.</p>
          ) : (
            <MultipleChoiceActivity snapshot={snapshot} onRecordAttempt={handleRecordAttempt} />
          )}
        </SectionCard>

        <SectionCard
          step="Actividad 3"
          title="Verdadero o falso con deslizamiento"
          instructions="Desliza la tarjeta o usa las flechas del teclado. Si fallas, repites el mismo enunciado para reforzar el tema."
          state={
            mcqResolved < multipleChoiceItems.length
              ? 'locked'
              : swipeResolved === swipeItems.length
                ? 'completed'
                : activeSection === 'swipe'
                  ? 'active'
                  : 'locked'
          }
        >
          {mcqResolved < multipleChoiceItems.length ? (
            <p className="locked-message">Se desbloquea al completar la Actividad 2.</p>
          ) : swipeResolved === swipeItems.length ? (
            <p className="locked-message">Los 10 planteamientos de verdadero o falso ya quedaron resueltos.</p>
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
            <FinalSection snapshot={snapshot} metrics={metrics} />
          </SectionCard>
        ) : null}
      </main>
    </div>
  );
}
