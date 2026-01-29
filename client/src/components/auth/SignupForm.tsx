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
import FormTextField from "../shared/form/FormTextField";
import PasswordField from "./PasswordField";
import type { SignupFormInputs } from "@/lib/forms/signUpFormSchema";
import signupSchema from "@/lib/forms/signUpFormSchema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAuthMode, signUpUser } from "@/store/auth/authSlice";

export default function SignupForm() {
  const error = useAppSelector((state) => state.auth.error);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
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
  async function onSubmit(
    formData: Pick<SignupFormInputs, "email" | "confirmPassword">,
  ) {
    try {
      await dispatch(signUpUser(formData));
      navigate("/");
    } catch (error) {
      console.error("[FORM]: Signup error: ", error);
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
          <Stack direction="row" spacing={2}>
            {/* First Name Field */}
            <FormTextField
              label="First Name"
              registration={register("fname")}
              error={!!errors.fname}
              helperText={errors.fname?.message}
            />

            {/* Last Name Field */}
            <FormTextField
              label="Last Name"
              registration={register("lname")}
              error={!!errors.lname}
              helperText={errors.lname?.message}
            />
          </Stack>

          {/* Email Field */}
          <FormTextField
            label="Email"
            registration={register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          {/* Password Field */}
          <PasswordField
            label="Password"
            registration={register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {/* Confirm Password Field */}
          <PasswordField
            label="Confirm Password"
            registration={register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          {/* Error Message */}
          {error && <Alert severity="error">{error}</Alert>}

          {/* Signup Button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            loading={isSubmitting}
            loadingPosition="start"
            sx={{ borderRadius: 50 }}
            type="submit"
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
          onClick={() => dispatch(setAuthMode("login"))}
          sx={{
            verticalAlign: "baseline",
          }}
        >
          Login
        </Link>
      </Typography>
    </>
  );
}
