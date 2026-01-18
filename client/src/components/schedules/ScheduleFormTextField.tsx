import TextField, { type TextFieldProps } from "@mui/material/TextField";
import type { ControllerRenderProps, FieldPath } from "react-hook-form";
import React from "react";
import type { ScheduleFormInputs } from "@/lib/forms/scheduleFormSchema";

type ScheduleFormTextFieldProps<TName extends FieldPath<ScheduleFormInputs>> =
  Omit<TextFieldProps, "name"> & {
    field: ControllerRenderProps<ScheduleFormInputs, TName>;
    errorMessage?: string;
  };

function ScheduleFormTextField<TName extends FieldPath<ScheduleFormInputs>>({
  field,
  errorMessage,
  ...props
}: ScheduleFormTextFieldProps<TName>) {
  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      helperText={errorMessage}
      slotProps={{
        formHelperText: { sx: { mx: 0.5 } },
      }}
    />
  );
}

export default React.memo(ScheduleFormTextField);
