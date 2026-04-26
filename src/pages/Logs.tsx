import { getLogs } from "../lib/useLogs";

export default function Logs() {
  const logs = getLogs();

  return (
    <div>
      <h1>Logs</h1>

      <div style={{ marginTop: "20px" }}>
        {logs.length === 0 && <p>ログはまだありません</p>}

        {logs.map((log) => (
          <div
            key={log.id}
            style={{
              background: "#fff",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}
          >
            <p>👤 {log.userName}</p>
            <p>🔐 {log.lockName}</p>
            <p>操作：{log.action}</p>
            <p>時間：{log.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}