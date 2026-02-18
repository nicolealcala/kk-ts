import * as z from "zod";

const signupSchema = z.object({
  first_name: z.string().min(2, "Must be at least 2 characters"),
  last_name: z.string().min(2, "Must be at least 2 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Must be at least 6 characters"),
});

export type SignupFormInputs = z.infer<typeof signupSchema>;

export default signupSchema;
