import { z } from "zod";
import type { createExperienceSchema } from "../../../validation/experience.validation.js";

type MockExperiences = z.infer<typeof createExperienceSchema>;

export const MOCK_EXPERIENCES: MockExperiences[] = [
  {
    company: "Innovatech Solutions",
    position: "Junior Frontend Developer",
    employmentType: "full_time",
    workArrangement: "onsite",
    salary: 28000,
    currency: "PHP",
    payFrequency: "monthly",
    location: {
      city: "Santa Rosa",
      state: "Laguna",
      countryCode: "Philippines",
    },
    startDate: new Date("2021-06-01T00:00:00Z"),
    endDate: new Date("2022-12-31T00:00:00Z"),
    isCurrent: false,
    summary:
      "Developed responsive web interfaces using HTML, CSS, JavaScript, and React while collaborating with UI/UX designers and backend developers.",
  },
  {
    company: "CloudForge Technologies",
    position: "Frontend Developer",
    employmentType: "full_time",
    workArrangement: "hybrid",
    salary: 45000,
    currency: "PHP",
    payFrequency: "monthly",
    location: {
      city: "Makati",
      state: "Metro Manila",
      countryCode: "Philippines",
    },
    startDate: new Date("2023-01-09T00:00:00Z"),
    endDate: new Date("2024-08-16T00:00:00Z"),
    isCurrent: false,
    summary:
      "Built reusable React components, integrated REST APIs, and improved application performance for enterprise clients.",
  },
  {
    company: "Nimbus Labs",
    position: "Software Engineer",
    employmentType: "full_time",
    workArrangement: "remote",
    salary: 85000,
    currency: "PHP",
    payFrequency: "monthly",
    location: null,
    startDate: new Date("2024-09-02T00:00:00Z"),
    endDate: null,
    isCurrent: true,
    summary:
      "Developing full-stack web applications with React, Node.js, TypeScript, and PostgreSQL while collaborating with distributed teams.",
  },
] as const;
