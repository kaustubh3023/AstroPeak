import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../../shared/schema";
import dotenv from "dotenv";

dotenv.config();

// Read environment variables
const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT, DB_CA_CONTENT } = process.env;

if (!DB_HOST || !DB_USER || !DB_PASS || !DB_NAME || !DB_CA_CONTENT) {
  throw new Error(
    "Missing DB environment variables. Required: DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_CA_CONTENT"
  );
}

// Create MySQL pool with SSL
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  port: DB_PORT ? Number(DB_PORT) : 4000,
  ssl: { ca: DB_CA_CONTENT },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test DB connection
(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("🌟 Database connection successful!");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
})();

// Export Drizzle client
export const db: MySql2Database<typeof schema> = drizzle(pool, { schema, mode: "default" });
