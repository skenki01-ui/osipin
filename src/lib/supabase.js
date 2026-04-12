import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uwbvphrrgntyqkxujsez.supabase.co";
const supabaseAnonKey = "sb_publishable_wpMruzZPWZ9ZBoIZMR4ZVw_2Xs5t3fe";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);