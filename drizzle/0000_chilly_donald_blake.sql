CREATE TABLE IF NOT EXISTS "demande_devis" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"nom" text NOT NULL,
	"prenom" text NOT NULL,
	"numero" text NOT NULL,
	"email" text NOT NULL,
	"pays" text NOT NULL,
	"type" boolean DEFAULT false NOT NULL,
	"type_document" text NOT NULL,
	"langue_source" text NOT NULL,
	"langue_traduit" text NOT NULL,
	"information_supplementaire" text,
	"fichier" text[],
	"fichier_traduis" text,
	"traducteur" text,
	"adresse_depart" text,
	"adresse_arriver" text,
	"montant" integer NOT NULL,
	"createdAT" timestamp DEFAULT now() NOT NULL,
	"deliveredAT" timestamp,
	"status" text DEFAULT 'pending' NOT NULL,
	"payer" boolean DEFAULT false,
	CONSTRAINT "demande_devis_fichier_traduis_unique" UNIQUE("fichier_traduis")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authenticator" (
	"credentialID" text NOT NULL,
	"userId" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "authenticator_userId_credentialID_pk" PRIMARY KEY("userId","credentialID"),
	CONSTRAINT "authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contact" (
	"id" text PRIMARY KEY NOT NULL,
	"nom" text NOT NULL,
	"email" text NOT NULL,
	"sujet" text NOT NULL,
	"message" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "password_reset_tokens" (
	"id" text PRIMARY KEY DEFAULT 'cuid()' NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rejoindreEquipe" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text,
	"nom" text NOT NULL,
	"prenom" text NOT NULL,
	"email" text NOT NULL,
	"pays" text NOT NULL,
	"ville" text NOT NULL,
	"specialite" text NOT NULL,
	"commentaire" text,
	"cv" text,
	"createdAT" timestamp DEFAULT now() NOT NULL,
	"approved_at" timestamp,
	"status" text DEFAULT 'attente' NOT NULL,
	"isAccepter" boolean DEFAULT false,
	CONSTRAINT "rejoindreEquipe_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "traduction" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"nom" text NOT NULL,
	"prenom" text NOT NULL,
	"email" text NOT NULL,
	"fichier" text NOT NULL,
	"fichier_traduis" text,
	"traducteur" text,
	"montant" integer NOT NULL,
	"createdAT" timestamp DEFAULT now() NOT NULL,
	"deliveredAT" timestamp,
	"status" text DEFAULT 'pending' NOT NULL,
	"traduction_from" text NOT NULL,
	"traduction_to" text NOT NULL,
	"payer" boolean DEFAULT false,
	CONSTRAINT "traduction_fichier_traduis_unique" UNIQUE("fichier_traduis")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "two_factor_confirmations" (
	"id" text PRIMARY KEY DEFAULT 'cuid()' NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "two_factor_tokens" (
	"id" text NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "two_factor_tokens_email_token_pk" PRIMARY KEY("email","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"image" text,
	"password" text,
	"salt" text,
	"role" text DEFAULT 'user' NOT NULL,
	"two_factor_secret" text,
	"two_factor_enabled" boolean DEFAULT false,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_email_token_pk" PRIMARY KEY("email","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "demande_devis" ADD CONSTRAINT "demande_devis_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "demande_devis" ADD CONSTRAINT "demande_devis_traducteur_user_id_fk" FOREIGN KEY ("traducteur") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rejoindreEquipe" ADD CONSTRAINT "rejoindreEquipe_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "traduction" ADD CONSTRAINT "traduction_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "traduction" ADD CONSTRAINT "traduction_traducteur_user_id_fk" FOREIGN KEY ("traducteur") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_email_token" ON "password_reset_tokens" USING btree ("email","token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_user" ON "two_factor_confirmations" USING btree ("user_id");