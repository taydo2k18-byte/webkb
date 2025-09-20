import { users, kbSections, kbArticles } from "../shared/schema.js";
import { db } from "./db.js";
import { eq, like, or } from "drizzle-orm";
export class DatabaseStorage {
    // User methods
    async getUser(id) {
        const [user] = await db.select().from(users).where(eq(users.id, id));
        return user || undefined;
    }
    async getUserByUsername(username) {
        const [user] = await db.select().from(users).where(eq(users.username, username));
        return user || undefined;
    }
    async createUser(insertUser) {
        const [user] = await db.insert(users).values(insertUser).returning();
        return user;
    }
    // KB Section methods
    async getAllSections() {
        return await db.select().from(kbSections).orderBy(kbSections.order);
    }
    async getSection(id) {
        const [section] = await db.select().from(kbSections).where(eq(kbSections.id, id));
        return section || undefined;
    }
    async createSection(section) {
        const [newSection] = await db.insert(kbSections).values(section).returning();
        return newSection;
    }
    async updateSection(id, section) {
        const [updatedSection] = await db
            .update(kbSections)
            .set(section)
            .where(eq(kbSections.id, id))
            .returning();
        return updatedSection || undefined;
    }
    async deleteSection(id) {
        const result = await db.delete(kbSections).where(eq(kbSections.id, id));
        return (result.rowCount ?? 0) > 0;
    }
    // KB Article methods
    async getAllArticles() {
        return await db.select().from(kbArticles);
    }
    async getArticle(id) {
        const [article] = await db.select().from(kbArticles).where(eq(kbArticles.id, id));
        return article || undefined;
    }
    async getArticlesBySection(sectionId) {
        return await db.select().from(kbArticles).where(eq(kbArticles.sectionId, sectionId));
    }
    async createArticle(article) {
        const [newArticle] = await db.insert(kbArticles).values(article).returning();
        return newArticle;
    }
    async updateArticle(id, article) {
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
    async deleteArticle(id) {
        const result = await db.delete(kbArticles).where(eq(kbArticles.id, id));
        return (result.rowCount ?? 0) > 0;
    }
    async searchArticles(query) {
        return await db
            .select()
            .from(kbArticles)
            .where(or(like(kbArticles.title, `%${query}%`), like(kbArticles.content, `%${query}%`)));
    }
}
export const storage = new DatabaseStorage();
