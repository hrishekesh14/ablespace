import { SignalHigh, SignalMedium, SignalLow, Minus, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Priority } from "@/types";
import { PRIORITY_COLOR, PRIORITY_LABEL } from "@/constants/theme";

const PRIORITY_ICON: Record<Priority, typeof SignalHigh> = {
  "no-priority": Minus,
  urgent: TriangleAlert,
  high: SignalHigh,
  medium: SignalMedium,
  low: SignalLow,
};

export function PriorityTag({ priority, className }: { priority: Priority; className?: string }) {
  const Icon = PRIORITY_ICON[priority];
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs font-medium", PRIORITY_COLOR[priority], className)}>
      <Icon className="h-3.5 w-3.5" />
      {PRIORITY_LABEL[priority]}
    </span>
  );
}

export function LabelChip({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-subtle px-2 py-0.5 text-xs text-ink-muted">
      {children}
    </span>
  );
}
