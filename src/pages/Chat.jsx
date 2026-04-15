import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import characters from "../data/characters";
import MenuModal from "../components/MenuModal";
import { supabase } from "../lib/supabase";

export default function Chat() {

  const { id } = useParams();
  const navigate = useNavigate();

  const character = characters.find(c => c.id === id);

  const [menuOpen, setMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [turn, setTurn] = useState(3);
  const [points, setPoints] = useState(0);

  const bottomRef = useRef(null);

  let userId = localStorage.getItem("user_id");
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("user_id", userId);
  }

  const userName = localStorage.getItem("name") || "ねえ";

  if (!character) {
    return <div style={{ padding: 20 }}>読み込み中...</div>;
  }

  useEffect(() => {
    if (!character) return;
    loadMessages();
    loadPoints();
  }, [character]);

  // =====================
  // ⭐完全修正（ここ）
  // =====================
  async function loadPoints() {

    let { data } = await supabase
      .from("users")
      .select("points")
      .eq("id", userId)
      .maybeSingle(); // ⭐ここ重要

    if (!data) {

      const { data: newUser } = await supabase
        .from("users")
        .insert({
          id: userId,
          points: 0
        })
        .select()
        .maybeSingle(); // ⭐ここも

      setPoints(newUser?.points || 0);
      return;
    }

    setPoints(data.points || 0);
  }

  async function updatePoints(newPoints) {
    setPoints(newPoints);

    await supabase
      .from("users")
      .update({ points: newPoints })
      .eq("id", userId);
  }

  async function loadMessages() {

    if (!character) return;

    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("character_id", character.id)
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (data) {
      const formatted = data.map(m => ({
        role: m.role === "user" ? "user" : "ai",
        text: m.content
      }));

      setMessages(formatted);
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {

    if (!input.trim()) return;

    if (turn === 0) {

      if (points < 5) {
        alert("ポイントが足りません");
        return;
      }

      await updatePoints(points - 5);

    } else {
      setTurn(t => t - 1);
    }

    const currentInput = input;

    setMessages(prev => [...prev, { role: "user", text: currentInput }]);
    setInput("");

    await supabase.from("messages").insert({
      user_id: userId,
      character_id: character.id,
      role: "user",
      content: currentInput
    });

    setTimeout(async () => {

      const reply = `${userName}と話せて嬉しい`;

      setMessages(prev => [...prev, { role: "ai", text: reply }]);

      await supabase.from("messages").insert({
        user_id: userId,
        character_id: character.id,
        role: "ai",
        content: reply
      });

    }, 500);
  }

  return (
    <div style={{
      width: "375px",
      margin: "0 auto",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#eaf3ff"
    }}>

      <div style={{
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ccc"
      }}>
        <div onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>◀</div>
        <div>{character.name}</div>
        <div onClick={() => setMenuOpen(true)} style={{ cursor: "pointer" }}>≡</div>
      </div>

      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "10px"
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            textAlign: m.role === "user" ? "right" : "left",
            marginBottom: "10px"
          }}>
            <span style={{
              background: m.role === "user" ? "#4da6ff" : "#fff",
              color: m.role === "user" ? "#fff" : "#000",
              padding: "8px",
              borderRadius: "10px",
              display: "inline-block"
            }}>
              {m.text}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={{
        display: "flex",
        padding: "10px",
        borderTop: "1px solid #ccc"
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1 }}
        />
        <button onClick={send}>送信</button>
      </div>

      <MenuModal open={menuOpen} onClose={() => setMenuOpen(false)} />

    </div>
  );
}