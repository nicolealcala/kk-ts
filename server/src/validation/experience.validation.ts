import { z } from "zod";
import {
  jobLocationSchema,
  nullableTextSchema,
  requiredTextSchema,
} from "./common.validation.js";
import {
  employmentType,
  payFrequency,
  workArrangement,
} from "../db/schema/enums.js";

const experienceDateValidationSchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().nullish(),
  isCurrent: z.boolean().optional(),
});

type ExperienceDateValidationInput = z.infer<
  typeof experienceDateValidationSchema
>;

const validateExperienceDateConstraints = (
  data: ExperienceDateValidationInput,
  ctx: z.RefinementCtx,
) => {
  if (data.endDate != null && data.startDate && data.endDate < data.startDate)
    ctx.addIssue({
      code: "custom",
      message: "End date cannot be before start date",
      path: ["endDate"],
    });

  if (data.isCurrent && data.endDate != null)
    ctx.addIssue({
      code: "custom",
      message: "Current experience cannot have an end date",
      path: ["endDate"],
    });
};

export const createExperienceSchema = z
  .object({
    company: requiredTextSchema,
    position: requiredTextSchema,
    employmentType: z.enum(employmentType.enumValues),
    workArrangement: z.enum(workArrangement.enumValues).nullish(),
    salary: z.coerce.number().nonnegative().nullish(),
    currency: z
      .string()
      .trim()
      .length(3)
      .transform((v) => v.toUpperCase())
      .nullish(),
    payFrequency: z.enum(payFrequency.enumValues).nullish(),
    location: jobLocationSchema.nullish(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().nullish(),
    isCurrent: z.boolean().optional(),
    summary: nullableTextSchema,
  })
  .superRefine(validateExperienceDateConstraints);

export const updateExperienceSchema = z
  .object({
    company: requiredTextSchema.optional(),
    position: requiredTextSchema.optional(),
    employmentType: z.enum(employmentType.enumValues).optional(),
    workArrangement: z.enum(workArrangement.enumValues).nullish(),
    salary: z.coerce.number().nonnegative().nullish(),
    currency: z
      .string()
      .trim()
      .length(3)
      .transform((v) => v.toUpperCase())
      .nullish(),
    payFrequency: z.enum(payFrequency.enumValues).nullish(),
    location: jobLocationSchema.nullish(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().nullish(),
    isCurrent: z.boolean().optional(),
    summary: nullableTextSchema,
  })
  .superRefine(validateExperienceDateConstraints);
