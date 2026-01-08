import { schedules } from "./schedules";

export const contextData = {
  year: "2026",
  employmentHistory: {
    organization: {
      name: "",
      img: "",
    },
  },
};

const kpiChartsData = {
  funnelYield: {
    result: 50,
    sentiment: 1,
    data: [
      { label: "Monday", value: 0 },
      { label: "Tuesday", value: 30 },
      { label: "Wednesday", value: 50 },
      { label: "Thursday", value: 0 },
      { label: "Friday", value: 21 },
      { label: "Saturday", value: 5 },
      { label: "Sunday", value: 15 },
    ],
  },
  topSource: {
    result: "JobStreet",
    sentiment: 1,
    data: [
      { label: "JobSreet", value: 9 },
      { label: "Indeed", value: 12 },
      { label: "LinkedIn", value: 11 },
    ],
  },
  avgWaitTime: {
    result: 5,
    sentiment: 0,
    data: [
      { label: "Monday", value: 0 },
      { label: "Tuesday", value: 2 },
      { label: "Wednesday", value: 1 },
      { label: "Thursday", value: 0 },
      { label: "Friday", value: 0 },
      { label: "Saturday", value: 5 },
      { label: "Sunday", value: 10 },
    ],
  },
};

const appplicationsVolumeData = [
  { month: "January", value: 10 },
  { month: "February", value: 0 },
  { month: "March", value: 0 },
  { month: "April", value: 0 },
  { month: "May", value: 0 },
  { month: "June", value: 0 },
  { month: "July", value: 0 },
  { month: "August", value: 0 },
  { month: "September", value: 0 },
  { month: "October", value: 0 },
  { month: "November", value: 0 },
  { month: "December", value: 0 },
];

const applicationStatusData = [
  { label: "Applied", value: 10 },
  { label: "Interviewing", value: 4 },
  { label: "Offered", value: 3 },
  { label: "Rejected", value: 1 },
  { label: "Withdrawn", value: 0 },
  { label: "Accepted", value: 1 },
  { label: "Ghosted", value: 6 },
];

export const dashboardData = {
  kpis: { ...kpiChartsData },
  volumeTrend: [...appplicationsVolumeData],
  applicationStatus: [...applicationStatusData],
  schedules: [...schedules],
};
