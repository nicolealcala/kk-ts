import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getApplications,
  updateApplication,
} from "@/lib/services/applicationsService";
import type { ApplicationFormInputs } from "@/lib/forms/applicationFormSchema";

export function useApplicationsData(currentLocalDate: string) {
  const key = "applications";
  const queryClient = useQueryClient();

  // --- GET Query ---
  const query = useQuery({
    queryKey: [key, currentLocalDate],
    queryFn: () => getApplications(currentLocalDate),
  });

  // --- SAVE Mutation (Create or Update) ---
  const saveMutation = useMutation({
    mutationFn: ({ data, id }: { data: ApplicationFormInputs; id?: string }) =>
      updateApplication(data, id),
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
    applications: query.data?.applications ?? [],
    totalCount: query.data?.totalCount ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,

    // Actions
    saveApplication: saveMutation.mutate,
    isSaving: saveMutation.isPending,
  };
}
