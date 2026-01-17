import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchSchedules,
  updateSchedule,
} from "@/lib/services/schedulesService";
import type { ScheduleFormInputs } from "@/components/schedules/ScheduleForm";

export function useSchedules(currentLocalDate: string) {
  const queryClient = useQueryClient();

  // --- GET Query ---
  const query = useQuery({
    queryKey: ["schedules", currentLocalDate],
    queryFn: () => fetchSchedules(currentLocalDate),
  });

  // --- SAVE Mutation (Create or Update) ---
  const saveMutation = useMutation({
    mutationFn: ({ data, id }: { data: ScheduleFormInputs; id?: string }) =>
      updateSchedule(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: (error: Error) => {
      alert(error.message);
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
  };
}
