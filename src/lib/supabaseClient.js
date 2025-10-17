import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // No mostramos error en runtime aquí para no romper la app en dev sin .env
  // El componente que use el cliente puede hacer fallback a datos locales.
  supabase = null;
}

export default supabase;
