// ──────────────────────────────────────────────
// CRECE — HeroBillboard (Estilo Coursera & Udemy)
// ──────────────────────────────────────────────
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Users, Award, Play, Star } from "lucide-react";
import type { Opportunity } from "../types";

interface HeroBillboardProps {
  featuredOpportunity?: Opportunity;
  onExploreClick: () => void;
  onApplyDirectly?: (op: Opportunity) => void;
  isMinor: boolean;
}

export default function HeroBillboard({
  featuredOpportunity,
  onExploreClick,
  onApplyDirectly,
  isMinor,
}: HeroBillboardProps) {
  return (
    <div className="relative rounded-4xl overflow-hidden border border-orange-200/80 bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-emerald-50/50 shadow-soft-card mb-12 p-6 sm:p-10 md:p-12 lg:p-14">
      
      {/* Decorative Warm Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-200/40 via-amber-200/30 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-200/30 rounded-full blur-2xl pointer-events-none -mb-20" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Col: Main Pitch */}
        <div className="lg:col-span-7">
          
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-orange-500 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-current" />
              {isMinor ? "PROGRAMA JUVENIL DESTACADO" : "TU MEJOR MATCH LABORAL"}
            </span>

            <span className="inline-flex items-center gap-1.5 bg-white text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-300 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Alianza Oficial Guatemala
            </span>

            {featuredOpportunity && (
              <span className="text-xs text-stone-700 font-bold bg-amber-100/80 border border-amber-300 px-3 py-1.5 rounded-full">
                {featuredOpportunity.vacanciesText}
              </span>
            )}
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-[1.15] mb-4">
            {isMinor ? (
              <>
                Aprende gratis y abre tu futuro con <span className="text-orange-600">becas internacionales</span>
              </>
            ) : featuredOpportunity ? (
              <>
                {featuredOpportunity.title} en <span className="text-emerald-700">{featuredOpportunity.company}</span>
              </>
            ) : (
              <>
                Conecta tu talento con <span className="text-orange-600">empleo formal</span> y capacitación gratuita
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed mb-6 font-normal">
            {isMinor
              ? "Cursos oficiales avalados por Google, Cisco, Microsoft e INTECAP diseñados para jóvenes menores de 18 años. Aprende a tu propio ritmo con certificados incluidos."
              : featuredOpportunity
              ? featuredOpportunity.tagline
              : "Empresas guatemaltecas que capacitan desde el primer día y valoran tu entusiasmo sin pedir años de experiencia previa."}
          </p>

          {/* Social Proof Pills */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 pt-4 border-t border-stone-200/80">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Student" />
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80" alt="Student" />
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="Student" />
              </div>
              <span className="text-xs font-bold text-stone-700">
                1,450+ Jóvenes colocados
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100/90 px-3 py-1.5 rounded-full border border-amber-200">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>4.9 / 5 Satisfacción</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/90 px-3 py-1.5 rounded-full border border-emerald-200">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>100% Gratuito</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            {featuredOpportunity && !isMinor ? (
              <button
                onClick={() => onApplyDirectly?.(featuredOpportunity)}
                className="btn-primary-orange text-sm sm:text-base px-7 py-3.5"
              >
                <Zap className="w-5 h-5 fill-current" />
                <span>Ver Vacante & Postular</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <button
                onClick={onExploreClick}
                className="btn-primary-orange text-sm sm:text-base px-7 py-3.5"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Explorar Becas Gratuitas</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            )}

            <button
              onClick={onExploreClick}
              className="btn-outline-warm text-sm sm:text-base px-6 py-3.5"
            >
              Ver Catálogo Completo
            </button>
          </div>

        </div>

        {/* Right Col: Visual Card Preview */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden shadow-soft-hover border-4 border-white bg-white">
            <img
              src={
                featuredOpportunity?.heroImage ||
                (isMinor
                  ? "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                  : "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80")
              }
              alt="Highlight"
              className="w-full h-64 sm:h-72 object-cover object-center"
            />
            <div className="p-5 bg-white">
              <div className="flex items-center justify-between text-xs font-bold text-stone-500 mb-1">
                <span>Oportunidad Destacada GT</span>
                <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {featuredOpportunity ? "100% Match" : "Beca Activa"}
                </span>
              </div>
              <h3 className="font-extrabold text-stone-900 text-base leading-snug">
                {featuredOpportunity ? featuredOpportunity.title : "Certificación en Marketing Digital & E-Commerce"}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                {featuredOpportunity ? `${featuredOpportunity.company} · ${featuredOpportunity.salary}` : "Google Skillshop · 100% en línea a tu ritmo"}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
