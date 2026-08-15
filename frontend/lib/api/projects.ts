import type { Project } from "@/types";
import { MOCK_MODE, request, withLatency } from "./client";
import { MOCK_PROJECTS } from "@/lib/mock/projects";

let store: Project[] = MOCK_PROJECTS.map((project) => ({ ...project }));

export async function fetchProjects(): Promise<Project[]> {
  if (MOCK_MODE) return withLatency(store.map((project) => ({ ...project })));
  return request<Project[]>("/projects");
}

export async function createProject(name: string): Promise<Project> {
  if (MOCK_MODE) {
    const project: Project = { id: `proj-${Date.now()}`, name, priority: "no-priority" };
    store = [...store, project];
    return withLatency(project);
  }
  return request<Project>("/projects", { method: "POST", body: JSON.stringify({ name }) });
}

export async function updateProject(id: string, patch: Partial<Project>): Promise<Project> {
  if (MOCK_MODE) {
    store = store.map((project) => (project.id === id ? { ...project, ...patch } : project));
    const updated = store.find((project) => project.id === id);
    if (!updated) throw new Error("Project not found");
    return withLatency(updated);
  }
  return request<Project>(`/projects/${id}`, { method: "PATCH", body: JSON.stringify(patch) });
}
