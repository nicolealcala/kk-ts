import type { Application } from "@/lib/types/applications"; // Assuming types are in a separate file

// const applicationsData: Application[] = [
//   {
//     id: "1",
//     organization: "Company A",
//     position: "Software Engineer",
//     location: {
//       city: "Makati",
//       country: "Philippines",
//     },
//     workArrangement: "remote",
//     source: { platform: "LinkedIn", link: "#" },
//     statusHistory: [{ status: "applied", date: "2025-05-10T08:00:00Z" }],
//     salary: {
//       currency: "PHP",
//       minAmount: 80000,
//       maxAmount: 120000,
//     },
//     createDate: "2025-05-10T08:00:00Z",
//     updateDate: "2025-05-10T08:00:00Z",
//   },
//   {
//     id: "2",
//     organization: "Company B",
//     position: "Data Scientist",
//     location: {
//       city: "Makati",
//       country: "Philippines",
//     },
//     workArrangement: "remote",
//     source: { platform: "Indeed", link: "#" },
//     statusHistory: [
//       { status: "applied", date: "2024-04-20T10:30:00Z" },
//       { status: "interviewing", date: "2024-04-22T14:00:00Z" },
//     ],
//     salary: {
//       currency: "USD",
//       minAmount: 4000,
//       maxAmount: 6000,
//     },
//     createDate: "2024-04-20T10:30:00Z",
//     updateDate: "2024-04-22T14:00:00Z",
//   },
//   {
//     id: "3",
//     organization: "Company C",
//     position: "Product Manager",
//     location: {
//       city: "Makati",
//       country: "Philippines",
//     },
//     workArrangement: "hybrid",
//     source: { platform: "JobStreet", link: "#" },
//     statusHistory: [{ status: "offered", date: "2024-03-15T09:15:00Z" }],
//     salary: {
//       currency: "PHP",
//       maxAmount: 150000,
//     },
//     createDate: "2024-03-01T11:00:00Z",
//     updateDate: "2024-03-15T09:15:00Z",
//   },
//   {
//     id: "4",
//     organization: "Company D",
//     position: "UX Designer",
//     location: {
//       city: "Makati",
//       country: "Philippines",
//     },
//     workArrangement: "remote",
//     source: { platform: "JobStreet", link: "#" },
//     statusHistory: [{ status: "rejected", date: "2024-02-28T16:45:00Z" }],
//     // Testing optionality: no salary provided for this entry
//     createDate: "2024-02-15T13:20:00Z",
//     updateDate: "2024-02-28T16:45:00Z",
//   },
// ];

export const applicationsData: Application[] = [
  {
    id: "1",
    organization: "Company A",
    position: "Software Engineer",
    description:
      "Full-stack development using React and Node.js. Responsible for maintaining core banking modules.",
    location: {
      city: "Makati",
      country: "Philippines",
    },
    workArrangement: "remote",
    source: { platform: "LinkedIn", link: "#" },
    statusHistory: [{ status: "applied", date: "2025-05-10T08:00:00Z" }],
    salary: {
      currency: "PHP",
      minAmount: 80000,
      maxAmount: 120000,
    },
    createDate: "2025-05-10T08:00:00Z",
    updateDate: "2025-05-10T08:00:00Z",
  },
  {
    id: "2",
    organization: "Company B",
    position: "Data Scientist",
    description:
      "Building predictive models for customer churn using Python and SQL.",
    location: {
      city: "Makati",
      country: "Philippines",
    },
    workArrangement: "remote",
    source: { platform: "Indeed", link: "#" },
    statusHistory: [
      { status: "applied", date: "2024-04-20T10:30:00Z" },
      { status: "interviewing", date: "2024-04-22T14:00:00Z" },
    ],
    salary: {
      currency: "USD",
      minAmount: 4000,
      maxAmount: 6000,
    },
    createDate: "2024-04-20T10:30:00Z",
    updateDate: "2024-04-22T14:00:00Z",
  },
  {
    id: "3",
    organization: "Company C",
    position: "Product Manager",
    description:
      "Leading the roadmap for the mobile app squad and coordinating with stakeholders.",
    location: {
      city: "Makati",
      country: "Philippines",
    },
    workArrangement: "hybrid",
    source: { platform: "JobStreet", link: "#" },
    statusHistory: [{ status: "offered", date: "2024-03-15T09:15:00Z" }],
    salary: {
      currency: "PHP",
      maxAmount: 150000,
    },
    createDate: "2024-03-01T11:00:00Z",
    updateDate: "2024-03-15T09:15:00Z",
  },
  {
    id: "4",
    organization: "Company D",
    position: "UX Designer",
    // description is omitted here to test optionality
    location: {
      city: "Makati",
      country: "Philippines",
    },
    workArrangement: "remote",
    source: { platform: "JobStreet", link: "#" },
    statusHistory: [{ status: "rejected", date: "2024-02-28T16:45:00Z" }],
    createDate: "2024-02-15T13:20:00Z",
    updateDate: "2024-02-28T16:45:00Z",
  },
];

export default applicationsData;
