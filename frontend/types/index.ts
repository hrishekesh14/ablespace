export type Priority = "no-priority" | "urgent" | "high" | "medium" | "low";

export type TaskStatus = "todo" | "doing" | "completed" | "on-hold";

export type ThemeMode = "light" | "dark";

export type AccentColor = "amber" | "blue" | "pink" | "rose" | "emerald" | "black";

export interface User {
  id: string;
  name: string;
  email: string;
  title?: string;
  username?: string;
  avatarColor: string;
  initials: string;
}

export interface Label {
  id: string;
  name: string;
}

export interface Subtask {
  id: string;
  title: string;
  priority: Priority;
  memberId?: string;
  dueDate?: string;
}

export interface Comment {
  id: string;
  authorId: string;
  body: string;
  createdAt: string;
}

export interface UpdateLogEntry {
  id: string;
  authorId: string;
  message: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  memberIds: string[];
  dueDate?: string;
  endDate?: string;
  labels: string[];
  role?: string;
  teams?: string[];
  reporterId?: string;
  resources?: string[];
  subtasks: Subtask[];
  comments: Comment[];
  updates: UpdateLogEntry[];
}

export interface Project {
  id: string;
  name: string;
  priority: Priority;
  leadId?: string;
  dueDate?: string;
}

export type FieldKey = "priority" | "members" | "dueDate" | "labels" | "status" | "reporter";

export interface FieldVisibility {
  priority: boolean;
  members: boolean;
  dueDate: boolean;
  labels: boolean;
  status: boolean;
  reporter: boolean;
}

export type ViewMode = "list" | "board";