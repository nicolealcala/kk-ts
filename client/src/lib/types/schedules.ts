export type ScheduleType = "interview" | "assessment" | "task" | "other";
export type Modality = "remote" | "onsite";

interface BaseSchedule {
  id: string;
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
