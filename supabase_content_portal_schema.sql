-- Nivaran Content Portal Schema
-- Run this once in Supabase SQL Editor.

create extension if not exists "uuid-ossp";

create table if not exists content_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  content_type text not null check (content_type in ('Article', 'Story', 'News', 'Blog')),
  status text not null default 'draft' check (status in ('draft', 'published')),
  excerpt text not null,
  body text not null,
  author text not null default 'Nivaran Foundation News Desk',
  location text not null default 'Nepal',
  cover_image_url text,
  cover_image_alt text,
  cover_image_caption text,
  keywords text[] not null default '{}'::text[],
  featured boolean not null default false,
  share_message text not null default '',
  donate_line text,
  author_bio text,
  seo_title text not null,
  seo_description text not null,
  canonical_url text not null,
  reading_time_minutes integer not null default 1 check (reading_time_minutes > 0),
  published_at timestamptz,
  created_by text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists content_posts_status_idx on content_posts(status);
create index if not exists content_posts_type_idx on content_posts(content_type);
create index if not exists content_posts_published_at_idx on content_posts(published_at desc nulls last);
create index if not exists content_posts_slug_idx on content_posts(slug);

create or replace function update_content_posts_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_content_posts_updated_at on content_posts;
create trigger set_content_posts_updated_at
before update on content_posts
for each row
execute function update_content_posts_updated_at();

alter table content_posts enable row level security;

drop policy if exists "Public can view published content posts" on content_posts;
create policy "Public can view published content posts"
  on content_posts for select
  using (status = 'published');

drop policy if exists "Authenticated users can manage content posts" on content_posts;
create policy "Authenticated users can manage content posts"
  on content_posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
