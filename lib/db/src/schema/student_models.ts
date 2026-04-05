import { pgTable, serial, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const studentModelsTable = pgTable("student_models", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull().unique().references(() => usersTable.id),
  modelData: jsonb("model_data").notNull().default({}),
  version: integer("version").notNull().default(1),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertStudentModelSchema = createInsertSchema(studentModelsTable).omit({ id: true, updatedAt: true });
export type InsertStudentModel = z.infer<typeof insertStudentModelSchema>;
export type StudentModel = typeof studentModelsTable.$inferSelect;
