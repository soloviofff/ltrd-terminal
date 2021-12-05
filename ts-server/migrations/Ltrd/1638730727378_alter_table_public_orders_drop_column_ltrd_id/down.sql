comment on column "public"."orders"."ltrd_id" is E'Table for trade orders';
alter table "public"."orders" alter column "ltrd_id" set default nextval('orders_ltrd_id_seq'::regclass);
alter table "public"."orders" alter column "ltrd_id" drop not null;
alter table "public"."orders" add column "ltrd_id" int4;
