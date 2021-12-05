comment on column "public"."assets"."is_stock" is E'Assets table';
alter table "public"."assets" alter column "is_stock" set default false;
alter table "public"."assets" alter column "is_stock" drop not null;
alter table "public"."assets" add column "is_stock" bool;
