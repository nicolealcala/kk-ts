import type { CalendarEvent } from "@/lib/types/schedules";
import { Views, type View } from "react-big-calendar";
import { create } from "zustand";
import { combine } from "zustand/middleware";

export type ScheduleDrawerMode = "create" | "update" | "view" | null;

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
    setView: (view: View) => set({ view }),

    setDate: (date: Date) => set({ date: new Date(date) }),
    openViewDrawer: (event: CalendarEvent) => {
      set({
        drawerMode: "view",
        selectedEvent: event,
      });
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
