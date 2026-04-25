import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Purchase() {
  const navigate = useNavigate();
  const [point, setPoint] = useState<number>(0);

  const getGuestId = () => {
    let guestId = localStorage.getItem("guest_id");

    if (!guestId) {
      if (window.crypto && crypto.randomUUID) {
        guestId = crypto.randomUUID();
      } else {
        guestId = "guest_" + Math.random().toString(36).substring(2, 15);
      }

      localStorage.setItem("guest_id", guestId);
    }

    return guestId;
  };

  useEffect(() => {
    // 何もしない
  }, []);

  const handlePurchase = async () => {
    alert("課金ボタン（仮）");
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

        {/* Payjp一旦削除 */}
        <div
          style={{
            width: "100%",
            height: "120px",
            background: "#ddd",
            borderRadius: "8px",
            marginBottom: "16px",
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
          購入（仮）
        </button>
      </div>
    </div>
  );
}