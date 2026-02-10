-- Messages Table for Contact Form
create table if not exists messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text default 'unread', -- 'unread', 'read', 'replied'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Messages
alter table messages enable row level security;

-- Public can insert messages
create policy "Anyone can submit message" on messages for insert with check (true);

-- Admins can view messages
create policy "Admins can view messages" on messages for select using (auth.role() = 'authenticated');
