// ──────────────────────────────────────────────
// CRECE — Profile Page (Insignias & Certificados)
// ──────────────────────────────────────────────
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "../context/UserContext";
import Header from "../components/Header";
import { 
  Sparkles, 
  Award, 
  GraduationCap, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  Download, 
  Share2, 
  ExternalLink, 
  Briefcase, 
  MapPin, 
  Lock, 
  CheckCircle2, 
  Star,
  Zap,
  Code,
  Compass,
  ArrowLeft
} from "lucide-react";

export default function ProfilePage() {
  const { user } = useUser();
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!user) return null;

  const isMinor = !user.isAdult;

  // Icon resolver for badges
  const renderBadgeIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case "Zap": return <Zap className="w-6 h-6 text-orange-500" />;
      case "GraduationCap": return <GraduationCap className="w-6 h-6 text-amber-500" />;
      case "Code": return <Code className="w-6 h-6 text-cyan-600" />;
      case "Compass": return <Compass className="w-6 h-6 text-emerald-600" />;
      case "Sparkles": return <Sparkles className="w-6 h-6 text-amber-500" />;
      default: return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
    }
  };

  function copyValidationCode(code: string) {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  }

  const certificates = user.certificates || [];
  const badges = user.badges || [];
  const totalHours = certificates.reduce((acc, c) => acc + (c.hoursCompleted || 0), 0);

  return (
    <div className="min-h-screen bg-[#F7F4EA] text-stone-900 pb-24">
      <Header isMinor={isMinor} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Back Link */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-orange-600 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al Catálogo Principal</span>
        </Link>

        {/* ── PROFILE HERO HEADER CARD ── */}
        <div className="edu-card p-6 sm:p-8 bg-white rounded-4xl border-2 border-stone-200 mb-10 shadow-soft-card">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Left: Avatar & Info */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 shadow-sm ${
                    isMinor ? "ring-amber-300 bg-amber-50 p-1" : "ring-emerald-400 bg-white"
                  }`}
                />
                <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 bg-emerald-600 rounded-full text-white ring-2 ring-white text-xs font-black">
                  ✓
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h1 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
                    {user.name}
                  </h1>
                  
                  {isMinor ? (
                    <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-extrabold px-3 py-1 rounded-full">
                      <Lock className="w-3 h-3 text-amber-700" />
                      Perfil Seguro de Menor de Edad
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-extrabold px-3 py-1 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Candidata Verificada
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-stone-600 font-medium mb-3 max-w-xl">
                  {user.headline}
                </p>

                {/* Privacy & Location badges */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 font-semibold">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    {user.location}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                    {user.education}
                  </span>
                  {isMinor && (
                    <>
                      <span>·</span>
                      <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 text-[11px]">
                        🔒 Datos Sensibles Ocultos
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Quick Stats Ribbon */}
            <div className="flex items-center gap-3 sm:gap-4 bg-stone-50 p-4 rounded-3xl border border-stone-200/80">
              <div className="text-center px-3 border-r border-stone-200">
                <div className="text-2xl font-black text-orange-600 font-display">
                  {certificates.length}
                </div>
                <div className="text-[10px] font-bold text-stone-500 uppercase">Certificados</div>
              </div>

              <div className="text-center px-3 border-r border-stone-200">
                <div className="text-2xl font-black text-amber-600 font-display">
                  {badges.length}
                </div>
                <div className="text-[10px] font-bold text-stone-500 uppercase">Insignias</div>
              </div>

              <div className="text-center px-3">
                <div className="text-2xl font-black text-emerald-600 font-display">
                  {totalHours}h
                </div>
                <div className="text-[10px] font-bold text-stone-500 uppercase">Capacitación</div>
              </div>
            </div>

          </div>
        </div>

        {/* ── SECTION 1: BADGES / INSIGNIAS & LOGROS ── */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-800">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-display">
                  Mis Insignias & Logros Desbloqueados
                </h2>
                <p className="text-xs text-stone-500">
                  Reconocimientos por avance de estudio, compatibilidad laboral y participación
                </p>
              </div>
            </div>
            <span className="text-xs font-extrabold text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
              {badges.length} insignias ganadas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {badges.map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={{ y: -3 }}
                className="edu-card p-5 bg-white rounded-3xl border-2 border-stone-200 flex items-start gap-4 shadow-sm"
              >
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 shrink-0 shadow-sm">
                  {renderBadgeIcon(badge.icon, badge.accentColor)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-extrabold text-stone-900 text-sm truncate">
                      {badge.title}
                    </h3>
                    <span className="text-[10px] font-bold text-stone-400">
                      {badge.unlockedDate}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium">
                    {badge.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── SECTION 2: OFFICIAL CERTIFICATES ── */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-800">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-display">
                  Mis Certificados Oficiales Verificables
                </h2>
                <p className="text-xs text-stone-500">
                  Diplomas emitidos por Google, Cisco, Microsoft e INTECAP con folio QR oficial
                </p>
              </div>
            </div>
            <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full">
              {certificates.length} diplomas emitidos
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="edu-card p-6 bg-white rounded-3xl border-2 border-stone-200 shadow-soft-card flex flex-col justify-between"
              >
                <div>
                  {/* Top Header of Certificate */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-xs">
                        🎓
                      </div>
                      <div>
                        <span className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">
                          {cert.organization}
                        </span>
                        <div className="text-[10px] text-stone-400 font-medium">
                          Emitido el {cert.issueDate}
                        </div>
                      </div>
                    </div>

                    <span className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verificado
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="font-extrabold text-stone-900 text-base leading-snug mb-3">
                    {cert.courseTitle}
                  </h3>

                  {/* Skills tags */}
                  <div className="space-y-1.5 mb-4">
                    <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      Habilidades Acreditadas:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skillsGained.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-stone-100 text-stone-700 text-[11px] font-semibold px-2.5 py-1 rounded-xl border border-stone-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Validation Code */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-200 mb-4 text-xs">
                    <div>
                      <div className="text-[10px] font-bold text-stone-400">Folio de Verificación</div>
                      <div className="font-mono font-bold text-stone-800">{cert.validationCode}</div>
                    </div>
                    <button
                      onClick={() => copyValidationCode(cert.validationCode)}
                      className="text-[11px] font-extrabold text-orange-600 hover:text-orange-700 bg-white border border-stone-200 px-2.5 py-1 rounded-xl shadow-sm"
                    >
                      {copiedCode === cert.validationCode ? "¡Copiado! ✓" : "Copiar Folio"}
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex-1 btn-outline-warm text-xs py-2.5 rounded-2xl font-extrabold"
                  >
                    Ver Diploma Completo
                  </button>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-warm text-xs py-2.5 px-3 rounded-2xl text-stone-600 hover:text-blue-600"
                    title="Compartir en LinkedIn"
                  >
                    <Share2 className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── MODAL: VISTA PREVIA DEL DIPLOMA ── */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-4xl border-4 border-amber-300 shadow-2xl p-6 sm:p-10 max-w-2xl w-full text-center relative overflow-hidden"
            >
              {/* Diploma Gold Border Trim */}
              <div className="absolute top-2 left-2 right-2 bottom-2 border-2 border-dashed border-amber-200 rounded-3xl pointer-events-none" />

              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>

              <span className="text-xs font-black tracking-widest text-orange-600 uppercase">
                ALIANZA CRECE GUATEMALA
              </span>

              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 font-display mt-1 mb-2">
                Certificado de Aprobación Oficial
              </h3>

              <p className="text-xs text-stone-500 mb-6">
                Se otorga con distinción y reconocimiento de competencias a:
              </p>

              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-serif border-b-2 border-stone-200 pb-2 mb-4 inline-block">
                {user.name}
              </div>

              <p className="text-xs text-stone-600 max-w-md mx-auto mb-6 leading-relaxed">
                Por haber completado satisfactoriamente {selectedCert.hoursCompleted} horas lectivas y prácticas en el programa formativo de:
              </p>

              <div className="text-base sm:text-lg font-black text-stone-900 bg-amber-50 py-3 px-4 rounded-2xl border border-amber-200 mb-6">
                {selectedCert.courseTitle}
              </div>

              <div className="grid grid-cols-2 gap-4 text-left text-xs bg-stone-50 p-4 rounded-2xl border border-stone-200 mb-6">
                <div>
                  <span className="text-stone-400 font-semibold">Institución Emisora:</span>
                  <div className="font-bold text-stone-800">{selectedCert.organization}</div>
                </div>
                <div>
                  <span className="text-stone-400 font-semibold">Código Único Verificable:</span>
                  <div className="font-mono font-bold text-emerald-700">{selectedCert.validationCode}</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="btn-outline-warm text-xs px-6 py-3 rounded-2xl font-bold"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    alert(`Descargando diploma oficial en PDF de ${selectedCert.courseTitle}...`);
                  }}
                  className="btn-primary-orange text-xs px-6 py-3 rounded-2xl font-extrabold flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Diploma (PDF)</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}

      </main>
    </div>
  );
}
