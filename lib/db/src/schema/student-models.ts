import { pgTable, text, serial, timestamp, integer, jsonb, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";
import { classesTable } from "./classes";

export const studentModelsTable = pgTable(
  "student_models",
  {
    id: serial("id").primaryKey(),
    studentId: integer("student_id").notNull().references(() => usersTable.id),
    classId: integer("class_id").references(() => classesTable.id),
    modelVersion: text("model_version").notNull().default("v1"),
    adaptationPhase: text("adaptation_phase").notNull().default("cold_start").$type<"cold_start" | "warming" | "adapted">(),
    metaParams: jsonb("meta_params").$type<Record<string, unknown>>(),
    lastUpdatedAt: timestamp("last_updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("student_models_student_class_unique")
      .on(table.studentId, table.classId)
      .where(sql`${table.classId} is not null`),
    uniqueIndex("student_models_student_null_class_unique")
      .on(table.studentId)
      .where(sql`${table.classId} is null`),
  ],
);

export const insertStudentModelSchema = createInsertSchema(studentModelsTable).omit({ id: true, createdAt: true, lastUpdatedAt: true });
export type InsertStudentModel = z.infer<typeof insertStudentModelSchema>;
export type StudentModel = typeof studentModelsTable.$inferSelect;
