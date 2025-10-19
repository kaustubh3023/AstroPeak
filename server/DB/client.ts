import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../../shared/schema";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Read environment variables
const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_CA_PATH, DB_PORT } = process.env;

if (!DB_HOST || !DB_USER || !DB_PASS || !DB_NAME || !DB_CA_PATH) {
  throw new Error(
    "Missing DB environment variables. Required: DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_CA_PATH"
  );
}

// Read SSL CA certificate
let sslCA: string;
try {
  sslCA = fs.readFileSync(DB_CA_PATH, "utf-8");
} catch (err) {
  throw new Error(`Failed to read DB_CA_PATH file at ${DB_CA_PATH}: ${err}`);
}

// Create MySQL pool with SSL (required for TiDB Cloud)
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  port: DB_PORT ? Number(DB_PORT) : 4000,
  ssl: { ca: sslCA },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test DB connection
(async () => {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("✅ Database connection successful!", rows);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1); // stop the server if DB connection fails
  }
})();

// Export Drizzle client
export const db: MySql2Database<typeof schema> = drizzle(pool, { schema, mode: "default" });
