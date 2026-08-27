// ──────────────────────────────────────────────
// CRECE — MatchBar Component (Limpio, Cálido y Accesible)
// ──────────────────────────────────────────────
import { CheckCircle2, TrendingUp, Sparkles } from "lucide-react";

interface MatchBarProps {
  pct: number;
  large?: boolean;
}

export default function MatchBar({ pct, large = false }: MatchBarProps) {
  let barGradient = "from-emerald-500 to-teal-500";
  let textColor = "text-emerald-700";
  let badgeBg = "bg-emerald-50 text-emerald-800 border-emerald-200";
  let statusText = "Alta Compatibilidad";

  if (pct === 100) {
    barGradient = "from-emerald-500 to-green-600";
    textColor = "text-emerald-700";
    badgeBg = "bg-emerald-100 text-emerald-800 border-emerald-300";
    statusText = "¡Match 100% Listo para Postular!";
  } else if (pct >= 60) {
    barGradient = "from-emerald-400 to-teal-500";
    textColor = "text-emerald-700";
    badgeBg = "bg-teal-50 text-teal-800 border-teal-200";
    statusText = "Muy Buen Perfil";
  } else if (pct >= 30) {
    barGradient = "from-amber-400 to-orange-400";
    textColor = "text-amber-700";
    badgeBg = "bg-amber-50 text-amber-800 border-amber-200";
    statusText = "Ruta en Desarrollo";
  } else {
    barGradient = "from-orange-400 to-rose-400";
    textColor = "text-orange-700";
    badgeBg = "bg-orange-50 text-orange-800 border-orange-200";
    statusText = "Oportunidad de Aprendizaje";
  }

  if (large) {
    return (
      <div className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-stone-900 font-display">
              {pct}%
            </span>
            <span className="text-xs text-stone-500 font-medium">de compatibilidad con tu perfil</span>
          </div>
          <span className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 rounded-full border ${badgeBg}`}>
            {pct === 100 ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                {statusText}
              </>
            ) : (
              <>
                <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                {statusText}
              </>
            )}
          </span>
        </div>

        {/* Track */}
        <div className="w-full bg-stone-200/80 rounded-full h-3.5 overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${barGradient} transition-all duration-700 ease-out`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-stone-500 font-semibold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Compatibilidad
        </span>
        <span className={`text-xs font-black ${textColor}`}>
          {pct}% Match
        </span>
      </div>
      <div className="w-full bg-stone-200/80 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${barGradient} transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
