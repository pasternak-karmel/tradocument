import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  dialect: "postgresql",
  schema: "db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    // url: "postgresql://karmelavenon:fNyKH2cu6eOG@ep-shy-heart-28030213.us-east-2.aws.neon.tech/financial?sslmode=require",
  },
  verbose: true,
  strict: true,
});
