var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
// Knowledge base schema
export var kbSections = pgTable("kb_sections", {
    id: varchar("id").primaryKey().default(sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    title: text("title").notNull(),
    parentId: varchar("parent_id"),
    order: text("order").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
export var kbArticles = pgTable("kb_articles", {
    id: varchar("id").primaryKey().default(sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    title: text("title").notNull(),
    content: text("content").notNull(),
    sectionId: varchar("section_id").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
export var insertKbSectionSchema = createInsertSchema(kbSections).omit({
    id: true,
    createdAt: true,
});
export var insertKbArticleSchema = createInsertSchema(kbArticles).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
// Keep existing user schema for completeness
export var users = pgTable("users", {
    id: varchar("id").primaryKey().default(sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"])))),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
});
export var insertUserSchema = createInsertSchema(users).pick({
    username: true,
    password: true,
});
var templateObject_1, templateObject_2, templateObject_3;
