import React from "react";
import Payjp from "@payjp/payjs";

export default function PayButton(){

const payjp = Payjp(process.env.VITE_PAYJP_PUBLIC_KEY);

async function handlePay(){

const elements = payjp.elements();
const card = elements.create("card");

card.mount("#card-element");

// ⭐カード入力後にトークン化
const { token, error } = await payjp.createToken(card);

if(error){
alert(error.message);
return;
}

// ⭐サーバーへ送信
await fetch("/api/pay", {
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
token: token.id,
amount: 1000 // 1000円
})
});

alert("決済完了");
}

return(

<div>

<div id="card-element" style={{
border:"1px solid #ccc",
padding:"10px",
marginBottom:"10px"
}}></div>

<button onClick={handlePay}>
支払う（1000円）
</button>

</div>

);
}