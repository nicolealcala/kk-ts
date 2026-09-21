import * as z from "zod";
import { DateTime } from "luxon";
import { nullableTextSchema, requiredTextSchema } from "./commonSchema";

const scheduleFormSchema = z
  .object({
    title: requiredTextSchema("Please add an event title"),
    description: nullableTextSchema,
    date: requiredTextSchema("Please add a date"),
    start: requiredTextSchema("Please add a start time"),
    end: requiredTextSchema("Please add an end time"),
    type: z
      .enum(["interview", "assessment", "task", "other"])
      .nonoptional("Type is required"),
    modality: z.enum(["onsite", "remote"]),
    link: z.string().optional(),
    address: z.string().optional(),
  })
  .refine(
    (data) => {
      const start = DateTime.fromISO(data.start);
      const end = DateTime.fromISO(data.end);
      return end > start;
    },
    {
      message: "Must be after the start time",
      path: ["end"],
    },
  );

export type ScheduleFormInputs = z.infer<typeof scheduleFormSchema>;

export const initialValues: ScheduleFormInputs = {
  title: "",
  description: "",
  date: "",
  start: "",
  end: "",
  type: "interview",
  modality: "remote",
  link: "",
  address: "",
};

export default scheduleFormSchema;
