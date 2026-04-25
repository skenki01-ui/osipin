import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [point, setPoint] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem("point");

    if (!saved) {
      localStorage.setItem("point", "100");
      setPoint(100);
    } else {
      setPoint(Number(saved));
    }
  }, []);

  return (
    <div>
      <h1>ひきよせ</h1>

      <div>ポイント：{point}p</div>

      <button onClick={() => navigate("/result")}>
        今日の運勢を見る
      </button>
    </div>
  );
}