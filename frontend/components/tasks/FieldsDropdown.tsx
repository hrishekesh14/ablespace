"use client";

import { useRef, useState } from "react";
import { SlidersHorizontal, List, LayoutGrid } from "lucide-react";
import { Popover, PopoverDivider, PopoverLabel } from "@/components/ui/Popover";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { FieldVisibility, ViewMode } from "@/types";

const FIELD_LABELS: { key: keyof FieldVisibility; label: string }[] = [
  { key: "priority", label: "Priority" },
  { key: "members", label: "Members" },
  { key: "dueDate", label: "Due Date" },
  { key: "labels", label: "Labels" },
  { key: "status", label: "Status" },
  { key: "reporter", label: "Reporter" },
];

interface FieldsDropdownProps {
  fields: FieldVisibility;
  onChange: (fields: FieldVisibility) => void;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
}

export function FieldsDropdown({ fields, onChange, viewMode, onViewModeChange }: FieldsDropdownProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative">
      <Button ref={triggerRef} variant="secondary" size="sm" onClick={() => setOpen((p) => !p)}>
        <SlidersHorizontal className="h-3.5 w-3.5" />
        Fields
      </Button>
      <Popover open={open} onClose={() => setOpen(false)} anchorRef={triggerRef} align="right" className="w-[190px] py-2">
        {viewMode && onViewModeChange && (
          <>
            <div className="mx-3 mb-2 flex rounded-md border border-border p-0.5">
              <button
                type="button"
                onClick={() => onViewModeChange("list")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1 rounded px-2 py-1 text-xs font-medium",
                  viewMode === "list" ? "bg-surface-subtle text-ink" : "text-ink-faint"
                )}
              >
                <List className="h-3 w-3" /> List
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange("board")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1 rounded px-2 py-1 text-xs font-medium",
                  viewMode === "board" ? "bg-surface-subtle text-ink" : "text-ink-faint"
                )}
              >
                <LayoutGrid className="h-3 w-3" /> Board
              </button>
            </div>
            <PopoverDivider />
          </>
        )}
        <PopoverLabel>Visible Fields</PopoverLabel>
        <div className="space-y-1.5 px-3 py-1.5">
          {FIELD_LABELS.map(({ key, label }) => (
            <Checkbox
              key={key}
              id={`field-${key}`}
              label={label}
              checked={fields[key]}
              onChange={(checked) => onChange({ ...fields, [key]: checked })}
            />
          ))}
        </div>
      </Popover>
    </div>
  );
}

export const DEFAULT_FIELDS: FieldVisibility = {
  priority: true,
  members: true,
  dueDate: true,
  labels: false,
  status: false,
  reporter: false,
};
