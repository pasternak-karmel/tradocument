CREATE TABLE IF NOT EXISTS "procurations" (
	"id" text PRIMARY KEY NOT NULL,
	"typeProcuration" text NOT NULL,
	"nomMandant" varchar(255) NOT NULL,
	"prenomMandant" varchar(255) NOT NULL,
	"dateNaissanceMandant" timestamp,
	"lieuNaissanceMandant" text NOT NULL,
	"nationaliteMandant" text NOT NULL,
	"adresseMandant" text NOT NULL,
	"dateDebut" timestamp,
	"dateFin" timestamp DEFAULT now() NOT NULL,
	"piece" text NOT NULL
);
