import express, { Request, Response, NextFunction } from "express";
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

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ---------------------
// Admin credentials
// ---------------------
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "neeraj";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// ---------------------
// Simple stateless admin auth middleware
// ---------------------
function adminAuth(req: Request, res: Response, next: NextFunction) {
  const username = req.headers["x-admin-username"];
  const password = req.headers["x-admin-password"];

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) return next();
  res.status(401).json({ error: "Unauthorized" });
}

// ---------------------
// USER ROUTES
// ---------------------
app.get("/api/users", async (_req: Request, res: Response) => {
  try {
    const allUsers: User[] = await db.select().from(users);
    res.json(allUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.get("/api/users/:uid", async (req: Request, res: Response) => {
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

app.post("/api/users", async (req: Request, res: Response) => {
  const { uid, phone, email } = req.body;
  if (!uid || !phone) return res.status(400).json({ message: "uid and phone are required" });

  try {
    const existingByPhone = await db.select().from(users).where(eq(users.phone, phone)).limit(1);
    if (existingByPhone.length) {
      await db.update(users).set({ uid }).where(eq(users.phone, phone));
      return res.status(200).json({ message: "User exists", user: { ...existingByPhone[0], uid } });
    }

    await db.insert(users).values({ uid, phone });

    if (email) await sendWelcomeEmail({ name: null, phone }, email);

    res.status(201).json({ message: "User created", user: { uid, phone } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.patch("/api/users/:uid", async (req: Request, res: Response) => {
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
      await sendWelcomeEmail({ name, phone: existing[0].phone }, email);
    }

    res.json({ message: "User updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// ---------------------
// CONTACT FORM
// ---------------------
app.post("/api/contact", async (req: Request, res: Response) => {
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

// ---------------------
// SERVICE REQUEST
// ---------------------
app.post("/api/service-request", async (req: Request, res: Response) => {
  const data: ServiceFormData & { uid: string } = req.body;
  if (!data.uid || !data.firstName || !data.lastName || !data.email || !data.phone || !data.serviceName)
    return res.status(400).json({ message: "Missing required fields or not logged in" });

  try {
    const user = await db.select().from(users).where(eq(users.uid, data.uid)).limit(1);
    if (!user.length) return res.status(403).json({ message: "User must be logged in" });

    await db.insert(serviceRequests).values({
      uid: data.uid,
      name: `${data.firstName} ${data.lastName}`,
      phone: data.phone,
      serviceType: data.serviceName,
      message: data.specificQuestions || "No additional questions provided",
      createdAt: new Date(),
    });

    sendServiceRequestEmail(data).catch(err => {
      console.warn("⚠️ Email sending failed, booking is saved:", err);
    });

    res.status(201).json({ message: "Service booked successfully!", success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error while processing service request" });
  }
});

// ---------------------
// ADMIN ROUTES
// ---------------------
app.post("/api/admin/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.json({ message: "Login successful", success: true });
  }
  res.status(401).json({ message: "Invalid credentials", success: false });
});

app.get("/api/admin/users", adminAuth, async (_req: Request, res: Response) => {
  try {
    const allUsers: User[] = await db.select().from(users);
    res.json(allUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.get("/api/admin/requests", adminAuth, async (_req: Request, res: Response) => {
  try {
    const allRequests: ServiceRequest[] = await db.select().from(serviceRequests);
    res.json(allRequests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

app.patch("/api/admin/requests/:id/status", adminAuth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status || !['queued', 'fulfilled', 'cancelled'].includes(status))
    return res.status(400).json({ error: "Invalid status" });

  try {
    await db.update(serviceRequests).set({ status, updatedAt: new Date() }).where(eq(serviceRequests.id, parseInt(id)));
    res.json({ message: "Request status updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update request status" });
  }
});

app.delete("/api/admin/requests/:id", adminAuth, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.delete(serviceRequests).where(eq(serviceRequests.id, parseInt(id)));
    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete request" });
  }
});

app.get("/api/admin/stats", adminAuth, async (_req: Request, res: Response) => {
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

// ---------------------
// Start server
// ---------------------
const port = parseInt(process.env.PORT || "5500", 10);
app.listen(port, () => console.log(`🌟 AstroPeak backend running on port ${port}`));
