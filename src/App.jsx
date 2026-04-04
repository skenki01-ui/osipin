import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register(){

const navigate = useNavigate();

return(

<div style={{
width:"375px",
margin:"0 auto",
minHeight:"100vh",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
background:"#ffeaf4",
padding:"20px",
boxSizing:"border-box"
}}>

<div style={{marginBottom:"20px",fontSize:"18px",fontWeight:"bold"}}>
ひそひそ
</div>

<input
placeholder="なんて呼ばれたい？"
style={{
width:"100%",
padding:"12px",
borderRadius:"10px",
border:"1px solid #ccc",
marginBottom:"10px"
}}
onChange={(e)=>{
localStorage.setItem("name",e.target.value);
}}
/>

<button
onClick={()=>navigate("/home")}
style={{
width:"100%",
padding:"12px",
borderRadius:"10px",
border:"none",
background:"#ff4d4f",
color:"#fff",
marginBottom:"20px"
}}
>
はじめる
</button>

{/* ⭐PWA説明 */}
<div style={{
fontSize:"11px",
textAlign:"center",
marginBottom:"10px"
}}>
📱 ホーム画面に追加するとアプリのように使えます
</div>

{/* ⭐法律リンク */}
<div style={{
fontSize:"11px",
textAlign:"center"
}}>

<span
onClick={()=>navigate("/terms")}
style={{textDecoration:"underline",cursor:"pointer"}}
>
利用規約
</span>

{" / "}

<span
onClick={()=>navigate("/tokushoho")}
style={{textDecoration:"underline",cursor:"pointer"}}
>
特商法
</span>

</div>

</div>

);
}