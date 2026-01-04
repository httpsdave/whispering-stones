-- Migration to add multiple graveyards support

-- Create graveyards table
create table if not exists graveyards (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  theme text not null default 'stillwater',
  is_active boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add graveyard_id to deceased table
alter table deceased add column if not exists graveyard_id uuid references graveyards(id) on delete cascade;

-- Enable Row Level Security for graveyards
alter table graveyards enable row level security;

-- Graveyards policies
create policy "Users can view their own graveyards"
  on graveyards for select
  using (auth.uid() = user_id);

create policy "Users can insert their own graveyards"
  on graveyards for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own graveyards"
  on graveyards for update
  using (auth.uid() = user_id);

create policy "Users can delete their own graveyards"
  on graveyards for delete
  using (auth.uid() = user_id);

-- Migrate existing data: Create default graveyard for each user
insert into graveyards (user_id, name, theme, is_active)
select 
  id,
  coalesce(graveyard_name, 'My Graveyard'),
  coalesce(graveyard_theme, 'stillwater'),
  true
from profiles
where not exists (
  select 1 from graveyards where graveyards.user_id = profiles.id
);

-- Update deceased records to link to the default graveyard
update deceased
set graveyard_id = (
  select id from graveyards 
  where graveyards.user_id = deceased.user_id 
  and graveyards.is_active = true
  limit 1
)
where graveyard_id is null;

-- Make graveyard_id required after migration
alter table deceased alter column graveyard_id set not null;

-- Create index for better performance
create index if not exists idx_graveyards_user_id on graveyards(user_id);
create index if not exists idx_graveyards_active on graveyards(user_id, is_active);
create index if not exists idx_deceased_graveyard_id on deceased(graveyard_id);

-- Function to ensure only one active graveyard per user
create or replace function ensure_one_active_graveyard()
returns trigger as $$
begin
  if new.is_active = true then
    update graveyards
    set is_active = false
    where user_id = new.user_id and id != new.id and is_active = true;
  end if;
  return new;
end;
$$ language plpgsql;

-- Trigger to maintain one active graveyard
drop trigger if exists trigger_one_active_graveyard on graveyards;
create trigger trigger_one_active_graveyard
  before insert or update on graveyards
  for each row execute function ensure_one_active_graveyard();
