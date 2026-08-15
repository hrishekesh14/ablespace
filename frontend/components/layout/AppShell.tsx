"use client";

import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-surface-subtle">
      {/* Desktop sidebar */}
      <Sidebar className="hidden md:flex" />

      {/* Mobile sidebar drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileNavOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-50 h-full w-[260px] animate-in">
            <Sidebar className="flex h-full" />
            <IconButton
              aria-label="Close navigation"
              onClick={() => setMobileNavOpen(false)}
              className="absolute right-2 top-2 bg-surface"
            >
              <X className="h-4 w-4" />
            </IconButton>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border bg-surface px-3 md:hidden">
          <IconButton aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}>
            <Menu className="h-5 w-5" />
          </IconButton>
          <span className="text-sm font-semibold">AbleSpace</span>
        </header>
        <main className={cn("flex min-h-0 flex-1 flex-col overflow-hidden")}>{children}</main>
      </div>
    </div>
  );
}
