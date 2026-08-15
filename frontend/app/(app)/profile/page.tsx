"use client";

import { useState } from "react";
import { SettingsNav, type SettingsTab } from "@/components/layout/SettingsNav";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { ThemeSettings } from "@/components/forms/ThemeSettings";
import { ColorSettings } from "@/components/forms/ColorSettings";

export default function ProfilePage() {
  const [tab, setTab] = useState<SettingsTab>("profile");

  return (
    <div className="flex h-full w-full overflow-hidden">
      <SettingsNav active={tab} onChange={setTab} />
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {tab === "profile" && <ProfileForm />}
        {tab === "theme" && <ThemeSettings />}
        {tab === "color" && <ColorSettings />}
      </div>
    </div>
  );
}
