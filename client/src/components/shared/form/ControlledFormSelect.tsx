import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectProps } from "@mui/material/Select";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";

type ControlledFormSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = Omit<SelectProps, "name"> & {
  name: TName;
  control: Control<TFieldValues>;
  items: { label: string; value: string }[];
};

export default function ControlledFormSelect<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  control,
  items,
  label,
  ...props
}: ControlledFormSelectProps<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error} fullWidth>
          {label && <InputLabel id={`label-${name}`}>{label}</InputLabel>}
          <Select {...field} {...props} label={label} labelId={`label-${name}`}>
            {items.map((t) => (
              <MenuItem key={t.value} value={t.value}>
                {t.label}
              </MenuItem>
            ))}
          </Select>
          {error && (
            <FormHelperText sx={{ ml: 0.5 }}>{error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
