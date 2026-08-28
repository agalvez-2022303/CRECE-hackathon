// ──────────────────────────────────────────────
// CRECE — Header con Navegación Compacta y Cambio de Tema
// ──────────────────────────────────────────────
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { 
  LogOut, 
  Compass, 
  Search, 
  ShieldCheck, 
  Award,
  Lock,
  Target,
  Sun,
  Moon
} from "lucide-react";
import BrandMark from "./BrandMark";

interface HeaderProps {
  isMinor: boolean;
  onSearchChange?: (term: string) => void;
}

export default function Header({ isMinor, onSearchChange }: HeaderProps) {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // Dark/Light theme state
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("crece_theme") as "light" | "dark") || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("crece_theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  const isDashboardActive = location.pathname === "/dashboard";
  const isRouteActive = location.pathname === "/route";
  const isProfileActive = location.pathname === "/profile";

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="flex items-center gap-2.5 group">
              <div className="group-hover:scale-105 transition-transform duration-200">
                <BrandMark />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-wider text-stone-900 dark:text-stone-10 font-display">
                  CRECE
                </span>
                <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full ${
                  isMinor 
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-200' 
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200'
                }`}>
                  {isMinor ? "Becas" : "Laboral"}
                </span>
              </div>
            </Link>

            {/* Compact Navigation tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-stone-100/80 dark:bg-stone-800/80 p-1 rounded-xl border border-stone-200 dark:border-stone-700">
              <button 
                onClick={() => navigate("/dashboard")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isDashboardActive 
                    ? "text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-700 shadow-sm" 
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-orange-500" />
                Explorar
              </button>

              <button 
                onClick={() => navigate("/route")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isRouteActive 
                    ? "text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-700 shadow-sm" 
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
                }`}
              >
                <Target className="w-3.5 h-3.5 text-emerald-500" />
                Mi Ruta
              </button>

              <button 
                onClick={() => navigate("/profile")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isProfileActive 
                    ? "text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-700 shadow-sm" 
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
                }`}
              >
                <Award className="w-3.5 h-3.5 text-amber-600" />
                Mi Perfil
                {user?.certificates && user.certificates.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-orange-500 text-white text-[9px] flex items-center justify-center font-black">
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
              <div className="relative hidden sm:block w-48 lg:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Buscar vacantes o cursos..."
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-stone-100/90 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-full pl-8 pr-3 py-1.5 text-xs text-stone-800 dark:text-stone-200 placeholder:text-stone-400 focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
              className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 transition-all"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* User Profile Capsule */}
            {user && (
              <div className="flex items-center gap-2 pl-2 border-l border-stone-200 dark:border-stone-800">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-all group"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    onError={(e) => {
                      // Image fallback to DiceBear SVG
                      (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=CreceUser";
                    }}
                    className={`w-8 h-8 rounded-xl object-cover ring-2 shadow-sm ${
                      isMinor ? "ring-amber-300 bg-amber-50" : "ring-emerald-400"
                    }`}
                  />
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-stone-900 dark:text-stone-200 group-hover:text-orange-600 transition-colors">
                      {user.name.split(" ")[0]}
                    </span>
                  </div>
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  title="Cerrar sesión"
                  className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-rose-50 dark:hover:bg-rose-950 text-stone-600 dark:text-stone-400 hover:text-rose-600 border border-stone-200 dark:border-stone-700 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
