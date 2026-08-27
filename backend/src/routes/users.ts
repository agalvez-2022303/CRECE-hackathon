import { Router, Request, Response } from "express";
import { users, UserProfile } from "../data/users";
import { opportunities } from "../data/opportunities";
import { courses } from "../data/courses";

const router = Router();

// ── GET /api/users/demo ──────────────────────────────────────────────────
// Returns the two demo users
router.get("/demo", (_req: Request, res: Response) => {
  const demoUsers = users.filter((u) => u.isDemo);
  res.json(demoUsers);
});

// ── POST /api/users/login ────────────────────────────────────────────────
// Flexible login by Identifier (Email OR Phone) + optional Name
router.post("/login", (req: Request, res: Response) => {
  const { identifier, name, phone, email } = req.body as {
    identifier?: string;
    name?: string;
    phone?: string;
    email?: string;
  };

  const lookupValue = (identifier || phone || email || name || "").trim().toLowerCase();

  if (!lookupValue) {
    res.status(400).json({ error: "Ingresa tu correo electrónico o número de teléfono" });
    return;
  }

  // Find user by email, phone, or name match
  let user = users.find(
    (u) =>
      u.email.toLowerCase() === lookupValue ||
      u.phone.replace(/[-\s]/g, "") === lookupValue.replace(/[-\s]/g, "") ||
      u.name.toLowerCase() === lookupValue
  );

  if (!user) {
    // If not found, create a new user profile session with automatic detection
    const isEmail = lookupValue.includes("@");
    const generatedName = name && name.trim().length > 0 ? name.trim() : (isEmail ? lookupValue.split("@")[0] : `Usuario ${lookupValue.slice(-4)}`);

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: generatedName,
      email: isEmail ? lookupValue : `${lookupValue.replace(/[^0-9]/g, "")}@crece.gt`,
      phone: !isEmail ? lookupValue : "5555-0000",
      avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=NuevoTalento&backgroundColor=b6e3f4",
      isSafeAvatar: true,
      headline: "Nuevo integrante en CRECE Guatemala",
      age: 0,
      isAdult: false,
      location: "",
      education: "",
      availability: "",
      skills: [],
      interests: ["tecnologia", "administracion"],
      isDemo: false,
      completedCoursesCount: 0,
      activeApplicationsCount: 0,
      badges: [
        {
          id: "b-new",
          title: "Nuevo Integrante",
          description: "Bienvenida/o a la comunidad de aprendizaje de CRECE GT.",
          icon: "Sparkles",
          unlockedDate: "Hoy",
          category: "special",
          accentColor: "emerald"
        }
      ],
      certificates: []
    };
    users.push(newUser);
    user = newUser;
  }

  res.json({ user, needsOnboarding: user.age === 0 });
});

// ── POST /api/users ──────────────────────────────────────────────────────
// Create/update a user profile (onboarding CV completo)
router.post("/", (req: Request, res: Response) => {
  const data = req.body as Partial<UserProfile> & { isAdult?: boolean };
  if (!data.id) {
    res.status(400).json({ error: "ID de usuario requerido" });
    return;
  }

  const idx = users.findIndex((u) => u.id === data.id);
  // Respect explicit isAdult if provided, otherwise infer from age
  const isAdultVal = typeof data.isAdult === "boolean" ? data.isAdult : (data.age ?? 0) >= 18;

  if (idx === -1) {
    const newUser: UserProfile = {
      id: data.id,
      name: data.name ?? "Joven CRECE",
      lastName: data.lastName,
      email: data.email ?? `user-${Date.now()}@crece.gt`,
      phone: data.phone ?? "5555-0000",
      phoneAlt: data.phoneAlt,
      avatar: data.avatar ?? (isAdultVal
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
        : "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=DiegoGT&backgroundColor=b6e3f4"),
      isSafeAvatar: data.isSafeAvatar ?? !isAdultVal,
      headline: data.headline ?? (isAdultVal ? "Buscando oportunidades de empleo formal" : "Desarrollando nuevas habilidades y cursos"),
      summary: data.summary,
      age: data.age ?? 18,
      birthDate: data.birthDate,
      gender: data.gender,
      maritalStatus: data.maritalStatus,
      nationalId: data.nationalId,
      isAdult: isAdultVal,
      location: data.location ?? "Guatemala",
      municipality: data.municipality,
      department: data.department,
      address: data.address,
      willingToRelocate: data.willingToRelocate,
      hasVehicle: data.hasVehicle,
      drivingLicenseType: data.drivingLicenseType,
      education: data.education ?? "Diversificado",
      availability: data.availability ?? (isAdultVal ? "Tiempo Completo" : "Medio Tiempo"),
      availabilityDetail: data.availabilityDetail,
      contractPreference: data.contractPreference,
      salaryExpectation: data.salaryExpectation,
      portfolioUrl: data.portfolioUrl,
      linkedinUrl: data.linkedinUrl,
      githubUrl: data.githubUrl,
      customSkills: data.customSkills ?? [],
      skills: data.skills ?? [],
      interests: data.interests ?? ["tecnologia", "administracion"],
      languages: data.languages ?? [{ name: "Español", level: "Nativo" }],
      experiences: data.experiences ?? [],
      educationHistory: data.educationHistory ?? [],
      isDemo: false,
      completedCoursesCount: 0,
      activeApplicationsCount: 0,
      badges: data.badges ?? [
        {
          id: "b-reg",
          title: "Perfil Creado",
          description: "Completó exitosamente el registro en CRECE.",
          icon: "ShieldCheck",
          unlockedDate: "Hoy",
          category: "special",
          accentColor: "emerald"
        }
      ],
      certificates: data.certificates ?? [],
      emergencyContact: data.emergencyContact,
    };
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    // Merge update, keep existing badges/certificates if not provided
    const existing = users[idx];
    const updated: UserProfile = {
      ...existing,
      ...data,
      // Explicit handling for arrays to avoid overwriting with undefined
      customSkills: data.customSkills ?? existing.customSkills,
      skills: data.skills ?? existing.skills,
      interests: data.interests ?? existing.interests,
      languages: data.languages ?? existing.languages,
      experiences: data.experiences ?? existing.experiences,
      educationHistory: data.educationHistory ?? existing.educationHistory,
      isAdult: typeof data.isAdult === "boolean" ? data.isAdult : (data.age ?? existing.age) >= 18,
      isSafeAvatar: typeof data.isSafeAvatar === "boolean" ? data.isSafeAvatar : (typeof data.isAdult === "boolean" ? !data.isAdult : (data.age ?? existing.age) < 18),
    };
    users[idx] = updated;
    res.json(updated);
  }
});

// ── GET /api/users/:id ───────────────────────────────────────────────────
// Get user profile
router.get("/:id", (req: Request, res: Response) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    res.status(404).json({ error: "Usuario no encontrado" });
    return;
  }
  res.json(user);
});

// ── GET /api/users/:id/match ─────────────────────────────────────────────
// Calculate match % for each opportunity
router.get("/:id/match", (req: Request, res: Response) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    res.status(404).json({ error: "Usuario no encontrado" });
    return;
  }

  const allUserSkills = [...(user.skills || []), ...(user.customSkills || []).map(s => s.toLowerCase().trim())];
  const normalizeSkill = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  const allUserSkillsNorm = allUserSkills.map(normalizeSkill);

  const results = opportunities.map((op) => {
    const totalReqs = op.requirements.length;
    const matched = op.requirements.filter((r) => {
      const rNorm = normalizeSkill(r);
      return allUserSkillsNorm.includes(rNorm) || allUserSkillsNorm.some(us => us.includes(rNorm) || rNorm.includes(us));
    });
    const missing = op.requirements.filter((r) => !matched.includes(r));
    const matchPct = totalReqs === 0 ? 100 : Math.round((matched.length / totalReqs) * 100);

    // Find recommended courses for missing skills
    const recommendedCourses = missing
      .map((missingSkill) => courses.find((c) => c.skillTaught === missingSkill))
      .filter(Boolean)
      .slice(0, 2);

    return {
      opportunity: op,
      matchPct,
      matchedRequirements: matched,
      missingRequirements: missing,
      recommendedCourses,
    };
  });

  // Sort by match % descending
  results.sort((a, b) => b.matchPct - a.matchPct);

  res.json(results);
});

// ── POST /api/users/:id/apply/:opId ─────────────────────────────────────
// Mock: apply for an interview with rich feedback
router.post("/:id/apply/:opId", (req: Request, res: Response) => {
  const { id, opId } = req.params;
  const user = users.find((u) => u.id === id);
  const op = opportunities.find((o) => o.id === opId);
  if (!user || !op) {
    res.status(404).json({ error: "Usuario u oportunidad no encontrada" });
    return;
  }

  res.json({
    success: true,
    message: `¡Tu postulación fue recibida con éxito! ${op.company} ha sido notificada de tu compatibilidad del 100% y el equipo de Talento Humano te contactará por teléfono/WhatsApp (${user.phone}) en un plazo máximo de 48 horas laborales.`,
    applicantName: user.name,
    opportunityTitle: op.title,
    company: op.company,
    interviewDateSuggestion: "Próximo lunes 10:00 AM (Modalidad Virtual o Presencial en sede)",
    applicationCode: `CRECE-GT-${Math.floor(100000 + Math.random() * 900000)}`
  });
});

export default router;
