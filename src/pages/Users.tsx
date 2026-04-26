import { Link } from "react-router-dom";
import { getUsers } from "../lib/useUsers";

export default function Users() {
  const users = getUsers();

  return (
    <div>
      <h1>Users</h1>

      <ul style={{ marginTop: "20px" }}>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: "10px" }}>
            <Link to={`/users/${user.id}`}>
              {user.name}（{user.role}）
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}