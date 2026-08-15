"use client";

import { useCallback, useEffect, useState } from "react";
import type { Project } from "@/types";
import { createProject, fetchProjects, updateProject } from "@/lib/api/projects";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchProjects().then((data) => {
      if (active) {
        setProjects(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const addProject = useCallback(async (name: string) => {
    const project = await createProject(name);
    setProjects((prev) => [...prev, project]);
    return project;
  }, []);

  const patchProject = useCallback(async (id: string, patch: Partial<Project>) => {
    setProjects((prev) => prev.map((project) => (project.id === id ? { ...project, ...patch } : project)));
    await updateProject(id, patch);
  }, []);

  return { projects, loading, addProject, patchProject };
}
