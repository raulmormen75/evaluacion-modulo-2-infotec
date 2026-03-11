import type { MultipleChoiceItem } from './types';

export const multipleChoiceItems: MultipleChoiceItem[] = [
  {
    id: 'mcq-t1-1',
    themeId: 1,
    activity: 'mcq',
    subtype: 'definicion',
    prompt: '¿Qué vuelve a una plataforma un operador de facto en telecomunicaciones?',
    difficulty: 'facil',
    question: '¿Qué vuelve a una plataforma un operador de facto en telecomunicaciones?',
    options: [
      { id: 'a', text: 'Que condicione de hecho el acceso, la visibilidad o la comunicación aunque no posea la red.' },
      { id: 'b', text: 'Que tenga una sucursal bancaria en cada estado del país.' },
      { id: 'c', text: 'Que solo venda publicidad impresa.' },
      { id: 'd', text: 'Que preste servicios sin usar internet.' },
      { id: 'e', text: 'Que elimine todo tratamiento de datos.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t1-2',
    themeId: 1,
    activity: 'mcq',
    subtype: 'definicion',
    prompt: '¿Qué describe mejor a un mercado multilateral?',
    difficulty: 'facil',
    question: '¿Qué describe mejor a un mercado multilateral?',
    options: [
      { id: 'a', text: 'Un mercado donde solo importa el precio final del producto físico.' },
      { id: 'b', text: 'Un esquema donde una plataforma conecta grupos distintos que se benefician mutuamente.' },
      { id: 'c', text: 'Un mercado público donde todos los servicios son gratuitos por ley.' },
      { id: 'd', text: 'Una red que no necesita usuarios para generar valor.' },
      { id: 'e', text: 'Una tienda en la que no intervienen datos ni reglas privadas.' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'mcq-t1-3',
    themeId: 1,
    activity: 'mcq',
    subtype: 'conceptual',
    prompt: '¿Qué expresan los efectos de red en plataformas digitales?',
    difficulty: 'facil',
    question: '¿Qué expresan los efectos de red en plataformas digitales?',
    options: [
      { id: 'a', text: 'Que el valor del servicio crece conforme participan más usuarios o grupos conectados.' },
      { id: 'b', text: 'Que toda plataforma debe cobrar la misma tarifa.' },
      { id: 'c', text: 'Que la regulación desaparece cuando aumenta la audiencia.' },
      { id: 'd', text: 'Que el tráfico de red siempre baja cuando hay más usuarios.' },
      { id: 'e', text: 'Que la plataforma deja de competir cuando usa anuncios.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t1-4',
    themeId: 1,
    activity: 'mcq',
    subtype: 'reconocimiento',
    prompt: '¿Cuál es un ejemplo de servicio OTT mencionado en el módulo?',
    difficulty: 'facil',
    question: '¿Cuál es un ejemplo de servicio OTT mencionado en el módulo?',
    options: [
      { id: 'a', text: 'Un concesionario de espectro radioeléctrico.' },
      { id: 'b', text: 'Una ventanilla de atención municipal.' },
      { id: 'c', text: 'Una aplicación de mensajería que opera sobre internet.' },
      { id: 'd', text: 'Una fábrica de terminales sin conexión a internet.' },
      { id: 'e', text: 'Un archivo PDF sin interacción digital.' }
    ],
    correctAnswer: 'c'
  },
  {
    id: 'mcq-t1-5',
    themeId: 1,
    activity: 'mcq',
    subtype: 'caso_mexicano',
    prompt: '¿Por qué el «zero rating» puede generar un problema competitivo?',
    difficulty: 'intermedio',
    question: '¿Por qué el «zero rating» puede generar un problema competitivo?',
    options: [
      { id: 'a', text: 'Porque obliga a todos los usuarios a pagar con criptomonedas.' },
      { id: 'b', text: 'Porque prioriza comercialmente ciertas aplicaciones y puede distorsionar la elección del usuario.' },
      { id: 'c', text: 'Porque impide toda clase de innovación en equipos terminales.' },
      { id: 'd', text: 'Porque elimina el uso de datos personales por completo.' },
      { id: 'e', text: 'Porque prohíbe cualquier acuerdo entre operadores y comercios.' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'mcq-t1-6',
    themeId: 1,
    activity: 'mcq',
    subtype: 'caso_mexicano',
    prompt: '¿Qué mostró el caso Uber-Cornershop en México?',
    difficulty: 'intermedio',
    question: '¿Qué mostró el caso Uber-Cornershop en México?',
    options: [
      { id: 'a', text: 'Que no existe competencia en mercados de telecomunicaciones.' },
      { id: 'b', text: 'Que las plataformas no pueden ser analizadas como mercados multilaterales.' },
      { id: 'c', text: 'Que hay fricciones para definir qué autoridad debe analizar integraciones tecnológicas complejas.' },
      { id: 'd', text: 'Que las plataformas están fuera de cualquier revisión regulatoria.' },
      { id: 'e', text: 'Que la neutralidad de la red ya resuelve toda la competencia digital.' }
    ],
    correctAnswer: 'c'
  },
  {
    id: 'mcq-t1-7',
    themeId: 1,
    activity: 'mcq',
    subtype: 'regulacion',
    prompt: '¿Por qué la neutralidad de la red es necesaria pero no suficiente?',
    difficulty: 'intermedio',
    question: '¿Por qué la neutralidad de la red es necesaria pero no suficiente?',
    options: [
      { id: 'a', text: 'Porque solo atiende la capa física y las plataformas pueden cerrar la capa lógica.' },
      { id: 'b', text: 'Porque solo se aplica a redes satelitales.' },
      { id: 'c', text: 'Porque obliga a usar un solo sistema operativo.' },
      { id: 'd', text: 'Porque elimina las fusiones entre plataformas.' },
      { id: 'e', text: 'Porque prohíbe la portabilidad de datos.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t1-8',
    themeId: 1,
    activity: 'mcq',
    subtype: 'aplicacion',
    prompt: '¿Qué buscan la interoperabilidad y la portabilidad en este tema?',
    difficulty: 'intermedio',
    question: '¿Qué buscan la interoperabilidad y la portabilidad en este tema?',
    options: [
      { id: 'a', text: 'Aumentar artificialmente los costos de salida del usuario.' },
      { id: 'b', text: 'Reducir costos de cambio y abrir el ecosistema a la competencia.' },
      { id: 'c', text: 'Sustituir toda la regulación por decisiones privadas.' },
      { id: 'd', text: 'Bloquear el tráfico de servicios pequeños.' },
      { id: 'e', text: 'Eliminar la función de los concesionarios de red.' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'mcq-t1-9',
    themeId: 1,
    activity: 'mcq',
    subtype: 'comparacion',
    prompt: '¿Qué rasgo comparten los marcos recientes de la Unión Europea y el Reino Unido?',
    difficulty: 'intermedio',
    question: '¿Qué rasgo comparten los marcos recientes de la Unión Europea y el Reino Unido?',
    options: [
      { id: 'a', text: 'Se basan solo en sanciones ex post y renuncian a obligaciones preventivas.' },
      { id: 'b', text: 'Buscan imponer obligaciones ex ante a plataformas con gran poder de acceso.' },
      { id: 'c', text: 'Eliminan toda revisión de interoperabilidad.' },
      { id: 'd', text: 'Trasladan el control al sector bancario.' },
      { id: 'e', text: 'Prohíben el análisis de mercados digitales en competencia.' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'mcq-t1-10',
    themeId: 1,
    activity: 'mcq',
    subtype: 'alcance',
    prompt: 'Según el módulo, ¿qué activo ayuda a las plataformas a concentrar poder además del tráfico?',
    difficulty: 'intermedio',
    question: 'Según el módulo, ¿qué activo ayuda a las plataformas a concentrar poder además del tráfico?',
    options: [
      { id: 'a', text: 'La captura de datos y el control de la atención.' },
      { id: 'b', text: 'La producción agrícola estacional.' },
      { id: 'c', text: 'La desaparición total de los efectos de red.' },
      { id: 'd', text: 'El cierre de todos los mercados multilaterales.' },
      { id: 'e', text: 'La prohibición de cualquier interfaz móvil.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t2-1',
    themeId: 2,
    activity: 'mcq',
    subtype: 'definicion',
    prompt: '¿Qué combina la criptoeconomía según el módulo?',
    difficulty: 'facil',
    question: '¿Qué combina la criptoeconomía según el módulo?',
    options: [
      { id: 'a', text: 'Criptografía, incentivos, diseño de mecanismos y tecnologías de registro distribuido.' },
      { id: 'b', text: 'Solo minería de criptomonedas y publicidad digital.' },
      { id: 'c', text: 'Únicamente banca tradicional y telefonía fija.' },
      { id: 'd', text: 'Exclusivamente redes sociales y comercio minorista.' },
      { id: 'e', text: 'Nada más archivos en la nube sin validación.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t2-2',
    themeId: 2,
    activity: 'mcq',
    subtype: 'diferenciacion',
    prompt: '¿Qué diferencia marca el módulo entre DLT y blockchain?',
    difficulty: 'intermedio',
    question: '¿Qué diferencia marca el módulo entre DLT y blockchain?',
    options: [
      { id: 'a', text: 'No existe diferencia: ambos términos siempre significan exactamente lo mismo.' },
      { id: 'b', text: 'Toda DLT es pública y toda blockchain es privada.' },
      { id: 'c', text: 'DLT es una categoría amplia y blockchain es una de sus arquitecturas posibles.' },
      { id: 'd', text: 'Blockchain es un sistema bancario y DLT es un buscador.' },
      { id: 'e', text: 'DLT solo aplica a videojuegos y blockchain solo a impuestos.' }
    ],
    correctAnswer: 'c'
  },
  {
    id: 'mcq-t2-3',
    themeId: 2,
    activity: 'mcq',
    subtype: 'aplicacion',
    prompt: '¿Para qué sirven los contratos inteligentes en telecomunicaciones?',
    difficulty: 'intermedio',
    question: '¿Para qué sirven los contratos inteligentes en telecomunicaciones?',
    options: [
      { id: 'a', text: 'Para reemplazar toda la regulación financiera por completo.' },
      { id: 'b', text: 'Para ejecutar reglas programadas en procesos como liquidación o itinerancia cuando se cumplen condiciones.' },
      { id: 'c', text: 'Para eliminar la necesidad de auditar sistemas.' },
      { id: 'd', text: 'Para volver irrelevante la identidad digital.' },
      { id: 'e', text: 'Para impedir el uso de nodos en una red.' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'mcq-t2-4',
    themeId: 2,
    activity: 'mcq',
    subtype: 'estado_del_arte',
    prompt: '¿Por qué la literatura del módulo privilegia redes permisionadas o de consorcio?',
    difficulty: 'intermedio',
    question: '¿Por qué la literatura del módulo privilegia redes permisionadas o de consorcio?',
    options: [
      { id: 'a', text: 'Porque facilitan control de acceso, gobernanza auditable y cumplimiento normativo.' },
      { id: 'b', text: 'Porque eliminan todo riesgo de concentración.' },
      { id: 'c', text: 'Porque permiten ignorar la jurisdicción aplicable.' },
      { id: 'd', text: 'Porque hacen inútiles los estándares abiertos.' },
      { id: 'e', text: 'Porque sustituyen por completo a cualquier base de datos.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t2-5',
    themeId: 2,
    activity: 'mcq',
    subtype: 'riesgo',
    prompt: '¿Cuál es un riesgo económico de las redes permisionadas?',
    difficulty: 'intermedio',
    question: '¿Cuál es un riesgo económico de las redes permisionadas?',
    options: [
      { id: 'a', text: 'Que vuelven imposible toda auditoría.' },
      { id: 'b', text: 'Que pueden formar consorcios privados excluyentes si no hay interoperabilidad.' },
      { id: 'c', text: 'Que obligan a usar dinero en efectivo.' },
      { id: 'd', text: 'Que hacen desaparecer la protección de datos.' },
      { id: 'e', text: 'Que impiden el uso de contratos entre operadores.' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'mcq-t2-6',
    themeId: 2,
    activity: 'mcq',
    subtype: 'caso_mexicano',
    prompt: '¿Qué efecto tuvo la Circular 4/2019 del Banco de México en este campo?',
    difficulty: 'intermedio',
    question: '¿Qué efecto tuvo la Circular 4/2019 del Banco de México en este campo?',
    options: [
      { id: 'a', text: 'Autorizó libremente cualquier activo virtual para usuarios finales.' },
      { id: 'b', text: 'Impuso un régimen prudencial que evita trasladar al usuario final el riesgo de activos virtuales.' },
      { id: 'c', text: 'Eliminó la supervisión financiera sobre fintech.' },
      { id: 'd', text: 'Prohibió toda adopción técnica de DLT en telecomunicaciones.' },
      { id: 'e', text: 'Sustituyó al IFT como autoridad sectorial.' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'mcq-t2-7',
    themeId: 2,
    activity: 'mcq',
    subtype: 'cumplimiento',
    prompt: '¿Qué significa el principio de territorialidad en PLD mencionado en el módulo?',
    difficulty: 'intermedio',
    question: '¿Qué significa el principio de territorialidad en PLD mencionado en el módulo?',
    options: [
      { id: 'a', text: 'Que no importa dónde se ofrezca el servicio si la red es descentralizada.' },
      { id: 'b', text: 'Que las obligaciones antilavado aplican si el servicio se comercializa a residentes mexicanos, aunque la infraestructura esté fuera.' },
      { id: 'c', text: 'Que solo las empresas con oficinas físicas deben cumplir.' },
      { id: 'd', text: 'Que la descentralización excluye toda jurisdicción nacional.' },
      { id: 'e', text: 'Que el cumplimiento corresponde solo a proveedores extranjeros.' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'mcq-t2-8',
    themeId: 2,
    activity: 'mcq',
    subtype: 'proteccion_de_datos',
    prompt: '¿Por qué el módulo recomienda tratar datos sensibles fuera de la cadena principal?',
    difficulty: 'intermedio',
    question: '¿Por qué el módulo recomienda tratar datos sensibles fuera de la cadena principal?',
    options: [
      { id: 'a', text: 'Porque la inmutabilidad puede chocar con derechos de cancelación, rectificación u oposición.' },
      { id: 'b', text: 'Porque fuera de la cadena no existen riesgos de seguridad.' },
      { id: 'c', text: 'Porque así desaparece toda necesidad de verificación.' },
      { id: 'd', text: 'Porque la ley exige usar papel para la identidad digital.' },
      { id: 'e', text: 'Porque toda blockchain pública queda prohibida por definición.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t2-9',
    themeId: 2,
    activity: 'mcq',
    subtype: 'uso_sectorial',
    prompt: '¿Cuál es un uso sectorial de DLT citado en el módulo?',
    difficulty: 'facil',
    question: '¿Cuál es un uso sectorial de DLT citado en el módulo?',
    options: [
      { id: 'a', text: 'Liquidación entre operadores y administración de itinerancia.' },
      { id: 'b', text: 'Producción de espectáculos deportivos.' },
      { id: 'c', text: 'Venta de boletos de cine sin internet.' },
      { id: 'd', text: 'Sustitución total del espectro radioeléctrico.' },
      { id: 'e', text: 'Eliminación de toda base de datos de facturación.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t2-10',
    themeId: 2,
    activity: 'mcq',
    subtype: 'evaluacion',
    prompt: '¿Qué debe demostrar una red DLT para tener sentido económico en telecomunicaciones?',
    difficulty: 'intermedio',
    question: '¿Qué debe demostrar una red DLT para tener sentido económico en telecomunicaciones?',
    options: [
      { id: 'a', text: 'Solo novedad tecnológica y publicidad suficiente.' },
      { id: 'b', text: 'Una reducción neta en latencia, fraude o costo de conciliación frente a alternativas simples.' },
      { id: 'c', text: 'Que emite un activo virtual para cualquier usuario minorista.' },
      { id: 'd', text: 'Que elimina la necesidad de definir responsabilidad civil.' },
      { id: 'e', text: 'Que impide toda intervención regulatoria.' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'mcq-t3-1',
    themeId: 3,
    activity: 'mcq',
    subtype: 'definicion',
    prompt: '¿Qué significa la convergencia entre fintech y telecomunicaciones en el módulo?',
    difficulty: 'facil',
    question: '¿Qué significa la convergencia entre fintech y telecomunicaciones en el módulo?',
    options: [
      { id: 'a', text: 'Que el teléfono móvil se vuelve una interfaz de acceso financiero, autenticación y datos.' },
      { id: 'b', text: 'Que la banca deja de usar cualquier infraestructura digital.' },
      { id: 'c', text: 'Que solo importan las sucursales físicas.' },
      { id: 'd', text: 'Que desaparece toda autoridad financiera.' },
      { id: 'e', text: 'Que la conectividad ya no influye en los pagos.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t3-2',
    themeId: 3,
    activity: 'mcq',
    subtype: 'evolucion',
    prompt: '¿Con qué soluciones se materializó la primera fase de esta convergencia?',
    difficulty: 'facil',
    question: '¿Con qué soluciones se materializó la primera fase de esta convergencia?',
    options: [
      { id: 'a', text: 'Con dinero móvil y carteras digitales.' },
      { id: 'b', text: 'Con satélites meteorológicos.' },
      { id: 'c', text: 'Con impresos notariales.' },
      { id: 'd', text: 'Con servicios de televisión abierta exclusivamente.' },
      { id: 'e', text: 'Con tarjetas sin interfaz móvil.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t3-3',
    themeId: 3,
    activity: 'mcq',
    subtype: 'definicion',
    prompt: '¿Qué permite una API en el contexto de finanzas abiertas?',
    difficulty: 'facil',
    question: '¿Qué permite una API en el contexto de finanzas abiertas?',
    options: [
      { id: 'a', text: 'Intercambiar datos y funciones entre sistemas con reglas técnicas definidas.' },
      { id: 'b', text: 'Eliminar toda autenticación del usuario.' },
      { id: 'c', text: 'Bloquear cualquier integración con terceros.' },
      { id: 'd', text: 'Sustituir al banco central.' },
      { id: 'e', text: 'Cobrar por cada clic dentro de una app.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t3-4',
    themeId: 3,
    activity: 'mcq',
    subtype: 'caso_mexicano',
    prompt: '¿Qué relación correcta existe entre SPEI y CoDi según el módulo?',
    difficulty: 'intermedio',
    question: '¿Qué relación correcta existe entre SPEI y CoDi según el módulo?',
    options: [
      { id: 'a', text: 'CoDi reemplaza al SPEI y elimina la liquidación interbancaria.' },
      { id: 'b', text: 'SPEI es el riel de liquidación y CoDi funciona como capa de pagos móviles sobre esa infraestructura.' },
      { id: 'c', text: 'Ambos son servicios privados sin participación del Banco de México.' },
      { id: 'd', text: 'CoDi solo sirve para telefonía fija.' },
      { id: 'e', text: 'SPEI solo se usa para comercio exterior en papel.' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'mcq-t3-5',
    themeId: 3,
    activity: 'mcq',
    subtype: 'obstaculo',
    prompt: '¿Cuál es un obstáculo señalado para las finanzas abiertas en México?',
    difficulty: 'intermedio',
    question: '¿Cuál es un obstáculo señalado para las finanzas abiertas en México?',
    options: [
      { id: 'a', text: 'Que ya no existen instituciones financieras dominantes.' },
      { id: 'b', text: 'Que las integraciones pueden retrasarse o degradarse aunque la obligación exista en la norma.' },
      { id: 'c', text: 'Que las API no pueden medir tiempos de respuesta.' },
      { id: 'd', text: 'Que la interoperabilidad solo aplica a telecomunicaciones fijas.' },
      { id: 'e', text: 'Que los usuarios no usan dispositivos móviles.' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'mcq-t3-6',
    themeId: 3,
    activity: 'mcq',
    subtype: 'competencia',
    prompt: '¿Por qué la interoperabilidad funciona como herramienta antimonopolio en este tema?',
    difficulty: 'intermedio',
    question: '¿Por qué la interoperabilidad funciona como herramienta antimonopolio en este tema?',
    options: [
      { id: 'a', text: 'Porque obliga a que todos cobren exactamente lo mismo.' },
      { id: 'b', text: 'Porque reduce cierres de ecosistema y limita la negativa de trato disfrazada de problemas técnicos.' },
      { id: 'c', text: 'Porque reemplaza la necesidad de supervisar sesgos.' },
      { id: 'd', text: 'Porque vuelve innecesarios los datos abiertos.' },
      { id: 'e', text: 'Porque elimina los rieles de pago públicos.' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'mcq-t3-7',
    themeId: 3,
    activity: 'mcq',
    subtype: 'riesgo',
    prompt: '¿Qué riesgo puede surgir al usar datos alternativos de telecomunicaciones para evaluar crédito?',
    difficulty: 'intermedio',
    question: '¿Qué riesgo puede surgir al usar datos alternativos de telecomunicaciones para evaluar crédito?',
    options: [
      { id: 'a', text: 'Sesgos algorítmicos y decisiones poco explicables para el usuario.' },
      { id: 'b', text: 'Desaparición automática de toda cartera digital.' },
      { id: 'c', text: 'Prohibición inmediata de las API bancarias.' },
      { id: 'd', text: 'Cierre total del SPEI.' },
      { id: 'e', text: 'Eliminación del consentimiento del usuario por mandato legal.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t3-8',
    themeId: 3,
    activity: 'mcq',
    subtype: 'neutralidad',
    prompt: '¿Qué vigila la idea de neutralidad transaccional?',
    difficulty: 'intermedio',
    question: '¿Qué vigila la idea de neutralidad transaccional?',
    options: [
      { id: 'a', text: 'Que operadores o plataformas no favorezcan indebidamente sus propias carteras o pagos mediante bloqueo o estrangulamiento.' },
      { id: 'b', text: 'Que toda persona use una sola aplicación bancaria.' },
      { id: 'c', text: 'Que solo los bancos tradicionales usen QR.' },
      { id: 'd', text: 'Que se cobre doble comisión en pagos rápidos.' },
      { id: 'e', text: 'Que la latencia sea irrelevante para la competencia.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t3-9',
    themeId: 3,
    activity: 'mcq',
    subtype: 'institucional',
    prompt: '¿Qué muestra la fragmentación institucional descrita en el módulo?',
    difficulty: 'intermedio',
    question: '¿Qué muestra la fragmentación institucional descrita en el módulo?',
    options: [
      { id: 'a', text: 'Que un fallo en una cartera digital puede tocar al mismo tiempo red, pagos y datos personales.' },
      { id: 'b', text: 'Que las telecomunicaciones no se relacionan con servicios financieros.' },
      { id: 'c', text: 'Que la CONDUSEF regula el espectro radioeléctrico.' },
      { id: 'd', text: 'Que el Banco de México resuelve por sí solo toda la competencia digital.' },
      { id: 'e', text: 'Que los usuarios ya no requieren mecanismos de protección.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t3-10',
    themeId: 3,
    activity: 'mcq',
    subtype: 'infraestructura_publica',
    prompt: '¿Qué advierte el módulo sobre la infraestructura pública de pagos?',
    difficulty: 'intermedio',
    question: '¿Qué advierte el módulo sobre la infraestructura pública de pagos?',
    options: [
      { id: 'a', text: 'Que basta con existir, aunque la experiencia de usuario sea deficiente.' },
      { id: 'b', text: 'Que puede subutilizarse si la experiencia de usuario y la integración en comercios son pobres.' },
      { id: 'c', text: 'Que debe excluir a los desarrolladores privados.' },
      { id: 'd', text: 'Que impide cualquier competencia en la capa de interfaz.' },
      { id: 'e', text: 'Que solo sirve para pagos internacionales.' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'mcq-t4-1',
    themeId: 4,
    activity: 'mcq',
    subtype: 'definicion',
    prompt: '¿Qué sostiene el módulo sobre la economía colaborativa en su expresión dominante?',
    difficulty: 'facil',
    question: '¿Qué sostiene el módulo sobre la economía colaborativa en su expresión dominante?',
    options: [
      { id: 'a', text: 'Que siempre es un espacio neutral entre oferta y demanda.' },
      { id: 'b', text: 'Que suele operar mediante plataformas que asignan tareas, recogen datos y fijan reglas privadas.' },
      { id: 'c', text: 'Que elimina toda asimetría entre empresa y trabajador.' },
      { id: 'd', text: 'Que solo existe en el sector turístico.' },
      { id: 'e', text: 'Que no tiene implicaciones laborales.' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'mcq-t4-2',
    themeId: 4,
    activity: 'mcq',
    subtype: 'reconocimiento',
    prompt: '¿Qué incluye la gestión algorítmica del trabajo?',
    difficulty: 'facil',
    question: '¿Qué incluye la gestión algorítmica del trabajo?',
    options: [
      { id: 'a', text: 'Asignación de tareas, monitoreo, reputación, precios dinámicos y sanciones.' },
      { id: 'b', text: 'Solo la entrega física de uniformes.' },
      { id: 'c', text: 'Únicamente campañas impresas de reclutamiento.' },
      { id: 'd', text: 'La eliminación de todo dato de geolocalización.' },
      { id: 'e', text: 'El cierre de toda interacción entre usuario y plataforma.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t4-3',
    themeId: 4,
    activity: 'mcq',
    subtype: 'aplicacion',
    prompt: '¿Qué costo suele trasladarse a la persona trabajadora en estos modelos?',
    difficulty: 'facil',
    question: '¿Qué costo suele trasladarse a la persona trabajadora en estos modelos?',
    options: [
      { id: 'a', text: 'Tiempo de espera, conectividad, depreciación del vehículo y exposición a riesgos.' },
      { id: 'b', text: 'La propiedad intelectual de la app.' },
      { id: 'c', text: 'La decisión final sobre el algoritmo de búsqueda.' },
      { id: 'd', text: 'La titularidad de todas las bases de datos corporativas.' },
      { id: 'e', text: 'La regulación de espectro radioeléctrico.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t4-4',
    themeId: 4,
    activity: 'mcq',
    subtype: 'caso_mexicano',
    prompt: '¿Qué reconoció la reforma laboral mexicana de 2024 en materia de plataformas?',
    difficulty: 'intermedio',
    question: '¿Qué reconoció la reforma laboral mexicana de 2024 en materia de plataformas?',
    options: [
      { id: 'a', text: 'Que la subordinación solo existe con supervisión física en oficina.' },
      { id: 'b', text: 'Que el mando y la supervisión pueden ejercerse mediante tecnologías de la información.' },
      { id: 'c', text: 'Que toda plataforma queda fuera del derecho laboral.' },
      { id: 'd', text: 'Que solo el usuario final define las reglas de trabajo.' },
      { id: 'e', text: 'Que las sanciones automatizadas no deben documentarse.' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'mcq-t4-5',
    themeId: 4,
    activity: 'mcq',
    subtype: 'transparencia',
    prompt: '¿Qué debe detallar una política de gestión algorítmica del trabajo?',
    difficulty: 'intermedio',
    question: '¿Qué debe detallar una política de gestión algorítmica del trabajo?',
    options: [
      { id: 'a', text: 'Solo el nombre comercial de la aplicación.' },
      { id: 'b', text: 'Los criterios para asignar viajes, construir tarifas, usar calificaciones y aplicar bloqueos.' },
      { id: 'c', text: 'Únicamente el color de la interfaz.' },
      { id: 'd', text: 'Nada sobre la lógica del algoritmo porque siempre es secreto industrial absoluto.' },
      { id: 'e', text: 'Solo los horarios de atención al cliente.' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'mcq-t4-6',
    themeId: 4,
    activity: 'mcq',
    subtype: 'seguridad_social',
    prompt: '¿Qué busca la prueba piloto obligatoria de 2025 mencionada en el módulo?',
    difficulty: 'intermedio',
    question: '¿Qué busca la prueba piloto obligatoria de 2025 mencionada en el módulo?',
    options: [
      { id: 'a', text: 'Eliminar la seguridad social en el trabajo de plataformas.' },
      { id: 'b', text: 'Combinar flexibilidad horaria con cuotas y aseguramiento para personas trabajadoras de plataforma.' },
      { id: 'c', text: 'Sustituir al IMSS por las propias aplicaciones.' },
      { id: 'd', text: 'Quitar toda retención fiscal en la fuente.' },
      { id: 'e', text: 'Prohibir el uso de geolocalización.' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'mcq-t4-7',
    themeId: 4,
    activity: 'mcq',
    subtype: 'debido_proceso',
    prompt: '¿Qué exige el debido proceso automatizado antes de una desactivación?',
    difficulty: 'intermedio',
    question: '¿Qué exige el debido proceso automatizado antes de una desactivación?',
    options: [
      { id: 'a', text: 'Notificación fundada, oportunidad de defensa y revisión humana.' },
      { id: 'b', text: 'Solo un aviso automático sin posibilidad de réplica.' },
      { id: 'c', text: 'Suspensión inmediata sin explicación.' },
      { id: 'd', text: 'La renuncia previa a cualquier reclamo.' },
      { id: 'e', text: 'Que el usuario final decida la sanción.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t4-8',
    themeId: 4,
    activity: 'mcq',
    subtype: 'no_discriminacion',
    prompt: '¿Qué debe auditar la autoridad de protección de datos en este tema?',
    difficulty: 'intermedio',
    question: '¿Qué debe auditar la autoridad de protección de datos en este tema?',
    options: [
      { id: 'a', text: 'Que las métricas de asignación no reproduzcan sesgos por ubicación, género u otros patrones injustificados.' },
      { id: 'b', text: 'Que los repartidores usen un solo modelo de teléfono.' },
      { id: 'c', text: 'Que toda evaluación del usuario sea secreta e irrevisable.' },
      { id: 'd', text: 'Que ninguna plataforma recopile datos de operación.' },
      { id: 'e', text: 'Que la aplicación funcione sin conexión permanente.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t4-9',
    themeId: 4,
    activity: 'mcq',
    subtype: 'politica_publica',
    prompt: '¿Qué equilibrio debe buscar la política pública, según el módulo?',
    difficulty: 'intermedio',
    question: '¿Qué equilibrio debe buscar la política pública, según el módulo?',
    options: [
      { id: 'a', text: 'Omitir toda regulación para no afectar la innovación.' },
      { id: 'b', text: 'Regular con criterio suficiente para evitar precarización sin ahogar la operación legítima.' },
      { id: 'c', text: 'Sustituir al algoritmo por inspecciones físicas únicamente.' },
      { id: 'd', text: 'Dejar la protección social a la calificación del usuario.' },
      { id: 'e', text: 'Eliminar toda flexibilidad horaria por regla general.' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'mcq-t4-10',
    themeId: 4,
    activity: 'mcq',
    subtype: 'alcance',
    prompt: '¿Por qué la etiqueta de «intermediaria tecnológica» resulta insuficiente?',
    difficulty: 'intermedio',
    question: '¿Por qué la etiqueta de «intermediaria tecnológica» resulta insuficiente?',
    options: [
      { id: 'a', text: 'Porque la plataforma también diseña el mercado y disciplina el trabajo mediante reglas y datos.' },
      { id: 'b', text: 'Porque toda app se considera automáticamente banco.' },
      { id: 'c', text: 'Porque la plataforma no participa en la formación de precios.' },
      { id: 'd', text: 'Porque solo el consumidor define el acceso al mercado.' },
      { id: 'e', text: 'Porque el software nunca organiza la oferta y la demanda.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t5-1',
    themeId: 5,
    activity: 'mcq',
    subtype: 'definicion',
    prompt: '¿Qué rasgo económico distingue a los mercados digitales en el módulo?',
    difficulty: 'facil',
    question: '¿Qué rasgo económico distingue a los mercados digitales en el módulo?',
    options: [
      { id: 'a', text: 'Costos marginales cercanos a cero, efectos de red y acumulación intensiva de datos.' },
      { id: 'b', text: 'Ausencia total de datos y de economías de escala.' },
      { id: 'c', text: 'Solo ventas físicas con poca visibilidad digital.' },
      { id: 'd', text: 'Imposibilidad de integrar servicios verticalmente.' },
      { id: 'e', text: 'Mercados que nunca concentran usuarios.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t5-2',
    themeId: 5,
    activity: 'mcq',
    subtype: 'definicion',
    prompt: '¿Qué es la autopreferencia?',
    difficulty: 'facil',
    question: '¿Qué es la autopreferencia?',
    options: [
      { id: 'a', text: 'Dar prioridad a servicios propios en motores de búsqueda, tiendas o recomendaciones.' },
      { id: 'b', text: 'Permitir interoperabilidad obligatoria con terceros.' },
      { id: 'c', text: 'Reducir tarifas logísticas para cualquier competidor.' },
      { id: 'd', text: 'Publicar todos los datos del usuario sin consentimiento.' },
      { id: 'e', text: 'Eliminar el uso de algoritmos en una plataforma.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t5-3',
    themeId: 5,
    activity: 'mcq',
    subtype: 'definicion',
    prompt: '¿Qué describe mejor la colusión algorítmica?',
    difficulty: 'intermedio',
    question: '¿Qué describe mejor la colusión algorítmica?',
    options: [
      { id: 'a', text: 'El uso de software para coordinar o aprender estrategias de precios que reducen la competencia.' },
      { id: 'b', text: 'La publicación manual de listas de precios por el Estado.' },
      { id: 'c', text: 'La existencia de dos o más tiendas físicas en una ciudad.' },
      { id: 'd', text: 'La portabilidad de contactos entre plataformas.' },
      { id: 'e', text: 'La revisión humana de una cuenta suspendida.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t5-4',
    themeId: 5,
    activity: 'mcq',
    subtype: 'regulacion',
    prompt: '¿Por qué las sanciones ex post suelen ser insuficientes en estos mercados?',
    difficulty: 'intermedio',
    question: '¿Por qué las sanciones ex post suelen ser insuficientes en estos mercados?',
    options: [
      { id: 'a', text: 'Porque el daño aparece cuando la arquitectura del ecosistema ya consolidó el poder del actor dominante.' },
      { id: 'b', text: 'Porque ninguna plataforma puede recibir multas.' },
      { id: 'c', text: 'Porque solo importa el precio nominal al consumidor.' },
      { id: 'd', text: 'Porque las ventas atadas no existen en entornos digitales.' },
      { id: 'e', text: 'Porque la neutralidad de la red elimina todo riesgo de monopolio.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t5-5',
    themeId: 5,
    activity: 'mcq',
    subtype: 'caso_mexicano',
    prompt: '¿Qué identificó la COFECE en el mercado de comercio electrónico minorista?',
    difficulty: 'intermedio',
    question: '¿Qué identificó la COFECE en el mercado de comercio electrónico minorista?',
    options: [
      { id: 'a', text: 'Que no existen barreras técnicas para conectarse a logística independiente.' },
      { id: 'b', text: 'Que la visibilidad destacada y ciertos servicios integrados pueden operar como fallas de mercado estructurales.' },
      { id: 'c', text: 'Que el comercio digital no depende de algoritmos.' },
      { id: 'd', text: 'Que solo hay un actor relevante en todos los estados.' },
      { id: 'e', text: 'Que las ventas atadas benefician automáticamente al consumidor.' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'mcq-t5-6',
    themeId: 5,
    activity: 'mcq',
    subtype: 'publicidad_digital',
    prompt: '¿Qué problema resalta el módulo en el mercado de publicidad digital?',
    difficulty: 'intermedio',
    question: '¿Qué problema resalta el módulo en el mercado de publicidad digital?',
    options: [
      { id: 'a', text: 'El control simultáneo de inventario, demanda y subastas opacas puede facilitar exclusión de competidores.' },
      { id: 'b', text: 'La publicidad digital solo opera con medios impresos.' },
      { id: 'c', text: 'No hay conflictos de interés cuando una sola empresa controla toda la intermediación.' },
      { id: 'd', text: 'La opacidad algorítmica mejora por sí sola la competencia.' },
      { id: 'e', text: 'La demanda publicitaria no usa datos.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t5-7',
    themeId: 5,
    activity: 'mcq',
    subtype: 'coordinacion',
    prompt: '¿Por qué el módulo pide investigaciones conjuntas entre competencia y datos personales?',
    difficulty: 'intermedio',
    question: '¿Por qué el módulo pide investigaciones conjuntas entre competencia y datos personales?',
    options: [
      { id: 'a', text: 'Porque la acumulación de datos y el poder monopólico se refuerzan mutuamente.' },
      { id: 'b', text: 'Porque la privacidad elimina los efectos de red.' },
      { id: 'c', text: 'Porque la protección de datos sustituye al derecho del consumidor.' },
      { id: 'd', text: 'Porque los datos ya no tienen valor económico.' },
      { id: 'e', text: 'Porque solo una autoridad puede medir la latencia de una API.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t5-8',
    themeId: 5,
    activity: 'mcq',
    subtype: 'remedios_tecnicos',
    prompt: '¿Para qué sirven las auditorías de API y de latencia en este tema?',
    difficulty: 'intermedio',
    question: '¿Para qué sirven las auditorías de API y de latencia en este tema?',
    options: [
      { id: 'a', text: 'Para verificar si la interoperabilidad funciona de verdad y detectar degradaciones contra terceros.' },
      { id: 'b', text: 'Para medir únicamente la velocidad del dispositivo del usuario final.' },
      { id: 'c', text: 'Para eliminar la obligación de portabilidad.' },
      { id: 'd', text: 'Para sustituir toda evidencia técnica por declaraciones comerciales.' },
      { id: 'e', text: 'Para impedir el uso de servicios de mensajería.' }
    ],
    correctAnswer: 'a'
  },
  {
    id: 'mcq-t5-9',
    themeId: 5,
    activity: 'mcq',
    subtype: 'interdependencia',
    prompt: '¿Qué papel conserva el IFT en la competencia digital según el módulo?',
    difficulty: 'intermedio',
    question: '¿Qué papel conserva el IFT en la competencia digital según el módulo?',
    options: [
      { id: 'a', text: 'Ninguno, porque la capa lógica ya no depende de la infraestructura física.' },
      { id: 'b', text: 'Un papel relevante porque la exclusión en software se apoya en la capa física y en la regulación del tráfico.' },
      { id: 'c', text: 'Solo puede intervenir en servicios postales impresos.' },
      { id: 'd', text: 'Debe sustituir por completo a la COFECE en toda la economía digital.' },
      { id: 'e', text: 'Debe dejar sin efectos la neutralidad de la red.' }
    ],
    correctAnswer: 'b'
  },
  {
    id: 'mcq-t5-10',
    themeId: 5,
    activity: 'mcq',
    subtype: 'consumidor',
    prompt: '¿Por qué la protección al consumidor también importa en mercados digitales concentrados?',
    difficulty: 'intermedio',
    question: '¿Por qué la protección al consumidor también importa en mercados digitales concentrados?',
    options: [
      { id: 'a', text: 'Porque el daño puede aparecer como opacidad, restricciones de elección o trato desigual, no solo como aumento de precio.' },
      { id: 'b', text: 'Porque el consumidor deja de usar plataformas cuando hay datos.' },
      { id: 'c', text: 'Porque toda plataforma dominante reduce automáticamente la transparencia.' },
      { id: 'd', text: 'Porque la defensa del consumidor sustituye toda política de competencia.' },
      { id: 'e', text: 'Porque el precio es la única variable relevante en entornos digitales.' }
    ],
    correctAnswer: 'a'
  }
];
