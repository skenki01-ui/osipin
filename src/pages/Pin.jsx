import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import characters from "../data/characters";
import MenuModal from "../components/MenuModal";

export default function Pin(){

const navigate = useNavigate();

const [menuOpen,setMenuOpen] = useState(false);
const [stock,setStock] = useState(0);
const [search,setSearch] = useState("");

useEffect(()=>{
setStock(parseInt(localStorage.getItem("pinStock") || "0"));
},[]);

function buy(count){
let current = parseInt(localStorage.getItem("pinStock") || "0");
current += count;
localStorage.setItem("pinStock",current);
setStock(current);
navigate("/pin");
}

/* おすすめ並び */
const displayed = useMemo(()=>{
  const q = search.trim();
  if(q){
    return characters.filter(c => c.name.includes(q));
  }
  const topIds = ["theo","rei","sora"];
  const top = characters.filter(c => topIds.includes(c.id));
  const rest = characters.filter(c => !topIds.includes(c.id));
  const shuffled = [...rest].sort(()=>Math.random() - 0.5);
  return [...top, ...shuffled];
},[search]);

return(

<div style={{
width:"375px",
margin:"0 auto",
background:"#ffeaf4",
minHeight:"100vh",
padding:"10px",
boxSizing:"border-box"
}}>

{/* HEADER */}
<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"12px"
}}>
<div onClick={()=>navigate(-1)}>←</div>
<div style={{fontWeight:"bold"}}>ピン購入</div>
<div onClick={()=>setMenuOpen(true)}>☰</div>
</div>

{/* ポイント */}
<div
onClick={()=>navigate("/pay")}
style={{
background:"#ff4d4f",
color:"#fff",
padding:"10px",
borderRadius:"10px",
marginBottom:"10px",
textAlign:"center",
fontWeight:"bold",
cursor:"pointer"
}}
>
💰 ポイントを購入する
</div>

{/* 説明 */}
<div style={{
background:"#fff",
padding:"10px",
borderRadius:"10px",
marginBottom:"10px",
fontSize:"12px",
lineHeight:"1.5"
}}>
3ターン｜24時間有効／送信で開始
</div>

{/* 所持 */}
<div style={{
marginBottom:"10px",
fontSize:"13px",
fontWeight:"bold"
}}>
所持ピン：{stock}
</div>

{/* 購入パネル */}
<div style={{
display:"flex",
flexDirection:"column",
gap:"6px",
marginBottom:"12px"
}}>

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
background:"#fff",
padding:"8px",
borderRadius:"8px"
}}>
<div style={{fontSize:"12px"}}>
1ピン（3T｜24h）
</div>
<button onClick={()=>buy(1)} style={{
background:"#ff4d4f",
color:"#fff",
padding:"6px 10px",
borderRadius:"6px",
border:"none",
fontSize:"12px"
}}>
30p
</button>
</div>

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
background:"#fff",
padding:"8px",
borderRadius:"8px"
}}>
<div style={{fontSize:"12px"}}>
3ピン（お得）
</div>
<button onClick={()=>buy(3)} style={{
background:"#ff4d4f",
color:"#fff",
padding:"6px 10px",
borderRadius:"6px",
border:"none",
fontSize:"12px"
}}>
80p
</button>
</div>

</div>

<input
placeholder="検索"
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{
width:"100%",
padding:"8px",
borderRadius:"8px",
border:"1px solid #ccc",
marginBottom:"6px"
}}
/>

<div style={{fontWeight:"bold",marginBottom:"8px"}}>
メンバー紹介
</div>

{displayed.map(c => (

<div
key={c.id}
onClick={()=>navigate(`/chat/${c.id}`)}
style={{
display:"flex",
alignItems:"center",
background:"#fff",
padding:"8px",
borderRadius:"8px",
marginBottom:"6px",
cursor:"pointer"
}}
>

<img src={c.img} style={{
width:"28px",
height:"28px",
borderRadius:"6px",
marginRight:"8px"
}}/>

<div>
<div style={{fontWeight:"bold",fontSize:"13px"}}>{c.name}</div>
<div style={{fontSize:"11px",opacity:0.7}}>
{c.line}
</div>
</div>

</div>

))}

<MenuModal open={menuOpen} onClose={()=>setMenuOpen(false)} />

</div>

);
}