import { contextData, dashboardData } from "@/mocks/data/dashboardData";
import schedulesData from "@/mocks/data/schedulesData";
import type { Schedule } from "@/lib/types/schedules";
import { http, HttpResponse } from "msw";
import { v4 as uuidv4 } from "uuid";
import applicationsData from "./data/applicationsData";
import type { Application } from "@/lib/types/applications";

export const handlers = [
  //Dashboard
  http.get("/api/context", () => {
    return HttpResponse.json({
      ...contextData,
    });
  }),

  http.get("/api/dashboard/:year", () => {
    return HttpResponse.json({
      ...dashboardData,
    });
  }),

  //Applications
  http.get("/api/applications", () => {
    const transformedData = applicationsData.map((app) => {
      const currentStatus = app.statusHistory.at(-1);
      return {
        ...app,
        currentStatus: currentStatus?.status || "applied",
        location: `${app.location.city}, ${app.location.country}`,
      };
    });
    return HttpResponse.json({
      applications: transformedData,
      totalCount: transformedData.length,
    });
  }),

  http.post("/api/applications", async ({ request }) => {
    const newApplication = (await request.json()) as Application;

    const savedApplication = {
      ...newApplication,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    console.log("Mock DB Updated:", applicationsData);

    return HttpResponse.json(savedApplication, { status: 201 });
  }),

  http.patch("/api/applications/:id", async ({ request, params }) => {
    const { id } = params;
    const updatedData = (await request.json()) as Application;

    const index = applicationsData.findIndex((item) => item.id === id);

    if (index !== -1) {
      applicationsData[index] = { ...applicationsData[index], ...updatedData };
      return HttpResponse.json(applicationsData[index]);
    }

    return new HttpResponse(null, { status: 404 });
  }),

  // Schedules
  http.get("/api/schedules", () => {
    return HttpResponse.json(schedulesData);
  }),

  http.post("/api/schedules", async ({ request }) => {
    const newEvent = (await request.json()) as Schedule;

    const savedEvent = {
      ...newEvent,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    schedulesData.push(savedEvent);

    console.log("Mock DB Updated:", schedulesData);

    return HttpResponse.json(savedEvent, { status: 201 });
  }),

  http.patch("/api/schedules/:id", async ({ request, params }) => {
    const { id } = params;
    const updatedData = (await request.json()) as Schedule;

    const index = schedulesData.findIndex((item) => item.id === id);

    if (index !== -1) {
      schedulesData[index] = { ...schedulesData[index], ...updatedData };
      return HttpResponse.json(schedulesData[index]);
    }

    return new HttpResponse(null, { status: 404 });
  }),
];
