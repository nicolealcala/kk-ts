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
