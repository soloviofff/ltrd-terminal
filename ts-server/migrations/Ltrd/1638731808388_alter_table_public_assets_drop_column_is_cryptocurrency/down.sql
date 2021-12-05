comment on column "public"."assets"."is_cryptocurrency" is E'Assets table';
alter table "public"."assets" alter column "is_cryptocurrency" set default false;
alter table "public"."assets" alter column "is_cryptocurrency" drop not null;
alter table "public"."assets" add column "is_cryptocurrency" bool;
