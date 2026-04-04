import { pgTable, serial, timestamp, integer, jsonb, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";
import { classesTable } from "./classes";

/**
 * Stores per-student MetaSRS model parameters (φ*) for the neural scheduling engine.
 * One row per (student, class) pair. Updated after each adaptation phase.
 */
export const studentModelsTable = pgTable("student_models", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull().references(() => usersTable.id),
  classId: integer("class_id").notNull().references(() => classesTable.id),
  adaptationPhase: text("adaptation_phase").notNull().default("cold_start").$type<"cold_start" | "warm" | "adapted">(),
  phiParams: jsonb("phi_params"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertStudentModelSchema = createInsertSchema(studentModelsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertStudentModel = z.infer<typeof insertStudentModelSchema>;
export type StudentModel = typeof studentModelsTable.$inferSelect;
