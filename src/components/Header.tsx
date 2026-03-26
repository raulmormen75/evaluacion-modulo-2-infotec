import { themes } from '../data';
import type { EvaluationSnapshot } from '../data';

interface HeaderProps {
  themeMode: EvaluationSnapshot['themeMode'];
  onToggleTheme: () => void;
}

export function Header({ themeMode, onToggleTheme }: HeaderProps) {
  return (
    <header className="hero-card">
      <div className="hero-top">
        <div className="brand-mark">
          <img src="/logo_infotec.png" alt="Logo de INFOTEC" className="brand-logo" />
          <div className="hero-copy">
            <p className="eyebrow">Diplomado en Gobernanza de las Telecomunicaciones</p>
            <h1>Actividad de apoyo y repaso del Módulo 2. Economía Digital y Mercados Emergentes</h1>
            <p className="hero-subtitle">
              Refuerza los contenidos revisados en clase, practica antes de la actividad práctica y conserva tu avance
              en este navegador.
            </p>
          </div>
        </div>

        <div className="hero-actions">
          <button type="button" className="ghost-button theme-toggle-button" onClick={onToggleTheme}>
            {themeMode === 'light' ? 'Modo oscuro' : 'Modo claro'}
          </button>
        </div>
      </div>

      <div className="hero-body">
        <section className="hero-guidelines" aria-label="Indicaciones iniciales">
          <p className="mini-label">Antes de comenzar</p>
          <ul className="hero-rules">
            <li>Resuelve una actividad a la vez para repasar con orden.</li>
            <li>Si fallas, repites el reactivo hasta reforzar el tema.</li>
            <li>Tu avance y tu desempeño quedan guardados localmente en este navegador.</li>
            <li>Esta actividad es de apoyo y no forma parte del porcentaje de evaluación final del módulo.</li>
          </ul>
        </section>

        <section className="theme-band" aria-label="Temas del módulo">
          <p className="mini-label">Temas del módulo</p>
          <div className="theme-strip">
            {themes.map((theme) => (
              <article key={theme.id} className="theme-pill">
                <span>{theme.label}</span>
                <strong>{theme.shortTitle}</strong>
              </article>
            ))}
          </div>
        </section>
      </div>
    </header>
  );
}
