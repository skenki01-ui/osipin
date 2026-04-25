import { useNavigate } from "react-router-dom";

export default function Privacy() {
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

        <h2>プライバシーポリシー</h2>

        <p>本サービスでは以下の情報を取得する場合があります。</p>
        <p>・ニックネーム</p>
        <p>・メールアドレス</p>
        <p>・利用履歴</p>

        <p>取得した情報はサービス提供・改善に使用します。</p>

        <p>法令を除き第三者提供は行いません。</p>
      </div>
    </div>
  );
}