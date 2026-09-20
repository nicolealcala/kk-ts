import type { CalendarEvent } from "@/lib/types/schedules";
import { Views, type View } from "react-big-calendar";
import { create } from "zustand";
import { combine } from "zustand/middleware";

export type ScheduleDrawerMode = "create" | "update" | null;

type ScheduleUIState = {
  drawerMode: ScheduleDrawerMode;
  selectedEvent: CalendarEvent | null;
  createStart: Date | null;
  createEnd: Date | null;
  view: View;
  date: Date;
};

const getInitialState = (): ScheduleUIState => ({
  drawerMode: null,
  selectedEvent: null,
  createStart: null,
  createEnd: null,
  view: Views.WEEK,
  date: new Date(),
});

export const useScheduleStore = create(
  combine(getInitialState(), (set) => ({
    setView: (view: View) => {
      fetch("http://127.0.0.1:7745/ingest/7ead914c-2854-45d3-a8d7-dbcc4743eb40", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "0b015f",
        },
        body: JSON.stringify({
          sessionId: "0b015f",
          runId: "post-fix",
          hypothesisId: "toolbar-view",
          location: "scheduleStore.ts:setView",
          message: "Calendar view changed",
          data: { view },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
      set({ view });
    },
    setDate: (date: Date) => {
      fetch("http://127.0.0.1:7745/ingest/7ead914c-2854-45d3-a8d7-dbcc4743eb40", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "0b015f",
        },
        body: JSON.stringify({
          sessionId: "0b015f",
          runId: "post-fix",
          hypothesisId: "toolbar-nav",
          location: "scheduleStore.ts:setDate",
          message: "Calendar date navigated",
          data: { date: date.toISOString() },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
      set({ date: new Date(date) });
    },
    openCreateDrawer: (start: Date, end: Date) => {
      set({
        drawerMode: "create",
        selectedEvent: null,
        createStart: start,
        createEnd: end,
      });
    },
    openUpdateDrawer: (event: CalendarEvent) => {
      set({
        drawerMode: "update",
        selectedEvent: event,
        date: new Date(event.start),
      });
    },
    closeDrawer: () =>
      set({
        drawerMode: null,
        selectedEvent: null,
        createStart: null,
        createEnd: null,
      }),
  })),
);
