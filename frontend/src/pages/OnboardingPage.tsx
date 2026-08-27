// ──────────────────────────────────────────────
// CRECE — Onboarding Wizard (Estilo Coursera & Udemy)
// ──────────────────────────────────────────────
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../context/UserContext";
import type { UserProfile } from "../types";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  HeartHandshake, 
  MessageSquare, 
  Laptop, 
  FileSpreadsheet, 
  Share2, 
  ClipboardList, 
  Users, 
  Car, 
  Languages, 
  Palette, 
  Wand2, 
  Keyboard, 
  Code, 
  Rocket, 
  Boxes, 
  CheckCircle2
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
];

const EDUCATION_OPTIONS = [
  "Diversificado Completo (Perito / Bachillerato)",
  "Diversificado en Curso",
  "Tercero Básico Completo",
  "Capacitación Técnica / INTECAP",
  "Universidad en Curso (Nocturna / Fin de semana)",
  "Primaria o Básico en Proceso",
];

const LOCATIONS = [
  "Ciudad de Guatemala (Metropolitana)",
  "Quetzaltenango & Occidente",
  "Escuintla & Costa Sur",
  "Antigua Guatemala / Sacatepéquez",
  "Cobán & Alta Verapaz",
  "Huehuetenango",
  "San Marcos / Altiplano",
  "Otro Departamento",
];

type Step = "age" | "education" | "location" | "skills" | "interests" | "done";

export default function OnboardingPage() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("age");
  const [isAdult, setIsAdult] = useState<boolean | null>(null);
  const [education, setEducation] = useState("");
  const [location, setLocation] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const steps: Step[] =
    isAdult === false
      ? ["age", "education", "location", "interests", "done"]
      : ["age", "education", "location", "skills", "interests", "done"];

  const currentIdx = steps.indexOf(step);
  const totalSteps = steps.length - 1;
  const progress = step === "done" ? 100 : Math.round((currentIdx / totalSteps) * 100);

  function toggleSkill(id: string) {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function toggleInterest(id: string) {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function goNext() {
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) {
      setStep(steps[idx + 1]);
    }
  }

  function goPrev() {
    const idx = steps.indexOf(step);
    if (idx > 0) {
      setStep(steps[idx - 1]);
    }
  }

  async function handleFinish() {
    if (!user) return;
    setSaving(true);
    const age = isAdult ? 20 : 16;
    const updated: Partial<UserProfile> = {
      id: user.id,
      name: user.name || "Joven CRECE",
      email: user.email || `${user.id}@crece.gt`,
      phone: user.phone || "5555-0000",
      avatar: isAdult
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
        : "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=DiegoGT&backgroundColor=b6e3f4",
      isSafeAvatar: !isAdult,
      headline: isAdult ? "Buscando empleo formal con capacitación" : "Estudiante enfocado en becas y desarrollo técnico",
      age,
      isAdult: isAdult ?? false,
      education,
      location,
      skills: selectedSkills,
      interests: selectedInterests,
      availability: isAdult ? "Tiempo Completo" : "Medio Tiempo",
      badges: [
        {
          id: "b-welcome",
          title: "Perfil Creado",
          description: "Completó exitosamente el registro inicial en CRECE.",
          icon: "Sparkles",
          unlockedDate: "Hoy",
          category: "special",
          accentColor: "emerald"
        }
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
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col justify-between">
      
      {/* Progress Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 py-4 shadow-sm">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-orange-500 text-white font-extrabold text-xs shadow-sm">
              {currentIdx + 1}
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Configura tu Perfil CRECE
              </div>
              <div className="text-[11px] text-stone-500 font-medium">
                Paso {currentIdx + 1} de {totalSteps}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-black text-orange-600">{progress}%</span>
            <div className="w-24 sm:w-36 bg-stone-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-orange-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Wizard Step Box */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          
          {/* ── PASO 1: EDAD ── */}
          {step === "age" && (
            <motion.div
              key="age"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="edu-card p-6 sm:p-10 bg-white border-2 border-stone-200 shadow-soft-hover rounded-4xl"
            >
              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-3 border border-orange-200">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  Experiencia Personalizada
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-stone-900 font-display mb-2">
                  ¿Cuál es tu rango de edad?
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
                  En Guatemala las oportunidades se adaptan a tu edad legal para garantizar una experiencia 100% segura.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setIsAdult(true);
                    setStep("education");
                  }}
                  className="p-6 rounded-3xl bg-emerald-50/70 border-2 border-emerald-300 hover:border-emerald-500 hover:bg-emerald-100/60 transition-all text-left group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-extrabold text-stone-900 mb-1">
                    Tengo 18 años o más
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Acceso a empleos formales, cálculo de compatibilidad salarial y becas.
                  </p>
                </button>

                <button
                  onClick={() => {
                    setIsAdult(false);
                    setStep("education");
                  }}
                  className="p-6 rounded-3xl bg-amber-50/70 border-2 border-amber-300 hover:border-orange-400 hover:bg-amber-100/60 transition-all text-left group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-extrabold text-stone-900 mb-1">
                    Tengo menos de 18 años
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Acceso exclusivo a cursos gratuitos, habilidades digitales y becas.
                  </p>
                </button>
              </div>
            </motion.div>
          )}

          {/* ── PASO 2: EDUCACIÓN ── */}
          {step === "education" && (
            <motion.div
              key="education"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="edu-card p-6 sm:p-10 bg-white border-2 border-stone-200 shadow-soft-hover rounded-4xl"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-black text-stone-900 font-display mb-1">
                  ¿Cuál es tu nivel de estudios actual?
                </h2>
                <p className="text-xs text-stone-500">
                  Selecciona la opción que mejor describa tu situación académica:
                </p>
              </div>

              <div className="space-y-2.5 mb-8">
                {EDUCATION_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setEducation(opt)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-between ${
                      education === opt
                        ? "bg-orange-50 border-orange-500 text-orange-900 shadow-sm"
                        : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
                    }`}
                  >
                    <span>{opt}</span>
                    {education === opt && (
                      <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <button onClick={goPrev} className="btn-outline-warm text-xs py-3 px-5 rounded-2xl">
                  <ArrowLeft className="w-4 h-4" />
                  Atrás
                </button>
                <button
                  onClick={goNext}
                  disabled={!education}
                  className="btn-primary-orange text-xs py-3 px-6 rounded-2xl disabled:opacity-40"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── PASO 3: UBICACIÓN ── */}
          {step === "location" && (
            <motion.div
              key="location"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="edu-card p-6 sm:p-10 bg-white border-2 border-stone-200 shadow-soft-hover rounded-4xl"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-black text-stone-900 font-display mb-1">
                  ¿En qué departamento vives?
                </h2>
                <p className="text-xs text-stone-500">
                  Para priorizar oportunidades cercanas a tu zona:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setLocation(loc)}
                    className={`p-3.5 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                      location === loc
                        ? "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm"
                        : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{loc}</span>
                    </div>
                    {location === loc && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <button onClick={goPrev} className="btn-outline-warm text-xs py-3 px-5 rounded-2xl">
                  <ArrowLeft className="w-4 h-4" />
                  Atrás
                </button>
                <button
                  onClick={goNext}
                  disabled={!location}
                  className="btn-primary-orange text-xs py-3 px-6 rounded-2xl disabled:opacity-40"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── PASO 4: HABILIDADES (Solo Adultos) ── */}
          {step === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="edu-card p-6 sm:p-10 bg-white border-2 border-stone-200 shadow-soft-hover rounded-4xl"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-black text-stone-900 font-display mb-1">
                  ¿Qué habilidades ya dominas?
                </h2>
                <p className="text-xs text-stone-500">
                  Selecciona todas las que apliquen para calcular tu match automático:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-h-72 overflow-y-auto pr-1">
                {ALL_SKILLS.map((skill) => {
                  const Icon = skill.icon;
                  const isSelected = selectedSkills.includes(skill.id);
                  return (
                    <button
                      key={skill.id}
                      onClick={() => toggleSkill(skill.id)}
                      className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "bg-emerald-100 border-emerald-500 text-emerald-900 shadow-sm"
                          : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${skill.color}`} />
                        <span>{skill.label}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <button onClick={goPrev} className="btn-outline-warm text-xs py-3 px-5 rounded-2xl">
                  <ArrowLeft className="w-4 h-4" />
                  Atrás
                </button>
                <button onClick={goNext} className="btn-primary-orange text-xs py-3 px-6 rounded-2xl">
                  <span>{selectedSkills.length > 0 ? `Continuar (${selectedSkills.length})` : "Omitir por ahora"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── PASO 5: INTERESES ── */}
          {step === "interests" && (
            <motion.div
              key="interests"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="edu-card p-6 sm:p-10 bg-white border-2 border-stone-200 shadow-soft-hover rounded-4xl"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-black text-stone-900 font-display mb-1">
                  ¿Qué áreas te gustaría aprender?
                </h2>
                <p className="text-xs text-stone-500">
                  Para sugerirte las mejores becas y cursos de Coursera, Google y Microsoft:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {ALL_INTERESTS.map((interest) => {
                  const Icon = interest.icon;
                  const isSelected = selectedInterests.includes(interest.id);
                  return (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`p-3.5 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "bg-amber-100 border-amber-500 text-amber-950 shadow-sm"
                          : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-orange-600" />
                        <span>{interest.label}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-orange-600" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <button onClick={goPrev} className="btn-outline-warm text-xs py-3 px-5 rounded-2xl">
                  <ArrowLeft className="w-4 h-4" />
                  Atrás
                </button>
                <button
                  onClick={() => setStep("done")}
                  disabled={selectedInterests.length === 0}
                  className="btn-primary-orange text-xs py-3 px-6 rounded-2xl disabled:opacity-40"
                >
                  Finalizar Perfil
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── PASO FINAL: RESUMEN ── */}
          {step === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="edu-card p-6 sm:p-10 bg-white border-2 border-stone-200 shadow-soft-hover rounded-4xl text-center"
            >
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Sparkles className="w-8 h-8" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display mb-2">
                ¡Tu perfil está listo!
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-8 font-medium">
                Hemos preparado tu catálogo de oportunidades y becas personalizadas.
              </p>

              {/* Resumen Card */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs space-y-2 mb-8 max-w-md mx-auto">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-medium">Modo de Cuenta:</span>
                  <span className="font-extrabold text-stone-900">{isAdult ? "Adulto (Empleo + Becas)" : "Menor de edad (Solo Becas)"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-medium">Ubicación:</span>
                  <span className="font-extrabold text-emerald-700">{location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-medium">Educación:</span>
                  <span className="font-extrabold text-stone-900 truncate max-w-[190px]">{education}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-medium">Intereses:</span>
                  <span className="font-extrabold text-orange-700">{selectedInterests.length} seleccionados</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                disabled={saving}
                className="w-full max-w-md btn-primary-orange py-4 text-sm font-black mx-auto rounded-2xl"
              >
                {saving ? "Generando tu feed..." : "Entrar a mi Catálogo Personalizado →"}
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="max-w-2xl mx-auto w-full px-4 py-4 text-center text-xs text-stone-500">
        CRECE GT · Registro Rápido sin Contraseñas
      </footer>
    </div>
  );
}
