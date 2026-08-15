"use client";

import { Search, Plus } from "lucide-react";
import type { FieldVisibility, ViewMode } from "@/types";
import { FieldsDropdown } from "@/components/tasks/FieldsDropdown";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface TasksToolbarProps {
  title: string;
  search: string;
  onSearchChange: (value: string) => void;
  fields: FieldVisibility;
  onFieldsChange: (fields: FieldVisibility) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onAddTask: () => void;
}

export function TasksToolbar({
  title,
  search,
  onSearchChange,
  fields,
  onFieldsChange,
  viewMode,
  onViewModeChange,
  onAddTask,
}: TasksToolbarProps) {
  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-3">
      <h1 className="text-md font-semibold text-ink">{title}</h1>
      <div className="flex items-center gap-2">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={`Search ${title.toLowerCase()}...`}
            className="h-8 w-[180px] pl-8 text-xs"
          />
        </div>
        <FieldsDropdown
          fields={fields}
          onChange={onFieldsChange}
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
        />
        <Button variant="primary" size="sm" onClick={onAddTask}>
          <Plus className="h-3.5 w-3.5" />
          Add Task
        </Button>
      </div>
    </div>
  );
}
