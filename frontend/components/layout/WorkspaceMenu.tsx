"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Check, ChevronRight, Sun, Moon, Palette, Settings, LogOut } from "lucide-react";
import { Popover, PopoverItem, PopoverDivider } from "@/components/ui/Popover";
import { Avatar } from "@/components/ui/Avatar";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { ACCENT_COLORS } from "@/constants/theme";
import { cn } from "@/lib/utils";

type Submenu = "theme" | "color" | null;

export function WorkspaceMenu() {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState<Submenu>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { mode, accent, setMode, setAccent } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();

  function close() {
    setOpen(false);
    setSubmenu(null);
  }

  if (!user) return null;

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-surface-subtle"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Avatar user={user} size="sm" />
        <span className="flex-1 truncate text-sm font-medium text-ink">{user.name}</span>
        <ChevronDown className="h-3.5 w-3.5 text-ink-faint" />
      </button>

      <Popover open={open} onClose={close} anchorRef={triggerRef} className="w-[220px] p-1">
        <div className="relative">
          <PopoverItem
            icon={<Sun className="h-4 w-4" />}
            suffix={<ChevronRight className="h-3.5 w-3.5 text-ink-faint" />}
            onClick={() => setSubmenu(submenu === "theme" ? null : "theme")}
          >
            Change Theme
          </PopoverItem>
          {submenu === "theme" && (
            <div className="absolute left-full top-0 ml-1 min-w-[140px] rounded-lg border border-border bg-surface-raised py-1 shadow-popover">
              <PopoverItem
                icon={<Sun className="h-3.5 w-3.5" />}
                suffix={mode === "light" ? <Check className="h-3.5 w-3.5 text-accent" /> : null}
                onClick={() => setMode("light")}
              >
                Light
              </PopoverItem>
              <PopoverItem
                icon={<Moon className="h-3.5 w-3.5" />}
                suffix={mode === "dark" ? <Check className="h-3.5 w-3.5 text-accent" /> : null}
                onClick={() => setMode("dark")}
              >
                Dark
              </PopoverItem>
            </div>
          )}
        </div>

        <div className="relative">
          <PopoverItem
            icon={<Palette className="h-4 w-4" style={{ color: "var(--accent)" }} />}
            suffix={<ChevronRight className="h-3.5 w-3.5 text-ink-faint" />}
            onClick={() => setSubmenu(submenu === "color" ? null : "color")}
          >
            Color Mode
          </PopoverItem>
          {submenu === "color" && (
            <div className="absolute left-full top-0 ml-1 min-w-[140px] rounded-lg border border-border bg-surface-raised py-1 shadow-popover">
              {ACCENT_COLORS.map((c) => (
                <PopoverItem
                  key={c.id}
                  icon={<span className="h-3 w-3 rounded-full" style={{ backgroundColor: c.hex }} />}
                  suffix={accent === c.id ? <Check className="h-3.5 w-3.5 text-accent" /> : null}
                  onClick={() => setAccent(c.id)}
                >
                  {c.label}
                </PopoverItem>
              ))}
            </div>
          )}
        </div>

        <PopoverItem
          icon={<Settings className="h-4 w-4" />}
          onClick={() => {
            close();
            router.push("/profile");
          }}
        >
          Settings
        </PopoverItem>

        <PopoverDivider />

        <PopoverItem
          danger
          icon={<LogOut className="h-4 w-4" />}
          onClick={() => {
            close();
            logout();
            router.push("/login");
          }}
        >
          Log out
        </PopoverItem>
      </Popover>
    </div>
  );
}

export function ThemeQuickToggleIcon({ className }: { className?: string }) {
  return <span className={cn(className)} />;
}
