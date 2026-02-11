# Vercel Environment Variables Setup

Your site is failing because Vercel needs the environment variables. Here's what you need to do:

## Quick Setup Steps:

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**: `nivaranf-tsza`
3. **Go to Settings → Environment Variables**
4. **Add these variables** (one at a time):

```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
RESEND_API_KEY=<your-resend-api-key>
IPINFO_API_KEY=<your-ipinfo-api-key>
```

5. **Select Environment**: Choose "Production", "Preview", and "Development" for all
6. **Save each one**

## After Adding Variables:

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **three dots (•••)** menu
4. Select **"Redeploy"**
5. Wait for deployment to complete (~2-3 minutes)

## Get Your API Keys:

- **Supabase**: https://app.supabase.com → Your Project → Settings → API
- **Resend**: https://resend.com/api-keys
- **IPInfo**: https://ipinfo.io/account/token (optional - used for geolocation)

## Still Getting 404?

If you still see 404 after adding environment variables and redeploying:

1. Check the **Deployment Logs** in Vercel
2. Look for any error messages
3. Make sure the build completes successfully (you'll see a green checkmark)

---

**Need help?** The environment variables from your local `.env.local` file need to be copied to Vercel manually.
