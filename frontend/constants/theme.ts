import type { AccentColor, Priority, TaskStatus } from "@/types";

export const ACCENT_COLORS: { id: AccentColor; label: string; hex: string }[] = [
  { id: "amber", label: "Amber", hex: "#F59E0B" },
  { id: "blue", label: "Blue", hex: "#3B82F6" },
  { id: "pink", label: "Pink", hex: "#EC4899" },
  { id: "rose", label: "Rose", hex: "#F43F5E" },
  { id: "emerald", label: "Emerald", hex: "#10B981" },
  { id: "black", label: "Black", hex: "#18181B" },
];

export const PRIORITY_LABEL: Record<Priority, string> = {
  "no-priority": "No Priority",
  urgent: "Urgent",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export const PRIORITY_ORDER: Priority[] = ["no-priority", "urgent", "high", "medium", "low"];

export const PRIORITY_COLOR: Record<Priority, string> = {
  "no-priority": "text-ink-faint",
  urgent: "text-red-600",
  high: "text-red-500",
  medium: "text-amber-500",
  low: "text-ink-muted",
};

export const STATUS_LABEL: Record<TaskStatus, string> = {
  todo: "To Do",
  doing: "Doing",
  completed: "Completed",
  "on-hold": "On Hold",
};

export const STATUS_ORDER: TaskStatus[] = ["todo", "doing", "completed", "on-hold"];

export const THEME_STORAGE_KEY = "ablespace:theme-mode";
export const ACCENT_STORAGE_KEY = "ablespace:accent-color";
export const AUTH_STORAGE_KEY = "ablespace:auth-user";
