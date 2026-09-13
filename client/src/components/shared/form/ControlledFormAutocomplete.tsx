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
  TOption,
  TValue = TOption,
> = Omit<TextFieldProps, "name" | "onChange" | "value"> & {
  name: TName;
  control: Control<TFieldValues>;
  options: TOption[];
  loading?: boolean;
  getOptionLabel: (option: TOption) => string;
  getOptionValue: (option: TOption) => TValue;
  getOptionKey: (option: TOption) => string;
  getValueKey: (value: TValue) => string;
  onInputChange?: (value: string) => void;
  onListboxScroll?: (event: React.UIEvent<HTMLUListElement>) => void;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement> & {
      key?: React.Key;
    },
    option: TOption,
  ) => React.ReactNode;
  renderInputValue?: (option: TOption) => React.ReactNode;
};

export const ControlledFormAutocomplete = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TOption,
  TValue = TOption,
>({
  name,
  control,
  options,
  loading,
  label,
  getOptionLabel,
  getOptionValue,
  getOptionKey,
  getValueKey,
  onInputChange,
  onListboxScroll,
  renderOption,
  renderInputValue,
  ...props
}: ControlledFormAutocompleteProps<TFieldValues, TName, TOption, TValue>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, ...fieldProps },
        fieldState: { error },
      }) => {
        const selectedOption =
          value == null
            ? null
            : (options.find(
                (option) => getOptionKey(option) === getValueKey(value),
              ) ?? null);

        return (
          <Autocomplete
            {...fieldProps}
            fullWidth
            options={options}
            loading={loading}
            value={selectedOption}
            onChange={(_, newValue) => {
              onChange(newValue ? getOptionValue(newValue) : null);
            }}
            onInputChange={(_, newInputValue, reason) => {
              if (reason === "input" || reason === "clear") {
                onInputChange?.(newInputValue);
              }
            }}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={(option, val) =>
              getOptionKey(option) === getOptionKey(val)
            }
            renderOption={renderOption}
            slotProps={{
              listbox: {
                onScroll: onListboxScroll,
              },
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
                    startAdornment: selectedOption ? (
                      <>
                        {renderInputValue?.(selectedOption)}
                        {params.InputProps.startAdornment}
                      </>
                    ) : (
                      params.InputProps.startAdornment
                    ),
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
        );
      }}
    />
  );
};
