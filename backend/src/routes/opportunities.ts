import { Router, Request, Response } from "express";
import { opportunities } from "../data/opportunities";
import { courses } from "../data/courses";
import { users } from "../data/users";

const router = Router();

// ── GET /api/opportunities ─────────────────────────────────────────────────
// Returns all opportunities
router.get("/", (_req: Request, res: Response) => {
  res.json(opportunities);
});

// ── GET /api/opportunities/:id ─────────────────────────────────────────────
// Returns a single opportunity with full detail
router.get("/:id", (req: Request, res: Response) => {
  const op = opportunities.find((o) => o.id === req.params.id);
  if (!op) {
    res.status(404).json({ error: "Oportunidad no encontrada" });
    return;
  }
  res.json(op);
});

export default router;
