import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteSchedule,
  getSchedules,
  updateSchedule,
} from "@/lib/services/schedulesService";
import type { ScheduleFormInputs } from "@/lib/forms/scheduleFormSchema";
import { toast } from "react-toastify";

export function useSchedulesData(currentLocalDate: string) {
  const key = "schedules";
  const queryClient = useQueryClient();

  // --- GET Query ---
  const query = useQuery({
    queryKey: [key, currentLocalDate],
    queryFn: () => getSchedules(currentLocalDate),
  });

  // --- SAVE Mutation (Create or Update) ---
  const saveMutation = useMutation({
    mutationFn: ({ data, id }: { data: ScheduleFormInputs; id?: string }) =>
      updateSchedule(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [key, currentLocalDate],
      });
      toast.success("Event saved successfully");
    },
    onError: (error) => {
      console.error("Failed to save schedule: ", error);
      toast.error("Failed to save event");
    },
  });

  // --- DELETE Mutation  ---
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteSchedule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [key, currentLocalDate],
      });
      toast.success("Event deleted successfully");
    },
    onError: (error) => {
      console.error("Failed to delet schedule: ", error);
      toast.error("Failed to delete event");
    },
  });

  return {
    // Data & State
    schedules: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,

    // Actions
    saveSchedule: saveMutation.mutate,
    isSaving: saveMutation.isPending,

    deleteSchedule: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}
