import * as z from "zod";
import {
  nullableTextSchema,
  nullableUrlSchema,
  requiredTextSchema,
} from "./commonSchema";

const employmentTypeSchema = z
  .enum([
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
  ])
  .nullish();

const payFrequencySchema = z
  .enum(["hourly", "daily", "weekly", "bi_weekly", "monthly", "annually"])
  .nullish();

const statusSchema = z
  .enum([
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
  ])
  .nonoptional("Plase add application status");

const workArrangementSchema = z.enum(["onsite", "remote", "hybrid"]);

const jobSourceSchema = z.object({
  platform: requiredTextSchema("Please add application source"),
  url: nullableUrlSchema,
});

const jobLocationSchema = z.object({
  countryCode: z
    .string()
    .length(2)
    .transform((value) => value.toUpperCase())
    .nullish(),
  state: nullableTextSchema,
  city: nullableTextSchema,
});
export const applicationFormSchema = z.object({
  company: requiredTextSchema("Please provide a company"),
  position: requiredTextSchema("Please indicate position"),
  employmentType: employmentTypeSchema,
  workArrangement: workArrangementSchema.nullish(),
  location: jobLocationSchema.nullish().transform((value) => {
    if (
      !value ||
      Object.values(value).every((field) => field == null || field === "")
    )
      return null;

    return value;
  }),
  compensationMin: z.coerce.number().nonnegative().nullish(),
  compensationMax: z.coerce.number().nonnegative().nullish(),
  currency: z
    .string()
    .trim()
    .length(3)
    .transform((v) => v.toUpperCase())
    .nullish(),
  payFrequency: payFrequencySchema,
  appliedAt: z.string(),
  status: statusSchema,
  jobDescription: nullableTextSchema,
  notes: nullableTextSchema,
  source: jobSourceSchema,
  statusHistory: z
    .array(
      z.object({
        applicationId: z.string().trim().min(1),
        status: statusSchema,
        notes: nullableTextSchema,
        createdAt: z.string(),
      }),
    )
    .nullish(),
});

export const appplicationListSchema = z.object({
  company: requiredTextSchema("Please provide a company"),
  position: requiredTextSchema("Please indicate position"),
  employmentType: employmentTypeSchema,
  workArrangement: workArrangementSchema,
  location: jobLocationSchema.nullish().transform((value) => {
    if (
      !value ||
      Object.values(value).every((field) => field == null || field === "")
    )
      return null;

    return value;
  }),
  compensationMin: z.coerce.number().nonnegative().nullish(),
  compensationMax: z.coerce.number().nonnegative().nullish(),
  currency: z
    .string()
    .trim()
    .length(3)
    .transform((v) => v.toUpperCase())
    .nullish(),
  payFrequency: payFrequencySchema,
  appliedAt: z.string(),
  status: statusSchema,
  jobDescription: nullableTextSchema,
  notes: nullableTextSchema,
  source: jobSourceSchema,
  statusHistory: z
    .array(
      z.object({
        applicationId: z.string().trim().min(1),
        status: statusSchema,
        notes: nullableTextSchema,
        createdAt: z.string(),
      }),
    )
    .nullish(),
});

export const applicationsFormSchema = z.object({
  applications: z.array(applicationFormSchema),
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
export type ApplicationFormInput = z.input<typeof applicationFormSchema>;
export type ApplicationFormOutput = z.output<typeof applicationFormSchema>;

export type ApplicationsFormData = z.infer<typeof applicationsFormSchema>;
export type ApplicationsFormInput = z.input<typeof applicationsFormSchema>;
export type ApplicationsFormOutput = z.output<typeof applicationsFormSchema>;

export type WorkArrangementData = z.infer<typeof workArrangementSchema>;
export type ApplicationStatusData = z.infer<typeof statusSchema>;
export type JobSourceData = z.infer<typeof jobSourceSchema>;
export type JobLocationData = z.infer<typeof jobLocationSchema>;
export const initialValues: ApplicationFormData = {
  company: "",
  position: "",
  employmentType: null,
  workArrangement: null,
  location: null,
  compensationMin: null,
  compensationMax: null,
  currency: null,
  payFrequency: "monthly",
  appliedAt: new Date().toISOString(),
  status: "applied",
  jobDescription: null,
  notes: null,
  source: { platform: "", url: null },
};
