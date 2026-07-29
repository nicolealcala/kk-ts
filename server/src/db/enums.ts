import { pgEnum } from "drizzle-orm/pg-core";

export const applicationStatus = pgEnum("application_status", [
  "applied",
  "viewed",
  "initial_interview",
  "assessment",
  "final_interview",
  "offer_received",
  "offer_declined",
  "offer_accepted",
  "rejected",
  "withdrawn",
]);

export const workArrangement = pgEnum("work_arrangement", [
  "remote",
  "hybrid",
  "onsite",
]);

export const eventType = pgEnum("event_type", [
  "meeting",
  "interview",
  "assessment",
  "task",
  "follow_up",
  "other",
]);

export const eventStatus = pgEnum("event_status", [
  "scheduled",
  "cancelled",
  "cancelled",
  "missed",
]);

export const employmentType = pgEnum("employment_type", [
  "full_time",
  "part_time",
  "contract",
  "fixed_term",
  "temporary",
  "internship",
  "freelance",
  "self_employed",
  "volunteer",
  "apprenticeship",
]);

export const payFrequency = pgEnum("pay_frequency", [
  "hourly",
  "daily",
  "weekly",
  "bi_weekly",
  "monthly",
  "annually",
]);
