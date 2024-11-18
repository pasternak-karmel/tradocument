ALTER TABLE "demande_devis" DROP CONSTRAINT "demande_devis_fichier_unique";--> statement-breakpoint
ALTER TABLE "demande_devis" ALTER COLUMN "fichier" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "demande_devis" ALTER COLUMN "fichier" DROP NOT NULL;