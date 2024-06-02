-- AlterTable
CREATE SEQUENCE qoutes_id_seq;
ALTER TABLE "Qoutes" ALTER COLUMN "id" SET DEFAULT nextval('qoutes_id_seq');
ALTER SEQUENCE qoutes_id_seq OWNED BY "Qoutes"."id";
