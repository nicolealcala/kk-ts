import { useReducer, useState } from "react";
import {
  ScheduleContext,
  type ActionType,
  type StateType,
} from "@/lib/contexts/ScheduleContext";

const initialState = {
  event: { id: "", title: "", start: new Date(), end: new Date() },
};

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case "add":
      console.log(action?.payload);
      return state;
    default:
      return state;
  }
}
export default function ScheduleContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ScheduleContext value={{ openDrawer, setOpenDrawer, state, dispatch }}>
      {children}
    </ScheduleContext>
  );
}
