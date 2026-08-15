import type { Task, TaskStatus } from "@/types";
import { MOCK_MODE, request, withLatency } from "./client";
import { MOCK_TASKS } from "@/lib/mock/tasks";

let store: Task[] = MOCK_TASKS.map((task) => ({ ...task }));

export async function fetchTasks(): Promise<Task[]> {
  if (MOCK_MODE) return withLatency(store.map((task) => ({ ...task })));
  return request<Task[]>("/tasks");
}

export async function createTask(input: {
  title: string;
  status: TaskStatus;
}): Promise<Task> {
  if (MOCK_MODE) {
    const task: Task = {
      id: `task-${Date.now()}`,
      title: input.title,
      status: input.status,
      priority: "no-priority",
      memberIds: [],
      labels: [],
      subtasks: [],
      comments: [],
      updates: [],
    };
    store = [...store, task];
    return withLatency(task);
  }
  return request<Task>("/tasks", { method: "POST", body: JSON.stringify(input) });
}

export async function updateTask(id: string, patch: Partial<Task>): Promise<Task> {
  if (MOCK_MODE) {
    store = store.map((task) => (task.id === id ? { ...task, ...patch } : task));
    const updated = store.find((task) => task.id === id);
    if (!updated) throw new Error("Task not found");
    return withLatency(updated);
  }
  return request<Task>(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(patch) });
}

export async function deleteTask(id: string): Promise<void> {
  if (MOCK_MODE) {
    store = store.filter((task) => task.id !== id);
    return withLatency(undefined);
  }
  await request<void>(`/tasks/${id}`, { method: "DELETE" });
}
