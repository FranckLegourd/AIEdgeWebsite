// server/index.ts
import dotenv from "dotenv";
import path3 from "path";
import fs2 from "fs";
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/auth.ts
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session2 from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

// server/storage.ts
import session from "express-session";
import MemoryStoreSync from "memorystore";
var MemoryStore = MemoryStoreSync(session);
var MemStorage = class {
  users;
  projects;
  inquiries;
  sessionStore;
  currentId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.projects = /* @__PURE__ */ new Map();
    this.inquiries = /* @__PURE__ */ new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 864e5
    });
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async getUserByEmail(email) {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }
  async createUser(insertUser) {
    const id = this.currentId++;
    const user = {
      ...insertUser,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      role: insertUser.role ?? "client",
      company: insertUser.company ?? null,
      isActive: insertUser.isActive ?? true
    };
    this.users.set(id, user);
    return user;
  }
  async updateUser(id, updates) {
    const user = await this.getUser(id);
    if (!user) return void 0;
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  async getAllUsers() {
    return Array.from(this.users.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  async getProject(id) {
    const project = this.projects.get(id);
    if (!project) return void 0;
    const client = await this.getUser(project.clientId);
    return { ...project, client };
  }
  async getProjectsByClient(clientId) {
    const projects = Array.from(this.projects.values()).filter(
      (project) => project.clientId === clientId
    );
    const client = await this.getUser(clientId);
    return projects.map((p) => ({ ...p, client }));
  }
  async getAllProjects() {
    const projects = Array.from(this.projects.values());
    const projectsWithClients = await Promise.all(projects.map(async (p) => {
      const client = await this.getUser(p.clientId);
      return { ...p, client };
    }));
    return projectsWithClients.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  async createProject(insertProject) {
    const id = this.currentId++;
    const project = {
      ...insertProject,
      id,
      status: insertProject.status ?? "pending",
      budget: insertProject.budget ?? null,
      startDate: insertProject.startDate ?? null,
      endDate: insertProject.endDate ?? null,
      assignedTo: insertProject.assignedTo ?? null,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.projects.set(id, project);
    return project;
  }
  async updateProject(id, updates) {
    const project = this.projects.get(id);
    if (!project) return void 0;
    const updatedProject = { ...project, ...updates, updatedAt: /* @__PURE__ */ new Date() };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }
  async deleteProject(id) {
    return this.projects.delete(id);
  }
  async getInquiry(id) {
    return this.inquiries.get(id);
  }
  async getAllInquiries() {
    return Array.from(this.inquiries.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  async createInquiry(insertInquiry) {
    const id = this.currentId++;
    const inquiry = {
      ...insertInquiry,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      message: insertInquiry.message ?? null,
      status: insertInquiry.status ?? "new"
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
  async updateInquiry(id, updates) {
    const inquiry = this.inquiries.get(id);
    if (!inquiry) return void 0;
    const updatedInquiry = { ...inquiry, ...updates };
    this.inquiries.set(id, updatedInquiry);
    return updatedInquiry;
  }
};
var storage = new MemStorage();

// server/auth.ts
var scryptAsync = promisify(scrypt);
async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}
async function comparePasswords(supplied, stored) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = await scryptAsync(supplied, salt, 64);
  return timingSafeEqual(hashedBuf, suppliedBuf);
}
function setupAuth(app2) {
  const sessionSettings = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore
  };
  app2.set("trust proxy", 1);
  app2.use(session2(sessionSettings));
  app2.use(passport.initialize());
  app2.use(passport.session());
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await storage.getUserByUsername(username);
      if (!user || !await comparePasswords(password, user.password)) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    })
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await storage.getUser(id);
    done(null, user);
  });
  app2.post("/api/register", async (req, res, next) => {
    const existingUser = await storage.getUserByUsername(req.body.username);
    if (existingUser) {
      return res.status(400).send("Username already exists");
    }
    const user = await storage.createUser({
      ...req.body,
      password: await hashPassword(req.body.password)
    });
    req.login(user, (err) => {
      if (err) return next(err);
      res.status(201).json(user);
    });
  });
  app2.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json(req.user);
  });
  app2.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });
  app2.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });
}

// shared/schema.ts
import { z } from "zod";
var insertUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  company: z.string().nullable().optional(),
  role: z.string().default("client"),
  isActive: z.boolean().default(true)
});
var insertProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.string().default("pending"),
  serviceType: z.string(),
  clientId: z.number(),
  assignedTo: z.number().nullable().optional(),
  budget: z.number().nullable().optional(),
  startDate: z.coerce.date().nullable().optional(),
  endDate: z.coerce.date().nullable().optional()
});
var insertInquirySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company is required"),
  serviceInterest: z.string().min(1, "Service interest is required"),
  message: z.string().nullable().optional(),
  status: z.string().default("new")
});

// server/routes.ts
import { z as z2 } from "zod";
import nodemailer from "nodemailer";
function registerRoutes(app2) {
  setupAuth(app2);
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.hostinger.com",
    port: parseInt(process.env.MAIL_PORT || "587"),
    secure: (process.env.MAIL_PORT || "587") === "465",
    // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME || "agent@aiedgeinternational.com",
      pass: process.env.MAIL_PASSWORD
    },
    // Add explicit timeout settings
    connectionTimeout: 1e4,
    // 10 seconds
    greetingTimeout: 1e4,
    socketTimeout: 1e4
  });
  app2.get("/api/projects", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      let projects;
      if (req.user.role === "admin") {
        projects = await storage.getAllProjects();
      } else {
        projects = await storage.getProjectsByClient(req.user.id);
      }
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/projects/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      if (req.user.role !== "admin" && project.clientId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/projects", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.patch("/api/projects/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }
      const id = parseInt(req.params.id);
      const updates = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, updates);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.delete("/api/projects/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProject(id);
      if (!deleted) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/inquiries", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }
      const inquiries = await storage.getAllInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/inquiries", async (req, res) => {
    try {
      const inquiryData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(inquiryData);
      const mailOptions = {
        from: `"AI Edge Website" <${process.env.MAIL_USERNAME || "agent@aiedgeinternational.com"}>`,
        to: "agent@aiedgeinternational.com",
        subject: `New Inquiry from ${inquiryData.firstName} ${inquiryData.lastName}`,
        html: `
          <h2>New Website Inquiry</h2>
          <p>You have received a new inquiry from the website contact form.</p>
          
          <h3>Contact Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${inquiryData.firstName} ${inquiryData.lastName}</li>
            <li><strong>Email:</strong> ${inquiryData.email}</li>
            <li><strong>Company:</strong> ${inquiryData.company}</li>
            <li><strong>Service Interest:</strong> ${inquiryData.serviceInterest}</li>
          </ul>

          <h3>Message:</h3>
          <p>${(inquiryData.message || "No message provided").replace(/\n/g, "<br>")}</p>
        `
      };
      try {
        await transporter.sendMail(mailOptions);
        console.log("Inquiry notification email sent successfully.");
      } catch (emailError) {
        console.error("Failed to send inquiry notification email:", emailError);
      }
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      console.error("Error creating inquiry:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.patch("/api/inquiries/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }
      const id = parseInt(req.params.id);
      const updates = insertInquirySchema.partial().parse(req.body);
      const inquiry = await storage.updateInquiry(id, updates);
      if (!inquiry) {
        return res.status(404).json({ message: "Inquiry not found" });
      }
      res.json(inquiry);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      console.error("Error updating inquiry:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/users", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }
      const users = await storage.getAllUsers();
      const safeUsers = users.map(({ password, ...user }) => user);
      res.json(safeUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.patch("/api/users/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }
      const id = parseInt(req.params.id);
      const updates = req.body;
      delete updates.password;
      const user = await storage.updateUser(id, updates);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password, ...safeUser } = user;
      res.json(safeUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server, timeout: 6e4 },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var envPaths = [
  path3.resolve(process.cwd(), ".env"),
  // Local dev
  path3.resolve(process.cwd(), "../.builds/config/.env"),
  // Hostinger config location
  path3.resolve(process.cwd(), "../../.builds/config/.env")
  // Alternative path
];
for (const envPath of envPaths) {
  if (fs2.existsSync(envPath)) {
    console.log(`Loading .env from: ${envPath}`);
    dotenv.config({ path: envPath });
    break;
  }
}
console.log("ENV DEBUG_TEST:", process.env.DEBUG_TEST);
console.log("ENV SESSION_SECRET present:", "SESSION_SECRET" in process.env);
console.log("=== STARTUP DIAGNOSTICS ===");
console.log("Current Working Directory (cwd):", process.cwd());
console.log("__dirname:", import.meta.dirname);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("---");
console.log("RAW SESSION_SECRET:", process.env.SESSION_SECRET ? "[SET]" : "[NOT SET]");
console.log("MAIL_HOST:", process.env.MAIL_HOST ? "[SET]" : "[NOT SET]");
console.log("MAIL_PASSWORD:", process.env.MAIL_PASSWORD ? "[SET]" : "[NOT SET]");
console.log("ENV KEYS with SESSION:", Object.keys(process.env).filter((k) => k.includes("SESSION")));
console.log("=== END DIAGNOSTICS ===");
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  server.keepAliveTimeout = 0;
  server.headersTimeout = 0;
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3e3;
  server.listen({
    port,
    host: "0.0.0.0"
  }, () => {
    log(`serving on port ${port}`);
  });
})();
