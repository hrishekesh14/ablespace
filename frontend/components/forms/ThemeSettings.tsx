"use client";

import { Check, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export function ThemeSettings() {
  const { mode, setMode } = useTheme();

  const options = [
    { id: "light" as const, label: "Light", icon: Sun },
    { id: "dark" as const, label: "Dark", icon: Moon },
  ];

  return (
    <div className="mx-auto w-full max-w-[520px] px-6 py-8">
      <h1 className="mb-6 text-lg font-semibold text-ink">Theme</h1>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const Icon = option.icon;
          const active = mode === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setMode(option.id)}
              className={cn(
                "relative flex flex-col items-center gap-2 rounded-xl border p-6 transition-colors",
                active ? "border-accent bg-accent-soft" : "border-border bg-surface hover:bg-surface-subtle"
              )}
            >
              {active && <Check className="absolute right-3 top-3 h-4 w-4 text-accent" />}
              <Icon className="h-6 w-6 text-ink" />
              <span className="text-sm font-medium text-ink">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
