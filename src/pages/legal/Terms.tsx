import { useNavigate } from "react-router-dom";

export default function Terms() {
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
          background: "#fff",
          padding: "20px",
          borderRadius: "16px",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <div
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer", marginBottom: "10px" }}
        >
          ◀︎
        </div>

        <h2>利用規約</h2>

        <p>本サービスをご利用いただく前に、本規約をご確認ください。</p>
        <p>本サービスは占い・相談を目的としたものであり、結果を保証するものではありません。</p>
        <p>ユーザーは自己責任のもとで本サービスを利用するものとします。</p>
        <p>不正利用や迷惑行為が確認された場合、利用制限を行う場合があります。</p>
        <p>本サービスの内容は予告なく変更されることがあります。</p>
      </div>
    </div>
  );
}