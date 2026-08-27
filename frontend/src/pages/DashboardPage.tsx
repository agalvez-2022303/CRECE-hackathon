// ──────────────────────────────────────────────
// CRECE — Dashboard (Estilo Coursera & Udemy)
// ──────────────────────────────────────────────
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "../context/UserContext";
import type { MatchResult, Course } from "../types";
import Header from "../components/Header";
import HeroBillboard from "../components/HeroBillboard";
import MatchCard from "../components/MatchCard";
import CourseCard from "../components/CourseCard";
import { 
  Sparkles, 
  Flame, 
  GraduationCap, 
  Briefcase, 
  Search, 
  Star,
  Award,
  Zap,
  BookOpen,
  Compass,
  Wrench
} from "lucide-react";

const API = "/api";

export default function DashboardPage() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    loadData();
  }, [user]);

  async function loadData() {
    setLoading(true);
    try {
      if (user!.isAdult) {
        const [matchRes, courseRes] = await Promise.all([
          fetch(`${API}/users/${user!.id}/match`),
          fetch(`${API}/courses?userId=${user!.id}`),
        ]);
        
        if (!matchRes.ok || !courseRes.ok) {
          logout();
          navigate("/");
          return;
        }

        const matchData = await matchRes.json();
        const courseData = await courseRes.json();
        
        if (Array.isArray(matchData)) setMatches(matchData);
        if (Array.isArray(courseData)) setCourses(courseData);
      } else {
        // Minors: personalized ranking based on interests
        const courseRes = await fetch(`${API}/courses/recommended/${user!.id}`);
        
        if (!courseRes.ok) {
          logout();
          navigate("/");
          return;
        }

        const courseData = await courseRes.json();
        if (Array.isArray(courseData)) setCourses(courseData);
      }
    } catch (e) {
      console.error("Error loading data, logging out:", e);
      logout();
      navigate("/");
    } finally {
      setLoading(false);
    }
  }

  const isMinor = !user?.isAdult;

  // Filtered Matches
  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      const matchSearch =
        m.opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.opportunity.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.opportunity.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.opportunity.requirements.some((r) => r.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchCategory =
        selectedCategory === "todos" ||
        m.opportunity.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchSearch && matchCategory;
    });
  }, [matches, searchTerm, selectedCategory]);

  // Filtered Courses
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const courseSearch =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.skillLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const courseCategory =
        selectedCategory === "todos" ||
        c.tags.some((t) => t.toLowerCase() === selectedCategory.toLowerCase());

      return courseSearch && courseCategory;
    });
  }, [courses, searchTerm, selectedCategory]);

  // High Match row
  const topMatches = useMemo(() => {
    return filteredMatches.filter((m) => m.matchPct >= 60);
  }, [filteredMatches]);

  // Regular Match row
  const otherMatches = useMemo(() => {
    return filteredMatches.filter((m) => m.matchPct < 60);
  }, [filteredMatches]);

  // Tech & Certification Courses
  const techCourses = useMemo(() => {
    return filteredCourses.filter((c) =>
      c.tags.some((t) => ["tecnologia", "programacion", "computacion"].includes(t))
    );
  }, [filteredCourses]);

  // Creative & Business Courses
  const creativeAndBusinessCourses = useMemo(() => {
    return filteredCourses.filter((c) =>
      c.tags.some((t) => ["marketing", "diseño", "administracion", "idiomas", "ventas", "empleo"].includes(t))
    );
  }, [filteredCourses]);

  // Manual / Oficios Courses
  const manualCourses = useMemo(() => {
    return filteredCourses.filter((c) =>
      c.tags.some((t) => ["manual", "cocina", "salud", "medicina", "electricidad", "mecanica", "carpinteria", "belleza", "agricultura", "panaderia", "gastronomia"].includes(t))
    );
  }, [filteredCourses]);

  // For minors: top personalized picks (first 6 of sorted list)
  const recommendedForMinor = useMemo(() => {
    if (!isMinor) return [];
    // courses already sorted by score from API
    return filteredCourses.slice(0, 6);
  }, [filteredCourses, isMinor]);

  const categories = [
    { id: "todos", label: "🌟 Todo el Catálogo" },
    { id: "tecnologia", label: "💻 Tecnología & IT" },
    { id: "administracion", label: "📋 Administración & Oficina" },
    { id: "ventas", label: "🛍️ Ventas & Comercio" },
    { id: "diseño", label: "🎨 Creatividad & Diseño" },
    { id: "marketing", label: "📱 Marketing Digital" },
    { id: "idiomas", label: "🌐 Idiomas" },
    { id: "cocina", label: "🍳 Cocina & Gastronomía" },
    { id: "salud", label: "🩺 Salud & Medicina" },
    { id: "manual", label: "🔧 Oficios Manuales" },
  ];

  if (!user) return null;

  const featuredOpportunity = matches.length > 0 ? matches[0].opportunity : undefined;

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 pb-24">
      {/* Top Header */}
      <Header isMinor={isMinor} onSearchChange={setSearchTerm} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Coursera-style Hero Billboard Banner */}
        <HeroBillboard
          featuredOpportunity={featuredOpportunity}
          isMinor={isMinor}
          onExploreClick={() => {
            const el = document.getElementById("catalog-section");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          onApplyDirectly={(op) => navigate(`/opportunity/${op.id}`)}
        />

        {/* Category Filter Pills (Coursera & Udemy style) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 hide-scrollbar" id="catalog-section">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-200 cursor-pointer shadow-sm ${
                selectedCategory === cat.id
                  ? isMinor
                    ? "bg-amber-400 text-stone-950 border border-amber-500 shadow-sm"
                    : "bg-orange-500 text-white border border-orange-600 shadow-sm"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-28 text-stone-400">
            <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4" />
            <p className="text-sm font-bold text-stone-600">Cargando oportunidades y becas gratuitas...</p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* ── Recomendado para ti (solo menores, algoritmo personalizado) ── */}
            {isMinor && recommendedForMinor.length > 0 && selectedCategory === "todos" && !searchTerm && (
              <section className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-display">
                        ✨ Recomendado para ti — según tus intereses
                      </h2>
                      <p className="text-xs text-stone-500">
                        Cursos ordenados por afinidad a {user?.interests.slice(0, 3).join(", ") || "tus intereses"} + oficios manuales
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-orange-800 bg-orange-100 border border-orange-300 px-3 py-1.5 rounded-full">
                    Algoritmo personalizado
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedForMinor.map((course: any) => (
                    <div key={course.id} className="relative">
                      {course._score !== undefined && course._score > 30 && (
                        <span className="absolute -top-2 -right-2 z-10 bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow">Match {course._score}</span>
                      )}
                      <CourseCard course={course} isMinor={isMinor} />
                      {course._reason && <p className="text-[11px] text-emerald-700 font-bold mt-1 px-1">↳ {course._reason}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            
            {/* ────────────────────────────────────────────────────────── */}
            {/* MODO ADULTO: TOP MATCHES                                   */}
            {/* ────────────────────────────────────────────────────────── */}
            {!isMinor && topMatches.length > 0 && (
              <section className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700">
                      <Flame className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-display">
                        Oportunidades con Mayor Match
                      </h2>
                      <p className="text-xs text-stone-500">
                        Puestos laborales altamente compatibles con tus habilidades
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-full">
                    {topMatches.length} recomendadas
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topMatches.map((m) => (
                    <MatchCard
                      key={m.opportunity.id}
                      match={m}
                      onClick={() => navigate(`/opportunity/${m.opportunity.id}`)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* ────────────────────────────────────────────────────────── */}
            {/* MODO ADULTO: MÁS OPORTUNIDADES EN DESARROLLO               */}
            {/* ────────────────────────────────────────────────────────── */}
            {!isMinor && otherMatches.length > 0 && (
              <section className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-2xl bg-orange-100 text-orange-700">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-display">
                        Explora Más Oportunidades & Cursos para Calificar
                      </h2>
                      <p className="text-xs text-stone-500">
                        Oportunidades donde puedes capacitarte en las habilidades faltantes
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-orange-800 bg-orange-100 border border-orange-300 px-3 py-1.5 rounded-full">
                    {otherMatches.length} plazas
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherMatches.map((m) => (
                    <MatchCard
                      key={m.opportunity.id}
                      match={m}
                      onClick={() => navigate(`/opportunity/${m.opportunity.id}`)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* ────────────────────────────────────────────────────────── */}
            {/* BECAS: TECH & CERTIFICACIONES GLOBALES                     */}
            {/* ────────────────────────────────────────────────────────── */}
            {techCourses.length > 0 && (
              <section className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-800">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-display">
                        Becas de Tecnología & Certificaciones Oficiales
                      </h2>
                      <p className="text-xs text-stone-500">
                        Programas avalados por Google, Cisco y Microsoft con certificados verificables
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-full">
                    {techCourses.length} cursos gratuitos
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {techCourses.map((course) => (
                    <CourseCard key={course.id} course={course} isMinor={isMinor} />
                  ))}
                </div>
              </section>
            )}

            {/* ────────────────────────────────────────────────────────── */}
            {/* BECAS: CREATIVIDAD, NEGOCIOS & HABILIDADES BLANDAS         */}
            {/* ────────────────────────────────────────────────────────── */}
            {creativeAndBusinessCourses.length > 0 && (
              <section className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-800">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-display">
                        {isMinor ? "Becas en Diseño, Creatividad & Emprendimiento" : "Capacitación en Ventas, Administración & Habilidades Blandas"}
                      </h2>
                      <p className="text-xs text-stone-500">
                        Cursos de Fundación Carlos Slim, INTECAP y aliados para impulsar tu carrera
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-full">
                    {creativeAndBusinessCourses.length} programas
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {creativeAndBusinessCourses.map((course) => (
                    <CourseCard key={course.id} course={course} isMinor={isMinor} />
                  ))}
                </div>
              </section>
            )}

            {/* ── OFICIOS MANUALES (cocina, salud, electricidad, etc.) ── */}
            {manualCourses.length > 0 && (
              <section className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-2xl bg-orange-100 text-orange-700">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-display">
                        🔧 Oficios Manuales & Cursos Técnicos Presenciales
                      </h2>
                      <p className="text-xs text-stone-500">
                        Cocina, salud, electricidad, mecánica, carpintería, belleza y agricultura — becas INTECAP 100% gratuitas
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-orange-800 bg-orange-100 border border-orange-300 px-3 py-1.5 rounded-full">
                    {manualCourses.length} oficios
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {manualCourses.map((course) => (
                    <CourseCard key={course.id} course={course} isMinor={isMinor} />
                  ))}
                </div>
              </section>
            )}

            {/* Empty Search Fallback */}
            {filteredMatches.length === 0 && filteredCourses.length === 0 && (
              <div className="edu-card p-12 text-center max-w-md mx-auto bg-white rounded-3xl">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">No se encontraron resultados</h3>
                <p className="text-xs text-stone-500 mb-6">
                  No hay oportunidades o becas que coincidan con "{searchTerm}". Intenta con otras palabras o limpia los filtros.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("todos");
                  }}
                  className="btn-outline-warm text-xs font-bold mx-auto rounded-2xl"
                >
                  Limpiar Filtros de Búsqueda
                </button>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}
