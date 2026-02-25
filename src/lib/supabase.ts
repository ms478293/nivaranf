import { createClient } from "@supabase/supabase-js";

const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const rawServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const FALLBACK_SUPABASE_URL = "https://placeholder.supabase.co";
const FALLBACK_SUPABASE_KEY = "placeholder-key";

const supabaseUrl = rawSupabaseUrl || FALLBACK_SUPABASE_URL;
const supabaseAnonKey = rawSupabaseAnonKey || FALLBACK_SUPABASE_KEY;

export const hasSupabasePublicEnv = Boolean(rawSupabaseUrl && rawSupabaseAnonKey);
export const hasSupabaseServiceEnv = Boolean(rawSupabaseUrl && rawServiceRoleKey);

if (!hasSupabasePublicEnv && process.env.NODE_ENV !== "production") {
  console.warn(
    "Supabase public env vars are missing. Falling back to placeholder client."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For server-side operations that require admin privileges (use with caution)
export const getServiceSupabase = () => {
  const serviceRoleKey = rawServiceRoleKey || rawSupabaseAnonKey || FALLBACK_SUPABASE_KEY;
  return createClient(supabaseUrl, serviceRoleKey);
};
