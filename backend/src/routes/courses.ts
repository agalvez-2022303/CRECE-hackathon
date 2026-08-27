import { Router, Request, Response } from "express";
import { courses } from "../data/courses";

const router = Router();

// ── GET /api/courses ──────────────────────────────────────────────────────
// Returns all courses, optionally filtered by interest tags
router.get("/", (req: Request, res: Response) => {
  const { tags } = req.query;
  if (tags && typeof tags === "string") {
    const tagList = tags.split(",").map((t) => t.trim().toLowerCase());
    const filtered = courses.filter((c) =>
      c.tags.some((t) => tagList.includes(t))
    );
    res.json(filtered);
    return;
  }
  res.json(courses);
});

export default router;
