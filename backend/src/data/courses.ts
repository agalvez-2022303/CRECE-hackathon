// ──────────────────────────────────────────────
// CRECE — Mock Data: Cursos y Becas Gratuitas con Metadatos Ricos
// ──────────────────────────────────────────────

export interface Course {
  id: string;
  title: string;
  tagline: string;
  organization: string;
  orgType: "Certificación Internacional" | "Fundación Global" | "Instituto Técnico Nacional" | "Plataforma Educativa";
  orgVerified: boolean;
  skillTaught: string;
  skillLabel: string;
  duration: string;
  modality: "100% Online Asincrónico" | "Online con Sesiones en Vivo" | "Híbrido con Talleres Prácticos";
  link: string;
  tags: string[];
  isFree: boolean;
  scholarshipCoverage: string; // ej: "Beca 100% Gratuita"
  spotsAvailable: string; // ej: "Cupos Ilimitados Abiertos", "50 Becas Financiadas"
  certificateIncluded: boolean;
  certificateType: "Certificado Oficial Verificable" | "Insignia Digital LinkedIn" | "Título Técnico Avalado";
  heroImage: string;
  badgeColor: string;
  whatIsIt: string;
  whatIncludes: string[];
  level: "Desde Cero (Principiantes)" | "Intermedio" | "Todos los Niveles";
  modulesCount: number;
}

export const courses: Course[] = [
  {
    id: "c1",
    title: "Certificación Profesional en Marketing Digital & E-Commerce",
    tagline: "Aprende a vender por internet, optimizar anuncios en Google y crear estrategias en redes",
    organization: "Google Skillshop & Google Career Certificates",
    orgType: "Certificación Internacional",
    orgVerified: true,
    skillTaught: "social_media",
    skillLabel: "Marketing Digital & Redes",
    duration: "4 semanas (aprox. 20 horas en total)",
    modality: "100% Online Asincrónico",
    link: "https://skillshop.withgoogle.com/",
    tags: ["marketing", "tecnologia", "emprendimiento", "diseño"],
    isFree: true,
    scholarshipCoverage: "Beca 100% Gratuita con Aval de Google",
    spotsAvailable: "Convocatoria Abierta Permanente",
    certificateIncluded: true,
    certificateType: "Certificado Oficial Verificable",
    heroImage: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1000&q=80",
    badgeColor: "blue",
    whatIsIt: "El programa oficial de Google diseñado para que jóvenes de Latinoamérica adquieran habilidades prácticas en pauta publicitaria, métricas digitales y gestión de tiendas online sin costo alguno.",
    whatIncludes: [
      "Certificado oficial emitido por Google con código de verificación QR",
      "Acceso directo a simuladores de campañas de Google Ads y YouTube",
      "Plantillas descargables de planes de marketing y calendarios de contenido",
      "Insignia digital para compartir directamente en tu perfil de LinkedIn",
      "Bolsa de talento con acceso a empresas aliadas de Google en Centroamérica"
    ],
    level: "Desde Cero (Principiantes)",
    modulesCount: 7
  },
  {
    id: "c2",
    title: "Networking Essentials & Ciberseguridad Inicial",
    tagline: "Domina la infraestructura que sostiene internet y abre puertas en soporte IT global",
    organization: "Cisco Networking Academy (NetAcad)",
    orgType: "Certificación Internacional",
    orgVerified: true,
    skillTaught: "networks",
    skillLabel: "Redes de Computadoras & IT",
    duration: "70 horas estimadas (a tu ritmo)",
    modality: "100% Online Asincrónico",
    link: "https://www.netacad.com/courses/networking/networking-essentials",
    tags: ["tecnologia", "computacion", "programacion"],
    isFree: true,
    scholarshipCoverage: "Acceso Libre Financiado por Cisco Academy",
    spotsAvailable: "Cupos Abiertos 2026",
    certificateIncluded: true,
    certificateType: "Certificado Oficial Verificable",
    heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80",
    badgeColor: "cyan",
    whatIsIt: "Cisco NetAcad te enseña los fundamentos de cómo se comunican las computadoras en una red doméstica o empresarial, preparándote para puestos de soporte técnico y certificaciones CCNA.",
    whatIncludes: [
      "Software simulador de redes Cisco Packet Tracer para prácticas virtuales",
      "Exámenes interactivos y laboratorios de configuración de routers",
      "Certificado con firma digital de Cisco Systems",
      "Insignia oficial digital Cisco Credly",
      "Preparación base para certificaciones industriales de alta demanda"
    ],
    level: "Desde Cero (Principiantes)",
    modulesCount: 16
  },
  {
    id: "c3",
    title: "Especialización en Excel Profesional & Automatización",
    tagline: "De tablas simples a dashboards interactivos, fórmulas avanzadas y análisis de datos",
    organization: "Microsoft Learn & LinkedIn Learning",
    orgType: "Certificación Internacional",
    orgVerified: true,
    skillTaught: "excel",
    skillLabel: "Excel Avanzado & Reportes",
    duration: "12 horas de contenido práctico",
    modality: "100% Online Asincrónico",
    link: "https://learn.microsoft.com/es-es/training/paths/get-started-with-microsoft-365/",
    tags: ["administracion", "empleo", "computacion", "ventas"],
    isFree: true,
    scholarshipCoverage: "Ruta 100% Libre sin Costo",
    spotsAvailable: "Acceso Ilimitado Inmediato",
    certificateIncluded: true,
    certificateType: "Insignia Digital LinkedIn",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    badgeColor: "emerald",
    whatIsIt: "La habilidad más demandada en trabajos de oficina: aprende funciones lógicas (BUSCARX, SUMAR.SI), tablas dinámicas y creación de gráficos ejecutivos para impresionar en cualquier empleo.",
    whatIncludes: [
      "Archivos .xlsx de ejercicios reales basados en casos empresariales",
      "Tutoriales paso a paso guiados por especialistas de producto de Microsoft",
      "Evaluaciones de comprobación rápida para validar conocimientos",
      "Trofeos y puntos de aprendizaje en el ecosistema Microsoft Learn",
      "Plantillas financieras y administrativas listas para usar en tu trabajo"
    ],
    level: "Todos los Niveles",
    modulesCount: 6
  },
  {
    id: "c4",
    title: "Alfabetización Digital & Herramientas Cloud para el Trabajo",
    tagline: "Aprende el uso profesional de computadoras, correo, almacenamiento en la nube y ciberseguridad personal",
    organization: "Fundación Carlos Slim (Capacítate para el Empleo)",
    orgType: "Fundación Global",
    orgVerified: true,
    skillTaught: "basic_computer",
    skillLabel: "Computación Profesional & Nube",
    duration: "20 horas (divididas en lecciones de 5 min)",
    modality: "100% Online Asincrónico",
    link: "https://capacitateparaelempleo.org/",
    tags: ["computacion", "empleo", "tecnologia", "administracion"],
    isFree: true,
    scholarshipCoverage: "Beca Social Total — 100% Gratuito",
    spotsAvailable: "Inscripciones Abiertas Todo el Año",
    certificateIncluded: true,
    certificateType: "Certificado Oficial Verificable",
    heroImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1000&q=80",
    badgeColor: "orange",
    whatIsIt: "Una formación ultra accesible creada para quienes están comenzando en el mundo digital: navegación segura, redacción en procesadores de texto, administración de carpetas y trabajo colaborativo en Google Drive y OneDrive.",
    whatIncludes: [
      "Videos didácticos animados de fácil comprensión y lenguaje claro",
      "Cero consumo de datos en compañías telefónicas participantes",
      "Certificado con folio de registro oficial descargable en PDF",
      "Guías de estudio imprimibles en formato resumen",
      "Garantía de acceso de por vida al material formativo"
    ],
    level: "Desde Cero (Principiantes)",
    modulesCount: 4
  },
  {
    id: "c5",
    title: "Excelencia en Servicio al Cliente & Protocolo Comercial",
    tagline: "Desarrolla habilidades humanas, resolución de conflictos y fidelización en puntos de venta",
    organization: "INTECAP Digital Guatemala",
    orgType: "Instituto Técnico Nacional",
    orgVerified: true,
    skillTaught: "customer_service",
    skillLabel: "Atención & Servicio al Cliente",
    duration: "40 horas con acompañamiento de instructor",
    modality: "Online con Sesiones en Vivo",
    link: "https://www.intecap.edu.gt/",
    tags: ["comercio", "ventas", "turismo", "empleo"],
    isFree: true,
    scholarshipCoverage: "Beca de Capacitación Juvenil INTECAP",
    spotsAvailable: "30 Cupos por Cohorte Mensual",
    certificateIncluded: true,
    certificateType: "Título Técnico Avalado",
    heroImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80",
    badgeColor: "amber",
    whatIsIt: "El curso de referencia técnica en Guatemala: prepárate con instructores certificados para brindar experiencias memorables, manejar quejas con empatía y aumentar las ventas mediante el buen trato.",
    whatIncludes: [
      "Sesiones interactivas de role-play y casos guatemaltecos reales",
      "Diploma avalado oficialmente por el Ministerio de Trabajo y el INTECAP",
      "Material físico y digital de protocolo de servicio",
      "Conexión directa con ferias de empleo del INTECAP a nivel nacional",
      "Evaluación práctica de expresión corporal y dicción comercial"
    ],
    level: "Desde Cero (Principiantes)",
    modulesCount: 5
  },
  {
    id: "c6",
    title: "Diseño Gráfico con Canva & Branding para Emprendedores",
    tagline: "Crea identidades visuales, logotipos, posts para Instagram y material publicitario impactante",
    organization: "Fundación Carlos Slim & Canva Design School",
    orgType: "Fundación Global",
    orgVerified: true,
    skillTaught: "design_tools",
    skillLabel: "Diseño Visual & Canva Pro",
    duration: "15 horas prácticas",
    modality: "100% Online Asincrónico",
    link: "https://capacitateparaelempleo.org/",
    tags: ["diseño", "creatividad", "marketing", "emprendimiento"],
    isFree: true,
    scholarshipCoverage: "Acceso Gratuito Ilimitado",
    spotsAvailable: "Disponible para Inicio Inmediato",
    certificateIncluded: true,
    certificateType: "Certificado Oficial Verificable",
    heroImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=80",
    badgeColor: "fuchsia",
    whatIsIt: "Transforma tus ideas en piezas gráficas profesionales: aprende teoría del color, tipografía, composición visual, animación sencilla para historias de redes y preparación de artes para impresión.",
    whatIncludes: [
      "Paquete de más de 50 plantillas editables para negocios guatemaltecos",
      "Talleres en video de diseño de empaques, volantes y catálogos digitales",
      "Certificado formal para adjuntar a tu CV o portafolio de servicios",
      "Trucos de exportación para máxima calidad en imprenta y web",
      "Comunidad activa de creadores visuales latinoamericanos"
    ],
    level: "Desde Cero (Principiantes)",
    modulesCount: 4
  },
  {
    id: "c7",
    title: "Inglés para el Entorno Laboral (Workplace English A1-B1)",
    tagline: "Aprende el vocabulario esencial para entrevistas de trabajo, correos formales y atención bilingüe",
    organization: "Duolingo for Schools & British Council Guatemala",
    orgType: "Plataforma Educativa",
    orgVerified: true,
    skillTaught: "english",
    skillLabel: "Inglés para el Trabajo",
    duration: "60 horas (a ritmo de 15 minutos diarios)",
    modality: "100% Online Asincrónico",
    link: "https://schools.duolingo.com/",
    tags: ["idiomas", "turismo", "tecnologia", "empleo"],
    isFree: true,
    scholarshipCoverage: "Beca de Idiomas 100% Gratuita",
    spotsAvailable: "Abierto a Todos los Jóvenes GT",
    certificateIncluded: true,
    certificateType: "Insignia Digital LinkedIn",
    heroImage: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1000&q=80",
    badgeColor: "green",
    whatIsIt: "Supera el miedo a hablar inglés con lecciones enfocadas en situaciones reales de trabajo: presentarte profesionalmente, responder llamadas, atender turistas extranjeros y redactar mensajes claros.",
    whatIncludes: [
      "Práctica de pronunciación con inteligencia artificial que te escucha en tiempo real",
      "Guía descargable de las 500 palabras y frases más usadas en oficinas bilingües",
      "Acceso móvil offline para aprender sin consumir tus datos de internet",
      "Reporte de progreso mensual con nivel estimado del Marco Común Europeo (CEFR)",
      "Test de nivelación inicial gratuito"
    ],
    level: "Todos los Niveles",
    modulesCount: 12
  },
  {
    id: "c8",
    title: "Mecanografía Ágil & Productividad en el Teclado",
    tagline: "Duplica tu velocidad de tipeo sin mirar el teclado y optimiza tu rendimiento en digitación",
    organization: "TypingClub International",
    orgType: "Plataforma Educativa",
    orgVerified: true,
    skillTaught: "typing",
    skillLabel: "Mecanografía & Velocidad",
    duration: "10 horas de juegos interactivos",
    modality: "100% Online Asincrónico",
    link: "https://www.typingclub.com/",
    tags: ["computacion", "administracion", "empleo"],
    isFree: true,
    scholarshipCoverage: "Herramienta Gratuita Global",
    spotsAvailable: "Acceso Inmediato",
    certificateIncluded: true,
    certificateType: "Certificado Oficial Verificable",
    heroImage: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80",
    badgeColor: "violet",
    whatIsIt: "El curso lúdico definitivo para aprender digitación táctil con los 10 dedos. Mejora tu velocidad de 20 a más de 55 palabras por minuto y califica de inmediato a puestos de digitador o asistente.",
    whatIncludes: [
      "Más de 600 lecciones progresivas con animaciones y juegos de arcade",
      "Medición precisa de palabras por minuto (WPM) y porcentaje de precisión",
      "Certificado oficial descargable de velocidad de mecanografía para adjuntar a tu CV",
      "Ejercicios ergonómicos para evitar dolores de muñeca y fatiga visual",
      "Soporte para teclados en español con letra Ñ"
    ],
    level: "Desde Cero (Principiantes)",
    modulesCount: 8
  },
  {
    id: "c9",
    title: "Emprendimiento Digital & Creación de Negocios en Línea",
    tagline: "Convierte una idea o talento en un negocio rentable utilizando herramientas digitales gratuitas",
    organization: "Grow with Google & Junior Achievement GT",
    orgType: "Fundación Global",
    orgVerified: true,
    skillTaught: "social_media",
    skillLabel: "Emprendimiento & Modelos de Negocio",
    duration: "18 horas de talleres prácticos",
    modality: "Online con Sesiones en Vivo",
    link: "https://grow.google/intl/es-419/courses-and-tools/",
    tags: ["emprendimiento", "marketing", "tecnologia", "diseño"],
    isFree: true,
    scholarshipCoverage: "Beca de Impulso Emprendedor 100%",
    spotsAvailable: "50 Cupos con Asesoría Personalizada",
    certificateIncluded: true,
    certificateType: "Certificado Oficial Verificable",
    heroImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80",
    badgeColor: "rose",
    whatIsIt: "Aprende a validar tu idea, calcular costos y precios de venta, cobrar por transferencias y pasarelas guatemaltecas, y conseguir tus primeros clientes a través de WhatsApp Business y redes sociales.",
    whatIncludes: [
      "Plantilla del Business Model Canvas adaptada a emprendimientos locales",
      "Mentorías grupales con empresarios jóvenes guatemaltecos",
      "Guía legal básica para formalización y registro ante SAT",
      "Certificado de graduación de Jóvenes Emprendedores de Centroamérica",
      "Oportunidad de postular a fondos semilla de financiamiento de ONG aliadas"
    ],
    level: "Todos los Niveles",
    modulesCount: 6
  },
  {
    id: "c10",
    title: "Iniciación a la Programación con Python & Lógica Algorítmica",
    tagline: "El lenguaje de programación más versátil del mundo para desarrollo web, datos e inteligencia artificial",
    organization: "Cisco Networking Academy & Python Institute",
    orgType: "Certificación Internacional",
    orgVerified: true,
    skillTaught: "networks",
    skillLabel: "Programación en Python & Software",
    duration: "40 horas con entorno interactivo en la nube",
    modality: "100% Online Asincrónico",
    link: "https://www.netacad.com/courses/programming/pcap-programming-essentials-python",
    tags: ["tecnologia", "programacion", "computacion"],
    isFree: true,
    scholarshipCoverage: "Beca 100% en Alianza con OpenEDG",
    spotsAvailable: "Cupos Ilimitados Abiertos",
    certificateIncluded: true,
    certificateType: "Certificado Oficial Verificable",
    heroImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
    badgeColor: "teal",
    whatIsIt: "Aprende a pensar como programador resolviendo desafíos reales en la pantalla. No necesitas conocimientos previos de matemáticas complejas: comenzarás escribiendo tus primeras líneas de código en minutos.",
    whatIncludes: [
      "Entorno de programación integrado en el navegador sin instalar nada",
      "Decenas de laboratorios prácticos con validación automática de respuestas",
      "Preparación completa para el examen oficial de certificación PCEP-30-02",
      "Insignia digital Cisco Credly de Programación en Python",
      "Comunidad global de estudiantes para resolver dudas técnicas"
    ],
    level: "Desde Cero (Principiantes)",
    modulesCount: 5
  },
  {
    id: "c11",
    title: "Liderazgo Personal, Gestión del Tiempo & Habilidades Blandas",
    tagline: "Desarrolla autodisciplina, adaptabilidad, resolución de problemas y trabajo en equipo",
    organization: "Microsoft Learn & Generation Guatemala",
    orgType: "Fundación Global",
    orgVerified: true,
    skillTaught: "organization",
    skillLabel: "Organización & Liderazgo",
    duration: "8 horas de microaprendizaje",
    modality: "100% Online Asincrónico",
    link: "https://learn.microsoft.com/es-es/training/",
    tags: ["empleo", "administracion", "liderazgo"],
    isFree: true,
    scholarshipCoverage: "Acceso Gratuito Global",
    spotsAvailable: "Disponible Inmediatamente",
    certificateIncluded: true,
    certificateType: "Insignia Digital LinkedIn",
    heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
    badgeColor: "indigo",
    whatIsIt: "Las habilidades que más valoran los empleadores y que nadie enseña formalmente: cómo gestionar tu tiempo con métodos como Pomodoro o Kanban, mantener el enfoque, manejar el estrés y liderar iniciativas.",
    whatIncludes: [
      "Test interactivo de estilos de trabajo y fortalezas personales",
      "Plantillas de gestión de tareas diarias en Notion y Microsoft To-Do",
      "Certificado digital de competencias socioemocionales",
      "Estrategias prácticas para entrevistas por competencias STAR",
      "Acceso a webinars mensuales de desarrollo personal con mentores"
    ],
    level: "Todos los Niveles",
    modulesCount: 4
  },
  {
    id: "c12",
    title: "Comunicación Asertiva, Oratoria & Persuasión Positiva",
    tagline: "Aprende a expresar tus ideas con claridad, seguridad y empatía ante cualquier audiencia",
    organization: "Fundación Carlos Slim (Capacítate para el Empleo)",
    orgType: "Fundación Global",
    orgVerified: true,
    skillTaught: "communication",
    skillLabel: "Comunicación & Oratoria",
    duration: "10 horas con ejercicios en video",
    modality: "100% Online Asincrónico",
    link: "https://capacitateparaelempleo.org/",
    tags: ["empleo", "ventas", "administracion", "comercio"],
    isFree: true,
    scholarshipCoverage: "Beca 100% Social",
    spotsAvailable: "Inscripciones Permanentes",
    certificateIncluded: true,
    certificateType: "Certificado Oficial Verificable",
    heroImage: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80",
    badgeColor: "yellow",
    whatIsIt: "Aprende a comunicarte con impacto: modulación de voz, lenguaje no verbal seguro, escucha activa y técnicas de persuasión ética para entrevistas de trabajo, negociaciones y presentaciones en público.",
    whatIncludes: [
      "Guías prácticas con guiones para entrevistas y conversaciones difíciles",
      "Técnicas de respiración y control del pánico escénico",
      "Certificado formal avalado con registro descargable",
      "Evaluaciones de comprensión con retroalimentación instantánea",
      "Cápsulas de audio descargables para escuchar en transporte público"
    ],
    level: "Desde Cero (Principiantes)",
    modulesCount: 4
  }
];
