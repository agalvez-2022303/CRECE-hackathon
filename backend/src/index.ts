import express from "express";
import cors from "cors";
import opportunitiesRouter from "./routes/opportunities";
import coursesRouter from "./routes/courses";
import usersRouter from "./routes/users";

const app = express();
const PORT = process.env.PORT || 4000;

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors({ origin: "*" }));
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────────────────────
app.use("/api/opportunities", opportunitiesRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);

// ── Health check ───────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "CRECE MVP", timestamp: new Date().toISOString() });
});

// ── Start (Local development only, Vercel exports app directly) ────────────
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🌱 CRECE Backend corriendo en http://localhost:${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/api/health`);
    console.log(`   Usuarios demo: http://localhost:${PORT}/api/users/demo\n`);
  });
}

export default app;
