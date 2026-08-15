"use client";

import type { Project } from "@/types";
import { ProjectRow } from "@/components/projects/ProjectRow";
import { AddTaskInline } from "@/components/tasks/AddTaskInline";

interface ProjectListProps {
  projects: Project[];
  onPatch: (id: string, patch: Partial<Project>) => void;
  onAdd: (name: string) => void;
}

export function ProjectList({ projects, onPatch, onAdd }: ProjectListProps) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-3">
      <div className="rounded-md border border-border-subtle">
        <div className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 border-b border-border-subtle bg-surface-subtle px-2 py-1.5 text-xs font-medium text-ink-faint">
          <span>Projects</span>
          <span className="w-24">Priority</span>
          <span className="w-16">Lead</span>
          <span className="w-24">Due Date</span>
          <span className="w-8">Actions</span>
        </div>

        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} onPatch={(patch) => onPatch(project.id, patch)} />
        ))}

        <AddTaskInline label="Add Projects" onAdd={onAdd} />
      </div>
    </div>
  );
}
