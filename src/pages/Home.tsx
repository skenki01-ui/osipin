import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

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
    <div className="container">
      <div className="card">
        <div className="sub">迷ったとき、流れを変える</div>

        <div className="title">ひきよせ</div>

        <div className="point-label">現在のポイント</div>
        <div className="point">{point}p</div>

        <button className="btn" onClick={() => navigate("/result")}>
          今日の運勢を見る
        </button>

        <div className="desc">
          1日1回無料 / 2回目以降 10p
          <br />
          深掘り 10p
          <br />
          相談チャット 15p / 4ターン
          <br />
          フリーチャット 50p / 15ターン
        </div>

        {/* 🔥 QRは一旦無効化（原因切り分け） */}
        {false && (
          <div style={{ marginTop: "20px" }}>
            <div style={{ fontSize: "14px", marginBottom: "8px" }}>
              友だちに紹介
            </div>

            <img
              src="/qr.png"
              alt="QRコード"
              style={{
                width: "160px",
                height: "160px",
                objectFit: "contain",
              }}
            />
          </div>
        )}

        <div
          style={{
            marginTop: "24px",
            fontSize: "12px",
            color: "#666",
            textAlign: "center",
          }}
        >
          <div
            style={{ marginBottom: "6px", cursor: "pointer" }}
            onClick={() => navigate("/tokushoho")}
          >
            特定商取引法に基づく表記
          </div>

          <div
            style={{ marginBottom: "6px", cursor: "pointer" }}
            onClick={() => navigate("/terms")}
          >
            利用規約
          </div>

          <div
            style={{ marginBottom: "6px", cursor: "pointer" }}
            onClick={() => navigate("/privacy")}
          >
            プライバシーポリシー
          </div>

          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/contact")}
          >
            お問い合わせ
          </div>
        </div>
      </div>
    </div>
  );
}