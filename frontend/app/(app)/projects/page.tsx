"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { ProjectList } from "@/components/projects/ProjectList";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ProjectsPage() {
  const { projects, loading, addProject, patchProject } = useProjects();
  const [search, setSearch] = useState("");

  const filtered = projects.filter((p) => p.name.toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h1 className="text-md font-semibold text-ink">Projects</h1>
        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="h-8 w-[180px] pl-8 text-xs"
            />
          </div>
          <Button variant="primary" size="sm" onClick={() => addProject("New project")}>
            <Plus className="h-3.5 w-3.5" />
            Add Project
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-accent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-1 px-4 text-center">
          <p className="text-sm font-medium text-ink">No projects found</p>
          <p className="text-xs text-ink-faint">Try a different search or add a new project.</p>
        </div>
      ) : (
        <ProjectList projects={filtered} onPatch={patchProject} onAdd={addProject} />
      )}
    </div>
  );
}
