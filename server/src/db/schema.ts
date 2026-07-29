import {
  pgTable,
  text,
  timestamp,
  jsonb,
  uuid,
  numeric,
  char,
  boolean,
  primaryKey,
  index,
  check,
} from "drizzle-orm/pg-core";
import {
  applicationStatus,
  employmentType,
  payFrequency,
  eventStatus,
  eventType,
  workArrangement,
} from "./enums.js";
import type {
  ApplicationSource,
  Country,
  EventLocation,
  JobLocation,
  UserSettings,
} from "./types.js";
import { auditAttributes } from "./columns.helper.js";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  settings: jsonb("settings").$type<UserSettings>(),
  country: jsonb("country").$type<Country>(),
  passwordHash: text("password_hash"),
  roleId: uuid("role_id")
    .notNull()
    .references(() => roles.id),
  ...auditAttributes,
});

export const roles = pgTable("roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  ...auditAttributes,
});

export const rolePermissions = pgTable(
  "role_permissions",
  {
    roleId: uuid("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
    permissionId: uuid("permission_id")
      .notNull()
      .references(() => permissions.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({
      name: "role_permissions_pkey",
      columns: [table.roleId, table.permissionId],
    }),
  ],
);

export const permissions = pgTable("permissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  ...auditAttributes,
});

export const applications = pgTable(
  "applications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    company: text("company").notNull(),
    position: text("position").notNull(),
    employmentType: employmentType("employment_type"),
    workArrangement: workArrangement("work_arrangement"),
    location: jsonb("location").$type<JobLocation>(),
    compensationMin: numeric("compensation_min", { precision: 12, scale: 2 }),
    compensationMax: numeric("compensation_max", { precision: 12, scale: 2 }),
    currency: char({ length: 3 }),
    payFrequency: payFrequency("pay_frequency"),
    status: applicationStatus("status").default("applied").notNull(),
    appliedAt: timestamp("applied_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
    jobDescription: text("job_description"),
    notes: text("notes"),
    source: jsonb("source").$type<ApplicationSource>(),
    ...auditAttributes,
  },
  (table) => [
    index("applications_user_applied_at_idx").on(table.userId, table.appliedAt),
    check(
      "applications_compensation_min_positive_check",
      sql`${table.compensationMin} IS NULL OR ${table.compensationMin} >= 0`,
    ),
    check(
      "applications_compensation_max_positive_check",
      sql`${table.compensationMax} IS NULL OR ${table.compensationMax} >= 0`,
    ),
    check(
      "applications_compensation_range_check",
      sql`${table.compensationMin} IS NULL 
      OR ${table.compensationMax} IS NULL 
      OR ${table.compensationMin} <= ${table.compensationMax}`,
    ),
  ],
);

export const applicationStatusHistory = pgTable(
  "application_status_history",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    applicationId: uuid("application_id")
      .notNull()
      .references(() => applications.id, { onDelete: "cascade" }),
    status: applicationStatus("status").notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("application_status_history_application_created_at_idx").on(
      table.applicationId,
      table.createdAt,
    ),
  ],
);

export const experiences = pgTable(
  "experiences",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    company: text("company").notNull(),
    position: text("position").notNull(),
    employmentType: employmentType("employment_type").notNull(),
    workArrangement: workArrangement("work_arrangement"),
    salary: numeric("salary", { precision: 12, scale: 2 }),
    currency: char({ length: 3 }),
    payFrequency: payFrequency("pay_frequency"),
    location: jsonb("location").$type<JobLocation>(),
    startDate: timestamp("start_date", { withTimezone: true }).notNull(),
    endDate: timestamp("end_date", { withTimezone: true }),
    summary: text("summary"),
    ...auditAttributes,
  },
  (table) => [
    index("experiences_user_start_date_idx").on(table.userId, table.startDate),
    check(
      "experiences_salary_positive_check",
      sql`${table.salary} IS NULL OR ${table.salary} >= 0`,
    ),
    check(
      "experiences_date_range_check",
      sql`${table.endDate} IS NULL 
      OR ${table.endDate} >= ${table.startDate}`,
    ),
  ],
);

export const events = pgTable(
  "events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    applicationId: uuid("application_id").references(() => applications.id, {
      onDelete: "cascade",
    }),
    title: text("title").notNull(),
    description: text("description"),
    type: eventType("type").default("meeting").notNull(),
    status: eventStatus("status").default("scheduled").notNull(),
    startAt: timestamp("start_at", {
      withTimezone: true,
    }).notNull(),
    endAt: timestamp("end_at", {
      withTimezone: true,
    }),
    isAllDay: boolean("is_all_day").default(false).notNull(),
    location: jsonb("location").$type<EventLocation>(),
    ...auditAttributes,
  },
  (table) => [
    index("events_user_start_at_idx").on(table.userId, table.startAt),
    check(
      "events_date_range_check",
      sql`${table.endAt} IS NULL 
      OR ${table.endAt} >= ${table.startAt}`,
    ),
  ],
);
