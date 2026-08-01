import { z } from "zod";
import {
  countrySchema,
  requiredTextSchema,
  userSettingsSchema,
} from "./common.validation.js";

export const updateProfileSchema = z.object({
  firstName: requiredTextSchema.optional(),
  lastName: requiredTextSchema.optional(),
  country: countrySchema.nullish(),
  settings: userSettingsSchema.nullish(),
});
