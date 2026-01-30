import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteApplication,
  getApplications,
  updateApplication,
} from "@/lib/services/applicationsService";
import type { ApplicationFormInputs } from "@/lib/forms/applicationFormSchema";
import { toast } from "react-toastify";

export function useApplicationsData(currentLocalDate?: string) {
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
      toast.success("Application saved successfully");
    },
    onError: () => {
      toast.error("Failed to save application");
    },
  });

  // --- DELETE Mutation  ---
  const deleteMutation = useMutation({
    mutationFn: (idOrIds: string | string[]) => deleteApplication(idOrIds),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [key, currentLocalDate],
      });

      const isBulkDelete = Array.isArray(variables) && variables.length > 1;
      toast.success(
        isBulkDelete
          ? "Applications deleted successfully"
          : "Application deleted successfully",
      );
    },
    onError: () => {
      toast.error("Failed to delete application");
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
    deleteApplication: deleteMutation.mutate,
    isSaving: saveMutation.isPending,
  };
}
