/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CurrencyOption } from "@/utils/hooks/useRestCountries";
import {
  Autocomplete,
  TextField,
  type TextFieldProps,
  CircularProgress,
} from "@mui/material";
import {
  type FieldPath,
  type FieldValues,
  type Control,
  Controller,
} from "react-hook-form";

type ControlledFormAutocompleteProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  T = string | CurrencyOption,
> = Omit<TextFieldProps, "name" | "onChange" | "value"> & {
  name: TName;
  control: Control<TFieldValues>;
  options: T[];
  loading?: boolean;
};

export const ControlledFormAutocomplete = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  T = string | CurrencyOption,
>({
  name,
  control,
  options,
  loading,
  label,
  ...props
}: ControlledFormAutocompleteProps<TFieldValues, TName, T>) => {
  const isCurrencyOption = (option: any): option is CurrencyOption => {
    return option && typeof option === "object" && "code" in option;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, ...fieldProps },
        fieldState: { error },
      }) => (
        <Autocomplete
          {...fieldProps}
          fullWidth
          options={options}
          loading={loading}
          value={
            options.find((opt) => {
              if (typeof opt === "string") return opt === value;
              if (isCurrencyOption(opt)) return opt.code === value;
              return false;
            }) || null
          }
          onChange={(_, newValue) => {
            if (typeof newValue === "string") onChange(newValue);
            else if (isCurrencyOption(newValue)) onChange(newValue.code);
            else onChange(null);
          }}
          getOptionLabel={(option) => {
            if (typeof option === "string") return option;
            if (isCurrencyOption(option)) {
              return `${option.code} (${option.symbol || ""})`;
            }
            return "";
          }}
          isOptionEqualToValue={(option, val) => {
            if (typeof option === "string") return option === val;

            if (isCurrencyOption(option) && isCurrencyOption(val)) {
              return option.code === val.code;
            }

            return false;
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              {...props}
              label={label}
              error={!!error}
              helperText={error?.message}
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                },
              }}
            />
          )}
        />
      )}
    />
  );
};
