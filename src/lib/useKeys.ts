// src/lib/useKeys.ts
import { generateId } from "./utils";

type KeyItem = {
  id: string;
  type: "temporary" | "onetime";
  expiresAt: string;
  used: boolean;
};

const STORAGE_KEY = "keylock_keys";

function loadKeys(): KeyItem[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

function saveKeys(keys: KeyItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
}

export function createTempKey(minutes: number) {
  const keys = loadKeys();

  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + minutes);

  const key: KeyItem = {
    id: generateId(),
    type: "temporary",
    expiresAt: expires.toISOString(),
    used: false
  };

  keys.unshift(key);
  saveKeys(keys);

  return key;
}

export function createOneTimeKey() {
  const keys = loadKeys();

  const key: KeyItem = {
    id: generateId(),
    type: "onetime",
    expiresAt: "1回のみ",
    used: false
  };

  keys.unshift(key);
  saveKeys(keys);

  return key;
}

export function validateKey(id: string) {
  const keys = loadKeys();
  const key = keys.find((k) => k.id === id);

  if (!key) return { ok: false, reason: "無効なキー" };
  if (key.used) return { ok: false, reason: "すでに使用済み" };

  if (key.type === "temporary") {
    const now = new Date();
    const expires = new Date(key.expiresAt);

    if (expires.getTime() < now.getTime()) {
      return { ok: false, reason: "期限切れのキー" };
    }
  }

  return { ok: true, key };
}

export function useKey(id: string) {
  const keys = loadKeys();
  const key = keys.find((k) => k.id === id);

  if (key) {
    key.used = true;
    saveKeys(keys);
  }
}