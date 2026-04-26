// src/lib/utils.ts
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function getNow() {
  const now = new Date();
  return now.toLocaleString();
}