import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
// Knowledge base schema
export const kbSections = pgTable("kb_sections", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    title: text("title").notNull(),
    parentId: varchar("parent_id"),
    order: text("order").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
export const kbArticles = pgTable("kb_articles", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    title: text("title").notNull(),
    content: text("content").notNull(),
    sectionId: varchar("section_id").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
export const insertKbSectionSchema = createInsertSchema(kbSections).omit({
    id: true,
    createdAt: true,
});
export const insertKbArticleSchema = createInsertSchema(kbArticles).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
// Keep existing user schema for completeness
export const users = pgTable("users", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
});
export const insertUserSchema = createInsertSchema(users).pick({
    username: true,
    password: true,
});
