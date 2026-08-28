// ──────────────────────────────────────────────
// CRECE — CourseCard (Estilo Coursera & Udemy)
// ──────────────────────────────────────────────
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Layers, 
  BookOpen,
  CheckCircle,
  Star
} from "lucide-react";
import type { Course } from "../types";

interface CourseCardProps {
  course: Course;
  isMinor?: boolean;
}

export default function CourseCard({ course, isMinor = false }: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="edu-card-hover overflow-hidden flex flex-col justify-between group"
    >
      <div>
        {/* Cover Photo */}
        <div className="relative h-44 w-full overflow-hidden bg-stone-100">
          <img
            src={course.heroImage}
            alt={course.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1000&q=80";
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="bg-emerald-600 text-white font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              {course.scholarshipCoverage || "Beca 100% Gratuita"}
            </span>

            <span className="bg-white/95 backdrop-blur-md text-stone-800 border border-stone-200 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <Clock className="w-3 h-3 text-orange-500" />
              {course.duration}
            </span>
          </div>

          {/* Level indicator bottom overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
            <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-200 text-[11px] font-bold text-stone-700 shadow-sm">
              {course.level}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-amber-800 font-extrabold bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300 shadow-sm">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              4.9 (500+ reseñas)
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 sm:p-6">
          {/* Organization / Provider */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-stone-600 tracking-wide uppercase">
              {course.organization}
            </span>
            {course.orgVerified && (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            )}
          </div>

          {/* Course Title */}
          <h3 className="text-base font-extrabold text-stone-900 font-display group-hover:text-orange-600 transition-colors leading-snug mb-2">
            {course.title}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
            {course.tagline}
          </p>

          {/* Certificate & Modality Pills */}
          <div className="space-y-2 bg-stone-50 p-3 rounded-2xl border border-stone-200/80 mb-4 text-xs">
            <div className="flex items-center gap-2 text-stone-700">
              <Award className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-semibold text-[11px] truncate">
                {course.certificateType}
              </span>
            </div>

            <div className="flex items-center gap-2 text-stone-700">
              <BookOpen className="w-4 h-4 text-orange-600 shrink-0" />
              <span className="font-semibold text-[11px] truncate">
                {course.modality} · {course.modulesCount} Módulos
              </span>
            </div>
          </div>

          {/* What it includes snippet */}
          {course.whatIncludes && course.whatIncludes.length > 0 && (
            <div className="space-y-1 mb-2">
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                Qué incluye la beca:
              </div>
              {course.whatIncludes.slice(0, 2).map((item, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-[11px] text-stone-700 leading-tight">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1">
        <a
          href={course.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full btn-primary-orange text-xs py-3 rounded-2xl text-white font-extrabold flex items-center justify-center gap-2 group/btn shadow-sm"
        >
          <Sparkles className="w-4 h-4 fill-current" />
          <span>Inscribirme con Beca Gratis</span>
          <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}
