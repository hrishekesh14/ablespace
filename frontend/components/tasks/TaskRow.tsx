"use client";

import { useRef, useState } from "react";
import { MoreHorizontal, Trash2 } from "lucide-react";
import type { FieldVisibility, Task } from "@/types";
import { PrioritySelect } from "@/components/tasks/PrioritySelect";
import { MemberSelect } from "@/components/tasks/MemberSelect";
import { DatePicker } from "@/components/ui/DatePicker";
import { LabelChip } from "@/components/ui/Badge";
import { IconButton } from "@/components/ui/IconButton";
import { Popover, PopoverItem } from "@/components/ui/Popover";
import { STATUS_LABEL } from "@/constants/theme";

interface TaskRowProps {
  task: Task;
  fields: FieldVisibility;
  onOpen: (task: Task) => void;
  onPatch: (id: string, patch: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export function TaskRow({ task, fields, onOpen, onPatch, onDelete }: TaskRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="group grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 border-b border-border-subtle px-2 py-2 text-sm hover:bg-surface-subtle">
      <button
        type="button"
        onClick={() => onOpen(task)}
        className="min-w-0 truncate text-left text-ink hover:underline"
      >
        {task.title}
      </button>

      {fields.priority && (
        <div className="w-24">
          <PrioritySelect value={task.priority} onChange={(priority) => onPatch(task.id, { priority })} />
        </div>
      )}

      {fields.members && (
        <div className="w-16">
          <MemberSelect
            memberIds={task.memberIds}
            onChange={(memberIds) => onPatch(task.id, { memberIds })}
          />
        </div>
      )}

      {fields.dueDate && (
        <div className="w-24">
          <DatePicker value={task.dueDate} onChange={(dueDate) => onPatch(task.id, { dueDate })} />
        </div>
      )}

      {fields.labels && (
        <div className="hidden w-32 truncate lg:block">
          {task.labels[0] ? <LabelChip>{task.labels[0]}</LabelChip> : null}
        </div>
      )}

      {fields.status && (
        <div className="hidden w-20 text-xs text-ink-muted lg:block">{STATUS_LABEL[task.status]}</div>
      )}

      <div className="relative flex justify-end">
        <IconButton
          ref={menuTriggerRef}
          aria-label="Task actions"
          size="sm"
          onClick={() => setMenuOpen((p) => !p)}
          className="opacity-0 group-hover:opacity-100"
        >
          <MoreHorizontal className="h-4 w-4" />
        </IconButton>
        <Popover open={menuOpen} onClose={() => setMenuOpen(false)} anchorRef={menuTriggerRef} align="right" className="w-[140px]">
          <PopoverItem danger icon={<Trash2 className="h-3.5 w-3.5" />} onClick={() => { setMenuOpen(false); onDelete(task.id); }}>
            Delete
          </PopoverItem>
        </Popover>
      </div>
    </div>
  );
}
