ALTER TABLE "procurations" ALTER COLUMN "dateNaissanceMandant" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "procurations" ALTER COLUMN "dateDebut" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "procurations" ALTER COLUMN "dateDebut" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "procurations" ALTER COLUMN "dateFin" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "procurations" ALTER COLUMN "dateFin" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "procurations" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "procurations" ADD COLUMN "createdAT" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "procurations" ADD CONSTRAINT "procurations_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
