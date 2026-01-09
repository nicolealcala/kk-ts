export function getCurrentYear() {
  return new Date().getFullYear();
}

import { type Schedule } from "../types/schedules";

function convertToLocale(start: string, end: string) {
  const localeDateTime = {
    localeStart: {
      date: new Date(start).toLocaleDateString(),
      time: new Date(start).getHours(),
      day: new Date(start).getDay(),
    },
    localeEnd: {
      date: new Date(end).toLocaleString(),
      time: new Date(end).getHours(),
      day: new Date(end).getDay(),
    },
  };

  return localeDateTime;
}
export const transformSchedules = (data: Schedule[]) => {
  return data.map((d) => {
    const { start, end } = d;

    const { localeStart, localeEnd } = convertToLocale(start, end);

    return {
      title: d.title,
      day: localeStart.day,
      start: localeStart.time,
      end: localeEnd.time,
    };
  });
};
