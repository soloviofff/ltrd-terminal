comment on column "public"."orders"."id" is E'Table for trade orders';
alter table "public"."orders" alter column "id" drop not null;
alter table "public"."orders" add column "id" text;
