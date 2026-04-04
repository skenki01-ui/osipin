import { useState } from "react";
import characters from "../data/characters";

export default function useFanData(){

const [members] = useState(characters);
const [pins,setPins] = useState([]);
const [recent,setRecent] = useState([]);
const [point,setPoint] = useState(30);

function pinMember(memberId){

if(pins.includes(memberId)) return;

setPins([...pins,memberId]);

}

function openChat(memberId){

const updated = [
memberId,
...recent.filter(id => id !== memberId)
];

setRecent(updated.slice(0,5));

}

function buildRanking(){

return members.map((m,i)=>({

...m,
rank:i+1,
move: i % 3 === 0 ? "up" : i % 3 === 1 ? "down" : "stay"

}));

}

return{

members,
pins,
recent,
point,
pinMember,
openChat,
buildRanking

};

}