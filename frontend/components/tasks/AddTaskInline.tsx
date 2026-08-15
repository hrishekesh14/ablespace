"use client";

import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddTaskInlineProps {
  onAdd: (title: string) => void;
  label?: string;
  className?: string;
}

export function AddTaskInline({ onAdd, label = "Add Task", className }: AddTaskInlineProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (trimmed) onAdd(trimmed);
    setTitle("");
    setEditing(false);
  }

  if (editing) {
    return (
      <form onSubmit={submit} className={cn("px-2 py-1", className)}>
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={submit}
          onKeyDown={(e) => e.key === "Escape" && setEditing(false)}
          placeholder="Task title"
          className="h-8 w-full rounded-md border border-accent bg-surface px-2 text-sm text-ink focus:outline-none"
        />
      </form>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      className={cn(
        "flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-xs font-medium text-ink-faint hover:bg-surface-subtle hover:text-ink-muted",
        className
      )}
    >
      <Plus className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
