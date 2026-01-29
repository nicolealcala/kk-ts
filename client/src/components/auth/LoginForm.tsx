import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import OAuth from "./OAuth";
import { useNavigate } from "react-router";
import Alert from "@mui/material/Alert";
import PasswordField from "./PasswordField";
import FormTextField from "../shared/form/FormTextField";
import type { LoginFormInputs } from "@/lib/forms/loginFormSchema";
import loginSchema from "@/lib/forms/loginFormSchema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser, setAuthMode } from "@/store/auth/authSlice";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.auth.error);

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
    try {
      await dispatch(loginUser(formData)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("[FORM] Login error: ", error);
    }
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
          <FormTextField
            registration={register("email")}
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <Stack spacing={1}>
            {/* Password Field */}
            <PasswordField
              registration={register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              variant="outlined"
              placeholder="Enter your password"
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
          {error && <Alert severity="error">{error}</Alert>}

          {/* Login Button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            loading={isSubmitting}
            loadingPosition="start"
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
          onClick={() => dispatch(setAuthMode("signup"))}
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
