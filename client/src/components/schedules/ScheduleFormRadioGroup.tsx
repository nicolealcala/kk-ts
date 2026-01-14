import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import type { ControllerRenderProps, FieldPath } from "react-hook-form";
import type { ScheduleFormInputs } from "./ScheduleForm";

type ScheduleFormRadioGroupProps<TName extends FieldPath<ScheduleFormInputs>> =
  {
    field: ControllerRenderProps<ScheduleFormInputs, TName>;
    label: string;
    error?: boolean;
    errorMessage?: string;
    radioItems: { value: string; label: string }[];
  };
export default function ScheduleFormRadioGroup<
  TName extends FieldPath<ScheduleFormInputs>
>({
  field,
  label,
  error,
  errorMessage,
  radioItems,
}: ScheduleFormRadioGroupProps<TName>) {
  return (
    <FormControl
      error={error}
      component="fieldset"
      sx={{
        "& .MuiFormLabel-root.Mui-focused": { color: "text.secondary" },
        "& .MuiFormHelperText-root.Mui-error": { mx: 0, ml: 0.5 },
      }}
    >
      <FormLabel component="legend">{label}</FormLabel>

      <RadioGroup {...field} row aria-label="modality">
        {radioItems.map((r) => (
          <FormControlLabel
            key={r.value}
            value={r.value}
            control={<Radio />}
            label={r.label}
          />
        ))}
      </RadioGroup>

      {/* Error Message */}
      {error && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}
