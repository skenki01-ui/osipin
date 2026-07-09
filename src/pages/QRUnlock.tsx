// src/pages/QRUnlock.tsx
import { useEffect, useState } from "react";
import { useKey, validateKey } from "../lib/useKeys";
import { unlock } from "../lib/useLocks";
import { addLog } from "../lib/useLogs";
import { generateId, getNow } from "../lib/utils";

export default function QRUnlock() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
      setInput(id);
    }
  }, []);

  const handleUnlock = () => {
    if (!input) {
      setMessage("QRコードのIDを入力してください");
      return;
    }

    const result = validateKey(input);

    if (!result.ok) {
      setMessage(result.reason);
      return;
    }

    useKey(input);
    unlock();

    addLog({
      id: generateId(),
      userName: "QRユーザー",
      lockName: "事務所入口",
      action: "unlock",
      createdAt: getNow()
    });

    setMessage("解錠しました");
    setInput("");
  };

  return (
    <div>
      <h1>QR解錠</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="QRコードのID入力"
        style={{ padding: "10px", width: "250px" }}
      />

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleUnlock}>解錠</button>
      </div>

      <p style={{ marginTop: "20px" }}>{message}</p>
    </div>
  );
}