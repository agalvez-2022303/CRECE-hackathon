// ──────────────────────────────────────────────
// CRECE — Login Page (Con Privacidad Segura para Menores)
// ──────────────────────────────────────────────
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "../context/UserContext";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Mail, 
  Phone, 
  User, 
  Zap, 
  GraduationCap, 
  Briefcase, 
  Star,
  Award,
  Lock
} from "lucide-react";
import type { UserProfile } from "../types";
import BrandMark from "../components/BrandMark";

const API = "/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [showManual, setShowManual] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function enterAsDemo(userId: "demo-adult" | "demo-minor") {
    setLoading(userId);
    setError("");
    try {
      const res = await fetch(`${API}/users/${userId}`);
      if (!res.ok) throw new Error("Error al conectar");
      const user: UserProfile = await res.json();
      setUser(user);
      navigate("/dashboard");
    } catch {
      setError("No se pudo conectar con el servidor local. Verifica que el backend esté activo.");
    } finally {
      setLoading(null);
    }
  }

  async function handleManualLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!identifier.trim()) {
      setError("Ingresa tu correo electrónico o número de teléfono.");
      return;
    }
    setLoading("manual");
    setError("");
    try {
      const res = await fetch(`${API}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim(), name: name.trim() }),
      });
      const data = await res.json();
      setUser(data.user);
      if (data.needsOnboarding) {
        navigate("/onboarding");
      } else {
        navigate("/dashboard");
      }
    } catch {
      setError("Hubo un problema al iniciar sesión. Intenta de nuevo.");
    } finally {
      setLoading(null);
    }
  }

  const isEmailInput = identifier.includes("@");

  return (
    <div className="min-h-screen bg-[#F7F7F0] text-stone-900 flex flex-col justify-between">
      
      {/* Top Navbar */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BrandMark />
          <div>
            <span className="text-2xl font-black tracking-[0.08em] text-stone-900 font-display">
              CRECE
            </span>
            <span className="block text-[11px] text-orange-600 font-bold tracking-wider uppercase">
              Oportunidades & Becas GT
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-amber-100/80 border border-amber-300 px-4 py-2 rounded-full text-xs font-extrabold text-amber-900 shadow-sm">
          <Award className="w-4 h-4 text-amber-700" />
          <span>Demo Hackathon 2026 · Acceso Inmediato</span>
        </div>
      </header>

      {/* Main Center Content */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col items-center justify-center">
        
        {/* Pitch Headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-extrabold mb-4 border border-orange-200">
            <Star className="w-4 h-4 text-orange-600 fill-orange-600" />
            La plataforma líder de talento joven en Guatemala
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight font-display leading-[1.15] mb-4">
            Aprende habilidades gratis y <span className="text-orange-600 underline decoration-amber-400 decoration-wavy">conéctate con empleo</span>
          </h1>
          
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-normal">
            Descubre vacantes con cálculo de compatibilidad en tiempo real y accede a más de 15 becas certificadas 100% gratuitas.
          </p>
        </motion.div>

        {/* Demo Fast Access Box */}
        <div className="w-full max-w-2xl">
          {!showManual ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="edu-card p-6 sm:p-8 bg-white border-2 border-stone-200 shadow-soft-hover rounded-4xl"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-black text-stone-900 font-display mb-1">
                  Selecciona tu usuario de prueba
                </h2>
                <p className="text-xs sm:text-sm text-stone-500">
                  Ingresa con un perfil precargado para explorar todo el sistema en segundos:
                </p>
              </div>

              {/* Two Demo User Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                
                {/* 1. María López (Adulto) */}
                <motion.button
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => enterAsDemo("demo-adult")}
                  disabled={loading !== null}
                  className="relative p-5 rounded-3xl bg-gradient-to-br from-emerald-50/80 to-teal-50/60 border-2 border-emerald-300 hover:border-emerald-500 hover:shadow-soft-hover transition-all text-left group cursor-pointer disabled:opacity-50 overflow-hidden"
                >
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold shadow-sm">
                    MATCH 100%
                  </div>

                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                        alt="María López"
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500 shadow-sm"
                      />
                      <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-5 h-5 bg-emerald-600 rounded-full text-white ring-2 ring-white">
                        ✓
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-stone-900 group-hover:text-emerald-800 transition-colors">
                        María López (26)
                      </h3>
                      <p className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" />
                        Modo Adulto / Empleo
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 mb-3 line-clamp-2 leading-relaxed">
                    Perfil completo con 3 certificados y cálculo de match frente a 10 ofertas reales.
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-emerald-200/80 text-xs font-extrabold text-emerald-700">
                    <span>{loading === "demo-adult" ? "Ingresando..." : "Entrar como María →"}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>

                {/* 2. Diego A. (Menor con Avatar Seguro) */}
                <motion.button
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => enterAsDemo("demo-minor")}
                  disabled={loading !== null}
                  className="relative p-5 rounded-3xl bg-gradient-to-br from-amber-50/80 to-orange-50/60 border-2 border-amber-300 hover:border-orange-400 hover:shadow-soft-hover transition-all text-left group cursor-pointer disabled:opacity-50 overflow-hidden"
                >
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-orange-600 text-white text-[10px] font-extrabold shadow-sm">
                    SOLO BECAS
                  </div>

                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="relative">
                      {/* Safe Illustrated Avatar */}
                      <img
                        src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=DiegoGT&backgroundColor=b6e3f4,c0aede,d1d4f9"
                        alt="Diego A."
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-400 bg-amber-100 p-0.5 shadow-sm"
                      />
                      <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-5 h-5 bg-amber-500 rounded-full text-white ring-2 ring-white">
                        🔒
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-stone-900 group-hover:text-orange-800 transition-colors">
                        Diego A. (16)
                      </h3>
                      <p className="text-xs text-orange-700 font-bold flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5" />
                        Modo Menor Protegido
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 mb-3 line-clamp-2 leading-relaxed">
                    Avatar ilustrado seguro y datos privados. Enfocado 100% en becas de código y diseño.
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-amber-200/80 text-xs font-extrabold text-orange-700">
                    <span>{loading === "demo-minor" ? "Ingresando..." : "Entrar como Diego →"}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200" />
                </div>
                <div className="relative flex justify-center text-xs font-bold text-stone-400 bg-white px-4">
                  o ingresa de forma manual
                </div>
              </div>

              {/* Botón para abrir login manual */}
              <button
                onClick={() => setShowManual(true)}
                className="w-full btn-outline-warm text-xs sm:text-sm py-3.5 font-extrabold rounded-2xl"
              >
                <User className="w-4 h-4 text-orange-600" />
                <span>Ingresar con Correo o Número de Teléfono</span>
              </button>
            </motion.div>
          ) : (
            /* ── Manual Login Form ── */
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleManualLogin}
              className="edu-card p-6 sm:p-8 bg-white border-2 border-stone-200 shadow-soft-hover rounded-4xl"
            >
              <button
                type="button"
                onClick={() => {
                  setShowManual(false);
                  setError("");
                }}
                className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-orange-600 mb-6 font-bold transition-colors"
              >
                ← Volver a selección rápida
              </button>

              <h2 className="text-2xl font-black text-stone-900 font-display mb-1">
                Ingresar o Crear Cuenta
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mb-6">
                Escribe tu correo o teléfono de Guatemala para entrar directamente sin contraseñas.
              </p>

              {/* Nombre */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Tu Nombre Completo (Opcional si ya estás registrado)
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Carlos Morales"
                    className="edu-input pl-11 rounded-2xl"
                  />
                </div>
              </div>

              {/* Correo o Teléfono */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Correo Electrónico O Número de Teléfono
                </label>
                <div className="relative">
                  {isEmailInput ? (
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                  ) : (
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
                  )}
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      setError("");
                    }}
                    placeholder="ejemplo@correo.com o 5555-1234"
                    className="edu-input pl-11 rounded-2xl"
                    autoFocus
                  />
                </div>
                <span className="text-[11px] text-stone-500 mt-1.5 block">
                  Acepta correo electrónico o número de 8 dígitos de Guatemala.
                </span>
              </div>

              {error && (
                <div className="p-3.5 mb-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading !== null}
                className="w-full btn-primary-orange text-sm font-black py-4 rounded-2xl"
              >
                {loading === "manual" ? "Verificando..." : "Continuar a CRECE →"}
              </button>
            </motion.form>
          )}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="max-w-7xl mx-auto w-full px-6 py-6 text-center text-xs text-stone-500">
        <p>
          CRECE Guatemala 🇬🇹 · Proyecto de impacto social y empleabilidad juvenil · 100% Gratuito
        </p>
      </footer>
    </div>
  );
}
