"use client";

import { useMemo, useState } from "react";
import type { FieldVisibility, Task, TaskStatus, ViewMode } from "@/types";
import { useTasks } from "@/hooks/useTasks";
import { TasksToolbar } from "@/components/tasks/TasksToolbar";
import { TaskListView } from "@/components/tasks/TaskListView";
import { TaskBoardView } from "@/components/tasks/TaskBoardView";
import { TaskDetailPanel } from "@/components/tasks/TaskDetailPanel";
import { DEFAULT_FIELDS } from "@/components/tasks/FieldsDropdown";

export default function TasksPage() {
  const { tasks, loading, addTask, patchTask, removeTask } = useTasks();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [fields, setFields] = useState<FieldVisibility>(DEFAULT_FIELDS);
  const [search, setSearch] = useState("");
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const filteredTasks = useMemo(() => {
    if (!search.trim()) return tasks;
    const query = search.trim().toLowerCase();
    return tasks.filter((task) => task.title.toLowerCase().includes(query));
  }, [tasks, search]);

  const activeTask = tasks.find((task) => task.id === activeTaskId) ?? null;

  function handleAdd(title: string, status: TaskStatus) {
    void addTask(title, status);
  }

  return (
    <div className="flex h-full flex-col">
      <TasksToolbar
        title="Tasks"
        search={search}
        onSearchChange={setSearch}
        fields={fields}
        onFieldsChange={setFields}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddTask={() => handleAdd("New task", "todo")}
      />

      {loading ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-accent" />
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-1 px-4 text-center">
          <p className="text-sm font-medium text-ink">No tasks found</p>
          <p className="text-xs text-ink-faint">Try a different search or add a new task.</p>
        </div>
      ) : viewMode === "list" ? (
        <TaskListView
          tasks={filteredTasks}
          fields={fields}
          onOpen={(task: Task) => setActiveTaskId(task.id)}
          onPatch={patchTask}
          onDelete={removeTask}
          onAdd={handleAdd}
        />
      ) : (
        <TaskBoardView tasks={filteredTasks} onOpen={(task) => setActiveTaskId(task.id)} onAdd={handleAdd} />
      )}

      {activeTask && (
        <TaskDetailPanel
          task={activeTask}
          onClose={() => setActiveTaskId(null)}
          onPatch={(patch) => patchTask(activeTask.id, patch)}
        />
      )}
    </div>
  );
}
