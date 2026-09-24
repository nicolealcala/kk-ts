import type { Schedule } from "../../lib/types/schedules";

const schedulesData: Schedule[] = [
  {
    id: "1",
    title: "Technical Interview - Frontend",
    description: "Deep dive into:\n* **React** patterns\n* `TypeScript` logic",
    type: "interview",
    modality: "remote",
    start: "2026-09-20T02:00:00Z",
    end: "2026-09-20T03:30:00Z",
    link: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "2",
    title: "System Design Assessment",
    description: "> **Onsite whiteboarding**: Dashboard architecture.",
    type: "assessment",
    modality: "onsite",
    start: "2026-09-21T05:00:00Z",
    end: "2026-09-21T07:00:00Z",
    address: "Level 12, Tech Tower, Makati Ave, Manila",
  },
  {
    id: "3",
    title: "Take-home Task Review",
    description:
      "Reviewing progress on the [UI library task](https://github.com/org/repo).",
    type: "task",
    modality: "remote",
    start: "2026-09-22T08:00:00Z",
    end: "2026-09-22T09:00:00Z",
    link: "https://zoom.us/j/987654321",
  },
  {
    id: "4",
    title: "Culture Fit Interview",
    description: "Meeting with the _Engineering VP_.",
    type: "other",
    modality: "onsite",
    start: "2026-09-23T03:00:00Z",
    end: "2026-09-23T04:00:00Z",
    address: "Greenbelt 5, Corporate Center",
  },
];

export default schedulesData;
