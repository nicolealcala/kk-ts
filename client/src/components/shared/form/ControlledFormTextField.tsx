import TextField, { type TextFieldProps } from "@mui/material/TextField";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

type ControlledFormTextFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = Omit<TextFieldProps, "name"> & {
  name: TName;
  control: Control<TFieldValues>;
};
const ControlledFormTextField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  ...props
}: ControlledFormTextFieldProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          value={field.value ?? ""}
          onChange={(e) => {
            const val = e.target.value;

            const formattedValue =
              props.type === "number" && val !== "" ? Number(val) : val;

            field.onChange(formattedValue);
          }}
          fullWidth
          error={!!error}
          label={label}
          helperText={error?.message}
          slotProps={{
            formHelperText: { sx: { mx: 0.5 } },
          }}
        />
      )}
    />
  );
};

export default ControlledFormTextField;
