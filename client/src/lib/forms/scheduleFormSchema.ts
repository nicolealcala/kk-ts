import * as z from "zod";
import { DateTime } from "luxon";

const scheduleFormSchema = z
  .object({
    title: z.string().nonempty("Title is required"),
    description: z.string().optional(),
    date: z.string().nonempty("Date is required"),
    start: z.string().nonempty("Start time is required"),
    end: z.string().nonempty("End time is required"),
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
