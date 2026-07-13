alter table public.bookings
  add column if not exists delivery_method text,
  add column if not exists parcel_locker_code text,
  add column if not exists delivery_address text,
  add column if not exists reference_image_path text;

insert into storage.buckets (id, name, public)
values ('booking-reference-images', 'booking-reference-images', false)
on conflict (id) do nothing;
