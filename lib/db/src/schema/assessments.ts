import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { classesTable } from "./classes";
import { usersTable } from "./users";

export const assessmentsTable = pgTable("assessments", {
  id: serial("id").primaryKey(),
  classId: integer("class_id").notNull().references(() => classesTable.id),
  title: text("title").notNull(),
  description: text("description"),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
  dueAt: timestamp("due_at", { withTimezone: true }),
  createdBy: integer("created_by").notNull().references(() => usersTable.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertAssessmentSchema = createInsertSchema(assessmentsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Assessment = typeof assessmentsTable.$inferSelect;
