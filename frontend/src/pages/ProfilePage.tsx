// ──────────────────────────────────────────────
// CRECE — Profile Page (CV Completo + Certificados)
// ──────────────────────────────────────────────
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "../context/UserContext";
import Header from "../components/Header";
import {
  Sparkles, Award, GraduationCap, ShieldCheck, Clock, Calendar, Download, Share2,
  Briefcase, MapPin, Lock, CheckCircle2, Zap, Code, Compass, ArrowLeft,
  User, Mail, Phone, Home, Car, DollarSign, Link as LinkIcon, Edit3, Save, X,
  FileText, Languages, ClipboardList, Camera, Upload, Trash2, Plus, AlertCircle, HeartPulse
} from "lucide-react";

const API = "/api";

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Editable state (only a subset for quick edit; full edit goes to onboarding)
  const [editHeadline, setEditHeadline] = useState(user?.headline || "");
  const [editSummary, setEditSummary] = useState(user?.summary || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");
  const [editLocation, setEditLocation] = useState(user?.location || "");
  const [editAvatar, setEditAvatar] = useState(user?.avatar || "");
  const [customSkillInput, setCustomSkillInput] = useState("");
  const [customSkills, setCustomSkills] = useState<string[]>(user?.customSkills || []);

  if (!user) return null;

  const isMinor = !user.isAdult;
  const certificates = user.certificates || [];
  const badges = user.badges || [];
  const totalHours = certificates.reduce((acc, c) => acc + (c.hoursCompleted || 0), 0);

  const renderBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap": return <Zap className="w-6 h-6 text-orange-500" />;
      case "GraduationCap": return <GraduationCap className="w-6 h-6 text-amber-500" />;
      case "Code": return <Code className="w-6 h-6 text-cyan-600" />;
      case "Compass": return <Compass className="w-6 h-6 text-emerald-600" />;
      case "Sparkles": return <Sparkles className="w-6 h-6 text-amber-500" />;
      default: return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
    }
  };

  function copyValidationCode(code: string) {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setEditAvatar(reader.result as string);
    reader.readAsDataURL(f);
  }

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    try {
      const payload: any = {
        id: user.id,
        headline: editHeadline,
        summary: editSummary,
        phone: editPhone,
        location: editLocation,
        avatar: editAvatar,
        customSkills,
        isSafeAvatar: !user.isAdult && editAvatar.includes("dicebear"),
      };
      const res = await fetch(`${API}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const saved = await res.json();
      setUser(saved);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  function handlePrint() {
    window.print();
  }

  function addCustomSkill() {
    const v = customSkillInput.trim();
    if (!v || customSkills.includes(v)) return;
    setCustomSkills(prev => [...prev, v]);
    setCustomSkillInput("");
  }

  return (
    <div className="min-h-screen bg-[#F7F4EA] text-stone-900 pb-24 print:bg-white">
      <Header isMinor={isMinor} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-orange-600 mb-6 group print:hidden">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver al Catálogo Principal
        </Link>

        {/* ── CV HEADER ── */}
        <div className="edu-card p-6 sm:p-8 bg-white rounded-4xl border-2 border-stone-200 mb-8 shadow-soft-card print:border print:shadow-none">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Avatar + vital */}
            <div className="flex flex-col items-center lg:items-start gap-4 shrink-0">
              <div className="relative">
                <img
                  src={editing ? editAvatar : user.avatar}
                  alt={user.name}
                  className={`w-36 h-36 sm:w-44 sm:h-44 rounded-3xl object-cover ring-4 shadow-md ${isMinor ? "ring-amber-300 bg-amber-50 p-1" : "ring-emerald-400 bg-white"}`}
                />
                <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-7 h-7 bg-emerald-600 rounded-full text-white ring-2 ring-white text-xs font-black">✓</span>
                {editing && (
                  <button onClick={() => fileRef.current?.click()} className="absolute inset-0 bg-black/40 rounded-3xl flex flex-col items-center justify-center gap-1 text-white font-bold text-xs">
                    <Camera className="w-6 h-6" /> Cambiar foto
                  </button>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
              {editing && editAvatar.startsWith("data:") && <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">Nueva foto lista</span>}
              {!user.avatar.startsWith("data:") && !user.avatar.includes("dicebear") && !isMinor && (
                <span className="text-[11px] text-stone-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Foto profesional verificada</span>
              )}
              {isMinor && user.isSafeAvatar && (
                <span className="text-[11px] bg-amber-100 border border-amber-300 text-amber-800 px-3 py-1 rounded-full font-bold flex items-center gap-1"><Lock className="w-3 h-3" />Avatar protegido menor</span>
              )}
              <div className="flex items-center gap-2 print:hidden">
                {!editing ? (
                  <button onClick={() => { setEditing(true); setEditHeadline(user.headline); setEditSummary(user.summary || ""); setEditPhone(user.phone); setEditLocation(user.location); setEditAvatar(user.avatar); setCustomSkills(user.customSkills || []); }} className="px-4 py-2 rounded-2xl bg-stone-900 text-white text-xs font-bold flex items-center gap-2"><Edit3 className="w-4 h-4" />Editar CV</button>
                ) : (
                  <>
                    <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-2xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-2"><Save className="w-4 h-4" />{saving ? "Guardando..." : "Guardar"}</button>
                    <button onClick={() => setEditing(false)} className="px-4 py-2 rounded-2xl border border-stone-300 bg-white text-xs font-bold flex items-center gap-2"><X className="w-4 h-4" />Cancelar</button>
                  </>
                )}
              </div>
              <div className="flex gap-2 print:hidden">
                <button onClick={handlePrint} className="px-4 py-2 rounded-2xl border-2 border-stone-200 bg-white text-xs font-bold flex items-center gap-2 hover:bg-stone-50"><Download className="w-4 h-4" />Imprimir / PDF</button>
                <button onClick={() => navigate("/onboarding")} className="px-4 py-2 rounded-2xl bg-orange-500 text-white text-xs font-bold">Rehacer CV completo →</button>
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl font-black font-display">{user.name} {user.lastName || ""}</h1>
                {isMinor ? (
                  <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-extrabold px-3 py-1 rounded-full"><Lock className="w-3 h-3" />Perfil Seguro Menor</span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-extrabold px-3 py-1 rounded-full"><ShieldCheck className="w-3.5 h-3.5" />Candidata Verificada</span>
                )}
              </div>

              {!editing ? (
                <p className="text-sm sm:text-base font-bold text-orange-600 mb-2">{user.headline}</p>
              ) : (
                <input value={editHeadline} onChange={e => setEditHeadline(e.target.value)} placeholder="Titular profesional" className="w-full px-4 py-2.5 rounded-2xl border-2 border-orange-300 bg-orange-50 text-sm font-bold mb-2" />
              )}

              {!editing ? (
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4 bg-stone-50 border border-stone-200 rounded-2xl p-4">
                  {user.summary || "Sin resumen profesional. Agrega un breve párrafo sobre quién eres y qué buscas para destacar en tu CV."}
                </p>
              ) : (
                <textarea value={editSummary} onChange={e => setEditSummary(e.target.value)} rows={4} placeholder="Resumen profesional: quién eres, qué sabes hacer y qué buscas" className="w-full px-4 py-3 rounded-2xl border-2 border-stone-300 bg-white text-sm mb-4" />
              )}

              {/* Contact grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
                <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-2xl px-3 py-2.5">
                  <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                  <span className="font-bold truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-2xl px-3 py-2.5">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  {!editing ? <span className="font-bold">{user.phone}</span> : <input value={editPhone} onChange={e => setEditPhone(e.target.value)} className="flex-1 outline-none bg-transparent font-bold" />}
                  {user.phoneAlt && !editing && <span className="text-stone-500">· {user.phoneAlt}</span>}
                </div>
                <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-2xl px-3 py-2.5">
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                  {!editing ? <span className="font-bold truncate">{user.location}{user.municipality ? ` · ${user.municipality}` : ""}{user.department ? ` · ${user.department}` : ""}</span> : <input value={editLocation} onChange={e => setEditLocation(e.target.value)} className="flex-1 outline-none bg-transparent font-bold" />}
                </div>
                <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-2xl px-3 py-2.5">
                  <Home className="w-4 h-4 text-stone-500 shrink-0" />
                  <span className="font-medium truncate">{user.address || "Dirección no especificada"}</span>
                </div>
                {user.birthDate && <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-2xl px-3 py-2.5"><Calendar className="w-4 h-4 text-stone-500" /><span className="font-medium">{user.birthDate} · {user.age} años · {user.gender || ""}</span></div>}
                {user.availabilityDetail && <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-2xl px-3 py-2.5"><Clock className="w-4 h-4 text-stone-500" /><span className="font-medium">{user.availabilityDetail}</span></div>}
                {user.salaryExpectation && <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-2xl px-3 py-2.5"><DollarSign className="w-4 h-4 text-emerald-600" /><span className="font-bold">{user.salaryExpectation}</span></div>}
                {user.portfolioUrl && <a href={user.portfolioUrl} target="_blank" rel="noopener" className="flex items-center gap-2 bg-white border border-stone-200 rounded-2xl px-3 py-2.5 hover:border-orange-300"><LinkIcon className="w-4 h-4 text-cyan-600" /><span className="font-bold truncate text-cyan-700">{user.portfolioUrl}</span></a>}
                {user.linkedinUrl && <a href={user.linkedinUrl} target="_blank" rel="noopener" className="flex items-center gap-2 bg-white border border-stone-200 rounded-2xl px-3 py-2.5 hover:border-orange-300"><LinkIcon className="w-4 h-4 text-blue-600" /><span className="font-bold truncate text-blue-700">{user.linkedinUrl}</span></a>}
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-2 text-[11px] font-bold">
                <span className="px-3 py-1 rounded-full bg-stone-100 border border-stone-200">{user.education}</span>
                {user.contractPreference && <span className="px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-800">{user.contractPreference}</span>}
                {user.willingToRelocate && <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800">Dispuesto a reubicarse</span>}
                {user.hasVehicle && <span className="px-3 py-1 rounded-full bg-amber-100 border border-amber-200">Vehículo · Lic. {user.drivingLicenseType}</span>}
                <span className="px-3 py-1 rounded-full bg-stone-900 text-white">{user.availability}</span>
              </div>
            </div>

            {/* Quick stats */}
            <div className="hidden xl:flex flex-col gap-3 shrink-0">
              <div className="bg-stone-50 border border-stone-200 rounded-3xl p-4 text-center min-w-[140px]">
                <div className="text-2xl font-black text-orange-600">{certificates.length}</div>
                <div className="text-[10px] font-bold uppercase text-stone-500">Certificados</div>
              </div>
              <div className="bg-stone-50 border border-stone-200 rounded-3xl p-4 text-center">
                <div className="text-2xl font-black text-amber-600">{badges.length}</div>
                <div className="text-[10px] font-bold uppercase text-stone-500">Insignias</div>
              </div>
              <div className="bg-stone-50 border border-stone-200 rounded-3xl p-4 text-center">
                <div className="text-2xl font-black text-emerald-600">{totalHours}h</div>
                <div className="text-[10px] font-bold uppercase text-stone-500">Capacitación</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CV SECTIONS GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Left column: Skills, Languages, Intereses */}
          <div className="lg:col-span-1 space-y-6">
            {/* Habilidades */}
            <div className="bg-white rounded-3xl border-2 border-stone-200 p-6">
              <h3 className="font-black flex items-center gap-2 mb-3"><ClipboardList className="w-5 h-5 text-emerald-600" /> Habilidades</h3>
              {user.skills.length === 0 && (user.customSkills?.length || 0) === 0 ? (
                <p className="text-xs text-stone-500 bg-amber-50 border border-amber-200 rounded-2xl p-3">Sin habilidades registradas. Edita tu CV para agregarlas.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {user.skills.map(s => (
                    <span key={s} className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold">{s.replace(/_/g, " ")}</span>
                  ))}
                  {(user.customSkills || []).map(s => (
                    <span key={s} className="px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-1">✨ {s}</span>
                  ))}
                </div>
              )}
              {editing && (
                <div className="mt-4 space-y-2">
                  <div className="flex gap-2">
                    <input value={customSkillInput} onChange={e => setCustomSkillInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addCustomSkill())} placeholder="Agregar 'Otro': Ej: Repostería..." className="flex-1 px-3 py-2 rounded-xl border border-amber-300 text-xs" />
                    <button onClick={addCustomSkill} className="px-3 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold">Agregar</button>
                  </div>
                  {customSkills.length > 0 && <div className="flex flex-wrap gap-1.5">{customSkills.map(s => <span key={s} className="inline-flex items-center gap-1 bg-white border border-stone-200 text-xs px-2.5 py-1 rounded-full">{s} <button onClick={() => setCustomSkills(prev => prev.filter(x => x !== s))}><X className="w-3 h-3" /></button></span>)}</div>}
                </div>
              )}
              <div className="mt-4 p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
                <span className="font-bold">Otras competencias:</span> {user.customSkills && user.customSkills.length > 0 ? user.customSkills.join(", ") : "—"}
              </div>
            </div>

            {/* Idiomas */}
            <div className="bg-white rounded-3xl border-2 border-stone-200 p-6">
              <h3 className="font-black flex items-center gap-2 mb-3"><Languages className="w-5 h-5 text-cyan-600" /> Idiomas</h3>
              {(user.languages && user.languages.length > 0) ? (
                <div className="space-y-2">
                  {user.languages.map((l, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-2xl bg-stone-50 border border-stone-200">
                      <span className="text-xs font-bold">{l.name}</span>
                      <span className={`text-[11px] font-black px-2.5 py-1 rounded-full border ${l.level === "Nativo" ? "bg-emerald-100 border-emerald-300 text-emerald-800" : l.level === "Avanzado" ? "bg-blue-100 border-blue-300 text-blue-800" : "bg-amber-100 border-amber-300 text-amber-800"}`}>{l.level}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-500">No especificado</p>
              )}
            </div>

            {/* Intereses */}
            <div className="bg-white rounded-3xl border-2 border-stone-200 p-6">
              <h3 className="font-black flex items-center gap-2 mb-3"><Sparkles className="w-5 h-5 text-orange-500" /> Intereses & objetivos</h3>
              <div className="flex flex-wrap gap-2">
                {user.interests.map(i => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-900 text-xs font-bold">{i}</span>
                ))}
              </div>
              {isMinor && <div className="mt-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs"><span className="font-black">🔍 Algoritmo personalizado:</span> tus cursos se priorizan según estos intereses + oficios manuales relacionados.</div>}
            </div>
          </div>

          {/* Right column: Experience + Education */}
          <div className="lg:col-span-2 space-y-6">
            {/* Experiencia */}
            <div className="bg-white rounded-3xl border-2 border-stone-200 p-6">
              <h3 className="font-black flex items-center gap-2 mb-4"><Briefcase className="w-5 h-5 text-slate-600" /> Experiencia laboral</h3>
              {(user.experiences && user.experiences.length > 0) ? (
                <div className="space-y-4">
                  {user.experiences.map(exp => (
                    <div key={exp.id} className="p-4 rounded-2xl border border-stone-200 bg-stone-50">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-extrabold text-sm">{exp.title}</div>
                          <div className="text-xs font-bold text-orange-600">{exp.company} {exp.location ? `· ${exp.location}` : ""}</div>
                          <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-1"><Calendar className="w-3 h-3" />{exp.startDate} — {exp.isCurrent ? "Actualidad" : exp.endDate} · {exp.employmentType}</div>
                        </div>
                        <span className={`text-[11px] font-black px-2.5 py-1 rounded-full ${exp.isCurrent ? "bg-emerald-100 border border-emerald-300 text-emerald-800" : "bg-white border border-stone-200 text-stone-600"}`}>{exp.isCurrent ? "Actual" : "Previo"}</span>
                      </div>
                      <p className="text-xs text-stone-600 mt-2 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  Sin experiencia laboral registrada. ¡No te preocupes! CRECE valora cursos y habilidades. Agrega voluntariado, prácticas o emprendimiento familiar para fortalecer tu CV.
                </div>
              )}
            </div>

            {/* Educación */}
            <div className="bg-white rounded-3xl border-2 border-stone-200 p-6">
              <h3 className="font-black flex items-center gap-2 mb-4"><GraduationCap className="w-5 h-5 text-indigo-600" /> Educación</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-between">
                  <span className="text-xs font-bold">Nivel actual:</span>
                  <span className="text-xs font-black text-indigo-800">{user.education}</span>
                </div>
                {(user.educationHistory && user.educationHistory.length > 0) ? (
                  <div className="space-y-3">
                    {user.educationHistory.map(edu => (
                      <div key={edu.id} className="p-4 rounded-2xl border border-stone-200 bg-white">
                        <div className="font-extrabold text-sm">{edu.degree} {edu.field ? `· ${edu.field}` : ""}</div>
                        <div className="text-xs font-bold text-stone-600">{edu.institution}</div>
                        <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-1"><Calendar className="w-3 h-3" />{edu.startDate} — {edu.isCurrent ? "Actualidad" : edu.endDate}</div>
                        {edu.description && <p className="text-xs text-stone-600 mt-1">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-stone-500 bg-stone-50 border border-dashed border-stone-300 rounded-2xl p-3 text-center">Sin historial detallado. Ve a "Rehacer CV completo" para agregar colegio, INTECAP o universidad.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION: BADGES ── */}
        <section className="mb-10 print:hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-800"><Award className="w-5 h-5" /></div>
              <div>
                <h2 className="text-xl font-black font-display">Mis Insignias & Logros</h2>
                <p className="text-xs text-stone-500">Reconocimientos por avance y compatibilidad</p>
              </div>
            </div>
            <span className="text-xs font-extrabold text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">{badges.length} insignias</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {badges.map((badge) => (
              <motion.div key={badge.id} whileHover={{ y: -3 }} className="edu-card p-5 bg-white rounded-3xl border-2 border-stone-200 flex items-start gap-4 shadow-sm">
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 shrink-0">{renderBadgeIcon(badge.icon)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-extrabold text-sm truncate">{badge.title}</h3>
                    <span className="text-[10px] font-bold text-stone-400">{badge.unlockedDate}</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">{badge.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── SECTION: CERTIFICATES ── */}
        <section className="mb-14 print:hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-800"><GraduationCap className="w-5 h-5" /></div>
              <div>
                <h2 className="text-xl font-black font-display">Mis Certificados Oficiales Verificables</h2>
                <p className="text-xs text-stone-500">Diplomas emitidos con folio QR oficial</p>
              </div>
            </div>
            <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full">{certificates.length} diplomas</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div key={cert.id} className="edu-card p-6 bg-white rounded-3xl border-2 border-stone-200 shadow-soft-card flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-xs">🎓</div>
                      <div>
                        <span className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">{cert.organization}</span>
                        <div className="text-[10px] text-stone-400 font-medium">Emitido el {cert.issueDate}</div>
                      </div>
                    </div>
                    <span className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" />Verificado</span>
                  </div>
                  <h3 className="font-extrabold text-stone-900 text-base leading-snug mb-3">{cert.courseTitle}</h3>
                  <div className="space-y-1.5 mb-4">
                    <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Habilidades Acreditadas:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skillsGained.map((skill, idx) => (
                        <span key={idx} className="bg-stone-100 text-stone-700 text-[11px] font-semibold px-2.5 py-1 rounded-xl border border-stone-200">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-200 mb-4 text-xs">
                    <div>
                      <div className="text-[10px] font-bold text-stone-400">Folio de Verificación</div>
                      <div className="font-mono font-bold text-stone-800">{cert.validationCode}</div>
                    </div>
                    <button onClick={() => copyValidationCode(cert.validationCode)} className="text-[11px] font-extrabold text-orange-600 hover:text-orange-700 bg-white border border-stone-200 px-2.5 py-1 rounded-xl shadow-sm">
                      {copiedCode === cert.validationCode ? "¡Copiado! ✓" : "Copiar Folio"}
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
                  <button onClick={() => setSelectedCert(cert)} className="flex-1 btn-outline-warm text-xs py-2.5 rounded-2xl font-extrabold">Ver Diploma Completo</button>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn-outline-warm text-xs py-2.5 px-3 rounded-2xl text-stone-600 hover:text-blue-600" title="Compartir en LinkedIn"><Share2 className="w-4 h-4" /></a>
                </div>
              </div>
            ))}
            {certificates.length === 0 && (
              <div className="col-span-2 p-8 rounded-3xl border-2 border-dashed border-stone-300 bg-stone-50 text-center">
                <p className="text-xs font-bold text-stone-500">Aún sin certificados. ¡Completa cursos gratuitos y aparecerán aquí!</p>
              </div>
            )}
          </div>
        </section>

        {/* ── MODAL: DIPLOMA ── */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-4xl border-4 border-amber-300 shadow-2xl p-6 sm:p-10 max-w-2xl w-full text-center relative overflow-hidden">
              <div className="absolute top-2 left-2 right-2 bottom-2 border-2 border-dashed border-amber-200 rounded-3xl pointer-events-none" />
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4"><Award className="w-8 h-8" /></div>
              <span className="text-xs font-black tracking-widest text-orange-600 uppercase">ALIANZA CRECE GUATEMALA</span>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 font-display mt-1 mb-2">Certificado de Aprobación Oficial</h3>
              <p className="text-xs text-stone-500 mb-6">Se otorga con distinción a:</p>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-serif border-b-2 border-stone-200 pb-2 mb-4 inline-block">{user.name} {user.lastName || ""}</div>
              <p className="text-xs text-stone-600 max-w-md mx-auto mb-6 leading-relaxed">Por haber completado {selectedCert.hoursCompleted} horas en:</p>
              <div className="text-base sm:text-lg font-black text-stone-900 bg-amber-50 py-3 px-4 rounded-2xl border border-amber-200 mb-6">{selectedCert.courseTitle}</div>
              <div className="grid grid-cols-2 gap-4 text-left text-xs bg-stone-50 p-4 rounded-2xl border border-stone-200 mb-6">
                <div><span className="text-stone-400 font-semibold">Institución:</span><div className="font-bold text-stone-800">{selectedCert.organization}</div></div>
                <div><span className="text-stone-400 font-semibold">Código:</span><div className="font-mono font-bold text-emerald-700">{selectedCert.validationCode}</div></div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <button onClick={() => setSelectedCert(null)} className="btn-outline-warm text-xs px-6 py-3 rounded-2xl font-bold">Cerrar</button>
                <button onClick={() => alert(`Descargando ${selectedCert.courseTitle}...`)} className="btn-primary-orange text-xs px-6 py-3 rounded-2xl font-extrabold flex items-center gap-2"><Download className="w-4 h-4" />Descargar PDF</button>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}
