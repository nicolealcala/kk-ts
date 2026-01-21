export type ScheduleType = "interview" | "assessment" | "task" | "other";
export type Modality = "remote" | "onsite";

interface BaseSchedule {
  id: string | undefined;
  title: string;
  description?: string;
  type: ScheduleType;
  start: string;
  end: string;
}

export interface RemoteSchedule extends BaseSchedule {
  modality: "remote";
  link: string;
}

export interface OnsiteSchedule extends BaseSchedule {
  modality: "onsite";
  address?: string;
}

export type Schedule = RemoteSchedule | OnsiteSchedule;

/**
 * [CALENDAR]
 *
 * This type is primarily used in Calendar component, since it only accepts
 * JS Date for start and end props.
 */
export type CalendarEvent = Omit<Schedule, "start" | "end"> & {
  start: Date;
  end: Date;
};
