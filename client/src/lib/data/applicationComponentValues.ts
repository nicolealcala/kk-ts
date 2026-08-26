import type {
  ApplicationStatusData,
  WorkArrangementData,
} from "@/lib/schema/application.validation.ts";

type StatusOptions = { value: ApplicationStatusData; label: string };
type WorkArrangementOptions = { value: WorkArrangementData; label: string };

export const statusOptions: StatusOptions[] = [
  { value: "applied", label: "Applied" },
  { value: "assessment", label: "Assessment" },
  { value: "final_interview", label: "Final Interview" },
  { value: "initial_interview", label: "Initial Interview" },
  { value: "offer_accepted", label: "Offer Accepted" },
  { value: "offer_declined", label: "Offer Declined" },
  { value: "offer_received", label: "Offer Received" },
  { value: "rejected", label: "Rejected" },
  { value: "viewed", label: "Viewed" },
  { value: "withdrawn", label: "Withdrawn" },
];

export const workArrangementOptions: WorkArrangementOptions[] = [
  { label: "Remote", value: "remote" },
  { label: "Hybrid", value: "hybrid" },
  { label: "Onsite", value: "onsite" },
];
