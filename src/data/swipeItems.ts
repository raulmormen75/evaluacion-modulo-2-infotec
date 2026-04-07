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
    'Una plataforma puede operar como agente determinante en telecomunicaciones aunque no posea red propia.',
    true,
    'facil'
  ),
  swipe(
    'swipe-t1-2',
    1,
    'mercado',
    'Que un servicio sea gratuito para el usuario final elimina, por sí mismo, cualquier poder de mercado.',
    false,
    'facil'
  ),
  swipe(
    'swipe-t1-3',
    1,
    'remedio',
    'La interoperabilidad puede bajar costos de cambio y abrir espacio para competir dentro y entre plataformas.',
    true,
    'facil'
  ),
  swipe(
    'swipe-t1-4',
    1,
    'mexico',
    'México ya cuenta con un régimen ex ante plenamente equivalente al europeo y al británico para plataformas digitales.',
    false
  ),
  swipe(
    'swipe-t1-5',
    1,
    'estadistica',
    'En 2024, 83.1 % de la población mexicana de seis años y más usó internet.',
    true,
    'facil'
  ),
  swipe(
    'swipe-t2-1',
    2,
    'caso_de_uso',
    'La DLT puede tener sentido en telecomunicaciones cuando intervienen muchos actores y existen disputas de conciliación o auditoría.',
    true,
    'facil'
  ),
  swipe(
    'swipe-t2-2',
    2,
    'diferenciacion',
    'Blockchain y criptomoneda son exactamente lo mismo.',
    false,
    'facil'
  ),
  swipe(
    'swipe-t2-3',
    2,
    'gobernanza',
    'Las redes permisionadas suelen preferirse en telecomunicaciones por control de acceso y compatibilidad regulatoria.',
    true
  ),
  swipe(
    'swipe-t2-4',
    2,
    'regulacion',
    'La Circular 4/2019 abrió libremente a clientes del sistema regulado el intercambio y la custodia de criptoactivos.',
    false
  ),
  swipe(
    'swipe-t2-5',
    2,
    'datos',
    'Subir datos personales completos a la cadena puede chocar con derechos de rectificación o supresión.',
    true
  ),
  swipe(
    'swipe-t3-1',
    3,
    'concepto_base',
    'En la convergencia fintech-telecom, el teléfono móvil funciona también como interfaz de autenticación, pago y captura de datos.',
    true,
    'facil'
  ),
  swipe(
    'swipe-t3-2',
    3,
    'open_finance',
    'México ya cuenta con un ecosistema de finanzas abiertas plenamente maduro y sin fricciones de implementación.',
    false
  ),
  swipe(
    'swipe-t3-3',
    3,
    'riel_de_pago',
    'CoDi opera como capa de cobro y pago sobre la infraestructura del SPEI.',
    true,
    'facil'
  ),
  swipe(
    'swipe-t3-4',
    3,
    'competencia',
    'Más inclusión financiera digital garantiza automáticamente más competencia entre plataformas y bancos.',
    false
  ),
  swipe(
    'swipe-t3-5',
    3,
    'mexico',
    'Dimo convirtió al número celular en un identificador operativo para pagos electrónicos interoperables.',
    true
  ),
  swipe(
    'swipe-t4-1',
    4,
    'trabajo',
    'La gestión algorítmica puede asignar tareas, medir desempeño y sancionar sin intervención constante de una persona supervisora.',
    true,
    'facil'
  ),
  swipe(
    'swipe-t4-2',
    4,
    'subordinacion',
    'Si una plataforma ofrece flexibilidad horaria, queda descartada cualquier posibilidad de relación laboral.',
    false
  ),
  swipe(
    'swipe-t4-3',
    4,
    'comparado',
    'La Directiva europea sobre trabajo en plataformas entró en vigor en diciembre de 2024 y su transposición debe concluir antes de diciembre de 2026.',
    true
  ),
  swipe(
    'swipe-t4-4',
    4,
    'mexico',
    'La reforma mexicana de 2024 resolvió por completo todos los problemas de cumplimiento, datos y consumo en plataformas.',
    false
  ),
  swipe(
    'swipe-t4-5',
    4,
    'alcance',
    'Una plataforma de reparto y una de alojamiento producen exactamente los mismos daños y deben regularse igual.',
    false
  ),
  swipe(
    'swipe-t5-1',
    5,
    'consumo',
    'Los cobros ocultos pueden dañar al consumidor y, al mismo tiempo, dar ventajas injustas a empresas menos transparentes.',
    true,
    'facil'
  ),
  swipe(
    'swipe-t5-2',
    5,
    'regulacion',
    'México ya tiene un régimen ex ante equivalente al DMA para guardianes de acceso.',
    false
  ),
  swipe(
    'swipe-t5-3',
    5,
    'conducta',
    'Autopreferencia significa que la plataforma abre su ecosistema en igualdad de condiciones para todos los rivales.',
    false
  ),
  swipe(
    'swipe-t5-4',
    5,
    'mercado',
    'La protección al consumidor en mercados digitales solo importa si aumenta el precio nominal del producto.',
    false
  ),
  swipe(
    'swipe-t5-5',
    5,
    'remedio',
    'Portabilidad e interoperabilidad son inútiles incluso cuando se diseñan de forma técnica y verificable.',
    false
  )
];
