comment on column "public"."assets"."is_fiat" is E'Assets table';
alter table "public"."assets" alter column "is_fiat" set default false;
alter table "public"."assets" alter column "is_fiat" drop not null;
alter table "public"."assets" add column "is_fiat" bool;
