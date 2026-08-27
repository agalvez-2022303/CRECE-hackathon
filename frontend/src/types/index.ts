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

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  employmentType?: string;
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
  avatar: string;
  isSafeAvatar: boolean;
  headline: string;
  summary?: string;
  age: number;
  isAdult: boolean;
  birthDate?: string;
  gender?: string;
  maritalStatus?: string;
  nationalId?: string;
  location: string;
  municipality?: string;
  department?: string;
  address?: string;
  willingToRelocate?: boolean;
  hasVehicle?: boolean;
  drivingLicenseType?: string;
  education: string;
  availability: string;
  availabilityDetail?: string;
  contractPreference?: string;
  salaryExpectation?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  customSkills?: string[];
  skills: string[];
  interests: string[];
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
  difficultyLevel: "Sin experiencia requerida" | "Nivel Inicial" | "Intermedio" | "Nivel Inicial con Inglés";
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
