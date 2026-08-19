export type WorkArrangement = "remote" | "hybrid" | "onsite";

type JobLocation = {
  country?: string;
  city?: string;
  postalCode?: number;
};

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

export type SalaryRange = {
  currency: string;
  minAmount?: number;
  maxAmount?: number;
};

export type JobType = "gig" | "parttime" | "fulltime" | "contract" | "other";
export interface Application {
  id: string;
  organization: string;
  position: string;
  location: JobLocation;
  workArrangement: WorkArrangement;
  source: JobSource;
  statusHistory: ApplicationStatusHistory[];
  type: JobType;
  salary?: SalaryRange;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
