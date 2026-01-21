import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectProps } from "@mui/material/Select";
import type { ControllerRenderProps, FieldPath } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";
import type { ScheduleFormInputs } from "@/lib/forms/scheduleFormSchema";

type ScheduleFormTextFieldProps<TName extends FieldPath<ScheduleFormInputs>> =
  Omit<SelectProps, "name"> & {
    field: ControllerRenderProps<ScheduleFormInputs, TName>;
    errorMessage?: string;
  };

const typeValues = [
  { label: "Interview", value: "interview" },
  { label: "Assessment", value: "assessment" },
  { label: "Task", value: "task" },
  { label: "Other", value: "other" },
];

export default function ScheduleFormSelect<
  TName extends FieldPath<ScheduleFormInputs>,
>({ field, errorMessage, ...props }: ScheduleFormTextFieldProps<TName>) {
  return (
    <FormControl error={props?.error} fullWidth>
      <InputLabel id={`label-${field.name}`}>{props?.label}</InputLabel>
      <Select {...field} labelId={`label-${field.name}`} {...props}>
        {typeValues.map((t) => (
          <MenuItem key={t.value} value={t.value}>
            {t.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
}
