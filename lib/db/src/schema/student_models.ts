import { pgTable, serial, timestamp, integer, real, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";
import { decksTable } from "./decks";

/**
 * Per-student, per-deck FSRS memory model snapshot.
 * Stores the aggregated FSRS parameters (difficulty, stability) and
 * predicted retention across an entire deck for fast dashboard queries.
 */
export const studentModelsTable = pgTable("student_models", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull().references(() => usersTable.id),
  deckId: integer("deck_id").notNull().references(() => decksTable.id),
  averageStability: real("average_stability"),
  averageDifficulty: real("average_difficulty"),
  predictedRetention: real("predicted_retention"),
  cardsLearned: integer("cards_learned").notNull().default(0),
  cardsMature: integer("cards_mature").notNull().default(0),
  modelParams: jsonb("model_params").$type<Record<string, number>>(),
  lastComputedAt: timestamp("last_computed_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertStudentModelSchema = createInsertSchema(studentModelsTable).omit({ id: true, lastComputedAt: true, updatedAt: true });
export type InsertStudentModel = z.infer<typeof insertStudentModelSchema>;
export type StudentModel = typeof studentModelsTable.$inferSelect;
