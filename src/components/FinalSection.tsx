import html2canvas from 'html2canvas';
import { useEffect, useRef, useState } from 'react';
import { totalExercises, type EvaluationMetrics } from '../data';
import { formatDateLong, sanitizeFileName } from '../utils/format';

interface FinalSectionProps {
  metrics: EvaluationMetrics;
}

interface PerformanceMessage {
  tone: 'success' | 'progress' | 'support';
  badge: string;
  title: string;
  detail: string;
}

function getPerformanceMessage(scorePercent: number): PerformanceMessage {
  if (scorePercent >= 90) {
    return {
      tone: 'success',
      badge: 'Muy buen dominio',
      title: 'Has dominado muy bien los conocimientos del módulo.',
      detail: 'Continúa con este nivel de repaso para llegar bien preparado a la actividad práctica.'
    };
  }

  if (scorePercent >= 70) {
    return {
      tone: 'progress',
      badge: 'Buen avance',
      title: 'Vas mejorando y tu repaso avanza bien.',
      detail: 'Conviene practicar un poco más para reforzar los temas del módulo antes de la actividad práctica.'
    };
  }

  return {
    tone: 'support',
    badge: 'Sigue practicando',
    title: 'Vas construyendo tu dominio del módulo.',
    detail: 'Sigue repasando. Practicar te ayudará a lograr un mejor dominio de los temas.'
  };
}

export function FinalSection({ metrics }: FinalSectionProps) {
  const evidenceRef = useRef<HTMLDivElement | null>(null);
  const [studentName, setStudentName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const generationDate = formatDateLong();
  const performanceMessage = getPerformanceMessage(metrics.scorePercent);
  const scoringExplanation = `Los ${totalExercises} ejercicios valen el 100 %. Cada ejercicio completado suma 1 punto y cada intento fallido descuenta medio punto. Ejemplo: 10 ejercicios completados y 2 intentos fallidos dejan 9 puntos de 30, equivalente a 30 %.`;

  const sanitizedName = sanitizeFileName(studentName) || 'sin-nombre';
  const fileName = `reporte_practica_modulo2_${sanitizedName}_${metrics.scorePercent}.png`;

  useEffect(() => {
    return () => {
      if (generatedUrl) {
        URL.revokeObjectURL(generatedUrl);
      }
    };
  }, [generatedUrl]);

  function updateGeneratedUrl(nextUrl: string) {
    setGeneratedUrl((currentUrl) => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }

      return nextUrl;
    });
  }

  function canvasToBlob(canvas: HTMLCanvasElement) {
    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('No fue posible generar el archivo PNG.'));
          return;
        }

        resolve(blob);
      }, 'image/png');
    });
  }

  async function handleGenerate() {
    const trimmedName = studentName.trim();

    if (!trimmedName) {
      setErrorMessage('Escribe tu nombre completo para generar el reporte de práctica.');
      return;
    }

    if (!evidenceRef.current) {
      return;
    }

    setErrorMessage('');
    setIsGenerating(true);

    try {
      const canvas = await html2canvas(evidenceRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true
      });

      const blob = await canvasToBlob(canvas);
      updateGeneratedUrl(URL.createObjectURL(blob));
    } catch (error) {
      updateGeneratedUrl('');
      setErrorMessage(error instanceof Error ? error.message : 'No fue posible generar el reporte. Intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="activity-body">
      <section className="completion-banner">
        <div>
          <p className="mini-label">Repaso concluido</p>
          <h3>Has completado los {totalExercises} ejercicios de práctica.</h3>
          <p>Consulta tu resultado, identifica tu nivel de avance y genera tu reporte de práctica en imagen.</p>
        </div>
        <div className="progress-stack">
          <div className="progress-chip">Resultado: {metrics.scorePercent}%</div>
          <div className="progress-chip">Intentos fallidos: {metrics.incorrectAttempts}</div>
        </div>
      </section>

      <section className="score-rule">
        <p className="mini-label">Cómo se calculó</p>
        <p>{scoringExplanation}</p>
      </section>

      <div className="final-grid">
        <article className="result-card">
          <p className="mini-label">Resultado de práctica</p>
          <h4>Tu avance en esta actividad</h4>
          <dl className="result-list">
            <div>
              <dt>Resultado actual</dt>
              <dd>{metrics.scorePercent}%</dd>
            </div>
            <div>
              <dt>Ejercicios completados</dt>
              <dd>{metrics.resolvedCount} / {totalExercises}</dd>
            </div>
            <div>
              <dt>Correctas al primer intento</dt>
              <dd>{metrics.firstAttemptCorrectCount}</dd>
            </div>
            <div>
              <dt>Intentos fallidos</dt>
              <dd>{metrics.incorrectAttempts}</dd>
            </div>
            <div>
              <dt>Intentos realizados</dt>
              <dd>{metrics.totalAttempts}</dd>
            </div>
            <div>
              <dt>Fecha del reporte</dt>
              <dd>{generationDate}</dd>
            </div>
          </dl>

          <section className={`performance-card performance-${performanceMessage.tone}`}>
            <span className="performance-badge">{performanceMessage.badge}</span>
            <h5 className="performance-title">{performanceMessage.title}</h5>
            <p className="performance-detail">{performanceMessage.detail}</p>
          </section>
        </article>

        <article className="result-card">
          <p className="mini-label">Reporte de práctica</p>
          <h4>Genera tu resumen en imagen</h4>

          <label className="field-label" htmlFor="studentName">
            Nombre completo del alumno
          </label>
          <input
            id="studentName"
            className="text-input"
            type="text"
            value={studentName}
            onChange={(event) => {
              setStudentName(event.target.value);
              updateGeneratedUrl('');
              setErrorMessage('');
            }}
            placeholder="Escribe tu nombre completo"
          />

          <div className="download-actions">
            <button type="button" className="action-button" disabled={isGenerating} onClick={handleGenerate}>
              {isGenerating ? 'Generando...' : 'Generar reporte en imagen'}
            </button>
            <a
              className={`ghost-button download-link ${generatedUrl ? '' : 'is-disabled'}`}
              href={generatedUrl || undefined}
              download={fileName}
              aria-disabled={!generatedUrl}
            >
              Descargar reporte
            </a>
          </div>

          <p className={`feedback-message ${errorMessage ? 'feedback-error' : ''}`} aria-live="polite">
            {errorMessage || 'El reporte se genera en PNG con presentación institucional.'}
          </p>
        </article>
      </div>

      {generatedUrl ? (
        <section className="preview-card">
          <div className="preview-header">
            <div>
              <p className="mini-label">Vista previa</p>
              <h4>Reporte listo para descargar</h4>
            </div>
            <span className="preview-state">Archivo listo</span>
          </div>
          <img src={generatedUrl} alt="Vista previa del reporte de práctica generado" className="preview-image" />
        </section>
      ) : null}

      <div className="evidence-stage" aria-hidden="true">
        <div ref={evidenceRef} className="evidence-card">
          <header className="evidence-header">
            <img src="/logo_infotec.png" alt="" className="evidence-logo" />
            <div>
              <p>Diplomado en Gobernanza de las Telecomunicaciones</p>
              <h2>Actividad de apoyo y repaso del Módulo 2</h2>
              <strong>Economía Digital y Mercados Emergentes</strong>
            </div>
          </header>

          <main className="evidence-main">
            <p className="evidence-label">Nombre del alumno</p>
            <h3>{studentName.trim() || 'Nombre pendiente'}</h3>

            <section className={`evidence-note evidence-note-${performanceMessage.tone}`}>
              <p>{performanceMessage.badge}</p>
              <strong>{performanceMessage.title}</strong>
              <span>{performanceMessage.detail}</span>
            </section>

            <div className="evidence-metrics">
              <article>
                <span>Resultado final</span>
                <strong>{metrics.scorePercent}%</strong>
              </article>
              <article>
                <span>Ejercicios completados</span>
                <strong>{metrics.resolvedCount} / {totalExercises}</strong>
              </article>
              <article>
                <span>Correctas al primer intento</span>
                <strong>{metrics.firstAttemptCorrectCount}</strong>
              </article>
              <article>
                <span>Intentos fallidos</span>
                <strong>{metrics.incorrectAttempts}</strong>
              </article>
            </div>

            <footer className="evidence-footer">
              <p>{generationDate}</p>
              <p>Reporte de práctica generado</p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
