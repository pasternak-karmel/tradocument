ALTER TABLE "rejoindreEquipe" ALTER COLUMN "userId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "rejoindreEquipe" ALTER COLUMN "cv" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "rejoindreEquipe" ADD CONSTRAINT "rejoindreEquipe_email_unique" UNIQUE("email");