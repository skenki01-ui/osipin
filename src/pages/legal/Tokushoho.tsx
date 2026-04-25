import { useNavigate } from "react-router-dom";

export default function Tokushoho() {
  const navigate = useNavigate();

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
          maxWidth: "400px",
          width: "90%",
          background: "#fff",
          padding: "20px",
          borderRadius: "16px",
          lineHeight: "1.8",
        }}
      >
        <div onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
          ◀︎
        </div>

        <h2>特定商取引法</h2>

        <p><b>事業者名</b><br />ひそひそ運営事務局</p>
        <p><b>運営責任者</b><br />角谷 勝徳</p>
        <p><b>所在地</b><br />大阪市住之江区御崎8-2-28</p>
        <p><b>電話番号</b><br />080-5127-7084</p>
        <p><b>メール</b><br />s_kenki@yahoo.co.jp</p>

        <p>決済後すぐ利用可能</p>
        <p>返金不可（デジタル商品のため）</p>
      </div>
    </div>
  );
}