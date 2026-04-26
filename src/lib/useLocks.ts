// src/lib/useLocks.ts
let isLocked = true;

export function getLockState() {
  return isLocked;
}

export function lock() {
  isLocked = true;
}

export function unlock() {
  isLocked = false;
}