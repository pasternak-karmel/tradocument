CREATE TABLE IF NOT EXISTS "contact" (
	"id" text PRIMARY KEY NOT NULL,
	"nom" text NOT NULL,
	"email" text NOT NULL,
	"sujet" text NOT NULL,
	"message" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rejoindreEquipe" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"nom" text NOT NULL,
	"prenom" text NOT NULL,
	"email" text NOT NULL,
	"pays" text NOT NULL,
	"ville" text NOT NULL,
	"specialite" text NOT NULL,
	"commentaire" text,
	"cv" text NOT NULL,
	"createdAT" timestamp DEFAULT now() NOT NULL,
	"approved_at" timestamp,
	"status" text DEFAULT 'attente' NOT NULL,
	"isAccepter" boolean DEFAULT false
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rejoindreEquipe" ADD CONSTRAINT "rejoindreEquipe_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
