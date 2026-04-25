import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/app.css";

type Status = "元気" | "普通" | "重い" | "";
type Genre = "仕事" | "恋愛" | "人間関係" | "";

const adviceMap: Record<Genre, string[]> = {
  仕事: [
    "優先順位がズレている",
    "やるべきことから逃げている",
    "考えすぎて動けていない",
    "行動すれば変わる状態にいる",
    "今は決断のタイミング",
  ],
  恋愛: [
    "相手に振り回されている",
    "期待しすぎている",
    "距離感がズレている",
    "本音を隠している",
    "判断が遅れている",
  ],
  人間関係: [
    "無理して関わりすぎている",
    "気を使いすぎている",
    "距離を取るべき相手がいる",
    "全部背負いすぎている",
    "環境の影響を受けすぎている",
  ],
  "": [],
};

export default function Deep() {
  const navigate = useNavigate();

  const [status, setStatus] = useState<Status>("");
  const [genre, setGenre] = useState<Genre>("");
  const [results, setResults] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateAdvice = async () => {
    if (!status || !genre) {
      alert("状態とテーマを選択してください");
      return;
    }

    try {
      setLoading(true);

      // 🔥 ここだけ追加（ポイントチェック）
      const current = Number(localStorage.getItem("point") || 0);
      if (current < 10) {
        alert("ポイントが足りません");
        setLoading(false);
        return;
      }
      localStorage.setItem("point", String(current - 10));
      // 🔥 追加ここまで

      const base = adviceMap[genre];
      const shuffled = [...base].sort(() => 0.5 - Math.random());
      setResults(shuffled.slice(0, 4));
      setShowResult(true);
    } catch (error) {
      console.error("Deep失敗:", error);
      alert("エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer", marginBottom: "10px" }}
        >
          ◀︎
        </div>

        {!showResult && (
          <>
            <div className="title">もっと深く見る</div>

            <div className="question">今の状態は？</div>
            <div className="btn-group">
              {["元気", "普通", "重い"].map((s) => (
                <button
                  key={s}
                  className="select-btn"
                  style={{
                    background: status === s ? "#e57373" : "#fff",
                    color: status === s ? "#fff" : "#333",
                  }}
                  onClick={() => setStatus(s as Status)}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="question" style={{ marginTop: "20px" }}>
              どこを深く見る？
            </div>
            <div className="btn-group">
              {["仕事", "恋愛", "人間関係"].map((g) => (
                <button
                  key={g}
                  className="select-btn"
                  style={{
                    background: genre === g ? "#e57373" : "#fff",
                    color: genre === g ? "#fff" : "#333",
                  }}
                  onClick={() => setGenre(g as Genre)}
                >
                  {g}
                </button>
              ))}
            </div>

            <button
              className="btn"
              style={{ marginTop: "24px" }}
              onClick={generateAdvice}
              disabled={loading}
            >
              {loading ? "処理中..." : "深く見る（10p）"}
            </button>
          </>
        )}

        {showResult && (
          <>
            <div className="advice-main">
              {results.map((r, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  ・{r}
                </div>
              ))}
            </div>

            <button
              className="btn main-btn"
              onClick={() =>
                navigate(
                  `/chat?status=${encodeURIComponent(
                    status
                  )}&genre=${encodeURIComponent(genre)}`
                )
              }
            >
              この内容で相談する（15p / 4ターン）
            </button>

            <button
              className="select-btn wide-btn"
              style={{ marginTop: "10px" }}
              onClick={generateAdvice}
              disabled={loading}
            >
              {loading ? "処理中..." : "もう一度深く見る（10p）"}
            </button>

            <button
              className="select-btn wide-btn"
              style={{ marginTop: "10px" }}
              onClick={() => navigate("/home")}
            >
              ホームに戻る
            </button>
          </>
        )}
      </div>
    </div>
  );
}