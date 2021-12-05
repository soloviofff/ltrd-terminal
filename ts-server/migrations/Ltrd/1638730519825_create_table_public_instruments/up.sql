CREATE TABLE "public"."instruments" ("id" serial NOT NULL, "symbol" text NOT NULL, "base_id" integer, "quote_id" integer, "broker_id" integer NOT NULL, "avatar" text, "isin" text, PRIMARY KEY ("id") , UNIQUE ("id"));COMMENT ON TABLE "public"."instruments" IS E'Instruments';
