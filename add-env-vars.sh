#!/bin/bash

# Add environment variables to Vercel
echo "Adding environment variables to Vercel..."

# Add Supabase URL
echo "https://okgzbyzwrylapbyfbbqw.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development

# Add Supabase Anon Key
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rZ3pieXp3cnlsYXBieWZiYnF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2ODg3NTQsImV4cCI6MjA4NjI2NDc1NH0.rLr2wz6bmuwEFup-t_Wzb2AH9ThjsGFt54d7rdN77e4" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production preview development

# Add Supabase Service Role Key
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rZ3pieXp3cnlsYXBieWZiYnF3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDY4ODc1NCwiZXhwIjoyMDg2MjY0NzU0fQ.WUd9GcRjGdoCfhMtUh2RVF9c4DGQeWLCDVV2GtB5UqM" | vercel env add SUPABASE_SERVICE_ROLE_KEY production preview development

# Add Resend API Key
echo "re_RuYu8ipY_EJVbVVFC4GGp3Wo9cqr37h6V" | vercel env add RESEND_API_KEY production preview development

echo "Done! Now trigger a redeploy in Vercel dashboard."
