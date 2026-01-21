import { Calendar, luxonLocalizer, Views, type View } from "react-big-calendar";
import { DateTime } from "luxon";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/styles/schedules.scss";
import React, { useMemo, useState } from "react";
import CustomToolbar, { type CustomToolbarProps } from "./CalendarToolbar";
import type { OpenDrawerValues } from "@/pages/Schedules";
import type { CalendarEvent, Schedule } from "@/lib/types/schedules";

const localizer = luxonLocalizer(DateTime);

type ScheduleCalendarProps = {
  events: Schedule[];
  setOpenDrawer: React.Dispatch<React.SetStateAction<OpenDrawerValues>>;
  setSelectedEvent: React.Dispatch<React.SetStateAction<CalendarEvent | null>>;
};

function ScheduleCalendar({
  events,
  setOpenDrawer,
  setSelectedEvent,
}: ScheduleCalendarProps) {
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
    [setOpenDrawer],
  );

  const calendarEvents = useMemo(() => {
    return events.map((e) => ({
      ...e,
      start: DateTime.fromISO(e.start).toJSDate(),
      end: DateTime.fromISO(e.end).toJSDate(),
    }));
  }, [events]);

  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
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
      components={components}
    />
  );
}

export default React.memo(ScheduleCalendar);
