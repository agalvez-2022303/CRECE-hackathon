import { Router, Request, Response } from "express";
import { courses } from "../data/courses";
import { users } from "../data/users";

const router = Router();

// ── interest alias mapping for better matching ──
const INTEREST_ALIASES: Record<string, string[]> = {
  cocina: ["cocina", "gastronomia", "panaderia", "manual"],
  gastronomia: ["cocina", "gastronomia", "panaderia"],
  salud: ["salud", "medicina", "cuidado", "manual"],
  medicina: ["salud", "medicina", "cuidado"],
  electricidad: ["electricidad", "manual", "tecnologia"],
  mecanica: ["mecanica", "manual", "automotriz"],
  carpinteria: ["carpinteria", "manual", "construccion"],
  belleza: ["belleza", "estilismo", "barberia", "manual"],
  agricultura: ["agricultura", "manual", "sostenible"],
  manual: ["manual", "cocina", "salud", "electricidad", "mecanica", "carpinteria", "belleza", "agricultura", "panaderia"],
  tecnologia: ["tecnologia", "computacion", "programacion"],
  programacion: ["programacion", "tecnologia", "computacion"],
  diseño: ["diseño", "creatividad", "manual", "carpinteria"],
  emprendimiento: ["emprendimiento", "marketing", "ventas", "cocina", "panaderia", "belleza", "agricultura"],
  marketing: ["marketing", "diseño", "emprendimiento"],
  administracion: ["administracion", "empleo", "computacion"],
  idiomas: ["idiomas", "turismo", "ingles"],
  ventas: ["ventas", "comercio", "empleo"],
  turismo: ["turismo", "idiomas", "cocina", "gastronomia"],
};

function normalize(s: string) {
  return s.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function scoreCourse(course: typeof courses[0], userInterests: string[], userSkills: string[], isMinor: boolean): number {
  let score = 0;
  const interestsNorm = userInterests.map(normalize);
  const courseTagsNorm = course.tags.map(normalize);
  const courseSkillNorm = normalize(course.skillTaught);
  const courseLevel = course.level;

  // Direct tag matches (high weight)
  for (const tag of courseTagsNorm) {
    if (interestsNorm.includes(tag)) {
      score += 30;
    } else {
      // Alias matches (medium weight)
      for (const interest of interestsNorm) {
        const aliases = INTEREST_ALIASES[interest] || [];
        if (aliases.map(normalize).includes(tag)) {
          score += 18;
          break;
        }
      }
    }
  }

  // Bonus if skillTaught directly equals an interest (e.g., cooking interest)
  if (interestsNorm.includes(courseSkillNorm)) {
    score += 25;
  }

  // For manual trades, give extra boost if user has manual/cocina/salud interests
  const manualInterests = ["cocina", "gastronomia", "salud", "medicina", "electricidad", "mecanica", "carpinteria", "belleza", "agricultura", "manual", "panaderia"];
  const hasManualInterest = interestsNorm.some(i => manualInterests.includes(i));
  const isManualCourse = courseTagsNorm.includes("manual");
  if (hasManualInterest && isManualCourse) {
    score += 22;
  }

  // If user already has the skill, reduce priority (they don't need it)
  if (userSkills.map(normalize).includes(courseSkillNorm)) {
    score -= 15;
  }

  // Prefer beginner-friendly for minors
  if (isMinor && courseLevel === "Desde Cero (Principiantes)") {
    score += 12;
  }

  // Slight boost for free + certificate
  if (course.isFree && course.certificateIncluded) score += 3;

  // If no interests (cold start) give neutral score based on popularity (beginner + free)
  if (interestsNorm.length === 0) {
    score += 5;
  }

  return score;
}

// ── GET /api/courses/recommended/:userId ───────────────────────────────
// Personalized ranking for minors (and adults) based on interests
router.get("/recommended/:userId", (req: Request, res: Response) => {
  const user = users.find(u => u.id === req.params.userId);
  if (!user) {
    res.status(404).json({ error: "Usuario no encontrado" });
    return;
  }
  const interests = user.interests || [];
  const skills = [...(user.skills || []), ...(user.customSkills || []).map(s => normalize(s))];
  const isMinor = !user.isAdult;

  const scored = courses.map(c => ({
    course: c,
    score: scoreCourse(c, interests, skills, isMinor),
    reason: (() => {
      const topTags = c.tags.filter(t => interests.map(normalize).includes(normalize(t)));
      if (topTags.length > 0) return `Coincide con tu interés en ${topTags.join(", ")}`;
      if (isMinor && c.level === "Desde Cero (Principiantes)") return "Ideal para empezar desde cero";
      return "Recomendado para tu perfil";
    })()
  }));

  scored.sort((a, b) => b.score - a.score);

  // Return enriched object with score
  res.json(scored.map(s => ({ ...s.course, _score: s.score, _reason: s.reason })));
});

// ── GET /api/courses ──────────────────────────────────────────────────────
router.get("/", (req: Request, res: Response) => {
  const { tags, userId, interests } = req.query as { tags?: string; userId?: string; interests?: string };

  // Personalized scoring if userId provided
  if (userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
      const userInterests = user.interests || [];
      const userSkills = [...(user.skills || []), ...(user.customSkills || []).map(s => normalize(s))];
      const isMinor = !user.isAdult;
      const scored = courses.map(c => ({
        course: c,
        score: scoreCourse(c, userInterests, userSkills, isMinor)
      }));
      scored.sort((a, b) => b.score - a.score);

      // Also apply tags filter if present after scoring
      let result = scored.map(s => ({ ...s.course, _score: s.score }));
      if (tags && typeof tags === "string") {
        const tagList = tags.split(",").map(t => normalize(t));
        result = result.filter(c => c.tags.some(t => tagList.includes(normalize(t))));
      }
      res.json(result);
      return;
    }
  }

  // Direct interests param scoring (no user lookup)
  if (interests && typeof interests === "string") {
    const interestList = interests.split(",").map(t => t.trim());
    const scored = courses.map(c => ({
      course: c,
      score: scoreCourse(c, interestList, [], true)
    }));
    scored.sort((a, b) => b.score - a.score);
    res.json(scored.map(s => ({ ...s.course, _score: s.score })));
    return;
  }

  // Simple tag filter fallback
  if (tags && typeof tags === "string") {
    const tagList = tags.split(",").map((t) => normalize(t));
    const filtered = courses.filter((c) =>
      c.tags.some((t) => tagList.includes(normalize(t)))
    );
    res.json(filtered);
    return;
  }
  res.json(courses);
});

export default router;
