import { pgTable, serial, timestamp, integer, real, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";
import { decksTable } from "./decks";

export const studentModelsTable = pgTable("student_models", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull().references(() => usersTable.id),
  deckId: integer("deck_id").notNull().references(() => decksTable.id),
  averageStability: real("average_stability").notNull().default(1),
  averageDifficulty: real("average_difficulty").notNull().default(5),
  retentionRate: real("retention_rate"),
  totalReviews: integer("total_reviews").notNull().default(0),
  masteryLevel: real("mastery_level").notNull().default(0),
  knowledgeState: jsonb("knowledge_state"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertStudentModelSchema = createInsertSchema(studentModelsTable).omit({ id: true, createdAt: true });
export type InsertStudentModel = z.infer<typeof insertStudentModelSchema>;
export type StudentModel = typeof studentModelsTable.$inferSelect;
