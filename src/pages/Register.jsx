import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Register(){

const [name,setName] = useState("");
const navigate = useNavigate();

const start = async () => {

if(!name.trim()){
alert("ニックネーム入れて");
return;
}

const userId = crypto.randomUUID();

// ブラウザ保存
localStorage.setItem("name",name);
localStorage.setItem("user_id",userId);

// usersテーブルに保存（なければ作る）
await supabase
.from("users")
.upsert({
id: userId,
nickname: name,
points: 100
});

navigate("/home");

};

return(

<div style={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#ffeaf4"
}}>

<div style={{textAlign:"center",width:"260px"}}>

<h1>OSHIPIN</h1>

<p style={{marginBottom:"20px"}}>
推しとチャットができるコミュニケーションアプリ
</p>

<input
placeholder="ニックネーム"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{
padding:"10px",
borderRadius:"10px",
border:"1px solid #ccc",
width:"100%"
}}
/>

<br/>

<button
type="button"
onClick={start}
style={{
marginTop:"20px",
padding:"10px",
width:"100%",
background:"#ff4fa3",
border:"none",
color:"#fff",
borderRadius:"10px",
cursor:"pointer"
}}
>
はじめる
</button>

{/* ⭐PWA */}
<div style={{
fontSize:"11px",
marginTop:"15px",
opacity:0.7
}}>
📱 ホーム画面に追加するとアプリのように使えます
</div>

{/* ⭐規約 */}
<div style={{
fontSize:"11px",
marginTop:"8px",
lineHeight:"1.6"
}}>

<span
onClick={()=>navigate("/terms")}
style={{textDecoration:"underline",cursor:"pointer"}}
>
利用規約
</span>

{" / "}

<span
onClick={()=>navigate("/privacy")}
style={{textDecoration:"underline",cursor:"pointer"}}
>
プライバシー
</span>

{" / "}

<span
onClick={()=>navigate("/tokushoho")}
style={{textDecoration:"underline",cursor:"pointer"}}
>
特商法
</span>

{" / "}

<span
onClick={()=>navigate("/contact")}
style={{textDecoration:"underline",cursor:"pointer"}}
>
お問い合わせ
</span>

</div>

</div>

</div>

);

}