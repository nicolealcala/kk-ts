import ScheduleCalendar from "@/components/schedules/Calendar";
import TodayPanel from "@/components/schedules/TodayPanel";
import ScheduleForm from "@/components/schedules/ScheduleForm";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import SchedulesSkeleton from "@/components/schedules/SchedulesSkeleton";
import { useSchedulesData } from "@/utils/hooks/useSchedulesData";
import { DateTime } from "luxon";

export default function SchedulesPage() {
  const currentLocalDate = DateTime.local().toISODate() ?? "";
  const { schedules, isLoading, error } = useSchedulesData(currentLocalDate);

  if (isLoading) return <SchedulesSkeleton />;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Stack
      component="article"
      direction="row"
      spacing={2}
      p={2}
      position="relative"
      sx={{
        minHeight: 0,
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "20%",
          height: "100%",
          minHeight: 0,
          minWidth: 0,
        }}
      >
        <TodayPanel events={schedules} />
      </Box>
      <Box
        className="subtle-shadow"
        sx={{
          width: "80%",
          height: "100%",
          minHeight: 0,
          p: 2,
          borderRadius: 2,
          bgcolor: "white",
        }}
      >
        <ScheduleCalendar events={schedules} />
      </Box>

      <ScheduleForm />
    </Stack>
  );
}
