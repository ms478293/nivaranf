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
- Upload cover images directly from the portal

Auto-generated on save:
- Clean slug
- Canonical URL based on type (`/articles`, `/stories`, `/news`)
- SEO title
- SEO description/excerpt
- Reading time
- Keyword normalization
- Share message fallback

Image upload behavior:
- Endpoint: `/api/content/upload-image` (requires dashboard/content portal auth)
- Bucket: `content-images` (auto-created on first upload)
- Allowed types: JPG, PNG, WEBP, GIF, AVIF
- Max size: 50MB per file (direct browser-to-Supabase upload)

## 4) Public behavior

Published portal posts are automatically visible on:
- `/articles`
- `/stories`
- `/news`
- `/{type}/{slug}` detail pages

Existing MDX posts continue to work.
