# CRECE — MVP Hackathon 🌱

Plataforma web que conecta jóvenes guatemaltecos con oportunidades laborales y capacitación gratuita.

## Arrancar en desarrollo (local)

Necesitas dos terminales:

### Terminal 1 — Backend (Express, puerto 4000)
```bash
cd backend
npm run dev
```

### Terminal 2 — Frontend (Vite + React, puerto 3000)
```bash
cd frontend
npm run dev
```

Luego abre: **http://localhost:3000**

---

## Usuarios de prueba para demo

| Nombre | Tipo | Acceso |
|--------|------|--------|
| María López | Adulta (26 años) | Botón directo en login |
| Diego Ajú | Menor (16 años) | Botón directo en login |

## Flujos de demo sugeridos (3-5 min)

1. **Entrar como María** → Ver dashboard con oportunidades + % de match variado
2. **Clic en una oferta** → Ver requisitos ✅/⭕ + cursos recomendados
3. **Clic en oferta con 100%** → Solicitar entrevista → Confirmación
4. **Volver**, salir, **entrar como Diego** → Solo cursos, sin sección laboral
5. (Opcional) **Crear cuenta nueva** → Mostrar onboarding wizard

## Stack

- Frontend: React 18 + TypeScript + Vite + Tailwind CSS
- Backend: Node.js + Express + TypeScript
- Datos: Mock en memoria (JSON), sin base de datos
- Sesión: localStorage del navegador

## Estructura
```
crece/
├── backend/     Express API (puerto 4000)
│   └── src/
│       ├── data/        Mock data (users, opportunities, courses)
│       └── routes/      API endpoints
└── frontend/    React SPA (puerto 3000)
    └── src/
        ├── pages/       LoginPage, DashboardPage, OnboardingPage, OpportunityDetailPage
        ├── components/  Header, MatchCard, MatchBar, CourseCard
        ├── context/     UserContext (sesión)
        └── types/       TypeScript interfaces
```

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/users/demo | Usuarios precargados |
| POST | /api/users/login | Login por nombre + teléfono |
| GET | /api/users/:id/match | Match % vs todas las ofertas |
| POST | /api/users/:id/apply/:opId | Mock solicitud de entrevista |
| GET | /api/opportunities | Listado de ofertas |
| GET | /api/courses?tags=... | Cursos filtrados por interés |
