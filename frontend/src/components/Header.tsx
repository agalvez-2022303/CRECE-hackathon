// ──────────────────────────────────────────────
// CRECE — Header con Acceso a Perfil & Certificados
// ──────────────────────────────────────────────
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { 
  Sparkles, 
  LogOut, 
  Briefcase, 
  GraduationCap, 
  Compass, 
  Search, 
  ShieldCheck, 
  Award,
  User,
  Lock
} from "lucide-react";

interface HeaderProps {
  isMinor: boolean;
  onSearchChange?: (term: string) => void;
}

export default function Header({ isMinor, onSearchChange }: HeaderProps) {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout();
    navigate("/");
  }

  const isProfileActive = location.pathname === "/profile";
  const isDashboardActive = location.pathname === "/dashboard";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-amber-400 to-orange-500 shadow-sm group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black tracking-tight text-stone-900 font-display">
                    CRECE
                  </span>
                  <span className={`text-[11px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full ${
                    isMinor 
                      ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {isMinor ? "Jóvenes & Becas" : "Laboral & Match"}
                  </span>
                </div>
                <span className="text-xs text-stone-500 font-medium">
                  Guatemala 🇬🇹 · Capacitación y Empleo Juvenil
                </span>
              </div>
            </Link>

            {/* Navigation tabs */}
            <nav className="hidden md:flex items-center gap-1.5 bg-stone-100/80 p-1.5 rounded-2xl border border-stone-200">
              <button 
                onClick={() => navigate("/dashboard")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isDashboardActive 
                    ? "text-stone-900 bg-white shadow-sm" 
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
                }`}
              >
                <Compass className="w-4 h-4 text-orange-500" />
                Explorar Feed
              </button>

              <button 
                onClick={() => navigate("/profile")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isProfileActive 
                    ? "text-stone-900 bg-white shadow-sm" 
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
                }`}
              >
                <Award className="w-4 h-4 text-amber-600" />
                Mi Perfil & Diplomas
                {user?.certificates && user.certificates.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center font-black">
                    {user.certificates.length}
                  </span>
                )}
              </button>
            </nav>
          </div>

          {/* Right Action Center */}
          <div className="flex items-center gap-3">
            
            {/* Live Search */}
            {onSearchChange && !isProfileActive && (
              <div className="relative hidden sm:block w-52 md:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Buscar vacantes o cursos..."
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-stone-100/90 border border-stone-300 rounded-full pl-9 pr-4 py-2 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
            )}

            {/* User Profile Capsule (Clickable to go to Profile) */}
            {user && (
              <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-stone-200">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2.5 p-1 rounded-2xl hover:bg-stone-100 transition-all text-left group"
                >
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className={`w-10 h-10 rounded-2xl object-cover ring-2 shadow-sm ${
                        isMinor ? "ring-amber-300 bg-amber-50 p-0.5" : "ring-emerald-400"
                      }`}
                    />
                    <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-4 h-4 bg-emerald-500 rounded-full text-white ring-2 ring-white text-[9px] font-black">
                      ✓
                    </span>
                  </div>
                  
                  <div className="hidden sm:flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-stone-900 leading-tight group-hover:text-orange-600 transition-colors">
                        {user.name.split(" ")[0]}
                      </span>
                      {isMinor ? (
                        <Lock className="w-3 h-3 text-amber-600" />
                      ) : (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-orange-600">
                      Ver Perfil & Diplomas →
                    </span>
                  </div>
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  title="Cerrar sesión"
                  className="p-2.5 rounded-xl bg-stone-100 hover:bg-rose-50 text-stone-600 hover:text-rose-600 border border-stone-200 transition-all active:scale-95 cursor-pointer ml-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
