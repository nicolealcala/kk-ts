type ScheduleType = "interview" | "assessment" | "task";
export type Modality = "remote" | "onsite";

interface BaseSchedule {
  id: string;
  title: string;
  description?: string;
  type: ScheduleType;
  start: string;
  end: string;
}

interface RemoteSchedule extends BaseSchedule {
  modality: "remote";
  link: string;
}

interface OnsiteSchedule extends BaseSchedule {
  modality: "onsite";
  address?: string;
}

export type Schedule = RemoteSchedule | OnsiteSchedule;
