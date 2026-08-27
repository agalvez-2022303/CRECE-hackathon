// ──────────────────────────────────────────────
// CRECE — Mock Data: Usuarios con Privacidad Segura y Certificados
// ──────────────────────────────────────────────

export interface UserCertificate {
  id: string;
  courseTitle: string;
  organization: string;
  orgLogo: string;
  issueDate: string;
  validationCode: string;
  hoursCompleted: number;
  skillsGained: string[];
  pdfUrl?: string;
}

export interface UserBadge {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji or icon tag
  unlockedDate: string;
  category: "match" | "learning" | "community" | "special";
  accentColor: string;
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string; // "Actualidad" if current
  isCurrent: boolean;
  description: string;
  employmentType?: string; // "Tiempo Completo" | "Medio Tiempo" | etc
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description?: string;
}

export interface LanguageEntry {
  name: string;
  level: "Nativo" | "Avanzado" | "Intermedio" | "Básico";
}

export interface UserProfile {
  id: string;
  name: string;
  lastName?: string;
  email: string;
  phone: string;
  phoneAlt?: string;
  avatar: string; // foto real (base64 o URL) o ilustración para menores
  isSafeAvatar: boolean;
  headline: string;
  summary?: string; // resumen profesional CV
  age: number;
  isAdult: boolean;
  birthDate?: string; // YYYY-MM-DD
  gender?: string;
  maritalStatus?: string;
  nationalId?: string; // DPI
  location: string;
  municipality?: string;
  department?: string;
  address?: string;
  willingToRelocate?: boolean;
  hasVehicle?: boolean;
  drivingLicenseType?: string;
  education: string; // nivel resumido
  availability: string;
  availabilityDetail?: string; // "Lunes a Viernes 8-5, Sábados medio día"
  contractPreference?: string;
  salaryExpectation?: string; // "Q3,500 - Q4,500" or "A convenir"
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  customSkills?: string[]; // habilidades "Otro" escritas por usuario
  skills: string[]; // skill IDs
  interests: string[]; // interest tags
  languages?: LanguageEntry[];
  experiences?: WorkExperience[];
  educationHistory?: EducationEntry[];
  isDemo: boolean;
  completedCoursesCount: number;
  badges: UserBadge[];
  certificates: UserCertificate[];
  activeApplicationsCount: number;
  emergencyContact?: { name: string; phone: string; relation: string };
}

// In-memory store (starts with two demo users)
export const users: UserProfile[] = [
  {
    id: "demo-adult",
    name: "María",
    lastName: "López Alvarado",
    email: "maria.lopez@crece.gt",
    phone: "5555-0001",
    phoneAlt: "5555-0002",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    isSafeAvatar: false,
    headline: "Perito Contador · Buscando oportunidad en atención al cliente y administración",
    summary: "Joven profesional con experiencia en atención al cliente y administración, orientada a resultados y servicio cálido. Busco incorporarme a empresa donde pueda aportar organización, manejo de herramientas digitales y crecimiento continuo.",
    age: 26,
    isAdult: true,
    birthDate: "1999-05-14",
    gender: "Femenino",
    maritalStatus: "Soltera",
    nationalId: "1234 56789 0101",
    location: "Zona 7, Ciudad de Guatemala",
    municipality: "Guatemala",
    department: "Guatemala",
    address: "12 Avenida 3-45, Colonia La Verbena, Zona 7",
    willingToRelocate: false,
    hasVehicle: false,
    drivingLicenseType: "",
    education: "Diversificado (Perito Contador)",
    availability: "Tiempo Completo",
    availabilityDetail: "Lunes a Viernes 8:00-17:00, Sábados medio día",
    contractPreference: "Contrato indefinido",
    salaryExpectation: "Q4,000 - Q5,000",
    portfolioUrl: "",
    linkedinUrl: "https://linkedin.com/in/maria-lopez-gt",
    customSkills: ["Resolución de conflictos"],
    skills: ["customer_service", "communication", "basic_computer", "organization", "teamwork"],
    interests: ["administracion", "ventas", "tecnologia", "comercio"],
    languages: [{ name: "Español", level: "Nativo" }, { name: "Inglés", level: "Intermedio" }],
    experiences: [
      { id: "exp1", title: "Asistente de Caja y Atención", company: "Tienda La Económica", location: "Zona 1, Guatemala", startDate: "2023-02", endDate: "2024-08", isCurrent: false, description: "Atención a clientes, manejo de POS, cuadre de caja diario y control de inventario.", employmentType: "Tiempo Completo" },
      { id: "exp2", title: "Practicante Contable", company: "Servicios Contables Marroquín", location: "Zona 9, Guatemala", startDate: "2022-06", endDate: "2023-01", isCurrent: false, description: "Apoyo en digitación contable, archivo y elaboración de reportes en Excel.", employmentType: "Medio Tiempo" }
    ],
    educationHistory: [
      { id: "edu1", institution: "Instituto Privado Guatemala", degree: "Perito Contador", field: "Ciencias Económicas", startDate: "2017", endDate: "2019", isCurrent: false },
      { id: "edu2", institution: "INTECAP", degree: "Diplomado", field: "Atención al Cliente", startDate: "2024", endDate: "2024", isCurrent: false, description: "40 horas - Excelencia en servicio" }
    ],
    isDemo: true,
    completedCoursesCount: 3,
    activeApplicationsCount: 1,
    badges: [
      {
        id: "b1",
        title: "Perfil Verificado",
        description: "Validación de identidad y datos de contacto completada con éxito.",
        icon: "ShieldCheck",
        unlockedDate: "15 Ago 2026",
        category: "special",
        accentColor: "emerald"
      },
      {
        id: "b2",
        title: "Top Match 100%",
        description: "Alcanzó el 100% de compatibilidad en su primera postulación laboral.",
        icon: "Zap",
        unlockedDate: "18 Ago 2026",
        category: "match",
        accentColor: "orange"
      },
      {
        id: "b3",
        title: "Graduada Digital",
        description: "Completó 3 certificaciones oficiales con calificación sobresaliente.",
        icon: "GraduationCap",
        unlockedDate: "22 Ago 2026",
        category: "learning",
        accentColor: "amber"
      }
    ],
    certificates: [
      {
        id: "cert-1",
        courseTitle: "Certificación Profesional en Marketing Digital & E-Commerce",
        organization: "Google Skillshop & Google Career",
        orgLogo: "Google",
        issueDate: "12 de Agosto de 2026",
        validationCode: "GOOGLE-GT-94821",
        hoursCompleted: 20,
        skillsGained: ["Marketing Digital", "Pauta Publicitaria", "Google Ads", "Redes Sociales"]
      },
      {
        id: "cert-2",
        courseTitle: "Especialización en Excel Profesional & Automatización",
        organization: "Microsoft Learn",
        orgLogo: "Microsoft",
        issueDate: "20 de Julio de 2026",
        validationCode: "MSFT-GT-88231",
        hoursCompleted: 12,
        skillsGained: ["Excel Avanzado", "Tablas Dinámicas", "Fórmulas Lógicas", "Reportes"]
      },
      {
        id: "cert-3",
        courseTitle: "Excelencia en Servicio al Cliente & Protocolo",
        organization: "INTECAP Digital Guatemala",
        orgLogo: "INTECAP",
        issueDate: "05 de Junio de 2026",
        validationCode: "INTECAP-GT-40192",
        hoursCompleted: 40,
        skillsGained: ["Atención al Cliente", "Resolución de Conflictos", "Protocolo Comercial"]
      }
    ]
  },
  {
    id: "demo-minor",
    name: "Diego",
    lastName: "A.",
    email: "diego.estudiante@crece.gt",
    phone: "Confidencial (Protegido)",
    // Avatar ilustrado seguro sin rostro real de menor
    avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=DiegoGT&backgroundColor=b6e3f4,c0aede,d1d4f9",
    isSafeAvatar: true,
    headline: "Estudiante de Básicos · Desarrollando habilidades en código y diseño digital",
    summary: "Estudiante curioso y creativo, me apasiona la tecnología y el diseño. Busco becas para desarrollar mi portafolio y preparar mi futuro profesional sin necesidad de exponer datos sensibles.",
    age: 16,
    isAdult: false,
    birthDate: "2010-03-22",
    gender: "Masculino",
    location: "Quetzaltenango (Altiplano)",
    municipality: "Quetzaltenango",
    department: "Quetzaltenango",
    address: "Quetzaltenango",
    willingToRelocate: false,
    hasVehicle: false,
    education: "Tercero Básico (en curso)",
    availability: "Medio Tiempo / Fines de semana",
    availabilityDetail: "Tardes y fines de semana (después de clases)",
    customSkills: [],
    skills: [],
    interests: ["tecnologia", "diseño", "programacion", "emprendimiento", "cocina", "salud"],
    languages: [{ name: "Español", level: "Nativo" }],
    experiences: [],
    educationHistory: [
      { id: "edu-m1", institution: "Instituto Básico de Occidente", degree: "Tercero Básico", field: "Educación Básica", startDate: "2024", endDate: "Actualidad", isCurrent: true, description: "Promedio destacado en computación y artes" }
    ],
    isDemo: true,
    completedCoursesCount: 2,
    activeApplicationsCount: 0,
    badges: [
      {
        id: "bm-1",
        title: "Joven Talento GT",
        description: "Inició su ruta de aprendizaje temprano en ciencias de la computación.",
        icon: "Sparkles",
        unlockedDate: "10 Ago 2026",
        category: "special",
        accentColor: "amber"
      },
      {
        id: "bm-2",
        title: "Beca Maker Junior",
        description: "Completó su primer proyecto práctico de programación interactiva.",
        icon: "Code",
        unlockedDate: "24 Ago 2026",
        category: "learning",
        accentColor: "cyan"
      },
      {
        id: "bm-3",
        title: "Explorador Digital",
        description: "Participó activamente en 2 rutas de becas gratuitas este mes.",
        icon: "Compass",
        unlockedDate: "26 Ago 2026",
        category: "community",
        accentColor: "emerald"
      }
    ],
    certificates: [
      {
        id: "cert-m1",
        courseTitle: "Iniciación a la Programación con Python & Algoritmos",
        organization: "Cisco Networking Academy & Python Institute",
        orgLogo: "Cisco",
        issueDate: "18 de Agosto de 2026",
        validationCode: "CISCO-JUNIOR-39210",
        hoursCompleted: 40,
        skillsGained: ["Lógica de Programación", "Python Básico", "Pensamiento Algorítmico"]
      },
      {
        id: "cert-m2",
        courseTitle: "Diseño Gráfico con Canva & Branding Juvenil",
        organization: "Fundación Carlos Slim & Canva School",
        orgLogo: "Fundación Slim",
        issueDate: "02 de Agosto de 2026",
        validationCode: "SLIM-DES-77182",
        hoursCompleted: 15,
        skillsGained: ["Composición Visual", "Teoría del Color", "Canva Pro", "Identidad de Marca"]
      }
    ]
  }
];
