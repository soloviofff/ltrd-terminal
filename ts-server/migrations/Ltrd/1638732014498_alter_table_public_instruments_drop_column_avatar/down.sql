comment on column "public"."instruments"."avatar" is E'Instruments';
alter table "public"."instruments" alter column "avatar" drop not null;
alter table "public"."instruments" add column "avatar" text;
