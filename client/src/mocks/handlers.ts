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
      };
    });
    return HttpResponse.json({
      applications: transformedData,
      totalCount: transformedData.length,
    });
  }),

  http.post("/api/applications", async ({ request }) => {
    const newApplication = (await request.json()) as Omit<
      Application,
      "statusHistory"
    > & {
      status: string;
    };

    const savedApplication = {
      ...newApplication,
      id: uuidv4(),
      statusHistory: [
        { status: newApplication.status, date: new Date().toISOString() },
      ],
      createDate: new Date().toISOString(),
      updateDate: new Date().toISOString(),
    };

    applicationsData.push(savedApplication);

    console.log("Mock DB Updated:", applicationsData);

    return HttpResponse.json(savedApplication, { status: 201 });
  }),

  http.patch("/api/applications/:id", async ({ request, params }) => {
    const { id } = params;
    const updatedData = (await request.json()) as Omit<
      Application,
      "statusHistory"
    > & {
      status: string;
    };

    const savedData = {
      ...updatedData,
      statusHistory: [
        { status: updatedData.status, date: new Date().toISOString() },
      ],
      createDate: new Date().toISOString(),
      updateDate: new Date().toISOString(),
    };

    const index = applicationsData.findIndex((item) => item.id === id);

    if (index !== -1) {
      applicationsData[index] = { ...applicationsData[index], ...savedData };
      return HttpResponse.json(applicationsData[index]);
    }

    return new HttpResponse(null, { status: 404 });
  }),

  http.delete("/api/applications", async ({ request }) => {
    const ids = await request.json();

    const isMultipleDeletion = Array.isArray(ids);

    const updatedApplications = applicationsData.filter((a) =>
      isMultipleDeletion ? !ids.includes(a.id) : a.id !== ids,
    );
    return HttpResponse.json(updatedApplications, { status: 200 });
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
