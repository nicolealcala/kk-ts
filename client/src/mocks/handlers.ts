import { contextData, dashboardData } from "@/mocks/data/dashboardData";
import schedulesData from "@/mocks/data/schedulesData";
import type { Schedule } from "@/lib/types/schedules";
import { http, HttpResponse, passthrough } from "msw";
import { v4 as uuidv4 } from "uuid";
import applicationsData from "./data/applicationsData";
import type { ApplicationFormData } from "@/lib/schema/applicationSchema.ts";

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
    // applicationsData.sort(
    //   (a, b) =>
    //     new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime(),
    // );
    // return HttpResponse.json({
    //   data: applicationsData,
    //   pagination: {
    //     totalCount: applicationsData.length,
    //     filteredCount: applicationsData.length,
    //   },
    // });
    return passthrough();
  }),

  http.get("/api/applications/:id", () => {
    return passthrough();
  }),

  http.post("/api/applications", async ({ request }) => {
    // const newApplication = (await request.json()) as Omit<
    //   ApplicationFormData,
    //   "statusHistory"
    // > & {
    //   status: string;
    // };

    // const id = uuidv4();
    // const savedApplication = {
    //   ...newApplication,
    //   id,
    //   statusHistory: [
    //     {
    //       applicationId: id,
    //       status: newApplication.status,
    //       createdAt: new Date().toISOString(),
    //     },
    //   ],
    //   appliedAt: new Date().toISOString(),
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    // };

    // applicationsData.push(savedApplication);

    // console.log("Mock DB Updated:", applicationsData);

    // return HttpResponse.json(savedApplication, { status: 201 });
    return passthrough();
  }),

  http.patch("/api/applications/:id/edit", async ({ request, params }) => {
    // const { id } = params;

    // if (typeof id !== "string") {
    //   return new HttpResponse(null, { status: 400 });
    // }

    // const updatedData = (await request.json()) as Omit<
    //   ApplicationFormData,
    //   "statusHistory"
    // > & {
    //   status: string;
    // };
    // const savedData = {
    //   ...updatedData,
    //   id,
    //   statusHistory: [
    //     {
    //       applicationId: id as string,
    //       status: updatedData.status,
    //       createdAt: new Date().toISOString(),
    //     },
    //   ],
    //   appliedAt: new Date().toISOString(),
    // };

    // const index = applicationsData.findIndex((item) => item.id === id);

    // if (index !== -1) {
    //   applicationsData[index] = {
    //     ...applicationsData[index],
    //     ...savedData,
    //   };
    //   return HttpResponse.json(applicationsData[index]);
    // }

    // return new HttpResponse(null, { status: 404 });
    return passthrough();
  }),

  http.delete("/api/applications", async ({ request }) => {
    const url = new URL(request.url);

    const ids = url.searchParams.get("ids");

    if (!ids)
      return HttpResponse.json(
        { message: "No application IDs provided" },
        { status: 200 },
      );

    for (let i = applicationsData.length - 1; i >= 0; i--) {
      if (ids.includes(applicationsData[i].id)) applicationsData.splice(i, 1);
    }

    return HttpResponse.json(applicationsData, { status: 200 });
  }),

  http.delete("/api/applications/:id", async ({ params }) => {
    const { id } = params;

    const index = applicationsData.findIndex((a) => a.id === id);

    applicationsData.splice(index, 1);

    return HttpResponse.json(applicationsData, { status: 200 });
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

    return HttpResponse.json(null, { status: 404 });
  }),

  http.delete("/api/schedules/:id", async ({ params }) => {
    const { id } = params;

    const index = schedulesData.findIndex((d) => d.id === id);

    schedulesData.splice(index, 1);

    return HttpResponse.json(schedulesData, { status: 200 });
  }),
];
