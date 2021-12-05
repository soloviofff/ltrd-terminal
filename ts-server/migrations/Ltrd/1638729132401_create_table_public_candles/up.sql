CREATE TABLE "public"."candles" ("id" serial NOT NULL, "broker_id" integer NOT NULL, "data" jsonb NOT NULL, "timestamp" integer NOT NULL, "timeframe" text NOT NULL, "instrument_id" integer NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));COMMENT ON TABLE "public"."candles" IS E'Candles table';
