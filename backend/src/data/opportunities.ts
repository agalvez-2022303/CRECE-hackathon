// ──────────────────────────────────────────────
// CRECE — Mock Data: Oportunidades Laborales con Metadatos Ricos
// ──────────────────────────────────────────────

export interface Opportunity {
  id: string;
  title: string;
  tagline: string;
  company: string;
  companyVerified: boolean;
  companyType: "Empresa Privada" | "Corporativo" | "Organización Social" | "Alianza Público-Privada";
  location: string;
  type: string; // "Tiempo Completo" | "Medio Tiempo" | "Pasantía Remunerada" | "Por Proyecto"
  salary: string;
  duration: string;
  vacancies: number;
  vacanciesText: string;
  modality: "Presencial" | "Híbrido" | "100% Remoto";
  deadline: string;
  difficultyLevel: "Sin experiencia requerida" | "Nivel Inicial" | "Intermedio";
  heroImage: string;
  badgeColor: string;
  category: "comercio" | "administracion" | "ventas" | "tecnologia" | "agricultura" | "marketing" | "logistica" | "turismo" | "diseño";
  categoryLabel: string;
  whatIsIt: string;
  whatIncludes: string[];
  description: string;
  requirements: string[]; // skill IDs
  requirementLabels: string[]; // display names
  hiringProcess: string[];
}

export const opportunities: Opportunity[] = [
  {
    id: "op1",
    title: "Especialista en Atención al Cliente & Caja",
    tagline: "Sé la primera sonrisa de nuestra tienda insignia en Ciudad de Guatemala",
    company: "Distribuidora El Quetzal",
    companyVerified: true,
    companyType: "Corporativo",
    location: "Zona 10, Ciudad de Guatemala",
    type: "Tiempo Completo",
    salary: "Q3,500 - Q4,000 / mes",
    duration: "Contrato indefinido (con periodo de prueba de 2 meses)",
    vacancies: 6,
    vacanciesText: "6 plazas activas de contratación inmediata",
    modality: "Presencial",
    deadline: "Cierra en 4 días",
    difficultyLevel: "Sin experiencia requerida",
    heroImage: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80",
    badgeColor: "emerald",
    category: "comercio",
    categoryLabel: "Atención & Retail",
    whatIsIt: "Posición orientada a jóvenes entusiastas que desean integrarse a una de las cadenas comerciales con mayor trayectoria del país, atendiendo público en sucursal y gestionando puntos de venta modernos.",
    whatIncludes: [
      "Salario base mensual + Bono por puntualidad y servicio",
      "Prestaciones de ley completas (Bono 14, Aguinaldo, IGSS, IRTRA)",
      "Capacitación inicial pagada de 2 semanas en sistemas de facturación",
      "Uniforme completo de trabajo sin costo",
      "Plan de carrera interno con opción a supervisor en 12 meses",
      "Descuento especial de empleado del 20% en todos los productos"
    ],
    description: "Buscamos jóvenes con actitud proactiva para brindar atención cálida a compradores, resolver consultas frecuentes, registrar pagos en sistema POS y mantener el orden del piso de venta.",
    requirements: ["customer_service", "communication", "basic_computer"],
    requirementLabels: ["Atención al cliente y servicio", "Comunicación empática", "Computación básica"],
    hiringProcess: [
      "Postulación en 1 clic en CRECE",
      "Entrevista rápida de 15 minutos (virtual o presencial)",
      "Inducción guiada e inicio de labores"
    ]
  },
  {
    id: "op2",
    title: "Asistente Administrativo & Gestión Documental",
    tagline: "Desarrolla tus habilidades de oficina en un equipo contable de alto crecimiento",
    company: "Servicios Contables Marroquín & Asoc.",
    companyVerified: true,
    companyType: "Empresa Privada",
    location: "Zona 9, Ciudad de Guatemala",
    type: "Tiempo Completo",
    salary: "Q4,200 - Q4,800 / mes",
    duration: "Contrato indefinido",
    vacancies: 3,
    vacanciesText: "3 plazas disponibles para egresados de diversificado",
    modality: "Híbrido",
    deadline: "Convocatoria abierta para este mes",
    difficultyLevel: "Nivel Inicial",
    heroImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    badgeColor: "indigo",
    category: "administracion",
    categoryLabel: "Administración & Finanzas",
    whatIsIt: "Una oportunidad clave para dar el salto profesional en ambiente corporativo, apoyando en la preparación de reportes, control de archivos digitales y atención a clientes de consultoría.",
    whatIncludes: [
      "Salario competitivo sobre el mínimo legal",
      "Modalidad flexible: 3 días presencial y 2 días home office",
      "Laptop corporativa y línea telefónica asignada",
      "Beca del 50% para estudios universitarios en finanzas/administración",
      "Seguro médico privado cubierto al 100% por la empresa"
    ],
    description: "Serás el motor administrativo: organizando documentación digital, redactando correspondencia formal, consolidando reportes en hojas de cálculo y coordinando agenda de reuniones.",
    requirements: ["excel", "communication", "basic_computer", "organization"],
    requirementLabels: ["Excel intermedio/básico", "Comunicación formal", "Computación y correo", "Organización y detalle"],
    hiringProcess: [
      "Revisión de perfil CRECE",
      "Prueba práctica sencilla de Excel en línea",
      "Entrevista con el socio fundador y bienvenida"
    ]
  },
  {
    id: "op3",
    title: "Embajador/a de Ventas & Relaciones Comerciales",
    tagline: "Conecta las mejores fincas de café con cafeterías de especialidad y hoteles",
    company: "Cafés de Occidente S.A.",
    companyVerified: true,
    companyType: "Empresa Privada",
    location: "Quetzaltenango y Altiplano",
    type: "Tiempo Completo",
    salary: "Q3,200 base + Comisiones (Promedio Q5,500)",
    duration: "Contrato fijo a largo plazo",
    vacancies: 4,
    vacanciesText: "4 plazas para rutas del Occidente del país",
    modality: "Presencial",
    deadline: "Últimos cupos",
    difficultyLevel: "Nivel Inicial",
    heroImage: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80",
    badgeColor: "amber",
    category: "ventas",
    categoryLabel: "Ventas & Comercio",
    whatIsIt: "Puesto dinámico de campo enfocado en apertura de mercado para café tostado premium producido por cooperativas guatemaltecas galardonadas internacionalmente.",
    whatIncludes: [
      "Salario base asegurado + escala de comisiones sin tope",
      "Combustible y viáticos de ruta cubiertos al 100%",
      "Teléfono inteligente con paquete ilimitado de datos",
      "Curso certificado de Barismo y Catación de Café",
      "Comisiones liquidadas quincenalmente"
    ],
    description: "Visitarás clientes asignados en Quetzaltenango y alrededores, demostrando muestras de café, gestionando pedidos y manteniendo relaciones de confianza a largo plazo.",
    requirements: ["customer_service", "communication", "driving_license"],
    requirementLabels: ["Orientación al cliente", "Habilidad para conectar y comunicar", "Licencia de conducir vigente (tipo B o M)"],
    hiringProcess: [
      "Contacto directo por WhatsApp de talento humano",
      "Demostración guiada de producto",
      "Asignación de zona e inicio con acompañamiento"
    ]
  },
  {
    id: "op4",
    title: "Junior IT Support Specialist & Redes",
    tagline: "Inicia tu carrera tech brindando soporte a infraestructura de computación en la nube",
    company: "Tecno GT Cloud Solutions",
    companyVerified: true,
    companyType: "Corporativo",
    location: "Zona 4, Campus Tecnológico, Ciudad de Guatemala",
    type: "Tiempo Completo",
    salary: "Q5,500 - Q6,500 / mes",
    duration: "Contrato indefinido con plan de ascensos",
    vacancies: 5,
    vacanciesText: "5 vacantes abiertas para talentos jóvenes",
    modality: "Híbrido",
    deadline: "Cierra en 1 semana",
    difficultyLevel: "Intermedio",
    heroImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    badgeColor: "sky",
    category: "tecnologia",
    categoryLabel: "Tecnología & Redes",
    whatIsIt: "El punto de partida ideal para entrar a la industria tecnológica moderna: configurarás estaciones de trabajo, resolverás incidencias de conectividad y darás soporte de primer nivel a usuarios corporativos.",
    whatIncludes: [
      "Salario tech inicial por encima del mercado",
      "Acceso a certificaciones oficiales de Microsoft, AWS y Cisco cubiertas",
      "Instalaciones en el Tec con áreas de descanso y café gourmet libre",
      "Seguro de vida y gastos médicos mayores",
      "Presupuesto anual de educación tecnológica de $500 USD"
    ],
    description: "Brindarás asistencia técnica remota y presencial, diagnosticarás problemas en sistemas Windows/Linux, configurarás switches, routers y accesos seguros a servidores cloud.",
    requirements: ["basic_computer", "networks", "customer_service", "hardware"],
    requirementLabels: ["Sistemas operativos y software", "Redes TCP/IP y cableado", "Atención paciente a usuarios", "Mantenimiento preventivo de hardware"],
    hiringProcess: [
      "Postulación en CRECE",
      "Desafío práctico guiado en laboratorio virtual",
      "Entrevista con el líder de ingeniería e incorporación"
    ]
  },
  {
    id: "op5",
    title: "Operador/a y Monitor de Maquinaria de Precisión",
    tagline: "Tecnología aplicada al agro sostenible en la costa sur de Guatemala",
    company: "Grupo Agromaya Sostenible",
    companyVerified: true,
    companyType: "Corporativo",
    location: "Escuintla / Autopista Puerto Quetzal",
    type: "Tiempo Completo",
    salary: "Q4,800 - Q5,400 / mes + Bonos",
    duration: "Contrato permanente",
    vacancies: 8,
    vacanciesText: "8 plazas con transporte desde cabecera de Escuintla",
    modality: "Presencial",
    deadline: "Convocatoria abierta",
    difficultyLevel: "Nivel Inicial",
    heroImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
    badgeColor: "lime",
    category: "agricultura",
    categoryLabel: "Agroindustria & Operaciones",
    whatIsIt: "Trabajo técnico con tractores e implementos modernos guiados por GPS para agricultura de precisión y exportación de productos agrícolas certificados internacionalmente.",
    whatIncludes: [
      "Transporte corporativo gratuito ida y vuelta desde puntos clave",
      "Alimentación subsidiada en comedor de planta",
      "Equipo de protección personal de grado industrial",
      "Certificación técnica avalada por INTECAP",
      "Bono de productividad por hectárea eficiente"
    ],
    description: "Operarás tractores, monitores de siembra y cosechadoras modernas, siguiendo normas de seguridad industrial y reportando métricas operativas al equipo agronómico.",
    requirements: ["driving_license", "machinery_operation", "physical_ability"],
    requirementLabels: ["Licencia de conducir pesada o liviana", "Conocimiento básico de mecánica/maquinaria", "Buena condición física"],
    hiringProcess: [
      "Revisión de solicitud",
      "Prueba de manejo y pericia en finca",
      "Examen médico ocupacional y contratación"
    ]
  },
  {
    id: "op6",
    title: "Junior Content Creator & Community Manager",
    tagline: "Crea historias visuales, reels y gestiona comunidades de marcas locales vibrantes",
    company: "Agencia Creativa Xela Digital",
    companyVerified: true,
    companyType: "Empresa Privada",
    location: "Quetzaltenango / Trabajo Remoto disponible",
    type: "Medio Tiempo",
    salary: "Q2,800 - Q3,500 / mes",
    duration: "Contrato renovable de 6 meses a indefinido",
    vacancies: 2,
    vacanciesText: "2 plazas ideales para estudiantes universitarios",
    modality: "100% Remoto",
    deadline: "Cierra en 3 días",
    difficultyLevel: "Sin experiencia requerida",
    heroImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
    badgeColor: "purple",
    category: "marketing",
    categoryLabel: "Marketing Digital & Redes",
    whatIsIt: "Un rol 100% creativo donde podrás experimentar con tendencias de TikTok, Instagram y diseño ágil para potenciar negocios gastronómicos y culturales de Guatemala.",
    whatIncludes: [
      "Horario 100% flexible adaptado a tus estudios",
      "Suscripciones premium a Canva Pro, CapCut Pro y suites de IA creativa",
      "Mentoría directa de directores de arte galardonados",
      "Estipendio mensual para conexión de internet de alta velocidad",
      "Portafolio profesional con marcas reconocidas"
    ],
    description: "Diseñarás piezas gráficas sencillas, grabarás y editarás videos cortos con tu celular, programarás parrillas de contenido e interactuarás con la comunidad en comentarios y mensajes directos.",
    requirements: ["social_media", "basic_computer", "communication", "creativity"],
    requirementLabels: ["Manejo de TikTok, IG y Facebook", "Computación y herramientas online", "Excelente ortografía y redacción", "Creatividad visual y buen gusto"],
    hiringProcess: [
      "Envío de muestras de contenido o perfil de redes",
      "Prueba de creatividad rápida de 24h",
      "Bienvenida al equipo creativo"
    ]
  },
  {
    id: "op7",
    title: "Auxiliar de Logística & Control de Inventarios",
    tagline: "Forma parte del engranaje que mueve el comercio regional de Centroamérica",
    company: "Importadora Centro Américas",
    companyVerified: true,
    companyType: "Corporativo",
    location: "Villa Nueva / Calzada Aguilar Batres",
    type: "Tiempo Completo",
    salary: "Q3,400 - Q3,900 / mes",
    duration: "Contrato indefinido",
    vacancies: 7,
    vacanciesText: "7 plazas de ingreso inmediato",
    modality: "Presencial",
    deadline: "Abierta todo el mes",
    difficultyLevel: "Sin experiencia requerida",
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    badgeColor: "teal",
    category: "logistica",
    categoryLabel: "Logística & Almacén",
    whatIsIt: "Una posición estable en el centro logístico más moderno del sur de la metrópoli, trabajando con escáneres inalámbricos y sistemas de control de stock de última generación.",
    whatIncludes: [
      "Salario puntual + Pago de horas extra reglamentarias",
      "Bono anual por cero mermas e inventario perfecto",
      "Cursos de montacargas y logística con certificación",
      "Seguro contra accidentes laborales",
      "Clínica médica interna en las instalaciones"
    ],
    description: "Recepción de contenedores, escaneo y verificación de códigos de barras, ubicación de paquetes en estanterías automatizadas y despacho de pedidos a sucursales.",
    requirements: ["physical_ability", "organization", "teamwork"],
    requirementLabels: ["Disponibilidad de movilidad y fuerza", "Sentido de orden y cuidado", "Capacidad de colaborar en equipo"],
    hiringProcess: [
      "Registro en CRECE",
      "Visita y recorrido al centro logístico",
      "Firma de contrato e inicio de turno"
    ]
  },
  {
    id: "op8",
    title: "Anfitrión/a de Hospitalidad & Recepción Bilingüe",
    tagline: "Comparte la cultura y belleza de Guatemala con viajeros de todo el planeta",
    company: "Hotel Boutique & Spa Jade Verde",
    companyVerified: true,
    companyType: "Empresa Privada",
    location: "Antigua Guatemala, Sacatepéquez",
    type: "Tiempo Completo",
    salary: "Q4,500 - Q5,200 / mes + Propinas",
    duration: "Contrato indefinido",
    vacancies: 3,
    vacanciesText: "3 plazas en el corazón de La Antigua",
    modality: "Presencial",
    deadline: "Cierra esta semana",
    difficultyLevel: "Nivel Inicial con Inglés",
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    badgeColor: "rose",
    category: "turismo",
    categoryLabel: "Turismo & Hospitalidad",
    whatIsIt: "El trabajo soñado para quienes aman los idiomas y las relaciones humanas en una de las ciudades coloniales más emblemáticas del mundo.",
    whatIncludes: [
      "Salario base superior + Propinas internacionales directas",
      "Alimentación completa durante el turno en restaurante gourmet",
      "Cursos de perfeccionamiento de inglés y francés pagados",
      "Ambiente de trabajo histórico rodeado de jardines y volcanes",
      "Tarifas preferenciales en hoteles asociados a nivel mundial"
    ],
    description: "Darás la bienvenida a huéspedes internacionales, gestionarás check-ins/check-outs mediante software hotelero en la nube, coordinarás tours y brindarás recomendaciones locales de valor.",
    requirements: ["english", "customer_service", "communication", "basic_computer"],
    requirementLabels: ["Inglés conversacional (B1+)", "Calidez y hospitalidad", "Facilidad de expresión verbal", "Manejo de sistemas de reservación"],
    hiringProcess: [
      "Postulación en CRECE",
      "Charla breve en inglés para evaluar fluidez conversacional",
      "Jornada de inducción en hotel"
    ]
  },
  {
    id: "op9",
    title: "Diseñador/a Gráfico Junior & Diseñador de Empaques",
    tagline: "Crea empaques, etiquetas y material publicitario para marcas de consumo masivo",
    company: "PrintExpress & Packaging Guatemala",
    companyVerified: true,
    companyType: "Empresa Privada",
    location: "Zona 12, Ciudad de Guatemala",
    type: "Tiempo Completo",
    salary: "Q4,000 - Q4,600 / mes",
    duration: "Contrato indefinido",
    vacancies: 2,
    vacanciesText: "2 plazas para talentos visuales",
    modality: "Híbrido",
    deadline: "Convocatoria activa",
    difficultyLevel: "Nivel Inicial",
    heroImage: "https://images.unsplash.com/photo-1572044160444-124b8981f21f?auto=format&fit=crop&w=1200&q=80",
    badgeColor: "fuchsia",
    category: "diseño",
    categoryLabel: "Diseño & Creatividad",
    whatIsIt: "Taller creativo y productivo donde verás tus diseños impresos en millones de productos en los supermercados de toda la región.",
    whatIncludes: [
      "Equipo Apple iMac de última generación en el estudio",
      "Tableta gráfica profesional Wacom asignada",
      "Suscripción completa a Adobe Creative Cloud y Figma Pro",
      "Viernes de jornada corta (medio día)",
      "Capacitación en técnicas avanzadas de preprensa e impresión digital"
    ],
    description: "Adaptarás artes a formatos de impresión, crearás mockups 3D de empaques, prepararás archivos listos para imprenta y colaborarás estrechamente con el equipo de ventas y producción.",
    requirements: ["design_tools", "creativity", "basic_computer", "social_media"],
    requirementLabels: ["Manejo de Canva, Illustrator o Figma", "Sentido de composición y color", "Manejo de archivos y carpetas", "Conocimiento de formatos para redes"],
    hiringProcess: [
      "Envío de portafolio o proyectos personales",
      "Ejercicio práctico de diseño de etiqueta",
      "Entrevista creativa y contratación"
    ]
  },
  {
    id: "op10",
    title: "Digitador/a & Validador de Datos Clínicos",
    tagline: "Tu precisión apoyará el registro médico digital de centros hospitalarios",
    company: "Centro de Datos Kinal Tech",
    companyVerified: true,
    companyType: "Organización Social",
    location: "Zona 7, Ciudad de Guatemala",
    type: "Medio Tiempo (Mañana o Tarde)",
    salary: "Q2,400 - Q2,800 / mes",
    duration: "Convenio inicial de 1 año renovable",
    vacancies: 10,
    vacanciesText: "10 plazas disponibles — excelente para primer empleo",
    modality: "Presencial",
    deadline: "Convocatoria permanente",
    difficultyLevel: "Sin experiencia requerida",
    heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    badgeColor: "cyan",
    category: "administracion",
    categoryLabel: "Administración & Datos",
    whatIsIt: "Un entorno seguro, silencioso y altamente estructurado, perfecto para jóvenes que buscan su primer empleo formal con horarios compatibles con estudios nocturnos o de fin de semana.",
    whatIncludes: [
      "Horarios fijos de 4 horas diarias sin rotación imprevista",
      "Instalaciones con aire acondicionado y ergonomía de primer nivel",
      "Certificado laboral de competencias en digitación y validación",
      "Bono mensual por cumplimiento de metas de precisión",
      "Café, té y snacks saludables ilimitados"
    ],
    description: "Ingreso de expedientes médicos físicos a bases de datos digitales seguras, verificación cruzada de campos numéricos y corrección de inconsistencias tipográficas.",
    requirements: ["basic_computer", "organization", "typing"],
    requirementLabels: ["Uso ágil de teclado y mouse", "Atención rigurosa a números y nombres", "Mecanografía rápida (>40 palabras por minuto)"],
    hiringProcess: [
      "Prueba de velocidad de tipeo en 3 minutos",
      "Breve entrevista de motivación",
      "Capacitación de 3 días e inicio inmediato"
    ]
  }
];
