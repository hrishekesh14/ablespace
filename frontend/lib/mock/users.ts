import type { User } from "@/types";

export const MOCK_USERS: User[] = [
  {
    id: "admin",
    name: "Admin",
    email: "admin@ablespace.io",
    avatarColor: "#7C3AED",
    initials: "A",
  },
  {
    id: "dexter",
    name: "Dexter",
    email: "dexter@gmail.com",
    title: "Designer",
    username: "Dexuser",
    avatarColor: "#7C3AED",
    initials: "D",
  },
  {
    id: "cn",
    name: "Chloe Nguyen",
    email: "chloe@ablespace.io",
    avatarColor: "#F59E0B",
    initials: "CN",
  },
  {
    id: "ankit",
    name: "Ankit Dutta",
    email: "ankit@ablespace.io",
    avatarColor: "#7C3AED",
    initials: "AD",
  },
  {
    id: "at",
    name: "Aum Trivedi",
    email: "aum@ablespace.io",
    avatarColor: "#FACC15",
    initials: "AT",
  },
];

export const CURRENT_USER_ID = "dexter";

export function getUserById(id?: string): User | undefined {
  if (!id) return undefined;
  return MOCK_USERS.find((user) => user.id === id);
}