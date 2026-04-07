import type { Difficulty, MatchBatch, MatchItem, ThemeId } from './types';

function match(
  id: string,
  themeId: ThemeId,
  batch: MatchBatch,
  subtype: string,
  concept: string,
  definitionId: string,
  definition: string,
  difficulty: Difficulty = 'intermedio'
): MatchItem {
  return {
    id,
    themeId,
    activity: 'match',
    batch,
    subtype,
    prompt: concept,
    difficulty,
    concept,
    definitionId,
    definition,
    correctAnswer: definitionId
  };
}

export const matchItems: MatchItem[] = [
  match(
    'match-t1-1',
    1,
    1,
    'concepto_base',
    'Mercado multilateral',
    'match-t1-d1',
    'Estructura donde una plataforma conecta grupos distintos de usuarios y obtiene valor de sus interacciones.',
    'facil'
  ),
  match(
    'match-t2-1',
    2,
    1,
    'concepto_base',
    'DLT',
    'match-t2-d1',
    'Registro distribuido entre varios participantes que sincroniza eventos y deja trazabilidad verificable.',
    'facil'
  ),
  match(
    'match-t3-1',
    3,
    1,
    'mexico',
    'CoDi',
    'match-t3-d1',
    'Esquema de cobro digital de Banco de México que opera sobre SPEI para pagos inmediatos.',
    'facil'
  ),
  match(
    'match-t4-1',
    4,
    1,
    'trabajo',
    'Gestión algorítmica',
    'match-t4-d1',
    'Uso de reglas automatizadas para asignar tareas, medir desempeño, fijar incentivos y aplicar sanciones.',
    'facil'
  ),
  match(
    'match-t5-1',
    5,
    1,
    'competencia',
    'Autopreferencia',
    'match-t5-d1',
    'Práctica por la que una plataforma favorece sus propios productos o servicios dentro del mercado que controla.',
    'facil'
  ),
  match(
    'match-t1-2',
    1,
    2,
    'remedio',
    'Portabilidad de datos',
    'match-t1-d2',
    'Facultad de trasladar contactos, historial o archivos a otro proveedor en un formato útil.',
    'facil'
  ),
  match(
    'match-t2-2',
    2,
    2,
    'identidad',
    'Identidad digital verificable',
    'match-t2-d2',
    'Esquema que permite probar atributos de una persona con credenciales confiables y acceso controlado.',
    'facil'
  ),
  match(
    'match-t3-2',
    3,
    2,
    'datos',
    'Finanzas abiertas',
    'match-t3-d2',
    'Modelo que comparte datos y servicios financieros mediante reglas interoperables y consentimiento del usuario.'
  ),
  match(
    'match-t4-2',
    4,
    2,
    'laboral',
    'Subordinación mediante TIC',
    'match-t4-d2',
    'Control del trabajo ejercido por tecnologías que fijan instrucciones, vigilancia y condiciones de permanencia.'
  ),
  match(
    'match-t5-2',
    5,
    2,
    'consumidor',
    'Encerramiento del usuario',
    'match-t5-d2',
    'Situación en la que salir de una plataforma resulta costoso por perder datos, contactos o continuidad de uso.'
  )
];
