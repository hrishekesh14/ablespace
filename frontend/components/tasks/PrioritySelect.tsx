"use client";

import { useRef, useState } from "react";
import { Check } from "lucide-react";
import type { Priority } from "@/types";
import { PRIORITY_ORDER, PRIORITY_LABEL, PRIORITY_COLOR } from "@/constants/theme";
import { Popover } from "@/components/ui/Popover";
import { PriorityTag } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface PrioritySelectProps {
  value: Priority;
  onChange: (priority: Priority) => void;
  compact?: boolean;
}

export function PrioritySelect({ value, onChange, compact }: PrioritySelectProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "inline-flex items-center rounded-md px-1.5 py-0.5 hover:bg-surface-subtle",
          compact && "px-0"
        )}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <PriorityTag priority={value} />
      </button>
      <Popover open={open} onClose={() => setOpen(false)} anchorRef={triggerRef} className="min-w-[160px]">
        {PRIORITY_ORDER.map((priority) => (
          <button
            key={priority}
            type="button"
            onClick={() => {
              onChange(priority);
              setOpen(false);
            }}
            className="flex w-full items-center justify-between px-3 py-1.5 text-left text-sm hover:bg-surface-subtle"
          >
            <span className={cn("flex items-center gap-2", PRIORITY_COLOR[priority])}>
              {PRIORITY_LABEL[priority]}
            </span>
            {value === priority && <Check className="h-3.5 w-3.5 text-accent" />}
          </button>
        ))}
      </Popover>
    </div>
  );
}
