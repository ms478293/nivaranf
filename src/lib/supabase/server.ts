import { createClient } from "@supabase/supabase-js";

const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const rawSupabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const FALLBACK_SUPABASE_URL = "https://placeholder.supabase.co";
const FALLBACK_SUPABASE_KEY = "placeholder-key";

const supabaseUrl = rawSupabaseUrl || FALLBACK_SUPABASE_URL;
const supabaseServiceKey =
  rawSupabaseServiceKey || rawSupabaseAnonKey || FALLBACK_SUPABASE_KEY;

export const hasSupabaseServerEnv = Boolean(rawSupabaseUrl && rawSupabaseServiceKey);

if (!hasSupabaseServerEnv && process.env.NODE_ENV !== "production") {
  console.warn(
    "Supabase server env vars are missing. Falling back to placeholder admin client."
  );
}

// Server-side Supabase client with service role (for API routes)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
