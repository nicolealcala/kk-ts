import type { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { AppError } from "../lib/customErrors.js";

type RequestPart = "body" | "query" | "params";

export const validateRequest = (part: RequestPart, schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[part]);

    if (!result.success) {
      const cleanErrors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return next(new AppError("Invalid Request", 400, cleanErrors));
    }

    next();
  };
};
