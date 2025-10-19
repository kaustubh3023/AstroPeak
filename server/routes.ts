import type { Express } from "express";
import { db } from "./DB/client";
import { users, serviceRequests, type User, type ServiceRequest } from "../shared/schema";
import { eq, count } from "drizzle-orm";
import {
  sendContactEmail,
  sendServiceRequestEmail,
  sendWelcomeEmail,
  type ContactFormData,
  type ServiceFormData,
} from "./emailService";

// Extend the Request interface to include session
declare module 'express-session' {
  interface SessionData {
    isAdmin?: boolean;
  }
}

export async function registerRoutes(app: Express) {
  // ===== DB connection check =====
  (async () => {
    try {
      await db.execute("SELECT 1");
      console.log("✅ DB connected inside routes");
    } catch (err) {
      console.error("❌ DB connection failed:", err);
    }
  })();

  // ===== USER ROUTES =====
  app.get("/api/users", async (_req, res) => {
    try {
      const allUsers: User[] = await db.select().from(users);
      res.json(allUsers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.get("/api/users/:uid", async (req, res) => {
    const { uid } = req.params;
    try {
      const result = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
      if (!result.length) return res.status(404).json({ message: "User not found" });
      res.json(result[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    const { uid, phone, email } = req.body;
    console.log("📥 POST /api/users - Request received:", { uid, phone, email });
    
    if (!uid || !phone) return res.status(400).json({ message: "uid and phone are required" });

    try {
      // First check if user exists by phone number (primary check)
      console.log("🔍 Checking if user exists with phone:", phone);
      const existingByPhone = await db.select().from(users).where(eq(users.phone, phone)).limit(1);
      
      if (existingByPhone.length) {
        // Update the existing user's UID in case it changed (new device, reinstall, etc.)
        try {
          await db.update(users).set({ uid: uid }).where(eq(users.phone, phone));
        } catch (updateErr) {
          if (updateErr instanceof Error) {
            console.log("⚠️ Could not update UID, but user exists:", updateErr.message);
          } else {
            console.log("⚠️ Could not update UID, but user exists:", updateErr);
          }
        }
        return res.status(200).json({ message: "User exists", user: { ...existingByPhone[0], uid } });
      }

      // Check if user exists by UID (secondary check)
      const existingByUid = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
      
      if (existingByUid.length) {
        return res.status(200).json({ message: "User exists", user: existingByUid[0] });
      }

      // Create new user
      await db.insert(users).values({ uid, phone });

      if (email) {
        try {
          await sendWelcomeEmail({ name: null, phone }, email);
        } catch (err) {
          console.error("Failed to send welcome email:", err);
        }
      }

      res.status(201).json({ message: "User created", user: { uid, phone } });
    } catch (err) {
      console.error("❌ Error in /api/users:", err);
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.patch("/api/users/:uid", async (req, res) => {
    const { uid } = req.params;
    const { name, gender, age, dob, zodiacSign, email } = req.body;

    try {
      const existing = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
      if (!existing.length) return res.status(404).json({ message: "User not found" });

      await db
        .update(users)
        .set({
          ...(name && { name }),
          ...(gender && { gender }),
          ...(age && { age }),
          ...(dob && { dob }),
          ...(zodiacSign && { zodiacSign }),
        })
        .where(eq(users.uid, uid));

      if (!existing[0].name && name && email) {
        try {
          await sendWelcomeEmail({ name, phone: existing[0].phone }, email);
        } catch (err) {
          console.error("Failed to send welcome email:", err);
        }
      }

      res.json({ message: "User updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  // ===== CONTACT FORM =====
  app.post("/api/contact", async (req, res) => {
    const data: ContactFormData = req.body;
    if (!data.firstName || !data.lastName || !data.email || !data.phone)
      return res.status(400).json({ message: "Missing required fields" });

    try {
      const result = await sendContactEmail(data);
      if (result.success) res.json({ message: "Contact submitted", success: true });
      else res.status(500).json({ message: "Failed to submit", success: false });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to process contact form" });
    }
  });

  // ===== SERVICE REQUEST (UPDATED) =====
  app.post("/api/service-request", async (req, res) => {
    const data: ServiceFormData & { uid: string } = req.body;

    // ✅ Validate required fields
    if (
      !data.uid ||
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.phone ||
      !data.serviceName
    ) {
      return res.status(400).json({ message: "Missing required fields or not logged in" });
    }

    try {
      // ✅ Check if user exists
      const user = await db.select().from(users).where(eq(users.uid, data.uid)).limit(1);
      if (!user.length) {
        return res.status(403).json({ message: "User must be logged in before booking a service" });
      }

      // ✅ Insert into DB
      await db.insert(serviceRequests).values({
        uid: data.uid,
        name: `${data.firstName} ${data.lastName}`,
        phone: data.phone,
        serviceType: data.serviceName,
        message: data.specificQuestions || "No additional questions provided",
        createdAt: new Date(),
      });

      // ✅ Send confirmation email (optional)
      const result = await sendServiceRequestEmail(data);
      if (result.success) {
        return res.status(201).json({
          message: "✅ Service booked successfully!",
          success: true,
        });
      } else {
        return res.status(500).json({
          message: "Service booked but failed to send confirmation email",
          success: false,
        });
      }
    } catch (err) {
      console.error("❌ Error while processing service request:", err);
      return res
        .status(500)
        .json({ error: "Internal server error while processing service request" });
    }
  });

  // ===== ADMIN ROUTES =====
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
  
  const adminAuth = (req: any, res: any, next: any) => {
    if (req.session?.isAdmin) {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  };

  // Admin login endpoint
  app.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body;
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      req.session.isAdmin = true;
      res.json({ message: "Login successful", success: true });
    } else {
      res.status(401).json({ message: "Invalid credentials", success: false });
    }
  });

  // Admin logout endpoint
  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ error: "Could not log out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // Check admin status
  app.get("/api/admin/status", (req, res) => {
    res.json({ isAdmin: !!req.session?.isAdmin });
  });

  app.get("/api/admin/users", adminAuth, async (_req, res) => {
    try {
      const allUsers: User[] = await db.select().from(users);
      res.json(allUsers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.get("/api/admin/requests", adminAuth, async (_req, res) => {
    try {
      const allRequests: ServiceRequest[] = await db.select().from(serviceRequests);
      res.json(allRequests);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch requests" });
    }
  });

  app.patch("/api/admin/requests/:id/status", adminAuth, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status || !['queued', 'fulfilled', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: "Invalid status. Must be 'queued', 'fulfilled', or 'cancelled'" });
    }

    try {
      await db
        .update(serviceRequests)
        .set({ 
          status,
          updatedAt: new Date()
        })
        .where(eq(serviceRequests.id, parseInt(id)));
      
      res.json({ message: "Request status updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update request status" });
    }
  });

  app.delete("/api/admin/requests/:id", adminAuth, async (req, res) => {
    const { id } = req.params;
    
    try {
      await db.delete(serviceRequests).where(eq(serviceRequests.id, parseInt(id)));
      res.json({ message: "Request deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete request" });
    }
  });

  app.get("/api/admin/stats", adminAuth, async (_req, res) => {
    try {
      const [usersResult] = await db.select({ count: count() }).from(users);
      const [requestsResult] = await db.select({ count: count() }).from(serviceRequests);
      const [queuedResult] = await db.select({ count: count() }).from(serviceRequests).where(eq(serviceRequests.status, "queued"));
      const [fulfilledResult] = await db.select({ count: count() }).from(serviceRequests).where(eq(serviceRequests.status, "fulfilled"));
      
      res.json({
        totalUsers: usersResult.count,
        totalRequests: requestsResult.count,
        queuedRequests: queuedResult.count,
        fulfilledRequests: fulfilledResult.count,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });
}
