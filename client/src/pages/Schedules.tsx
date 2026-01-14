import ScheduleContextProvider from "@/components/context-providers/ScheduleContextProvider";
import ScheduleCalendar from "@/components/schedules/Calendar";
import EventsPanel from "@/components/schedules/EventsPanel";
import ScheduleForm from "@/components/schedules/ScheduleForm";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { type SlotInfo } from "react-big-calendar";

export default function SchedulesPage() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);

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
      <ScheduleContextProvider>
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
        >
          <ScheduleCalendar
            setOpenDrawer={setOpenDrawer}
            setSelectedSlot={setSelectedSlot}
          />
        </Box>

        <ScheduleForm
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />
      </ScheduleContextProvider>
    </Stack>
  );
}
