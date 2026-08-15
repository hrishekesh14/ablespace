"use client";

import Link from "next/link";
import { ArrowLeft, User, Sun, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

export type SettingsTab = "profile" | "theme" | "color";

const TABS: { id: SettingsTab; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "theme", label: "Theme", icon: Sun },
  { id: "color", label: "Color", icon: Palette },
];

interface SettingsNavProps {
  active: SettingsTab;
  onChange: (tab: SettingsTab) => void;
}

export function SettingsNav({ active, onChange }: SettingsNavProps) {
  return (
    <aside className="flex w-[220px] shrink-0 flex-col border-r border-border bg-surface px-2 py-3">
      <Link
        href="/tasks"
        className="mb-3 flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink-muted hover:bg-surface-subtle hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to app
      </Link>

      <nav className="space-y-0.5">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-sm font-medium transition-colors",
                isActive ? "bg-accent-soft text-accent" : "text-ink-muted hover:bg-surface-subtle hover:text-ink"
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
