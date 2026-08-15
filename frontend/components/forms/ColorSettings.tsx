"use client";

import { Check } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { ACCENT_COLORS } from "@/constants/theme";
import { cn } from "@/lib/utils";

export function ColorSettings() {
  const { accent, setAccent } = useTheme();

  return (
    <div className="mx-auto w-full max-w-[520px] px-6 py-8">
      <h1 className="mb-6 text-lg font-semibold text-ink">Color</h1>
      <div className="grid grid-cols-3 gap-3">
        {ACCENT_COLORS.map((color) => {
          const active = accent === color.id;
          return (
            <button
              key={color.id}
              type="button"
              onClick={() => setAccent(color.id)}
              className={cn(
                "relative flex flex-col items-center gap-2 rounded-xl border p-5 transition-colors",
                active ? "border-accent bg-accent-soft" : "border-border bg-surface hover:bg-surface-subtle"
              )}
            >
              {active && <Check className="absolute right-3 top-3 h-4 w-4 text-accent" />}
              <span className="h-6 w-6 rounded-full" style={{ backgroundColor: color.hex }} />
              <span className="text-sm font-medium text-ink">{color.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
