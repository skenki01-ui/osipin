import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div style={{
      background: "#111",
      color: "#fff",
      padding: "10px 20px",
      display: "flex",
      gap: "20px"
    }}>
      <Link to="/" style={{ color: "#fff" }}>Dashboard</Link>
      <Link to="/users" style={{ color: "#fff" }}>Users</Link>
      <Link to="/locks" style={{ color: "#fff" }}>Locks</Link>
      <Link to="/logs" style={{ color: "#fff" }}>Logs</Link>
    </div>
  );
}