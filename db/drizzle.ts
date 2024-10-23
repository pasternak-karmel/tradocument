import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// console.log("Database URL:", process.env.DATABASE_URL);
export const sql = neon(process.env.DATABASE_URL || "");
export const db = drizzle(sql);
