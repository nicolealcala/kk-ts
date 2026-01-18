import { TextField, type TextFieldProps } from "@mui/material";
import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

export type FormTextFieldProps = TextFieldProps & {
  registration?: UseFormRegisterReturn;
};

function FormTextField({
  registration,
  error,
  type = "text",
  ...props
}: FormTextFieldProps) {
  return (
    <TextField
      {...props}
      {...registration}
      fullWidth
      type={type}
      error={error}
      slotProps={{
        formHelperText: { sx: { mx: 0.5 } },
      }}
    />
  );
}
export default React.memo(FormTextField);
