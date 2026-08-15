"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { FieldVisibility, Task, TaskStatus } from "@/types";
import { STATUS_LABEL, STATUS_ORDER } from "@/constants/theme";
import { TaskRow } from "@/components/tasks/TaskRow";
import { AddTaskInline } from "@/components/tasks/AddTaskInline";
import { cn } from "@/lib/utils";

interface TaskListViewProps {
  tasks: Task[];
  fields: FieldVisibility;
  onOpen: (task: Task) => void;
  onPatch: (id: string, patch: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onAdd: (title: string, status: TaskStatus) => void;
}

export function TaskListView({ tasks, fields, onOpen, onPatch, onDelete, onAdd }: TaskListViewProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin px-4 pb-6">
      {STATUS_ORDER.map((status) => {
        const groupTasks = tasks.filter((task) => task.status === status);
        const isCollapsed = collapsed[status];

        return (
          <div key={status} className="mb-1">
            <button
              type="button"
              onClick={() => setCollapsed((prev) => ({ ...prev, [status]: !prev[status] }))}
              className="flex w-full items-center gap-1.5 py-2 text-left"
            >
              {isCollapsed ? (
                <ChevronRight className="h-3.5 w-3.5 text-ink-faint" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 text-ink-faint" />
              )}
              <span className="text-sm font-semibold text-ink">{STATUS_LABEL[status]}</span>
              <span className="text-xs text-ink-faint">{groupTasks.length}</span>
            </button>

            {!isCollapsed && (
              <div className={cn("rounded-md border border-border-subtle")}>
                <div className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 border-b border-border-subtle bg-surface-subtle px-2 py-1.5 text-xs font-medium text-ink-faint">
                  <span>Task</span>
                  {fields.priority && <span className="w-24">Priority</span>}
                  {fields.members && <span className="w-16">Members</span>}
                  {fields.dueDate && <span className="w-24">Due Date</span>}
                  {fields.labels && <span className="hidden w-32 lg:block">Labels</span>}
                  {fields.status && <span className="hidden w-20 lg:block">Status</span>}
                  <span className="w-8">Actions</span>
                </div>

                {groupTasks.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    fields={fields}
                    onOpen={onOpen}
                    onPatch={onPatch}
                    onDelete={onDelete}
                  />
                ))}

                <AddTaskInline onAdd={(title) => onAdd(title, status)} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}