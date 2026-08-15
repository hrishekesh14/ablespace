import type { LucideIcon } from "lucide-react";
import { KanbanSquare, FolderKanban } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const WORKSPACE_NAV: NavItem[] = [
  { label: "Tasks", href: "/tasks", icon: KanbanSquare },
  { label: "Projects", href: "/projects", icon: FolderKanban },
];
