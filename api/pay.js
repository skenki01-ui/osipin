import Payjp from "payjp";
import { createClient } from "@supabase/supabase-js";

const payjp = Payjp(process.env.PAYJP_SECRET_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res){

  if(req.method !== "POST"){
    return res.status(405).end();
  }

  try{

    const { token, amount, userId } = req.body;

    // ⭐金額チェック（改ざん防止）
    const validAmounts = [100,300,500,1000,3000,10000];

    if(!validAmounts.includes(amount)){
      return res.status(400).json({ success:false, error:"invalid amount" });
    }

    // ⭐決済
    await payjp.charges.create({
      amount: amount,
      card: token,
      currency: "jpy"
    });

    // ⭐ユーザー取得
    const { data } = await supabase
      .from("users")
      .select("points")
      .eq("id", userId)
      .maybeSingle();

    const currentPoints = data?.points || 0;

    const addPoints = Math.floor(amount / 10);
    const newPoints = currentPoints + addPoints;

    // ⭐更新（updateに変更）
    await supabase
      .from("users")
      .update({ points: newPoints })
      .eq("id", userId);

    return res.status(200).json({ success:true });

  }catch(err){

    console.error(err);
    return res.status(500).json({ success:false, error: err.message });

  }

}