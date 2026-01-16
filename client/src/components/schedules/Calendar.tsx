import {
  Calendar,
  luxonLocalizer,
  Views,
  type SlotInfo,
  type View,
} from "react-big-calendar";
import { DateTime } from "luxon";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/styles/schedules.scss";
import { useMemo, useState, type SetStateAction } from "react";
import { schedules } from "@/lib/mock-data/schedules";
import React from "react";
import CustomToolbar, {
  type CalendarEvent,
  type CustomToolbarProps,
} from "./CalendarToolbar";

const localizer = luxonLocalizer(DateTime);

const events: CalendarEvent[] = schedules.map((s) => ({
  ...s,
  start: DateTime.fromISO(s.start).toJSDate(),
  end: DateTime.fromISO(s.end).toJSDate(),
})) as CalendarEvent[];

type ScheduleCalendar = {
  setOpenDrawer: React.Dispatch<SetStateAction<boolean>>;
  setSelectedSlot: React.Dispatch<React.SetStateAction<SlotInfo | null>>;
};

export default function ScheduleCalendar({
  setOpenDrawer,
}: //setSelectedSlot,
ScheduleCalendar) {
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());

  // const handleSelectSlot = (slotProps: SlotInfo) => {
  //   console.log(slotProps);
  //   setOpenDrawer(true);
  //   setSelectedSlot(slotProps);
  // };

  const { components } = useMemo(
    () => ({
      components: {
        toolbar: (props: CustomToolbarProps) => (
          <CustomToolbar {...props} onAdd={() => setOpenDrawer(true)} />
        ),
      },
    }),
    [setOpenDrawer]
  );

  return (
    <Calendar<CalendarEvent>
      //selectable
      //onSelectSlot={handleSelectSlot}
      localizer={localizer}
      events={events}
      //For calendar display options
      views={[Views.MONTH, Views.WEEK, Views.DAY]}
      defaultView={view}
      view={view}
      onView={(view) => setView(view)}
      // For date range navigations
      date={date}
      onNavigate={(date) => {
        setDate(new Date(date));
      }}
      onSelectEvent={(e) => console.log(e)}
      // startAccessor="start"
      // endAccessor="end"
      components={components}
    />
  );
}
