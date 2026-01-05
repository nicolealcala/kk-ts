import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import OAuth from "./OAuth";
import { useAuth } from "@/lib/contexts/AuthContext";

const signupSchema = z.object({
  fname: z.string().min(3, "First name must be at least 3 characters"),
  lname: z.string().min(3, "Last name must be at least 3 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormInputs = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const { setAuthMode } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  //TO DO: Update submit logic
  const onSubmit = (data: SignupFormInputs) => {
    console.log("Form Data: ", data);
  };
  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 3 }}
      >
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            {/* First Name Field */}
            <TextField
              fullWidth
              id="name"
              label="Firist Name"
              {...register("fname")}
              error={!!errors.fname}
              helperText={errors.fname?.message}
            />

            {/* Last Name Field */}
            <TextField
              fullWidth
              id="name"
              label="Last Name"
              {...register("lname")}
              error={!!errors.lname}
              helperText={errors.lname?.message}
            />
          </Stack>

          {/* Email Field */}
          <TextField
            fullWidth
            id="email"
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            id="password"
            label="Password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {/* Confirm Password Field */}
          <TextField
            fullWidth
            id="password"
            label="Confirm Password"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          {/* Signup Button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            loading={isSubmitting}
            sx={{ borderRadius: 50 }}
          >
            Sign up
          </Button>
          <OAuth />
        </Stack>
      </Box>
      <Typography variant="body2" color="text.secondary" align="center" mt={2}>
        Already have an account?&nbsp;
        <Link
          component="button"
          underline="hover"
          fontWeight="medium"
          onClick={() => setAuthMode("login")}
          sx={{
            verticalAlign: "baseline", // Forces the button text to sit on the same line as "Already..."
            fontSize: "inherit", // Ensures font size matches variant="body2"
            lineHeight: "inherit", // Prevents the button from being taller than the text
            fontFamily: "inherit", // Ensures the font stack matches
          }}
        >
          Login
        </Link>
      </Typography>
    </>
  );
}
