import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import characters from "../data/characters";
import MenuModal from "../components/MenuModal";
import { supabase } from "../lib/supabase";

export default function Home(){

let userId = localStorage.getItem("user_id");
if(!userId){
  userId = crypto.randomUUID();
  localStorage.setItem("user_id", userId);
}

const navigate = useNavigate();

const [menuOpen,setMenuOpen] = useState(false);
const [points,setPoints] = useState(0);
const [search,setSearch] = useState("");

const [pins,setPins] = useState({});
const [pinStock,setPinStock] = useState(0);

useEffect(()=>{
  loadPoints();
  loadLocal();

  let stock = localStorage.getItem("pinStock");
  if(!stock){
    localStorage.setItem("pinStock","3");
    setPinStock(3);
  }else{
    setPinStock(Number(stock));
  }

},[]);

function loadLocal(){
  setPins(JSON.parse(localStorage.getItem("pins") || "{}"));
}

async function loadPoints(){

  let { data, error } = await supabase
  .from("users")
  .select("*")
  .eq("id",userId)
  .single();

  if(error){

    const { data: newUser } = await supabase
    .from("users")
    .insert({ id: userId, points: 0 })
    .select()
    .single();

    setPoints(newUser.points);
    return;
  }

  setPoints(data.points || 0);
}

// ピン押し
function addPin(id,e){

  e.stopPropagation();

  let stock = parseInt(localStorage.getItem("pinStock") || "0");

  if(stock <= 0){
    alert("ピンがありません");
    navigate("/pin");
    return;
  }

  // すでにピン済みなら無視
  if(pins[id]) return;

  const newPins = {
    ...pins,
    [id]: {
      time: Date.now() // ⭐順番管理
    }
  };

  localStorage.setItem("pins",JSON.stringify(newPins));
  setPins(newPins);

  const newStock = stock - 1;
  localStorage.setItem("pinStock", String(newStock));
  setPinStock(newStock);
}

// 表示用
function isActivePin(id){
  return !!pins[id];
}

// 並び替え（ピン順）
const filtered = characters
  .filter(c => c.name.includes(search))
  .sort((a,b)=>{
    const aTime = pins[a.id]?.time || 0;
    const bTime = pins[b.id]?.time || 0;
    return bTime - aTime;
  });

return(

<div style={{
  width:"375px",
  margin:"0 auto",
  minHeight:"100vh",
  background:"#ffeaf4",
  padding:"10px"
}}>

{/* ヘッダー */}
<div style={{
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:"10px"
}}>
  <div>HOME</div>
  <div onClick={()=>setMenuOpen(true)}>☰</div>
</div>

{/* ボタン3つ */}
<div style={{
  display:"flex",
  gap:"8px",
  marginBottom:"10px"
}}>

<button onClick={()=>navigate("/pin")} style={btn}>
📌ピン
</button>

<button onClick={()=>navigate("/rank")} style={btn}>
⭐ランキング
</button>

<button onClick={()=>navigate("/cards")} style={btn}>
🧾カード
</button>

</div>

{/* ポイント＋ピン */}
<div style={{marginBottom:"10px"}}>
所持ポイント：{points}p ｜ 📌{pinStock}
</div>

{/* 検索 */}
<input
  placeholder="検索"
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
  style={input}
/>

{/* キャラ一覧 */}
{filtered.map(c=>{

const active = isActivePin(c.id);

return(

<div key={c.id}
onClick={()=>navigate(`/chat/${c.id}`)}
style={card}>

<div
onClick={(e)=>addPin(c.id,e)}
style={{
  marginRight:"8px",
  fontSize:"18px",
  filter: active ? "none" : "grayscale(1)",
  opacity: active ? 1 : 0.3
}}>
📌
</div>

<img src={c.img} style={img}/>

<div style={{flex:1}}>
<div style={{fontWeight:"bold"}}>{c.name}</div>
<div style={{fontSize:"12px",opacity:0.7}}>
{c.line}
</div>
</div>

</div>

);

})}

<MenuModal open={menuOpen} onClose={()=>setMenuOpen(false)} />

</div>

);
}

// スタイル
const btn = {
flex:1,
padding:"8px",
borderRadius:"10px",
border:"1px solid #ccc",
background:"#fff"
};

const input = {
width:"100%",
padding:"10px",
borderRadius:"10px",
border:"1px solid #ccc",
marginBottom:"10px"
};

const card = {
display:"flex",
alignItems:"center",
background:"#fff",
padding:"10px",
borderRadius:"10px",
marginBottom:"8px",
cursor:"pointer"
};

const img = {
width:"32px",
height:"32px",
borderRadius:"8px",
marginRight:"8px"
};