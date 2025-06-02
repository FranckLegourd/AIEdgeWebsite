import { users, projects, inquiries, type User, type InsertUser, type Project, type InsertProject, type Inquiry, type InsertInquiry, type ProjectWithClient } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  
  // Project methods
  getProject(id: number): Promise<ProjectWithClient | undefined>;
  getProjectsByClient(clientId: number): Promise<ProjectWithClient[]>;
  getAllProjects(): Promise<ProjectWithClient[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Inquiry methods
  getInquiry(id: number): Promise<Inquiry | undefined>;
  getAllInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  updateInquiry(id: number, updates: Partial<InsertInquiry>): Promise<Inquiry | undefined>;
  
  sessionStore: session.SessionStore;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    return user || undefined;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  }

  // Project methods
  async getProject(id: number): Promise<ProjectWithClient | undefined> {
    const [project] = await db
      .select({
        id: projects.id,
        title: projects.title,
        description: projects.description,
        status: projects.status,
        serviceType: projects.serviceType,
        clientId: projects.clientId,
        assignedTo: projects.assignedTo,
        budget: projects.budget,
        startDate: projects.startDate,
        endDate: projects.endDate,
        createdAt: projects.createdAt,
        updatedAt: projects.updatedAt,
        client: {
          id: users.id,
          firstName: users.firstName,
          lastName: users.lastName,
          email: users.email,
          company: users.company,
        },
      })
      .from(projects)
      .leftJoin(users, eq(projects.clientId, users.id))
      .where(eq(projects.id, id));

    return project || undefined;
  }

  async getProjectsByClient(clientId: number): Promise<ProjectWithClient[]> {
    return await db
      .select({
        id: projects.id,
        title: projects.title,
        description: projects.description,
        status: projects.status,
        serviceType: projects.serviceType,
        clientId: projects.clientId,
        assignedTo: projects.assignedTo,
        budget: projects.budget,
        startDate: projects.startDate,
        endDate: projects.endDate,
        createdAt: projects.createdAt,
        updatedAt: projects.updatedAt,
        client: {
          id: users.id,
          firstName: users.firstName,
          lastName: users.lastName,
          email: users.email,
          company: users.company,
        },
      })
      .from(projects)
      .leftJoin(users, eq(projects.clientId, users.id))
      .where(eq(projects.clientId, clientId))
      .orderBy(desc(projects.createdAt));
  }

  async getAllProjects(): Promise<ProjectWithClient[]> {
    return await db
      .select({
        id: projects.id,
        title: projects.title,
        description: projects.description,
        status: projects.status,
        serviceType: projects.serviceType,
        clientId: projects.clientId,
        assignedTo: projects.assignedTo,
        budget: projects.budget,
        startDate: projects.startDate,
        endDate: projects.endDate,
        createdAt: projects.createdAt,
        updatedAt: projects.updatedAt,
        client: {
          id: users.id,
          firstName: users.firstName,
          lastName: users.lastName,
          email: users.email,
          company: users.company,
        },
      })
      .from(projects)
      .leftJoin(users, eq(projects.clientId, users.id))
      .orderBy(desc(projects.createdAt));
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values({
      ...insertProject,
      updatedAt: new Date(),
    }).returning();
    return project;
  }

  async updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | undefined> {
    const [project] = await db.update(projects).set({
      ...updates,
      updatedAt: new Date(),
    }).where(eq(projects.id, id)).returning();
    return project || undefined;
  }

  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return result.rowCount > 0;
  }

  // Inquiry methods
  async getInquiry(id: number): Promise<Inquiry | undefined> {
    const [inquiry] = await db.select().from(inquiries).where(eq(inquiries.id, id));
    return inquiry || undefined;
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db.insert(inquiries).values(insertInquiry).returning();
    return inquiry;
  }

  async updateInquiry(id: number, updates: Partial<InsertInquiry>): Promise<Inquiry | undefined> {
    const [inquiry] = await db.update(inquiries).set(updates).where(eq(inquiries.id, id)).returning();
    return inquiry || undefined;
  }
}

export const storage = new DatabaseStorage();
