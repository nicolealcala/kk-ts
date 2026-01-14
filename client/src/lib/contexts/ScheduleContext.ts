import React, { createContext } from "react";
import type { Schedule } from "../types/schedules";
import type { Event } from "react-big-calendar";

export type StateType = {
  event: Event;
};

export type ActionType = {
  type: "add" | "edit";
  payload: Schedule;
};

interface ScheduleProps {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  state: StateType;
  dispatch: React.ActionDispatch<[action: ActionType]>;
}

export const ScheduleContext = createContext<ScheduleProps | undefined>(
  undefined
);
