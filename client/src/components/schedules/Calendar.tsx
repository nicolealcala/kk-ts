import { Calendar, luxonLocalizer, Views, type View } from "react-big-calendar";
import { DateTime } from "luxon";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/styles/schedules.scss";
import { useMemo, useState, type SetStateAction } from "react";
import React from "react";
import CustomToolbar, { type CustomToolbarProps } from "./CalendarToolbar";
import type { OpenDrawerValues, CalendarEvent } from "@/pages/Schedules";

const localizer = luxonLocalizer(DateTime);

type ScheduleCalendar = {
  events: CalendarEvent[];
  setOpenDrawer: React.Dispatch<SetStateAction<OpenDrawerValues>>;
  setSelectedEvent: React.Dispatch<React.SetStateAction<CalendarEvent | null>>;
};

function ScheduleCalendar({
  events,
  setOpenDrawer,
  setSelectedEvent,
}: ScheduleCalendar) {
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());

  const handleSelectEvent = (event: CalendarEvent) => {
    console.log(event);
    setOpenDrawer("update");
    setSelectedEvent(event);
  };

  const { components } = useMemo(
    () => ({
      components: {
        toolbar: (props: CustomToolbarProps) => (
          <CustomToolbar {...props} onAdd={() => setOpenDrawer("create")} />
        ),
      },
    }),
    [setOpenDrawer]
  );

  return (
    <Calendar<CalendarEvent>
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
      onSelectEvent={handleSelectEvent}
      // startAccessor="start"
      // endAccessor="end"
      components={components}
    />
  );
}

export default React.memo(ScheduleCalendar);
