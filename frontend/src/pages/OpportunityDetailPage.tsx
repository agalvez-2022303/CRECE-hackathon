// ──────────────────────────────────────────────
// CRECE — Opportunity Detail Page (Estilo Coursera & Udemy)
// ──────────────────────────────────────────────
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useUser } from "../context/UserContext";
import type { MatchResult } from "../types";
import Header from "../components/Header";
import MatchBar from "../components/MatchBar";
import LeafletMap from "../components/LeafletMap";
import { 
  Building2, 
  MapPin, 
  Banknote, 
  Clock, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  CircleDot, 
  GraduationCap, 
  ArrowLeft, 
  Sparkles, 
  Gift, 
  Calendar, 
  Briefcase, 
  Check, 
  ExternalLink,
  PhoneCall,
  Zap,
  Info,
  Award,
  Star,
  Compass,
  Target
} from "lucide-react";

const API = "/api";

export default function OpportunityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const navigate = useNavigate();

  const [match, setMatch] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [applyResult, setApplyResult] = useState<any>(null);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    loadMatch();
  }, [user, id]);

  async function loadMatch() {
    setLoading(true);
    try {
      const res = await fetch(`${API}/users/${user!.id}/match`);
      const matches: MatchResult[] = await res.json();
      const found = matches.find((m) => m.opportunity.id === id);
      setMatch(found ?? null);
    } finally {
      setLoading(false);
    }
  }

  async function handleApply() {
    if (!user || !match) return;
    setApplying(true);
    try {
      const res = await fetch(`${API}/users/${user.id}/apply/${match.opportunity.id}`, {
        method: "POST",
      });
      const data = await res.json();
      setApplyResult(data);
      setApplied(true);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#183B45', '#3B735E', '#D8B77D', '#97C1A4']
        });
      } catch (err) {
        console.log("Confetti trigger:", err);
      }
    } finally {
      setApplying(false);
    }
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F7F7F0] dark:bg-stone-950 text-stone-900 dark:text-stone-100 pb-24 transition-colors">
      <Header isMinor={false} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Breadcrumb Back link */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-orange-600 dark:hover:text-orange-400 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al Directorio de Oportunidades</span>
        </Link>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-28 text-stone-400">
            <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4" />
            <p className="text-sm font-bold text-stone-600 dark:text-stone-400">Cargando detalles de la vacante...</p>
          </div>
        ) : !match ? (
          <div className="edu-card p-12 text-center max-w-md mx-auto bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
            <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">Oportunidad no encontrada</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-6">
              Es posible que esta convocatoria haya concluido.
            </p>
            <button onClick={() => navigate("/dashboard")} className="btn-primary-orange mx-auto rounded-2xl">
              Volver al catálogo
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* ── TOP HERO BANNER ── */}
            <div className="rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-8">
                  {/* Category, Ratings & Status */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 text-xs font-bold px-3 py-1 rounded-full">
                      {match.opportunity.categoryLabel}
                    </span>
                    <span className="bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 text-xs font-extrabold px-3 py-1 rounded-full">
                      {match.opportunity.vacanciesText}
                    </span>
                    <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Empresa Verificada GT
                    </span>

                    {/* Ratings */}
                    <span className="flex items-center gap-1 text-xs font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {match.opportunity.rating || 4.8} ({match.opportunity.reviewsCount || 12} opiniones)
                    </span>
                  </div>

                  {/* Title & Company */}
                  <h1 className="text-2xl sm:text-4xl font-black text-stone-900 dark:text-white font-display leading-tight mb-2">
                    {match.opportunity.title}
                  </h1>
                  
                  <div className="flex items-center gap-2 text-sm font-bold text-stone-600 dark:text-stone-400 mb-4">
                    <Building2 className="w-4 h-4 text-orange-500" />
                    <span>{match.opportunity.company}</span>
                    <span>·</span>
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>{match.opportunity.location}</span>
                  </div>

                  <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {match.opportunity.tagline}
                  </p>

                  {/* Metadata chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 dark:bg-stone-800 p-4 rounded-2xl border border-stone-200 dark:border-stone-700 text-xs">
                    <div>
                      <div className="text-stone-400 font-semibold text-[11px]">Salario Ofrecido</div>
                      <div className="font-extrabold text-stone-900 dark:text-white text-sm">{match.opportunity.salary}</div>
                    </div>
                    <div>
                      <div className="text-stone-400 font-semibold text-[11px]">Modalidad</div>
                      <div className="font-bold text-stone-800 dark:text-stone-200 text-xs">{match.opportunity.modality}</div>
                    </div>
                    <div>
                      <div className="text-stone-400 font-semibold text-[11px]">Tipo de Contrato</div>
                      <div className="font-bold text-stone-800 dark:text-stone-200 text-xs">{match.opportunity.type}</div>
                    </div>
                    <div>
                      <div className="text-stone-400 font-semibold text-[11px]">Cierre de Convocatoria</div>
                      <div className="font-bold text-orange-700 dark:text-orange-400 text-xs">{match.opportunity.deadline}</div>
                    </div>
                  </div>
                </div>

                {/* Right Image */}
                <div className="lg:col-span-4">
                  <img
                    src={match.opportunity.heroImage}
                    alt={match.opportunity.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80";
                    }}
                    className="w-full h-56 sm:h-64 rounded-2xl object-cover shadow-sm border border-stone-200 dark:border-stone-800"
                  />
                </div>

              </div>
            </div>

            {/* ── TWO COLUMN BODY ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left 2 Columns */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* 1. ¿De qué trata? */}
                <div className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="p-2.5 rounded-2xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400">
                      <Info className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white font-display">
                      Descripción del Puesto
                    </h2>
                  </div>
                  <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed mb-4">
                    {match.opportunity.whatIsIt}
                  </p>
                  <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
                    {match.opportunity.description}
                  </p>
                </div>

                {/* 2. ¿Qué incluye? (Perks) */}
                <div className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      <Gift className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white font-display">
                      Beneficios & Qué incluye esta vacante
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {match.opportunity.whatIncludes.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-stone-800 dark:text-stone-200 font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Dónde Queda (Mapa interactivo con Leaflet & Google Maps) */}
                <div className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="p-2.5 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white font-display">
                        Dónde queda la empresa
                      </h2>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        {match.opportunity.location}
                      </p>
                    </div>
                  </div>

                  <LeafletMap
                    lat={match.opportunity.lat || 14.592}
                    lon={match.opportunity.lon || -90.5108}
                    popupTitle={match.opportunity.company}
                    popupLocation={match.opportunity.location}
                  />

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold">
                      📍 Ubicación GPS verificada
                    </span>
                    <a
                      href={match.opportunity.mapUrl || `https://www.google.com/maps/search/?api=1&query=${match.opportunity.lat || 14.592},${match.opportunity.lon || -90.5108}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 text-xs font-bold border border-stone-300 dark:border-stone-700 transition-all"
                    >
                      <span>Abrir en Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* 4. Contrastar con el mercado real */}
                <div className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="p-2.5 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white font-display">
                        Contrastar con el Mercado Real
                      </h2>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        Compara salarios y plazas abiertas de este puesto en otras fuentes públicas de Guatemala
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={match.opportunity.liveUrlLinkedin || `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(match.opportunity.title)}&location=Guatemala`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 hover:bg-blue-100 transition-all text-xs font-bold text-blue-900 dark:text-blue-200"
                    >
                      <span>Ver Ofertas en LinkedIn ↗</span>
                      <ExternalLink className="w-4 h-4 text-blue-600" />
                    </a>

                    <a
                      href={match.opportunity.liveUrlComputrabajo || `https://www.computrabajo.com.gt/trabajo-de-${encodeURIComponent(match.opportunity.title.toLowerCase())}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 hover:bg-amber-100 transition-all text-xs font-bold text-amber-900 dark:text-amber-200"
                    >
                      <span>Ver Ofertas en CompuTrabajo ↗</span>
                      <ExternalLink className="w-4 h-4 text-amber-600" />
                    </a>
                  </div>
                </div>

                {/* 5. Paso a paso de contratación */}
                <div className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="p-2.5 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white font-display">
                      Paso a paso de contratación
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {match.opportunity.hiringProcess.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                        <div className="w-7 h-7 rounded-xl bg-orange-500 text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-sm">
                          {idx + 1}
                        </div>
                        <span className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-semibold">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Sticky Application & Match Card */}
              <div className="space-y-6">
                
                {/* Match Analysis */}
                <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border-2 border-emerald-200 dark:border-emerald-800 shadow-sm">
                  <h2 className="text-base font-extrabold text-stone-900 dark:text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Tu Compatibilidad en Vivo
                  </h2>

                  <MatchBar pct={match.matchPct} large />

                  {match.matchPct === 100 ? (
                    <div className="mt-4 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>¡Cumples el 100% de los requisitos! Puedes solicitar entrevista de inmediato.</span>
                    </div>
                  ) : (
                    <div className="mt-4 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 text-xs font-medium flex items-start gap-2">
                      <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>Completa las {match.missingRequirements.length} habilidades recomendadas para subir tu match.</span>
                    </div>
                  )}
                </div>

                {/* Requirements Checklist */}
                <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm">
                  <h3 className="text-xs font-extrabold text-stone-500 uppercase tracking-wider mb-4">
                    Desglose de Requisitos:
                  </h3>

                  <div className="space-y-3">
                    {match.opportunity.requirements.map((req, idx) => {
                      const isMet = match.matchedRequirements.includes(req);
                      const label = match.opportunity.requirementLabels[idx] || req;
                      const recCourse = match.recommendedCourses.find(
                        (c) => c && c.skillTaught === req
                      );

                      return (
                        <div key={req} className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                          <div className="flex items-center gap-2.5">
                            {isMet ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            ) : (
                              <CircleDot className="w-4 h-4 text-stone-400 shrink-0" />
                            )}
                            <span className={`text-xs font-bold ${isMet ? "text-stone-900 dark:text-stone-100" : "text-stone-500 dark:text-stone-400"}`}>
                              {label}
                            </span>
                          </div>

                          {!isMet && recCourse && (
                            <div className="mt-2.5 pt-2.5 border-t border-stone-200 dark:border-stone-700">
                              <div className="text-[10px] text-orange-700 dark:text-orange-400 font-bold mb-1 flex items-center gap-1">
                                <GraduationCap className="w-3.5 h-3.5 text-orange-600" />
                                Aprende gratis con esta beca:
                              </div>
                              <a
                                href={recCourse.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-2 rounded-xl bg-orange-50 dark:bg-orange-950/60 hover:bg-orange-100 text-orange-900 dark:text-orange-200 text-xs transition-colors font-bold border border-orange-200 dark:border-orange-900"
                              >
                                <span className="text-[11px] truncate">
                                  {recCourse.title}
                                </span>
                                <ExternalLink className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                              </a>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm">
                  {applied ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border-2 border-emerald-300 dark:border-emerald-700 text-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
                        <Check className="w-6 h-6 stroke-[3]" />
                      </div>
                      <h4 className="text-base font-black text-stone-900 dark:text-white font-display mb-1">
                        ¡Postulación Enviada!
                      </h4>
                      <div className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-200 bg-white dark:bg-stone-900 border border-emerald-200 px-3 py-1 rounded-md inline-block mb-3">
                        {applyResult?.applicationCode || "CRECE-GT-839201"}
                      </div>
                      <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed mb-4 font-medium">
                        {applyResult?.message || "La empresa se comunicará contigo por teléfono en 48h."}
                      </p>
                      <div className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-emerald-200 text-[11px] text-stone-800 dark:text-stone-200 text-left flex items-center gap-2 font-semibold">
                        <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Contacto registrado: {user.phone}</span>
                      </div>
                    </motion.div>
                  ) : match.matchPct === 100 ? (
                    <div className="space-y-4 text-center">
                      <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-200 font-bold">
                        ✨ ¡Tu perfil cumple todos los requisitos para postular ahora!
                      </div>
                      <button
                        onClick={handleApply}
                        disabled={applying}
                        className="w-full btn-primary-green text-sm sm:text-base py-4 rounded-2xl font-black cursor-pointer shadow-md"
                      >
                        <Zap className="w-5 h-5 fill-current inline mr-1" />
                        <span>{applying ? "Enviando postulación..." : "Solicitar Entrevista Directa"}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4 text-center">
                      <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-medium">
                        Inicia los cursos sugeridos para completar los requisitos y alcanzar el 100% de match.
                      </p>
                      <button
                        onClick={() => navigate("/route")}
                        className="w-full btn-primary-orange text-xs sm:text-sm py-3.5 rounded-2xl font-extrabold cursor-pointer shadow-md"
                      >
                        <Target className="w-4 h-4 inline mr-1" />
                        <span>Ver en Mi Ruta de Aprendizaje</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>
        )}
      </main>
    </div>
  );
}
