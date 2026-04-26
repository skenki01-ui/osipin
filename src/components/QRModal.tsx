// src/components/QRModal.tsx
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

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center"
        }}
      >
        <h3>QRキー</h3>

        <div
          style={{
            width: "150px",
            height: "150px",
            background: "#eee",
            margin: "20px auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {keyData}
        </div>

        <button onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
}