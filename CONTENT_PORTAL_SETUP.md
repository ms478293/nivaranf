# Content Portal Setup

This adds a working publishing portal for:
- Articles
- Stories
- News
- Blogs (published under `/articles`)

Portal URLs:
- `/content-login`
- `/dashboard/content`

## 1) One-time Supabase setup

Run this SQL in your Supabase project:
- `supabase_content_portal_schema.sql`

## 2) Required env vars

These are already used by your project and must exist in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Add these for portal login:
- `CONTENT_PORTAL_USERNAME`
- `CONTENT_PORTAL_PASSWORD`
- `CONTENT_PORTAL_SESSION_SECRET`

## 3) How the portal works

Employees can:
- Create drafts
- Edit posts
- Publish posts
- Delete posts

Auto-generated on save:
- Clean slug
- Canonical URL based on type (`/articles`, `/stories`, `/news`)
- SEO title
- SEO description/excerpt
- Reading time
- Keyword normalization
- Share message fallback

## 4) Public behavior

Published portal posts are automatically visible on:
- `/articles`
- `/stories`
- `/news`
- `/{type}/{slug}` detail pages

Existing MDX posts continue to work.
