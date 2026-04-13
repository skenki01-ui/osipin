import { useState, useEffect } from "react";
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

<div style={{fontSize:"12px",marginBottom:"10px"}}>
AIキャラクターとチャットができるサービスです。
</div>

<div style={{display:"flex",justifyContent:"space-between"}}>
<div onClick={()=>navigate(-1)}>◀︎</div>
<div>HOME</div>
<div onClick={()=>setMenuOpen(true)}>☰</div>
</div>

<input
placeholder="検索"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

{filtered.map(c => (
<div key={c.id} onClick={()=>navigate(`/chat/${c.id}`)}>
{c.name}
</div>
))}

<MenuModal open={menuOpen} onClose={()=>setMenuOpen(false)} />

</div>

);
}