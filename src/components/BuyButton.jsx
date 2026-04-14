import React from "react";
import Payjp from "@payjp/payjs";

export default function PayButton() {
  const publicKey = import.meta.env.VITE_PAYJP_PUBLIC_KEY;

  async function handlePay() {
    if (!publicKey) {
      alert("PAY.JPの公開鍵が設定されていません");
      return;
    }

    const payjp = Payjp(publicKey);

    const mountTarget = document.getElementById("card-element");
    if (!mountTarget) {
      alert("カード入力欄が見つかりません");
      return;
    }

    mountTarget.innerHTML = "";

    const elements = payjp.elements();
    const card = elements.create("card");

    card.mount("#card-element");

    const { token, error } = await payjp.createToken(card);

    if (error) {
      alert(error.message);
      return;
    }

    const res = await fetch("/api/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: token.id,
        amount: 1000
      })
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      alert(data.error || "決済に失敗しました");
      return;
    }

    alert("決済完了");
  }

  return (
    <div>
      <div
        id="card-element"
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px"
        }}
      ></div>

      <button onClick={handlePay}>
        支払う（1000円）
      </button>
    </div>
  );
}