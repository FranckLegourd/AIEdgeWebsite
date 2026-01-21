import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertProjectSchema, insertInquirySchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

export function registerRoutes(app: Express): Server {
  // Setup authentication routes
  setupAuth(app);

  // Email transporter configuration for Hostinger
  // Email transporter configuration for Hostinger
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.hostinger.com",
    port: parseInt(process.env.MAIL_PORT || "587"),
    secure: (process.env.MAIL_PORT || "587") === "465", // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME || "agent@aiedgeinternational.com",
      pass: process.env.MAIL_PASSWORD,
    },
    // Add explicit timeout settings
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  // Project routes
  app.get("/api/projects", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      let projects;
      if (req.user!.role === "admin") {
        projects = await storage.getAllProjects();
      } else {
        projects = await storage.getProjectsByClient(req.user!.id);
      }

      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Check if user has access to this project
      if (req.user!.role !== "admin" && project.clientId !== req.user!.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Only admins can create projects
      if (req.user!.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }

      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);

      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/projects/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Only admins can update projects
      if (req.user!.role !== "admin") {
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
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Only admins can delete projects
      if (req.user!.role !== "admin") {
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

  // Inquiry routes
  app.get("/api/inquiries", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Only admins can view all inquiries
      if (req.user!.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }

      const inquiries = await storage.getAllInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/inquiries", async (req, res) => {
    try {
      const inquiryData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(inquiryData);

      // Collect debug info for troubleshooting at Hostinger
      const mailHost = process.env.MAIL_HOST || "smtp.hostinger.com";
      const mailPort = process.env.MAIL_PORT || "587";
      const mailUsername = process.env.MAIL_USERNAME || "agent@aiedgeinternational.com";
      const mailPasswordSet = !!process.env.MAIL_PASSWORD;
      const mailPasswordLength = process.env.MAIL_PASSWORD?.length || 0;

      const debugInfo = {
        mailConfig: {
          host: mailHost,
          port: mailPort,
          secure: mailPort === "465",
          username: mailUsername,
          passwordSet: mailPasswordSet,
          passwordLength: mailPasswordLength,
        },
        emailStatus: "pending",
        emailError: null as string | null,
        timestamp: new Date().toISOString(),
        nodeEnv: process.env.NODE_ENV || "not set",
      };

      // Send email notification
      const mailOptions = {
        from: `"AI Edge Website" <${mailUsername}>`,
        to: "frank.legourd@aiedgeinternational.com",
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
          <p>${(inquiryData.message || "No message provided").replace(/\n/g, '<br>')}</p>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Inquiry notification email sent successfully.");
        debugInfo.emailStatus = "sent";
      } catch (emailError: any) {
        console.error("Failed to send inquiry notification email:", emailError);
        debugInfo.emailStatus = "failed";
        debugInfo.emailError = emailError?.message || String(emailError);
        // Do not fail the request if email sending fails, as the inquiry is already saved
      }

      // Return inquiry with debug info
      res.status(201).json({
        ...inquiry,
        _debug: debugInfo,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      console.error("Error creating inquiry:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/inquiries/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Only admins can update inquiries
      if (req.user!.role !== "admin") {
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
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      console.error("Error updating inquiry:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // User management routes (admin only)
  app.get("/api/users", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Only admins can view all users
      if (req.user!.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }

      const users = await storage.getAllUsers();
      // Remove password from response
      const safeUsers = users.map(({ password, ...user }) => user);
      res.json(safeUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/users/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Only admins can update users
      if (req.user!.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }

      const id = parseInt(req.params.id);
      const updates = req.body;

      // Don't allow password updates through this endpoint
      delete updates.password;

      const user = await storage.updateUser(id, updates);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Remove password from response
      const { password, ...safeUser } = user;
      res.json(safeUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
