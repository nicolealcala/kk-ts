import ScheduleCalendar from "@/components/schedules/Calendar";
import EventsPanel from "@/components/schedules/EventsPanel";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function SchedulesPage() {
  return (
    <Stack
      component="article"
      direction="row"
      spacing={2}
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
        <EventsPanel />
      </Box>
      <Box
        sx={{
          width: "80%",
          p: 2,
          borderRadius: 2,
          bgcolor: "white",
        }}
        // className="subtle-shadow"
      >
        <ScheduleCalendar />
      </Box>
    </Stack>
  );
}
