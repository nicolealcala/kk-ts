export type WorkArrangement = "remote" | "hybrid" | "onsite";

export type JobSource = {
  platform?: string;
  link?: string;
};

export type ApplicationStatusHistory = {
  id?: string;
  applicationId?: string;
  status: string;
  notes?: string;
  createdAt: string;
};

export type JobType =
  | "applied"
  | "viewed"
  | "initial_interview"
  | "assessment"
  | "final_interview"
  | "offer_received"
  | "offer_declined"
  | "offer_accepted"
  | "rejected"
  | "withdrawn";
