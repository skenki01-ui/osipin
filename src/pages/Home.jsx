import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      width: "375px",
      margin: "0 auto",
      minHeight: "100vh",
      background: "#ffeaf4",
      padding: "20px",
      boxSizing: "border-box"
    }}>

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        ホーム
      </h2>

      {/* ピン購入 */}
      <div
        onClick={() => navigate("/pin")}
        style={{
          background: "#fff",
          padding: "15px",
          borderRadius: "12px",
          marginBottom: "10px",
          cursor: "pointer",
          textAlign: "center",
          fontWeight: "bold"
        }}
      >
        📌 ピン購入
      </div>

      {/* ランキング */}
      <div
        onClick={() => navigate("/rank")}
        style={{
          background: "#fff",
          padding: "15px",
          borderRadius: "12px",
          marginBottom: "10px",
          cursor: "pointer",
          textAlign: "center",
          fontWeight: "bold"
        }}
      >
        ⭐ ランキング
      </div>

      {/* カード */}
      <div
        onClick={() => navigate("/cards")}
        style={{
          background: "#fff",
          padding: "15px",
          borderRadius: "12px",
          marginBottom: "10px",
          cursor: "pointer",
          textAlign: "center",
          fontWeight: "bold"
        }}
      >
        🧾 カード
      </div>

    </div>
  );
}