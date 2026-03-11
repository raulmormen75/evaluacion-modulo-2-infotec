import type { ReactNode } from 'react';

interface SectionCardProps {
  step: string;
  title: string;
  instructions: string;
  state: 'active' | 'completed' | 'locked';
  children: ReactNode;
}

function getStateLabel(state: SectionCardProps['state']) {
  if (state === 'completed') {
    return 'Completada';
  }

  if (state === 'locked') {
    return 'Bloqueada';
  }

  return 'Activa';
}

export function SectionCard({ step, title, instructions, state, children }: SectionCardProps) {
  return (
    <section className={`section-card section-${state}`} aria-labelledby={`${step}-title`}>
      <header className="section-header">
        <div>
          <p className="section-step">{step}</p>
          <h2 id={`${step}-title`}>{title}</h2>
        </div>
        <span className={`section-badge badge-${state}`}>{getStateLabel(state)}</span>
      </header>

      <p className="section-instructions">{instructions}</p>
      {children}
    </section>
  );
}
