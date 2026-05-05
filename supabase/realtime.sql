-- Realtime: Prisma-managed table "Reservation"
-- Run in Supabase SQL editor (Dashboard → SQL).
--
-- If the table is already in the publication, you will see an error; that is safe to ignore.

alter publication supabase_realtime add table "Reservation";

-- RLS + Realtime (browser uses anon key with Supabase client):
-- Without a SELECT policy matching your JWT, postgres_changes will not deliver rows.
-- Enable RLS and add a policy that fits your admin auth (Supabase Auth role, custom claim, etc.).

-- alter table "Reservation" enable row level security;
--
-- create policy "admin_read_reservations"
-- on "Reservation"
-- for select
-- to authenticated
-- using (
--   -- Example: restrict to staff; replace with your rule.
--   (auth.jwt() ->> 'role') = 'admin'
-- );
