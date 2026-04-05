import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";
import { classesTable } from "./classes";

export const alertsTable = pgTable("alerts", {
  id: serial("id").primaryKey(),
  teacherId: integer("teacher_id").notNull().references(() => usersTable.id),
  studentId: integer("student_id").notNull().references(() => usersTable.id),
  classId: integer("class_id").notNull().references(() => classesTable.id),
  alertType: text("alert_type").notNull().$type<"no_reviews" | "low_retention" | "overdue_cards" | "assessment_risk">(),
  message: text("message").notNull(),
  resolved: boolean("resolved").notNull().default(false),
  resolvedAt: timestamp("resolved_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertAlertSchema = createInsertSchema(alertsTable).omit({ id: true, createdAt: true });
export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type Alert = typeof alertsTable.$inferSelect;
