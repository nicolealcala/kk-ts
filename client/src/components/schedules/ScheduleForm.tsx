import React, { useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import { DrawerHeader } from "../layout/Sidebar";
import Box from "@mui/material/Box";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Stack from "@mui/material/Stack";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import ControlledFormTextField from "../shared/form/ControlledFormTextField";
import ControlledFormSelect from "../shared/form/ControlledFormSelect";
import ScheduleFormTimePicker, {
  DependentTimePicker,
} from "./ScheduleFormTimePicker";
import ScheduleFormDatePicker from "./ScheduleFormDatePicker";
import Typography from "@mui/material/Typography";
import ScheduleFormRadioGroup from "./ScheduleFormRadioGroup";
import Divider from "@mui/material/Divider";
import { convertDateToIso } from "@/utils/date";
import { useSchedules } from "@/utils/hooks/useSchedules";
import scheduleFormSchema, {
  initialValues,
  type ScheduleFormInputs,
} from "@/lib/forms/scheduleFormSchema";
import type { CalendarEvent } from "@/lib/types/schedules";
import type { OpenDrawerValues } from "@/lib/types/forms";
import FormButtons from "../shared/form/FormButtons";

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

const typeValues = [
  { label: "Interview", value: "interview" },
  { label: "Assessment", value: "assessment" },
  { label: "Task", value: "task" },
  { label: "Other", value: "other" },
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

  /**
   * Watch modality and date field for dependency updates.
   *
   * Modality: for toggling between link (remote) and address (onsite) fields
   * SelectedDate: reference for start and end times (since MUI uses DateTime)
   */
  const modality = useWatch({
    control,
    name: "modality",
  });

  const selectedDate = useWatch({
    control,
    name: "date",
  });

  /**
   * When an existing event is selected, pass its values to the form.
   *
   * Convert Date objects from `react-big-calendar` events into string (ISO)
   * to match zod and backend schema.
   */
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

  /**
   * When toggling between "remote" and "onsite" modality, reset states
   * for address and link fields for cleanup
   */
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
          maxWidth: "600px",
        }}
      >
        <Typography variant="h5" component="h1" fontWeight="medium" px={2.5}>
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

            <ControlledFormTextField
              name="title"
              control={control}
              label="Title"
              error={!!errors.title}
              placeholder="Event title"
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

              <ControlledFormSelect
                name="type"
                control={control}
                label="Type"
                items={typeValues}
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
              <ControlledFormTextField
                name="link"
                control={control}
                label="Meeting Link (URL)"
              />
            ) : (
              <ControlledFormTextField
                name="address"
                control={control}
                label="Office/Location Address"
              />
            )}
          </Stack>
        </Box>
        <Stack direction="row" spacing={2} width="100%" px={2.5}>
          {/* Cancel Button */}
          <FormButtons
            type="button"
            variant="outlined"
            loading={isSubmitting}
            onClick={handleCancel}
          >
            Cancel
          </FormButtons>

          {/* Save Button */}
          <FormButtons type="submit" loading={isSubmitting}>
            Save
          </FormButtons>
        </Stack>
      </Box>
    </Drawer>
  );
}
