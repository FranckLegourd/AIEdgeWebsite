import { users, projects, inquiries, type User, type InsertUser, type Project, type InsertProject, type Inquiry, type InsertInquiry, type ProjectWithClient } from "@shared/schema";
import session from "express-session";
import MemoryStoreSync from "memorystore";

const MemoryStore = MemoryStoreSync(session);

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

  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private inquiries: Map<number, Inquiry>;
  sessionStore: session.Store;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.inquiries = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
      role: insertUser.role ?? "client",
      company: insertUser.company ?? null,
      isActive: insertUser.isActive ?? true
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getProject(id: number): Promise<ProjectWithClient | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    const client = await this.getUser(project.clientId);
    // In strict mode client should exist, but here we just return what we have
    return { ...project, client: client! };
  }

  async getProjectsByClient(clientId: number): Promise<ProjectWithClient[]> {
    const projects = Array.from(this.projects.values()).filter(
      (project) => project.clientId === clientId
    );
    const client = await this.getUser(clientId);
    return projects.map(p => ({ ...p, client: client! }));
  }

  async getAllProjects(): Promise<ProjectWithClient[]> {
    const projects = Array.from(this.projects.values());
    // Since this is mock, resolving clients for all projects efficiently isn't crucial
    const projectsWithClients = await Promise.all(projects.map(async (p) => {
      const client = await this.getUser(p.clientId);
      return { ...p, client: client! };
    }));
    return projectsWithClients.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentId++;
    const project: Project = {
      ...insertProject,
      id,
      status: insertProject.status ?? "pending",
      budget: insertProject.budget ?? null,
      startDate: insertProject.startDate ?? null,
      endDate: insertProject.endDate ?? null,
      assignedTo: insertProject.assignedTo ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    const updatedProject = { ...project, ...updates, updatedAt: new Date() };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  async getInquiry(id: number): Promise<Inquiry | undefined> {
    return this.inquiries.get(id);
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentId++;
    const inquiry: Inquiry = {
      ...insertInquiry,
      id,
      createdAt: new Date(),
      message: insertInquiry.message ?? null,
      status: insertInquiry.status ?? "new"
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async updateInquiry(id: number, updates: Partial<InsertInquiry>): Promise<Inquiry | undefined> {
    const inquiry = this.inquiries.get(id);
    if (!inquiry) return undefined;
    const updatedInquiry = { ...inquiry, ...updates };
    this.inquiries.set(id, updatedInquiry);
    return updatedInquiry;
  }
}

export const storage = new MemStorage();
