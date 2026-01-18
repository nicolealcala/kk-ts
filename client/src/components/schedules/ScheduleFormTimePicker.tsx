import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  TimePicker,
  type TimePickerProps,
} from "@mui/x-date-pickers/TimePicker";
import type { ControllerRenderProps, FieldPath } from "react-hook-form";
import type { ScheduleFormInputs } from "@/lib/forms/scheduleFormSchema";
import { DateTime } from "luxon";
import { type Control, useWatch } from "react-hook-form";
import type { TimeView } from "@mui/x-date-pickers/models";
import React from "react";

type ScheduleFormTimePickerProps<TName extends FieldPath<ScheduleFormInputs>> =
  Omit<TimePickerProps, "name"> & {
    field: ControllerRenderProps<ScheduleFormInputs, TName>;
    errorMessage?: string;
    error: boolean;
    baseDate?: string;
  };

function ScheduleFormTimePicker<TName extends FieldPath<ScheduleFormInputs>>({
  field,
  errorMessage,
  error,
  baseDate,
  ...props
}: ScheduleFormTimePickerProps<TName>) {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <TimePicker
        // Convert the string value from Hook Form into a Luxon DateTime object
        value={field.value ? DateTime.fromISO(field.value) : null}
        // Convert the Luxon object back into a string for Hook Form
        onChange={(newValue) => {
          if (newValue && baseDate) {
            const base = DateTime.fromISO(baseDate);

            // 1. Merge the Date parts from base into the Time parts from newValue
            let merged = newValue.set({
              year: base.year,
              month: base.month,
              day: base.day,
            });

            // 2. IMPORTANT: Force the zone to match the baseDate's zone
            // If baseDate was "2026-01-10T16:00:00.000Z", targetZone will be 'UTC'
            const targetZone = base.zoneName ?? "local";
            merged = merged.setZone(targetZone);

            // 3. If the original string was UTC, ensure we output UTC
            // This prevents Luxon from outputting +00:00 instead of Z
            if (baseDate.endsWith("Z")) {
              field.onChange(merged.toUTC().toISO());
            } else {
              field.onChange(merged.toISO());
            }
          } else {
            field.onChange(newValue ? newValue.toISO() : "");
          }
        }}
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

export default React.memo(ScheduleFormTimePicker);

type DependentTimePickerProps<TName extends FieldPath<ScheduleFormInputs>> =
  Omit<ScheduleFormTimePickerProps<TName>, "minTime"> & {
    control: Control<ScheduleFormInputs>;
    watchName: FieldPath<ScheduleFormInputs>;
  };

function DependentTimePickerComponent<
  TName extends FieldPath<ScheduleFormInputs>,
>({ field, control, watchName, ...props }: DependentTimePickerProps<TName>) {
  const watchedValue = useWatch({
    control,
    name: watchName,
  });

  const minTime = watchedValue ? DateTime.fromISO(watchedValue) : undefined;

  // Logic: Disable any time that is less than or equal to the Start Time
  const shouldDisableTime = (value: DateTime, view: TimeView) => {
    if (!minTime) return false;

    if (view === "hours") {
      // Disable hours that are strictly less than the start hour
      return value.hour < minTime.hour;
    }
    if (view === "minutes") {
      // If we are in the same hour as the start time,
      // disable minutes that are equal to or less than the start minute
      if (value.hour === minTime.hour) {
        return value.minute <= minTime.minute;
      }

      // If the hour is already less than the start hour, disable all minutes
      return value.hour < minTime.hour;
    }

    return false;
  };

  return (
    <ScheduleFormTimePicker
      {...props}
      field={field}
      minTime={minTime}
      shouldDisableTime={shouldDisableTime}
    />
  );
}

export const DependentTimePicker = React.memo(DependentTimePickerComponent);
