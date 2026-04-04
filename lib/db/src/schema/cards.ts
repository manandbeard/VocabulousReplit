import { pgTable, text, serial, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { decksTable } from "./decks";
import { usersTable } from "./users";

export const cardsTable = pgTable("cards", {
  id: serial("id").primaryKey(),
  deckId: integer("deck_id").notNull().references(() => decksTable.id),
  front: text("front").notNull(),
  back: text("back").notNull(),
  hint: text("hint"),
  tags: text("tags").array().notNull().default([]),
  cardType: text("card_type").notNull().default("flashcard").$type<"flashcard" | "multiple_choice" | "brain_dump">(),
  importance: integer("importance").notNull().default(3),
  imageUrl: text("image_url"),
  mcOptions: jsonb("mc_options").$type<string[]>(),
  mcCorrectIndex: integer("mc_correct_index"),
  createdBy: integer("created_by").references(() => usersTable.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertCardSchema = createInsertSchema(cardsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertCard = z.infer<typeof insertCardSchema>;
export type Card = typeof cardsTable.$inferSelect;
