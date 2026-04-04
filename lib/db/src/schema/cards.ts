import { pgTable, text, serial, timestamp, integer, real, jsonb } from "drizzle-orm/pg-core";
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
  // Card type & media
  cardType: text("card_type").notNull().default("flashcard").$type<"flashcard" | "multiple_choice" | "brain_dump">(),
  importance: real("importance").notNull().default(1.0),
  imageUrl: text("image_url"),
  // Multiple-choice specific fields
  mcOptions: jsonb("mc_options").$type<string[]>(),
  mcCorrectIndex: integer("mc_correct_index"),
  // Authorship
  createdBy: integer("created_by").references(() => usersTable.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertCardSchema = createInsertSchema(cardsTable)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .refine(
    (data) =>
      data.cardType !== "multiple_choice" ||
      (Array.isArray(data.mcOptions) && data.mcOptions.length >= 2 && data.mcCorrectIndex != null),
    { message: "multiple_choice cards require mcOptions (≥2 items) and mcCorrectIndex" },
  );
export type InsertCard = z.infer<typeof insertCardSchema>;
export type Card = typeof cardsTable.$inferSelect;
