# AbleSpace — Backend (NestJS)

REST API for the AbleSpace task management assessment. Built to match the
frontend's `lib/api/*.ts` service layer exactly — same field names, same
resource shapes — so pointing the frontend at this backend is a one-line
env change, not a rewrite.
## Live Deployment

- **API base URL:** `https://ablespace-production.up.railway.app/api`
- **Health check:** `https://ablespace-production.up.railway.app/api/health`
- **Frontend consuming this API:** `https://ablespace-eight.vercel.app`

## Tech stack

- **NestJS 10** + **TypeScript** (strict)
- **TypeORM** with the **sql.js** driver — a pure JS/WebAssembly SQLite
  implementation. Chosen over `better-sqlite3` deliberately: it needs no
  native compilation step (no `node-gyp`, no build tools required on your
  machine or on whatever host you deploy to), which matters for a fresher
  assessment reviewers will actually try to run.
- **class-validator** / **class-transformer** for request validation
- **@nestjs/jwt** for guest/Google login sessions


## Endpoints

All routes are prefixed with `/api`.

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Liveness check |
| GET | `/users` | List users (for member pickers) |
| GET | `/tasks` | List all tasks |
| GET | `/tasks/:id` | Get one task |
| POST | `/tasks` | Create a task `{ title, status }` |
| PATCH | `/tasks/:id` | Update any task field |
| DELETE | `/tasks/:id` | Delete a task |
| GET | `/projects` | List all projects |
| POST | `/projects` | Create a project `{ name }` |
| PATCH | `/projects/:id` | Update a project |
| POST | `/auth/guest` | Issue an ephemeral guest session + JWT |
| POST | `/auth/google` | Mock Google login (seeded demo user) + JWT |
| PATCH | `/auth/profile` | Update the authenticated user's profile — **requires `Authorization: Bearer <token>`** |

The database is seeded automatically on first boot with data matching the
frontend's mocks exactly (same task titles, same "Ankit Dutta" comment,
same projects), so the two are visually identical whether you're pointed
at mocks or the real API.

## Getting started

```bash
cp .env.example .env
npm install
npm run start:dev      # http://localhost:3001/api
```

Production:

```bash
npm run build
npm run start:prod
```

Tests:

```bash
npm run test:e2e   # health, CRUD, validation, auth — 7 tests
npm run lint
```

## Connecting the frontend

In the frontend project, copy `.env.local.example` to `.env.local`:

```
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Restart the frontend dev server. Every screen now reads/writes through
this API instead of the in-memory mock store — no component changes
required, since both were built against the same `Task`/`Project`/`User`
shapes from day one.

## Environment variables

| Variable | Default | Notes |
|---|---|---|
| `PORT` | `3001` | |
| `CORS_ORIGIN` | `http://localhost:3000` | Set to your deployed frontend's origin in production |
| `DATABASE_PATH` | `./data/ablespace.sqlite` | File the sql.js database autosaves to |
| `JWT_SECRET` | *(dev placeholder)* | **Must** be overridden with a long random value in any real deployment |

## Deploying

This is a standard Node/NestJS app with a file-based database, so it fits
platforms with a persistent disk (Railway, Render, Fly.io). A rough outline:

1. Push this backend to its own GitHub repo (or a `backend/` folder in a
   monorepo with the frontend).
2. On Railway/Render: new web service → connect the repo → build command
   `npm install && npm run build` → start command `npm run start:prod`.
3. Set environment variables: `CORS_ORIGIN` to your deployed frontend URL,
   `JWT_SECRET` to a real random string, `DATABASE_PATH` to a path on the
   platform's persistent volume if one is available (otherwise the SQLite
   file resets on redeploy — fine for a demo, not for real data).
4. Once you have the backend's public URL, set `NEXT_PUBLIC_API_URL` on
   the frontend deployment to `https://your-backend-url/api` and
   `NEXT_PUBLIC_USE_MOCK=false`.

## Architecture notes

- **Validation**: every mutating endpoint has a DTO with `class-validator`
  decorators; invalid payloads (bad enum values, missing required fields)
  return `400` with a descriptive message via the global
  `HttpExceptionFilter`.
- **Auth**: guest and Google logins are intentionally simplified (no real
  OAuth exchange — see comments in `auth.service.ts`) but issue real,
  verifiable JWTs, and `/auth/profile` is a genuinely guarded route via
  `JwtAuthGuard`, not just a stub.
- **Data model**: `subtasks`, `comments`, and `updates` are stored as JSON
  columns on the `Task` entity rather than separate related tables — a
  deliberate scope decision documented in `task.entity.ts`, appropriate
  for this assessment's single-user scope.
- **Seeding**: `seedIfEmpty()` on each service runs once at boot so the
  API is immediately populated without a separate migration/seed command.
