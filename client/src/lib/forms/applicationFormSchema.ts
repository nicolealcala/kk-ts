import * as z from "zod";

const applicationFormSchema = z.object({
  organization: z.string().nonempty("Organization is required"),
  position: z.string().nonempty("Position is required"),
  location: z
    .object({
      country: z.string().optional(),
      city: z.string().optional(),
      postalCode: z.string().optional(),
    })
    .optional(),
  workArrangement: z.enum(["onsite", "remote", "hybrid", ""]).optional(),
  source: z.object({
    platform: z.string().nonempty("Platform is required"),
    link: z.url("Invalid URL").nonempty("Job posting link is required"),
  }),
  salary: z
    .object({
      currency: z.string(),
      minAmount: z.number().min(0),
      maxAmount: z.number().min(0),
    })
    .optional(),
  type: z.enum(["gig", "fulltime", "partime", "contract", ""]).optional(),
  description: z.string().optional(),
  status: z
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
});

export type ApplicationFormInputs = z.infer<typeof applicationFormSchema>;

export const initialValues: ApplicationFormInputs = {
  organization: "",
  position: "",
  location: { country: "", city: "", postalCode: "" },
  workArrangement: "",
  source: { platform: "", link: "" },
  salary: { currency: "", minAmount: 0, maxAmount: 0 },
  type: "",
  description: "",
  status: "applied",
};

export default applicationFormSchema;
