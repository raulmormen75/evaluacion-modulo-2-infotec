import type { Difficulty, SwipeItem, ThemeId } from './types';

function swipe(
  id: string,
  themeId: ThemeId,
  subtype: string,
  statement: string,
  correctAnswer: boolean,
  difficulty: Difficulty = 'intermedio'
): SwipeItem {
  return {
    id,
    themeId,
    activity: 'swipe',
    subtype,
    prompt: statement,
    difficulty,
    statement,
    correctAnswer
  };
}

export const swipeItems: SwipeItem[] = [
  swipe(
    'swipe-t1-1',
    1,
    'concepto_base',
    'Una plataforma puede actuar como operador material aunque no posea la red física.',
    true,
    'facil'
  ),
  swipe(
    'swipe-t1-2',
    1,
    'mercado',
    'Si un servicio digital es gratuito para el usuario final, ya no puede existir poder de mercado.',
    false,
    'facil'
  ),
  swipe(
    'swipe-t2-1',
    2,
    'automatizacion',
    'Los contratos inteligentes pueden automatizar pagos o acciones cuando se cumplen condiciones verificables.',
    true,
    'facil'
  ),
  swipe(
    'swipe-t2-2',
    2,
    'regulacion',
    'La tecnología blockchain elimina por sí sola las obligaciones de privacidad y supervisión institucional.',
    false,
    'facil'
  ),
  swipe(
    'swipe-t3-1',
    3,
    'convergencia',
    'El teléfono móvil funciona también como autenticación, canal de pagos y fuente de datos transaccionales.',
    true,
    'facil'
  ),
  swipe(
    'swipe-t3-2',
    3,
    'coordinacion',
    'La convergencia fintech-telecom vuelve innecesaria la coordinación entre regulación financiera y telecomunicaciones.',
    false,
    'facil'
  ),
  swipe(
    'swipe-t4-1',
    4,
    'trabajo',
    'La gestión algorítmica puede influir en tareas, ingresos y permanencia dentro de una plataforma.',
    true,
    'facil'
  ),
  swipe(
    'swipe-t4-2',
    4,
    'laboral',
    'Operar mediante una aplicación basta para excluir obligaciones laborales o de seguridad social.',
    false,
    'facil'
  ),
  swipe(
    'swipe-t5-1',
    5,
    'competencia',
    'La autopreferencia ocurre cuando la plataforma da ventaja a sus propios productos o servicios.',
    true,
    'facil'
  ),
  swipe(
    'swipe-t5-2',
    5,
    'consumidor',
    'Impedir la portabilidad de datos suele facilitar el cambio de proveedor y ampliar la competencia.',
    false,
    'facil'
  )
];
