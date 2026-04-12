import React from "react";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import characters from "../data/characters";
import MenuModal from "../components/MenuModal";
import { supabase } from "../lib/supabase";

export default function Home(){

/* ⭐追加（ID固定） */
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


/* ⭐ここだけ修正（406対策） */
async function loadPoints(){

if(!userId) return;

let { data, error } = await supabase
.from("users")
.select("*")
.eq("id",userId)
.single();

if(error){

const { data: newUser } = await supabase
.from("users")
.insert({
id: userId,
points: 0
})
.select()
.single();

setPoints(newUser.points);
return;
}

setPoints(data.points || 0);
}


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

const newTurns = {...turns};
newTurns[id] = {
pin:3,
carry:(newTurns[id]?.carry || 0)
};

localStorage.setItem("turns",JSON.stringify(newTurns));
setTurns(newTurns);

localStorage.setItem("pinStock",stock - 1);
}


function getDisplay(id){

const p = pins[id];
const t = turns[id];

if(!p) return "ピンが必要";

const total = (t?.pin || 0) + (t?.carry || 0);

if(!p.started) return `残${total}`;

const diff = p.expire - Date.now();

if(diff <= 0) return "ピンが必要";

const h = Math.floor(diff / 1000 / 60 / 60);
const m = Math.floor((diff / 1000 / 60) % 60);

if(h > 0){
return `残${total}｜${h}h${m}m`;
}else{
return `残${total}｜${m}m`;
}
}


function isActivePin(id){

const p = pins[id];

if(!p) return false;

if(!p.started) return true;

return p.expire > Date.now();
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
padding:"10px",
boxSizing:"border-box"
}}>

{/* ⭐サービス説明（審査用） */}
<div style={{
fontSize:"12px",
marginBottom:"10px",
lineHeight:"1.5"
}}>
AIキャラクターとチャットができるサービスです。
ポイントを購入して会話を楽しめます。
</div>

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"10px"
}}>

<div onClick={()=>navigate(-1)} style={{cursor:"pointer"}}>◀︎</div>
<div style={{fontWeight:"bold"}}>HOME</div>
<div onClick={()=>setMenuOpen(true)} style={{cursor:"pointer"}}>☰</div>

</div>

<div style={{
display:"flex",
gap:"8px",
marginBottom:"10px"
}}>

<button
onClick={()=>navigate("/pin")}
style={{
flex:1,
padding:"8px",
borderRadius:"10px",
border:"1px solid #ccc",
background:"#fff"
}}
>
📌ピン購入
</button>

<button
onClick={()=>navigate("/rank")}
style={{
flex:1,
padding:"8px",
borderRadius:"10px",
border:"1px solid #ccc",
background:"#fff"
}}
>
⭐ランキング
</button>

<button
onClick={()=>navigate("/cards")}
style={{
flex:1,
padding:"8px",
borderRadius:"10px",
border:"1px solid #ccc",
background:"#fff"
}}
>
🧾カード
</button>

</div>

{/* ⭐料金表示（超重要） */}
<div style={{
fontSize:"12px",
marginBottom:"10px",
background:"#fff",
padding:"8px",
borderRadius:"8px"
}}>
料金：
・1ターン＝5ポイント（約50円）
・1DAYパス＝80ポイント
・月額プランあり（1200円 / 1900円）
</div>

<div style={{
marginBottom:"10px",
fontSize:"14px"
}}>
所持ポイント：{points}p
</div>

<input
placeholder="メンバー検索"
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{
width:"100%",
padding:"10px",
borderRadius:"10px",
border:"1px solid #ccc",
marginBottom:"10px",
boxSizing:"border-box"
}}
/>

{filtered.map(c => {

const active = isActivePin(c.id);

return(

<div
key={c.id}
onClick={()=>navigate(`/chat/${c.id}`)}
style={{
display:"flex",
alignItems:"center",
background:"#fff",
padding:"10px",
borderRadius:"10px",
marginBottom:"8px",
cursor:"pointer"
}}
>

<div
onClick={(e)=>addPin(c.id,e)}
style={{
marginRight:"8px",
minWidth:"20px",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"16px",
filter: active ? "none" : "grayscale(1)",
opacity: active ? 1 : 0.35
}}
>
📌
</div>

<img
src={c.img}
style={{
width:"32px",
height:"32px",
borderRadius:"8px",
marginRight:"8px",
flexShrink:0
}}
/>

<div style={{
flex:1,
display:"flex",
alignItems:"center",
overflow:"hidden",
whiteSpace:"nowrap",
minWidth:0
}}>

<span style={{
fontWeight:"bold",
marginRight:"6px",
flexShrink:0
}}>
{c.name}
</span>

<span style={{
fontSize:"12px",
opacity:0.7,
overflow:"hidden",
textOverflow:"ellipsis"
}}>
{c.line}
</span>

</div>

<div style={{
fontSize:"12px",
marginLeft:"6px",
whiteSpace:"nowrap",
flexShrink:0
}}>
{getDisplay(c.id)}
</div>

</div>

);

})}

{/* ⭐フッターリンク（審査で超重要） */}
<div style={{
fontSize:"11px",
marginTop:"20px",
textAlign:"center",
lineHeight:"1.6"
}}>

<span onClick={()=>navigate("/terms")} style={{textDecoration:"underline",cursor:"pointer"}}>
利用規約
</span>

{" / "}

<span onClick={()=>navigate("/privacy")} style={{textDecoration:"underline",cursor:"pointer"}}>
プライバシー
</span>

{" / "}

<span onClick={()=>navigate("/tokushoho")} style={{textDecoration:"underline",cursor:"pointer"}}>
特商法
</span>

{" / "}

<span onClick={()=>navigate("/contact")} style={{textDecoration:"underline",cursor:"pointer"}}>
お問い合わせ
</span>

</div>

<MenuModal open={menuOpen} onClose={()=>setMenuOpen(false)} />

</div>

);
}