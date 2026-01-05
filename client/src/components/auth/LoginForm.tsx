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

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { setAuthMode } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  //TO DO: Update submit logic
  const onSubmit = (data: LoginFormInputs) => {
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
          {/* Email Field */}
          <TextField
            fullWidth
            id="email"
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <Stack spacing={1}>
            {/* Password Field */}
            <TextField
              fullWidth
              id="password"
              label="Password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Link
              href="#"
              variant="body2"
              fontWeight="medium"
              underline="hover"
            >
              Forgot password?
            </Link>
          </Stack>

          {/* Login Button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            loading={isSubmitting}
            sx={{ borderRadius: 50 }}
          >
            Login
          </Button>
          <OAuth />
        </Stack>
      </Box>
      <Typography variant="body2" color="text.secondary" align="center" mt={2}>
        Don't have an account?&nbsp;
        <Link
          component="button"
          underline="hover"
          fontWeight="medium"
          onClick={() => setAuthMode("signup")}
          sx={{
            verticalAlign: "baseline", // Forces the button text to sit on the same line as "Already..."
            fontSize: "inherit", // Ensures font size matches variant="body2"
            lineHeight: "inherit", // Prevents the button from being taller than the text
            fontFamily: "inherit", // Ensures the font stack matches
          }}
        >
          Sign up
        </Link>
      </Typography>
    </>
  );
}
