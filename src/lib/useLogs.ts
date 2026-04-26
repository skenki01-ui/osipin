// src/lib/useLogs.ts
import { store } from "./store";
import { AccessLog } from "./types";

export function addLog(log: AccessLog) {
  store.logs.unshift(log);
}

export function getLogs(): AccessLog[] {
  return store.logs;
}