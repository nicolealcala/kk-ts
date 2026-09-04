import type { ApplicationFormData } from "@/lib/schema/applicationSchema.ts";

export const applicationsData: (ApplicationFormData & { id: string })[] = [
  {
    id: "1",
    company: "Company A",
    position: "Software Engineer",
    employmentType: "full_time",
    workArrangement: "remote",
    location: {
      city: "Makati",
      countryCode: "Philippines",
    },
    compensationMin: 80000,
    compensationMax: 120000,
    currency: "PHP",
    appliedAt: "2025-05-10T08:00:00Z",
    status: "applied",
    jobDescription:
      "Full-stack development using React and Node.js. Responsible for maintaining core banking modules.",
    source: { platform: "linkedin" },
    statusHistory: [
      {
        applicationId: "1",
        status: "applied",
        createdAt: "2025-05-10T08:00:00Z",
      },
    ],
  },
  {
    id: "2",
    company: "Company B",
    position: "Data Scientist",
    employmentType: "contract",
    workArrangement: "remote",
    location: {
      countryCode: "USA",
    },
    compensationMin: 4000,
    compensationMax: 6000,
    currency: "USD",
    appliedAt: "2024-04-20T10:30:00Z",
    status: "initial_interview",
    jobDescription:
      "Building predictive models for customer churn using Python and SQL.",

    source: { platform: "indeed" },
    statusHistory: [
      {
        applicationId: "2",
        status: "applied",
        createdAt: "2024-04-20T10:30:00Z",
      },
      {
        applicationId: "2",
        status: "initial_interview",
        createdAt: "2024-04-22T14:00:00Z",
      },
    ],
  },
  {
    id: "3",
    company: "Company C",
    position: "Product Manager",
    employmentType: "full_time",
    workArrangement: "hybrid",
    location: {
      city: "Makati",
      countryCode: "Philippines",
    },
    compensationMax: 150000,
    currency: "PHP",
    appliedAt: "2024-03-01T11:00:00Z",
    status: "offer_received",

    jobDescription:
      "Leading the roadmap for the mobile app squad and coordinating with stakeholders.",
    source: { platform: "jobstreet" },
    statusHistory: [
      {
        applicationId: "3",
        status: "offer_received",
        createdAt: "2024-03-15T09:15:00Z",
      },
    ],
  },
  {
    id: "4",
    company: "Company D",
    position: "UX Designer",
    employmentType: "part_time",
    workArrangement: "remote",
    location: {
      city: "Makati",
      countryCode: "PH",
    },
    appliedAt: "2024-02-15T13:20:00Z",
    status: "rejected",
    source: { platform: "jobstreet" },
    statusHistory: [
      {
        applicationId: "4",
        status: "rejected",
        createdAt: "2024-02-28T16:45:00Z",
      },
    ],
  },
];

export default applicationsData;
