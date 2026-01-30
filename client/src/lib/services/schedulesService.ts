import { DateTime } from "luxon";
import type { ScheduleFormInputs } from "../forms/scheduleFormSchema";

const URL = `${import.meta.env.VITE_BASE_URL}/api/schedules`;

export const getSchedules = async (currentLocalDate: string) => {
  const response = await fetch(`${URL}?date=${currentLocalDate}`);

  if (!response.ok) throw new Error("Failed to fetch schedules");

  return await response.json();
};

export const updateSchedule = async (
  formData: ScheduleFormInputs,
  selectedId?: string,
) => {
  const isUpdate = !!selectedId;
  const url = isUpdate ? `${URL}/${selectedId}` : URL;

  const response = await fetch(url, {
    method: isUpdate ? "PATCH" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...formData,
      start: DateTime.fromISO(formData.start).toUTC().toISO(),
      end: DateTime.fromISO(formData.end).toUTC().toISO(),
    }),
  });

  if (!response.ok) throw new Error("Save failed");
  return await response.json();
};

export const deleteSchedule = async (id: string) => {
  const response = await fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) throw new Error("Failed to delete");
  return await response.json();
};
