import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Pay(){

const navigate = useNavigate();
const [points,setPoints] = useState(0);

const userId = localStorage.getItem("user_id");

useEffect(()=>{
loadPoints();
},[]);


// =====================
// ポイント取得
// =====================
async function loadPoints(){

const { data } = await supabase
.from("users")
.select("points")
.eq("id",userId)
.single();

if(data){
setPoints(data.points || 0);
}

}


// =====================
// 購入（仮：テスト）
/* 👉 本番はPay.jpに差し替え */
// =====================
async function buy(p){

const ok = window.confirm(`${p}ポイント購入しますか？`);
if(!ok) return;

/* ⭐ここだけ修正 */
const { data } = await supabase
.from("users")
.select("points")
.eq("id",userId)
.single();

const latestPoints = data?.points || 0;

const newPoints = latestPoints + p;

await supabase
.from("users")
.update({points:newPoints})
.eq("id",userId);

setPoints(newPoints);

alert(`${p}ポイント追加しました`);

}


// =====================
// UI
// =====================
return(

<div style={{
width:"375px",
margin:"0 auto",
minHeight:"100vh",
background:"#ffeaf4",
padding:"20px"
}}>

{/* ヘッダー */}
<div style={{
display:"flex",
justifyContent:"space-between",
marginBottom:"20px"
}}>
<div onClick={()=>navigate(-1)}>←</div>
<div>ポイント購入</div>
<div></div>
</div>


{/* 所持ポイント */}
<div style={{
marginBottom:"20px",
fontWeight:"bold"
}}>
所持ポイント：{points}p
</div>


{/* 説明 */}
<div style={{
fontSize:"13px",
marginBottom:"20px"
}}>
1p = 10円
</div>


{/* 商品一覧 */}
<div style={{
display:"flex",
flexDirection:"column",
gap:"10px"
}}>

{/* 100円 */}
<button onClick={()=>buy(10)} style={btnStyle}>
100円 → 10p
</button>

{/* 300円 */}
<button onClick={()=>buy(30)} style={btnStyle}>
300円 → 30p
</button>

{/* 500円 */}
<button onClick={()=>buy(50)} style={btnStyle}>
500円 → 50p
</button>

{/* ⭐おすすめ */}
<button onClick={()=>buy(100)} style={{
...btnStyle,
background:"#ff4d4f",
color:"#fff"
}}>
🔥1000円 → 100p（おすすめ）
</button>

{/* 3000円 */}
<button onClick={()=>buy(300)} style={btnStyle}>
3000円 → 300p
</button>

{/* 10000円 */}
<button onClick={()=>buy(1000)} style={btnStyle}>
10000円 → 1000p
</button>

</div>


</div>

);
}


// =====================
// 共通ボタン
// =====================
const btnStyle = {
padding:"14px",
borderRadius:"12px",
border:"none",
background:"#fff",
fontSize:"14px",
cursor:"pointer"
};