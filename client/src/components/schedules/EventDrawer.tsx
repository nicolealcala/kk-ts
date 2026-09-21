import Drawer from "@mui/material/Drawer";
import EventView from "./EventView";
import useShallowStore from "@/store/useShallowStore";
import { useScheduleStore } from "@/store/schedules/scheduleStore";

export default function EventDrawer() {
  const { selectedEvent, closeDrawer } = useShallowStore(
    useScheduleStore,
    (state) => ({
      selectedEvent: state.selectedEvent,
      closeDrawer: state.closeDrawer,
    }),
  );
  return (
    <Drawer
      open={!!selectedEvent}
      onClose={closeDrawer}
      anchor="right"
      slotProps={{
        paper: {
          sx: { width: { xs: "100%", sm: "35%" }, px: 2.5, pt: 3, pb: 2 },
        },
      }}
    >
      <EventView selectedEvent={selectedEvent} />
    </Drawer>
  );
}
