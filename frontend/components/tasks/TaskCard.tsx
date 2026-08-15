"use client";

import type { Task } from "@/types";
import { PriorityTag } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { getUserById } from "@/lib/mock/users";
import { formatDate } from "@/lib/utils";
import { CalendarDays } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onOpen: (task: Task) => void;
}

export function TaskCard({ task, onOpen }: TaskCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(task)}
      className="flex w-full flex-col gap-2 rounded-lg border border-border bg-surface p-3 text-left shadow-card transition-shadow hover:shadow-popover"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium leading-snug text-ink">{task.title}</p>
        <div className="flex -space-x-1.5">
          {task.memberIds.slice(0, 2).map((id) => (
            <Avatar key={id} user={getUserById(id)} size="sm" ring />
          ))}
        </div>
      </div>

      {task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {task.labels.slice(0, 2).map((label, idx) => (
            <span
              key={`${label}-${idx}`}
              className="rounded-full border border-border bg-surface-subtle px-2 py-0.5 text-[11px] text-ink-muted"
            >
              {label}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-1">
        <PriorityTag priority={task.priority} />
        {task.dueDate && (
          <span className="flex items-center gap-1 text-xs text-ink-faint">
            <CalendarDays className="h-3 w-3" />
            {formatDate(task.dueDate)}
          </span>
        )}
      </div>
    </button>
  );
}
