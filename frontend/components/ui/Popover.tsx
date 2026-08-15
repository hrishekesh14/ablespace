"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface PopoverProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  align?: "left" | "right";
  className?: string;
  anchorRef?: React.RefObject<HTMLElement>;
}

export function Popover({ open, onClose, children, align = "left", className, anchorRef }: PopoverProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const refs = anchorRef ? [panelRef, anchorRef] : [panelRef];
  useOutsideClick(refs, onClose, open);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="menu"
      className={cn(
        "absolute z-50 mt-1 min-w-[180px] animate-in rounded-lg border border-border bg-surface-raised py-1 shadow-popover",
        align === "right" ? "right-0" : "left-0",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PopoverItem({
  children,
  onClick,
  active,
  danger,
  icon,
  suffix,
}: {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  danger?: boolean;
  icon?: ReactNode;
  suffix?: ReactNode;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm transition-colors hover:bg-surface-subtle focus-visible:outline-none focus-visible:bg-surface-subtle",
        active && "text-accent",
        danger ? "text-red-600" : "text-ink"
      )}
    >
      {icon}
      <span className="flex-1">{children}</span>
      {suffix}
    </button>
  );
}

export function PopoverDivider() {
  return <div className="my-1 h-px bg-border-subtle" />;
}

export function PopoverLabel({ children }: { children: ReactNode }) {
  return <div className="px-3 py-1 text-xs font-medium text-ink-faint">{children}</div>;
}
