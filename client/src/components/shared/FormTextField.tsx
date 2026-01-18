import TextField, { type TextFieldProps } from "@mui/material/TextField";
import type { UseFormRegisterReturn } from "react-hook-form";

export type FormTextFieldProps = TextFieldProps & {
  registration?: UseFormRegisterReturn;
};

export default function FormTextField({
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
