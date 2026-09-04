import * as z from "zod";
import {
  nullableTextSchema,
  nullableUrlSchema,
  requiredTextSchema,
} from "./commonSchema";

const employmentTypeSchema = z.enum([
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
const payFrequencySchema = z.enum([
  "hourly",
  "daily",
  "weekly",
  "bi_weekly",
  "monthly",
  "annually",
]);
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
  employmentType: employmentTypeSchema.optional(),
  workArrangement: workArrangementSchema.optional(),
  location: jobLocationSchema.nullish().transform((value) => {
    if (
      !value ||
      Object.values(value).every((field) => field == null || field === "")
    )
      return null;

    return value;
  }),
  compensationMin: z.coerce.number().nonnegative().optional(),
  compensationMax: z.coerce.number().nonnegative().optional(),
  currency: z
    .string()
    .trim()
    .length(3)
    .transform((v) => v.toUpperCase())
    .nullish(),
  payFrequency: payFrequencySchema.optional(),
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
  employmentType: employmentTypeSchema.optional(),
  workArrangement: workArrangementSchema,
  location: jobLocationSchema.nullish().transform((value) => {
    if (
      !value ||
      Object.values(value).every((field) => field == null || field === "")
    )
      return null;

    return value;
  }),
  compensationMin: z.coerce.number().nonnegative().optional(),
  compensationMax: z.coerce.number().nonnegative().optional(),
  currency: z
    .string()
    .trim()
    .length(3)
    .transform((v) => v.toUpperCase())
    .nullish(),
  payFrequency: payFrequencySchema.optional(),
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

export const applicationBatchCreateSchema = z.object({
  applications: z.array(applicationFormSchema),
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
export type ApplicationFormInput = z.input<typeof applicationFormSchema>;
export type ApplicationFormOutput = z.output<typeof applicationFormSchema>;

export type ApplicationsBatchCreateFormData = z.infer<
  typeof applicationBatchCreateSchema
>;
export type ApplicationsBatchCreateFormInput = z.input<
  typeof applicationBatchCreateSchema
>;
export type ApplicationsBatchCreateFormOutput = z.output<
  typeof applicationBatchCreateSchema
>;

export type WorkArrangementData = z.infer<typeof workArrangementSchema>;
export type ApplicationStatusData = z.infer<typeof statusSchema>;
export type JobSourceData = z.infer<typeof jobSourceSchema>;
export type JobLocationData = z.infer<typeof jobLocationSchema>;
export const initialValues: ApplicationFormData = {
  company: "",
  position: "",
  employmentType: undefined,
  workArrangement: undefined,
  location: null,
  compensationMin: undefined,
  compensationMax: undefined,
  currency: null,
  payFrequency: "monthly",
  appliedAt: new Date().toISOString(),
  status: "applied",
  jobDescription: null,
  notes: null,
  source: { platform: "", url: null },
};

