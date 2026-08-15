"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { WORKSPACE_NAV } from "@/constants/nav";
import { WorkspaceMenu } from "@/components/layout/WorkspaceMenu";
import { cn } from "@/lib/utils";

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-sidebar shrink-0 flex-col border-r border-border bg-surface",
        className
      )}
    >
      <div className="border-b border-border p-2">
        <WorkspaceMenu />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-2 py-3">
        <div className="mb-1 flex items-center justify-between px-2 py-1">
          <span className="text-xs font-medium text-ink-faint">Workspace</span>
          <ChevronDown className="h-3.5 w-3.5 text-ink-faint" />
        </div>
        <nav className="space-y-0.5">
          {WORKSPACE_NAV.map((item) => {
            const active = pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent-soft text-accent"
                    : "text-ink-muted hover:bg-surface-subtle hover:text-ink"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}