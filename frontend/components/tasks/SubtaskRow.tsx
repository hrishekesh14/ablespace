"use client";

import { Trash2 } from "lucide-react";
import type { Subtask } from "@/types";
import { PrioritySelect } from "@/components/tasks/PrioritySelect";
import { MemberSelect } from "@/components/tasks/MemberSelect";
import { DatePicker } from "@/components/ui/DatePicker";
import { IconButton } from "@/components/ui/IconButton";

interface SubtaskRowProps {
  subtask: Subtask;
  onPatch: (patch: Partial<Subtask>) => void;
  onDelete: () => void;
}

export function SubtaskRow({ subtask, onPatch, onDelete }: SubtaskRowProps) {
  return (
    <div className="group grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-3 border-b border-border-subtle py-1.5 text-sm">
      <span className="min-w-0 truncate text-ink">{subtask.title}</span>
      <PrioritySelect value={subtask.priority} onChange={(priority) => onPatch({ priority })} compact />
      <MemberSelect
        memberIds={subtask.memberId ? [subtask.memberId] : []}
        onChange={(ids) => onPatch({ memberId: ids[0] })}
        multiple={false}
      />
      <DatePicker value={subtask.dueDate} onChange={(dueDate) => onPatch({ dueDate })} />
      <IconButton
        aria-label="Delete subtask"
        size="sm"
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </IconButton>
    </div>
  );
}
