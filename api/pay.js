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

    // ⭐決済
    await payjp.charges.create({
      amount: amount,
      card: token,
      currency: "jpy"
    });

    // ⭐ユーザー取得（ここ修正）
    const { data } = await supabase
      .from("users")
      .select("point")
      .eq("id", userId)
      .maybeSingle(); // ←これが重要

    const currentPoint = data?.point || 0;

    const addPoint = Math.floor(amount / 10);
    const newPoint = currentPoint + addPoint;

    // ⭐更新
    await supabase
      .from("users")
      .upsert({
        id: userId,
        point: newPoint
      });

    return res.status(200).json({ success:true });

  }catch(err){

    console.error(err);
    return res.status(500).json({ success:false, error: err.message });

  }

}