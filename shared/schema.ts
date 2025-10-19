import { mysqlTable, serial, varchar, int, timestamp } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

//
// ============ USERS TABLE ============
//
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  uid: varchar("uid", { length: 255 }).unique(),
  phone: varchar("phone", { length: 20 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  gender: varchar("gender", { length: 20 }),
  age: varchar("age", { length: 3 }),
  dob: varchar("dob", { length: 20 }),
  zodiacSign: varchar("zodiacSign", { length: 20 }),
});

export const insertUserSchema = createInsertSchema(users).pick({
  uid: true,
  phone: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;


//
// ============ SERVICE REQUESTS TABLE ============
//
export const serviceRequests = mysqlTable("service_requests", {
  id: serial("id").primaryKey(),
  uid: varchar("uid", { length: 255 }), // Reference to user's UID
  name: varchar("name", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  serviceType: varchar("serviceType", { length: 255 }),
  message: varchar("message", { length: 500 }),
  status: varchar("status", { length: 20 }).default("queued"), // queued, fulfilled, cancelled
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type ServiceRequest = typeof serviceRequests.$inferSelect;
export type InsertServiceRequest = typeof serviceRequests.$inferInsert;
