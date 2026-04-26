export type UserRole = "master" | "family" | "temporary" | "onetime";

export type AppUser = {
  id: string;
  name: string;
  role: UserRole;
  isActive: boolean;
};

export type LockItem = {
  id: string;
  name: string;
  isLocked: boolean;
};

export type AccessLog = {
  id: string;
  userName: string;
  lockName: string;
  action: "lock" | "unlock";
  createdAt: string;
};