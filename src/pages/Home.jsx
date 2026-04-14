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
const [turns,setTurns] = useState({});

useEffect(()=>{
loadPoints();
loadLocal();
},[]);

function loadLocal(){
setPins(JSON.parse(localStorage.getItem("pins") || "{}"));
setTurns(JSON.parse(localStorage.getItem("turns") || "{}"));
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

// ピン
function addPin(id,e){
e.stopPropagation();

let stock = parseInt(localStorage.getItem("pinStock") || "0");

if(stock <= 0){
navigate("/pin");
return;
}

const newPins = {...pins};
newPins[id] = {expire:null,started:false};

localStorage.setItem("pins",JSON.stringify(newPins));
setPins(newPins);

localStorage.setItem("pinStock",stock - 1);
}

// 表示
function getDisplay(id){
const p = pins[id];
if(!p) return "ピンが必要";
return "使用中";
}

const filtered = characters.filter(c =>
c.name.includes(search)
);

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
<div style={{display:"flex",gap:"8px",marginBottom:"10px"}}>

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

{/* ポイント */}
<div style={{marginBottom:"10px"}}>
所持ポイント：{points}p
</div>

{/* 検索 */}
<input
placeholder="検索"
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={inputStyle}
/>

{/* キャラ一覧 */}
{filtered.map(c => (

<div key={c.id}
onClick={()=>navigate(`/chat/${c.id}`)}
style={card}>

<div onClick={(e)=>addPin(c.id,e)}>📌</div>

<img src={c.img} style={img}/>

<div style={{flex:1}}>
<div>{c.name}</div>
<div style={{fontSize:"12px",opacity:0.7}}>
{c.line}
</div>
</div>

<div>{getDisplay(c.id)}</div>

</div>

))}

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

const inputStyle = {
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