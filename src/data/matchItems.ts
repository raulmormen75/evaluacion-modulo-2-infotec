import type { Difficulty, MatchItem, ThemeId } from './types';

function match(
  id: string,
  themeId: ThemeId,
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
    'concepto_base',
    'Mercado multilateral',
    'match-t1-d1',
    'Estructura donde una plataforma conecta grupos distintos de usuarios y obtiene valor de las interacciones entre ellos.',
    'facil'
  ),
  match(
    'match-t1-2',
    1,
    'concepto_base',
    'Operador de facto',
    'match-t1-d2',
    'Agente que condiciona materialmente comunicación, acceso o visibilidad sin poseer necesariamente la red física.',
    'facil'
  ),
  match(
    'match-t1-3',
    1,
    'dinamica',
    'Efectos de red indirectos',
    'match-t1-d3',
    'Fenómeno por el que cada lado del mercado gana valor conforme crece la participación del otro lado conectado.',
    'facil'
  ),
  match(
    'match-t1-4',
    1,
    'remedio',
    'Portabilidad de datos',
    'match-t1-d4',
    'Facultad de trasladar datos, historial o contactos a otro proveedor en formato útil y con oportunidad real.'
  ),
  match(
    'match-t1-5',
    1,
    'remedio',
    'Interoperabilidad',
    'match-t1-d5',
    'Compatibilidad técnica entre servicios para conectarse entre sí y reducir encierro del usuario.'
  ),
  match(
    'match-t2-1',
    2,
    'concepto_base',
    'Criptoeconomía',
    'match-t2-d1',
    'Diseño de sistemas digitales donde la confianza se apoya en criptografía, incentivos, validación y gobernanza.',
    'facil'
  ),
  match(
    'match-t2-2',
    2,
    'concepto_base',
    'DLT',
    'match-t2-d2',
    'Registro compartido entre varios participantes que almacena eventos o transacciones de forma sincronizada y auditable.',
    'facil'
  ),
  match(
    'match-t2-3',
    2,
    'automatizacion',
    'Contrato inteligente',
    'match-t2-d3',
    'Programa que ejecuta instrucciones definidas de manera automática cuando se cumplen condiciones verificables.',
    'facil'
  ),
  match(
    'match-t2-4',
    2,
    'gobernanza',
    'Red permisionada',
    'match-t2-d4',
    'DLT con acceso controlado y reglas previsibles de gobernanza, usualmente preferida para telecomunicaciones.'
  ),
  match(
    'match-t2-5',
    2,
    'identidad',
    'Identidad digital verificable',
    'match-t2-d5',
    'Esquema que permite probar atributos con credenciales verificables sin entregar toda la información personal.'
  ),
  match(
    'match-t3-1',
    3,
    'concepto_base',
    'Dinero móvil',
    'match-t3-d1',
    'Uso del teléfono móvil como canal principal para iniciar, recibir o confirmar operaciones financieras.',
    'facil'
  ),
  match(
    'match-t3-2',
    3,
    'concepto_base',
    'Cartera digital',
    'match-t3-d2',
    'Aplicación o servicio que almacena credenciales de pago y permite operar desde un dispositivo.',
    'facil'
  ),
  match(
    'match-t3-3',
    3,
    'datos',
    'Finanzas abiertas',
    'match-t3-d3',
    'Modelo que comparte datos y servicios financieros mediante reglas interoperables y consentimiento del usuario.'
  ),
  match(
    'match-t3-4',
    3,
    'integracion',
    'API estandarizada',
    'match-t3-d4',
    'Interfaz técnica con especificaciones comunes para intercambiar datos o funciones de manera estructurada.'
  ),
  match(
    'match-t3-5',
    3,
    'infraestructura',
    'Riel de pago',
    'match-t3-d5',
    'Infraestructura que mueve dinero con rapidez, bajo costo y certeza operativa dentro del ecosistema financiero.'
  ),
  match(
    'match-t4-1',
    4,
    'trabajo',
    'Gestión algorítmica del trabajo',
    'match-t4-d1',
    'Uso de procedimientos computacionales para asignar, monitorear, evaluar y sancionar trabajo en plataformas.',
    'facil'
  ),
  match(
    'match-t4-2',
    4,
    'trabajo',
    'Subordinación mediante TIC',
    'match-t4-d2',
    'Relación de control ejercida por tecnologías de información, aun cuando el trabajo sea flexible y discontinuo.'
  ),
  match(
    'match-t4-3',
    4,
    'transparencia',
    'Política de gestión algorítmica',
    'match-t4-d3',
    'Documento que debe explicar con claridad cómo se asignan tareas, se afectan ingresos y se revisan errores.'
  ),
  match(
    'match-t4-4',
    4,
    'comparado',
    'Presunción rebatible de relación laboral',
    'match-t4-d4',
    'Regla que presume vínculo laboral cuando existen elementos de control, salvo prueba suficiente en contrario.'
  ),
  match(
    'match-t4-5',
    4,
    'alojamiento',
    'Trazabilidad regulatoria',
    'match-t4-d5',
    'Ordenamiento de datos e intercambio de información para gobernar mercados como el alojamiento temporal con evidencia.'
  ),
  match(
    'match-t5-1',
    5,
    'conducta',
    'Autopreferencia',
    'match-t5-d1',
    'Práctica por la que una plataforma favorece sus propios servicios o resultados dentro del ecosistema que controla.'
  ),
  match(
    'match-t5-2',
    5,
    'consumo',
    'Patrón oscuro',
    'match-t5-d2',
    'Diseño de interfaz que manipula la elección del usuario y debilita una decisión informada.'
  ),
  match(
    'match-t5-3',
    5,
    'precio',
    'Precio fragmentado',
    'match-t5-d3',
    'Estrategia de mostrar cargos adicionales al final del proceso en vez de exhibir desde el inicio el precio total.'
  ),
  match(
    'match-t5-4',
    5,
    'regulacion',
    'Guardián de acceso',
    'match-t5-d4',
    'Plataforma con poder estructural sobre un ecosistema digital, sujeta a obligaciones preventivas especiales.'
  ),
  match(
    'match-t5-5',
    5,
    'remedio',
    'Interoperabilidad efectiva',
    'match-t5-d5',
    'Compatibilidad técnica que funciona de verdad en la práctica y no solo como remedio simbólico en el papel.'
  )
];
