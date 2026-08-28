// ──────────────────────────────────────────────
// CRECE — Mi Ruta (Roadmap Estilo Duolingo)
// ──────────────────────────────────────────────
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "../context/UserContext";
import Header from "../components/Header";
import type { Opportunity, Course, MatchResult } from "../types";
import { 
  Target, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Trophy, 
  Clock, 
  Award, 
  ChevronRight, 
  BookOpen,
  Briefcase,
  Zap
} from "lucide-react";

const API = "/api";

export default function MyRoutePage() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedTargetId, setSelectedTargetId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const isMinor = !user?.isAdult;

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
      const [matchRes, courseRes] = await Promise.all([
        fetch(`${API}/users/${user!.id}/match`),
        fetch(`${API}/courses`),
      ]);
      if (matchRes.ok && courseRes.ok) {
        const mData = await matchRes.json();
        const cData = await courseRes.json();
        if (Array.isArray(mData)) {
          setMatches(mData);
          if (mData.length > 0) setSelectedTargetId(mData[0].opportunity.id);
        }
        if (Array.isArray(cData)) setCourses(cData);
      }
    } catch (e) {
      console.error("Error loading route data:", e);
    } finally {
      setLoading(false);
    }
  }

  // Active target opportunity
  const activeMatch = useMemo(() => {
    return matches.find((m) => m.opportunity.id === selectedTargetId) || matches[0];
  }, [matches, selectedTargetId]);

  // Missing requirements for target job
  const missingReqs = activeMatch?.missingRequirements || [];

  // Courses mapped to missing skills
  const routeCourses = useMemo(() => {
    if (!activeMatch) return [];
    return missingReqs
      .map((req) => courses.find((c) => c.skillTaught === req))
      .filter((c): c is Course => c !== undefined);
  }, [activeMatch, missingReqs, courses]);

  // Total XP & Stats
  const completedCoursesCount = user?.completedCoursesCount || user?.certificates?.length || 0;
  const xp = completedCoursesCount * 250 + (user?.badges?.length || 0) * 100 + 150;
  const level = Math.floor(xp / 300) + 1;
  const xpToNext = (level * 300) - xp;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-stone-950 text-stone-900 dark:text-stone-100 pb-24 transition-colors">
      <Header isMinor={isMinor} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                <Target className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white font-display">
                Mi Ruta de Aprendizaje
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              Elige una meta profesional y sigue los nodos interactivos para cerrar brechas de habilidades.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-200">
              ⚡ Nivel {level} · {xp} XP
            </span>
          </div>
        </div>

        {/* HUD Stats Panel */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-bold block">Diplomas</span>
              <span className="text-lg font-black text-stone-900 dark:text-white">{user.certificates.length}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-bold block">Insignias</span>
              <span className="text-lg font-black text-stone-900 dark:text-white">{user.badges.length}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-bold block">Mejor Match</span>
              <span className="text-lg font-black text-stone-900 dark:text-white">
                {matches.length > 0 ? `${matches[0].matchPct}%` : "100%"}
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex items-center gap-3">
            <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-bold block">XP faltante</span>
              <span className="text-lg font-black text-stone-900 dark:text-white">{xpToNext} XP</span>
            </div>
          </div>
        </div>

        {/* Selector de Mundos / Metas */}
        <div className="mb-10">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-4">
            Elegi tu Meta ("Mundo")
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {matches.slice(0, 4).map((m, idx) => {
              const isSelected = m.opportunity.id === selectedTargetId;
              return (
                <button
                  key={m.opportunity.id}
                  onClick={() => setSelectedTargetId(m.opportunity.id)}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? "bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100 shadow-lg scale-[1.02]"
                      : "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-850"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-orange-500 text-white">
                      Mundo {idx + 1}
                    </span>
                    <span className={`text-xs font-black ${m.matchPct >= 80 ? "text-emerald-500" : "text-amber-500"}`}>
                      {m.matchPct}% match
                    </span>
                  </div>
                  <h3 className="font-bold text-sm leading-snug line-clamp-1 mb-1">
                    {m.opportunity.title}
                  </h3>
                  <p className={`text-xs ${isSelected ? "text-stone-300 dark:text-stone-600" : "text-stone-500"}`}>
                    {m.opportunity.company} · {m.opportunity.salary}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Roadmap Game Path */}
        {activeMatch && (
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-10 border border-stone-200 dark:border-stone-800 shadow-md">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-stone-100 dark:border-stone-800">
              <div>
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400 block mb-1">
                  Meta Seleccionada
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
                  {activeMatch.opportunity.title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {activeMatch.opportunity.company} · {activeMatch.opportunity.location}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <span className="text-xs font-bold text-stone-500 block">Estado del mapa</span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                    {missingReqs.length === 0 ? "¡100% Calificado!" : `${missingReqs.length} cursos pendientes`}
                  </span>
                </div>
                {!isMinor && (
                  <button
                    onClick={() => navigate(`/opportunity/${activeMatch.opportunity.id}`)}
                    className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all"
                  >
                    Ver Vacante →
                  </button>
                )}
              </div>
            </div>

            {/* Path Nodes Visualizer */}
            <div className="relative py-12 px-4 max-w-xl mx-auto flex flex-col items-center gap-12">
              
              {/* Vertical Connecting Line */}
              <div className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-2 bg-stone-200 dark:bg-stone-800 rounded-full z-0" />

              {/* Node 1: Completed Foundation */}
              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500 text-white flex items-center justify-center shadow-lg ring-4 ring-emerald-100 dark:ring-emerald-950 font-black">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="mt-2 bg-white dark:bg-stone-800 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">Inicio de Ruta</span>
                  <span className="text-[11px] text-stone-500">Datos Básicos & Perfil</span>
                </div>
              </div>

              {/* Course Nodes */}
              {routeCourses.map((course, idx) => {
                const offsetClass = idx % 2 === 0 ? "translate-x-6 sm:translate-x-12" : "-translate-x-6 sm:-translate-x-12";
                return (
                  <div key={course.id} className={`relative z-10 flex flex-col items-center text-center ${offsetClass}`}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open(course.link, "_blank")}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-orange-500 text-white flex items-center justify-center shadow-lg ring-4 ring-orange-100 dark:ring-orange-950 cursor-pointer"
                    >
                      <BookOpen className="w-7 h-7" />
                    </motion.button>

                    <div className="mt-2 max-w-xs bg-white dark:bg-stone-800 p-3 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-md text-left">
                      <span className="text-[10px] font-black uppercase text-orange-600 block mb-0.5">
                        Paso {idx + 1} · {course.duration}
                      </span>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-white line-clamp-1 mb-1">
                        {course.title}
                      </h4>
                      <p className="text-[10px] text-stone-500 dark:text-stone-400 mb-2">
                        {course.organization}
                      </p>
                      <a
                        href={course.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-600 hover:underline"
                      >
                        Iniciar Beca Gratuita <ChevronRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}

              {/* Chest / Reward Node */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-3xl bg-amber-400 text-stone-900 flex items-center justify-center shadow-lg ring-4 ring-amber-100 dark:ring-amber-950 animate-bounce">
                  <Award className="w-7 h-7" />
                </div>
                <div className="mt-2 bg-white dark:bg-stone-800 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
                  <span className="text-xs font-bold text-amber-600 block">Cofre de Insignia</span>
                  <span className="text-[11px] text-stone-500">Desbloquea Diploma Verificable</span>
                </div>
              </div>

              {/* Final Boss Node (The Job) */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xl ring-8 ring-emerald-100 dark:ring-emerald-950">
                  <Briefcase className="w-10 h-10" />
                </div>
                <div className="mt-3 bg-white dark:bg-stone-800 p-4 rounded-2xl border border-emerald-300 dark:border-emerald-700 shadow-lg max-w-xs">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-600 block mb-1">
                    🎯 Meta Final Alcantada
                  </span>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-white mb-1">
                    {activeMatch.opportunity.title}
                  </h4>
                  <p className="text-xs text-stone-500 mb-3">
                    {activeMatch.opportunity.salary}
                  </p>
                  {!isMinor && (
                    <button
                      onClick={() => navigate(`/opportunity/${activeMatch.opportunity.id}`)}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all"
                    >
                      Postular Ahora
                    </button>
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
