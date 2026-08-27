// ──────────────────────────────────────────────
// CRECE — Onboarding Wizard Completo (CV + Foto + Otro)
// ──────────────────────────────────────────────
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../context/UserContext";
import type { UserProfile, WorkExperience, EducationEntry, LanguageEntry } from "../types";
import {
  Sparkles, ArrowRight, ArrowLeft, Check, MapPin, GraduationCap, Briefcase,
  HeartHandshake, MessageSquare, Laptop, FileSpreadsheet, Share2, ClipboardList,
  Users, Car, Languages, Palette, Wand2, Keyboard, Code, Rocket, Boxes,
  CheckCircle2, Camera, Upload, Plus, Trash2, X, Utensils, HeartPulse, Zap,
  Wrench, Hammer, Scissors, Sprout, ChefHat, AlertCircle, Link as LinkIcon,
  FileText, Clock, DollarSign, Home, Phone
} from "lucide-react";

const API = "/api";

const ALL_SKILLS = [
  { id: "customer_service", label: "Atención al Cliente", icon: HeartHandshake, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
  { id: "communication", label: "Comunicación Asertiva", icon: MessageSquare, color: "text-orange-600", bg: "bg-orange-50 border-orange-200" },
  { id: "basic_computer", label: "Computación & Nube", icon: Laptop, color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
  { id: "excel", label: "Excel & Hojas de Cálculo", icon: FileSpreadsheet, color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
  { id: "social_media", label: "Marketing & Redes", icon: Share2, color: "text-purple-600", bg: "bg-purple-50 border-purple-200" },
  { id: "organization", label: "Organización & Archivo", icon: ClipboardList, color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
  { id: "teamwork", label: "Trabajo en Equipo", icon: Users, color: "text-teal-600", bg: "bg-teal-50 border-teal-200" },
  { id: "driving_license", label: "Licencia de Conducir", icon: Car, color: "text-orange-700", bg: "bg-orange-50 border-orange-200" },
  { id: "english", label: "Inglés Conversacional", icon: Languages, color: "text-rose-600", bg: "bg-rose-50 border-rose-200" },
  { id: "design_tools", label: "Diseño (Canva / Figma)", icon: Palette, color: "text-fuchsia-600", bg: "bg-fuchsia-50 border-fuchsia-200" },
  { id: "creativity", label: "Creatividad Visual", icon: Wand2, color: "text-pink-600", bg: "bg-pink-50 border-pink-200" },
  { id: "typing", label: "Mecanografía Ágil", icon: Keyboard, color: "text-indigo-600", bg: "bg-indigo-50 border-indigo-200" },
  { id: "cooking", label: "Cocina & Gastronomía", icon: Utensils, color: "text-orange-600", bg: "bg-orange-50 border-orange-200" },
  { id: "health_assistant", label: "Salud & Primeros Auxilios", icon: HeartPulse, color: "text-red-600", bg: "bg-red-50 border-red-200" },
  { id: "electrical", label: "Electricidad Domiciliar", icon: Zap, color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200" },
  { id: "mechanics", label: "Mecánica de Motos", icon: Wrench, color: "text-slate-600", bg: "bg-slate-50 border-slate-200" },
  { id: "carpentry", label: "Carpintería & Muebles", icon: Hammer, color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
  { id: "beauty", label: "Belleza & Barbería", icon: Scissors, color: "text-pink-600", bg: "bg-pink-50 border-pink-200" },
  { id: "agriculture", label: "Agricultura Orgánica", icon: Sprout, color: "text-green-600", bg: "bg-green-50 border-green-200" },
  { id: "bakery", label: "Panadería & Pastelería", icon: ChefHat, color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
];

const ALL_INTERESTS = [
  { id: "tecnologia", label: "Tecnología & IT", icon: Laptop },
  { id: "programacion", label: "Programación & Código", icon: Code },
  { id: "administracion", label: "Administración & Oficina", icon: ClipboardList },
  { id: "ventas", label: "Ventas & Comercio", icon: Briefcase },
  { id: "diseño", label: "Diseño & Creatividad", icon: Palette },
  { id: "marketing", label: "Marketing Digital", icon: Share2 },
  { id: "idiomas", label: "Idiomas & Turismo", icon: Languages },
  { id: "emprendimiento", label: "Emprendimiento Propio", icon: Rocket },
  { id: "logistica", label: "Logística & Almacén", icon: Boxes },
  { id: "cocina", label: "Cocina & Gastronomía", icon: Utensils },
  { id: "salud", label: "Salud & Enfermería", icon: HeartPulse },
  { id: "electricidad", label: "Electricidad", icon: Zap },
  { id: "mecanica", label: "Mecánica Automotriz", icon: Wrench },
  { id: "carpinteria", label: "Carpintería", icon: Hammer },
  { id: "belleza", label: "Belleza & Estilismo", icon: Scissors },
  { id: "agricultura", label: "Agricultura & Huertos", icon: Sprout },
  { id: "panaderia", label: "Panadería", icon: ChefHat },
];

const EDUCATION_OPTIONS = [
  "Diversificado Completo (Perito / Bachillerato)",
  "Diversificado en Curso",
  "Tercero Básico Completo",
  "Capacitación Técnica / INTECAP",
  "Universidad en Curso (Nocturna / Fin de semana)",
  "Primaria o Básico en Proceso",
  "Universitario Completo",
];

const LOCATIONS = [
  "Ciudad de Guatemala (Metropolitana)",
  "Quetzaltenango & Occidente",
  "Escuintla & Costa Sur",
  "Antigua Guatemala / Sacatepéquez",
  "Cobán & Alta Verapaz",
  "Huehuetenango",
  "San Marcos / Altiplano",
  "Quiché",
  "Petén",
  "Otro Departamento",
];

const GENDER_OPTIONS = ["Femenino", "Masculino", "No binario", "Prefiero no decir"];
const MARITAL_OPTIONS = ["Soltero/a", "Casado/a", "Unión libre", "Divorciado/a"];
const CONTRACT_OPTIONS = ["Tiempo Completo", "Medio Tiempo", "Por Proyecto / Freelance", "Pasantía Remunerada", "Indiferente"];
const AVAILABILITY_OPTIONS = ["Lunes a Viernes (8am-5pm)", "Fines de semana", "Nocturno / Flexible", "Medio tiempo tardes", "Tiempo completo inmediato"];

type Step = "age" | "personal" | "photo" | "location" | "education" | "experience" | "skills" | "languages" | "interests" | "summary" | "done";

export default function OnboardingPage() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Core
  const [isAdult, setIsAdult] = useState<boolean | null>(null);
  const [step, setStep] = useState<Step>("age");

  // Personal data
  const [name, setName] = useState(user?.name || "");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [phoneAlt, setPhoneAlt] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState<number>(isAdult ? 22 : 16);
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [nationalId, setNationalId] = useState("");

  // Photo
  const [avatar, setAvatar] = useState<string>(user?.avatar || "");
  const [photoError, setPhotoError] = useState("");

  // Location
  const [department, setDepartment] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [willingToRelocate, setWillingToRelocate] = useState(false);
  const [hasVehicle, setHasVehicle] = useState(false);
  const [drivingLicenseType, setDrivingLicenseType] = useState("");

  // Education
  const [education, setEducation] = useState("");
  const [educationHistory, setEducationHistory] = useState<EducationEntry[]>([]);

  // Experience
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);

  // Skills
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkills, setCustomSkills] = useState<string[]>([]);
  const [customSkillInput, setCustomSkillInput] = useState("");

  // Languages
  const [languages, setLanguages] = useState<LanguageEntry[]>([{ name: "Español", level: "Nativo" }]);
  const [newLangName, setNewLangName] = useState("");
  const [newLangLevel, setNewLangLevel] = useState<LanguageEntry["level"]>("Básico");

  // Interests & preferences
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [availabilityDetail, setAvailabilityDetail] = useState("");
  const [contractPreference, setContractPreference] = useState("");
  const [salaryExpectation, setSalaryExpectation] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  // Summary
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");

  const [saving, setSaving] = useState(false);

  // Steps logic
  const baseSteps: Step[] = ["age", "personal", "photo", "location", "education", "experience", "skills", "languages", "interests", "summary", "done"];
  // For minors, we keep experience but make it optional / volunteer, still show it but lighter
  const steps = baseSteps;
  const currentIdx = steps.indexOf(step);
  const totalSteps = steps.length - 1;
  const progress = step === "done" ? 100 : Math.round((currentIdx / totalSteps) * 100);

  function toggleSkill(id: string) {
    setSelectedSkills(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  }
  function toggleInterest(id: string) {
    setSelectedInterests(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  }
  function addCustomSkill() {
    const v = customSkillInput.trim();
    if (!v) return;
    if (customSkills.includes(v)) return;
    setCustomSkills(prev => [...prev, v]);
    setCustomSkillInput("");
  }
  function removeCustomSkill(s: string) {
    setCustomSkills(prev => prev.filter(x => x !== s));
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      setPhotoError("La foto no debe superar 3MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setPhotoError("Sube una imagen JPG o PNG");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result as string);
      setPhotoError("");
    };
    reader.readAsDataURL(file);
  }

  function addEducationEntry() {
    setEducationHistory(prev => [...prev, {
      id: `edu-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      isCurrent: false
    }]);
  }
  function updateEducationEntry(id: string, patch: Partial<EducationEntry>) {
    setEducationHistory(prev => prev.map(e => e.id === id ? { ...e, ...patch } : e));
  }
  function removeEducationEntry(id: string) {
    setEducationHistory(prev => prev.filter(e => e.id !== id));
  }

  function addExperience() {
    setExperiences(prev => [...prev, {
      id: `exp-${Date.now()}`,
      title: "", company: "", location: "", startDate: "", endDate: "", isCurrent: false, description: "", employmentType: "Tiempo Completo"
    }]);
  }
  function updateExperience(id: string, patch: Partial<WorkExperience>) {
    setExperiences(prev => prev.map(e => e.id === id ? { ...e, ...patch } : e));
  }
  function removeExperience(id: string) {
    setExperiences(prev => prev.filter(e => e.id !== id));
  }

  function addLanguage() {
    if (!newLangName.trim()) return;
    setLanguages(prev => [...prev, { name: newLangName.trim(), level: newLangLevel }]);
    setNewLangName("");
  }
  function removeLanguage(idx: number) {
    setLanguages(prev => prev.filter((_, i) => i !== idx));
  }

  function goNext() {
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) setStep(steps[idx + 1]);
  }
  function goPrev() {
    const idx = steps.indexOf(step);
    if (idx > 0) setStep(steps[idx - 1]);
  }

  // Validation per step
  function canContinue(): boolean {
    switch (step) {
      case "age": return isAdult !== null;
      case "personal": return name.trim().length >= 2 && lastName.trim().length >= 2 && phone.trim().length >= 7 && email.includes("@");
      case "photo": return avatar.length > 10; // require photo
      case "location": return location.length > 0 && department.length > 0;
      case "education": return education.length > 0;
      case "experience": return true; // optional
      case "skills": return selectedSkills.length > 0 || customSkills.length > 0;
      case "languages": return languages.length > 0;
      case "interests": return selectedInterests.length > 0 && contractPreference.length > 0;
      case "summary": return headline.trim().length > 5 && summary.trim().length > 10;
      default: return true;
    }
  }

  async function handleFinish() {
    if (!user) return;
    setSaving(true);
    const finalAge = age || (isAdult ? 22 : 16);
    const updated: Partial<UserProfile> = {
      id: user.id,
      name: `${name.trim()} ${lastName.trim()}`.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      phoneAlt: phoneAlt.trim(),
      avatar: avatar,
      isSafeAvatar: !isAdult && avatar.includes("dicebear"),
      headline: headline.trim() || (isAdult ? "Buscando empleo formal con capacitación" : "Estudiante enfocado en becas"),
      summary: summary.trim(),
      age: finalAge,
      birthDate,
      gender,
      maritalStatus,
      nationalId,
      location,
      municipality,
      department,
      address,
      willingToRelocate,
      hasVehicle,
      drivingLicenseType,
      education,
      availability: contractPreference,
      availabilityDetail,
      contractPreference,
      salaryExpectation,
      portfolioUrl,
      linkedinUrl,
      customSkills,
      skills: selectedSkills,
      interests: selectedInterests,
      languages,
      experiences: experiences.filter(e => e.title && e.company),
      educationHistory: educationHistory.filter(e => e.institution && e.degree),
      isAdult: isAdult ?? false,
      badges: [
        { id: "b-welcome", title: "Perfil CV Creado", description: "Completó el onboarding extendido con CV profesional.", icon: "Sparkles", unlockedDate: "Hoy", category: "special", accentColor: "emerald" }
      ],
      certificates: []
    };
    try {
      const res = await fetch(`${API}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const saved = await res.json();
      setUser(saved);
      navigate("/dashboard");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col">
      {/* Progress Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 py-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-orange-500 text-white font-extrabold text-xs shadow-sm">
              {currentIdx + 1}
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900 uppercase tracking-wider">Crea tu CV en CRECE</div>
              <div className="text-[11px] text-stone-500 font-medium">Paso {currentIdx + 1} de {totalSteps} — {step}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-black text-orange-600">{progress}%</span>
            <div className="w-28 sm:w-40 bg-stone-200 rounded-full h-2.5 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          {step === "age" && (
            <motion.div key="age" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} className="edu-card p-6 sm:p-10 bg-white border-2 border-stone-200 rounded-4xl shadow-soft-hover">
              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-3 border border-orange-200"><Sparkles className="w-3.5 h-3.5 text-orange-600" />Perfil CV Completo</span>
                <h1 className="text-2xl sm:text-3xl font-black font-display mb-2">¿Cuál es tu rango de edad?</h1>
                <p className="text-xs sm:text-sm text-stone-500">Para personalizar vacantes, becas y protección de datos.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={() => { setIsAdult(true); setAge(22); setStep("personal"); }} className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-300 hover:border-emerald-500 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4"><Briefcase className="w-6 h-6" /></div>
                  <h3 className="font-extrabold">Tengo 18 años o más</h3>
                  <p className="text-xs text-stone-600">Empleos formales + becas. CV profesional con foto.</p>
                </button>
                <button onClick={() => { setIsAdult(false); setAge(16); setStep("personal"); }} className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 hover:border-orange-400 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-4"><GraduationCap className="w-6 h-6" /></div>
                  <h3 className="font-extrabold">Tengo menos de 18 años</h3>
                  <p className="text-xs text-stone-600">Solo becas y cursos. Perfil protegido con foto opcional pero recomendada.</p>
                </button>
              </div>
            </motion.div>
          )}

          {step === "personal" && (
            <motion.div key="personal" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} className="edu-card p-6 sm:p-8 bg-white border-2 border-stone-200 rounded-4xl">
              <h2 className="text-xl font-black font-display mb-1 flex items-center gap-2"><FileText className="w-5 h-5 text-orange-500" /> Datos personales</h2>
              <p className="text-xs text-stone-500 mb-6">Información básica para tu CV. Los campos con * son obligatorios.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider">Nombre *</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="María" className="w-full mt-1 px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:border-orange-500 focus:bg-white" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider">Apellidos *</label>
                  <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="López Alvarado" className="w-full mt-1 px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:border-orange-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider">Correo *</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" className="w-full mt-1 px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider">Teléfono *</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="5555-1234" className="w-full mt-1 px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider">Tel. alternativo</label>
                  <input value={phoneAlt} onChange={e => setPhoneAlt(e.target.value)} placeholder="Opcional" className="w-full mt-1 px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-1"><Clock className="w-3 h-3" /> Fecha nacimiento</label>
                  <input type="date" value={birthDate} onChange={e => { setBirthDate(e.target.value); const y = new Date(e.target.value).getFullYear(); if (y) setAge(new Date().getFullYear() - y); }} className="w-full mt-1 px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider">Edad</label>
                  <input type="number" value={age} onChange={e => setAge(parseInt(e.target.value) || 0)} className="w-full mt-1 px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider">Género</label>
                  <select value={gender} onChange={e => setGender(e.target.value)} className="w-full mt-1 px-3 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm">
                    <option value="">Selecciona</option>
                    {GENDER_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider">Estado civil</label>
                  <select value={maritalStatus} onChange={e => setMaritalStatus(e.target.value)} className="w-full mt-1 px-3 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm">
                    <option value="">Selecciona</option>
                    {MARITAL_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider">DPI / CUI</label>
                  <input value={nationalId} onChange={e => setNationalId(e.target.value)} placeholder="Opcional" className="w-full mt-1 px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm" />
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t border-stone-200">
                <button onClick={goPrev} className="btn-outline-warm text-xs px-5 py-3 rounded-2xl flex items-center gap-2"><ArrowLeft className="w-4 h-4" />Atrás</button>
                <button onClick={goNext} disabled={!canContinue()} className="btn-primary-orange text-xs px-6 py-3 rounded-2xl disabled:opacity-40 flex items-center gap-2">Continuar <ArrowRight className="w-4 h-4" /></button>
              </div>
            </motion.div>
          )}

          {step === "photo" && (
            <motion.div key="photo" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} className="edu-card p-6 sm:p-8 bg-white border-2 border-stone-200 rounded-4xl">
              <h2 className="text-xl font-black font-display mb-1 flex items-center gap-2"><Camera className="w-5 h-5 text-emerald-600" /> Foto de perfil profesional *</h2>
              <p className="text-xs text-stone-500 mb-6">Una buena foto aumenta 3x tus oportunidades. Usa fondo neutro, luz natural y vestimenta presentable. Requerida para generar tu CV.</p>

              <div className="flex flex-col items-center gap-5 mb-6">
                <div className="relative">
                  {avatar ? (
                    <img src={avatar} alt="preview" className="w-40 h-40 rounded-3xl object-cover border-4 border-emerald-400 shadow-lg" />
                  ) : (
                    <div className="w-40 h-40 rounded-3xl border-4 border-dashed border-stone-300 bg-stone-50 flex flex-col items-center justify-center gap-2">
                      <Camera className="w-8 h-8 text-stone-400" />
                      <span className="text-xs font-bold text-stone-400">Sin foto</span>
                    </div>
                  )}
                  <button onClick={() => fileInputRef.current?.click()} className="absolute -bottom-2 -right-2 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-2xl shadow-lg transition">
                    <Upload className="w-5 h-5" />
                  </button>
                </div>

                <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />

                <div className="flex flex-wrap gap-2">
                  <button onClick={() => fileInputRef.current?.click()} className="px-5 py-2.5 rounded-2xl bg-stone-900 text-white text-xs font-bold">Subir foto (JPG/PNG, máx 3MB)</button>
                  <button onClick={() => { setAvatar("https://api.dicebear.com/7.x/initials/svg?seed=" + encodeURIComponent(name || "CV") + "&backgroundColor=FFD93D"); setPhotoError(""); }} className="px-5 py-2.5 rounded-2xl border-2 border-stone-200 bg-white text-xs font-bold">Usar avatar ilustrado</button>
                </div>

                {photoError && <div className="flex items-center gap-2 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-4 py-2 rounded-2xl"><AlertCircle className="w-4 h-4" />{photoError}</div>}
                {!avatar && <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl">⚠️ Debes subir una foto para continuar. El CV sin foto luce incompleto.</div>}
                {avatar && avatar.startsWith("data:") && <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Foto cargada correctamente</div>}

                <div className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-4 text-xs">
                  <div className="font-bold mb-1.5">Consejos para tu foto CV:</div>
                  <ul className="list-disc list-inside text-stone-600 space-y-1">
                    <li>Fondo blanco o claro, sin filtros</li>
                    <li>De hombros hacia arriba, mirando a la cámara</li>
                    <li>Evita selfies con gorra/lentes oscuros</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t border-stone-200">
                <button onClick={goPrev} className="btn-outline-warm text-xs px-5 py-3 rounded-2xl flex items-center gap-2"><ArrowLeft className="w-4 h-4" />Atrás</button>
                <button onClick={goNext} disabled={!canContinue()} className="btn-primary-orange text-xs px-6 py-3 rounded-2xl disabled:opacity-40 flex items-center gap-2">Continuar <ArrowRight className="w-4 h-4" /></button>
              </div>
            </motion.div>
          )}

          {step === "location" && (
            <motion.div key="location" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} className="edu-card p-6 sm:p-8 bg-white border-2 border-stone-200 rounded-4xl">
              <h2 className="text-xl font-black font-display mb-1 flex items-center gap-2"><MapPin className="w-5 h-5 text-emerald-600" /> Ubicación & movilidad</h2>
              <p className="text-xs text-stone-500 mb-6">Para priorizar oportunidades cerca de ti.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-bold uppercase">Departamento *</label>
                  <select value={department} onChange={e => setDepartment(e.target.value)} className="w-full mt-1 px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm">
                    <option value="">Selecciona</option>
                    {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase">Municipio / Zona</label>
                  <input value={municipality} onChange={e => setMunicipality(e.target.value)} placeholder="Ej: Zona 7, Quetzaltenango centro" className="w-full mt-1 px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm" />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs font-bold uppercase">Dirección detallada (para CV)</label>
                <input value={address} onChange={e => setAddress(e.target.value)} placeholder="12 Avenida 3-45, Colonia..." className="w-full mt-1 px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm" />
              </div>

              <div className="mb-4">
                <label className="text-xs font-bold uppercase">Ubicación corta (visible en perfil)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                  {LOCATIONS.slice(0, 6).map(loc => (
                    <button key={loc} onClick={() => setLocation(loc)} className={`p-3 rounded-2xl border text-left text-xs font-bold flex items-center justify-between ${location === loc ? "bg-emerald-50 border-emerald-500 text-emerald-900" : "bg-stone-50 border-stone-200"}`}>
                      <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-emerald-600" />{loc}</span>
                      {location === loc && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>
                  ))}
                </div>
                <input value={location} onChange={e => setLocation(e.target.value)} placeholder="O escribe tu ubicación" className="w-full mt-3 px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm" />
              </div>

              <div className="flex flex-wrap gap-4 mb-2">
                <label className="flex items-center gap-2 text-xs font-bold bg-stone-50 border border-stone-200 px-4 py-3 rounded-2xl cursor-pointer">
                  <input type="checkbox" checked={willingToRelocate} onChange={e => setWillingToRelocate(e.target.checked)} className="w-4 h-4" />
                  <Home className="w-4 h-4 text-emerald-600" /> Dispuesto a reubicarme
                </label>
                <label className="flex items-center gap-2 text-xs font-bold bg-stone-50 border border-stone-200 px-4 py-3 rounded-2xl cursor-pointer">
                  <input type="checkbox" checked={hasVehicle} onChange={e => setHasVehicle(e.target.checked)} className="w-4 h-4" />
                  <Car className="w-4 h-4 text-orange-600" /> Tengo vehículo
                </label>
                {hasVehicle && (
                  <select value={drivingLicenseType} onChange={e => setDrivingLicenseType(e.target.value)} className="px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-xs font-bold">
                    <option value="">Tipo licencia</option>
                    <option value="A">A - Moto</option>
                    <option value="B">B - Liviana</option>
                    <option value="C">C - Pesada</option>
                    <option value="M">M - Moto</option>
                  </select>
                )}
              </div>

              <div className="flex justify-between pt-6 border-t border-stone-200">
                <button onClick={goPrev} className="btn-outline-warm text-xs px-5 py-3 rounded-2xl flex items-center gap-2"><ArrowLeft className="w-4 h-4" />Atrás</button>
                <button onClick={goNext} disabled={!canContinue()} className="btn-primary-orange text-xs px-6 py-3 rounded-2xl disabled:opacity-40 flex items-center gap-2">Continuar <ArrowRight className="w-4 h-4" /></button>
              </div>
            </motion.div>
          )}

          {step === "education" && (
            <motion.div key="education" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} className="edu-card p-6 sm:p-8 bg-white border-2 border-stone-200 rounded-4xl">
              <h2 className="text-xl font-black font-display mb-1 flex items-center gap-2"><GraduationCap className="w-5 h-5 text-indigo-600" /> Educación *</h2>
              <p className="text-xs text-stone-500 mb-4">Tu nivel actual y historial académico para el CV.</p>

              <div className="space-y-2.5 mb-6">
                {EDUCATION_OPTIONS.map(opt => (
                  <button key={opt} onClick={() => setEducation(opt)} className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-bold flex items-center justify-between ${education === opt ? "bg-orange-50 border-orange-500 text-orange-900" : "bg-stone-50 border-stone-200 text-stone-700"}`}>
                    <span>{opt}</span>
                    {education === opt && <CheckCircle2 className="w-4 h-4 text-orange-600" />}
                  </button>
                ))}
              </div>

              <div className="border-t border-stone-200 pt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-black">Historial académico detallado (para CV)</h3>
                  <button onClick={addEducationEntry} className="px-4 py-2 rounded-2xl bg-indigo-600 text-white text-xs font-bold flex items-center gap-1"><Plus className="w-4 h-4" />Agregar</button>
                </div>
                {educationHistory.length === 0 && <p className="text-xs text-stone-500 bg-stone-50 border border-dashed border-stone-300 rounded-2xl p-4 text-center">Opcional pero recomendado: agrega tu colegio, instituto o universidad. Ej: INTECAP - Gastronomía 2024</p>}
                <div className="space-y-3">
                  {educationHistory.map(ent => (
                    <div key={ent.id} className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input placeholder="Institución *" value={ent.institution} onChange={e => updateEducationEntry(ent.id, { institution: e.target.value })} className="px-3 py-2.5 rounded-xl border border-stone-200 text-xs bg-white" />
                        <input placeholder="Título / Grado *" value={ent.degree} onChange={e => updateEducationEntry(ent.id, { degree: e.target.value })} className="px-3 py-2.5 rounded-xl border border-stone-200 text-xs bg-white" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input placeholder="Área / Carrera" value={ent.field} onChange={e => updateEducationEntry(ent.id, { field: e.target.value })} className="px-3 py-2.5 rounded-xl border border-stone-200 text-xs bg-white" />
                        <div className="flex gap-2">
                          <input placeholder="Inicio (2020)" value={ent.startDate} onChange={e => updateEducationEntry(ent.id, { startDate: e.target.value })} className="flex-1 px-3 py-2.5 rounded-xl border border-stone-200 text-xs bg-white" />
                          <input placeholder={ent.isCurrent ? "Actualidad" : "Fin (2024)"} value={ent.endDate} onChange={e => updateEducationEntry(ent.id, { endDate: e.target.value })} disabled={ent.isCurrent} className="flex-1 px-3 py-2.5 rounded-xl border border-stone-200 text-xs bg-white disabled:bg-stone-100" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-xs font-bold"><input type="checkbox" checked={ent.isCurrent} onChange={e => updateEducationEntry(ent.id, { isCurrent: e.target.checked, endDate: e.target.checked ? "Actualidad" : "" })} /> Actualmente estudio aquí</label>
                        <button onClick={() => removeEducationEntry(ent.id)} className="text-rose-600 hover:bg-rose-50 p-1.5 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t border-stone-200 mt-6">
                <button onClick={goPrev} className="btn-outline-warm text-xs px-5 py-3 rounded-2xl flex items-center gap-2"><ArrowLeft className="w-4 h-4" />Atrás</button>
                <button onClick={goNext} disabled={!canContinue()} className="btn-primary-orange text-xs px-6 py-3 rounded-2xl disabled:opacity-40 flex items-center gap-2">Continuar <ArrowRight className="w-4 h-4" /></button>
              </div>
            </motion.div>
          )}

          {step === "experience" && (
            <motion.div key="experience" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} className="edu-card p-6 sm:p-8 bg-white border-2 border-stone-200 rounded-4xl">
              <h2 className="text-xl font-black font-display mb-1 flex items-center gap-2"><Briefcase className="w-5 h-5 text-slate-600" /> Experiencia laboral</h2>
              <p className="text-xs text-stone-500 mb-4">{isAdult ? "Agrega empleos previos para un CV más fuerte. Si no tienes experiencia, puedes dejarlo vacío." : "Opcional: voluntariado, ayudantías, prácticas o emprendimiento familiar."}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-stone-700">{experiences.length} experiencia(s) agregada(s)</span>
                <button onClick={addExperience} className="px-4 py-2 rounded-2xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1"><Plus className="w-4 h-4" />Agregar experiencia</button>
              </div>

              {experiences.length === 0 && <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 mb-4">💡 Sin experiencia también puedes postularte: CRECE prioriza cursos y habilidades. Agrega aunque sea 1 experiencia o déjalo vacío.</div>}

              <div className="space-y-4">
                {experiences.map(exp => (
                  <div key={exp.id} className="p-4 rounded-2xl border-2 border-stone-200 bg-white space-y-3 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input placeholder="Puesto * Ej: Cajero, Ayudante cocina" value={exp.title} onChange={e => updateExperience(exp.id, { title: e.target.value })} className="px-3 py-2.5 rounded-xl border border-stone-200 text-xs bg-stone-50" />
                      <input placeholder="Empresa / Negocio * Ej: Tienda El Centro" value={exp.company} onChange={e => updateExperience(exp.id, { company: e.target.value })} className="px-3 py-2.5 rounded-xl border border-stone-200 text-xs bg-stone-50" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input placeholder="Ubicación" value={exp.location} onChange={e => updateExperience(exp.id, { location: e.target.value })} className="px-3 py-2.5 rounded-xl border border-stone-200 text-xs bg-stone-50" />
                      <input placeholder="Inicio (2023-02)" value={exp.startDate} onChange={e => updateExperience(exp.id, { startDate: e.target.value })} className="px-3 py-2.5 rounded-xl border border-stone-200 text-xs bg-stone-50" />
                      <input placeholder={exp.isCurrent ? "Actualidad" : "Fin (2024-06)"} value={exp.endDate} onChange={e => updateExperience(exp.id, { endDate: e.target.value })} disabled={exp.isCurrent} className="px-3 py-2.5 rounded-xl border border-stone-200 text-xs bg-stone-50 disabled:bg-stone-100" />
                    </div>
                    <textarea placeholder="Describe qué hacías, logros y herramientas que usaste" value={exp.description} onChange={e => updateExperience(exp.id, { description: e.target.value })} rows={2} className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs bg-stone-50" />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-xs font-bold"><input type="checkbox" checked={exp.isCurrent} onChange={e => updateExperience(exp.id, { isCurrent: e.target.checked, endDate: e.target.checked ? "Actualidad" : "" })} /> Trabajo actual</label>
                      <button onClick={() => removeExperience(exp.id)} className="text-rose-600 hover:bg-rose-50 p-1.5 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-6 border-t border-stone-200 mt-6">
                <button onClick={goPrev} className="btn-outline-warm text-xs px-5 py-3 rounded-2xl flex items-center gap-2"><ArrowLeft className="w-4 h-4" />Atrás</button>
                <button onClick={goNext} className="btn-primary-orange text-xs px-6 py-3 rounded-2xl flex items-center gap-2">Continuar <ArrowRight className="w-4 h-4" /></button>
              </div>
            </motion.div>
          )}

          {step === "skills" && (
            <motion.div key="skills" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} className="edu-card p-6 sm:p-8 bg-white border-2 border-stone-200 rounded-4xl">
              <h2 className="text-xl font-black font-display mb-1">¿Qué habilidades dominas? *</h2>
              <p className="text-xs text-stone-500 mb-4">Selecciona todas las que apliquen. Usa "Otro" para agregar habilidades personalizadas.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 max-h-80 overflow-y-auto pr-1">
                {ALL_SKILLS.map(skill => {
                  const Icon = skill.icon;
                  const sel = selectedSkills.includes(skill.id);
                  return (
                    <button key={skill.id} onClick={() => toggleSkill(skill.id)} className={`p-3 rounded-2xl border text-left text-xs font-bold flex items-center justify-between ${sel ? "bg-emerald-100 border-emerald-500 text-emerald-900" : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"}`}>
                      <span className="flex items-center gap-2.5"><Icon className={`w-4 h-4 ${skill.color}`} />{skill.label}</span>
                      {sel && <Check className="w-4 h-4 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-4 mb-6">
                <div className="text-xs font-black mb-2 flex items-center gap-2"><Wand2 className="w-4 h-4 text-amber-600" /> ¿Otra habilidad no listada? Agrégala aquí:</div>
                <div className="flex gap-2">
                  <input value={customSkillInput} onChange={e => setCustomSkillInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addCustomSkill())} placeholder="Ej: Repostería, Soldadura, Atención en farmacia..." className="flex-1 px-4 py-3 rounded-2xl border border-amber-300 bg-white text-xs" />
                  <button onClick={addCustomSkill} className="px-5 py-3 rounded-2xl bg-amber-500 text-white text-xs font-black">Agregar</button>
                </div>
                {customSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {customSkills.map(s => (
                      <span key={s} className="inline-flex items-center gap-1.5 bg-white border border-amber-300 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-full">
                        {s} <button onClick={() => removeCustomSkill(s)} className="hover:text-rose-600"><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-[11px] text-stone-500 mt-2">Estas habilidades aparecen en tu CV como "Otras competencias".</p>
              </div>

              <div className="flex justify-between pt-4 border-t border-stone-200">
                <button onClick={goPrev} className="btn-outline-warm text-xs px-5 py-3 rounded-2xl flex items-center gap-2"><ArrowLeft className="w-4 h-4" />Atrás</button>
                <button onClick={goNext} disabled={!canContinue()} className="btn-primary-orange text-xs px-6 py-3 rounded-2xl disabled:opacity-40 flex items-center gap-2"><span>{selectedSkills.length + customSkills.length > 0 ? `Continuar (${selectedSkills.length + customSkills.length})` : "Selecciona al menos 1"}</span><ArrowRight className="w-4 h-4" /></button>
              </div>
            </motion.div>
          )}

          {step === "languages" && (
            <motion.div key="languages" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} className="edu-card p-6 sm:p-8 bg-white border-2 border-stone-200 rounded-4xl">
              <h2 className="text-xl font-black font-display mb-1 flex items-center gap-2"><Languages className="w-5 h-5 text-cyan-600" /> Idiomas</h2>
              <p className="text-xs text-stone-500 mb-4">Agrega idiomas que hables. El español nativo ya está incluido.</p>

              <div className="space-y-2 mb-4">
                {languages.map((lang, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-2xl border border-stone-200 bg-stone-50">
                    <span className="text-xs font-bold">{lang.name} — <span className="text-stone-500">{lang.level}</span></span>
                    {idx > 0 && <button onClick={() => removeLanguage(idx)} className="text-rose-500 hover:bg-white p-1 rounded-xl"><Trash2 className="w-4 h-4" /></button>}
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mb-6">
                <input value={newLangName} onChange={e => setNewLangName(e.target.value)} placeholder="Idioma Ej: Inglés, K'iche'" className="flex-1 px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-xs" />
                <select value={newLangLevel} onChange={e => setNewLangLevel(e.target.value as any)} className="px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-xs font-bold">
                  <option value="Básico">Básico</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                  <option value="Nativo">Nativo</option>
                </select>
                <button onClick={addLanguage} className="px-5 py-3 rounded-2xl bg-cyan-600 text-white text-xs font-bold">Agregar</button>
              </div>

              <div className="flex justify-between pt-4 border-t border-stone-200">
                <button onClick={goPrev} className="btn-outline-warm text-xs px-5 py-3 rounded-2xl flex items-center gap-2"><ArrowLeft className="w-4 h-4" />Atrás</button>
                <button onClick={goNext} className="btn-primary-orange text-xs px-6 py-3 rounded-2xl flex items-center gap-2">Continuar <ArrowRight className="w-4 h-4" /></button>
              </div>
            </motion.div>
          )}

          {step === "interests" && (
            <motion.div key="interests" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} className="edu-card p-6 sm:p-8 bg-white border-2 border-stone-200 rounded-4xl">
              <h2 className="text-xl font-black font-display mb-1">Intereses & preferencias laborales</h2>
              <p className="text-xs text-stone-500 mb-4">Para recomendarte cursos y empleos ultra personalizados {isAdult ? "" : " (algoritmo mejorado para menores)"}.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {ALL_INTERESTS.map(it => {
                  const Icon = it.icon;
                  const sel = selectedInterests.includes(it.id);
                  return (
                    <button key={it.id} onClick={() => toggleInterest(it.id)} className={`p-3.5 rounded-2xl border text-left text-xs font-bold flex items-center justify-between ${sel ? "bg-amber-100 border-amber-500 text-amber-950" : "bg-stone-50 border-stone-200 text-stone-700"}`}>
                      <span className="flex items-center gap-2.5"><Icon className="w-4 h-4 text-orange-600" />{it.label}</span>
                      {sel && <Check className="w-4 h-4 text-orange-600" />}
                    </button>
                  );
                })}
              </div>

              {!isAdult && selectedInterests.length > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 mb-6 text-xs">
                  <span className="font-black text-emerald-800">✨ Recomendación inteligente activada:</span>
                  <span className="text-stone-600"> Tus cursos se ordenarán priorizando {selectedInterests.slice(0, 3).join(", ")} y oficios manuales relacionados.</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase">Disponibilidad *</label>
                  <select value={availabilityDetail} onChange={e => setAvailabilityDetail(e.target.value)} className="w-full mt-1 px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm">
                    <option value="">Selecciona tu horario</option>
                    {AVAILABILITY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase">Preferencia de contrato *</label>
                  <select value={contractPreference} onChange={e => setContractPreference(e.target.value)} className="w-full mt-1 px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm">
                    <option value="">Selecciona</option>
                    {CONTRACT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                {isAdult && (
                  <div>
                    <label className="text-xs font-bold uppercase flex items-center gap-1"><DollarSign className="w-3 h-3" /> Expectativa salarial</label>
                    <input value={salaryExpectation} onChange={e => setSalaryExpectation(e.target.value)} placeholder="Ej: Q3,500 - Q4,500 o A convenir" className="w-full mt-1 px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm" />
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase flex items-center gap-1"><LinkIcon className="w-3 h-3" /> LinkedIn (opcional)</label>
                    <input value={linkedinUrl} onChange={e => setLinkedinUrl(e.target.value)} placeholder="https://linkedin.com/in/..." className="w-full mt-1 px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase flex items-center gap-1"><LinkIcon className="w-3 h-3" /> Portafolio / Web</label>
                    <input value={portfolioUrl} onChange={e => setPortfolioUrl(e.target.value)} placeholder="https://..." className="w-full mt-1 px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t border-stone-200 mt-6">
                <button onClick={goPrev} className="btn-outline-warm text-xs px-5 py-3 rounded-2xl flex items-center gap-2"><ArrowLeft className="w-4 h-4" />Atrás</button>
                <button onClick={goNext} disabled={!canContinue()} className="btn-primary-orange text-xs px-6 py-3 rounded-2xl disabled:opacity-40 flex items-center gap-2">Continuar <ArrowRight className="w-4 h-4" /></button>
              </div>
            </motion.div>
          )}

          {step === "summary" && (
            <motion.div key="summary" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} className="edu-card p-6 sm:p-8 bg-white border-2 border-stone-200 rounded-4xl">
              <h2 className="text-xl font-black font-display mb-1 flex items-center gap-2"><FileText className="w-5 h-5 text-orange-500" /> Resumen profesional</h2>
              <p className="text-xs text-stone-500 mb-4">Este texto aparece al inicio de tu CV. Hazlo breve y potente.</p>

              <div className="mb-4">
                <label className="text-xs font-bold uppercase">Titular / Headline * Ej: Perito Contador · Atención al cliente</label>
                <input value={headline} onChange={e => setHeadline(e.target.value)} placeholder="Ej: Estudiante técnico en gastronomía, apasionado por cocina innovadora" className="w-full mt-1 px-4 py-3 rounded-2xl border-2 border-stone-200 bg-stone-50 text-sm focus:border-orange-500 focus:bg-white outline-none" />
                <div className="text-[11px] text-stone-400 mt-1">{headline.length}/80 — Aparece bajo tu nombre</div>
              </div>

              <div className="mb-6">
                <label className="text-xs font-bold uppercase">Resumen / Sobre mí *</label>
                <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={5} placeholder={isAdult ? "Ej: Profesional responsable con 2 años en atención al cliente... Busco aportar..." : "Ej: Joven curioso, me gusta la tecnología y la cocina. Quiero aprender programación y emprender..."} className="w-full mt-1 px-4 py-3 rounded-2xl border-2 border-stone-200 bg-stone-50 text-sm focus:border-orange-500 focus:bg-white outline-none resize-none" />
                <div className="text-[11px] text-stone-400 mt-1">{summary.length} caracteres — mínimo 15, ideal 120-250</div>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 mb-6">
                <div className="text-xs font-black mb-2">Vista previa de tu CV:</div>
                <div className="flex gap-3 items-start bg-white p-3 rounded-2xl border border-stone-200">
                  <img src={avatar || "https://via.placeholder.com/80"} alt="foto" className="w-16 h-16 rounded-2xl object-cover border-2 border-stone-200" />
                  <div>
                    <div className="font-black text-sm">{name} {lastName}</div>
                    <div className="text-xs text-orange-600 font-bold">{headline || "Tu titular aquí"}</div>
                    <div className="text-[11px] text-stone-500 line-clamp-2">{summary || "Tu resumen aparecerá aquí..."}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t border-stone-200">
                <button onClick={goPrev} className="btn-outline-warm text-xs px-5 py-3 rounded-2xl flex items-center gap-2"><ArrowLeft className="w-4 h-4" />Atrás</button>
                <button onClick={() => setStep("done")} disabled={!canContinue()} className="btn-primary-orange text-xs px-6 py-3 rounded-2xl disabled:opacity-40 flex items-center gap-2">Ver resumen final <ArrowRight className="w-4 h-4" /></button>
              </div>
            </motion.div>
          )}

          {step === "done" && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="edu-card p-6 sm:p-10 bg-white border-2 border-stone-200 rounded-4xl text-center">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6"><Sparkles className="w-8 h-8" /></div>
              <h2 className="text-2xl sm:text-3xl font-black font-display mb-2">¡Tu CV está listo!</h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-6">Hemos armado un perfil profesional completo con foto, experiencia, educación y habilidades.</p>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs space-y-2 mb-6 max-w-md mx-auto">
                <div className="flex justify-between"><span className="text-stone-500">Nombre:</span><span className="font-extrabold">{name} {lastName}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Foto:</span><span className="font-extrabold text-emerald-700">{avatar ? "✓ Cargada" : "Sin foto"}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Ubicación:</span><span className="font-extrabold">{location}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Educación:</span><span className="font-extrabold truncate max-w-[180px]">{education}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Habilidades:</span><span className="font-extrabold">{selectedSkills.length + customSkills.length} (incl. {customSkills.length} personalizadas)</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Idiomas:</span><span className="font-extrabold">{languages.length}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Intereses:</span><span className="font-extrabold text-orange-700">{selectedInterests.length}</span></div>
                {customSkills.length > 0 && <div className="flex justify-between"><span className="text-stone-500">Otras:</span><span className="font-extrabold">{customSkills.join(", ")}</span></div>}
              </div>

              {!avatar && <div className="mb-6 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 flex items-center justify-center gap-2"><AlertCircle className="w-4 h-4" /> Debes subir foto antes de generar el CV</div>}

              <button onClick={handleFinish} disabled={saving || !avatar} className="w-full max-w-md btn-primary-orange py-4 text-sm font-black mx-auto rounded-2xl disabled:opacity-40">
                {saving ? "Generando tu feed..." : "Entrar a mi Catálogo Personalizado →"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-3xl mx-auto w-full px-4 py-4 text-center text-xs text-stone-500">
        CRECE GT · CV Profesional con foto · Tus datos están protegidos
      </footer>
    </div>
  );
}
