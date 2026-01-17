import * as z from "zod";
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
import Typography from "@mui/material/Typography";
import ScheduleFormRadioGroup from "./ScheduleFormRadioGroup";
import { useEffect } from "react";
import Divider from "@mui/material/Divider";
import ScheduleFormDatePicker from "./ScheduleFormDatePicker";
import ScheduleFormTimePicker from "./ScheduleFormTimePicker";
import { convertDateToIso } from "@/lib/utils/date";
import ScheduleFormSelect from "./ScheduleFormSelect";
import type { CalendarEvent } from "@/pages/Schedules";
import type { OpenDrawerValues } from "@/pages/Schedules";
//import { v4 as uuidv4 } from "uuid";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSchedule } from "@/lib/utils/api/schedules";
//import { DateTime } from "luxon";

type ScheduleDrawerType = {
  //setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  openDrawer: OpenDrawerValues;
  setOpenDrawer: React.Dispatch<React.SetStateAction<OpenDrawerValues>>;
  selectedEvent: CalendarEvent | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<CalendarEvent | null>>;
};

const scheduleSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().optional(),
  date: z.string().nonempty("Date is required"),
  start: z.string().nonempty("Start time is required"),
  end: z.string().nonempty("End time is required"),
  type: z.enum(["interview", "assessment", "task", "other"]),
  modality: z.enum(["onsite", "remote"]),
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
  date: "",
  start: "",
  end: "",
  type: "interview",
  modality: "remote",
  link: "",
  address: "",
};

function ScheduleForm({
  // setEvents,
  openDrawer,
  setOpenDrawer,
  selectedEvent,
  setSelectedEvent,
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
    //defaultValues: initialValues,
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

  // async function addNewSchedule() {
  //   const response = await fetch(
  //     `${import.meta.env.VITE_BASE_URL}/api/schedules?date=${currentLocalDate}`,
  //     { method: "POST", body: JSON.stringify(formData) }
  //   );

  //   if (!response.ok) throw new Error("Failed to add new schedule");

  //   return await response.json();
  // }
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: ScheduleFormInputs) =>
      updateSchedule(data, selectedEvent?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["schedules", currentLocalDate],
      });
      setOpenDrawer(null);
    },
  });
  async function onSubmit(formData: ScheduleFormInputs) {
    console.log("Start: ", formData.start, "End: ", formData.end);
    mutation.mutate(formData);
    // setEvents((prev) => {
    //   const selectedEventIndex = prev.findIndex(
    //     (e) => e.id === selectedEvent?.id
    //   );

    //   if (selectedEventIndex === -1) {
    //     const newEvent: CalendarEvent = {
    //       id: uuidv4(),
    //       ...formData,
    //       start: new Date(formData.start),
    //       end: new Date(formData.end),
    //     } as CalendarEvent;

    //     return [...prev, newEvent];
    //   }

    //   const updatedEvents = [...prev];

    //   updatedEvents[selectedEventIndex] = {
    //     ...prev[selectedEventIndex],
    //     ...formData,
    //     start: new Date(formData.start),
    //     end: new Date(formData.end),
    //   } as CalendarEvent;

    //   return updatedEvents;
    // });
    setOpenDrawer(null);
    reset(initialValues);
  }

  // async function onSubmit(formData: ScheduleFormInputs) {
  //   try {
  //     // 1. PREPARE API PAYLOAD (Convert Local -> UTC String)
  //     const apiPayload = {
  //       ...formData,
  //       // Luxon handles the timezone math automatically
  //       start: DateTime.fromISO(formData.start).toUTC().toISO(),
  //       end: DateTime.fromISO(formData.end).toUTC().toISO(),
  //     };

  //     // 2. SAVE TO DATABASE
  //     const url = selectedEvent?.id
  //       ? `/api/events/${selectedEvent.id}`
  //       : "/api/events";
  //     const method = selectedEvent?.id ? "PUT" : "POST";

  //     const response = await fetch(url, {
  //       method,
  //       body: JSON.stringify(apiPayload),
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     if (!response.ok) throw new Error("Save failed");
  //     const savedEvent = await response.json(); // Data from DB (with UTC dates and ID)

  //     // 3. UPDATE LOCAL STATE (Convert UTC String -> Local JS Date)
  //     setEvents((prev) => {
  //       // Create the Calendar-friendly version of the saved event
  //       const calendarFriendlyEvent: CalendarEvent = {
  //         ...savedEvent,
  //         start: DateTime.fromISO(savedEvent.start).toJSDate(),
  //         end: DateTime.fromISO(savedEvent.end).toJSDate(),
  //       };

  //       const index = prev.findIndex((e) => e.id === selectedEvent?.id);

  //       if (index === -1) {
  //         return [...prev, calendarFriendlyEvent];
  //       }

  //       return prev.map((e, i) => (i === index ? calendarFriendlyEvent : e));
  //     });

  //     setOpenDrawer(null);
  //     reset(initialValues);
  //   } catch (error) {
  //     console.error("Submission error:", error);
  //     // Add toast notification or error handling here
  //   }
  // }

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
    <Drawer
      open={!!openDrawer}
      onClose={() => setOpenDrawer(null)}
      anchor="right"
    >
      <DrawerHeader />
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          my: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          fontWeight={500}
          px={2.5}
        >
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
                  <ScheduleFormTimePicker
                    field={field}
                    error={!!errors.end}
                    errorMessage={errors.end?.message}
                    label="End Time"
                    baseDate={selectedDate}
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
                    error={!!errors.title}
                    errorMessage={errors.title?.message}
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

export default React.memo(ScheduleForm);
