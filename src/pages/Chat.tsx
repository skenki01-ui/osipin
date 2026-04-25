import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/app.css";

type Message = {
  role: "user" | "ai";
  text: string;
};

type Status = "元気" | "普通" | "重い";
type Genre = "仕事" | "恋愛" | "人間関係";
type Key = "stuck" | "cant_decide" | "relationship" | "fear" | "escape";

const choiceFlow: Record<Status, Record<Genre, string[][]>> = {
  元気: {
    仕事: [
      ["すぐ動きたい", "方向だけ決めたい", "まだ迷ってる"],
      ["怖さはある", "面倒", "失敗したくない"],
      ["変えたい", "様子見", "まだ迷う"],
      ["その通り", "まだ整理できてない", "わからない"],
    ],
    恋愛: [
      ["押したい", "様子見たい", "距離取りたい"],
      ["傷つきたくない", "相手が気になる", "怖い"],
      ["進みたい", "迷ってる", "やめたい"],
      ["その通り", "まだ整理できてない", "わからない"],
    ],
    人間関係: [
      ["はっきり言いたい", "様子見たい", "距離置きたい"],
      ["嫌われたくない", "疲れてる", "怖い"],
      ["変えたい", "まだ迷う", "逃げたい"],
      ["その通り", "まだ整理できてない", "わからない"],
    ],
  },
  普通: {
    仕事: [
      ["迷ってる", "決めきれない", "少し不安"],
      ["責任が怖い", "面倒", "まだ考えたい"],
      ["動きたい", "様子見", "まだ迷う"],
      ["その通り", "まだ整理できてない", "わからない"],
    ],
    恋愛: [
      ["どうしたらいい？", "様子見かな", "距離考えたい"],
      ["期待してる", "傷つきたくない", "怖い"],
      ["進みたい", "迷ってる", "やめたい"],
      ["その通り", "まだ整理できてない", "わからない"],
    ],
    人間関係: [
      ["気を使ってる", "少ししんどい", "距離考えたい"],
      ["嫌われたくない", "疲れてる", "我慢してる"],
      ["変えたい", "まだ迷う", "逃げたい"],
      ["その通り", "まだ整理できてない", "わからない"],
    ],
  },
  重い: {
    仕事: [
      ["もう無理かも", "しんどい", "逃げたい"],
      ["限界", "やりたくない", "怖い"],
      ["やめたい", "迷ってる", "耐える"],
      ["その通り", "まだ整理できてない", "わからない"],
    ],
    恋愛: [
      ["苦しい", "期待してしまう", "離れたい"],
      ["依存してる", "怖い", "しんどい"],
      ["終わりたい", "迷ってる", "戻りたい"],
      ["その通り", "まだ整理できてない", "わからない"],
    ],
    人間関係: [
      ["限界", "しんどい", "関わりたくない"],
      ["我慢してる", "怖い", "疲れた"],
      ["離れたい", "迷ってる", "耐える"],
      ["その通り", "まだ整理できてない", "わからない"],
    ],
  },
};

const reply1 = {
  stuck: "動けてないんじゃなくて、動いた後を避けてる可能性がある。",
  cant_decide: "決めてないんじゃなくて、決めた後を引き受けたくないだけ。",
  relationship: "人間関係で止まる時は、自分の軸がズレてることが多い。",
  fear: "怖さがあるなら、答えはもう見えてるはず。",
  escape: "逃げてるなら、理由はもう分かってるはず。",
};

const reply2 = {
  stuck: "このままだと考えてるだけで終わる。",
  cant_decide: "決めないまま進むのが一番消耗する。",
  relationship: "相手に合わせ続けると自分が消える。",
  fear: "怖さは消えない。抱えたまま動くしかない。",
  escape: "先延ばしは後で重くなる。",
};

const reply3 = {
  stuck: "少しでも動けば流れは変わる。",
  cant_decide: "どっちを選んでも責任はついてくる。",
  relationship: "距離を取る選択も必要。",
  fear: "怖いまま進むしかない。",
  escape: "逃げ続けると状況は悪くなる。",
};

const finalMsg = {
  stuck: "このままだと同じ場所で止まる。",
  cant_decide: "このままだと何も決まらない。",
  relationship: "このままだと流され続ける。",
  fear: "ここから先は整理が必要。",
  escape: "理由をはっきりさせた方がいい。",
};

export default function Chat() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const status = (params.get("status") || "普通") as Status;
  const genre = (params.get("genre") || "仕事") as Genre;

  const [messages, setMessages] = useState<Message[]>([]);
  const [turn, setTurn] = useState(4);
  const [step, setStep] = useState(0);
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    // 🔥 ここだけ追加（ポイントチェック）
    const current = Number(localStorage.getItem("point") || 0);
    if (current < 15) {
      alert("ポイントが足りません");
      navigate("/home");
      return;
    }
    localStorage.setItem("point", String(current - 15));
    // 🔥 追加ここまで

    setMessages([
      {
        role: "ai",
        text: `今の状態は「${status}」、テーマは「${genre}」です。\n今ひっかかっているのはどれですか？`,
      },
    ]);
  }, [status, genre, navigate]);

  const append = (msg: Message) =>
    setMessages((prev) => [...prev, msg]);

  const mapKey = (label: string): Key => {
    if (label.includes("決")) return "cant_decide";
    if (label.includes("人")) return "relationship";
    if (label.includes("怖")) return "fear";
    if (label.includes("逃") || label.includes("面倒")) return "escape";
    return "stuck";
  };

  const handleChoice = (label: string) => {
    if (turn <= 0 || showCta) return;

    append({ role: "user", text: label });

    const key = mapKey(label);

    if (step === 0) {
      append({ role: "ai", text: reply1[key] });
      setStep(1);
    } else if (step === 1) {
      append({ role: "ai", text: reply2[key] });
      setStep(2);
    } else if (step === 2) {
      append({ role: "ai", text: reply3[key] });
      setStep(3);
    } else {
      append({ role: "ai", text: finalMsg[key] });
      setShowCta(true);
    }

    setTurn((t) => t - 1);
  };

  const getChoices = () => {
    return choiceFlow[status]?.[genre]?.[step] || [];
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div onClick={() => navigate(-1)}>◀︎</div>
        <div>ひきよせ相談</div>
        <div>残り {turn}</div>
      </div>

      <div className="chat-list">
        {messages.map((m, i) => (
          <div key={i} className={`row ${m.role}`}>
            <div className={`bubble ${m.role}`}>{m.text}</div>
          </div>
        ))}

        {showCta && (
          <div style={{ marginTop: "20px" }}>
            <button
              className="btn"
              onClick={() => navigate("/comingsoon")}
            >
              ▶ 自分の言葉で相談する
            </button>
          </div>
        )}
      </div>

      {!showCta && (
        <div className="chat-choice-area">
          {getChoices().map((c, i) => (
            <button
              key={i}
              className="choice-btn"
              onClick={() => handleChoice(c)}
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}