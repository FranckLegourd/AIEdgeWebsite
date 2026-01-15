import { z } from "zod";

export const insertUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  company: z.string().nullable().optional(),
  role: z.string().default("client"),
  isActive: z.boolean().default(true),
});

export const insertProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.string().default("pending"),
  serviceType: z.string(),
  clientId: z.number(),
  assignedTo: z.number().nullable().optional(),
  budget: z.number().nullable().optional(),
  startDate: z.coerce.date().nullable().optional(),
  endDate: z.coerce.date().nullable().optional(),
});

export const insertInquirySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company is required"),
  serviceInterest: z.string().min(1, "Service interest is required"),
  message: z.string().nullable().optional(),
  status: z.string().default("new"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;

export type User = InsertUser & {
  id: number;
  createdAt: Date;
  company: string | null; // Normalize optional to null for strict checks
  role: string;
  isActive: boolean;
};

export type Project = InsertProject & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  assignedTo: number | null;
  budget: number | null;
  startDate: Date | null;
  endDate: Date | null;
};

export type Inquiry = InsertInquiry & {
  id: number;
  createdAt: Date;
  message: string | null;
  status: string;
};

// Extended types for API responses
export type ProjectWithClient = Project & {
  client: Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'company'>;
  assignee?: Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>;
};

export type UserWithProjects = User & {
  projects: Project[];
};

// Fake exports to satisfy imports in other files that might still import them
// even though they aren't used for database queries anymore
export const users = {};
export const projects = {};
export const inquiries = {};

