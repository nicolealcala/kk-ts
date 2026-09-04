import { z } from "zod";
import {
  applicationStatus,
  employmentType,
  payFrequency,
  workArrangement,
} from "../db/schema/enums.js";
import {
  applicationSourceSchema,
  jobLocationSchema,
  nullableTextSchema,
  requiredTextSchema,
} from "./common.validation.js";

export const createApplicationSchema = z
  .object({
    company: requiredTextSchema,
    position: requiredTextSchema,
    employmentType: z.enum(employmentType.enumValues).nullish(),
    workArrangement: z.enum(workArrangement.enumValues).nullish(),
    location: jobLocationSchema.nullish(),
    compensationMin: z.coerce.number().nonnegative().nullish(),
    compensationMax: z.coerce.number().nonnegative().nullish(),
    currency: z
      .string()
      .trim()
      .length(3)
      .transform((v) => v.toUpperCase())
      .nullish(),
    payFrequency: z.enum(payFrequency.enumValues).nullish(),
    appliedAt: z.coerce.date().optional(),
    status: z.enum(applicationStatus.enumValues).optional(),
    jobDescription: nullableTextSchema,
    notes: nullableTextSchema,
    source: applicationSourceSchema.nullish(),
  })
  .refine(
    (data) =>
      data.compensationMin == null ||
      data.compensationMax == null ||
      data.compensationMin <= data.compensationMax,
    {
      error: "Minimum compensation cannot exceed maximum compensation",
      path: ["compensationMin"],
    },
  );

export const createManyApplicationsSchema = z
  .array(createApplicationSchema)
  .min(1);
export const updateApplicationSchema = z
  .object({
    company: requiredTextSchema.optional(),
    position: requiredTextSchema.optional(),
    employmentType: z.enum(employmentType.enumValues).nullish(),
    workArrangement: z.enum(workArrangement.enumValues).nullish(),
    location: jobLocationSchema.nullish(),
    compensationMin: z.coerce.number().nonnegative().nullish(),
    compensationMax: z.coerce.number().nonnegative().nullish(),
    currency: z
      .string()
      .trim()
      .length(3)
      .transform((v) => v.toUpperCase())
      .nullish(),
    payFrequency: z.enum(payFrequency.enumValues).nullish(),
    appliedAt: z.coerce.date().optional(),
    status: z.enum(applicationStatus.enumValues).optional(),
    jobDescription: nullableTextSchema,
    notes: nullableTextSchema,
    source: applicationSourceSchema.nullish(),
  })
  .superRefine((data, ctx) => {
    if (Object.keys(data).length === 0)
      ctx.addIssue({
        code: "custom",
        message: "At least one field must be provided",
      });

    if (
      data.compensationMin != null &&
      data.compensationMax != null &&
      data.compensationMin > data.compensationMax
    )
      ctx.addIssue({
        code: "custom",
        message: "Minimum compensation cannot exceed maximum compensation",
        path: ["compensationMin"],
      });
  });

export const applicationListQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().default(10),
  sortBy: z
    .enum([
      "appliedAt",
      "position",
      "company",
      "location",
      "source",
      "workArrangement",
      "status",
    ])
    .default("appliedAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  search: z.string().trim().optional(),
  workArrangement: z.array(z.enum(workArrangement.enumValues)).optional(),
  status: z.array(z.enum(applicationStatus.enumValues)).optional(),
  appliedAtFrom: z.coerce.date().optional(),
  appliedAtTo: z.coerce.date().optional(),
});

export type CreateApplicationData = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationData = z.infer<typeof updateApplicationSchema>;
export type ApplicationListQuery = z.infer<typeof applicationListQuerySchema>;
