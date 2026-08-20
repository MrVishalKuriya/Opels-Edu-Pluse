// ─── Supabase Client (Vite-compatible) ───────────────────────────────────────
// Supabase quickstart uses process.env (Create React App only).
// Vite uses import.meta.env with VITE_ prefix — this is the correct version.

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠️ Supabase env vars missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
