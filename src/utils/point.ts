const POINT_KEY = "hikiyose_points";
const INITIAL_POINT = 50;

export function getPoints(): number {
  const raw = localStorage.getItem(POINT_KEY);
  if (!raw) {
    localStorage.setItem(POINT_KEY, `${INITIAL_POINT}`);
    return INITIAL_POINT;
  }

  const point = Number(raw);
  if (Number.isNaN(point)) {
    localStorage.setItem(POINT_KEY, `${INITIAL_POINT}`);
    return INITIAL_POINT;
  }

  return point;
}

export function setPoints(value: number): void {
  localStorage.setItem(POINT_KEY, `${value}`);
}

export function addPoints(value: number): number {
  const next = getPoints() + value;
  setPoints(next);
  return next;
}

export function usePoints(value: number): { ok: true; remaining: number } | { ok: false; remaining: number } {
  const current = getPoints();
  if (current < value) {
    return { ok: false, remaining: current };
  }

  const next = current - value;
  setPoints(next);
  return { ok: true, remaining: next };
}