import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSchedules, updateSchedule } from "@/lib/services/schedulesService";
import type { ScheduleFormInputs } from "@/lib/forms/scheduleFormSchema";

export function useSchedules(currentLocalDate: string) {
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
