import type {
  ApplicationStatusData,
  WorkArrangementData,
} from "@/lib/schema/applicationSchema.ts";

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

export const jobTypeOptions = [
  { value: "apprenticeship", label: "Apprenticeship" },
  { value: "contract", label: "Contract" },
  { value: "fixed_term", label: "Fixed Term" },
  { value: "freelance", label: "Freelance" },
  { value: "full_time", label: "Full-time" },
  { value: "internship", label: "Internship" },
  { value: "part_time", label: "Part-time" },
  { value: "self_employed", label: "Self Employed" },
  { value: "temporary", label: "Temporary" },
  { value: "volunteer", label: "Volunteer" },
];

export const modalityOptions = [
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "In-Person" },
  { value: "remote", label: "Remote" },
];

export const platformOptions = [
  { value: "company-website", label: "Company Website" },
  { value: "foundit", label: "FoundIt" },
  { value: "glassdoor", label: "Glassdoor" },
  { value: "indeed", label: "Indeed" },
  { value: "jobstreet", label: "JobStreet" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "welfound", label: "Wellfound" },
  { value: "other", label: "Other" },
];

export const payFrequencyOptions = [
  { value: "hourly", label: "Hourly" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "bi_weekly", label: "Bi-Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "annually", label: "Annually" },
];
