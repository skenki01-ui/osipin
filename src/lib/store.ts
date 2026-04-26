// src/lib/store.ts
import { AppUser, AccessLog } from "./types";

export const store = {
  users: [
    { id: "1", name: "山田太郎", role: "master", isActive: true },
    { id: "2", name: "佐藤花子", role: "family", isActive: true },
    { id: "3", name: "清掃業者", role: "temporary", isActive: true }
  ] as AppUser[],

  logs: [] as AccessLog[]
};