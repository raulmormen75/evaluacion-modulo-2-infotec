import html2canvas from 'html2canvas';
import { useEffect, useRef, useState } from 'react';
import type { EvaluationMetrics } from '../data';
import { formatDateLong, sanitizeFileName } from '../utils/format';

interface FinalSectionProps {
  metrics: EvaluationMetrics;
}

export function FinalSection({ metrics }: FinalSectionProps) {
  const evidenceRef = useRef<HTMLDivElement | null>(null);
  const [studentName, setStudentName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const generationDate = formatDateLong();

  const sanitizedName = sanitizeFileName(studentName) || 'sin-nombre';
  const fileName = `evaluacion_modulo2_${sanitizedName}_${metrics.scorePercent}.png`;

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
      setErrorMessage('Escribe tu nombre completo para generar la evidencia.');
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
      setErrorMessage(
        error instanceof Error ? error.message : 'No fue posible generar la evidencia. Intenta de nuevo.'
      );
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="activity-body">
      <div className="completion-banner">
        <p className="mini-label">Evaluación concluida</p>
        <h3>Has completado los 100 ejercicios.</h3>
        <p>Ahora registra tu nombre y genera la evidencia en imagen.</p>
      </div>

      <div className="final-grid">
        <article className="result-card">
          <h4>Resultado final</h4>
          <dl className="result-list">
            <div>
              <dt>Calificación final</dt>
              <dd>{metrics.scorePercent}%</dd>
            </div>
            <div>
              <dt>Resueltos</dt>
              <dd>{metrics.resolvedCount} / 100</dd>
            </div>
            <div>
              <dt>Incorrectos acumulados</dt>
              <dd>{metrics.incorrectAttempts}</dd>
            </div>
            <div>
              <dt>Fecha de generación</dt>
              <dd>{generationDate}</dd>
            </div>
          </dl>
        </article>

        <article className="result-card">
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
              {isGenerating ? 'Generando...' : 'Generar evidencia en imagen'}
            </button>
            <a
              className={`ghost-button download-link ${generatedUrl ? '' : 'is-disabled'}`}
              href={generatedUrl || undefined}
              download={fileName}
              aria-disabled={!generatedUrl}
            >
              Descargar imagen
            </a>
          </div>

          <p className={`feedback-message ${errorMessage ? 'feedback-error' : ''}`} aria-live="polite">
            {errorMessage || 'La evidencia se exporta en PNG con formato institucional claro.'}
          </p>
        </article>
      </div>

      {generatedUrl ? (
        <div className="preview-card">
          <img src={generatedUrl} alt="Vista previa de la evidencia generada" className="preview-image" />
        </div>
      ) : null}

      <div className="evidence-stage" aria-hidden="true">
        <div ref={evidenceRef} className="evidence-card">
          <header className="evidence-header">
            <img src="/logo_infotec.png" alt="" className="evidence-logo" />
            <div>
              <p>Diplomado en Gobernanza de las Telecomunicaciones</p>
              <h2>Evaluación final del módulo 2</h2>
              <strong>Economía Digital y Mercados Emergentes</strong>
            </div>
          </header>

          <main className="evidence-main">
            <p className="evidence-label">Nombre del alumno</p>
            <h3>{studentName.trim() || 'Nombre pendiente'}</h3>

            <div className="evidence-metrics">
              <article>
                <span>Calificación final</span>
                <strong>{metrics.scorePercent}%</strong>
              </article>
              <article>
                <span>Ejercicios resueltos</span>
                <strong>{metrics.resolvedCount} / 100</strong>
              </article>
              <article>
                <span>Incorrectos acumulados</span>
                <strong>{metrics.incorrectAttempts}</strong>
              </article>
            </div>

            <footer className="evidence-footer">
              <p>{generationDate}</p>
              <p>Evaluación final completada</p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
