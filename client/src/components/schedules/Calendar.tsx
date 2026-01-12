import { Calendar, luxonLocalizer, Views, type View } from "react-big-calendar";
import { DateTime } from "luxon";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/styles/schedules.scss";
import { useState } from "react";

const localizer = luxonLocalizer(DateTime);
const myEventsList = [
  {
    title: "Project Kickoff",
    start: DateTime.now().plus({ hours: 1 }).toJSDate(),
    end: DateTime.now().plus({ hours: 2 }).toJSDate(),
  },
];

export default function ScheduleCalendar() {
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());
  return (
    <Calendar
      localizer={localizer}
      events={myEventsList}
      views={[Views.MONTH, Views.WEEK, Views.DAY]}
      defaultView={view}
      view={view} // Include the view prop
      date={date} // Include the date prop
      onView={(view) => setView(view)}
      onNavigate={(date) => {
        setDate(new Date(date));
      }}
      startAccessor="start"
      endAccessor="end"
    />
  );
}
