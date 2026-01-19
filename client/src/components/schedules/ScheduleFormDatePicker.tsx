import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import {
  DatePicker,
  type DatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import type { ControllerRenderProps, FieldPath } from "react-hook-form";
import { DateTime } from "luxon";
import type { ScheduleFormInputs } from "@/lib/forms/scheduleFormSchema";

type ScheduleFormDatePickerProps<TName extends FieldPath<ScheduleFormInputs>> =
  Omit<DatePickerProps, "name"> & {
    field: ControllerRenderProps<ScheduleFormInputs, TName>;
    errorMessage?: string;
    error: boolean;
  };

export default function ScheduleFormDatePicker<
  TName extends FieldPath<ScheduleFormInputs>,
>({
  field,
  errorMessage,
  error,
  ...props
}: ScheduleFormDatePickerProps<TName>) {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        label="Date"
        // Convert the string value from Hook Form into a Luxon DateTime object
        value={field.value ? DateTime.fromISO(field.value) : null}
        // Convert the Luxon object back into a string for Hook Form
        onChange={(newValue) => {
          field.onChange(newValue ? newValue.toISO() : "");
        }}
        disablePast
        slotProps={{
          textField: {
            error: error,
            helperText: errorMessage,
            FormHelperTextProps: { sx: { mx: 0, ml: 0.5 } },
          },
        }}
        {...props}
      />
    </LocalizationProvider>
  );
}
