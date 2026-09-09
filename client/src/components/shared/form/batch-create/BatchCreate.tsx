import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  type DefaultValues,
  FieldArray,
  type FieldArrayPath,
  type FieldValues,
  FormProvider,
  type SubmitErrorHandler,
  type SubmitHandler,
  useFieldArray,
  type UseFormReturn,
  useFormState,
} from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import BatchFormItem from "./BatchFormItem";
import FormHeader from "../FormHeader";
import BatchFormAddButton from "./BatchFormAddButton";
import ResetButton from "./ResetButton";

type BatchCreateProps<
  TFieldValues extends FieldValues,
  TContext,
  TTransformedValues extends FieldValues,
  TName extends FieldArrayPath<TFieldValues>,
> = {
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>;

  fieldArrayName: TName;

  defaultItem: FieldArray<TFieldValues, TName>;

  title: string;

  renderForm: (index: number) => React.ReactNode;

  getItemTitle?: (index: number) => React.ReactNode;

  onSubmit: SubmitHandler<TTransformedValues>;

  onError?: SubmitErrorHandler<TFieldValues>;

  onBack: () => void;
};

export default function BatchCreate<
  TFieldValues extends FieldValues,
  TContext,
  TTransformedValues extends FieldValues,
  TName extends FieldArrayPath<TFieldValues>,
>({
  form,
  fieldArrayName,
  defaultItem,
  title,
  renderForm,
  getItemTitle,
  onSubmit,
  onError,
  onBack,
}: BatchCreateProps<TFieldValues, TContext, TTransformedValues, TName>) {
  const { control, handleSubmit, reset } = form;

  const { errors, isSubmitting, isDirty, isValid } = useFormState({
    control,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldArrayName,
  });

  const [isActiveForm, setIsActiveForm] = useState<string>();
  useEffect(() => console.log("Fields: ", fields), [fields]);
  const [openForms, setOpenForms] = useState<Record<string, boolean>>({});
  const [deletedFormIndex, setDeletedFormIndex] = useState(0);
  const formRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const previousFieldsLength = useRef(fields.length);

  const toggleForm = (id: string) => {
    setOpenForms((prev) => ({
      ...prev,
      [id]: !(prev[id] ?? true),
    }));
  };

  const handleReset = () => {
    reset({
      [fieldArrayName]: [defaultItem],
    } as DefaultValues<TFieldValues>);
  };

  useEffect(() => {
    const previousLength = previousFieldsLength.current;
    const currentLength = fields.length;

    // A form was added
    if (currentLength > previousLength) {
      const newField = fields[currentLength - 1];

      setIsActiveForm(newField.id);

      setOpenForms((prev) => ({
        ...prev,
        [newField.id]: true,
      }));

      requestAnimationFrame(() => {
        formRefs.current[newField.id]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }

    // A form was removed
    if (currentLength < previousLength && currentLength > 0) {
      const preceedingForm =
        fields[deletedFormIndex] ?? fields[deletedFormIndex - 1];

      setIsActiveForm(preceedingForm.id);

      requestAnimationFrame(() => {
        formRefs.current[preceedingForm.id]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      });
    }

    previousFieldsLength.current = currentLength;
  }, [fields, deletedFormIndex]);

  return (
    <FormProvider {...form}>
      <Stack
        height="100%"
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        {/* Header */}
        <FormHeader
          isSubmitting={isSubmitting}
          isMultiple={fields.length > 1}
          title={title}
          onBack={() => onBack()}
        />

        {/* Content */}
        <Box p={6} className="thin-scrollbar">
          <Box className="mx-auto w-full max-w-4xl space-y-6!">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              <Typography variant="h5" color="initial" fontWeight="semiBold">
                Add {title}
              </Typography>
              <ResetButton
                label={fields.length > 1 ? "Clear forms" : "Clear form"}
                isDirty={isDirty}
                handleReset={handleReset}
              />
            </Stack>

            {/* Forms */}
            <Stack spacing={3} position="relative">
              {fields.map((field, index) => {
                const fieldErrors = errors[fieldArrayName];

                const hasErrors = Boolean(
                  Array.isArray(fieldErrors) && fieldErrors[index],
                );

                const isOpen = openForms[field.id] ?? true;

                return (
                  <BatchFormItem
                    key={field.id}
                    index={index}
                    title={
                      getItemTitle ? getItemTitle(index) : `Item ${index + 1}`
                    }
                    isOpen={isOpen}
                    isActive={isActiveForm === field.id}
                    hasErrors={hasErrors}
                    showIndex={fields.length > 1}
                    formRef={(element) => {
                      formRefs.current[field.id] = element;
                    }}
                    onClick={() => setIsActiveForm(field.id)}
                    onToggle={() => toggleForm(field.id)}
                    onRemove={() => {
                      setDeletedFormIndex(index);
                      remove(index);
                    }}
                  >
                    {renderForm(index)}
                  </BatchFormItem>
                );
              })}
            </Stack>

            {/* Add */}
            <BatchFormAddButton
              onClick={() => append(defaultItem)}
              disabled={!isValid}
            />
          </Box>
        </Box>
      </Stack>
    </FormProvider>
  );
}
