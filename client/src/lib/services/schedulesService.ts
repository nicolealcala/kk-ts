import type { ScheduleFormInputs } from "@/components/schedules/ScheduleForm";
import type { Schedule } from "@/lib/types/schedules";
import type { CalendarEvent } from "@/pages/Schedules";
import { DateTime } from "luxon";

export const fetchSchedules = async (currentLocalDate: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/schedules?date=${currentLocalDate}`
  );

  if (!response.ok) throw new Error("Failed to fetch schedules");

  const data = await response.json();

  return data?.map((d: Schedule) => ({
    ...d,
    start: DateTime.fromISO(d.start).toJSDate(),
    end: DateTime.fromISO(d.end).toJSDate(),
  })) as CalendarEvent[];
};

export const updateSchedule = async (
  formData: ScheduleFormInputs,
  selectedId?: string
) => {
  const isUpdate = !!selectedId;
  const url = isUpdate
    ? `${import.meta.env.VITE_BASE_URL}/api/schedules/${selectedId}`
    : `${import.meta.env.VITE_BASE_URL}/api/schedules`;

  const response = await fetch(url, {
    method: isUpdate ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...formData,
      start: DateTime.fromISO(formData.start).toUTC().toISO(),
      end: DateTime.fromISO(formData.end).toUTC().toISO(),
    }),
  });

  if (!response.ok) throw new Error("Save failed");
  return response.json();
};
