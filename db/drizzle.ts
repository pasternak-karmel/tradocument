import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// console.log("Database URL:", process.env.DATABASE_URL);
// export const sql = neon(process.env.DATABASE_URL || "");
export const sql =
  "postgresql://karmelavenon:fNyKH2cu6eOG@ep-shy-heart-28030213.us-east-2.aws.neon.tech/financial?sslmode=require";
export const db = drizzle(sql);
