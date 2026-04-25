export async function usePoint(amount: number): Promise<{ success: boolean }> {
  try {
    const saved = localStorage.getItem("point");
    const current = saved ? Number(saved) : 0;

    if (current < amount) {
      return { success: false };
    }

    const next = current - amount;
    localStorage.setItem("point", String(next));

    return { success: true };
  } catch (e) {
    console.error("ポイント処理エラー:", e);
    return { success: false };
  }
}