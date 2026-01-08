import { contextData, dashboardData } from "@/lib/mock-data/dashboard";
import { http, HttpResponse } from "msw";

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
];
