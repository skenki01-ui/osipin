import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import characters from "../data/characters";
import MenuModal from "../components/MenuModal";
import { supabase } from "../lib/supabase";

export default function Rank(){

const navigate = useNavigate();
const [menuOpen,setMenuOpen] = useState(false);
const [ranking,setRanking] = useState([]);

useEffect(()=>{
loadRanking();
},[]);


// ⭐今週開始
function getWeekStart(){

const now = new Date();
const day = now.getDay();

const diff = now.getDate() - day;
const start = new Date(now.setDate(diff));

start.setHours(0,0,0,0);

return start.toISOString();
}


// ⭐ランキング取得（DB）
async function loadRanking(){

const start = getWeekStart();

const { data } = await supabase
.from("messages")
.select("character_id, created_at")
.gte("created_at", start);

if(!data) return;

const counts = {};

data.forEach(m=>{
counts[m.character_id] = (counts[m.character_id] || 0) + 1;
});

// 並び替え
const sorted = Object.entries(counts)
.sort((a,b)=>b[1]-a[1]);

// 前回順位（簡易保存）
const prev = JSON.parse(localStorage.getItem("prevRank") || "{}");

const result = sorted.map(([id,count],index)=>{

const char = characters.find(c=>c.id === id);

// 矢印判定
let move = "stay";
if(prev[id]){
if(prev[id] > index+1) move = "up";
if(prev[id] < index+1) move = "down";
}

// 保存用
prev[id] = index+1;

return {
...char,
rank:index+1,
count,
move
};

});

localStorage.setItem("prevRank", JSON.stringify(prev));

setRanking(result);
}


return(

<div style={{
width:"375px",
margin:"0 auto",
background:"#ffeaf4",
minHeight:"100vh",
padding:"15px"
}}>

{/* HEADER */}
<div style={{
display:"flex",
alignItems:"center",
justifyContent:"space-between",
marginBottom:"15px"
}}>

<div onClick={()=>navigate(-1)}>←</div>

<div style={{
fontSize:"20px",
fontWeight:"bold"
}}>
今週のメンバーランキング
</div>

<div onClick={()=>setMenuOpen(true)}>≡</div>

</div>


{/* LIST */}
{ranking.map(m=>{

let medal="";
let bg="#fff";
let border="";

if(m.rank===1){
medal="👑";
bg="#fff5cc";
border="2px solid gold";
}

if(m.rank===2){
medal="🥈";
bg="#f0f0f0";
border="2px solid silver";
}

if(m.rank===3){
medal="🥉";
bg="#ffe8d6";
border="2px solid #cd7f32";
}

return(

<div
key={m.id}
onClick={()=>navigate(`/chat/${m.id}`)}
style={{
display:"flex",
alignItems:"center",
background:bg,
padding:"12px",
borderRadius:"12px",
marginBottom:"10px",
cursor:"pointer",
border:border,
boxShadow:"0 2px 4px rgba(0,0,0,0.08)"
}}
>

{/* RANK */}
<div style={{
width:"55px",
fontWeight:"bold",
fontSize:"18px"
}}>
{medal} {m.rank}
</div>

{/* IMAGE */}
<img
src={m.img}
style={{
width:"42px",
height:"42px",
borderRadius:"50%",
marginRight:"10px",
objectFit:"cover"
}}
/>

{/* INFO */}
<div style={{flex:1}}>
<div style={{fontWeight:"bold"}}>{m.name}</div>
<div style={{fontSize:"12px",color:"#777"}}>
{m.line}
</div>
</div>

{/* MOVE */}
<div style={{
fontSize:"18px",
width:"30px",
textAlign:"right"
}}>
{m.move==="up" && "↑"}
{m.move==="down" && "↓"}
{m.move==="stay" && "→"}
</div>

</div>

)

})}

<MenuModal open={menuOpen} onClose={()=>setMenuOpen(false)} />

</div>

);
}