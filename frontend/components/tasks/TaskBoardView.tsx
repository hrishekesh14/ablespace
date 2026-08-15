"use client";

import { Plus } from "lucide-react";
import type { Task, TaskStatus } from "@/types";
import { STATUS_LABEL, STATUS_ORDER } from "@/constants/theme";
import { TaskCard } from "@/components/tasks/TaskCard";
import { AddTaskInline } from "@/components/tasks/AddTaskInline";
import { IconButton } from "@/components/ui/IconButton";

interface TaskBoardViewProps {
  tasks: Task[];
  onOpen: (task: Task) => void;
  onAdd: (title: string, status: TaskStatus) => void;
}

export function TaskBoardView({ tasks, onOpen, onAdd }: TaskBoardViewProps) {
  return (
    <div className="flex h-full gap-4 overflow-x-auto p-4 scrollbar-thin">
      {STATUS_ORDER.map((status) => {
        const columnTasks = tasks.filter((task) => task.status === status);
        return (
          <div key={status} className="flex w-[280px] shrink-0 flex-col rounded-lg bg-surface-subtle">
            <div className="flex items-center justify-between px-3 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-ink">{STATUS_LABEL[status]}</span>
                <span className="rounded-full bg-surface px-1.5 py-0.5 text-xs text-ink-faint">
                  {columnTasks.length}
                </span>
              </div>
              <IconButton
                aria-label={`Add task to ${STATUS_LABEL[status]}`}
                size="sm"
                onClick={() => onAdd("New task", status)}
              >
                <Plus className="h-4 w-4" />
              </IconButton>
            </div>

            <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-2 pb-2 scrollbar-thin">
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} onOpen={onOpen} />
              ))}
              <AddTaskInline onAdd={(title) => onAdd(title, status)} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
