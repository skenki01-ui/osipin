import { useParams } from "react-router-dom";
import { getUserById, updateUser } from "../lib/useUsers";
import { useState } from "react";

export default function UserDetail() {
  const { id } = useParams();
  const user = getUserById(id!);

  const [role, setRole] = useState(user?.role || "family");
  const [isActive, setIsActive] = useState(user?.isActive || false);

  if (!user) return <div>ユーザーが見つかりません</div>;

  const handleSave = () => {
    updateUser(user.id, { role, isActive });
    alert("保存しました");
  };

  return (
    <div>
      <h1>User Detail</h1>

      <p>{user.name}</p>

      <div style={{ marginTop: "20px" }}>
        <label>権限：</label>
        <select value={role} onChange={(e) => setRole(e.target.value as any)}>
          <option value="master">マスター</option>
          <option value="family">家族</option>
          <option value="temporary">一時</option>
          <option value="onetime">ワンタイム</option>
        </select>
      </div>

      <div style={{ marginTop: "20px" }}>
        <label>
          有効：
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </label>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleSave}>保存</button>
      </div>
    </div>
  );
}