export type WorkArrangement = "remote" | "hybrid" | "onsite";

/**
 * [CLIENT]
 */
// export type ApplicationStatus = {
//   value: string;
//   color: string;
// };

type JobLocation = {
  country?: string;
  city?: string;
  postalCode?: number;
};

type JobSource = {
  platform?: string;
  link?: string;
};

type ApplicationStatus = {
  status: string;
  date: string;
};

export type SalaryRange = {
  currency: string;
  minAmount?: number;
  maxAmount?: number;
};
export interface Application {
  id: string;
  organization: string;
  position: string;
  location: JobLocation;
  workArrangement: WorkArrangement;
  source: JobSource;
  statusHistory: ApplicationStatus[];
  salary?: SalaryRange;
  createDate: string;
  updateDate: string;
}
