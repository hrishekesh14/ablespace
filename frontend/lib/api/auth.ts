import type { User } from "@/types";
import { MOCK_MODE, request, withLatency } from "./client";
import { MOCK_USERS, CURRENT_USER_ID } from "@/lib/mock/users";

export async function loginAsGuest(): Promise<User> {
  const guest: User = {
    id: "guest",
    name: "Guest",
    email: "guest@ablespace.io",
    avatarColor: "#71717A",
    initials: "G",
  };
  if (MOCK_MODE) return withLatency(guest, 400);
  return request<User>("/auth/guest", { method: "POST" });
}

export async function loginWithGoogle(): Promise<User> {
  const user = MOCK_USERS.find((u) => u.id === CURRENT_USER_ID) ?? MOCK_USERS[0]!;
  if (MOCK_MODE) return withLatency(user, 400);
  return request<User>("/auth/google", { method: "POST" });
}

export async function updateProfile(patch: Partial<User>): Promise<User> {
  const base = MOCK_USERS.find((u) => u.id === CURRENT_USER_ID) ?? MOCK_USERS[0]!;
  const merged = { ...base, ...patch };
  if (MOCK_MODE) return withLatency(merged, 300);
  return request<User>("/auth/profile", { method: "PATCH", body: JSON.stringify(patch) });
}
