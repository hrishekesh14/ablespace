"use client";

import { useRef, useState } from "react";
import { Check } from "lucide-react";
import { Popover } from "@/components/ui/Popover";
import { Avatar } from "@/components/ui/Avatar";
import { MOCK_USERS, getUserById } from "@/lib/mock/users";

interface MemberSelectProps {
  memberIds: string[];
  onChange: (memberIds: string[]) => void;
  multiple?: boolean;
}

export function MemberSelect({ memberIds, onChange, multiple = true }: MemberSelectProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function toggle(id: string) {
    if (!multiple) {
      onChange([id]);
      setOpen(false);
      return;
    }
    onChange(memberIds.includes(id) ? memberIds.filter((m) => m !== id) : [...memberIds, id]);
  }

  return (
    <div className="relative inline-flex">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center -space-x-1.5 rounded-md p-0.5 hover:bg-surface-subtle"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Assign members"
      >
        {memberIds.length === 0 && <Avatar size="sm" />}
        {memberIds.slice(0, 3).map((id) => (
          <Avatar key={id} user={getUserById(id)} size="sm" ring />
        ))}
      </button>
      <Popover open={open} onClose={() => setOpen(false)} anchorRef={triggerRef} className="w-[200px]">
        {MOCK_USERS.map((user) => (
          <button
            key={user.id}
            type="button"
            onClick={() => toggle(user.id)}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm hover:bg-surface-subtle"
          >
            <Avatar user={user} size="sm" />
            <span className="flex-1 truncate">{user.name}</span>
            {memberIds.includes(user.id) && <Check className="h-3.5 w-3.5 text-accent" />}
          </button>
        ))}
      </Popover>
    </div>
  );
}
