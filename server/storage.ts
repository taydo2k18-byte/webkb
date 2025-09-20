import { 
  type User, type InsertUser, 
  type KbSection, type InsertKbSection,
  type KbArticle, type InsertKbArticle,
  users, kbSections, kbArticles 
} from "../shared/schema.js";
import { db } from "./db.js";
import { eq, like, or, isNull } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // KB Section methods
  getAllSections(): Promise<KbSection[]>;
  getSection(id: string): Promise<KbSection | undefined>;
  createSection(section: InsertKbSection): Promise<KbSection>;
  updateSection(id: string, section: Partial<InsertKbSection>): Promise<KbSection | undefined>;
  deleteSection(id: string): Promise<boolean>;
  
  // KB Article methods
  getAllArticles(): Promise<KbArticle[]>;
  getArticle(id: string): Promise<KbArticle | undefined>;
  getArticlesBySection(sectionId: string): Promise<KbArticle[]>;
  createArticle(article: InsertKbArticle): Promise<KbArticle>;
  updateArticle(id: string, article: Partial<InsertKbArticle>): Promise<KbArticle | undefined>;
  deleteArticle(id: string): Promise<boolean>;
  searchArticles(query: string): Promise<KbArticle[]>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // KB Section methods
  async getAllSections(): Promise<KbSection[]> {
    return await db.select().from(kbSections).orderBy(kbSections.order);
  }

  async getSection(id: string): Promise<KbSection | undefined> {
    const [section] = await db.select().from(kbSections).where(eq(kbSections.id, id));
    return section || undefined;
  }

  async createSection(section: InsertKbSection): Promise<KbSection> {
    const [newSection] = await db.insert(kbSections).values(section).returning();
    return newSection;
  }

  async updateSection(id: string, section: Partial<InsertKbSection>): Promise<KbSection | undefined> {
    const [updatedSection] = await db
      .update(kbSections)
      .set(section)
      .where(eq(kbSections.id, id))
      .returning();
    return updatedSection || undefined;
  }

  async deleteSection(id: string): Promise<boolean> {
    const result = await db.delete(kbSections).where(eq(kbSections.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // KB Article methods
  async getAllArticles(): Promise<KbArticle[]> {
    return await db.select().from(kbArticles);
  }

  async getArticle(id: string): Promise<KbArticle | undefined> {
    const [article] = await db.select().from(kbArticles).where(eq(kbArticles.id, id));
    return article || undefined;
  }

  async getArticlesBySection(sectionId: string): Promise<KbArticle[]> {
    return await db.select().from(kbArticles).where(eq(kbArticles.sectionId, sectionId));
  }

  async createArticle(article: InsertKbArticle): Promise<KbArticle> {
    const [newArticle] = await db.insert(kbArticles).values(article).returning();
    return newArticle;
  }

  async updateArticle(id: string, article: Partial<InsertKbArticle>): Promise<KbArticle | undefined> {
    const [updatedArticle] = await db
      .update(kbArticles)
      .set({
        ...article,
        updatedAt: new Date()
      })
      .where(eq(kbArticles.id, id))
      .returning();
    return updatedArticle || undefined;
  }

  async deleteArticle(id: string): Promise<boolean> {
    const result = await db.delete(kbArticles).where(eq(kbArticles.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async searchArticles(query: string): Promise<KbArticle[]> {
    return await db
      .select()
      .from(kbArticles)
      .where(
        or(
          like(kbArticles.title, `%${query}%`),
          like(kbArticles.content, `%${query}%`)
        )
      );
  }
}

export const storage = new DatabaseStorage();
