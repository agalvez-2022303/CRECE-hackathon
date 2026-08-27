// ──────────────────────────────────────────────
// CRECE — MatchCard Component (Estilo Coursera & Udemy)
// ──────────────────────────────────────────────
import { motion } from "framer-motion";
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
  ArrowRight, 
  ExternalLink,
  Gift
} from "lucide-react";
import type { MatchResult } from "../types";
import MatchBar from "./MatchBar";

interface MatchCardProps {
  match: MatchResult;
  onClick: () => void;
}

export default function MatchCard({ match, onClick }: MatchCardProps) {
  const { opportunity: op, matchPct, matchedRequirements, missingRequirements, recommendedCourses } = match;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="edu-card-hover group cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Cover Photo */}
        <div className="relative h-48 w-full overflow-hidden bg-stone-100">
          <img
            src={op.heroImage}
            alt={op.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Top Floating Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="bg-white/95 backdrop-blur-md text-stone-800 border border-stone-200 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
              {op.categoryLabel}
            </span>

            <span className="flex items-center gap-1 bg-amber-400 text-stone-950 text-[11px] font-black px-3 py-1 rounded-full shadow-sm">
              <Users className="w-3 h-3" />
              {op.vacancies} {op.vacancies === 1 ? "vacante" : "plazas"}
            </span>
          </div>

          {/* Bottom Badges */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-stone-700 font-semibold border border-stone-200 text-[11px] shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              {op.modality} · {op.location.split(",")[0]}
            </span>
            <span className="text-[11px] font-bold text-orange-700 bg-orange-100/90 px-2 py-0.5 rounded-md border border-orange-200">
              {op.deadline}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6">
          {/* Company & Verification */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <Building2 className="w-4 h-4 text-stone-400" />
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wide">
              {op.company}
            </span>
            {op.companyVerified && (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            )}
          </div>

          {/* Job Title */}
          <h3 className="text-lg font-bold text-stone-900 font-display group-hover:text-orange-600 transition-colors leading-snug mb-2">
            {op.title}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
            {op.tagline}
          </p>

          {/* Salary & Type Ribbon */}
          <div className="grid grid-cols-2 gap-2 bg-stone-50 p-3 rounded-2xl border border-stone-200/80 mb-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-orange-100 text-orange-600">
                <Banknote className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-stone-400 font-medium">Salario Base</div>
                <div className="font-extrabold text-stone-900 text-xs">{op.salary}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-emerald-100 text-emerald-600">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-stone-400 font-medium">Jornada</div>
                <div className="font-bold text-stone-700 text-[11px] truncate">{op.type}</div>
              </div>
            </div>
          </div>

          {/* Match Meter */}
          <div className="mb-4">
            <MatchBar pct={matchPct} />
          </div>

          {/* Requirements Chips */}
          <div className="space-y-1.5 mb-4">
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              Requisitos del Puesto:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {op.requirements.slice(0, 3).map((req, idx) => {
                const isMatched = matchedRequirements.includes(req);
                return (
                  <span
                    key={req}
                    className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-xl border font-bold ${
                      isMatched
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-stone-100 text-stone-500 border-stone-200"
                    }`}
                  >
                    {isMatched ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    ) : (
                      <CircleDot className="w-3 h-3 text-stone-400 shrink-0" />
                    )}
                    <span className="truncate max-w-[130px]">{op.requirementLabels[idx] || req}</span>
                  </span>
                );
              })}
              {op.requirements.length > 3 && (
                <span className="text-[11px] px-2 py-1 rounded-xl bg-stone-100 text-stone-500 font-semibold border border-stone-200">
                  +{op.requirements.length - 3} más
                </span>
              )}
            </div>
          </div>

          {/* Perks Preview */}
          {op.whatIncludes && op.whatIncludes.length > 0 && (
            <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/80 mb-2">
              <div className="flex items-center gap-1.5 text-[11px] text-amber-800 font-bold mb-0.5">
                <Gift className="w-3.5 h-3.5 text-amber-600" />
                Beneficio Destacado:
              </div>
              <p className="text-[11px] text-stone-600 line-clamp-1">
                {op.whatIncludes[0]}
              </p>
            </div>
          )}

          {/* Recommended Course Gap-Closer */}
          {missingRequirements.length > 0 && recommendedCourses.length > 0 && (
            <div className="mt-3 pt-3 border-t border-stone-200">
              <div className="flex items-center justify-between text-[11px] text-orange-800 font-bold mb-1.5">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-orange-600" />
                  Beca gratuita para tu perfil:
                </span>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200 font-bold">100% Libre</span>
              </div>
              <div className="space-y-1">
                {recommendedCourses.slice(0, 1).map(
                  (c) =>
                    c && (
                      <div
                        key={c.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(c.link, "_blank");
                        }}
                        className="flex items-center justify-between p-2 rounded-xl bg-orange-50 border border-orange-200 hover:bg-orange-100 transition-all text-xs text-orange-900 group/course"
                      >
                        <span className="font-bold text-[11px] truncate">
                          {c.title}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-orange-600 shrink-0 group-hover/course:translate-x-0.5 transition-transform" />
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Action Button */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1">
        <button className="w-full btn-outline-warm text-xs font-extrabold py-3 rounded-2xl group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-200">
          <span>Ver Detalles de Vacante</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
