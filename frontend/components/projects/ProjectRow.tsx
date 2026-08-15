"use client";

import Link from "next/link";
import type { Project } from "@/types";
import { PrioritySelect } from "@/components/tasks/PrioritySelect";
import { MemberSelect } from "@/components/tasks/MemberSelect";
import { DatePicker } from "@/components/ui/DatePicker";

interface ProjectRowProps {
  project: Project;
  onPatch: (patch: Partial<Project>) => void;
}

export function ProjectRow({ project, onPatch }: ProjectRowProps) {
  return (
    <div className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 border-b border-border-subtle px-2 py-2 text-sm hover:bg-surface-subtle">
      <Link href="/tasks" className="min-w-0 truncate text-ink hover:underline">
        {project.name}
      </Link>
      <div className="w-24">
        <PrioritySelect value={project.priority} onChange={(priority) => onPatch({ priority })} />
      </div>
      <div className="w-16">
        <MemberSelect
          memberIds={project.leadId ? [project.leadId] : []}
          onChange={(ids) => onPatch({ leadId: ids[0] })}
          multiple={false}
        />
      </div>
      <div className="w-24">
        <DatePicker value={project.dueDate} onChange={(dueDate) => onPatch({ dueDate })} />
      </div>
      <div className="w-8" />
    </div>
  );
}
