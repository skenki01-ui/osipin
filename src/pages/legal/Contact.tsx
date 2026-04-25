import { useNavigate } from "react-router-dom";

export default function Contact() {
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

        <h2>お問い合わせ</h2>

        <p>
          本サービスに関するお問い合わせは、以下のメールアドレスまでご連絡ください。
        </p>

        <p>
          <b>メールアドレス</b>
          <br />
          s_kenki@yahoo.co.jp
        </p>

        <p>通常1〜3営業日以内にご返信いたします。</p>
      </div>
    </div>
  );
}