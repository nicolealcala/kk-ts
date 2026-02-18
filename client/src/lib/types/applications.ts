export type WorkArrangement = "remote" | "hybrid" | "onsite";

export type JobSource = {
  platform?: string | null;
  link?: string | null;
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
  description?: string;
  employment_type: JobType;
  city?: string | null;
  country?: string | null;
  postal_code?: string | null;
  work_arrangement: WorkArrangement | null;
  source_platform?: string | null;
  source_link?: string | null;
  salary_currency_code?: string | null;
  salary_min?: number | null;
  salary_max?: number | null;
  current_status: string;
  created_at: string;
  updated_at: string;
}
