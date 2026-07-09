// src/components/QRModal.tsx
import QRCode from "react-qr-code";

export default function QRModal({
  visible,
  onClose,
  keyData
}: {
  visible: boolean;
  onClose: () => void;
  keyData: string;
}) {
  if (!visible) return null;

  const unlockUrl = `${window.location.origin}/unlock?id=${keyData}`;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          textAlign: "center",
          width: 320
        }}
      >
        <h2 style={{ marginTop: 0 }}>QRキー</h2>

        <div
          style={{
            background: "#fff",
            padding: 16,
            display: "inline-block",
            borderRadius: 8
          }}
        >
          <QRCode value={unlockUrl} size={220} />
        </div>

        <p
          style={{
            marginTop: 16,
            fontSize: 12,
            color: "#555",
            wordBreak: "break-all"
          }}
        >
          {unlockUrl}
        </p>

        <p
          style={{
            marginTop: 8,
            fontFamily: "monospace",
            fontSize: 13
          }}
        >
          ID: {keyData}
        </p>

        <button
          onClick={onClose}
          style={{
            marginTop: 16,
            padding: "10px 20px"
          }}
        >
          閉じる
        </button>
      </div>
    </div>
  );
}