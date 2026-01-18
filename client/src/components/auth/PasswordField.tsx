import { useState } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import type { UseFormRegisterReturn } from "react-hook-form";
import React from "react";

export type PasswordFieldProps = TextFieldProps & {
  registration: UseFormRegisterReturn;
};

function PasswordField({
  registration,
  error,
  label = "Password",
  ...props
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <TextField
      {...props}
      {...registration}
      fullWidth
      label={label}
      type={showPassword ? "text" : "password"}
      error={error}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOffRoundedIcon />
                ) : (
                  <VisibilityRoundedIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
        formHelperText: { sx: { mx: 0.5 } },
      }}
    />
  );
}

export default React.memo(PasswordField);
