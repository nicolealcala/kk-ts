import { dequal } from "dequal";
import { type z } from "zod";

export function deepEqual<TSchema extends z.ZodType>(
  original: unknown,
  current: z.output<TSchema>,
  schema: TSchema,
): boolean {
  const originalParsed = schema.parse(original);

  return dequal(originalParsed, current);
}
