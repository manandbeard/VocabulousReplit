import { pgTable, text, serial, timestamp, integer, real, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";
import { decksTable } from "./decks";
import { classesTable } from "./classes";

export const assessmentsTable = pgTable("assessments", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  teacherId: integer("teacher_id").notNull().references(() => usersTable.id),
  classId: integer("class_id").references(() => classesTable.id),
  deckId: integer("deck_id").references(() => decksTable.id),
  cardCount: integer("card_count").notNull().default(10),
  passingScore: real("passing_score").notNull().default(0.7),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const assessmentResultsTable = pgTable("assessment_results", {
  id: serial("id").primaryKey(),
  assessmentId: integer("assessment_id").notNull().references(() => assessmentsTable.id),
  studentId: integer("student_id").notNull().references(() => usersTable.id),
  score: real("score").notNull(),
  passed: boolean("passed").notNull(),
  answers: jsonb("answers").$type<Record<string, string>>(),
  completedAt: timestamp("completed_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertAssessmentSchema = createInsertSchema(assessmentsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Assessment = typeof assessmentsTable.$inferSelect;

export const insertAssessmentResultSchema = createInsertSchema(assessmentResultsTable).omit({ id: true, completedAt: true });
export type InsertAssessmentResult = z.infer<typeof insertAssessmentResultSchema>;
export type AssessmentResult = typeof assessmentResultsTable.$inferSelect;
