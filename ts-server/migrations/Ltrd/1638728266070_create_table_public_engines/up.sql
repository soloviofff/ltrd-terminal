CREATE TABLE "public"."engines" ("id" text NOT NULL, "name" text NOT NULL, "description" text, "status" text, PRIMARY KEY ("id") , UNIQUE ("id"));COMMENT ON TABLE "public"."engines" IS E'Table for engines';
