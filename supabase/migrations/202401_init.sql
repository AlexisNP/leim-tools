--
-- For use with https://github.com/supabase/supabase/tree/master/examples/slack-clone/nextjs-slack-clone
--

-- Custom types
create type public.app_permission as enum ('events.see.hidden', 'users.ban');
create type public.app_role as enum ('sa', 'admin', 'moderator', 'user');
create type public.app_colors as enum ('red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'black', 'white');

-- DATA STRUCTURES
-- Users
create table public.users (
  id          uuid references auth.users not null primary key, -- UUID from auth.users
  username    text
);
comment on table public.users is 'Profile data for each user.';
comment on column public.users.id is 'References the internal Supabase Auth user.';

-- Roles
create table public.user_roles (
  id        bigint generated by default as identity primary key,
  role      app_role not null,
  user_id   uuid references public.users on delete cascade not null,
  unique (user_id, role)
);
comment on table public.user_roles is 'Application roles for each user.';

-- Permissions
create table public.role_permissions (
  id           bigint generated by default as identity primary key,
  role         app_role not null,
  permission   app_permission not null,
  unique (role, permission)
);
comment on table public.role_permissions is 'Application permissions for each role.';

-- Worlds
create table public.worlds (
  id            bigint generated by default as identity primary key,
  name          text not null,
  description   text,
  color         app_colors default 'black',
  gm_id         uuid references public.users on delete cascade
);
comment on table public.worlds is 'Worlds belonging to a single user ; a game master.';

-- World Calendars
create table public.calendars (
  id                bigint generated by default as identity primary key,
  name              text not null,
  today             json not null,
  color             app_colors default 'black',
  world_id          bigint references public.worlds on delete cascade not null
);
comment on table public.calendars is 'Calendar settings and configuration attached to a single world.';

-- Calendar Months
create table public.calendar_months (
  id                bigint generated by default as identity primary key,
  name              text not null,
  days              int not null,
  position          int not null,
  calendar_id       bigint references public.calendars on delete cascade not null
);
comment on table public.calendar_months is 'A calendar month.';

-- Calendar Event categories
create table public.calendar_event_categories (
  id        bigint generated by default as identity primary key,
  name      text not null,
  color     app_colors default 'black',
  unique (name)
);
comment on table public.calendar_event_categories is 'Categories describing events.';

-- Calendar Events
create table public.calendar_events (
  id            bigint generated by default as identity primary key,
  title         text not null,
  description   text,
  location      text,
  start_date    json not null,
  end_date      json,
  category      bigint references public.calendar_event_categories on delete cascade,
  hidden        boolean,
  wiki          text,
  calendar_id   bigint references public.calendars on delete cascade not null
);
comment on table public.calendar_events is 'Events linked to a world';

-- Link table for events - categories
create table public.calendar_event_categories_links (
  calendar_event_id               bigint references public.calendar_events on delete cascade,
  calendar_event_category_id      bigint references public.calendar_event_categories on delete cascade,
  primary key (calendar_event_id, calendar_event_category_id)
);
comment on table public.calendar_event_categories_links is 'Link tables for multiple event categories.';

-- Character categories
create table public.character_categories (
  id        bigint generated by default as identity primary key,
  name      text not null,
  color     app_colors default 'black',
  unique (name)
);
comment on table public.character_categories is 'Categories describing characters';

-- Characters
create table public.characters (
  id              bigint generated by default as identity primary key,
  name            text not null,
  description     text,
  birth           json not null,
  death           json,
  category        bigint references public.character_categories on delete cascade,
  hidden_birth    boolean,
  hidden_death    boolean,
  wiki            text,
  world_id        bigint references public.worlds on delete cascade not null
);
comment on table public.characters is 'Characters linked to a world';

-- Link table for events - categories
create table public.character_categories_links (
  character_id             bigint references public.characters on delete cascade,
  character_category_id    bigint references public.character_categories on delete cascade,
  primary key (character_id, character_category_id)
);
comment on table public.character_categories_links is 'Link tables for multiple character categories.';

-- authorize with role-based access control (RBAC)
create function public.authorize(
  requested_permission app_permission
)
returns boolean as $$
declare
  bind_permissions int;
begin
  select count(*)
  from public.role_permissions
  where role_permissions.permission = authorize.requested_permission
    and role_permissions.role = (auth.jwt() ->> 'user_role')::public.app_role
  into bind_permissions;

  return bind_permissions > 0;
end;
$$ language plpgsql security definer set search_path = public;

-- Secure the tables
alter table public.users enable row level security;
alter table public.user_roles enable row level security;
alter table public.role_permissions enable row level security;
alter table public.worlds enable row level security;
alter table public.character_categories enable row level security;
alter table public.character_categories_links enable row level security;
alter table public.characters enable row level security;
alter table public.calendars enable row level security;
alter table public.calendar_months enable row level security;
alter table public.calendar_events enable row level security;
alter table public.calendar_event_categories enable row level security;
alter table public.calendar_event_categories_links enable row level security;

-- Add realtime
alter publication supabase_realtime add table users;
alter publication supabase_realtime add table worlds;
alter publication supabase_realtime add table calendars;

-- User policies
create policy "Allow logged-in read access" on public.users for select using ( auth.role() = 'authenticated' );
create policy "Allow individual insert access" on public.users for insert with check ( auth.uid() = id );
create policy "Allow individual update access" on public.users for update using ( auth.uid() = id );
create policy "Allow individual read access" on public.user_roles for select using ( auth.uid() = user_id );

-- World policies
create policy "Allow GMs to see their worlds" on public.worlds for select using ( ( auth.uid() = gm_id ) );
create policy "Allow GMs to create worlds" on public.worlds for insert with check ( auth.uid() = gm_id );
create policy "Allow GMs to edit their worlds" on public.worlds for update using ( auth.uid() = gm_id );
create policy "Allow GMs to delete their worlds" on public.worlds for delete using ( auth.uid() = gm_id );

-- Calendar policies
create policy "Allow GMs to see their calendars" on public.calendars for select using (
    exists (
        select 1 from worlds
        where worlds.id = calendars.world_id
    )
);
create policy "Allow GMs to add calendars to their worldd" on public.calendars for insert with check (
    exists (
        select 1 from worlds
        where worlds.id = calendars.world_id
    )
);
create policy "Allow GMs to edit their calendars" on public.calendars for update with check (
    exists (
        select 1 from worlds
        where worlds.id = calendars.world_id
    )
);
create policy "Allow GMs to delete their calendars" on public.calendars for delete using (
    exists (
        select 1 from worlds
        where worlds.id = calendars.world_id
    )
);

-- Month policies
create policy "Allow GMs to see their calendar's months"
  on public.calendar_months
  for select
  using (
    exists (
      select 1
      from public.calendars c
      join public.worlds w on w.id = c.world_id
      where
        c.id = calendar_months.calendar_id
        and w.gm_id = auth.uid()
    )
);
create policy "Allow GMs to add months on their calendars"
  on public.calendar_months
  for insert
  with check (
    exists (
      select 1
      from public.calendars c
      join public.worlds w on w.id = c.world_id
      where
        c.id = calendar_months.calendar_id
        and w.gm_id = auth.uid()
    )
);
create policy "Allow GMs to update their calendar's months"
  on public.calendar_months
  for update
  using (
    exists (
      select 1
      from public.calendars c
      join public.worlds w on w.id = c.world_id
      where
        c.id = calendar_months.calendar_id
        and w.gm_id = auth.uid()
    )
);
create policy "Allow GMs to delete their calendar's months"
  on public.calendar_months
  for delete
  using (
    exists (
      select 1
      from public.calendars c
      join public.worlds w on w.id = c.world_id
      where
        c.id = calendar_months.calendar_id
        and w.gm_id = auth.uid()
    )
);

-- Event policies
create policy "Allow GMs to see their events"
  on public.calendar_events
  for select
  using (
    exists (
      select 1
      from public.calendars c
      join public.worlds w on w.id = c.world_id
      where
        c.id = calendar_events.calendar_id
        and w.gm_id = auth.uid()
    )
);
create policy "Allow GMs to add their events"
  on public.calendar_events
  for insert
  with check (
    exists (
      select 1
      from public.calendars c
      join public.worlds w on w.id = c.world_id
      where
        c.id = calendar_events.calendar_id
        and w.gm_id = auth.uid()
    )
);
create policy "Allow GMs to update their events"
  on public.calendar_events
  for update
  using (
    exists (
      select 1
      from public.calendars c
      join public.worlds w on w.id = c.world_id
      where
        c.id = calendar_events.calendar_id
        and w.gm_id = auth.uid()
    )
);
create policy "Allow GMs to delete their events"
  on public.calendar_events
  for delete
  using (
    exists (
      select 1
      from public.calendars c
      join public.worlds w on w.id = c.world_id
      where
        c.id = calendar_events.calendar_id
        and w.gm_id = auth.uid()
    )
);

-- Character policies
create policy "Allow individual read access for GMs" on public.characters for select using (
    exists (
        select 1 from worlds
        where worlds.id = characters.world_id
    )
);
create policy "Allow individual insert access for GMs" on public.characters for insert with check (
    exists (
        select 1 from worlds
        where worlds.id = characters.world_id
    )
);
create policy "Allow individual update access for GMs" on public.characters for update with check (
    exists (
        select 1 from worlds
        where worlds.id = characters.world_id
    )
);

-- Categories are public to view but not to insert
-- Needs to be refactored maybe, if in the future we want a default set AND user defined ones
create policy "Allow logged-in read access" on public.calendar_event_categories for select using ( auth.role() = 'authenticated' );
create policy "Allow logged-in read access" on public.calendar_event_categories_links for select using ( auth.role() = 'authenticated' );
create policy "Allow logged-in read access" on public.character_categories for select using ( auth.role() = 'authenticated' );
create policy "Allow logged-in read access" on public.character_categories_links for select using ( auth.role() = 'authenticated' );

-- Send "previous data" on change
alter table public.users replica identity full;

-- inserts a row into public.users and assigns roles
create function public.handle_new_user()
returns trigger as $$
declare is_admin boolean;
begin
  insert into public.users (id, username)
  values (new.id, new.email);
  insert into public.user_roles (role, user_id)
  values ('user', new.id);

  return new;
end;
$$ language plpgsql security definer set search_path = auth, public;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

/**
 * HELPER FUNCTIONS
 * Create test user helper method.
 */
create or replace function public.create_user(
    email text
) returns uuid
    security definer
    set search_path = auth
as $$
  declare
  user_id uuid;
begin
  user_id := extensions.uuid_generate_v4();

  insert into auth.users (id, email)
    values (user_id, email)
    returning id into user_id;

    return user_id;
end;
$$ language plpgsql;
