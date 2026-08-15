# AbleSpace — Task Management (Frontend)

Frontend-only implementation of the AbleSpace Full Stack Developer technical
assessment, built to closely match the provided Figma design
(`Assessment-Task`, node `0-1`).

This deliverable covers **Part 1: frontend** only. It is architected so the
NestJS backend can be plugged in later with no changes to components.

## Features

- **Guest login / Login with Google** — matches the "Let's get back on
  track" login screen, including the terms notice.
- **Tasks workspace**
  - List view: tasks grouped by status (To Do / Doing / Completed / On
    Hold) in collapsible sections, inline-editable priority, members, and
    due date, plus an "Add Task" row per group.
  - Board (Kanban) view: the same four status columns as draggable-style
    cards, with quick-add per column.
  - **Fields** dropdown to toggle which columns are visible (Priority,
    Members, Due Date, Labels, Status, Reporter) and to switch between List
    and Board — matching the Figma dropdown exactly.
  - **Task detail panel**: slide-over with title/description editing,
    properties, labels, resources, a subtasks table (add/edit/delete,
    per-subtask priority/member/due date), comments, and a right-hand
    Details sidebar (Status, Priority, Members, Due date) with an Updates
    log.
- **Projects workspace** — same list pattern (priority, lead, due date,
  actions) as Tasks, with inline "Add Projects".
- **Theme support**
  - Light / Dark mode.
  - 6 accent colors (Amber, Blue, Pink, Rose, Emerald, Black), matching the
    Color Mode picker.
  - Persists across refresh via `localStorage`, applied before first paint
    (inline script in `app/layout.tsx`) to avoid a flash of the wrong theme.
  - Reachable both from the workspace user menu (Change Theme / Color Mode)
    and from a dedicated Settings → Theme / Color page.
- **Profile settings** — profile picture, email, full name, title,
  username, and "Leave Workspace", with the same "Back to app / Profile /
  Theme / Color" mini nav shown in the design.
- Fully responsive: the sidebar becomes a slide-in drawer on mobile, tables
  collapse extra columns on narrow viewports, and the detail panel becomes
  full-width on small screens.

## Tech stack

- **Next.js 14** (App Router), **TypeScript** (strict)
- **Tailwind CSS**, themed via CSS variables (`app/globals.css`,
  `tailwind.config.ts`)
- **lucide-react** for icons
- No UI kit — every control (dropdowns, popovers, date picker, checkboxes)
  is a small custom component built for this design.

## Folder structure

```
app/
  layout.tsx            Root layout, theme-flash prevention script
  page.tsx               Redirects to /login or /tasks based on session
  login/page.tsx
  (app)/                 Authenticated route group (guarded + shell)
    layout.tsx
    tasks/page.tsx
    projects/page.tsx
    profile/page.tsx

components/
  ui/                    Generic building blocks (Button, Input, Avatar,
                          Popover, Checkbox, Badge, DatePicker, IconButton)
  layout/                Sidebar, AppShell, WorkspaceMenu, SettingsNav,
                          RequireAuth
  tasks/                 TasksToolbar, TaskListView, TaskBoardView,
                          TaskCard, TaskRow, TaskDetailPanel, SubtaskRow,
                          PrioritySelect, MemberSelect, StatusSelect,
                          FieldsDropdown, AddTaskInline
  projects/               ProjectList, ProjectRow
  forms/                  LoginForm, ProfileForm, ThemeSettings,
                          ColorSettings

hooks/                    useTheme, useAuth, useTasks, useProjects,
                          useLocalStorage, useOutsideClick
lib/
  api/                    client.ts, tasks.ts, projects.ts, auth.ts —
                          the service layer (see below)
  mock/                   Mock data standing in for the backend
  utils.ts
types/                    Shared TypeScript types
constants/                Design/domain constants (theme, nav)
```

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

Type-check and lint:

```bash
npx tsc --noEmit
npm run lint
```

## Mock data / API architecture

Every screen reads and writes through `lib/api/*`, never through
`lib/mock/*` directly. Each API module (`tasks.ts`, `projects.ts`,
`auth.ts`) exposes the same function signatures a real client would call
(`fetchTasks`, `createTask`, `updateTask`, `deleteTask`, …). Internally,
`MOCK_MODE` (in `lib/api/client.ts`) decides whether to resolve against the
in-memory mock store or call `request()`, a thin `fetch` wrapper aimed at
`NEXT_PUBLIC_API_URL`.

To connect the real NestJS backend: implement the matching REST endpoints,
set `NEXT_PUBLIC_API_URL`, and flip `MOCK_MODE` to `false`. No component
changes are required.

## Theme implementation

`hooks/useTheme.tsx` exposes `mode` (`light`/`dark`) and `accent` (one of
six colors) through context, persisted to `localStorage`. A small inline
script in `app/layout.tsx` reads the same keys before React hydrates and
sets `data-theme` / `data-accent` attributes (and the `dark` class) on
`<html>`, so the correct theme is visible on first paint. All colors are
defined once as CSS variables in `app/globals.css` and consumed through
Tailwind's `colors.surface/ink/border/accent.*` tokens — components never
hardcode hex values.

## Component architecture notes

- `TaskListView` / `TaskBoardView` both consume the same `Task[]` and the
  same mutation callbacks (`onPatch`, `onDelete`, `onAdd`) from
  `useTasks()`, so switching views via the Fields dropdown is a pure
  presentation change.
- Inline editors (`PrioritySelect`, `MemberSelect`, `DatePicker`,
  `StatusSelect`) are shared between the list rows, board cards, and the
  task detail panel, so an edit made in one place is consistent everywhere
  it appears.
- `Popover` + `useOutsideClick` are the single mechanism behind every
  dropdown/menu in the app (Fields, Priority, Member, Date, workspace user
  menu), keeping open/close and keyboard (Escape) behavior consistent.

## Intentional deviations from the screenshots

- **Icon/asset set**: the Figma file's icons are Figma-native vectors that
  aren't exportable from view-only access; equivalent `lucide-react` icons
  were used throughout (same visual language: priority signal bars, status
  dots, calendar, etc.).
- **Drag-and-drop on the board view**: cards are click-to-open and the
  status can be changed from the detail panel's Status field; free-form
  drag-and-drop between columns was intentionally left out of this pass to
  keep the mock data model simple, since it wasn't verifiable pixel-for-
  pixel from static screenshots.
- **"Pyramid" avatar name tags** visible in a couple of screenshots are
  Figma's own multiplayer cursor labels (other designers viewing the file),
  not application UI, and were not reproduced.
- Font: the design's typeface could not be confirmed from screenshots
  alone, so the interface uses the OS-native UI font stack (San Francisco /
  Segoe UI / Roboto) rather than fetching a specific webfont, which also
  keeps the production build free of a runtime dependency on a font CDN.

## Verification performed

- `npm install` — clean install, no peer conflicts.
- `npx tsc --noEmit` — zero type errors.
- `npm run lint` — zero errors/warnings.
- `npm run build` — succeeds with zero warnings; all 6 routes prerender as
  static content.
- `npm run start` + route smoke test — `/`, `/login`, `/tasks`,
  `/projects`, `/profile` all return `200`; an unknown route correctly
  returns `404`; login page HTML contains the expected "Continue as Guest"
  / "Login with Google" controls.
