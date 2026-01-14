import TextField, { type TextFieldProps } from "@mui/material/TextField";
import type { ControllerRenderProps, FieldPath } from "react-hook-form";
import type { ScheduleFormInputs } from "./ScheduleForm";

type ScheduleFormTextFieldProps<TName extends FieldPath<ScheduleFormInputs>> =
  // 1. Extend standard MUI TextField props
  Omit<TextFieldProps, "name"> & {
    // 2. Keep your specific Hook Form props
    field: ControllerRenderProps<ScheduleFormInputs, TName>;
    errorMessage?: string;
  };

export default function ScheduleFormTextField<
  TName extends FieldPath<ScheduleFormInputs>
>({ field, errorMessage, ...props }: ScheduleFormTextFieldProps<TName>) {
  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      helperText={errorMessage}
      slotProps={{
        // input: {
        //   readOnly: true,
        // },
        formHelperText: { sx: { mx: 0, ml: 0.5 } },
      }}
    />
  );
}
