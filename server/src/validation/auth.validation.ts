import { z } from "zod";
import {
  emailSchema,
  passwordSchema,
  requiredTextSchema,
} from "./common.validation.js";

export const signUpSchema = z
  .object({
    firstName: requiredTextSchema,
    lastName: requiredTextSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: requiredTextSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: requiredTextSchema,
});

export const changePasswordSchema = z
  .object({
    currentPassword: requiredTextSchema,
    newPassword: passwordSchema,
    confirmPassword: requiredTextSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const resetPasswordSchema = z
  .object({
    token: requiredTextSchema,
    password: passwordSchema,
    confirmPassword: requiredTextSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });
