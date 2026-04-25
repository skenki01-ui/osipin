import type { BodyValue, ConcernValue, MoodValue } from "../data/results";

export type HikiyoseState = {
  mood: MoodValue;
  body: BodyValue;
  concern: ConcernValue;
  resultId: string;
};

export type ChatPackageState = {
  purchased: boolean;
  roomId: string;
  remainingTurns: number;
};

const HIKIYOSE_STATE_KEY = "hikiyose_state";
const HIKIYOSE_DAILY_KEY = "hikiyose_daily_usage";
const CHAT_PACKAGE_KEY = "hikiyose_chat_package";

function getTodayKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = `${now.getMonth() + 1}`.padStart(2, "0");
  const d = `${now.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function saveHikiyoseState(state: HikiyoseState): void {
  localStorage.setItem(HIKIYOSE_STATE_KEY, JSON.stringify(state));
}

export function getHikiyoseState(): HikiyoseState | null {
  const raw = localStorage.getItem(HIKIYOSE_STATE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as HikiyoseState;
  } catch {
    return null;
  }
}

export function clearHikiyoseState(): void {
  localStorage.removeItem(HIKIYOSE_STATE_KEY);
}

export function canUseFreeHikiyoseToday(): boolean {
  const raw = localStorage.getItem(HIKIYOSE_DAILY_KEY);
  if (!raw) return true;

  try {
    const parsed = JSON.parse(raw) as { date: string; used: boolean };
    return !(parsed.date === getTodayKey() && parsed.used);
  } catch {
    return true;
  }
}

export function markHikiyoseUsedToday(): void {
  localStorage.setItem(
    HIKIYOSE_DAILY_KEY,
    JSON.stringify({
      date: getTodayKey(),
      used: true,
    })
  );
}

export function saveChatPackage(data: ChatPackageState): void {
  localStorage.setItem(CHAT_PACKAGE_KEY, JSON.stringify(data));
}

export function getChatPackage(): ChatPackageState | null {
  const raw = localStorage.getItem(CHAT_PACKAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ChatPackageState;
  } catch {
    return null;
  }
}

export function clearChatPackage(): void {
  localStorage.removeItem(CHAT_PACKAGE_KEY);
}