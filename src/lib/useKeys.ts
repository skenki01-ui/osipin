// src/lib/useKeys.ts
import { generateId } from "./utils";

type KeyItem = {
  id: string;
  type: "temporary" | "onetime";
  expiresAt: string;
  used: boolean;
};

let keys: KeyItem[] = [];

export function createTempKey(minutes: number) {
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + minutes);

  const key: KeyItem = {
    id: generateId(),
    type: "temporary",
    expiresAt: expires.toLocaleString(),
    used: false
  };

  keys.unshift(key);
  return key;
}

export function createOneTimeKey() {
  const key: KeyItem = {
    id: generateId(),
    type: "onetime",
    expiresAt: "1回のみ",
    used: false
  };

  keys.unshift(key);
  return key;
}

export function validateKey(id: string) {
  const key = keys.find((k) => k.id === id);

  if (!key) return { ok: false, reason: "無効なキー" };
  if (key.used) return { ok: false, reason: "すでに使用済み" };

  return { ok: true, key };
}

export function useKey(id: string) {
  const key = keys.find((k) => k.id === id);
  if (key) {
    key.used = true;
  }
}