import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Purchase() {
  const payjpRef = useRef<any>(null);
  const cardRef = useRef<any>(null);
  const navigate = useNavigate();

  const [point, setPoint] = useState<number>(0);

  // 🔥 UUIDでゲストID作る
  const getGuestId = () => {
    let guestId = localStorage.getItem("guest_id");
    if (!guestId) {
      guestId = crypto.randomUUID();
      localStorage.setItem("guest_id", guestId);
    }
    return guestId;
  };

  // 🔥 ポイント取得（今は止める）
  const fetchPoint = async () => {
    const guestId = getGuestId();

    try {
      const res = await fetch(
        `http://localhost:3001/api/point/${guestId}`
      );
      const data = await res.json();
      setPoint(data.point || 0);
    } catch (e) {
      console.log("point取得失敗");
    }
  };

  // ❌ 一旦OFF（サーバー無いからエラー防止）
  useEffect(() => {
    // fetchPoint();
  }, []);

  useEffect(() => {
    if (payjpRef.current) return;

    const init = () => {
      const Payjp = (window as any).Payjp;

      if (!Payjp) {
        alert("Payjp読み込み失敗");
        return;
      }

      const payjp = Payjp("pk_test_c941a1251af13cfc8ed3265a");

      const elements = payjp.elements();
      const card = elements.create("card");
      card.mount("#card-element");

      payjpRef.current = payjp;
      cardRef.current = card;
    };

    const script = document.createElement("script");
    script.src = "https://js.pay.jp/v2/pay.js";
    script.async = true;
    script.onload = init;

    document.body.appendChild(script);
  }, []);

  const handlePurchase = async () => {
    const payjp = payjpRef.current;
    const card = cardRef.current;

    if (!payjp || !card) {
      alert("初期化失敗");
      return;
    }

    const result = await payjp.createToken(card);
    const token = result.id || result.token?.id;

    if (!token) {
      alert("トークン取得失敗");
      return;
    }

    const guestId = getGuestId();

    try {
      // ❌ API通信一旦OFF
      /*
      const res = await fetch("http://localhost:3001/api/charge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          userId: guestId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("課金失敗: " + data.error);
        return;
      }
      */

      // ✅ 仮成功
      alert("課金成功！");

      // ❌ fetchPointも止める
      // await fetchPoint();

    } catch (err) {
      alert("通信エラー");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eaf3ff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "320px",
          padding: "24px",
          borderRadius: "16px",
          background: "#fff3c7",
          textAlign: "center",
        }}
      >
        <div
          onClick={() => navigate("/")}
          style={{
            cursor: "pointer",
            marginBottom: "10px",
            textAlign: "left",
          }}
        >
          ◀︎ 戻る
        </div>

        <h2>ポイント購入</h2>

        <div style={{ marginBottom: "10px" }}>
          現在ポイント: {point}
        </div>

        <div
          id="card-element"
          style={{
            width: "100%",
            height: "120px",
            padding: "12px",
            background: "#fff",
            borderRadius: "8px",
            marginBottom: "16px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={handlePurchase}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            background: "#333",
            color: "#fff",
          }}
        >
          購入（1000円）
        </button>
      </div>
    </div>
  );
}