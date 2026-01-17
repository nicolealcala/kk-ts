import ScheduleCalendar from "@/components/schedules/Calendar";
import TodayPanel from "@/components/schedules/TodayPanel";
import ScheduleForm from "@/components/schedules/ScheduleForm";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { DateTime } from "luxon";
import type {
  OnsiteSchedule,
  RemoteSchedule,
  Schedule,
} from "@/lib/types/schedules";
import { useQuery } from "@tanstack/react-query";
import SchedulesSkeleton from "@/components/schedules/SchedulesSkeleton";

export type OpenDrawerValues = "create" | "update" | null;

type RemoteCalendarEvent = Omit<RemoteSchedule, "start" | "end"> & {
  start: Date;
  end: Date;
};

type OnsiteCalendarEvent = Omit<OnsiteSchedule, "start" | "end"> & {
  start: Date;
  end: Date;
};

export type CalendarEvent = RemoteCalendarEvent | OnsiteCalendarEvent;

// const calendarEvents: CalendarEvent[] = schedules.map((s) => ({
//   ...s,
//   start: DateTime.fromISO(s.start).toJSDate(),
//   end: DateTime.fromISO(s.end).toJSDate(),
// })) as CalendarEvent[];

export default function SchedulesPage() {
  //const [events, setEvents] = useState(calendarEvents);
  const [openDrawer, setOpenDrawer] = useState<OpenDrawerValues>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const currentLocalDate = new Date().toLocaleDateString();

  async function fetchSchedules() {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/schedules?date=${currentLocalDate}`
    );

    if (!response.ok) throw new Error("Failed to fetch schedules");

    const data = await response.json();

    return data?.map((d: Schedule) => ({
      ...d,
      start: DateTime.fromISO(d.start).toJSDate(),
      end: DateTime.fromISO(d.end).toJSDate(),
    })) as CalendarEvent[];
  }

  const { isLoading, data, error } = useQuery({
    queryKey: [`schedules`, currentLocalDate],
    queryFn: fetchSchedules,
  });

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
        <TodayPanel events={data || []} />
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
          events={data || []}
          setOpenDrawer={setOpenDrawer}
          setSelectedEvent={setSelectedEvent}
        />
      </Box>

      <ScheduleForm
        // setEvents={setEvents} // TO DO: Pass mutate function
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />
    </Stack>
  );
}
