import ScheduleCalendar from "@/components/schedules/Calendar";
import TodayPanel from "@/components/schedules/TodayPanel";
import ScheduleForm from "@/components/schedules/ScheduleForm";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import type { Schedule } from "@/lib/types/schedules";
import SchedulesSkeleton from "@/components/schedules/SchedulesSkeleton";
import { useSchedules } from "@/lib/utils/hooks/useSchedules";

export type OpenDrawerValues = "create" | "update" | null;

// Change type of Schedule's start and end time because Calendar only accepts JS Date
export type CalendarEvent = Omit<Schedule, "start" | "end"> & {
  start: Date;
  end: Date;
};
export default function SchedulesPage() {
  const [openDrawer, setOpenDrawer] = useState<OpenDrawerValues>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );

  const currentLocalDate = new Date().toLocaleDateString();

  const { schedules, isLoading, error } = useSchedules(currentLocalDate);

  if (isLoading) return <SchedulesSkeleton />;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Stack
      component="article"
      direction="row"
      spacing={2}
      position="relative"
      sx={{
        minHeight: 0,
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "20%",
        }}
      >
        <TodayPanel events={schedules || []} />
      </Box>
      <Box
        sx={{
          width: "80%",
          p: 2,
          borderRadius: 2,
          bgcolor: "white",
        }}
      >
        <ScheduleCalendar
          events={schedules || []}
          setOpenDrawer={setOpenDrawer}
          setSelectedEvent={setSelectedEvent}
        />
      </Box>

      <ScheduleForm
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />
    </Stack>
  );
}
