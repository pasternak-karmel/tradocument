import { createPool } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { config } from "dotenv";

config({ path: ".env.local" });

const pool = createPool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);
