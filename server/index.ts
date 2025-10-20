import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// ---------------------
// JSON + URL encoded
// ---------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ---------------------
// CORS configuration
// ---------------------
const FRONTEND_URL = process.env.FRONTEND_URL || "https://shrishrreeasttro.com";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", FRONTEND_URL); // exact origin, not '*'
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// ---------------------
// Session middleware
// ---------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key-change-in-production",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      httpOnly: true,
      sameSite: "none", // allow cross-origin cookies
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
    name: "connect.sid",
  })
);

// ---------------------
// Logging middleware
// ---------------------
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) logLine = logLine.slice(0, 79) + "…";
      log(logLine);
    }
  });

  next();
});

// ---------------------
// Register API routes
// ---------------------
(async () => {
  await registerRoutes(app);

  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // Setup Vite in development
  if (app.get("env") === "development") {
    await setupVite(app, undefined);
  } else {
    serveStatic(app);
  }

  // ---------------------
  // Bind server to Render port
  // ---------------------
  const port = parseInt(process.env.PORT || "5500", 10);
  app.listen(port, () => {
    log(`🌟 AstroPeak backend running on port ${port}`);
  });
})();
