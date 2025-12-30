-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  graveyard_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create deceased table
create table deceased (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  birth_date text,
  death_date text,
  epitaph text not null,
  notes text,
  tombstone_style integer not null default 1,
  position_x integer not null default 0,
  position_y integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table deceased enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using (true);

create policy "Users can insert their own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- Deceased policies
create policy "Deceased are viewable by their owner"
  on deceased for select
  using (auth.uid() = user_id);

create policy "Users can insert their own deceased"
  on deceased for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own deceased"
  on deceased for update
  using (auth.uid() = user_id);

create policy "Users can delete their own deceased"
  on deceased for delete
  using (auth.uid() = user_id);

-- Create function to handle new user
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
