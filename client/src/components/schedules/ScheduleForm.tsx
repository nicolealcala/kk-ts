import * as z from "zod";
import Drawer from "@mui/material/Drawer";
import { DrawerHeader } from "../layout/Sidebar";
import Box from "@mui/material/Box";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Stack from "@mui/material/Stack";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import ScheduleFormButtons from "./ScheduleFormButtons";
import ScheduleFormTextField from "./ScheduleFormTextField";
import Typography from "@mui/material/Typography";
import ScheduleFormRadioGroup from "./ScheduleFormRadioGroup";
import { useEffect } from "react";
import Divider from "@mui/material/Divider";
import { DateTime } from "luxon";
import type { SlotInfo } from "react-big-calendar";

type ScheduleDrawerType = {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSlot: SlotInfo | null;
  setSelectedSlot: React.Dispatch<React.SetStateAction<SlotInfo | null>>;
};

const scheduleSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().optional(),
  start: z.string().nonempty("Start time is required"),
  end: z.string().nonempty("End time is required"),
  modality: z.string().nonempty("Modality is required"),
  link: z.string().optional(),
  address: z.string().optional(),
});

const modalityOptions = [
  { value: "remote", label: "Remote" },
  { value: "onsite", label: "In-Person" },
];

export type ScheduleFormInputs = z.infer<typeof scheduleSchema>;

const initialValues: ScheduleFormInputs = {
  title: "",
  description: "",
  start: "",
  end: "",
  modality: "remote",
  link: "",
  address: "",
};

export default function ScheduleForm({
  openDrawer,
  setOpenDrawer,
  selectedSlot,
  setSelectedSlot,
}: ScheduleDrawerType) {
  const {
    reset,
    resetField,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ScheduleFormInputs>({
    resolver: zodResolver(scheduleSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: initialValues,
  });

  const modality = useWatch({
    control,
    name: "modality",
  });

  useEffect(() => {
    if (selectedSlot) {
      reset({
        ...initialValues,
        start:
          selectedSlot.start instanceof Date
            ? selectedSlot.start.toISOString()
            : selectedSlot.start,
      });
    }
  }, [selectedSlot, reset]);

  useEffect(() => {
    if (modality === "remote") resetField("address");
    if (modality === "onsite") resetField("link");
  }, [modality, resetField]);

  function onSubmit(formData: ScheduleFormInputs) {
    console.log(formData);
  }

  function handleCancel() {
    reset(initialValues);
    setSelectedSlot(null);
    setOpenDrawer(false);
  }

  return (
    <Drawer
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
      anchor="right"
    >
      <DrawerHeader />
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 2, p: 2 }}
      >
        <Typography variant="h5" gutterBottom mb={3} fontWeight={500}>
          Create a new event
        </Typography>
        <Stack spacing={2.5}>
          {/* Title Field */}
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <ScheduleFormTextField
                field={field}
                label="Title"
                error={!!errors.title}
                errorMessage={errors.title?.message}
                placeholder="Event title"
              />
            )}
          />

          {/* Description Field */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <MDEditor
                value={field.value}
                onChange={field.onChange}
                preview="edit"
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
                textareaProps={{
                  placeholder: "Description (optional)",
                  maxLength: 200,
                }}
              />
            )}
          />

          <Stack direction="row" spacing={2}>
            <Controller
              name="start"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <TimePicker
                    label="Start Time"
                    // Convert the string value from Hook Form into a Luxon DateTime object
                    value={field.value ? DateTime.fromISO(field.value) : null}
                    // Convert the Luxon object back into a string for Hook Form
                    onChange={(newValue) => {
                      field.onChange(newValue ? newValue.toISO() : "");
                    }}
                    slotProps={{
                      textField: {
                        error: !!errors.start,
                        helperText: errors.start?.message,
                        fullWidth: true,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />

            <Controller
              name="end"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <TimePicker
                    label="End Time"
                    // Convert the string value from Hook Form into a Luxon DateTime object
                    value={field.value ? DateTime.fromISO(field.value) : null}
                    // Convert the Luxon object back into a string for Hook Form
                    onChange={(newValue) => {
                      field.onChange(newValue ? newValue.toISO() : "");
                    }}
                    slotProps={{
                      textField: {
                        error: !!errors.start,
                        helperText: errors.start?.message,
                        fullWidth: true,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </Stack>

          <Divider />

          <Controller
            name="modality"
            control={control}
            render={({ field }) => (
              <ScheduleFormRadioGroup
                field={field}
                label="Modality:"
                error={!!errors.modality}
                errorMessage={errors.modality?.message}
                radioItems={modalityOptions}
              />
            )}
          />

          {/* Link / Address Field */}
          {modality === "remote" ? (
            <Controller
              name="link"
              control={control}
              render={({ field }) => (
                <ScheduleFormTextField
                  field={field}
                  label="Meeting Link (URL)"
                  error={!!errors.link}
                  errorMessage={errors.link?.message}
                />
              )}
            />
          ) : (
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <ScheduleFormTextField
                  field={field}
                  label="Office/Location Address"
                  error={!!errors.address}
                  errorMessage={errors.address?.message}
                />
              )}
            />
          )}
        </Stack>

        <Stack direction="row" spacing={2} width="100%" mt={3}>
          {/* Cancel Button */}
          <ScheduleFormButtons
            type="button"
            variant="outlined"
            isLoading={isSubmitting}
            onClick={handleCancel}
          >
            Cancel
          </ScheduleFormButtons>

          {/* Save Button */}
          <ScheduleFormButtons type="submit" isLoading={isSubmitting}>
            Save
          </ScheduleFormButtons>
        </Stack>
      </Box>
    </Drawer>
  );
}
