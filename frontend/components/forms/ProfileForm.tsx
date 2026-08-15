"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { updateProfile } from "@/lib/api/auth";

export function ProfileForm() {
  const { user, updateUser, logout } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState(user?.name ?? "");
  const [title, setTitle] = useState(user?.title ?? "");
  const [username, setUsername] = useState(user?.username ?? "");
  const [saving, setSaving] = useState(false);

  if (!user) return null;

  async function handleSave() {
    setSaving(true);
    const updated = await updateProfile({ name: fullName, title, username });
    updateUser(updated);
    setSaving(false);
  }

  return (
    <div className="mx-auto w-full max-w-[520px] px-6 py-8">
      <h1 className="mb-6 text-lg font-semibold text-ink">Profile</h1>

      <div className="space-y-5 rounded-xl border border-border bg-surface p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink-muted">Profile picture</span>
          <Avatar user={user} size="lg" />
        </div>

        <div className="flex items-center justify-between border-t border-border-subtle pt-4">
          <span className="text-sm text-ink-muted">Email</span>
          <span className="flex items-center gap-1.5 text-sm text-ink">
            {user.email}
            <Pencil className="h-3 w-3 text-ink-faint" />
          </span>
        </div>

        <div className="border-t border-border-subtle pt-4">
          <label htmlFor="fullName" className="text-sm text-ink-muted">
            Full name
          </label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={handleSave}
            className="mt-1.5"
          />
        </div>

        <div>
          <label htmlFor="title" className="text-sm text-ink-muted">
            Title <span className="text-ink-faint">Your job title or role</span>
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSave}
            className="mt-1.5"
          />
        </div>

        <div>
          <label htmlFor="username" className="text-sm text-ink-muted">
            Username <span className="text-ink-faint">One word, like a nickname or first name</span>
          </label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={handleSave}
            className="mt-1.5"
          />
        </div>

        {saving && <p className="text-xs text-ink-faint">Saving...</p>}
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface p-5">
        <h2 className="mb-3 text-sm font-semibold text-ink">Workspace access</h2>
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink-muted">Remove yourself from the workspace</span>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              logout();
              router.push("/login");
            }}
          >
            Leave Workspace
          </Button>
        </div>
      </div>
    </div>
  );
}
