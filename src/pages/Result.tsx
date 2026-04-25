import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const fortunes = ["大吉", "中吉", "小吉", "吉", "末吉"];

const advices = [
  "流れは来てる。\n小さく動けば一気に変わる。",
  "今は焦るな。\n選択より整えるが先。",
  "考えすぎ。\n動いた方が早い。",
  "やらない理由探してるだけ。\nやれ。",
  "今のままでもいい。\nでも変えたらもっと良くなる。",
  "その迷い、無駄じゃない。",
  "逃げるな。\n向き合え。",
  "答えは出てる。\nやるかどうかだけ。",
  "甘えすぎ。\n一回ちゃんとやれ。",
  "覚悟が足りない。",
  "今は耐えろ。",
  "動けば変わる。",
  "環境のせいにするな。",
  "それやらん理由ある？",
  "中途半端が一番ダサい。",
  "そのまま一生続ける気か？",
  "本気出してないだけ。",
  "現実見ろ。",
  "後回しは終わり。",
  "結局逃げてる。",
  "変わりたいなら行動しろ。",
  "言い訳やめろ。",
  "考えるな、動け。",
  "自分に期待しろ。",
  "満足してるか？",
  "やらない後悔の方がデカい。",
  "逃げたら戻るだけ。",
  "変わるチャンスは今。",
  "もう気づいてるやろ。",
  "動かない理由いらん。",
  "甘え捨てろ。",
  "1回本気でやれ。",
  "今が分岐点。",
  "止まるな。",
  "少しでも進め。",
];

export default function Result() {
  const navigate = useNavigate();

  const [fortune, setFortune] = useState("");
  const [advice, setAdvice] = useState("");
  const [point, setPoint] = useState(0);

  useEffect(() => {
    const p = localStorage.getItem("point");
    setPoint(p ? Number(p) : 0);

    const today = new Date();
    const key = `hikiyose_${today.getFullYear()}${today.getMonth()}${today.getDate()}`;

    const saved = localStorage.getItem(key);

    if (saved) {
      try {
        const data = JSON.parse(saved);
        setFortune(data.fortune);
        setAdvice(data.advice);
      } catch {
        localStorage.removeItem(key);
      }
    }

    if (!saved) {
      const newFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      const newAdvice = advices[Math.floor(Math.random() * advices.length)];

      setFortune(newFortune);
      setAdvice(newAdvice);

      localStorage.setItem(
        key,
        JSON.stringify({
          fortune: newFortune,
          advice: newAdvice,
        })
      );
    }
  }, []);

  return (
    <div className="container">

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <div
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer", fontSize: "18px" }}
        >
          ◀︎
        </div>

        <div style={{ fontWeight: "bold" }}>
          結果
        </div>

        <div style={{ fontSize: "14px" }}>
          {point}p
        </div>
      </div>

      <div className="card">

        <div style={{ fontSize: "12px", color: "#999", marginBottom: "8px" }}>
          {fortune}
        </div>

        <div
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            lineHeight: "1.8",
            marginBottom: "28px",
            whiteSpace: "pre-line",
          }}
        >
          {advice}
        </div>

        <button
          className="btn"
          style={{ background: "#e53935" }}
          onClick={() => navigate("/deep")}
        >
          もっと深く見る（10p）
        </button>

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => {
              const today = new Date();
              const key = `hikiyose_${today.getFullYear()}${today.getMonth()}${today.getDate()}`;
              localStorage.removeItem(key);
              window.location.reload();
            }}
            style={{
              fontSize: "12px",
              color: "#999",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            もう一度引く（10p）
          </button>
        </div>

        <div style={{ marginTop: "16px" }}>
          <button
            className="btn"
            style={{ background: "#f0a500" }}
            onClick={() => navigate("/purchase")}
          >
            ポイント購入
          </button>
        </div>

      </div>
    </div>
  );
}