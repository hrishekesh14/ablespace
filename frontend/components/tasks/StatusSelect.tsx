"use client";

import { useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import type { TaskStatus } from "@/types";
import { STATUS_LABEL, STATUS_ORDER } from "@/constants/theme";
import { Popover } from "@/components/ui/Popover";

const STATUS_DOT: Record<TaskStatus, string> = {
  todo: "bg-ink-faint",
  doing: "bg-amber-500",
  completed: "bg-emerald-500",
  "on-hold": "bg-red-400",
};

export function StatusSelect({ value, onChange }: { value: TaskStatus; onChange: (status: TaskStatus) => void }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-sm text-ink hover:bg-surface-subtle"
      >
        <span className={`h-2 w-2 rounded-full ${STATUS_DOT[value]}`} />
        {STATUS_LABEL[value]}
        <ChevronDown className="h-3 w-3 text-ink-faint" />
      </button>
      <Popover open={open} onClose={() => setOpen(false)} anchorRef={triggerRef} className="w-[150px]">
        {STATUS_ORDER.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => {
              onChange(status);
              setOpen(false);
            }}
            className="flex w-full items-center justify-between px-3 py-1.5 text-left text-sm hover:bg-surface-subtle"
          >
            <span className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${STATUS_DOT[status]}`} />
              {STATUS_LABEL[status]}
            </span>
            {value === status && <Check className="h-3.5 w-3.5 text-accent" />}
          </button>
        ))}
      </Popover>
    </div>
  );
}
