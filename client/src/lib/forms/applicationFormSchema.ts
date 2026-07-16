import * as z from "zod";

const applicationFormSchema = z
  .object({
    organization: z.string().nonempty("Organization is required"),
    position: z.string().nonempty("Position is required"),
    country: z.string().optional().nullable(),
    work_arrangement: z
      .enum(["onsite", "remote", "hybrid", ""])
      .optional()
      .nullable(),
    source_platform: z.string().nonempty("Platform is required"),
    source_link: z.url("Invalid URL").nonempty("Job posting link is required"),
    salary_currency_code: z.string().optional().nullable(),
    salary_min: z.number().min(0),
    salary_max: z.number().min(0),
    employment_type: z
      .enum(["gig", "fulltime", "partime", "contract"])
      .optional()
      .nullable(),
    description: z.string().optional().nullable(),
    current_status: z
      .enum([
        "applied",
        "interviewing",
        "offered",
        "rejected",
        "withdrawn",
        "accepted",
        "ghosted",
      ])
      .nonoptional("Status is required"),
  })
  .refine(
    (data) => {
      const hasSalary = data.salary_min > 0 || data.salary_max > 0;
      const hasCurrency = !!data.salary_currency_code;

      if (hasSalary && !hasCurrency) return false;

      return true;
    },
    {
      message: "Currency is required",
      path: ["salary_currency_code"],
    },
  );

export type ApplicationFormInputs = z.infer<typeof applicationFormSchema>;

export const initialValues: ApplicationFormInputs = {
  organization: "",
  position: "",
  country: undefined,
  work_arrangement: undefined,
  source_platform: "",
  source_link: "",
  salary_currency_code: undefined,
  salary_min: 0,
  salary_max: 0,
  employment_type: undefined,
  description: undefined,
  current_status: "applied",
};

export default applicationFormSchema;
