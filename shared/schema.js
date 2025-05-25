import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

/**
 * Users table schema
 */
export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	username: text("username").notNull().unique(),
	password: text("password").notNull(),
});

/**
 * Schema for inserting a user
 */
export const insertUserSchema = createInsertSchema(users).pick({
	username: true,
	password: true,
});
