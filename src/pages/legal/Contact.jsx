import React from "react";

export default function Contact() {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        lineHeight: "1.8",
      }}
    >
      <h2>お問い合わせ</h2>

      <p>
        本サービスに関するお問い合わせは、以下のメールアドレスまでご連絡ください。
      </p>

      <p>
        <b>メールアドレス</b>
        <br />
        s_kenki@yahoo.co.jp
      </p>

      <p>
        内容を確認の上、通常1〜3営業日以内にご返信いたします。
      </p>

      <p>
        ※お問い合わせ内容によっては、ご返信までにお時間をいただく場合があります。
      </p>
    </div>
  );
}