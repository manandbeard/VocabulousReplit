import { pgTable, text, serial, timestamp, integer, jsonb, check } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { sql } from "drizzle-orm";
import { decksTable } from "./decks";

export const cardsTable = pgTable("cards", {
  id: serial("id").primaryKey(),
  deckId: integer("deck_id").notNull().references(() => decksTable.id),
  front: text("front").notNull(),
  back: text("back").notNull(),
  hint: text("hint"),
  tags: text("tags").array().notNull().default([]),
  cardType: text("card_type").notNull().default("basic").$type<"basic" | "multiple_choice" | "brain_dump">(),
  importance: integer("importance").notNull().default(5),
  imageUrl: text("image_url"),
  mcOptions: jsonb("mc_options").$type<string[]>(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
  check("importance_range", sql`${table.importance} >= 1 AND ${table.importance} <= 10`),
]);

export const insertCardSchema = createInsertSchema(cardsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertCard = z.infer<typeof insertCardSchema>;
export type Card = typeof cardsTable.$inferSelect;
