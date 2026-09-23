import { useEffect } from "react";
import Drawer from "@mui/material/Drawer";
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
import { convertDateToIso } from "@/utils/date";
import { useSchedulesData } from "@/utils/hooks/useSchedules";
import scheduleFormSchema, {
  initialValues,
  type ScheduleFormInputs,
} from "@/lib/schema/scheduleSchema";
import FormButtons from "../shared/form/FormButtons";
import { useScheduleStore } from "@/store/schedules/scheduleStore";
import useShallowStore from "@/store/useShallowStore";
import { DateTime } from "luxon";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Button from "@mui/material/Button";
import { secondaryButtonSx } from "@/utils/styles";

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

type ScheduleFormProps = {
  handleDelete: (onSuccess: () => void) => void;
};
export default function ScheduleForm({ handleDelete }: ScheduleFormProps) {
  const {
    drawerMode,
    selectedEvent,
    date,
    createStart,
    createEnd,
    closeDrawer,
  } = useShallowStore(useScheduleStore, (state) => ({
    drawerMode: state.drawerMode,
    selectedEvent: state.selectedEvent,
    date: state.date,
    createStart: state.createStart,
    createEnd: state.createEnd,
    closeDrawer: state.closeDrawer,
  }));
  
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

  const selectedDate = useWatch({
    control,
    name: "date",
  });

  useEffect(() => {
    if (drawerMode === "update" && selectedEvent) {
      const startIsoString = convertDateToIso(selectedEvent.start);
      const endIsoString = convertDateToIso(selectedEvent.end);

      reset({
        ...initialValues,
        ...selectedEvent,
        date: startIsoString,
        start: startIsoString,
        end: endIsoString,
      } as ScheduleFormInputs);
      return;
    }

    if (drawerMode === "create") {
      const startIsoString = createStart ? convertDateToIso(createStart) : "";

      const endIsoString = createEnd ? convertDateToIso(createEnd) : "";

      reset({
        ...initialValues,
        date: DateTime.fromJSDate(date).toISO() ?? "",
        start: startIsoString,
        end: endIsoString,
      });
    }
  }, [drawerMode, selectedEvent, date, createStart, createEnd, reset]);

  useEffect(() => {
    if (modality === "remote") resetField("address");
    if (modality === "onsite") resetField("link");
  }, [modality, resetField]);

  const { saveSchedule, isDeleting } = useSchedulesData();

  async function onSubmit(formData: ScheduleFormInputs) {
    saveSchedule(
      { data: formData, id: selectedEvent?.id },
      {
        onSuccess: () => {
          closeDrawer();
          reset(initialValues);
        },
      },
    );
  }

  function handleCancel() {
    reset(initialValues);
    closeDrawer();
  }

  return (
    <Drawer
      open={!!drawerMode}
      onClose={handleCancel}
      anchor="right"
      slotProps={{
        paper: {
          sx: { width: { xs: "100%", sm: "35%" } },
        },
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          my: 2.5,
          mt: 5,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Stack direction="row" justifyContent="space-between" px={2.5} pb={1}>
          <Typography
            variant="h5"
            component="h1"
            fontWeight="medium"
            display="flex"
            alignItems="center"
          >
            {drawerMode === "create" ? "Create a new event" : "Update event"}
          </Typography>

          {drawerMode === "update" && (
            <Button
              onClick={() =>
                handleDelete(() => {
                  reset(initialValues);
                })
              }
              disabled={isDeleting}
              sx={{
                borderRadius: 2,
                minWidth: 0,
                p: 1,
                bgcolor: "action.hover",
                color: "action.active",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  color: "error.main",
                  bgcolor: "error.extraLight",
                },
              }}
            >
              <DeleteOutlinedIcon />
            </Button>
          )}
        </Stack>
        <Box
          sx={{
            p: 2.5,
            pr: 1.3,
            pt: 2,
          }}
          className="thin-scrollbar"
        >
          <Stack spacing={4}>
            <ControlledFormTextField
              name="title"
              control={control}
              label="Title"
              error={!!errors.title}
              placeholder="Event title"
            />

            <Stack direction="row" spacing={2}>
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

            <Stack direction="row" spacing={2}>
              <Controller
                name="modality"
                control={control}
                render={({ field }) => (
                  <ScheduleFormRadioGroup
                    field={field}
                    label="Modality"
                    error={!!errors.modality}
                    errorMessage={errors.modality?.message}
                    radioItems={modalityOptions}
                  />
                )}
              />
              <ControlledFormSelect
                name="type"
                control={control}
                label="Type"
                items={typeValues}
              />
            </Stack>

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

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <MDEditor
                  value={field.value || ""}
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
          </Stack>
        </Box>
        <Stack
          direction="row"
          spacing={2}
          width="100%"
          px={2.5}
          mt="auto"
          pt={2}
        >
          <FormButtons
            type="button"
            variant="outlined"
            disabled={isSubmitting}
            onClick={handleCancel}
            sx={secondaryButtonSx}
          >
            Cancel
          </FormButtons>

          <FormButtons type="submit" loading={isSubmitting}>
            Save
          </FormButtons>
        </Stack>
      </Box>
    </Drawer>
  );
}
