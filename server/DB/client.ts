// server/db/client.ts

import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../../shared/schema";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing in your .env file");
}

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL!,
});

// ✅ Test DB Connection
(async () => {
  try {
    await pool.query("SELECT 1");
    console.log(" Database connection successful!");
  } catch (err) {
    console.error(" Database connection failed:", err);
  }
})();

// ✅ Create Drizzle ORM client
export const db: MySql2Database<typeof schema> = drizzle(pool, { schema, mode: "default" });
