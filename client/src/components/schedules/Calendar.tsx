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
import { useState, type SetStateAction } from "react";
import { schedules } from "@/lib/mock-data/schedules";
import React from "react";

const localizer = luxonLocalizer(DateTime);

const events = schedules.map((s) => ({
  ...s,
  start: DateTime.fromISO(s.start).toJSDate(),
  end: DateTime.fromISO(s.end).toJSDate(),
}));

type ScheduleCalendar = {
  setOpenDrawer: React.Dispatch<SetStateAction<boolean>>;
  setSelectedSlot: React.Dispatch<React.SetStateAction<SlotInfo | null>>;
};

export default function ScheduleCalendar({
  setOpenDrawer,
  setSelectedSlot,
}: ScheduleCalendar) {
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());

  const handleSelectSlot = (slotProps: SlotInfo) => {
    console.log(slotProps);
    setOpenDrawer(true);
    setSelectedSlot(slotProps);
  };

  return (
    <Calendar
      selectable={true}
      localizer={localizer}
      events={events}
      views={[Views.MONTH, Views.WEEK, Views.DAY]}
      defaultView={view}
      view={view} // Include the view prop
      date={date} // Include the date prop
      onView={(view) => setView(view)}
      onNavigate={(date) => {
        setDate(new Date(date));
      }}
      onSelectEvent={(e) => console.log(e)}
      onSelectSlot={handleSelectSlot}
      startAccessor="start"
      endAccessor="end"
    />
  );
}
