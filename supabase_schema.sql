-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Jobs Table
create table if not exists jobs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  type text not null, -- 'Full Time', 'Part Time', etc.
  apply_before date,
  positions_open integer default 1,
  introduction text,
  responsibilities text[],
  requirements text[],
  benefits jsonb default '{}'::jsonb,
  additional_info jsonb default '{}'::jsonb,
  status text default 'active', -- 'active', 'closed', 'draft'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Volunteer Programs Table
create table if not exists volunteer_programs (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  location text not null,
  start_date date,
  end_date date,
  description text,
  responsibilities text[],
  status text default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Applications Table
create table if not exists applications (
  id uuid default uuid_generate_v4() primary key,
  type text not null, -- 'job' or 'volunteer'
  related_id uuid, -- ID of the job or volunteer program
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  address text,
  resume_url text,
  cover_letter text,
  status text default 'pending', -- 'pending', 'reviewed', 'accepted', 'rejected'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Subscribers Table
create table if not exists subscribers (
  id uuid default uuid_generate_v4() primary key,
  email text not null unique,
  status text default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Banners Table
create table if not exists banners (
  id uuid default uuid_generate_v4() primary key,
  message text not null,
  link text,
  link_text text,
  active boolean default false,
  position text default 'top', -- 'top', 'bottom', 'hero'
  type text default 'info', -- 'info', 'warning', 'success'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Row Level Security)
-- Enable RLS
alter table jobs enable row level security;
alter table volunteer_programs enable row level security;
alter table applications enable row level security;
alter table subscribers enable row level security;
alter table banners enable row level security;

-- Policies
-- Public read access for jobs, volunteer_programs, banners
create policy "Public jobs are viewable by everyone" on jobs for select using (true);
create policy "Public volunteer_programs are viewable by everyone" on volunteer_programs for select using (true);
create policy "Public banners are viewable by everyone" on banners for select using (true);

-- Applications: Insert only for public, Select only for authenticated (admins)
create policy "Anyone can submit application" on applications for insert with check (true);
create policy "Admins can view applications" on applications for select using (auth.role() = 'authenticated'); -- Assuming authenticated users are admins for now, or use service_role

-- Subscribers: Insert only for public
create policy "Anyone can subscribe" on subscribers for insert with check (true);
create policy "Admins can view subscribers" on subscribers for select using (auth.role() = 'authenticated');

-- Storage Bucket for Resumes
-- insert into storage.buckets (id, name) values ('resumes', 'resumes');
-- create policy "Resume Uploads" on storage.objects for insert with check ( bucket_id = 'resumes' );
-- create policy "Resume Read" on storage.objects for select using ( bucket_id = 'resumes' and auth.role() = 'authenticated' );
