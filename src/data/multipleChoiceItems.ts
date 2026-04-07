import type { Difficulty, MultipleChoiceItem, MultipleChoiceOption, ThemeId } from './types';

function option(id: MultipleChoiceOption['id'], text: string): MultipleChoiceOption {
  return { id, text };
}

function mcq(
  id: string,
  themeId: ThemeId,
  subtype: string,
  question: string,
  correctAnswer: MultipleChoiceOption['id'],
  options: MultipleChoiceOption[],
  difficulty: Difficulty = 'intermedio'
): MultipleChoiceItem {
  return {
    id,
    themeId,
    activity: 'mcq',
    subtype,
    prompt: question,
    difficulty,
    question,
    options,
    correctAnswer
  };
}

export const multipleChoiceItems: MultipleChoiceItem[] = [
  mcq(
    'mcq-t1-1',
    1,
    'concepto_base',
    '¿Qué convierte a una plataforma en operador de facto en telecomunicaciones?',
    'a',
    [
      option('a', 'Que condicione acceso, visibilidad o comunicación aunque no posea la red física.'),
      option('b', 'Que solo venda publicidad impresa y no use internet.'),
      option('c', 'Que opere exclusivamente con concesión bancaria.'),
      option('d', 'Que elimine cualquier tratamiento de datos del usuario.'),
      option('e', 'Que solo preste servicios presenciales.')
    ],
    'facil'
  ),
  mcq(
    'mcq-t1-2',
    1,
    'concepto_base',
    '¿Qué rasgo define mejor a un mercado multilateral?',
    'b',
    [
      option('a', 'Un mercado donde el precio final es la única variable relevante.'),
      option('b', 'Un mercado donde una plataforma conecta distintos grupos y coordina sus interacciones.'),
      option('c', 'Un esquema donde solo participa un tipo de usuario.'),
      option('d', 'Una red pública donde todo servicio debe ser gratuito por ley.'),
      option('e', 'Una estructura que no depende de datos ni audiencias.')
    ],
    'facil'
  ),
  mcq(
    'mcq-t1-3',
    1,
    'dinamica',
    '¿Qué efecto económico pueden producir los efectos de red indirectos?',
    'c',
    [
      option('a', 'Eliminar toda ventaja derivada del tamaño.'),
      option('b', 'Reducir automáticamente la dependencia de la plataforma dominante.'),
      option('c', 'Acelerar la concentración porque cada lado del mercado gana valor cuando crece el otro.'),
      option('d', 'Impedir que las plataformas se expandan hacia mercados adyacentes.'),
      option('e', 'Volver irrelevante el control de datos y audiencias.')
    ],
    'facil'
  ),
  mcq(
    'mcq-t1-4',
    1,
    'interfaz',
    'Según el documento, ¿por qué el control de una tienda de aplicaciones o de un sistema operativo puede ser más decisivo que la propiedad de la red?',
    'b',
    [
      option('a', 'Porque sustituye por completo a la infraestructura física.'),
      option('b', 'Porque controla entrada, visibilidad, compatibilidad y acceso de terceros al ecosistema.'),
      option('c', 'Porque impide cualquier regulación sectorial de telecomunicaciones.'),
      option('d', 'Porque elimina los costos de cambio entre proveedores.'),
      option('e', 'Porque hace innecesario el uso de datos para competir.')
    ]
  ),
  mcq(
    'mcq-t1-5',
    1,
    'dma',
    '¿Qué reconoce el Reglamento de Mercados Digitales al exigir interoperabilidad en ciertos servicios de mensajería?',
    'd',
    [
      option('a', 'Que la mensajería digital dejó de depender de internet.'),
      option('b', 'Que solo los operadores móviles pueden ofrecer mensajería interoperable.'),
      option('c', 'Que la publicidad digital sustituye toda discusión sobre telecomunicaciones.'),
      option('d', 'Que algunas plataformas de mensajería funcionan como infraestructuras privadas de comunicación con efectos amplios sobre competencia y acceso.'),
      option('e', 'Que la gratuidad del servicio elimina cualquier riesgo competitivo.')
    ]
  ),
  mcq(
    'mcq-t1-6',
    1,
    'comparado',
    '¿Qué empezó a operar el Reino Unido desde enero de 2025 para mercados digitales?',
    'c',
    [
      option('a', 'Un sistema que prohíbe toda investigación sobre plataformas grandes.'),
      option('b', 'Un impuesto único a cualquier servicio OTT sin análisis previo.'),
      option('c', 'Un régimen especial para empresas con Strategic Market Status y medidas procompetitivas.'),
      option('d', 'Un esquema que elimina obligaciones sobre datos e interoperabilidad.'),
      option('e', 'Una autoridad exclusiva para cableoperadoras tradicionales.')
    ]
  ),
  mcq(
    'mcq-t1-7',
    1,
    'mexico',
    '¿Qué reportó el IFT sobre la oferta OTT en México a junio de 2025?',
    'e',
    [
      option('a', 'Que solo existían 12 plataformas autorizadas.'),
      option('b', 'Que la totalidad de la oferta era de cableoperadoras.'),
      option('c', 'Que todos los servicios OTT eran de pago por suscripción.'),
      option('d', 'Que ya no había plataformas de live streaming en el país.'),
      option('e', 'Que había 104 plataformas disponibles, con modelos de negocio y origen empresarial diversos.')
    ]
  ),
  mcq(
    'mcq-t1-8',
    1,
    'estadistica',
    '¿Qué dato describe mejor la digitalización mexicana observada en el documento para 2024?',
    'b',
    [
      option('a', 'Menos de la mitad de la población usó internet y solo una tercera parte de los hogares tuvo conexión.'),
      option('b', '83.1 % de la población de seis años y más usó internet y 73.6 % de los hogares tuvo conectividad.'),
      option('c', 'Internet quedó limitado principalmente a zonas rurales.'),
      option('d', 'La mayoría de las personas usuarias se conectó desde equipos no móviles.'),
      option('e', 'Las compras por internet ya alcanzaron a toda la población usuaria.')
    ],
    'facil'
  ),
  mcq(
    'mcq-t1-9',
    1,
    'remedio',
    '¿Por qué interoperabilidad y portabilidad aparecen como remedios procompetitivos en este tema?',
    'c',
    [
      option('a', 'Porque obligan al usuario a permanecer en una sola plataforma.'),
      option('b', 'Porque sustituyen toda autoridad sectorial y de competencia.'),
      option('c', 'Porque reducen costos de cambio, facilitan uso simultáneo de servicios y bajan barreras de entrada.'),
      option('d', 'Porque eliminan cualquier necesidad de vigilar plataformas dominantes.'),
      option('e', 'Porque impiden el intercambio de datos entre usuarios.')
    ]
  ),
  mcq(
    'mcq-t1-10',
    1,
    'neutralidad',
    '¿Por qué la neutralidad de la red sigue siendo relevante en un entorno dominado por plataformas?',
    'a',
    [
      option('a', 'Porque si la red favorece ciertas aplicaciones o acuerdos de zero rating, puede distorsionar competencia y elección del usuario.'),
      option('b', 'Porque solo se aplica cuando desaparecen las plataformas digitales.'),
      option('c', 'Porque sustituye por completo a la interoperabilidad y la portabilidad.'),
      option('d', 'Porque garantiza por sí sola que no exista poder de mercado.'),
      option('e', 'Porque se limita al diseño físico de antenas y cableado.')
    ]
  ),
  mcq(
    'mcq-t2-1',
    2,
    'concepto_base',
    '¿Qué es una DLT según el documento?',
    'a',
    [
      option('a', 'Un registro compartido entre varios participantes, sincronizado y auditable.'),
      option('b', 'Una moneda digital emitida por cualquier plataforma.'),
      option('c', 'Un contrato legal que se ejecuta sin software.'),
      option('d', 'Una red telefónica cerrada que no registra eventos.'),
      option('e', 'Un servicio exclusivo de publicidad digital.')
    ],
    'facil'
  ),
  mcq(
    'mcq-t2-2',
    2,
    'diferenciacion',
    '¿Qué diferencia básica destaca el documento entre blockchain y criptomoneda?',
    'd',
    [
      option('a', 'No existe ninguna diferencia técnica ni económica entre ambas.'),
      option('b', 'La criptomoneda es una red de telecomunicaciones y blockchain es un contrato bancario.'),
      option('c', 'Blockchain solo sirve para especular y la criptomoneda para identidad digital.'),
      option('d', 'Blockchain es una infraestructura de registro y coordinación; no es sinónimo automático de criptoactivo.'),
      option('e', 'La criptomoneda siempre está permitida al público si usa blockchain.')
    ],
    'facil'
  ),
  mcq(
    'mcq-t2-3',
    2,
    'caso_de_uso',
    '¿Cuándo tiende a tener más sentido económico usar DLT en telecomunicaciones?',
    'b',
    [
      option('a', 'Cuando un solo actor controla todo el proceso y una base de datos simple basta.'),
      option('b', 'Cuando intervienen muchos actores, hay conciliaciones tardías y existen disputas sobre eventos verificables.'),
      option('c', 'Cuando el objetivo principal es emitir un criptoactivo para cualquier consumidor.'),
      option('d', 'Cuando se busca evitar toda supervisión regulatoria.'),
      option('e', 'Cuando la latencia del sistema no importa en absoluto.')
    ]
  ),
  mcq(
    'mcq-t2-4',
    2,
    'gobernanza',
    '¿Por qué la literatura de telecomunicaciones suele preferir redes permisionadas o de consorcio?',
    'c',
    [
      option('a', 'Porque eliminan por completo el riesgo de concentración.'),
      option('b', 'Porque hacen innecesaria la confidencialidad y el control de acceso.'),
      option('c', 'Porque ofrecen gobernanza más previsible, control de acceso y mejor encaje con obligaciones regulatorias.'),
      option('d', 'Porque vuelven irrelevante la interoperabilidad entre redes.'),
      option('e', 'Porque sustituyen a cualquier base de datos centralizada sin costo.')
    ]
  ),
  mcq(
    'mcq-t2-5',
    2,
    'contratos',
    '¿Qué límite concentran los contratos inteligentes en este tema?',
    'b',
    [
      option('a', 'Que solo pueden ejecutarse si existe una criptomoneda pública.'),
      option('b', 'Que dependen de reglas bien codificadas y de datos externos confiables para no ejecutar decisiones equivocadas.'),
      option('c', 'Que sustituyen al derecho contractual y eliminan la responsabilidad.'),
      option('d', 'Que no pueden aplicarse a conciliación ni liquidación.'),
      option('e', 'Que impiden toda auditoría posterior.')
    ]
  ),
  mcq(
    'mcq-t2-6',
    2,
    'oraculos',
    'Si el oráculo alimenta datos erróneos a un contrato inteligente, ¿qué problema aparece?',
    'd',
    [
      option('a', 'El sistema deja de requerir reglas de responsabilidad.'),
      option('b', 'La DLT se convierte automáticamente en servicio financiero al público.'),
      option('c', 'El error desaparece porque la cadena es inmutable.'),
      option('d', 'El contrato puede ejecutar correctamente una decisión equivocada por mala calidad del dato.'),
      option('e', 'La red se vuelve pública aunque fuera permisionada.')
    ]
  ),
  mcq(
    'mcq-t2-7',
    2,
    'estandares',
    '¿Qué aportó la UIT en 2025 al debate sobre blockchain y telecomunicaciones?',
    'c',
    [
      option('a', 'Una autorización global para comercializar criptoactivos en telecom.'),
      option('b', 'Una prohibición general sobre redes permisionadas.'),
      option('c', 'La Recomendación ITU-T M.3166.1 sobre requisitos neutrales de protocolo para interfaces de gestión blockchain.'),
      option('d', 'Una norma que elimina la necesidad de monitorear desempeño y fallas.'),
      option('e', 'Un estándar para sustituir identidades móviles por contraseñas fijas.')
    ]
  ),
  mcq(
    'mcq-t2-8',
    2,
    'mexico',
    '¿Qué hizo la Circular 4/2019 del Banco de México respecto de activos virtuales en instituciones reguladas?',
    'b',
    [
      option('a', 'Autorizó a cualquier institución a ofrecer libremente intercambio y custodia al público.'),
      option('b', 'Permitió operaciones internas con autorización previa y prohibió ofrecer directamente esos servicios a clientes.'),
      option('c', 'Convirtió a los activos virtuales en moneda de curso legal.'),
      option('d', 'Eliminó la supervisión prudencial sobre fintech.'),
      option('e', 'Obligó a todas las telecom a liquidar con tokens.')
    ]
  ),
  mcq(
    'mcq-t2-9',
    2,
    'consumidor',
    '¿Qué dato de la ENIF 2024 mostró contacto del consumidor mexicano con activos virtuales?',
    'a',
    [
      option('a', 'Que 2.1 % de la población reportó haber comprado o invertido en activos virtuales o criptomonedas.'),
      option('b', 'Que toda la población con cuenta formal ya invirtió en criptomonedas.'),
      option('c', 'Que las criptomonedas cuentan con garantía del Gobierno Federal y del Banco de México.'),
      option('d', 'Que los activos virtuales ya son moneda de curso legal en México.'),
      option('e', 'Que no existe ninguna advertencia oficial sobre riesgo para usuarios.')
    ]
  ),
  mcq(
    'mcq-t2-10',
    2,
    'datos',
    '¿Por qué el documento recomienda no subir datos personales completos a la cadena principal?',
    'd',
    [
      option('a', 'Porque los datos personales nunca pueden usarse en procesos de identidad.'),
      option('b', 'Porque la cadena bloquea toda forma de auditoría.'),
      option('c', 'Porque fuera de la cadena desaparece cualquier obligación de seguridad.'),
      option('d', 'Porque la inmutabilidad puede chocar con derechos de rectificación, supresión y minimización.'),
      option('e', 'Porque la legislación exige mantener toda identidad en papel.')
    ]
  ),
  mcq(
    'mcq-t3-1',
    3,
    'concepto_base',
    '¿Por qué el teléfono móvil se volvió el centro de la convergencia fintech-telecom?',
    'a',
    [
      option('a', 'Porque reúne autenticación, pagos, datos de comportamiento e interacción cotidiana en un solo punto.'),
      option('b', 'Porque sustituyó completamente a cualquier infraestructura de pagos.'),
      option('c', 'Porque eliminó la necesidad de regulación financiera.'),
      option('d', 'Porque convirtió a toda telecom en banco.'),
      option('e', 'Porque ya no se usa para comunicarse.')
    ],
    'facil'
  ),
  mcq(
    'mcq-t3-2',
    3,
    'evolucion',
    '¿Con qué soluciones se expresó primero esta convergencia?',
    'b',
    [
      option('a', 'Con buscadores generales y redes sociales.'),
      option('b', 'Con dinero móvil y carteras digitales.'),
      option('c', 'Con espectro satelital y televisión abierta.'),
      option('d', 'Con contratos inteligentes para roaming.'),
      option('e', 'Con sistemas de alojamiento temporal.')
    ],
    'facil'
  ),
  mcq(
    'mcq-t3-3',
    3,
    'open_finance',
    '¿Qué diferencia hay entre open banking y open finance en este tema?',
    'c',
    [
      option('a', 'Open finance se limita a cuentas bancarias y open banking incluye otros datos.'),
      option('b', 'No existe diferencia funcional entre ambos conceptos.'),
      option('c', 'Open banking se concentra más en datos bancarios; open finance amplía el perímetro hacia otros productos y actores.'),
      option('d', 'Open finance excluye cualquier uso de API.'),
      option('e', 'Open banking solo aplica a telecomunicaciones.')
    ]
  ),
  mcq(
    'mcq-t3-4',
    3,
    'api',
    '¿Qué exige el artículo 76 de la Ley Fintech en materia de datos financieros?',
    'b',
    [
      option('a', 'Eliminar todo intercambio de datos entre participantes.'),
      option('b', 'Establecer interfaces estandarizadas para compartir datos bajo interoperabilidad, seguridad y consentimiento.'),
      option('c', 'Reservar las API solo para bancos extranjeros.'),
      option('d', 'Usar el número celular como sustituto de toda cuenta bancaria.'),
      option('e', 'Prohibir que las fintech accedan a información abierta.')
    ]
  ),
  mcq(
    'mcq-t3-5',
    3,
    'infraestructura',
    '¿Qué es un riel de pago en la lógica del documento?',
    'd',
    [
      option('a', 'Una campaña comercial para vender servicios móviles.'),
      option('b', 'Un contrato privado entre dos carteras digitales.'),
      option('c', 'Un sistema de lealtad basado en puntos promocionales.'),
      option('d', 'La infraestructura que mueve dinero con rapidez, bajo costo y certeza operativa.'),
      option('e', 'Un registro contable sin posibilidad de liquidación.')
    ],
    'facil'
  ),
  mcq(
    'mcq-t3-6',
    3,
    'comparado',
    '¿Qué combinación favorece, según la evidencia internacional, la adopción de pagos rápidos en mercados convergentes?',
    'a',
    [
      option('a', 'Participación pública activa, acceso de actores no bancarios y más casos de uso interoperables.'),
      option('b', 'Cerrar el sistema a cualquier participante no bancario.'),
      option('c', 'Mantener comisiones altas para desincentivar el uso masivo.'),
      option('d', 'Separar por completo telecomunicaciones y pagos en la operación cotidiana.'),
      option('e', 'Eliminar toda responsabilidad frente a fraude.')
    ]
  ),
  mcq(
    'mcq-t3-7',
    3,
    'singapur',
    '¿Qué muestra el caso de Singapur citado en el documento?',
    'e',
    [
      option('a', 'Que la convergencia funciona mejor si solo participan bancos tradicionales.'),
      option('b', 'Que los fraudes de phishing deben recaer solo en el usuario final.'),
      option('c', 'Que los rieles rápidos no requieren reglas de licenciamiento claras.'),
      option('d', 'Que las telecomunicaciones no tienen relación con la confianza en pagos.'),
      option('e', 'Que puede haber acceso directo de no bancos a FAST y PayNow, además de responsabilidades compartidas contra fraude entre finanzas y telecom.')
    ]
  ),
  mcq(
    'mcq-t3-8',
    3,
    'mexico',
    '¿Qué relación correcta existe entre SPEI y CoDi según el documento?',
    'b',
    [
      option('a', 'CoDi reemplazó al SPEI como sistema de liquidación interbancaria.'),
      option('b', 'SPEI es el riel de liquidación y CoDi funciona como capa de cobro y pago sobre esa infraestructura.'),
      option('c', 'CoDi opera solo fuera del sistema del Banco de México.'),
      option('d', 'Ambos son mecanismos exclusivos para pagos internacionales.'),
      option('e', 'SPEI y CoDi dejaron de vincularse con dispositivos móviles.')
    ]
  ),
  mcq(
    'mcq-t3-9',
    3,
    'dimo',
    '¿Qué informó Banxico sobre Dimo en diciembre de 2024?',
    'c',
    [
      option('a', 'Que Dimo ya había sustituido por completo a todas las transferencias SPEI.'),
      option('b', 'Que solo una institución financiera seguía en el esquema.'),
      option('c', 'Que existían 21 instituciones financieras participantes y más de 11 millones de cuentas vinculadas.'),
      option('d', 'Que Dimo dejó de usar el número celular como identificador operativo.'),
      option('e', 'Que Dimo era ya el único medio autorizado para pagos de gobierno.')
    ]
  ),
  mcq(
    'mcq-t3-10',
    3,
    'consumidor',
    '¿Qué dato de la ENIF 2024 muestra el desplazamiento de la relación financiera hacia el móvil?',
    'd',
    [
      option('a', 'La desaparición de las cuentas de ahorro formal.'),
      option('b', 'Que toda la población adulta usa pagos digitales diariamente.'),
      option('c', 'Que la banca móvil dejó de crecer entre 2021 y 2024.'),
      option('d', 'Que el uso de la app del celular para consultar o mover recursos pasó de 54.3 % a 69.1 % entre personas con cuenta de ahorro formal.'),
      option('e', 'Que el número celular ya sustituyó cualquier mecanismo de autenticación.')
    ]
  ),
  mcq(
    'mcq-t4-1',
    4,
    'concepto_base',
    '¿Qué sostiene el documento sobre la llamada economía colaborativa en su forma dominante?',
    'b',
    [
      option('a', 'Que siempre es un espacio neutral de cooperación entre particulares.'),
      option('b', 'Que opera mediante plataformas con fines de lucro que organizan mercados, reglas y acceso.'),
      option('c', 'Que solo existe en actividades turísticas sin relación laboral.'),
      option('d', 'Que elimina toda asimetría entre empresas y personas usuarias.'),
      option('e', 'Que ya no requiere regulación por funcionar en internet.')
    ],
    'facil'
  ),
  mcq(
    'mcq-t4-2',
    4,
    'gestion',
    '¿Qué incluye la gestión algorítmica del trabajo?',
    'a',
    [
      option('a', 'Asignación de tareas, monitoreo, reputación, precios dinámicos y sanciones.'),
      option('b', 'Solo la contratación inicial de una persona trabajadora.'),
      option('c', 'Únicamente la revisión manual de vacaciones.'),
      option('d', 'La eliminación total de datos de desempeño.'),
      option('e', 'Solo la promoción comercial de la aplicación.')
    ],
    'facil'
  ),
  mcq(
    'mcq-t4-3',
    4,
    'subordinacion',
    '¿Por qué la flexibilidad horaria no basta para descartar una relación laboral en plataformas?',
    'c',
    [
      option('a', 'Porque toda persona conectada se vuelve empleadora.'),
      option('b', 'Porque la flexibilidad solo importa en alojamiento temporal.'),
      option('c', 'Porque lo decisivo es quién controla precios, tareas, sanciones, métricas y permanencia.'),
      option('d', 'Porque la ley exige un horario fijo para cualquier aplicación.'),
      option('e', 'Porque el algoritmo nunca interviene en la prestación.')
    ]
  ),
  mcq(
    'mcq-t4-4',
    4,
    'comparado',
    '¿Qué incorporó la Directiva europea sobre trabajo en plataformas?',
    'b',
    [
      option('a', 'La prohibición general de cualquier aplicación de reparto o transporte.'),
      option('b', 'Una presunción rebatible de relación laboral y reglas sobre gestión algorítmica e información.'),
      option('c', 'La desaparición de toda revisión humana de decisiones automatizadas.'),
      option('d', 'Un régimen exclusivo para hoteles tradicionales.'),
      option('e', 'La eliminación de obligaciones en materia de datos personales.')
    ]
  ),
  mcq(
    'mcq-t4-5',
    4,
    'alojamiento',
    '¿Qué busca el Reglamento 2024/1028 en materia de alquileres de corta estancia?',
    'd',
    [
      option('a', 'Prohibir cualquier forma de alojamiento temporal intermediado por plataformas.'),
      option('b', 'Sustituir la regulación laboral por normas turísticas.'),
      option('c', 'Eliminar la obligación de compartir datos con autoridades públicas.'),
      option('d', 'Ordenar recolección e intercambio de datos para gobernar mejor el impacto del alojamiento temporal.'),
      option('e', 'Limitar el uso de medios de pago digitales en turismo.')
    ]
  ),
  mcq(
    'mcq-t4-6',
    4,
    'escala',
    '¿Qué dato muestra que estas plataformas ya operan a gran escala internacional?',
    'e',
    [
      option('a', 'Que solo funcionan en nichos locales muy pequeños.'),
      option('b', 'Que dejaron de crecer en 2025.'),
      option('c', 'Que la mayor parte de sus operaciones sigue siendo experimental.'),
      option('d', 'Que no tienen impacto en turismo, movilidad ni empleo.'),
      option('e', 'Que Uber reportó 202 millones de consumidores activos mensuales y Airbnb más de 9 millones de anuncios activos al cierre de 2025.')
    ]
  ),
  mcq(
    'mcq-t4-7',
    4,
    'mexico',
    '¿Qué reconoció la reforma mexicana publicada el 24 de diciembre de 2024?',
    'a',
    [
      option('a', 'Que puede existir subordinación ejercida mediante tecnologías de la información y que las plataformas deben transparentar su gestión algorítmica.'),
      option('b', 'Que las plataformas quedaron fuera de cualquier obligación laboral.'),
      option('c', 'Que la seguridad social ya no aplica al trabajo en plataformas.'),
      option('d', 'Que solo los gobiernos locales pueden revisar estas relaciones.'),
      option('e', 'Que la plataforma es siempre un intermediario neutral.')
    ]
  ),
  mcq(
    'mcq-t4-8',
    4,
    'imss',
    '¿Qué muestra la implementación mexicana de 2025 en materia de seguridad social para plataformas?',
    'c',
    [
      option('a', 'Que el IMSS cerró el tema sin prueba piloto ni seguimiento.'),
      option('b', 'Que la prueba piloto inició en 2024 y terminó sin datos públicos.'),
      option('c', 'Que la prueba piloto inició el 1 de julio de 2025 y al cuarto mes el IMSS reportó 1,114,147 personas beneficiadas.'),
      option('d', 'Que solo se permitió la afiliación de plataformas de alojamiento.'),
      option('e', 'Que la incorporación al seguro social quedó prohibida para repartidores y conductores.')
    ]
  ),
  mcq(
    'mcq-t4-9',
    4,
    'consumidor',
    '¿Por qué las herramientas de PROFECO no bastan por sí solas para regular este ecosistema?',
    'd',
    [
      option('a', 'Porque solo pueden aplicarse a compras en efectivo.'),
      option('b', 'Porque eliminan toda necesidad de transparencia algorítmica.'),
      option('c', 'Porque sustituyen la política laboral y urbana de forma automática.'),
      option('d', 'Porque ayudan en información y conciliación, pero no reemplazan una política específica para plataformas de transporte, reparto o alojamiento.'),
      option('e', 'Porque están prohibidas en comercio digital.')
    ]
  ),
  mcq(
    'mcq-t4-10',
    4,
    'alcance',
    '¿Debe regularse igual una plataforma de reparto que una de alojamiento?',
    'b',
    [
      option('a', 'Sí, porque producen exactamente los mismos daños y usan idénticos incentivos.'),
      option('b', 'No, porque comparten problemas de intermediación y datos, pero no afectan igual trabajo, vivienda y territorio.'),
      option('c', 'Sí, porque toda plataforma digital queda dentro del mismo riesgo laboral.'),
      option('d', 'No, porque las plataformas de alojamiento no usan datos ni reputación.'),
      option('e', 'Sí, porque la regulación comparada exige una sola receta para todos los modelos.')
    ]
  ),
  mcq(
    'mcq-t5-1',
    5,
    'concepto_base',
    '¿Por qué el precio no basta para medir poder de mercado en plataformas digitales?',
    'a',
    [
      option('a', 'Porque una plataforma puede cobrar cero a un lado del mercado y aun así capturar rentas por datos, publicidad o comisiones.'),
      option('b', 'Porque en mercados digitales ya no existen efectos de red.'),
      option('c', 'Porque el precio siempre sube de inmediato cuando hay concentración.'),
      option('d', 'Porque las plataformas no monetizan datos ni atención.'),
      option('e', 'Porque la competencia digital solo ocurre en mercados físicos.')
    ],
    'facil'
  ),
  mcq(
    'mcq-t5-2',
    5,
    'conducta',
    '¿Qué es la autopreferencia?',
    'c',
    [
      option('a', 'La obligación de abrir datos a cualquier competidor sin reglas.'),
      option('b', 'La neutralidad técnica de una plataforma frente a todos sus servicios.'),
      option('c', 'La práctica de favorecer servicios, productos o resultados propios dentro del ecosistema que la plataforma controla.'),
      option('d', 'La portabilidad completa de datos de un usuario a otro proveedor.'),
      option('e', 'La eliminación del uso de algoritmos en recomendaciones.')
    ],
    'facil'
  ),
  mcq(
    'mcq-t5-3',
    5,
    'consumo_competencia',
    '¿Por qué competencia y protección al consumidor están conectadas en mercados digitales?',
    'b',
    [
      option('a', 'Porque la protección al consumidor sustituye cualquier análisis de poder de mercado.'),
      option('b', 'Porque una interfaz que confunde o manipula al usuario también puede desplazar a rivales más transparentes.'),
      option('c', 'Porque solo importa la publicidad engañosa y no la estructura del mercado.'),
      option('d', 'Porque la rivalidad entre empresas elimina cualquier daño individual.'),
      option('e', 'Porque el tratamiento de datos ya no afecta decisiones de compra.')
    ]
  ),
  mcq(
    'mcq-t5-4',
    5,
    'remedios',
    '¿Qué tipo de respuesta institucional consideran hoy la OCDE y el DMA para mercados digitales?',
    'd',
    [
      option('a', 'Esperar siempre al daño consumado y después imponer una multa aislada.'),
      option('b', 'Limitar el análisis a precios visibles para el consumidor final.'),
      option('c', 'Sustituir la competencia por educación digital voluntaria.'),
      option('d', 'Combinar obligaciones ex ante, portabilidad, interoperabilidad y reglas conductuales verificables.'),
      option('e', 'Prohibir cualquier integración entre servicios digitales distintos.')
    ]
  ),
  mcq(
    'mcq-t5-5',
    5,
    'dma',
    '¿Qué muestra la fase reciente de aplicación del DMA en Europa?',
    'c',
    [
      option('a', 'Que el DMA quedó suspendido antes de designar guardianes de acceso.'),
      option('b', 'Que la Comisión Europea dejó de exigir reportes de cumplimiento y perfilado.'),
      option('c', 'Que el debate ya pasó del diseño normativo al seguimiento empírico del cumplimiento y a investigaciones concretas.'),
      option('d', 'Que el DMA solo atiende precios de boletos y hospedaje temporal.'),
      option('e', 'Que los guardianes de acceso ya no publican información sobre su operación.')
    ]
  ),
  mcq(
    'mcq-t5-6',
    5,
    'ftc',
    '¿Qué buscó atender la regla emitida por la FTC en 2024?',
    'a',
    [
      option('a', 'Cobros injustos o engañosos, precios fragmentados y tarifas ocultas.'),
      option('b', 'La eliminación total de la publicidad digital personalizada.'),
      option('c', 'La prohibición de toda tienda de aplicaciones en Estados Unidos.'),
      option('d', 'La sustitución de la política de competencia por conciliación voluntaria.'),
      option('e', 'La cancelación de cualquier recomendación algorítmica.')
    ]
  ),
  mcq(
    'mcq-t5-7',
    5,
    'cma',
    '¿Qué compromisos obtuvo la CMA de Apple y Google en febrero de 2026?',
    'e',
    [
      option('a', 'Eliminar toda revisión de aplicaciones por seguridad.'),
      option('b', 'Cerrar por completo el acceso de desarrolladores externos a sus plataformas.'),
      option('c', 'Prohibir cualquier forma de interoperabilidad en iOS.'),
      option('d', 'Cobrar una tarifa única obligatoria a toda app publicada.'),
      option('e', 'Mejorar la equidad en procesos de publicación de apps y reforzar interoperabilidad en iOS.')
    ]
  ),
  mcq(
    'mcq-t5-8',
    5,
    'mexico',
    '¿Qué mostró en México el emplazamiento informado por COFECE en 2023 sobre publicidad digital?',
    'b',
    [
      option('a', 'Que la publicidad digital ya no presenta riesgos de opacidad ni exclusión.'),
      option('b', 'Que la autoridad identificó posibles prácticas anticompetitivas en un mercado donde la intermediación algorítmica puede generar conflictos de interés.'),
      option('c', 'Que la publicidad digital quedó fuera de cualquier análisis de competencia.'),
      option('d', 'Que la única preocupación mexicana son las compras en efectivo.'),
      option('e', 'Que la visibilidad del usuario no depende de plataformas ni subastas.')
    ]
  ),
  mcq(
    'mcq-t5-9',
    5,
    'regulacion',
    '¿México ya cuenta con una regulación equivalente al DMA europeo?',
    'd',
    [
      option('a', 'Sí, y además aplica obligaciones automáticas a cualquier sitio de comercio electrónico.'),
      option('b', 'Sí, porque PROFECO ya designa guardianes de acceso.'),
      option('c', 'Sí, porque la publicidad digital quedó resuelta con una sola norma.'),
      option('d', 'No, México sigue operando con herramientas valiosas pero fragmentadas en competencia, consumo y datos.'),
      option('e', 'No, porque renunció por completo a intervenir en mercados digitales.')
    ]
  ),
  mcq(
    'mcq-t5-10',
    5,
    'transparencia',
    '¿Por qué el documento pide fortalecer obligaciones de transparencia sobre precio total, recomendaciones y cancelación?',
    'c',
    [
      option('a', 'Porque en mercados digitales el usuario no necesita comparar ofertas.'),
      option('b', 'Porque la transparencia solo sirve para cumplir con formalidades documentales.'),
      option('c', 'Porque esas variables influyen en la decisión del consumidor y en la posibilidad de competir sin engaño ni manipulación.'),
      option('d', 'Porque el perfilado algorítmico ya no tiene impacto económico.'),
      option('e', 'Porque mostrar menos información reduce por definición el daño competitivo.')
    ]
  ),
];
