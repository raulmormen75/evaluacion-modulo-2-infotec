import type { Difficulty, MultipleChoiceItem, MultipleChoiceOption, ThemeId } from './types';

const optionIds: MultipleChoiceOption['id'][] = ['a', 'b', 'c', 'd', 'e'];

function option(id: MultipleChoiceOption['id'], text: string): MultipleChoiceOption {
  return { id, text };
}

function reorderOptions(
  options: MultipleChoiceOption[],
  currentCorrectAnswer: MultipleChoiceOption['id'],
  targetCorrectAnswer: MultipleChoiceOption['id']
) {
  const correctOption = options.find((candidate) => candidate.id === currentCorrectAnswer);

  if (!correctOption) {
    throw new Error(`No se encontró la opción correcta ${currentCorrectAnswer}.`);
  }

  const distractorTexts = options.filter((candidate) => candidate.id !== currentCorrectAnswer).map((candidate) => candidate.text);
  const nextOptions = [...distractorTexts];
  const targetIndex = optionIds.indexOf(targetCorrectAnswer);

  nextOptions.splice(targetIndex, 0, correctOption.text);

  return nextOptions.map((text, index) => option(optionIds[index], text));
}

function mcq(
  id: string,
  themeId: ThemeId,
  subtype: string,
  question: string,
  currentCorrectAnswer: MultipleChoiceOption['id'],
  options: MultipleChoiceOption[],
  difficulty: Difficulty = 'intermedio',
  targetCorrectAnswer: MultipleChoiceOption['id'] = currentCorrectAnswer
): MultipleChoiceItem {
  return {
    id,
    themeId,
    activity: 'mcq',
    subtype,
    prompt: question,
    difficulty,
    question,
    options: reorderOptions(options, currentCorrectAnswer, targetCorrectAnswer),
    correctAnswer: targetCorrectAnswer
  };
}

export const multipleChoiceItems: MultipleChoiceItem[] = [
  mcq(
    'mcq-t1-1',
    1,
    'concepto_base',
    '¿Qué rasgo permite analizar a una plataforma como operador de facto en telecomunicaciones?',
    'a',
    [
      option(
        'a',
        'Que intermedie comunicaciones, dependa de la red y pueda condicionar acceso, visibilidad e interacción entre usuarios.'
      ),
      option(
        'b',
        'Que venda publicidad digital, procese datos de audiencia y gestione campañas comerciales para distintas marcas en línea.'
      ),
      option(
        'c',
        'Que reemplace toda la infraestructura física, absorba la señal móvil y elimine la necesidad de conectividad externa.'
      ),
      option(
        'd',
        'Que distribuya contenidos audiovisuales, acumule millones de usuarios y reciba exactamente el mismo trato regulatorio.'
      ),
      option(
        'e',
        'Que almacene datos personales, administre cuentas de usuario y cumpla obligaciones generales de privacidad digital.'
      )
    ],
    'facil',
    'c'
  ),
  mcq(
    'mcq-t1-2',
    1,
    'remedio',
    'Si una plataforma dominante bloquea integraciones de terceros y favorece funciones propias, ¿qué problema aparece?',
    'a',
    [
      option(
        'a',
        'Un problema de acceso e interoperabilidad, porque limita integraciones de terceros y fortalece el control interno.'
      ),
      option(
        'b',
        'Una competencia perfecta, porque todos participan con condiciones idénticas dentro del mismo ecosistema digital.'
      ),
      option(
        'c',
        'Una desconcentración automática, porque cerrar el acceso debilita barreras y reduce la dependencia de usuarios.'
      ),
      option(
        'd',
        'Una neutralidad de red, porque cualquier regla interna equivale al trato abierto del tráfico digital.'
      ),
      option(
        'e',
        'Una sustitución regulatoria, porque la empresa adquiere funciones públicas formales al cambiar su diseño.'
      )
    ],
    'facil',
    'e'
  ),
  mcq(
    'mcq-t2-1',
    2,
    'automatizacion',
    '¿Qué herramienta permite automatizar pagos o acciones cuando se cumplen condiciones verificables previamente definidas?',
    'a',
    [
      option('a', 'Contrato inteligente, porque ejecuta pagos o acciones cuando se cumplen condiciones verificables definidas previamente.'),
      option('b', 'Motor de búsqueda, porque organiza información pública y reemplaza la ejecución operativa de los acuerdos.'),
      option('c', 'Publicidad dirigida, porque activa respuestas comerciales y sustituye reglas programadas entre las partes participantes.'),
      option('d', 'Servicio OTT, porque intermedia mensajes y vuelve automáticas las obligaciones contractuales de cualquier acuerdo.'),
      option('e', 'Efecto de red, porque más usuarios activan por sí mismos pagos, cobros y obligaciones operativas.')
    ],
    'facil',
    'b'
  ),
  mcq(
    'mcq-t2-2',
    2,
    'identidad',
    '¿Qué práctica es más adecuada al usar blockchain para apoyar identidad digital en telecomunicaciones?',
    'c',
    [
      option(
        'a',
        'Registrar datos personales sensibles en la cadena para que cualquier participante los consulte sin controles.'
      ),
      option(
        'b',
        'Cancelar validaciones digitales y regresar solo a expedientes físicos para evitar cualquier revisión jurídica.'
      ),
      option(
        'c',
        'Usar la cadena para evidencias verificables y resguardar los datos sensibles bajo controles de acceso.'
      ),
      option(
        'd',
        'Eliminar reglas de privacidad porque una red distribuida reemplaza la supervisión institucional y el cumplimiento.'
      ),
      option(
        'e',
        'Publicar identidades completas de usuarios para simplificar contrataciones, trámites remotos y verificaciones comerciales.'
      )
    ],
    'facil',
    'd'
  ),
  mcq(
    'mcq-t3-1',
    3,
    'convergencia',
    '¿Qué describe mejor la convergencia entre telecomunicaciones y fintech en una billetera digital móvil?',
    'a',
    [
      option(
        'a',
        'Que la empresa de conectividad agrega pagos digitales usando su aplicación móvil, su red y su relación cotidiana.'
      ),
      option(
        'b',
        'Que cualquier pago en línea sustituye automáticamente bancos, reguladores y normas financieras aplicables al servicio.'
      ),
      option(
        'c',
        'Que integrar una billetera móvil garantiza por sí mismo neutralidad de red en todo el tráfico.'
      ),
      option(
        'd',
        'Que los pagos digitales dependen principalmente de contenidos audiovisuales y no de autenticación ni infraestructura.'
      ),
      option(
        'e',
        'Que toda recarga desde el celular convierte al usuario en proveedor formal de servicios financieros.'
      )
    ],
    'facil'
  ),
  mcq(
    'mcq-t3-2',
    3,
    'inclusion',
    '¿Qué resultado puede generar el uso del celular para pagos en zonas con baja bancarización?',
    'd',
    [
      option(
        'a',
        'La eliminación automática de supervisión financiera, porque los pagos móviles reemplazan reglas prudenciales básicas.'
      ),
      option(
        'b',
        'La desaparición de la red telecom, porque las transferencias operan sin cobertura, señal ni dispositivos.'
      ),
      option(
        'c',
        'La conversión de cualquier usuario móvil en banco formal, por el simple uso de pagos digitales.'
      ),
      option(
        'd',
        'La inclusión financiera apoyada en telecomunicaciones, porque la conectividad móvil acerca operaciones básicas a más personas.'
      ),
      option(
        'e',
        'La neutralidad de red financiera, porque toda transacción asegura igualdad total entre proveedores y usuarios.'
      )
    ],
    'facil'
  ),
  mcq(
    'mcq-t4-1',
    4,
    'regulacion',
    '¿Qué justifica revisar de forma específica a una plataforma de transporte o reparto?',
    'e',
    [
      option(
        'a',
        'Que usar una aplicación móvil la excluye de obligaciones públicas sobre el servicio que organiza.'
      ),
      option(
        'b',
        'Que conectar usuarios la vuelve concesionaria de telecomunicaciones y gestora formal del espectro.'
      ),
      option(
        'c',
        'Que solo vende publicidad digital y no influye en precios, acceso ni reputaciones operativas.'
      ),
      option(
        'd',
        'Que el mercado lo forman usuarios y prestadores, sin intervención económica relevante de la aplicación.'
      ),
      option(
        'e',
        'Que no solo conecta partes, también organiza tarifas, reputaciones, acceso y reglas centrales del servicio.'
      )
    ],
    'facil'
  ),
  mcq(
    'mcq-t4-2',
    4,
    'laboral',
    'En una plataforma de reparto, ¿qué aspecto vuelve más relevante el debate laboral y regulatorio?',
    'a',
    [
      option(
        'a',
        'La posible subordinación o control relevante, porque la plataforma dirige tareas, incentivos, sanciones y acceso.'
      ),
      option(
        'b',
        'La desaparición automática de obligaciones laborales, porque toda relación gestionada por app queda fuera.'
      ),
      option(
        'c',
        'La equivalencia con un concesionario telecom, porque coordinar pedidos digitales convierte el servicio en red.'
      ),
      option(
        'd',
        'La imposibilidad de revisar algoritmos, porque las reglas privadas quedan fuera de cualquier análisis jurídico.'
      ),
      option(
        'e',
        'La neutralidad de red, porque el problema central consiste solo en mover paquetes de datos.'
      )
    ],
    'facil',
    'c'
  ),
  mcq(
    'mcq-t5-1',
    5,
    'competencia',
    '¿Qué problema aparece cuando una plataforma coloca primero sus propios productos frente a vendedores rivales?',
    'b',
    [
      option(
        'a',
        'Un caso de competencia perfecta, porque todos reciben la misma visibilidad y oportunidades de venta.'
      ),
      option(
        'b',
        'Un problema de autopreferencia, porque la plataforma favorece sus propios servicios y altera la competencia.'
      ),
      option(
        'c',
        'Una práctica neutral, porque el orden de visualización no cambia atención, comparación ni decisiones.'
      ),
      option(
        'd',
        'Un efecto desconcentrador, porque promover productos propios reduce automáticamente el poder de mercado.'
      ),
      option(
        'e',
        'Una cuestión de radiodifusión, porque los resultados de búsqueda equivalen a contenidos audiovisuales.'
      )
    ],
    'facil'
  ),
  mcq(
    'mcq-t5-2',
    5,
    'consumidor',
    '¿Qué riesgo surge cuando una plataforma no permite descargar o trasladar fácilmente datos y contactos?',
    'a',
    [
      option(
        'a',
        'Un riesgo de encerramiento del usuario, porque la falta de portabilidad eleva costos de cambio.'
      ),
      option(
        'b',
        'Un caso de competencia perfecta, porque varias plataformas disponibles bastan para garantizar libertad real.'
      ),
      option(
        'c',
        'Un ejemplo de neutralidad de red, porque el problema depende solo de la velocidad del tráfico.'
      ),
      option(
        'd',
        'Una ventaja para el consumidor, porque impedir la migración reduce decisiones difíciles y comparaciones frecuentes.'
      ),
      option(
        'e',
        'Un asunto de radiodifusión, porque historiales y archivos guardados equivalen a transmisiones públicas.'
      )
    ],
    'facil'
  )
];
