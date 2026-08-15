import type { Project } from "@/types";

export const MOCK_PROJECTS: Project[] = [
  { id: "proj-1", name: "Design Homepage", priority: "high", leadId: "admin", dueDate: "2026-09-12" },
  { id: "proj-2", name: "Develop Login Feature", priority: "low", leadId: "cn", dueDate: "2026-09-15" },
  { id: "proj-3", name: "Test Payment Gateway", priority: "medium", dueDate: "2026-09-18" },
];
