import {
  getCurrentWeekday,
  getPreviousWeekday,
  setTime,
} from "../utils/date.js";

const previousMonday = getPreviousWeekday(0);
const previousWednesday = getPreviousWeekday(2);
const previousFriday = getPreviousWeekday(4);

const thisMonday = getCurrentWeekday(0);
const thisThursday = getCurrentWeekday(3);

export const MOCK_EVENTS = [
  {
    title: "Technical Interview",
    description: "First-round technical interview with the engineering team.",
    type: "interview",
    status: "completed",
    startAt: setTime(previousMonday, 10, 0),
    endAt: setTime(previousMonday, 11, 0),
    isAllDay: false,
    location: {
      type: "online",
      link: "https://meet.google.com/abc-defg-hij",
    },
  },
  {
    title: "Coding Assessment",
    description: "Complete the take-home assessment.",
    type: "assessment",
    status: "completed",
    startAt: setTime(previousWednesday, 13, 0),
    endAt: setTime(previousWednesday, 15, 0),
    isAllDay: false,
    location: null,
  },
  {
    title: "Final Interview",
    description: "Meet with the hiring manager.",
    type: "interview",
    status: "scheduled",
    startAt: setTime(thisThursday, 9, 30),
    endAt: setTime(thisThursday, 10, 30),
    isAllDay: false,
    location: {
      type: "online",
      link: "https://zoom.us/j/123456789",
    },
  },
  {
    title: "Update Resume",
    description: "Tailor resume for frontend engineering roles.",
    type: "task",
    status: "scheduled",
    startAt: setTime(previousFriday, 8, 0),
    endAt: null,
    isAllDay: true,
    location: null,
  },
  {
    title: "Follow up with Recruiters",
    description: "Send follow-up emails for pending applications.",
    type: "follow_up",
    status: "scheduled",
    startAt: setTime(thisMonday, 14, 0),
    endAt: setTime(thisMonday, 14, 30),
    isAllDay: false,
    location: null,
  },
] as const;
