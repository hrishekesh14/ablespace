"use client";

import { useCallback, useEffect, useState } from "react";
import type { Task, TaskStatus } from "@/types";
import { createTask, deleteTask, fetchTasks, updateTask } from "@/lib/api/tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchTasks().then((data) => {
      if (active) {
        setTasks(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const addTask = useCallback(async (title: string, status: TaskStatus) => {
    const task = await createTask({ title, status });
    setTasks((prev) => [...prev, task]);
    return task;
  }, []);

  const patchTask = useCallback(async (id: string, patch: Partial<Task>) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...patch } : task)));
    await updateTask(id, patch);
  }, []);

  const removeTask = useCallback(async (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    await deleteTask(id);
  }, []);

  return { tasks, loading, addTask, patchTask, removeTask };
}
