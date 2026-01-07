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
import { supabase } from "@/lib/config/supabaseClient";
import { useNavigate } from "react-router";
import Alert from "@mui/material/Alert";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { authError, setAuthMode, setAuthError, setAuthSession } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(formData: LoginFormInputs) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setAuthError(error);
      return;
    }

    setAuthSession(data.session);
    navigate("/");
  }
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
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <Stack spacing={1}>
            {/* Password Field */}
            <TextField
              fullWidth
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

          {/* Error Message */}
          {authError && <Alert severity="error">{authError.message}</Alert>}

          {/* Login Button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            loading={isSubmitting}
            type="submit"
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
            verticalAlign: "baseline",
          }}
        >
          Sign up
        </Link>
      </Typography>
    </>
  );
}
