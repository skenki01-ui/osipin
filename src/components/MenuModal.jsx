import React from "react";
import { useNavigate } from "react-router-dom";

export default function MenuModal({ open, onClose }) {

  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div style={{
      position:"fixed",
      top:0,
      left:0,
      width:"100%",
      height:"100%",
      background:"rgba(0,0,0,0.4)",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>

      <div style={{
        width:"300px",
        background:"#fff",
        borderRadius:"12px",
        padding:"20px",
        display:"flex",
        flexDirection:"column",
        gap:"10px"
      }}>

        <div style={{fontWeight:"bold"}}>
          メニュー
        </div>

        {/* ポイント */}
        <button
          onClick={()=>{
            navigate("/pay");
            onClose();
          }}
          style={{
            padding:"12px",
            borderRadius:"10px",
            border:"none",
            background:"#ff4d4f",
            color:"#fff"
          }}
        >
          💰 ポイントを買う
        </button>

        {/* サブスク */}
        <button
          onClick={()=>alert("月額で会話が無制限になるプランです（審査後開始）")}
          style={{
            padding:"12px",
            borderRadius:"10px",
            border:"none",
            background:"#333",
            color:"#fff"
          }}
        >
          📅 月額で使い放題
        </button>

        {/* VIP */}
        <button
          onClick={()=>alert("特別なメッセージを送れる機能です（審査後開始）")}
          style={{
            padding:"12px",
            borderRadius:"10px",
            background:"#fff",
            border:"1px solid #ccc"
          }}
        >
          ⭐ VIP（特別メッセージ）
        </button>

        {/* カード */}
        <button
          onClick={()=>{
            navigate("/cards");
            onClose();
          }}
          style={{
            padding:"12px",
            borderRadius:"10px",
            border:"1px solid #ccc",
            background:"#fff"
          }}
        >
          🧾 カードを見る
        </button>

        {/* アプリ説明 */}
        <button
          onClick={()=>{
            navigate("/about");
            onClose();
          }}
          style={{
            padding:"12px",
            borderRadius:"10px",
            border:"1px solid #ccc",
            background:"#fff"
          }}
        >
          ℹ️ このアプリについて
        </button>

        {/* PWA */}
        <button
          onClick={()=>alert("ホーム画面に追加するとアプリのように使えます")}
          style={{
            padding:"12px",
            borderRadius:"10px",
            border:"1px solid #ccc",
            background:"#fff"
          }}
        >
          📱 ホーム画面に追加
        </button>

        {/* ⭐法律 */}
        <button
          onClick={()=>{
            navigate("/terms");
            onClose();
          }}
          style={{
            padding:"10px",
            borderRadius:"10px",
            border:"1px solid #ccc",
            background:"#fff",
            fontSize:"12px"
          }}
        >
          利用規約
        </button>

        <button
          onClick={()=>{
            navigate("/tokushoho");
            onClose();
          }}
          style={{
            padding:"10px",
            borderRadius:"10px",
            border:"1px solid #ccc",
            background:"#fff",
            fontSize:"12px"
          }}
        >
          特商法
        </button>

        <button
          onClick={onClose}
          style={{
            marginTop:"10px",
            padding:"8px",
            borderRadius:"10px",
            border:"1px solid #ccc"
          }}
        >
          閉じる
        </button>

      </div>
    </div>
  );
}