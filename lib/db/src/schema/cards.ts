import { pgTable, text, serial, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { decksTable } from "./decks";
import { usersTable } from "./users";

export const cardTypeEnum = pgEnum("card_type", ["flashcard", "multiple_choice", "brain_dump"]);

export const cardsTable = pgTable("cards", {
  id: serial("id").primaryKey(),
  deckId: integer("deck_id").notNull().references(() => decksTable.id),
  front: text("front").notNull(),
  back: text("back").notNull(),
  hint: text("hint"),
  tags: text("tags").array().notNull().default([]),
  createdBy: integer("created_by").references(() => usersTable.id),
  cardType: cardTypeEnum("card_type").notNull().default("flashcard"),
  imageUrl: text("image_url"),
  mcOptions: text("mc_options").array(),
  mcCorrectIndex: integer("mc_correct_index"),
  importance: integer("importance").notNull().default(3),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertCardSchema = createInsertSchema(cardsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertCard = z.infer<typeof insertCardSchema>;
export type Card = typeof cardsTable.$inferSelect;
