CREATE TABLE "public"."balance" ("id" serial NOT NULL, "data" jsonb NOT NULL, "engine_id" text NOT NULL, "timestamp" integer NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));COMMENT ON TABLE "public"."balance" IS E'Balance table';