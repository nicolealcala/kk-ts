import React, { useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import { DrawerHeader } from "../layout/Sidebar";
import Box from "@mui/material/Box";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Stack from "@mui/material/Stack";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import ScheduleFormButtons from "./ScheduleFormButtons";
import ScheduleFormTextField from "./ScheduleFormTextField";
import ScheduleFormSelect from "./ScheduleFormSelect";
import ScheduleFormTimePicker, {
  DependentTimePicker,
} from "./ScheduleFormTimePicker";
import ScheduleFormDatePicker from "./ScheduleFormDatePicker";
import Typography from "@mui/material/Typography";
import ScheduleFormRadioGroup from "./ScheduleFormRadioGroup";
import Divider from "@mui/material/Divider";
import { convertDateToIso } from "@/utils/date";
import type { CalendarEvent } from "@/pages/Schedules";
import type { OpenDrawerValues } from "@/pages/Schedules";
import { useSchedules } from "@/utils/hooks/useSchedules";
import scheduleFormSchema, {
  initialValues,
  type ScheduleFormInputs,
} from "@/lib/forms/scheduleFormSchema";

type ScheduleFormProps = {
  openDrawer: OpenDrawerValues;
  setOpenDrawer: React.Dispatch<React.SetStateAction<OpenDrawerValues>>;
  selectedEvent: CalendarEvent | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<CalendarEvent | null>>;
};

const modalityOptions = [
  { value: "remote", label: "Remote" },
  { value: "onsite", label: "In-Person" },
];

export default function ScheduleForm({
  openDrawer,
  setOpenDrawer,
  selectedEvent,
  setSelectedEvent,
}: ScheduleFormProps) {
  const {
    reset,
    resetField,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ScheduleFormInputs>({
    resolver: zodResolver(scheduleFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: initialValues,
  });

  const modality = useWatch({
    control,
    name: "modality",
  });

  useEffect(() => {
    if (selectedEvent) {
      const startIsoString = convertDateToIso(selectedEvent.start);
      const endIsoString = convertDateToIso(selectedEvent.end);

      reset({
        ...initialValues,
        ...selectedEvent,
        date: startIsoString,
        start: startIsoString,
        end: endIsoString,
      } as ScheduleFormInputs);
    }
  }, [selectedEvent, reset]);

  useEffect(() => {
    if (modality === "remote") resetField("address");
    if (modality === "onsite") resetField("link");
  }, [modality, resetField]);

  const currentLocalDate = new Date().toLocaleDateString();

  const { saveSchedule } = useSchedules(currentLocalDate);

  async function onSubmit(formData: ScheduleFormInputs) {
    saveSchedule(
      { data: formData, id: selectedEvent?.id },
      {
        onSuccess: () => {
          setOpenDrawer(null);
          reset();
        },
      },
    );
  }

  function handleCancel() {
    reset(initialValues);
    setSelectedEvent(null);
    setOpenDrawer(null);
  }

  const selectedDate = useWatch({
    control,
    name: "date",
  });

  return (
    <Drawer open={!!openDrawer} onClose={handleCancel} anchor="right">
      <DrawerHeader />
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          my: 2,
          mt: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Typography variant="h5" component="h1" fontWeight={500} px={2.5}>
          {openDrawer === "create" ? "Create a new event" : "Update event"}
        </Typography>
        <Box
          sx={{
            p: 2.5,
            pr: 1.3,
            pb: 0,
          }}
          className="thin-scrollbar"
        >
          <Stack spacing={3}>
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

            <Stack direction="row" spacing={2} maxWidth="500px">
              {/* Date Field */}
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <ScheduleFormDatePicker
                    field={field}
                    error={!!errors.date}
                    errorMessage={errors.date?.message}
                    label="Date"
                  />
                )}
              />

              {/* Start Time Field */}
              <Controller
                name="start"
                control={control}
                render={({ field }) => (
                  <ScheduleFormTimePicker
                    field={field}
                    error={!!errors.start}
                    errorMessage={errors.start?.message}
                    label="Start Time"
                    baseDate={selectedDate}
                  />
                )}
              />

              {/* End Time Field */}
              <Controller
                name="end"
                control={control}
                render={({ field }) => (
                  <DependentTimePicker
                    field={field}
                    control={control}
                    watchName="start"
                    label="End Time"
                    baseDate={selectedDate}
                    error={!!errors.end}
                    errorMessage={errors.end?.message}
                  />
                )}
              />
            </Stack>
          </Stack>

          <Divider sx={{ my: 4 }} />

          <Stack spacing={2.5}>
            <Stack direction="row" spacing={2}>
              {/* Type Field */}
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <ScheduleFormSelect
                    field={field}
                    label="Type"
                    error={!!errors.type}
                    errorMessage={errors.type?.message}
                  />
                )}
              />

              {/* Modality Field */}
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
            </Stack>

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
        </Box>
        <Stack direction="row" spacing={2} width="100%" px={2.5}>
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
