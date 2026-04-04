import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import characters from "../data/characters";
import { drawCard } from "../logic/cardLogic.jsx";
import MenuModal from "../components/MenuModal";
import { supabase } from "../lib/supabase";

export default function Chat(){

const { id } = useParams();
const navigate = useNavigate();

const character = characters.find(c => c.id === id?.toLowerCase());

const [menuOpen,setMenuOpen] = useState(false);
const [messages,setMessages] = useState([]);
const [input,setInput] = useState("");
const [turn,setTurn] = useState(3);
const [points,setPoints] = useState(0);
const [isPinned,setIsPinned] = useState(false);
const [remainTime,setRemainTime] = useState("");
const [isSub,setIsSub] = useState(false);
const [isDay,setIsDay] = useState(false);

const bottomRef = useRef(null);

/* ID固定 */
let userId = localStorage.getItem("user_id");
if(!userId){
userId = crypto.randomUUID();
localStorage.setItem("user_id", userId);
}

const userName = localStorage.getItem("name") || "ねえ";

if(!character){
return <div style={{padding:"20px"}}>キャラが見つかりません</div>;
}

useEffect(()=>{
loadMessages();
loadPoints();
checkPin();
loadTurn();
checkSub();
checkDay();
},[]);


// =====================
// サブスク
// =====================
function checkSub(){
const sub = localStorage.getItem(`sub_${character.id}`);
if(sub){
setIsSub(true);
}
}

function startSub(){
const ok = window.confirm("このキャラで使い放題にしますか？（月額2000円）");
if(!ok) return;
localStorage.setItem(`sub_${character.id}`, "1");
setIsSub(true);
alert("使い放題になりました");
}


// =====================
// 1DAY
// =====================
function checkDay(){
const end = localStorage.getItem(`day_${character.id}`);
if(!end) return;

const diff = end - Date.now();

if(diff > 0){
setIsDay(true);
}else{
localStorage.removeItem(`day_${character.id}`);
setIsDay(false);
}
}

function startDay(){
const end = Date.now() + 24 * 60 * 60 * 1000;
localStorage.setItem(`day_${character.id}`, end);
setIsDay(true);
alert("24時間使い放題になりました");
}


// =====================
// ターン
// =====================
function loadTurn(){
const saved = JSON.parse(localStorage.getItem("pinTurns") || "{}");
if(saved[character.id] !== undefined){
setTurn(saved[character.id]);
}
}


// =====================
// ピン
// =====================
function checkPin(){

const pins = JSON.parse(localStorage.getItem("pins") || "{}");
const now = Date.now();

const data = pins[character.id];
const expire = typeof data === "object" ? data.expire : data;

if(expire && expire > now){

setIsPinned(true);

const diff = expire - now;
const h = Math.floor(diff / 1000 / 60 / 60);
const m = Math.floor((diff / 1000 / 60) % 60);

setRemainTime(`${h}h ${m}m`);

}else{

setIsPinned(false);
setRemainTime("");

}

}


// =====================
// ポイント
// =====================
async function loadPoints(){

if(!userId) return;

let { data, error } = await supabase
.from("users")
.select("points")
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

if(data){
setPoints(data.points);
}
}

async function updatePoints(newPoints){

setPoints(newPoints);

await supabase
.from("users")
.update({points:newPoints})
.eq("id",userId);

}


// =====================
// メッセージ
// =====================
async function loadMessages(){

const { data } = await supabase
.from("messages")
.select("*")
.eq("character_id",character.id)
.eq("user_id",userId)
.order("created_at",{ascending:true});

if(data){

const formatted = data.map(m=>({
role:m.role === "user" ? "user" : "ai",
text:m.content
}));

setMessages(formatted);

}

}


// =====================
// スクロール
// =====================
useEffect(()=>{
bottomRef.current?.scrollIntoView({behavior:"smooth"});
},[messages]);


// =====================
// 送信
// =====================
async function send(){

if(!input.trim()) return;

const pins = JSON.parse(localStorage.getItem("pins") || {});
let p = pins[character.id];
const now = Date.now();

if(p && !p.started){
const end = now + 24 * 60 * 60 * 1000;
pins[character.id] = {...p,started:true,expire:end};
localStorage.setItem("pins", JSON.stringify(pins));
p = pins[character.id];
}

const canUse =
(p && p.started && p.expire > now)
|| isSub
|| isDay;

if(!canUse){
alert("ピンが必要です");
return;
}

const { data } = await supabase
.from("users")
.select("points")
.eq("id",userId)
.single();

const latestPoints = data?.points || 0;

if(!isSub && !isDay){

if(turn === 0){

if(latestPoints < 5){
alert("ポイントもターンもありません");
return;
}

const newPoints = latestPoints - 5;
await updatePoints(newPoints);

}else{

setTurn(t => {

const next = t - 1;

const pinTurns = JSON.parse(localStorage.getItem("pinTurns") || {});
pinTurns[character.id] = next;
localStorage.setItem("pinTurns", JSON.stringify(pinTurns));

return next;

});

}

}

const currentInput = input;

setMessages(prev => [...prev,{role:"user",text:currentInput}]);
setInput("");

await supabase.from("messages").insert({
user_id:userId,
character_id:character.id,
role:"user",
content:currentInput
});

setTimeout(async ()=>{

let fullText = `${userName}と話せて嬉しい`;

setMessages(prev => [...prev,{role:"ai",text:""}]);

let index = 0;

const interval = setInterval(()=>{
index++;
setMessages(prev=>{
const newMessages = [...prev];
newMessages[newMessages.length - 1].text = fullText.slice(0,index);
return newMessages;
});
if(index >= fullText.length){
clearInterval(interval);
}
},120);

await supabase.from("messages").insert({
user_id:userId,
character_id:character.id,
role:"ai",
content:fullText
});

checkPin();

},300);

}


// =====================
// ターン購入
// =====================
function addTurn(){

if(points < 5){
alert("ポイント不足");
return;
}

const newPoints = points - 5;
updatePoints(newPoints);

setTurn(t => {

const next = t + 1;

const pinTurns = JSON.parse(localStorage.getItem("pinTurns") || {});
pinTurns[character.id] = next;
localStorage.setItem("pinTurns", JSON.stringify(pinTurns));

return next;

});

}


// =====================
// ギフト
// =====================
async function gift(price){

if(points < price){
alert("ポイント不足");
return;
}

const newPoints = points - price;
await updatePoints(newPoints);

const card = drawCard(character.id);

await supabase.from("cards").insert({
user_id:userId,
character_id:character.id,
card_no:card
});

setMessages(prev => [
...prev,
{role:"ai",text:"ありがとう♡"},
{role:"ai",text:`${character.name}カード ${card} を獲得！`}
]);

}

function vip(){
alert("VIPメッセージ送信");
}


// =====================
// UI
// =====================
return(

<div style={{
width:"375px",
margin:"0 auto",
height:"100vh",
display:"flex",
flexDirection:"column",
background:"#ffeaf4"
}}>

<div style={{
display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"10px",
background:"#fff",
borderBottom:"1px solid #eee"
}}>

<div onClick={()=>navigate("/home")}>←</div>

<div style={{display:"flex",alignItems:"center"}}>
<img src={character.img} style={{
width:"30px",
height:"30px",
borderRadius:"50%",
marginRight:"8px"
}}/>
<div>{character.name}</div>
</div>

<div style={{display:"flex",alignItems:"center",gap:"10px"}}>

<div style={{fontSize:"12px"}}>
{points}p
</div>

<div style={{fontSize:"12px"}}>
{isSub || isDay ? "使い放題" : isPinned ? `📍 ${remainTime}` : "なし"}
</div>

<div style={{fontSize:"12px"}}>
{isSub || isDay ? "" : `残${turn}`}
</div>

<div onClick={()=>setMenuOpen(true)}>☰</div>

</div>

</div>

<div style={{flex:1,overflow:"auto",padding:"10px"}}>
{messages.map((m,i)=>(

<div key={i} style={{
display:"flex",
marginBottom:"10px",
justifyContent:m.role==="user"?"flex-end":"flex-start"
}}>

{m.role==="ai" && (
<img src={character.img} style={{
width:"28px",
height:"28px",
borderRadius:"50%",
marginRight:"8px"
}}/>
)}

<div style={{
background:m.role==="user"?"#0066ff":"#fff",
color:m.role==="user"?"#fff":"#000",
padding:"10px",
borderRadius:"10px",
maxWidth:"70%"
}}>
{m.text}
</div>

</div>

))}
<div ref={bottomRef}></div>
</div>

{!isSub && !isDay && turn === 0 && (
<div style={{padding:"10px",background:"#fff"}}>

<div style={{marginBottom:"8px",fontSize:"13px"}}>
もう少し話す？
</div>

<div style={{display:"flex",gap:"8px"}}>

<button onClick={addTurn} style={{
flex:1,
background:"#ffa64d",
color:"#fff",
padding:"10px",
borderRadius:"10px",
border:"none"
}}>
+1ターン 5p
</button>

<button onClick={startDay} style={{
flex:1,
background:"#ff4d4f",
color:"#fff",
padding:"10px",
borderRadius:"10px",
border:"none"
}}>
1DAY
</button>

<button onClick={startSub} style={{
flex:1,
background:"#333",
color:"#fff",
padding:"10px",
borderRadius:"10px",
border:"none"
}}>
使い放題
</button>

</div>

</div>
)}

<div style={{display:"flex",padding:"10px",background:"#fff"}}>
<input
value={input}
onChange={e=>setInput(e.target.value)}
style={{
flex:1,
padding:"10px",
borderRadius:"10px",
border:"1px solid #ccc"
}}
/>

<button onClick={send} style={{marginLeft:"10px"}}>
送信
</button>
</div>

<div style={{
display:"flex",
justifyContent:"space-around",
padding:"10px",
background:"#fff",
borderTop:"1px solid #eee"
}}>
<button onClick={()=>gift(100)}>🌸100</button>
<button onClick={()=>gift(500)}>🎁500</button>
<button onClick={()=>gift(1000)}>💎1000</button>
<button onClick={vip}>⭐VIP</button>
</div>

<MenuModal open={menuOpen} onClose={()=>setMenuOpen(false)} />

</div>

);
}