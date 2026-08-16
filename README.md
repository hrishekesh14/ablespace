# ablespace
# AbleSpace — Task Management (Frontend)

Frontend for the AbleSpace Full Stack Developer technical assessment, built to match the provided Figma design.

## Live Deployment

- **App:** https://ablespace-eight.vercel.app
- **Backend API this connects to:** https://ablespace-production.up.railway.app/api
- Try it: click **"Continue as Guest"** on the login screen to explore the app immediately.

## Tech Stack

- Next.js 14 (App Router), TypeScript (strict)
- Tailwind CSS, themed via CSS variables
- lucide-react for icons

## Features

- Guest login / mock Google login
- Tasks — list view (grouped by status) and Kanban board view, with a Fields dropdown to toggle visible columns
- Task detail panel — subtasks, comments, priority/status/member editing, due dates
- Projects — same list pattern as Tasks
- Theme support — light/dark mode plus 6 accent colors, persisted across sessions
- Fully responsive layout

## Getting Started

```bash
npm install
npm run dev       # http://localhost:3000
```

By default this runs on mock data with zero setup. To connect the real backend:

```bash
cp .env.local.example .env.local
```

Set in `.env.local`:
