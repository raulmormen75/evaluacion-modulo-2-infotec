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
          <div>
            <p className="eyebrow">Diplomado en Gobernanza de las Telecomunicaciones</p>
            <h1>Evaluación final del módulo 2. Economía Digital y Mercados Emergentes</h1>
          </div>
        </div>

        <div className="hero-actions">
          <button type="button" className="action-button" onClick={onToggleTheme}>
            {themeMode === 'light' ? 'Modo oscuro' : 'Modo claro'}
          </button>
        </div>
      </div>

      <div className="hero-body">
        <div className="instruction-card">
          <h2>Antes de empezar</h2>
          <ul>
            <li>Resuelve una actividad a la vez.</li>
            <li>Si fallas, vuelves a intentarlo sin ver la respuesta correcta.</li>
            <li>Tu avance y tu calificación se guardan en este navegador.</li>
          </ul>
        </div>

        <div className="theme-pills" aria-label="Temas del módulo">
          {themes.map((theme) => (
            <article key={theme.id} className="theme-pill">
              <p>{theme.label}</p>
              <strong>{theme.shortTitle}</strong>
            </article>
          ))}
        </div>
      </div>
    </header>
  );
}
