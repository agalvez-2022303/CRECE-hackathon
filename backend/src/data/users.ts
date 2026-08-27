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

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string; // illustration for minors, photo for adults
  isSafeAvatar: boolean;
  headline: string;
  age: number;
  isAdult: boolean;
  location: string;
  education: string;
  availability: string;
  skills: string[]; // skill IDs
  interests: string[]; // interest tags
  isDemo: boolean;
  completedCoursesCount: number;
  badges: UserBadge[];
  certificates: UserCertificate[];
  activeApplicationsCount: number;
}

// In-memory store (starts with two demo users)
export const users: UserProfile[] = [
  {
    id: "demo-adult",
    name: "María López Alvarado",
    email: "maria.lopez@crece.gt",
    phone: "5555-0001",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    isSafeAvatar: false,
    headline: "Perito Contador · Buscando oportunidad en atención al cliente y administración",
    age: 26,
    isAdult: true,
    location: "Zona 7, Ciudad de Guatemala",
    education: "Diversificado (Perito Contador)",
    availability: "Tiempo Completo",
    skills: ["customer_service", "communication", "basic_computer", "organization", "teamwork"],
    interests: ["administracion", "ventas", "tecnologia", "comercio"],
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
    name: "Diego A.", // Alias seguro para menor
    email: "diego.estudiante@crece.gt",
    phone: "Confidencial (Protegido)",
    // Avatar ilustrado seguro sin rostro real de menor
    avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=DiegoGT&backgroundColor=b6e3f4,c0aede,d1d4f9",
    isSafeAvatar: true,
    headline: "Estudiante de Básicos · Desarrollando habilidades en código y diseño digital",
    age: 16,
    isAdult: false,
    location: "Quetzaltenango (Altiplano)",
    education: "Tercero Básico (en curso)",
    availability: "Medio Tiempo / Fines de semana",
    skills: [],
    interests: ["tecnologia", "diseño", "programacion", "emprendimiento"],
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
