import { cn } from "@/lib/utils";
import type { User } from "@/types";

const SIZES = {
  xs: "h-5 w-5 text-[10px]",
  sm: "h-6 w-6 text-[11px]",
  md: "h-8 w-8 text-xs",
  lg: "h-11 w-11 text-sm",
} as const;

interface AvatarProps {
  user?: User;
  size?: keyof typeof SIZES;
  className?: string;
  ring?: boolean;
}

export function Avatar({ user, size = "sm", className, ring }: AvatarProps) {
  if (!user) {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full border border-dashed border-border text-ink-faint",
          SIZES[size],
          className
        )}
        aria-hidden="true"
      >
        +
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white",
        SIZES[size],
        ring && "ring-2 ring-surface",
        className
      )}
      style={{ backgroundColor: user.avatarColor }}
      title={user.name}
    >
      {user.initials}
    </span>
  );
}
