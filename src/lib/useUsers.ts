// src/lib/useUsers.ts
import { store } from "./store";
import { AppUser } from "./types";

export function getUsers(): AppUser[] {
  return store.users;
}

export function getUserById(id: string): AppUser | undefined {
  return store.users.find((u) => u.id === id);
}

export function updateUser(id: string, data: Partial<AppUser>) {
  const user = store.users.find((u) => u.id === id);
  if (user) {
    Object.assign(user, data);
  }
}