export function getCurrentYear() {
  return new Date().getFullYear();
}

import { type Schedule } from "../types/schedules";

/**
 * Function to convert UTC string start and end dates into locale form
 * 
 * @param start
 * @param end
 * @returns
 */
function convertDateToLocale(start: string, end: string) {
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

/**
 * Function that accepts an array of Schedule objects in UTC and transforms
 * them into locale dates and time.
 *
 * @param data
 * @returns
 */
export function transformWeeklySchedules(data: Schedule[]) {
  return data.map((d) => {
    const { start, end } = d;

    const { localeStart, localeEnd } = convertDateToLocale(start, end);

    return {
      title: d.title,
      day: localeStart.day,
      start: localeStart.time,
      end: localeEnd.time,
    };
  });
}

/**
 * Function to convert a Date object into its ISO string form
 * @param date
 * @returns string
 */

export function convertDateToIso(date: Date | string) {
  return date instanceof Date ? date.toISOString() : date;
}
