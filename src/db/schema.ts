import {
  pgTable,
  text,
  timestamp,
  uuid
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  username: text().notNull(),
  createdAt: timestamp().defaultNow().notNull()
});

export const messages = pgTable("messages", {
  id: uuid().defaultRandom().primaryKey(),
  username: text().notNull(),
  content: text().notNull(),
  createdAt: timestamp().defaultNow().notNull()
});