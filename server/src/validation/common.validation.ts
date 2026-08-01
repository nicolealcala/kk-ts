import { z } from "zod";

const emptyStringToNull = (value: string) =>
  value.trim() === "" ? null : value.trim();

export const nullableTextSchema = z
  .string()
  .transform(emptyStringToNull)
  .nullish();

export const requiredTextSchema = z.string().trim().min(1);

export const nullableUrlSchema = z
  .string()
  .transform(emptyStringToNull)
  .pipe(z.url().nullable())
  .nullish();

export const jobLocationSchema = z.object({
  countryCode: z
    .string()
    .length(2)
    .transform((value) => value.toUpperCase())
    .nullish(),
  state: nullableTextSchema,
  city: nullableTextSchema,
});

export const applicationSourceSchema = z.object({
  platform: requiredTextSchema,
  url: nullableUrlSchema,
});

export const eventLocationSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("online"), link: nullableUrlSchema }),
  z.object({
    type: z.literal("onsite"),
    address: nullableTextSchema,
  }),
]);

export const emailSchema = z.email().transform((e) => e.toLowerCase());

export const passwordSchema = z
  .string()
  .min(8, { error: "Password must be at least 8 characters long" });

export const countrySchema = z.object({
  code: z
    .string()
    .trim()
    .length(2)
    .transform((c) => c.toUpperCase()),
  name: requiredTextSchema,
});

export const userSettingsSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  language: requiredTextSchema,
  timezone: requiredTextSchema,
  timeFormat: z.union([z.literal(12), z.literal(24)]).optional(),
  dateFormat: z.enum(["MDY", "DMY", "YMD"]).optional(),
});

