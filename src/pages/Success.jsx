import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  const addPoint = location.state?.point || 0;
  const userId = localStorage.getItem("user_id");

  async function handleBack() {
    if (!userId) {
      alert("user_idなし");
      return;
    }

    // ① 今のポイント取得
    const { data: user, error: getError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (getError) {
      alert("取得失敗");
      console.log(getError);
      return;
    }

    const currentPoint = user?.points || 0;

    // ② 加算して更新
    const { error: updateError } = await supabase
      .from("users")
      .update({
        points: currentPoint + addPoint
      })
      .eq("id", userId);

    if (updateError) {
      alert("更新失敗");
      console.log(updateError);
      return;
    }

    // ③ ホームへ戻る
    navigate("/home");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{addPoint}ポイント追加された</h2>

      <button onClick={handleBack}>
        ホームへ戻る
      </button>
    </div>
  );
}