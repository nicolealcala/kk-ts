import type { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validateRequestBody = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const cleanErrors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return res
        .status(400)
        .json({ message: "Invalid credetials", errors: cleanErrors });
    }

    next();
  };
};
