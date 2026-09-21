import {
  Calendar,
  luxonLocalizer,
  type SlotInfo,
  Views,
} from "react-big-calendar";
import { DateTime } from "luxon";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/styles/schedules.scss";
import React, { useMemo } from "react";
import CustomToolbar, { type CustomToolbarProps } from "./CalendarToolbar";
import type { CalendarEvent, Schedule } from "@/lib/types/schedules";
import { toCalendarEvent } from "@/utils/date";
import { useScheduleStore } from "@/store/schedules/scheduleStore";
import useShallowStore from "@/store/useShallowStore";

const localizer = luxonLocalizer(DateTime);

type ScheduleCalendarProps = {
  events: Schedule[];
};

function ScheduleCalendar({ events }: ScheduleCalendarProps) {
  const { view, date, setView, setDate, openCreateDrawer, openUpdateDrawer } =
    useShallowStore(useScheduleStore, (state) => ({
      view: state.view,
      date: state.date,
      setView: state.setView,
      setDate: state.setDate,
      openCreateDrawer: state.openCreateDrawer,
      openUpdateDrawer: state.openUpdateDrawer,
    }));

  const components = useMemo(
    () => ({
      toolbar: (props: CustomToolbarProps) => <CustomToolbar {...props} />,
    }),
    [],
  );

  const calendarEvents = useMemo(
    () => events.map(toCalendarEvent).filter((event) => event !== null),
    [events],
  );

  const minTime = new Date();
  minTime.setHours(0, 0, 0, 0);

  const maxTime = new Date();
  maxTime.setHours(23, 59, 59, 999);

  const handleSelectSlot = ({ start }: SlotInfo) => {
    const createStart = new Date(start);

    createStart.setMinutes(
      Math.floor(createStart.getMinutes() / 15) * 15,
      0,
      0,
    );

    const createEnd = new Date(createStart);
    createEnd.setMinutes(createEnd.getMinutes() + 30);

    openCreateDrawer(createStart, createEnd);
  };

  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      views={[Views.MONTH, Views.WEEK, Views.DAY]}
      view={view}
      onView={setView}
      date={date}
      onNavigate={setDate}
      selectable
      onSelectSlot={handleSelectSlot}
      onSelectEvent={(event: CalendarEvent) => openUpdateDrawer(event)}
      components={components}
      popup
      step={30}
      timeslots={2}
      min={minTime}
      max={maxTime}
      scrollToTime={new Date()}
      style={{ height: "100%" }}
    />
  );
}

export default React.memo(ScheduleCalendar);
