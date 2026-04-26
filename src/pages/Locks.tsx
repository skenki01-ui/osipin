import { useState } from "react";
import { lock, unlock, getLockState } from "../lib/useLocks";
import { addLog } from "../lib/useLogs";
import { generateId, getNow } from "../lib/utils";
import { createTempKey, createOneTimeKey } from "../lib/useKeys";
import QRModal from "../components/QRModal";

export default function Locks() {
  const [locked, setLocked] = useState(getLockState());
  const [qrVisible, setQrVisible] = useState(false);
  const [qrData, setQrData] = useState("");

  const handleUnlock = () => {
    unlock();
    setLocked(false);

    addLog({
      id: generateId(),
      userName: "管理者",
      lockName: "事務所入口",
      action: "unlock",
      createdAt: getNow()
    });
  };

  const handleLock = () => {
    lock();
    setLocked(true);

    addLog({
      id: generateId(),
      userName: "管理者",
      lockName: "事務所入口",
      action: "lock",
      createdAt: getNow()
    });
  };

  const handleTempKey = () => {
    const key = createTempKey(120);
    setQrData(key.id);
    setQrVisible(true);
  };

  const handleOneTimeKey = () => {
    const key = createOneTimeKey();
    setQrData(key.id);
    setQrVisible(true);
  };

  return (
    <div>
      <h1>Locks</h1>

      <div className={`lock-status ${locked ? "locked" : "unlocked"}`}>
        {locked ? "🔒 施錠中" : "🔓 解錠中"}
      </div>

      <div className="lock-buttons">
        <button className="unlock" onClick={handleUnlock}>
          解錠
        </button>
        <button className="lock" onClick={handleLock}>
          施錠
        </button>
      </div>

      <div className="key-buttons">
        <button onClick={handleTempKey}>一時キー（2時間）</button>
        <button onClick={handleOneTimeKey}>ワンタイムキー</button>
      </div>

      <QRModal
        visible={qrVisible}
        onClose={() => setQrVisible(false)}
        keyData={qrData}
      />
    </div>
  );
}