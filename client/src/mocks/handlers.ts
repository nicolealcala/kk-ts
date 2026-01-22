import { contextData, dashboardData } from "@/mocks/data/dashboardData";
import schedulesData from "@/mocks/data/schedulesData";
import type { Schedule } from "@/lib/types/schedules";
import { http, HttpResponse } from "msw";
import { v4 as uuidv4 } from "uuid";
import applicationsData from "./data/applicationsData";
import { convertUtcToShortenedLocaleDate } from "@/utils/date";

export const handlers = [
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

  http.get("/api/applications", () => {
    const transformedData = applicationsData.map((app) => {
      const currentStatus = app.statusHistory.at(-1);
      return {
        ...app,
        createDate: convertUtcToShortenedLocaleDate(app.createDate),
        currentStatus: currentStatus?.status || "applied",
        location: `${app.location.city}, ${app.location.country}`,
      };
    });
    return HttpResponse.json(transformedData);
  }),

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

  http.put("/api/schedules/:id", async ({ request, params }) => {
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
