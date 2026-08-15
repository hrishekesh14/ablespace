"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { Popover } from "@/components/ui/Popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value?: string;
  onChange: (iso: string) => void;
  label?: string;
  placeholder?: string;
}

function buildMonthGrid(year: number, month: number): (number | null)[] {
  const first = new Date(year, month, 1);
  const startOffset = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(startOffset).fill(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function DatePicker({ value, onChange, label, placeholder = "Set date" }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const selected = value ? new Date(value) : undefined;
  const [cursor, setCursor] = useState(() => selected ?? new Date());
  const triggerRef = useRef<HTMLButtonElement>(null);

  const cells = buildMonthGrid(cursor.getFullYear(), cursor.getMonth());

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-xs text-ink-muted hover:bg-surface-subtle"
      >
        <CalendarDays className="h-3.5 w-3.5" />
        {value ? new Date(value).toLocaleDateString("en-US", { day: "2-digit", month: "short" }) : placeholder}
      </button>
      <Popover open={open} onClose={() => setOpen(false)} anchorRef={triggerRef} className="w-[260px] p-3">
        {label && <p className="mb-2 text-xs font-medium text-ink-faint">{label}</p>}
        <div className="mb-2 flex items-center justify-between">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
            className="rounded p-1 hover:bg-surface-subtle"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium">
            {MONTH_NAMES[cursor.getMonth()]} {cursor.getFullYear()}
          </span>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
            className="rounded p-1 hover:bg-surface-subtle"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-y-1 text-center text-[11px] text-ink-faint">
          {WEEKDAYS.map((day) => (
            <span key={day}>{day}</span>
          ))}
          {cells.map((day, idx) => {
            const isSelected =
              !!day &&
              !!selected &&
              selected.getDate() === day &&
              selected.getMonth() === cursor.getMonth() &&
              selected.getFullYear() === cursor.getFullYear();
            return (
              <button
                key={idx}
                type="button"
                disabled={!day}
                onClick={() => {
                  if (!day) return;
                  const iso = new Date(cursor.getFullYear(), cursor.getMonth(), day).toISOString();
                  onChange(iso);
                  setOpen(false);
                }}
                className={cn(
                  "mx-auto flex h-7 w-7 items-center justify-center rounded-full text-xs text-ink hover:bg-surface-subtle disabled:cursor-default",
                  isSelected && "bg-accent text-accent-fg hover:bg-accent"
                )}
              >
                {day ?? ""}
              </button>
            );
          })}
        </div>
      </Popover>
    </div>
  );
}
