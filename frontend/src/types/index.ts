// ──────────────────────────────────────────────
// CRECE — TypeScript Types & Interfaces
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
  icon: string;
  unlockedDate: string;
  category: "match" | "learning" | "community" | "special";
  accentColor: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  isSafeAvatar: boolean;
  headline: string;
  age: number;
  isAdult: boolean;
  location: string;
  education: string;
  availability: string;
  skills: string[];
  interests: string[];
  isDemo: boolean;
  completedCoursesCount: number;
  badges: UserBadge[];
  certificates: UserCertificate[];
  activeApplicationsCount: number;
}

export interface Opportunity {
  id: string;
  title: string;
  tagline: string;
  company: string;
  companyVerified: boolean;
  companyType: "Empresa Privada" | "Corporativo" | "Organización Social" | "Alianza Público-Privada";
  location: string;
  type: string;
  salary: string;
  duration: string;
  vacancies: number;
  vacanciesText: string;
  modality: "Presencial" | "Híbrido" | "100% Remoto";
  deadline: string;
  difficultyLevel: "Sin experiencia requerida" | "Nivel Inicial" | "Intermedio";
  heroImage: string;
  badgeColor: string;
  category: string;
  categoryLabel: string;
  whatIsIt: string;
  whatIncludes: string[];
  description: string;
  requirements: string[];
  requirementLabels: string[];
  hiringProcess: string[];
}

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
  scholarshipCoverage: string;
  spotsAvailable: string;
  certificateIncluded: boolean;
  certificateType: "Certificado Oficial Verificable" | "Insignia Digital LinkedIn" | "Título Técnico Avalado";
  heroImage: string;
  badgeColor: string;
  whatIsIt: string;
  whatIncludes: string[];
  level: "Desde Cero (Principiantes)" | "Intermedio" | "Todos los Niveles";
  modulesCount: number;
}

export interface MatchResult {
  opportunity: Opportunity;
  matchPct: number;
  matchedRequirements: string[];
  missingRequirements: string[];
  recommendedCourses: (Course | undefined)[];
}
